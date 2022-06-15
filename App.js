import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import Root from './src/routers';

export default function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return <Root />;
}
