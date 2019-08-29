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
        <View style={styles.textContainer}>
          <Text style={styles.text}>Planes: {this.props.planeCount}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Score: {this.props.score}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Controllers: {this.props.controllers}</Text>
        </View>
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
    textAlign: "center",
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
    textAlign: "center",
  },
});
