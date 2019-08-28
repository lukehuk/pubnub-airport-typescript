import React, {Component} from "react";
import {Alert, View} from "react-native";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {selectPlane} from "../controllers/actions";
import {PlaneCommand} from "../controllers/broadcaster";
import {AtcAppState} from "../controllers/reducers";
import ComHistoryBar from "./ComHistoryBar";
import CommandBar from "./CommandBar";
import GameStatusBar from "./GameStatusBar";
import SatelliteView from "./SatelliteView";
import {IBroadcaster, IControllerData, IGameStatus, IPlanesData, PlaneAction} from "./types";

interface IGameScreenStateProps {
  controllers: IControllerData;
  selectedPlane: string;
  planes: IPlanesData;
  gameStatus: IGameStatus;
}

interface IGameScreenDispatchProps {
  onPlaneSelect: (broadcaster: IBroadcaster) => (planeName: string) => void;
}

interface IGameScreenProps {
  broadcaster: IBroadcaster;
}

// Container component for the game. Gets data from the Redux store and converts it into props for
// the child components.
class GameScreen extends Component<IGameScreenProps & IGameScreenStateProps & IGameScreenDispatchProps> {
  public render() {
    const selectedPlaneName = this.props.selectedPlane;
    const planes = this.props.planes;
    const onPlaneSelect = this.props.onPlaneSelect(this.props.broadcaster);

    const isPlaneSelected = planes[selectedPlaneName] !== undefined;
    const selectedPlaneData = planes[selectedPlaneName];

    const onCommandIssued = (command: PlaneCommand) => () => {
      this.props.broadcaster.issuePlaneWithCommand(selectedPlaneName, command);
    };
    const planeInFinalApproach = isPlaneSelected && selectedPlaneData.currentAction === PlaneAction.RUNWAY;

    return (
      <View style={{flex: 1, width: "100%", flexDirection: "column"}}>
        <View style={{flex: 1, zIndex: 10}}>
          <GameStatusBar
            score={this.props.gameStatus.score}
            planeCount={Object.keys(planes).length}
            controllers={this.props.controllers.count}
          />
        </View>
        <View style={{flex: 2, zIndex: 10}}>
          <ComHistoryBar
            lastAtcTransmission={isPlaneSelected ? selectedPlaneData.lastAtcTransmission : "N/A"}
            lastPlaneTransmission={isPlaneSelected ? selectedPlaneData.lastPlaneTransmission : "N/A"}
          />
        </View>
        <View style={{flex: 16}}>
          <View style={{flex: 1, flexDirection: "row"}}>
            <View style={{flex: 8, width: "100%"}}>
              <SatelliteView
                planes={planes}
                onPlaneSelect={onPlaneSelect}
                isPlaneSelected={isPlaneSelected}
                selectedPlane={selectedPlaneName}
                controllerPlanes={this.props.controllers.controllerPlanes}
              />
            </View>
            <View style={{flex: 1, width: "100%"}}>
              <CommandBar
                planeSelected={isPlaneSelected}
                planeInFinalApproach={planeInFinalApproach}
                onCommandIssued={onCommandIssued}
                didCrash={this.props.gameStatus.crashed}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }

  public componentDidUpdate() {
    if (this.props.gameStatus.crashed) {
      Alert.alert("GAME OVER!", "A plane has crashed! Final score: " + this.props.gameStatus.score);
    }
  }
}

// Used for selecting the needed data from the Redux store
const mapStateToProps = (state: AtcAppState): IGameScreenStateProps => {
  return {
    controllers: state.controllers,
    gameStatus: state.gameStatus,
    planes: state.planes,
    selectedPlane: state.selectedPlane,
  };
};

// Used for dispatching actions to the Redux store
const mapDispatchToProps = (dispatch: Dispatch): IGameScreenDispatchProps => {
  return {
    onPlaneSelect: (broadcaster: IBroadcaster) => (planeName: string) => {
      dispatch(selectPlane(planeName));
      broadcaster.notifyPlaneSelection(planeName);
    },
  };
};

// Connects the React component to the Redux store
export default connect<IGameScreenStateProps, IGameScreenDispatchProps, IGameScreenProps, AtcAppState>(
  mapStateToProps,
  mapDispatchToProps,
)(GameScreen);
