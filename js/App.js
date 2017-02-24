import React, { Component } from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StyleSheet,
  View,
  WebView,
} from 'react-native';
import qs from 'qs';

import env from '../env';
import LoggedIn from './LoggedIn';

const scopes = [
  'user',
  'repo',
];
const scope = scopes.join(',');

const GITHUB_AUTHORIZE_URI = 'https://github.com/login/oauth/authorize';
const REDIRECT_URI = 'https://github.com/lastingyeh/LastingAuthApp';

const URI = encodeURI(`${GITHUB_AUTHORIZE_URI}?client_id=${env.GITHUB_CLIENT_ID}&scope=${scope}`);

const fetchAccessTokenByCode = code =>
  fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      client_id: env.GITHUB_CLIENT_ID,
      client_secret: env.GITHUB_CLIENT_SECRET,
      code,
    }),
  })
    .then(res => res.json());

export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      loggedIn: false,
    };
  }

  async componentWillMount() {
    const accessToken = await AsyncStorage.getItem('@lastGithub:access_token');
    this.setState({
      loading: false,
      loggedIn: accessToken !== null,
    });
  }

  onNavigationStateChange = ({ loading, url }) => {
    if (!loading) {
      if (url.indexOf(REDIRECT_URI) !== -1) {
        this.setState({
          loading: true,
        });
        const query = qs.parse(url.split('?')[1]);

        fetchAccessTokenByCode(query.code)
          .then(data => AsyncStorage.setItem(
            '@lastGithub:access_token',
            JSON.stringify(data),
          ))
          .then(() => {
            this.setState({
              loading: false,
              loggedIn: true,
            });
          });

        return false;
      }
    }
    return true;
  }

  render() {
    if (this.state.loading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator
            size="large" />
        </View>
      );
    }

    if (!this.state.loggedIn) {
      return (
        <WebView
          style={styles.webView}
          source={{
            uri: URI,
          }}
          onShouldStartLoadWithRequest={this.onNavigationStateChange}
          onNavigationStateChange={this.onNavigationStateChange} />
      );
    }

    return (
      <View style={styles.container}>
        <LoggedIn />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EDE7C9',
  },
  webView: {
    marginTop: 20,
  },
});
