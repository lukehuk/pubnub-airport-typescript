import React, {Component} from "react";
import {StyleSheet, View} from "react-native";

// Component renders a runway and traffic pattern
export default class Airfield extends Component {
  public render() {
    return (
      <View style={styles.airfield}>
        <View style={styles.finalApproach}/>
        <View style={styles.trafficRoute}/>
        <View style={styles.runway}>
          <View style={styles.runwayPaint}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  airfield: {
    backgroundColor: "#8aa81c",
    flex: 1,
  },
  finalApproach: {
    backgroundColor: "#a9b322",
    borderBottomLeftRadius: 50,
    borderTopLeftRadius: 50,
    height: "12%",
    left: "12%",
    position: "absolute",
    top: "74%",
    width: "21%",
  },
  runway: {
    backgroundColor: "#000000",
    borderRadius: 2,
    height: "12%",
    left: "33%",
    position: "absolute",
    top: "74%",
    width: "45%",
  },
  runwayPaint: {
    borderColor: "#ffffff",
    borderRadius: 5,
    borderStyle: "dashed",
    borderWidth: 2,
    marginTop: "6%",
  },
  trafficRoute: {
    borderColor: "#000000",
    borderRadius: 5,
    borderStyle: "dashed",
    borderWidth: 3,
    height: "60%",
    marginLeft: "12%",
    marginRight: "12%",
    position: "relative",
    top: "20%",
  },
});
