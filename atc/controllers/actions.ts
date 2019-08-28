import {IControllerDetails, IGameStatus, IPlaneData} from "../components/types";

// Actions
export enum Action {
  SELECT_PLANE,
  UPDATE_PLANES,
  NEW_GAME_EVENT,
  CONTROLLER_PLANE_SELECTED,
  CONTROLLER_COUNT_CHANGED,
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

interface IControllerCountChange {
  type: Action.CONTROLLER_COUNT_CHANGED;
  newCount: number;
}

interface IControllerPlaneSelected {
  type: Action.CONTROLLER_PLANE_SELECTED;
  controllerDetails: IControllerDetails;
}

export type ActionTypes =
  ISelectPlaneAction | IUpdatePlaneAction | INewGameEventAction | IControllerCountChange | IControllerPlaneSelected;

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

export function controllerCountChange(newCount: number): ActionTypes {
  return {type: Action.CONTROLLER_COUNT_CHANGED, newCount};
}

export function controllerPlaneSelected(controllerDetails: IControllerDetails): ActionTypes {
  return {type: Action.CONTROLLER_PLANE_SELECTED, controllerDetails};
}
