import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from './src/redux/store';
import {Provider} from 'react-redux';
import Root from './src/routers';

export default function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Root />
      </PersistGate>
    </Provider>
  );
}
