import {StyleSheet, View} from 'react-native';
import React from 'react';
import {moderateScale} from 'react-native-size-matters';

const Dot = ({color}) => {
  const styles = StyleSheet.create({
    dot: {
      borderRadius: moderateScale(100),
      backgroundColor: color,
      width: moderateScale(8),
      height: moderateScale(8),
    },
  });

  return <View style={styles.dot} />;
};

export default Dot;
