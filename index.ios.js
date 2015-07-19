/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var Main = require('./App/Components/Main');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  NavigatorIOS,
} = React;
var styles=StyleSheet.create({
  container:{
    flex:1,
    // backgroundColor:'#111111',

  },
});
class githubNoteTaker extends React.Component{
  render() {
    return (
      <NavigatorIOS
        // barTintColor='green'
        style={styles.container}
        initialRoute={{
          title:'Github Notetaker',
          component:Main
        }}/>
      // <View><Text>hellso oasi oa si</Text></View>

    );
  }
};



AppRegistry.registerComponent('githubNoteTaker', () => githubNoteTaker);
