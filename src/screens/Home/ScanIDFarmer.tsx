import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
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

const { VACCINATORS, SCANNED_VACCINATION } = STRINGS;
interface IProps {
  navigation: NavigationScreenProp<NavigationState>;
}

class ScanIDFarmer extends React.Component {
  state = {
      vaccinators: [],
    farmerID : ''
  }

  camera = null;
  barcodeCodes = [];
  async componentDidMount (){
    let vaccinators = await AsyncStorage.getItem(VACCINATORS, data=> {return data});
    this.setState({ vaccinators : JSON.parse(vaccinators) })
  }

  goToMain = () => {
    const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'HomeStack' })],
      });
      this.props.navigation.dispatch(resetAction);
  }

  onBarCodes(barcodes) {
    barcodes.map(async(barcode)=> {
        if (barcode.data != null ) {
        const scannedVaccinators = [];
        const oldScannedVaccinators = await AsyncStorage.getItem(SCANNED_VACCINATION, data=>data)
        const farmerAlreadyExist = oldScannedVaccinators ? JSON.parse(oldScannedVaccinators).find(oldScannedVaccinators=> oldScannedVaccinators.id === barcode.data) : false;
        const farmer = this.state.vaccinators.find(vaccinators => vaccinators.id === barcode.data );
            if (farmer && !farmerAlreadyExist) {
                let farmerInfo = { idFarmer: farmer.id, nameFarmer:farmer.name}
                scannedVaccinators.push(farmerInfo)
                await AsyncStorage.setItem(SCANNED_VACCINATION, JSON.stringify( oldScannedVaccinators ? JSON.parse(oldScannedVaccinators).concat(scannedVaccinators) : scannedVaccinators));
                this.goToMain();
            }else{
                console.log('cannot find or already exist')
            }
        }
    });
}

  render() {
    return (
    <View style={styles.container}>
        <View style={styles.text}>
            <Text>Наведи на удостоверение личности владельца</Text>
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
        <View style={styles.text}>
            <Text> </Text>
        </View>
    </View>

    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1
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
    height: 100,
    justifyContent:'center',
    alignItems:'center'
}
})

const mapStateToProps = (state: IStoreState) => {
  return {}
};

const mapDispatchToProps = {
  getFarmers:  getFarmerAction
};

export default connect(mapStateToProps, mapDispatchToProps)(ScanIDFarmer);
