import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {moderateScale} from 'react-native-size-matters';
import {COLORS} from '../../helpers/colors';
import Feather from 'react-native-vector-icons/Feather';
import {Poppins} from '../FontComponents';

const InputAdd = ({style, product = false, onPress}) => {
  const passedStyles = Array.isArray(style)
    ? Object.assign({}, ...style)
    : style;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.border, {...passedStyles}]}>
      <View style={styles.plusContainer}>
        <Feather
          size={24}
          name="plus"
          color={COLORS.neutral3}
          style={styles.plus}
        />
        {product ? <Poppins style={styles.text}>Tambah Produk</Poppins> : null}
      </View>
    </TouchableOpacity>
  );
};

export default InputAdd;

const styles = StyleSheet.create({
  border: {
    width: moderateScale(100),
    height: moderateScale(100),
    borderRadius: moderateScale(12),
    borderColor: COLORS.neutral2,
    borderWidth: moderateScale(1),
    borderStyle: 'dashed',
    margin: moderateScale(5),
    marginHorizontal: moderateScale(10),
  },
  plus: {
    marginBottom: moderateScale(8),
  },
  text: {
    fontSize: moderateScale(12),
  },
  plusContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});
