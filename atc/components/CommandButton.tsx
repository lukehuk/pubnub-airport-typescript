import React, {Component} from "react";
import {Image, StyleSheet, TouchableNativeFeedback, View} from "react-native";
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
      <View style={{flex: 1, width: "100%", flexDirection: "column"}}>
        <TouchableNativeFeedback
          onPress={this.props.onPress}
          disabled={this.props.disabled}>
          <View style={styles.button}>
            <Image
              style={[styles.buttonImage, {opacity: commandOpacity}]}
              source={this.props.imageSource.uri}
            />
          </View>
        </TouchableNativeFeedback>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: "#2196F3",
    height: "100%",
    justifyContent: "center",
  },
  buttonImage: {
    resizeMode: "contain",
    width: "100%",
  },
  container: {
    alignItems: "center",
    height: "100%",
  },
});
