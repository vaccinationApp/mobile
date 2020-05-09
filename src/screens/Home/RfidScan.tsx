import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Picker,
  Image,
  ScrollView,
  Alert,
  DeviceEventEmitter,
  TouchableOpacity
} from 'react-native';
import { RNSerialport, definitions, actions } from 'react-native-serialport';
import AsyncStorage from '@react-native-community/async-storage';
import { STRINGS } from '../../constants/index';

const { SCANNED_VACCINATION, LIST_VACCINATION  } = STRINGS;
//type Props = {};
class RfidScan extends Component {
  constructor(props) {
    super(props);
    this.startUsbListener = this.startUsbListener.bind(this);
    this.stopUsbListener = this.stopUsbListener.bind(this);
  }
  state = {
    servisStarted: false,
    connected: false,
    usbAttached: false,
    output: '',
    outputArray: [],
    baudRate: '115200',
    interface: '-1',
    selectedDevice: null,
    deviceList: [{ name: 'Device Not Found', placeholder: true }],
    sendText: 'HELLO',
    returnedDataType: definitions.RETURNED_DATA_TYPES.HEXSTRING
  };

  componentDidMount() {
    this.startUsbListener();
  }

  componentWillUnmount() {
    this.stopUsbListener();
  }

  startUsbListener() {
    DeviceEventEmitter.addListener(
      actions.ON_SERVICE_STARTED,
      this.onServiceStarted,
      this
    );
    DeviceEventEmitter.addListener(
      actions.ON_SERVICE_STOPPED,
      this.onServiceStopped,
      this
    );
    DeviceEventEmitter.addListener(
      actions.ON_DEVICE_ATTACHED,
      this.onDeviceAttached,
      this
    );
    DeviceEventEmitter.addListener(
      actions.ON_DEVICE_DETACHED,
      this.onDeviceDetached,
      this
    );
    DeviceEventEmitter.addListener(actions.ON_ERROR, this.onError, this);
    DeviceEventEmitter.addListener(
      actions.ON_CONNECTED,
      this.onConnected,
      this
    );
    DeviceEventEmitter.addListener(
      actions.ON_DISCONNECTED,
      this.onDisconnected,
      this
    );
    DeviceEventEmitter.addListener(actions.ON_READ_DATA, this.onReadData, this);
    RNSerialport.setReturnedDataType(this.state.returnedDataType);
    RNSerialport.setAutoConnect(false);
    RNSerialport.startUsbService();
  };

  stopUsbListener = async () => {
    DeviceEventEmitter.removeAllListeners();
    const isOpen = await RNSerialport.isOpen();
    if (isOpen) {
      Alert.alert('isOpen', isOpen);
      RNSerialport.disconnect();
    }
    RNSerialport.stopUsbService();
  };

  onServiceStarted(response) {
    this.setState({ servisStarted: true });
    if (response.deviceAttached) {
      this.onDeviceAttached();
    }
  }
  onServiceStopped() {
    this.setState({ servisStarted: false });
    Alert.alert('service stopped');
  }
  onDeviceAttached() {
    this.setState({ usbAttached: true });
    this.fillDeviceList();
  }
  onDeviceDetached() {
    this.setState({ usbAttached: false });
    this.setState({ selectedDevice: null });
    this.setState({
      deviceList: [{ name: 'Device Not Found', placeholder: true }]
    });
  }
  onConnected() {
    this.setState({ connected: true });
  }
  onDisconnected() {
    this.setState({ connected: false });
  }
  onReadData(data) {
    if (this.state.returnedDataType === definitions.RETURNED_DATA_TYPES.INTARRAY) {
      const payload = RNSerialport.intArrayToUtf16(data.payload);
      this.setState({ output: this.state.output + payload });
    } else if (this.state.returnedDataType === definitions.RETURNED_DATA_TYPES.HEXSTRING) {
      const payload = RNSerialport.hexToUtf16(data.payload);
      this.setState({ output: this.state.output + payload });
    }
  }
  
  addToTagsList(tags:string) {
      // const tagsArray = this.state.output.split(${});
      // console.log(tagsArray)
        // const livestockAlreadyScanned = this.state.outputArray.find(existTag => existTag === tag );
        // if(!livestockAlreadyScanned){
        //    const outputArray = this.state.outputArray;
        //     outputArray.push(tag);
        //     this.setState({outputArray});
        // }
}

  onError(error) {
    console.error(error);
  }

    async fillDeviceList() {
        const deviceList = await RNSerialport.getDeviceList();
        console.log(deviceList)
        this.connectToDevice(deviceList[0]);
    }

    connectToDevice = async(device:any) => {
        await RNSerialport.connectDevice(device.name, 9600);
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

    render() {
        const {servisStarted,connected,usbAttached,output,outputArray} = this.state
        console.log(output)
        console.log(outputArray)

    return (
      <ScrollView style={styles.body}>
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.line}>
              <Text style={styles.title}>Cервис:</Text>
              <Text style={styles.value}>
                {servisStarted ? 'Начался' : 'Не начался'}
              </Text>
            </View>
            <View style={styles.line}>
              <Text style={styles.title}>Usb:</Text>
              <Text style={styles.value}>
                {usbAttached ? 'Подключен' : 'Не подключен'}
              </Text>
            </View>
            <View style={styles.line}>
              <Text style={styles.title}>Соеденение с прибором:</Text>
              <Text style={styles.value}>
                {connected ? 'Установлено' : 'Не установлено'}
              </Text>
            </View>
          </View>
          <ScrollView style={styles.output} nestedScrollEnabled={true}>
            {connected ? 
                <View style={styles.outputView}>
                    { output === '' ? <Image source={require('../../assets/usb.png')} style={{width:45, height:45}}/> : null }
                    <Text>{ output === '' ? 'Не прочитано' : output }</Text>
                </View>
                :
                <View style={styles.outputView}>
                    <Image source={require('../../assets/usb.png')} style={{width:45, height:45}}/>
                    <Text  style={styles.full}>Подключите устройство</Text>
                </View>
            }
          </ScrollView>
          <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Отправить</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  full: {
    flex: 1
  },
  body: {
    flex: 1
  },
  container: {
    flex: 1,
    marginTop: 20,
    marginLeft: 16,
    marginRight: 16,
  },
  header: {
    display: 'flex',
    justifyContent: 'center'
  },
  line: {
    display: 'flex',
    flexDirection: 'row'
  },
  line2: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  title: {
    width: 100
  },
  value: {
    marginLeft: 20
  },
  output: {
    marginTop: 10,
    height: 350,
    padding: 10,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
  },
  inputContainer: {
    marginTop: 10,
    borderBottomWidth: 2
  },
  textInput: {
    paddingLeft: 10,
    paddingRight: 10,
    height: 40
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
    marginTop:25,
    alignSelf:'center'

  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  outputView: {
    justifyContent:'center',
    alignItems:'center'
  }
});

export default RfidScan;
