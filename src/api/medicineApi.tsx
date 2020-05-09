import AsyncStorage from '@react-native-community/async-storage';
import { STRINGS } from '../constants/index';

const { TOKEN } = STRINGS;
const GET_FARMERS = 'https://vetprof.herokuapp.com/vaccination/Medicine/'

const getMedicine = async () => {
  const token = await AsyncStorage.getItem(TOKEN, data=> { return data })

    const headers = {
      Authorization: "Token " + token,
        'Content-Type': 'application/json',
    };
    const params = {
      method: 'GET',
      headers
    };
  
    const response = await fetch(`${GET_FARMERS}`, params);
    return response;
  };

  export { getMedicine }