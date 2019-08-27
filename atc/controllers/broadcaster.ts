import PubNub from "pubnub";
import {IBroadcaster, IBroadcasterConfig} from "../components/types";
import {newGameEvent, updatePlanes} from "./actions";

const ATC_PUB_CHANNEL = "airfield-alpha-atc";
const PLANES_SUB_CHANNEL = "airfield-alpha";
const GAME_EVENT_SUB_CHANNEL = "airfield-alpha-events";

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

// Init function that creates a PubNub instance and returns an object with callable functions
// Config object expected to contain PubNub API keys and Redux action dispatcher
export function init(config: IBroadcasterConfig): IBroadcaster {
  const pubnub = new PubNub({
    publishKey: config.publishKey,
    subscribeKey: config.subscribeKey,
  });

  pubnub.addListener({
    message: (message) => {
      if (message.channel === PLANES_SUB_CHANNEL) {
        config.dispatch(updatePlanes(message.message));
      } else {
        config.dispatch(newGameEvent(message.message));
      }
    },
  });

  console.log("Subscribing to " + PLANES_SUB_CHANNEL + " and " + GAME_EVENT_SUB_CHANNEL);

  pubnub.subscribe({
    channels: [PLANES_SUB_CHANNEL, GAME_EVENT_SUB_CHANNEL],
  });

  return {
    issuePlaneWithCommand: issuePlaneWithCommand(pubnub),
  };
}
