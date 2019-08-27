import React, {Component} from "react";
import {StyleSheet, View} from "react-native";
import ComHistory from "./ComHistory";

// Defines the images to be used in the communication history components
const images = {
  incomingCall: {
    uri: require("../assets/images/incoming-call.png"),
  },
  outgoingCall: {
    uri: require("../assets/images/outgoing-call.png"),
  },
};

interface IComHistoryBarProps {
  lastPlaneTransmission: string;
  lastAtcTransmission: string;
}

// Renders a communication history bar at the top of the game screen. The area consists of both the
// previous plane and previous atc transmission histories
export default class ComHistoryBar extends Component<IComHistoryBarProps> {
  public render() {
    return (
      <View style={{flex: 1, flexDirection: "row"}}>
        <View style={{flex: 1, backgroundColor: "orange"}}>
          <ComHistory
            title={"Last received:"}
            imageSource={images.incomingCall}
            lastMessage={this.props.lastPlaneTransmission}
          />
        </View>
        <View style={styles.separator}/>
        <View style={{flex: 1, backgroundColor: "pink"}}>
          <ComHistory
            title={"Last sent:"}
            imageSource={images.outgoingCall}
            lastMessage={this.props.lastAtcTransmission}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  separator: {
    borderRightColor: "#000000",
    borderRightWidth: 1,
  },
});
