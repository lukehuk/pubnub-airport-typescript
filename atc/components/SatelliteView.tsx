import React, {Component} from 'react';
import {View} from 'react-native';
import Plane from './Plane';
import Airfield from './Airfield';
import PlaneDestinationMarker from './PlaneDestinationMarker';
import {IPlanesData} from "./types";

interface ISatelliteViewProps {
  onPlaneSelect: (planeName: string) => void,
  planes: IPlanesData,
  isPlaneSelected: boolean,
  selectedPlane: string
}

// Container component for the main play area. Generates plane components for each plane object
export default class SatelliteView extends Component<ISatelliteViewProps> {
  generatePlaneList(planeNames: string[]) {
    const planeList: JSX.Element[] = [];
    planeNames.forEach((planeName) => (
      planeList.push(<Plane
        key={planeName}
        planeSelected={this.props.selectedPlane === planeName}
        onPlaneSelect={this.props.onPlaneSelect}
        planeName={planeName}
        planeData={this.props.planes[planeName]}
      />)
    ));
    return planeList;
  }

  // Only generate a plane destination marker if a plane is selected
  generatePlaneDestinationMarker() {
    if (this.props.isPlaneSelected) {
      return <PlaneDestinationMarker planeData={this.props.planes[this.props.selectedPlane]}/>;
    } else {
      return null;
    }
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Airfield/>
        {this.generatePlaneDestinationMarker()}
        {this.generatePlaneList(Object.keys(this.props.planes))}
      </View>
    );
  }
}
