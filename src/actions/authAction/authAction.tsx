import { Dispatch } from 'redux';
import AsyncStorage from '@react-native-community/async-storage';
import { loginRequest } from '../../api/authApi';
import { IStoreState } from '../../types/index';
import { STRINGS } from '../../constants/index';

const { TOKEN, IS_FIRST_LAUNCH } =  STRINGS;

  const loginAction = (username: string, password: string) => async (
    dispatch: Dispatch<IStoreState>
  ) => {
    try {
      const response = await loginRequest(username, password);
      const { token } = response;

      AsyncStorage.setItem(TOKEN, token);
      AsyncStorage.setItem(IS_FIRST_LAUNCH, 'true');

      if(!response.ok){
        return false
      }else{
        return true
      }
      
    }catch(error){
      console.log(error)
        return false
    }
  };

  export { loginAction }