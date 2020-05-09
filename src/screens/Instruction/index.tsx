import React, { Component, SFC } from 'react';
import { Platform, StyleSheet, View, Image } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import AsyncStorage from '@react-native-community/async-storage';
import { STRINGS } from '../../constants/index';

const { IS_FIRST_LAUNCH } =  STRINGS;

class Instructions extends Component<IProps> {

  onDonePress = () => {
    this.props.navigation.navigate('HomeStack');
    AsyncStorage.setItem(IS_FIRST_LAUNCH, 'false');
  
  }
  render () {

  return (
    <View style={styles.container}>
      <Onboarding
        showDone={true} 
        bottomBarHighlight={false}
        showNext={false}
        showSkip={false}
        onDone={this.onDonePress}
        pages={[{
        backgroundColor: '#0081B4',
        image: <Image source={require('../../assets/scan.png')} style={{width:60, height:60}}/>,
        title: 'Инструкция',
        subtitle: 'Пролистайте, чтобы узнать о полном функционале приложения',
      },
      {
        backgroundColor: '#0081B4',
        image: <Image source={require('../../assets/scan.png')} style={{width:60, height:60}}/>,
        title: 'Сканируйте',
        subtitle: 'Сканируйте ID клиента(удв), чтобы подтвердить личность',
      },
      {
        backgroundColor: '#0081B4',
        image: <Image source={require('../../assets/korovka.png')} style={{width:40, height:40}}/>,
        title: 'Отправляйте',
        subtitle: 'Пролистайте, чтобы узнать о полном функционале приложения',
      },

      {
        backgroundColor: '#0081B4',
        image: <Image source={require('../../assets/korovka.png')} style={{width:40, height:40}}/>,
        title: 'Это последняя страничка',
        subtitle: 'Последняя старничка хехе',
      },
    
  ]}
/>
    </View>
  );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    width: '90%'
  },
});

export default Instructions;
