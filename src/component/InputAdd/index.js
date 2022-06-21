import {StyleSheet, TouchableOpacity} from 'react-native';
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
      <Feather
        size={24}
        name="plus"
        color={COLORS.neutral3}
        style={style.plus}
      />
      {product ? <Poppins style={styles.text}>Tambah Produk</Poppins> : null}
    </TouchableOpacity>
  );
};

export default InputAdd;

const styles = StyleSheet.create({
  border: {
    width: moderateScale(96),
    height: moderateScale(96),
    borderRadius: moderateScale(!2),
    borderColor: COLORS.neutral2,
    borderWidth: moderateScale(1),
    borderStyle: 'dashed',
  },
  plus: {
    alignSelf: 'center',
    marginBottom: moderateScale(8),
  },
  text: {
    fontSize: moderateScale(12),
    textAlign: 'center',
    alignSelf: 'center',
  },
});
