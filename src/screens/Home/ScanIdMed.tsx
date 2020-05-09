import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import {
  NavigationScreenProp,
  NavigationState,
NavigationActions,
StackActions
} from 'react-navigation';
import { IStoreState } from '../../types/index';
import AsyncStorage from '@react-native-community/async-storage';
import { STRINGS } from '../../constants/index';
import {getFarmerAction}  from '../../actions/index';
import {RNCamera} from 'react-native-camera'

const { ALL_MEDICINE, SCANNED_VACCINATION } = STRINGS;
interface IProps {
  navigation: NavigationScreenProp<NavigationState>;
}

class ScanIdMed extends React.Component {
    state = {
        medicineName : '',
        medicineID:''
    }

  camera = null;
  barcodeCodes = [];
  async componentDidMount (){
      
  }


    async onBarCodes(barcodes) {
      const allMedicine = await AsyncStorage.getItem(ALL_MEDICINE, data=>data)
      barcodes.map((barcode)=> {
        if (barcode.data != null ) {
          const medicineFound = JSON.parse(allMedicine).find(med=> {return med.id=== barcode.data});
            if (medicineFound) {
                this.setState({medicineName: medicineFound.name, medicineID: medicineFound.id})
            }else{
                console.log('medicine not found')
            }
        }
    });
    }

    goToLiveStockScan = () => {
      const { idFarmer, nameFarmer } = this.props.navigation.state.params;
      const {medicineID} = this.state;
      this.props.navigation.navigate('ScanLivestock', {idFarmer,nameFarmer,medicineID})
    }

  render() {
    return (
    <View style={styles.container}>
        <View style={[styles.text,{height: 100}]}>
            <Text style={{textAlign:'center'}}>Наведи на штрих-код вакцины, для подтверждения вводимой вакцины</Text>
        </View>
        <View style={{alignItems:'center', backgroundColor:'grey', height:300}}>
        <RNCamera
            ref={ref => {
                this.camera = ref;
                }}
                style={styles.preview}
                type={RNCamera.Constants.Type.back}
                flashMode={RNCamera.Constants.FlashMode.on}
                permissionDialogTitle={'Permission to use camera'}
                permissionDialogMessage={'We need your permission to use your camera phone'}
                onGoogleVisionBarcodesDetected={({ barcodes }) => {
                    this.onBarCodes(barcodes);
                }}
                ratio={"1:1"}
                cameraViewDimensions={styles.preview}
         />
        </View>
        <View style={[styles.text, {marginTop:30}]}>
            <Text> Вакцина - {this.state.medicineName? this.state.medicineName: 'еще не найдена'} </Text>
            {this.state.medicineName ? 
        <TouchableOpacity style={styles.button} onPress={this.goToLiveStockScan}>
         <Text style={{color:'white'}}>Продолжить</Text>
        </TouchableOpacity>
         :null}
        </View>
    </View>

    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems:'center'
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
  preview: {
    height:300,
    width:300,
    justifyContent: 'flex-end',
    alignItems: 'center'
},
text:{
    justifyContent:'center',
    alignItems:'center',
    marginHorizontal:20
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

export default connect(mapStateToProps, mapDispatchToProps)(ScanIdMed);
