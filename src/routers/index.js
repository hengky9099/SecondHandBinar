import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {useDispatch} from 'react-redux';
import {navigationRef} from '../helpers/navigate';
import {setConnection} from '../redux/globalAction';
import NetInfo from '@react-native-community/netinfo';
import MainStack from './MainStack';

const Root = () => {
  const dispatch = useDispatch();

  NetInfo.addEventListener(state => {
    console.log('Connection type', state.type);
    console.log('Is connected?', state.isConnected);

    dispatch(setConnection(state.isConnected));
  });

  return (
    <NavigationContainer ref={navigationRef}>
      <MainStack />
    </NavigationContainer>
  );
};

export default Root;
