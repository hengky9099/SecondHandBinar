import {StyleSheet, Text} from 'react-native';
import React from 'react';

const Poppins = ({style, children, type = 'Regular', numberOfLines = 0}) => {
  const passedStyles = Array.isArray(style)
    ? Object.assign({}, ...style)
    : style;

  const styles = StyleSheet.create({
    font: {
      fontFamily: `Poppins-${type}`,
    },
  });

  return (
    <Text
      ellipsizeMode="tail"
      numberOfLines={numberOfLines}
      style={[styles.font, {...passedStyles}]}>
      {children}
    </Text>
  );
};

export default Poppins;
