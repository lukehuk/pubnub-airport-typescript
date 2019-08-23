import React, {Component} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {IURI} from "./types";

interface IComHistoryProps {
  imageSource: IURI,
  title: string,
  lastMessage: string
}

// Renders a communication history area
export default class ComHistory extends Component<IComHistoryProps> {
  render() {
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
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
    flexDirection: 'row'
  },
  content: {
    flex: 6
  },
  title: {
    fontWeight: 'bold',
  },
  icon: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  iconImage: {
    height: '100%',
    resizeMode: 'contain'
  },
  lastMessage: {
    fontStyle: 'italic'
  }
});
