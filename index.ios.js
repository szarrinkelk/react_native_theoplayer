/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  ActivityIndicator,
  ListView,
  StyleSheet,
  Image,
  Text,
  View
} from 'react-native';
import { credentials } from './config';
import base64 from 'base-64';

var API_URL = 'https://mychannels-api-preview.herokuapp.com/v1/playlists/516'
var headers = new Headers();
headers.append('Authorization', 'Basic ' + base64.encode(`${credentials.user}:${credentials.password}`));

export default class react_native_theoplayer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    }
  }

  componentDidMount() {
    fetch(API_URL, {
      method: 'GET',
      headers: headers 
    })
    .then((response) => response.json())
    .then((responseJson) => { 
      let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      this.setState({
        isLoading: false,
        dataSource: ds.cloneWithRows(responseJson.productions),
      }, function() {
      });
    })
    .catch((error) => {
      console.error(error);
    });
}

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={{flex: 1, paddingTop: 20}}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <Image source = {{uri : rowData.video['screenshot_urls']['original']}} style ={{width: 100, height:100}}/> }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  rightContainer: {
    flex: 1,
  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
  },
});

AppRegistry.registerComponent('react_native_theoplayer', () => react_native_theoplayer);
