import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Image ,TouchableOpacity, DeviceEventEmitter  } from 'react-native';
import { connect } from 'react-redux';
import {
  NavigationScreenProp,
  NavigationState,
} from 'react-navigation';
import { IStoreState } from '../../types/index';
import { TextInput, ActivityIndicator } from 'react-native-paper';
import { loginAction } from "../../actions/index";
import AsyncStorage from '@react-native-community/async-storage';
import { STRINGS } from '../../constants/index';
import {getFarmerAction, getAllMedicineAction}  from '../../actions/index';
import Overlay from 'react-native-modal-overlay';
import { RNSerialport, definitions, actions } from "react-native-serialport";


const { SCANNED_VACCINATION, LIST_VACCINATION} = STRINGS;
interface IProps {
  navigation: NavigationScreenProp<NavigationState>;
}

class Home extends React.Component {
  state = {
    vaccinators: [],
    modalVisible: false, 

  }
  async componentDidMount() {
    const { getFarmers , getAllMedicine} = this.props;
    await getFarmers();
    await getAllMedicine();
    const scannedVaccinators = await AsyncStorage.getItem(SCANNED_VACCINATION, data=> {return data})
    const a = await AsyncStorage.getItem(LIST_VACCINATION, data=>data);
    this.setState({ vaccinators: JSON.parse(scannedVaccinators)})

  }

  async reloadData() {
    const { getFarmers , getAllMedicine} = this.props;

    await getFarmers();
    await getAllMedicine();
  }

  goToScan = () => {
    this.props.navigation.navigate('ScanIDFarmer')
  } 

  getDeviceAsync = () => {

  }

  renderItem = (item, index) => {
    console.log(item.item)
    return (
      <View key={item.item.key} style={styles.itemHi}>
        <Text>{item.item.nameFarmer}</Text>
        <TouchableOpacity  onPress={item.item.data
          ? ()=> this.setState({ modalVisible:  true}) :()=>this.props.navigation.navigate('ScanIdMed', {idFarmer: item.item.idFarmer, nameFarmer:item.item.nameFarmer})}>
          {item.item.data
          ?
          <Text>send</Text>
          :
          <Image source={require('../../assets/scanID.png')} style={{width:45, height:45}}/>

          } 
        </TouchableOpacity>
      </View>
    )
  }

  emptyList = () => {
    return (
      <View style={styles.containerEmptyList}>
        <Text style={styles.text}>Вы еще не подтвердили не одного владельца</Text>
        <Image source={require('../../assets/scan.png')} style={{width:45, height:45}}/>
        </View>
    )
  }
  onClose = () => this.setState({ modalVisible: false});

  render() {
    return (
    <View style={styles.container}>
      <TouchableOpacity onPress={
()=>this.props.navigation.navigate('RfidScan')}><Text>read</Text></TouchableOpacity>
      <FlatList
        data={this.state.vaccinators}
        renderItem={(item, index) => this.renderItem(item, index)}
        ListEmptyComponent={this.emptyList}
        style={{flex: 1, width:'100%'}}
      />
      <TouchableOpacity style={styles.button} onPress={()=>this.goToScan()}>
        <Text style={styles.textButton}>Добавить</Text>
      </TouchableOpacity> 
      <Overlay visible={this.state.modalVisible} onClose={this.onClose} closeOnTouchOutside>
          <Text>Some Modal Content</Text>
        </Overlay>
    </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent:'center',
    alignItems:'center',
    flex:1,
    marginBottom:30

  },
  containerEmptyList: {
    alignItems:'center',
    justifyContent:'center',
    height:300
  },
  itemHi:{
    margin:10,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor:'#27476E',
    flex: 2,
    height: 92,
    flexDirection:'row',
    justifyContent: 'space-between',
    alignItems: 'center'
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

  },
  textButton: {
    color: 'white',
    fontSize: 14,
  },
})

const mapStateToProps = (state: IStoreState) => {
  return {}
};

const mapDispatchToProps = {
  getFarmers:  getFarmerAction,
  getAllMedicine: getAllMedicineAction
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
