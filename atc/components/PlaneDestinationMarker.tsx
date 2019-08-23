import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {IPlaneData} from "./types";

interface IPlaneDestinationMarkerProps {
  planeData: IPlaneData,
}

// Renders an indicator on screen at the selected plane's destination coordinates
export default class PlaneDestinationMarker extends Component<IPlaneDestinationMarkerProps> {
  render() {
    const plane = this.props.planeData;
    const left = plane.destinationX;
    const top = plane.destinationY;

    return (
      <View style={[styles.container, {left: `${left}%`, top: `${top}%`}]}>
        <View style={styles.destinationMarker}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    marginLeft: -8,
    marginTop: -8,
    width: 16,
    height: 16,
  },
  destinationMarker: {
    backgroundColor: '#ff3300',
    borderRadius: 30,
    borderStyle: 'dotted',
    borderColor: '#ffffff',
    borderWidth: 3,
    width: '100%',
    height: '100%',
  }
});

