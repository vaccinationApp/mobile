import { Dispatch } from 'redux';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { getFarmers } from '../../api/farmerApi';
import { IStoreState } from '../../types/index';
import { STRINGS } from '../../constants/index';

const { VACCINATORS } =  STRINGS;

  const getFarmerAction = () => async (
    dispatch: Dispatch<IStoreState>
  ) => {
    try {
      const response = await getFarmers();
      const responseJson = await response.json();

      AsyncStorage.setItem(VACCINATORS, JSON.stringify(responseJson.results));

    }catch(error){
        console.log(error.message)
    }
  };

  export { getFarmerAction }