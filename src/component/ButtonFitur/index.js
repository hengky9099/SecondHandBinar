import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {moderateScale} from 'react-native-size-matters';
import {COLORS} from '../../helpers/colors';
import Feather from 'react-native-vector-icons/Feather';
import {Poppins} from '../FontComponents';

const ButtonFitur = ({nameFitur, nameIcon, onPressButton, clicked}) => {
  const styles = StyleSheet.create({
    toButton: {
      height: moderateScale(44),
      borderRadius: moderateScale(16),
      backgroundColor: clicked ? COLORS.purple5 : COLORS.primaryPurple,
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: moderateScale(8),
      padding: moderateScale(10),
    },
    nameFitur: {
      fontSize: moderateScale(14),
      color: COLORS.white,
    },
    nameFiturSelect: {
      color: COLORS.black,
    },
  });

  return (
    <TouchableOpacity onPress={onPressButton}>
      <View style={styles.toButton}>
        <Poppins type="Medium" style={styles.nameFitur}>
          <Feather name={nameIcon} size={20} /> {nameFitur}
        </Poppins>
      </View>
    </TouchableOpacity>
  );
};

export default ButtonFitur;
