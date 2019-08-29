import React, {Component} from "react";
import {Image, StyleSheet, TouchableHighlight, View} from "react-native";
import {IURI} from "./types";

interface ICommandButtonProps {
  onPress: () => void;
  disabled: boolean;
  imageSource: IURI;
}

// Renders a single command button. If no plane is selected the button will be disabled
export default class CommandButton extends Component<ICommandButtonProps> {
  public render() {
    const commandOpacity = this.props.disabled ? 0.3 : 1;

    return (
      <View style={[styles.fillSpace, {flexDirection: "column"}]}>
        <TouchableHighlight
          onPress={this.props.onPress}
          disabled={this.props.disabled}
          style={styles.fillSpace}>
          <View style={[styles.fillSpace, styles.button]}>
            <Image
              style={[styles.fillSpace, styles.buttonImage, {opacity: commandOpacity}]}
              source={this.props.imageSource.uri}
            />
          </View>
        </TouchableHighlight >
      </View>

    );
  }
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
  },
  buttonImage: {
    resizeMode: "contain",
  },
  container: {
    alignItems: "center",
    height: "100%",
  },
  fillSpace: {
    flex: 1,
    width: "100%",
  },
});
