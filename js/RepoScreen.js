import React, { Component, PropTypes } from 'react';
import {
  Text,
  StyleSheet
} from 'react-native';
import { graphql } from 'react-apollo';
import qql from 'graphql-tag';
import { Row, Grid } from 'react-native-easy-grid';

class RepoScreen extends Component {

  static route = {
    navigationBar: {
      visible: false
    }
  };

  static propTypes = {
    data: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      error: PropTypes.object,
      repository: PropTypes.shape({
        description: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        owner: PropTypes.shape({
          login: PropTypes.string.isRequired,
        }).isRequired,
        stargazers: PropTypes.shape({
          totalCount: PropTypes.number.isRequired,
        }).isRequired
      })
    }).isRequired
  };

  render() {
    const { loading, error, repository } = this.props.data;

    if (loading || error) return null;

    return (
      <Grid style={styles.container}>
        <Row style={styles.centerBlock}>
          <Text style={[styles.textCenter,styles.repoName]}>
            {repository.owner.login}/{repository.name}
          </Text>
        </Row>
        <Row style={styles.centerBlock}>
          <Text style={[styles.textCenter,styles.stargazersText]}>
            <Text style={styles.stargazersNumber}>
              {repository.stargazers.totalCount}
            </Text>
            Stargazers
          </Text>
        </Row>
      </Grid>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20
  },
  centerBlock: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  textCenter: {
    textAlign: 'center'
  },
  repoName: {
    fontSize: 20
  },
  stargazersText: {
    fontSize: 28
  },
  stargazersNumber: {
    fontSize: 40,
    color: '#EA7A4C'
  },
});

const query = qql`query($owner: String!, $name: String!){
                    repository(owner:$owner,name:$name){
                      description
                      name
                      owner{
                        login
                      }
                      stargazers{
                        totalCount
                      }
                    }
                  }`;

export default graphql(query)(RepoScreen);
