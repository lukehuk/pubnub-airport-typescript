import React, {Component} from "react";
import {Image, StyleSheet, Text, View} from "react-native";
import {IURI} from "./types";

interface IComHistoryProps {
  imageSource: IURI;
  title: string;
  lastMessage: string;
}

// Renders a communication history area
export default class ComHistory extends Component<IComHistoryProps> {
  public render() {
    return (
      <View style={styles.comHistory}>
        <View style={styles.icon}>
          <Image style={styles.iconImage} source={this.props.imageSource.uri}/>
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>{this.props.title}</Text>
          <Text style={styles.lastMessage}>{this.props.lastMessage}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  comHistory: {
    borderBottomColor: "#000000",
    borderBottomWidth: 1,
    flex: 1,
    flexDirection: "row",
  },
  content: {
    flex: 6,
    justifyContent: "center",
  },
  icon: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  iconImage: {
    height: "100%",
    resizeMode: "contain",
    width: "100%",
  },
  lastMessage: {
    fontStyle: "italic",
  },
  title: {
    fontWeight: "bold",
  },
});
