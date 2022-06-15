import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {navigationRef} from '../helpers/navigate';
import MainStack from './MainStack';

const Root = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <MainStack />
    </NavigationContainer>
  );
};

export default Root;
