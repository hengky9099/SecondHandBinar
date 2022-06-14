import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {Text, View} from 'react-native';

export default function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <View>
      <Text>App</Text>
    </View>
  );
}
