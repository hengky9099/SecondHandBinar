import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {COLORS} from '../../helpers/colors';
import Feather from 'react-native-vector-icons/Feather';
import {moderateScale} from 'react-native-size-matters';
import {Poppins} from '../FontComponents';

const Input = ({
  onChangeText,
  value,
  placeholder,
  secureTextEntry = false,
  styleInput,
  placeholderTextColor = COLORS.neutral3,
  onSubmitEditing,
  password = false,
  styleInputName,
  inputName,
  required = false,
  multiline,
  numberOfLines,
  onBlur,
  keyboardType,
}) => {
  const stylesInput = Array.isArray(styleInput)
    ? Object.assign({}, ...styleInput)
    : styleInput;

  const stylesInputName = Array.isArray(styleInputName)
    ? Object.assign({}, ...styleInputName)
    : styleInputName;

  const [seenPass, setSeenPass] = useState(false);

  const seenPassword = () => {
    if (seenPass) {
      setSeenPass(false);
    } else {
      setSeenPass(true);
    }
  };

  return (
    <View style={styles.page}>
      <View style={styles.inputNameContainer}>
        <Poppins style={[styles.inputName, {...stylesInputName}]}>
          {inputName}
        </Poppins>
        {required ? <Poppins style={styles.asterik}>*</Poppins> : null}
      </View>
      <View style={password ? styles.password : null}>
        <TextInput
          style={[styles.input, {...stylesInput}]}
          onChangeText={onChangeText}
          value={value}
          onBlur={onBlur}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          secureTextEntry={secureTextEntry && !seenPass ? true : false}
          onSubmitEditing={onSubmitEditing}
          multiline={multiline}
          numberOfLines={numberOfLines}
          keyboardType={keyboardType}
        />
        {password ? (
          <TouchableOpacity style={styles.seenButton} onPress={seenPassword}>
            <Feather
              name={seenPass ? 'eye' : 'eye-off'}
              color={COLORS.neutral3}
              size={17}
            />
          </TouchableOpacity>
        ) : null}
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
    marginHorizontal: moderateScale(15),
  },
  inputName: {
    fontSize: moderateScale(12),
    color: COLORS.black,
  },
  password: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seenButton: {
    marginStart: moderateScale(-50),
  },
  page: {
    margin: moderateScale(5),
  },
  asterik: {
    fontSize: moderateScale(12),
    color: COLORS.red,
  },
  inputNameContainer: {
    flexDirection: 'row',
  },
});
