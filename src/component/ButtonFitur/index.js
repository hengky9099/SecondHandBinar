import {StyleSheet, TouchableOpacity, View, Dimensions} from 'react-native';
import React, {useState} from 'react';
import {moderateScale} from 'react-native-size-matters';
import {COLORS} from '../../helpers/colors';
import Feather from 'react-native-vector-icons/Feather';
import {Poppins} from '../FontComponents';

const {width} = Dimensions.get('window');
const ButtonFitur = ({nameFitur, nameIcon, onPressButton, disabled}) => {
  return (
    <TouchableOpacity
      activeOpacity={disabled ? 1 : 0.7}
      onPress={!disabled && onPressButton}>
      <View style={styles.toButton}>
        <Poppins type="Medium" style={styles.nameFitur}>
          <Feather name={nameIcon} size={18} /> {nameFitur}
        </Poppins>
      </View>
    </TouchableOpacity>
  );
};

export default ButtonFitur;

const styles = StyleSheet.create({
  toButton: {
    height: moderateScale(44),
    borderRadius: moderateScale(16),
    backgroundColor: TouchableOpacity ? COLORS.purple4 : COLORS.primaryPurple,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: moderateScale(8),
    padding: moderateScale(10),
  },
  toButtonSelect: {backgroundColor: COLORS.primaryPurple},
  nameFitur: {
    fontSize: moderateScale(14),
    color: COLORS.white,
  },
  nameFiturSelect: {
    color: COLORS.black,
  },
});
