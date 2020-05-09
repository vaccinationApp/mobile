import { combineReducers } from 'redux';
import { IStoreState } from '../types/index';
import currentUser from './currentUser';

const getRootReducer = () => {
  // @ts-ignore
  return combineReducers<IStoreState>({
    currentUser
  });
};

export default getRootReducer;