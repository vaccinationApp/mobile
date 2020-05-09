import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import {
  NavigationScreenProp,
  NavigationState,
} from 'react-navigation';
import { IStoreState } from '../../types/index';
import { STRINGS } from '../../constants/index';
import {getFarmerAction}  from '../../actions/index';

interface IProps {
  navigation: NavigationScreenProp<NavigationState>;
}

class ScanLivestock extends React.Component {

    goToCamera = () =>{
        const { idFarmer, nameFarmer, medicineID } = this.props.navigation.state.params;

        this.props.navigation.navigate('ScanIDCamera', {idFarmer,nameFarmer,medicineID})
    }

  render() {
    return (
    <View style={styles.container}>
        <Text style={{textAlign:'center', margin:10}}>Выберите способ для считывания данных о животном</Text>
        <TouchableOpacity style={styles.button} onPress={this.goToCamera}>
            <Text style={{color:'white'}}>Камера</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={()=>this.props.navigation.navigate('RfidScan')}>
            <Text style={{color:'white'}}>Прибор</Text>
        </TouchableOpacity>
    </View>

    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems:'center'
     
  },
button: {
  backgroundColor: '#00B1F7',
  borderColor:'#00B1F7',
  borderRadius: 5,
  borderWidth: 0.5,
  width: 160,
  height: 45,
  justifyContent:'center',
  alignItems:'center',
  marginTop:25
}
})

const mapStateToProps = (state: IStoreState) => {
  console.log(state)
  return {}
};

const mapDispatchToProps = {
  getFarmers:  getFarmerAction
};

export default connect(mapStateToProps, mapDispatchToProps)(ScanLivestock);
