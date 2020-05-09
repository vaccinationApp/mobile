import * as React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import {
    Start,
    Login,
    Instruction,
    Home,
    ScanIDFarmer,
    ScanIdMed,
    ScanLivestock,
    ScanIDCamera,
    RfidScan
} from '../screens';


// const getTabBarIcon = (focused: boolean, icons: any) => {
//   const source = focused ? icons.active : icons.inactive;
//   return <Image source={source} resizeMode={'contain'} />;
// };

const AuthStack = createStackNavigator(
  {
    Login
  },
  { headerMode: 'none' }
);

const HomeStack = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions:{
        title: 'Владельцы',
        headerTintColor: '#4B4C4B',
        headerStyle:{
          backgroundColor:'#fff',
          elevation: 0
        },
        headerTitleStyle: {
          fontWeight: 'normal',
          textAlign:"center", 
          flex:1 ,
          fontSize: 16,
        },
      }
    },

    ScanIDFarmer: {
      screen: ScanIDFarmer,
      navigationOptions:{
        title: 'Идентификация владельца',
        headerTintColor: '#4B4C4B',
        headerStyle:{
          backgroundColor:'#fff',
          elevation: 0
        },
        headerTitleStyle: {
          fontWeight: 'normal',
          textAlign:"center", 
          flex:1 ,
          fontSize: 16,
        },
      }
    },

    ScanIdMed: {
      screen: ScanIdMed,
      navigationOptions:{
        title: 'Отсканируй вакцину',
        headerTintColor: '#4B4C4B',
        headerStyle:{
          backgroundColor:'#fff',
          elevation: 0
        },
        headerTitleStyle: {
          fontWeight: 'normal',
          textAlign:"center", 
          flex:1 ,
          fontSize: 16,
        },
      }
    },

    ScanLivestock: {
      screen: ScanLivestock,
      navigationOptions:{
        title: 'Способ ввода',
        headerTintColor: '#4B4C4B',
        headerStyle:{
          backgroundColor:'#fff',
          elevation: 0
        },
        headerTitleStyle: {
          fontWeight: 'normal',
          textAlign:"center", 
          flex:1 ,
          fontSize: 16,
        },
      }
    },
    ScanIDCamera: {
      screen: ScanIDCamera,
      navigationOptions:{
        title: 'Отсканируй штрих-код',
        headerTintColor: '#4B4C4B',
        headerStyle:{
          backgroundColor:'#fff',
          elevation: 0
        },
        headerTitleStyle: {
          fontWeight: 'normal',
          textAlign:"center", 
          flex:1 ,
          fontSize: 16,
        }
      }
    },
    RfidScan: {
      screen: RfidScan,
      navigationOptions:{
        title: 'Считыватель',
        headerTintColor: '#4B4C4B',
        headerStyle:{
          backgroundColor:'#fff',
          elevation: 0
        },
        headerTitleStyle: {
          fontWeight: 'normal',
          textAlign:"center", 
          flex:1 ,
          fontSize: 16,
        },
   
      }
    },
  },
);

const Router = createStackNavigator(
  {
    Start: {
      screen: Start,
    },
    AuthStack: {
      screen: AuthStack,
    },
    HomeStack: {
      screen: HomeStack,
    },
    Instruction,
  },
  {
    headerMode: 'none',
    initialRouteName: 'Start',
  }
);


const App = createAppContainer(Router);
export default App;

