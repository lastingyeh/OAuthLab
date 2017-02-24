import React, { Component, PropTypes } from 'react';
import {
  Image,
  Text,
  StyleSheet,
} from 'react-native';
import {
  Col,
  Row,
  Grid
} from 'react-native-easy-grid';
import { graphql } from 'react-apollo';
import qql from 'graphql-tag';

class UserScreen extends Component {

  static route = {
    navigationBar: {
      visible: false
    }
  };

  static propTypes = {
    data: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      error: PropTypes.object,
      viewer: PropTypes.shape({
        avatarURL: PropTypes.string.isRequired,
        login: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        followers: PropTypes.shape({
          totalCount: PropTypes.number.isRequired,
        }).isRequired,
        following: PropTypes.shape({
          totalCount: PropTypes.number.isRequired,
        }).isRequired,
      }),
    }).isRequired,
  };

  render() {
    const { loading, error, viewer } = this.props.data;

    if (loading || error) return null;

    return (
      <Grid>
        <Row size={75} style={styles.profile}>
          <Row size={80} style={{alignItems: 'center'}}>
            <Image style={styles.avatar}
                   source={{uri:viewer.avatarURL}} />
          </Row>
          <Row size={10}>
            <Text style={[styles.textCenter,styles.login]}>
              {viewer.login}
            </Text>
          </Row>
          <Row size={10}>
            <Text style={[styles.textCenter,styles.name]}>
              {viewer.name}
            </Text>
          </Row>
        </Row>
        <Row size={25}>
          <Col>
            <Text style={[styles.textCenter,styles.followText]}>
              <Text style={styles.followNumber}>{viewer.followers.totalCount}</Text>
              Followers
            </Text>
          </Col>
          <Col>
            <Text style={[styles.textCenter,styles.followText]}>
              <Text style={styles.followNumber}>{viewer.following.totalCount}</Text>
              Following
            </Text>
          </Col>
        </Row>
      </Grid>
    );
  }
}

const styles = StyleSheet.create({
  textCenter: {
    textAlign: 'center'
  },
  profile: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatar: {
    marginBottom: 50,
    width: 220,
    height: 220,
    borderRadius: 20
  },
  login: {
    flex: 3,
    fontSize: 28,
    lineHeight: 28
  },
  name: {
    flex: 2,
    fontSize: 22,
    lineHeight: 22
  },
  followText: {
    fontSize: 20
  },
  followNumber: {
    fontSize: 30,
    color: '#EA7A4C'
  },
});

const query = qql`query {
  viewer {
    avatarURL
    login
    name
    followers{
      totalCount
    }
    following{
      totalCount
    }
  }
}`;

export default graphql(query)(UserScreen);