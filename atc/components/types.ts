import {ImageSourcePropType} from "react-native";
import {Dispatch} from "redux";
import {PlaneCommand} from "../controllers/broadcaster";

export interface IURI {
  uri: ImageSourcePropType;
}

export enum PlaneAction {
  FLYING = "flying",
  CROSSWIND = "crosswind",
  DOWNWIND = "downwind",
  BASE = "base",
  FINAL = "final",
  RUNWAY = "runway",
  UPWIND = "upwind",
  LANDING = "landing",
  LANDED = "landed",
  CRASHED = "crashed",
}

export interface IPlanesData {
  [key: string]: IPlaneData;
}

export interface IPlaneData {
  planeName: string;
  lastPlaneTransmission: string;
  lastAtcTransmission: string;
  destinationY: number;
  destinationX: number;
  currentAction: PlaneAction;
  currentY: number;
  currentX: number;
  fuelCapacity: number;
  remainingFuel: number;
}

export interface IGameStatus {
  score: number;
  crashed: boolean;
}

export interface IBroadcasterConfig {
  publishKey: string;
  subscribeKey: string;
  dispatch: Dispatch;
}

export interface IBroadcaster {
  issuePlaneWithCommand: (planeName: string, command: PlaneCommand) => void;
}
