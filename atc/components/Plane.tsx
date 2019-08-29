import React, {Component} from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {IPlaneData, PlaneAction} from "./types";

interface IPlaneProps {
  planeData: IPlaneData;
  onPlaneSelect: (planeName: string) => void;
  planeName: string;
  planeSelected: boolean;
  controllerSelected: boolean;
}

// Renders a single plane at its current location. Plane name and fuel level are also displayed.
// If the plane is selected it will render differently.
export default class Plane extends Component<IPlaneProps> {
  public onPlanePressed() {
    this.props.onPlaneSelect(this.props.planeName);
  }

  public render() {
    const plane = this.props.planeData;
    const planeColor = this.props.planeSelected ? "#ffcc00" : "#808080";
    const planeBorderColour = this.props.controllerSelected ? "#d02129" : "#808080";
    const fuelPercent = Math.floor((plane.remainingFuel / plane.fuelCapacity) * 100);
    const left = plane.currentX;
    const top = plane.currentY;
    const opacity = plane.currentAction === PlaneAction.LANDING ? 1 - (plane.currentX / plane.destinationX) : 1;

    return (
      <TouchableOpacity
        onPress={() => this.onPlanePressed()}
        style={[styles.container, {left: `${left}%`, top: `${top}%`}]}>
          <View style={[styles.planeDetails, {opacity}]}>
            <Text style={styles.planeName}>{this.props.planeName}</Text>
          </View>
          <View style={[styles.plane, {backgroundColor: planeColor, borderColor: planeBorderColour, opacity}]}/>
          <View style={[styles.fuelIndicator, {opacity}]}>
            <View style={[styles.fuelLevel, {width: `${fuelPercent}%`}]}/>
          </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 30,
    marginLeft: -15,
    marginTop: -19,
    position: "absolute",
    width: 30,
  },
  fuelIndicator: {
    backgroundColor: "#808080",
    height: 3,
    marginTop: 2,
    width: 30,
  },
  fuelLevel: {
    backgroundColor: "#ff0000",
    height: "100%",
    width: "50%",
  },
  plane: {
    borderRadius: 30,
    borderWidth: 3,
    height: "100%",
    width: "100%",
  },
  planeDetails: {
    alignItems: "center",
    height: 10,
    justifyContent: "center",
    width: 30,
  },
  planeName: {
    fontSize: 8,
    textAlign: "center",
    width: 35,
  },
});
