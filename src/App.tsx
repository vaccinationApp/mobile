import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Router from './router/index';
import getStore from './store';
import { PersistLoader } from '../src/screens';

const { store, persistor } = getStore();

const Loader = PersistLoader;

class App extends React.Component {

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={<Loader />} persistor={persistor}>
          <Router />
        </PersistGate>
      </Provider>
    )
  }
};

export default App;