import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
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

const { SCANNED_VACCINATION, LIST_VACCINATION  } = STRINGS;
interface IProps {
  navigation: NavigationScreenProp<NavigationState>;
}

class ScanIDCamera extends React.Component {

    state = {
        livestockIDs: [],
        farmerID : ''
    }

    camera = null;
    barcodeCodes = [];
    static onDone: any;
    async componentDidMount (){
    }

    onDone = async() => {
        let today = new Date();
        const { idFarmer, nameFarmer, medicineID } = this.props.navigation.state.params;
        const scannedVac = await AsyncStorage.getItem(SCANNED_VACCINATION, data=>data);
        let newVac = JSON.parse(scannedVac);
        console.log(newVac)
        const farmer = JSON.parse(scannedVac).find(item=> item.idFarmer === idFarmer);
        const indexToRemove = newVac.indexOf(farmer);
        console.log(indexToRemove)
        console.log(farmer)

        if(farmer){
            newVac.splice(indexToRemove, 1);
            newVac.push({idFarmer, nameFarmer, data:true });
            await AsyncStorage.setItem(SCANNED_VACCINATION, JSON.stringify(newVac))
        }

        const listOfVaccination = [];
        const oldListOfVaccination = await AsyncStorage.getItem(LIST_VACCINATION, data=>data);
        const date=today.getFullYear()+"-"+parseInt(today.getMonth()+1)+"-" + today.getDate();

        this.state.livestockIDs.map((item)=>{
            listOfVaccination.push({farmer:'employee',livestock:item,medicine:medicineID, date:date})
        })

        await AsyncStorage.setItem(LIST_VACCINATION, JSON.stringify( oldListOfVaccination ? JSON.parse(oldListOfVaccination).concat(listOfVaccination) : listOfVaccination));

        this.props.navigation.navigate('Home')
    }

    onBarCodes(barcodes) {
        barcodes.map((barcode)=> {
            if (barcode.data != null ) {
                const livestockAlreadyScanned = this.state.livestockIDs.find(livestock => livestock === barcode.data );
                if(!livestockAlreadyScanned){
                    const livestockIDs = this.state.livestockIDs;
                    livestockIDs.push(barcode.data);
                    this.setState({livestockIDs});
                }
            }
        });     
    }

  render() {
    return (
    <View style={styles.container}>
        <View style={styles.text}>
            <Text>Наведи на бирку животного</Text>
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
        <View style={{flex:1, marginBottom:10, alignItems:'center', justifyContent:'center'}}>
            <Text>Список</Text>
            <ScrollView >
            {this.state.livestockIDs.map((item)=>{
                return <Text>{item}</Text>
            })}
            </ScrollView>
            <TouchableOpacity style={styles.button}
                            onPress={this.onDone}>
                            <Text style={{color:'white'}}>Отправить</Text>
                        </TouchableOpacity>
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
    height:50,
    justifyContent:'center',
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

  },
})

const mapStateToProps = (state: IStoreState) => {
  console.log(state)
  return {}
};

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(ScanIDCamera);
