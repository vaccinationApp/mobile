import React, {Component} from 'react';
import { View, Text, Alert } from 'react-native';
import { connect } from 'react-redux';
import {
  NavigationScreenProp,
  NavigationState,
} from 'react-navigation';
import { IStoreState } from '../../types/index';
import AsyncStorage from '@react-native-community/async-storage';
import { STRINGS } from '../../constants/index'

const { TOKEN, IS_FIRST_LAUNCH } = STRINGS;

interface IProps {
  navigation: NavigationScreenProp<NavigationState>;
}

class Start extends Component<IProps> {
  state = {
    hasToken: false
  }

  componentDidMount = async() => {
    const { navigate } = this.props.navigation;
    const token = await AsyncStorage.getItem(TOKEN);
    const isFirstLaunch = await AsyncStorage.getItem(IS_FIRST_LAUNCH, data=>{return data})

    if(token){
      if(JSON.parse(isFirstLaunch)){
        navigate('Instruction')
      }else{
        navigate('HomeStack')
      }
    }else{
      navigate('Login');
    }
}

render() {
    return (
    <View/>
    )
  }

}

const mapStateToProps = (state: IStoreState) => {
  const { currentUser } = state;
  return {
    currentUser
  }
};

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(
  Start
);

