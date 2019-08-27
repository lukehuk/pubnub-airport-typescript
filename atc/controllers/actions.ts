import {IGameStatus, IPlaneData} from "../components/types";

// Actions
export enum Action {
  SELECT_PLANE,
  UPDATE_PLANES,
  NEW_GAME_EVENT,
}

interface ISelectPlaneAction {
  type: Action.SELECT_PLANE;
  planeName: string;
}

interface IUpdatePlaneAction {
  type: Action.UPDATE_PLANES;
  planes: IPlaneData[];
}

interface INewGameEventAction {
  type: Action.NEW_GAME_EVENT;
  event: IGameStatus;
}

export type ActionTypes = ISelectPlaneAction | IUpdatePlaneAction | INewGameEventAction;

// Action creators
export function selectPlane(planeName: string): ActionTypes {
  return {type: Action.SELECT_PLANE, planeName};
}

export function updatePlanes(planeData: IPlaneData[]): ActionTypes {
  return {type: Action.UPDATE_PLANES, planes: planeData};
}

export function newGameEvent(eventDetails: IGameStatus): ActionTypes {
  return {type: Action.NEW_GAME_EVENT, event: eventDetails};
}
