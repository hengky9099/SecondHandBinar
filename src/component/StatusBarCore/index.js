import {StatusBar, useColorScheme} from 'react-native';
import React from 'react';
import {COLORS} from '../../helpers/colors';

const StatusBarCore = () => {
  const theme = useColorScheme();

  return theme === 'dark' ? (
    <StatusBar barStyle="light-content" backgroundColor={COLORS.neutral} />
  ) : (
    <StatusBar barStyle="dark-content" backgroundColor={COLORS.whitelight} />
  );
};

export default StatusBarCore;
