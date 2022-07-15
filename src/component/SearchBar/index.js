import {StyleSheet, TextInput, View} from 'react-native';
import React from 'react';
import {COLORS} from '../../helpers/colors';
import Feather from 'react-native-vector-icons/Feather';
import {moderateScale} from 'react-native-size-matters';

const Input = ({
  onChangeText,
  value,
  styleInput,
  onSubmitEditing,
  onEndEditing,
}) => {
  const stylesInput = Array.isArray(styleInput)
    ? Object.assign({}, ...styleInput)
    : styleInput;

  return (
    <View style={styles.page}>
      <View style={styles.toRow}>
        <TextInput
          style={[styles.input, {...stylesInput}]}
          onChangeText={onChangeText}
          value={value}
          placeholder="Search in Here"
          onSubmitEditing={onSubmitEditing}
          onEndEditing={onEndEditing}
        />
        <View style={styles.icon}>
          <Feather name="search" color={COLORS.black} size={17} />
        </View>
      </View>
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  input: {
    height: moderateScale(48),
    borderRadius: moderateScale(16),
    borderColor: COLORS.neutral2,
    borderWidth: 1,
    padding: moderateScale(15),
    color: COLORS.neutral3,
    backgroundColor: COLORS.white,
    paddingHorizontal: moderateScale(30),
  },
  toRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  page: {
    margin: moderateScale(5),
  },
  icon: {
    marginStart: moderateScale(-30),
  },
});
