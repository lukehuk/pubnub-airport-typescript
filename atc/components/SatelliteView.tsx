import React, {Component} from "react";
import {View} from "react-native";
import Airfield from "./Airfield";
import Plane from "./Plane";
import PlaneDestinationMarker from "./PlaneDestinationMarker";
import {IControllerPlanes, IPlanesData} from "./types";

interface ISatelliteViewProps {
  onPlaneSelect: (planeName: string) => void;
  planes: IPlanesData;
  isPlaneSelected: boolean;
  selectedPlane: string;
  controllerPlanes: IControllerPlanes;
}

// Container component for the main play area. Generates plane components for each plane object
export default class SatelliteView extends Component<ISatelliteViewProps> {
  public generatePlaneList(planeNames: string[]) {
    // Set of plane names selected by other players
    const controllerPlaneNames = new Set(Object.values(this.props.controllerPlanes));

    const planeList: JSX.Element[] = [];
    planeNames.forEach((planeName) => {
      planeList.push(<Plane
        key={planeName}
        planeSelected={this.props.selectedPlane === planeName}
        onPlaneSelect={this.props.onPlaneSelect}
        planeName={planeName}
        planeData={this.props.planes[planeName]}
        controllerSelected={controllerPlaneNames.has(planeName)}
      />);
    });
    return planeList;
  }

  // Only generate a plane destination marker if a plane is selected
  public generatePlaneDestinationMarker() {
    if (this.props.isPlaneSelected) {
      return <PlaneDestinationMarker planeData={this.props.planes[this.props.selectedPlane]}/>;
    } else {
      return null;
    }
  }

  public render() {
    return (
      <View style={{flex: 1}}>
        <Airfield/>
        {this.generatePlaneDestinationMarker()}
        {this.generatePlaneList(Object.keys(this.props.planes))}
      </View>
    );
  }
}
