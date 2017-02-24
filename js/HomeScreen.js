import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text
} from 'react-native';

export default class HomeScreen extends Component {

  static route = {
    navigationBar: {
      backgroundColor: '#EA7A4C',
      tintColor: '#fff'
    }
  };

  render() {
    console.log('HomeScreen render')
    return (
      <View style={styles.container}>
        <Text style={styles.body}>lastingGithub</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  body: {
    fontSize: 36,
    color: '#EA7A4C'
  }
});

