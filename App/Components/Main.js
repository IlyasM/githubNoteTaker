
var React = require('react-native');
var api = require('../Utils/api');
var Dashboard = require('./Dashboard');
// var KeyboardEvents = require('react-native-keyboardevents');
// var KeyboardEventEmitter = KeyboardEvents.Emitter;
// var LayoutAnimation=require('LayoutAnimation');
var {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  ActivityIndicatorIOS
} = React;
// var animations = {
//   layout: {
//     spring: {
//       duration: 400,
//       create: {
//         duration: 300,
//         type: LayoutAnimation.Types.easeInEaseOut,
//         property: LayoutAnimation.Properties.opacity,
//       },
//       update: {
//         type: LayoutAnimation.Types.spring,
//         springDamping: 400,
//       },
//     },
//     easeInEaseOut: {
//       duration: 400,
//       create: {
//         type: LayoutAnimation.Types.easeInEaseOut,
//         property: LayoutAnimation.Properties.scaleXY,
//       },
//       update: {
//         type: LayoutAnimation.Types.easeInEaseOut,
//       },
//     },
//   },
// };
var styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 30,
    marginTop: 65,
    // marginBottom:90,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#48BBEC'
  },
  title: {
    marginBottom: 20,
    fontSize: 25,
    textAlign: 'center',
    color: '#fff'
  },
  searchInput: {
    height: 50,
    padding: 4,
    marginRight: 5,
    fontSize: 23,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    color: 'white'
  },
  buttonText: {
    fontSize: 18,
    color: '#111',
    alignSelf: 'center'
  },
  button: {
    height: 45,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
});

class Main extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      username: '',
      isLoading: false,
      error: false
    }
  }
  handleChange(event){
    this.setState({
      username: event.nativeEvent.text
    })
  }
  handleSubmit(){
    // update our indicatorIOS spinner
    this.setState({
      isLoading: true
    });
    api.getBio(this.state.username)
      .then((res) => {
        if(res.message === 'Not Found'){
          this.setState({
            error: 'User not found',
            isLoading: false
          })
        } else {
          this.props.navigator.push({
            title: res.name || "Select an Option",
            component: Dashboard,
            passProps: {userInfo: res}
          });
          this.setState({
            isLoading: false,
            error: false,
            username: ''
          })
        }
      });
  }
  slideViewUp(){
  		setStyles({

  		})
  }


	// getInitialState() {
	//     return {keyboardSpace: 0};
	//   }
	//    updateKeyboardSpace(frames) {
	//     LayoutAnimation.configureNext(animations.layout.spring);
	//     this.setState({keyboardSpace: frames.end.height});
	//   }

	//   resetKeyboardSpace() {
	//     LayoutAnimation.configureNext(animations.layout.spring);
	//     this.setState({keyboardSpace: 0});
	//   }

	//   componentDidMount() {
	//     KeyboardEventEmitter.on(KeyboardEvents.KeyboardDidShowEvent, this.updateKeyboardSpace);
	//     KeyboardEventEmitter.on(KeyboardEvents.KeyboardWillHideEvent, this.resetKeyboardSpace);
	//   }

	//   componentWillUnmount() {
	//     KeyboardEventEmitter.off(KeyboardEvents.KeyboardDidShowEvent, this.updateKeyboardSpace);
	//     KeyboardEventEmitter.off(KeyboardEvents.KeyboardWillHideEvent, this.resetKeyboardSpace);
	//   }


  render() {
  	var showErr=(
  		this.state.error ? <Text>{this.state.error}</Text> : <View></View>
  		);
    return(
      <View style={styles.mainContainer}>
      <Text style={styles.title}> Search for a Github User </Text>
      <TextInput
        style={styles.searchInput}
        value={this.state.username}
        onChange={this.handleChange.bind(this)}/>
        <TouchableHighlight
          style={styles.button}
          onPress={this.handleSubmit.bind(this)}
          underlayColor="white">
          <Text style={styles.buttonText}> SEARCH </Text>
        </TouchableHighlight>
        <ActivityIndicatorIOS 
        		animating={this.state.isLoading}
        		color="#111"
        		size='large'></ActivityIndicatorIOS>
        {showErr}
      </View>
      )
  }


};

module.exports = Main;
