import React, {Component} from "react";
import {StyleSheet, Text, View} from "react-native";

interface IGameStatusBarProps {
  score: number;
  planeCount: number;
  controllers: number;
}

// Renders a status bar that is divided into three sections. Shows the number of planes, players and planes landed.
export default class GameStatusBar extends Component<IGameStatusBarProps> {
  public render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Planes: {this.props.planeCount}</Text>
        <Text style={styles.text}>Score: {this.props.score}</Text>
        <Text style={styles.text}>Controllers: {this.props.controllers}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#d02129",
    borderBottomColor: "#000000",
    borderBottomWidth: 1,
    flex: 1,
    flexDirection: "row",
  },
  text: {
    color: "#ffffff",
    flex: 1,
    textAlign: "center",
  },
});
