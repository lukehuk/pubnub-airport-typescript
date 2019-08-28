import PubNub from "pubnub";
import uuid from "uuid-js";
import {IBroadcaster, IBroadcasterConfig} from "../components/types";
import {controllerCountChange, controllerPlaneSelected, newGameEvent, updatePlanes} from "./actions";

const ATC_PUB_CHANNEL = "airfield-alpha-atc";
const PLANES_SUB_CHANNEL = "airfield-alpha";
const GAME_EVENT_SUB_CHANNEL = "airfield-alpha-events";
const PRESENCE_TIMEOUT = 30;

export enum PlaneCommand {
  DOWNWIND = "DOWNWIND",
  BASE = "BASE",
  LEAVE = "LEAVE",
  CLEARED = "CLEARED",
}

// Publish a message to the specified pubnub channel
function issuePlaneWithCommand(pubnub: PubNub) {
  return (planeName: string, command: PlaneCommand) => {
    pubnub.publish({
      channel: ATC_PUB_CHANNEL,
      message: {planeName, command},
    }, (status, response) => {
      console.log(status, response);
    });
  };
}

// Trigger a PubNub Presence state-change event
function notifyPlaneSelection(pubnub: PubNub) {
  return (planeName: string) => {
    pubnub.setState({
      channels: [PLANES_SUB_CHANNEL],
      state: {planeSelected: planeName},
    }, (status, response) => {
      console.log(status, response);
    });
  };
}

// Init function that creates a PubNub instance and returns an object with callable functions
// Config object expected to contain PubNub API keys and Redux action dispatcher
// Listeners for channel messages and presence events also added
export function init(config: IBroadcasterConfig): IBroadcaster {
  const subscriberId = uuid.create().toString();
  const pubnub = new PubNub({
    presenceTimeout: PRESENCE_TIMEOUT,
    publishKey: config.publishKey,
    subscribeKey: config.subscribeKey,
    uuid: subscriberId,
  });

  pubnub.addListener({
    message: (message) => {
      if (message.channel === PLANES_SUB_CHANNEL) {
        config.dispatch(updatePlanes(message.message));
      } else {
        config.dispatch(newGameEvent(message.message));
      }
    },
    presence: (presenceEvent) => {
      if (presenceEvent.action === "state-change" && presenceEvent.uuid !== subscriberId) {
        config.dispatch(controllerPlaneSelected({
          controllerId: presenceEvent.uuid,
          controllerPlane: presenceEvent.state.planeSelected,
        }));
      } else if (presenceEvent.action === "join") {
        config.dispatch(controllerCountChange(presenceEvent.occupancy));
      } else {
        config.dispatch(controllerCountChange(presenceEvent.occupancy));
        config.dispatch(controllerPlaneSelected({
          controllerId: presenceEvent.uuid,
          controllerPlane: "",
        }));
      }
    },
  });

  console.log("Subscribing to " + PLANES_SUB_CHANNEL + " and " + GAME_EVENT_SUB_CHANNEL);

  pubnub.subscribe({
    channels: [PLANES_SUB_CHANNEL],
    withPresence: true,
  });

  pubnub.subscribe({
    channels: [GAME_EVENT_SUB_CHANNEL],
  });

  return {
    issuePlaneWithCommand: issuePlaneWithCommand(pubnub),
    notifyPlaneSelection: notifyPlaneSelection(pubnub),
  };
}
