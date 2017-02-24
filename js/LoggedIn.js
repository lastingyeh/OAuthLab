import React, { Component, PropTypes } from 'react';
import {
  AsyncStorage,
} from 'react-native';

import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';

import { NavigationProvider } from '@exponent/ex-navigation';

import router from './router';
import Main from './Main';

const networkInterface = createNetworkInterface({ uri: 'http://api.github.com/graphql' });

networkInterface.use([{
  async applyMiddleware(req, next){
    if (!req.options.headers) {
      req.options.headers = {};
    }

    const token = await AsyncStorage.getItem('@lastGithub:access_token');
    if (token) {
      req.options.headers.authorization = `Bearer ${JSON.parse(token).access_token}`;
    }
    next();
  }
}]);

const client = new ApolloClient({ networkInterface, });

export default class LoggedIn extends Component {

  render() {
    return (
      <ApolloProvider client={client}>
        <NavigationProvider router={router}>
          <Main />
        </NavigationProvider>
      </ApolloProvider>
    );
  }
}
