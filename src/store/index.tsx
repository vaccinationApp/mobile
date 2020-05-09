import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import { composeWithDevTools } from 'redux-devtools-extension';
import getRootReducer from '../reducers/';

const persistConfig = {
  key: 'root',
  whitelist: [ ],
  storage: AsyncStorage
};

const persistedReducer = persistReducer(persistConfig, getRootReducer());

export default () => {
  const store = createStore(
    persistedReducer,
    composeWithDevTools(applyMiddleware(thunk))
  );
  const persistor = persistStore(store);
  return { store, persistor };
};
