import React, { Component } from 'react';
import {
  Text,
  StyleSheet
} from 'react-native';

import {
  StackNavigation,
  DrawerNavigation,
  DrawerNavigationItem,
} from '@exponent/ex-navigation';

import router from './router';

export default class Main extends Component {

  renderTitle = (text: string, isSelected: bool) => (
    <Text style={[styles.buttonTitleText,isSelected?styles.selectedText:null]}>
      {text}
    </Text>
  );

  render() {
    return (
      <DrawerNavigation
        drawerPosition="left"
        drawerWidth={200}
        initialItem="home"
        drawerStyle={{ marginTop: 20 }}
      >
        <DrawerNavigationItem
          id="home"
          selectedStyle={styles.selectedItemStyle}
          renderTitle={isSelected => this.renderTitle('Home', isSelected)}
        >
          <StackNavigation
            id="home"
            initialRoute={router.getRoute('home')}
          />
        </DrawerNavigationItem>
        <DrawerNavigationItem
          id="user"
          selectedStyle={styles.selectedItemStyle}
          renderTitle={isSelected => this.renderTitle('User', isSelected)}
        >
          <StackNavigation
            id="user"
            initialRoute={router.getRoute('user')}
          />
        </DrawerNavigationItem>
        <DrawerNavigationItem
          id="repo"
          selectedStyle={styles.selectedItemStyle}
          renderTitle={isSelected => this.renderTitle('Repo', isSelected)}
        >
          <StackNavigation
            id="repo"
            initialRoute={router.getRoute('repo', {
              owner: 'lastingyeh',
              name: 'LastingAuthApp',
            })}
          />
        </DrawerNavigationItem>
      </DrawerNavigation>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    height: 180,
    width: null,
    resizeMode: 'cover',
  },
  buttonTitleText: {
    color: '#222',
    fontWeight: 'bold',
    marginLeft: 18,
  },
  icon: {
    color: '#999',
  },
  selectedText: {
    color: '#EA7A4C',
  },
  selectedItemStyle: {
    backgroundColor: '#E8E8E8',
  },
});
