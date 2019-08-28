import {combineReducers} from "redux";
import {IControllerData, IGameStatus, IPlanesData} from "../components/types";
import {Action, ActionTypes} from "./actions";

// Reducer to handle a plane selection action
function selectedPlane(state = "", action: ActionTypes): string {
  switch (action.type) {
    case Action.SELECT_PLANE:
      return action.planeName;
    default:
      return state;
  }
}

// Reducer to handle new plane data being received
function planes(state: IPlanesData = {}, action: ActionTypes): IPlanesData {
  switch (action.type) {
    case Action.UPDATE_PLANES:
      const newData: IPlanesData = {};
      action.planes.forEach((plane) => {
        newData[plane.planeName] = plane;
      });
      return newData;
    default:
      return state;
  }
}

// Reducer to handle new plane data being received
function gameStatus(state: IGameStatus = {score: 0, crashed: false}, action: ActionTypes): IGameStatus {
  switch (action.type) {
    case Action.NEW_GAME_EVENT:
      return action.event;
    default:
      return state;
  }
}

// Reducer to handle a change in the number of players (controllers) and the planes selected by other players
function controllers(state: IControllerData = {count: 0, controllerPlanes: {}}, action: ActionTypes): IControllerData {
  switch (action.type) {
    case Action.CONTROLLER_PLANE_SELECTED:
      const controllerPlanes = {...state.controllerPlanes};
      if (action.controllerDetails.controllerPlane === "") {
        delete controllerPlanes[action.controllerDetails.controllerId];
      } else {
        controllerPlanes[action.controllerDetails.controllerId] = action.controllerDetails.controllerPlane;
      }
      return {controllerPlanes, count: state.count};
    case Action.CONTROLLER_COUNT_CHANGED:
      return {
        controllerPlanes: state.controllerPlanes,
        count: action.newCount,
      };
    default:
      return state;
  }
}

const atcApp = combineReducers({
  controllers,
  gameStatus,
  planes,
  selectedPlane,
});

export type AtcAppState = ReturnType<typeof atcApp>;
export default atcApp;
