import { Dispatch } from 'redux';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { IStoreState } from '../../types/index';
import { STRINGS } from '../../constants/index';
import { getMedicine } from '../../api/medicineApi';

const { ALL_MEDICINE } =  STRINGS;

  const getAllMedicineAction = () => async (
    dispatch: Dispatch<IStoreState>
  ) => {
    try {
      const response = await getMedicine();
      const responseJson = await response.json();

      AsyncStorage.setItem(ALL_MEDICINE, JSON.stringify(responseJson.results));

    }catch(error){
        console.log(error.message)
    }
  };

  export { getAllMedicineAction }