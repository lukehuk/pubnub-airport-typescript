import {combineReducers} from 'redux';
import {Action, ActionTypes} from "./actions";
import {IGameStatus, IPlanesData} from "../components/types";


// Reducer to handle a plane selection action
function selectedPlane(state = '', action: ActionTypes): string {
  switch (action.type) {
    case Action.SELECT_PLANE:
      return action.planeName;
    default:
      return state;
  }
}

// Reducer to handle new plane data being received
function planes(state = {}, action: ActionTypes): IPlanesData {
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
function gameStatus(state = {score: 0, crashed: false}, action: ActionTypes): IGameStatus {
  switch (action.type) {
    case Action.NEW_GAME_EVENT:
      return action.event;
    default:
      return state;
  }
}

const atcApp = combineReducers({
  selectedPlane,
  planes,
  gameStatus
});


export type AtcAppState = ReturnType<typeof atcApp>
export default atcApp;

