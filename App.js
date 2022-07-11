import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from './src/redux/store';
import {Provider} from 'react-redux';
import Root from './src/routers';
import codePush from 'react-native-code-push';

const codePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_START,
};

const App = () => {
  const syncWithCodePush = status => {
    console.log('Codepush sync status', status);
  };

  useEffect(() => {
    SplashScreen.hide();
    codePush.sync(
      {installMode: codePush.InstallMode.IMMEDIATE},
      syncWithCodePush,
    );
  }, []);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Root />
      </PersistGate>
    </Provider>
  );
};

export default codePush(codePushOptions)(App);
