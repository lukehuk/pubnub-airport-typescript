import React, {Component} from "react";
import {Alert, View} from "react-native";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {selectPlane} from "../controllers/actions";
import {PlaneCommand} from "../controllers/broadcaster";
import {AtcAppState} from "../controllers/reducers";
import ComHistoryBar from "./ComHistoryBar";
import CommandBar from "./CommandBar";
import SatelliteView from "./SatelliteView";
import {IBroadcaster, IGameStatus, IPlanesData, PlaneAction} from "./types";

interface IGameScreenStateProps {
  selectedPlane: string;
  planes: IPlanesData;
  gameStatus: IGameStatus;
}

interface IGameScreenDispatchProps {
  onPlaneSelect: (planeName: string) => void;
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
    const onPlaneSelect = this.props.onPlaneSelect;

    const isPlaneSelected = planes[selectedPlaneName] !== undefined;
    const selectedPlaneData = planes[selectedPlaneName];

    const onCommandIssued = (command: PlaneCommand) => () => {
      this.props.broadcaster.issuePlaneWithCommand(selectedPlaneName, command);
    };
    const planeInFinalApproach = isPlaneSelected && selectedPlaneData.currentAction === PlaneAction.RUNWAY;

    return (
      <View style={{flex: 1, width: "100%", flexDirection: "column"}}>
        <View style={{flex: 1, zIndex: 10}}>
          <ComHistoryBar
            lastAtcTransmission={isPlaneSelected ? selectedPlaneData.lastAtcTransmission : "N/A"}
            lastPlaneTransmission={isPlaneSelected ? selectedPlaneData.lastPlaneTransmission : "N/A"}
          />
        </View>
        <View style={{flex: 8}}>
          <View style={{flex: 1, flexDirection: "row"}}>
            <View style={{flex: 8, width: "100%"}}>
              <SatelliteView
                planes={planes}
                onPlaneSelect={onPlaneSelect}
                isPlaneSelected={isPlaneSelected}
                selectedPlane={selectedPlaneName}
              />
            </View>
            <View style={{flex: 1, width: "100%"}}>
              <CommandBar
                planeSelected={isPlaneSelected}
                planeInFinalApproach={planeInFinalApproach}
                onCommandIssued={onCommandIssued}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }

  public componentDidUpdate(prevProps: IGameScreenProps & IGameScreenStateProps & IGameScreenDispatchProps) {
    if (prevProps.gameStatus.score < this.props.gameStatus.score) {
      Alert.alert("Plane landed!", "Current score: " + this.props.gameStatus.score);
    }
    if (this.props.gameStatus.crashed) {
      Alert.alert("GAME OVER!", "A plane has crashed! Final score: " + this.props.gameStatus.score);
    }
  }
}

// Used for selecting the needed data from the Redux store
const mapStateToProps = (state: AtcAppState) => {
  return {
    gameStatus: state.gameStatus,
    planes: state.planes,
    selectedPlane: state.selectedPlane,
  };
};

// Used for dispatching actions to the Redux store
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onPlaneSelect: (planeName: string) => {
      dispatch(selectPlane(planeName));
    },
  };
};

// Connects the React component to the Redux store
export default connect<IGameScreenStateProps, IGameScreenDispatchProps, IGameScreenProps, AtcAppState>(
  mapStateToProps,
  mapDispatchToProps,
)(GameScreen);
