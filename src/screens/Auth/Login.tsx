import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity,  Alert } from 'react-native';
import { connect } from 'react-redux';
import {
  NavigationScreenProp,
  NavigationState,
} from 'react-navigation';
import { IStoreState } from '../../types/index';
import { TextInput, ActivityIndicator } from 'react-native-paper';
import { loginAction,getFarmerAction, getAllMedicineAction } from "../../actions/index";

interface IProps {
  navigation: NavigationScreenProp<NavigationState>;
}

class Login extends React.Component {
  private state = {
    username: '',
    password: '',
    loading: false
  }
  public async componentDidMount() {
  }

  private logIn = async() =>{
    this.setState({
      loading: true
    });
    const { login, getFarmers, getAllMedicine } = this.props;
    try{
      const response = await login(this.state.username, this.state.password);
      await getFarmers();
      await getAllMedicine();
      if(response.ok){
        this.props.navigation.navigate('Instruction')
      }else{
        Alert.alert( `Логин или пароль не верны`)
      }
    }catch(e){
      console.log(e)
    }
    this.setState({
      loading: false
    });
  }

  public render() {
    return (
    <View style={styles.constainer}>
      <View style={{height:'30%', justifyContent: 'flex-end', marginBottom:30}}>
        <Text style={styles.mainText}>Вход</Text>
      </View>

      <View style={{marginTop:25, height:'70%', width:'100%', alignItems:'center'}}>
        <View style={styles.inputContainer}>
        <TextInput
          underlineColorAndroid='transparent'
          color="transparent"
          placeholder="Логин"
          onChangeText={(text) => this.setState({username:text})}
          style={styles.input}
        />
        </View>

        <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Пароль"
          onChangeText={(text) => this.setState({password:text})}
          underlineColorAndroid="red"
        />
        </View>
        
        <TouchableOpacity style={styles.button} onPress={this.logIn}>
          {
            this.state.loading?
              <ActivityIndicator color="white" />
            :
            <Text style={styles.textButton}>Войти</Text>
          }
        </TouchableOpacity>
      </View>
    </View>
    )
  }
}

const styles = StyleSheet.create({
  constainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  mainText:{
    alignSelf:'center',
    fontSize: 24, 
    fontWeight: 'bold',
  },
  inputContainer: {
    width:'85%',
    borderRadius: 5,
    backgroundColor: 'transparent',
    borderWidth: 0.5,
    borderColor:'#4B4C4B',
    marginVertical:10,
    height: 52,
    overflow: 'hidden',

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
  input: {
    borderRadius: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    height: 57,
    overflow: 'hidden',
    backgroundColor: '#fff',
},
})

const mapStateToProps = (state: IStoreState) => {
  return {}
};

const mapDispatchToProps = {
  login: loginAction,
  getFarmers:  getFarmerAction,
  getAllMedicine: getAllMedicineAction
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
