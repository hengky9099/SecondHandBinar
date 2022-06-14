import {StyleSheet, Text} from 'react-native';
import React from 'react';

const Poppins = ({style, children, type = 'Regular'}) => {
  const passedStyles = Array.isArray(style)
    ? Object.assign({}, ...style)
    : style;

  const styles = StyleSheet.create({
    font: {
      fontFamily: `Poppins-${type}`,
    },
  });

  return <Text style={[styles.font, {...passedStyles}]}>{children}</Text>;
};

export default Poppins;
