import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {moderateScale} from 'react-native-size-matters';
import {COLORS} from '../../helpers/colors';
import {Poppins} from '../FontComponents';

const Button = ({
  onPressButton1,
  onPressButton2,
  numButton = 1,
  textButton1,
  textButton2,
  buttonColor = COLORS.purple4,
}) => {
  const styles = StyleSheet.create({
    buttonText1: {
      fontSize: moderateScale(14),
      color: COLORS.white,
    },
    button1: {
      height: moderateScale(48),
      borderRadius: moderateScale(16),
      backgroundColor: buttonColor,
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: moderateScale(15),
    },
    button2: {
      width: moderateScale(156),
      backgroundColor: COLORS.purple4,
      height: moderateScale(48),
      borderRadius: moderateScale(16),
      alignItems: 'center',
      margin: moderateScale(5),
      justifyContent: 'center',
    },
    buttonText2: {
      color: COLORS.white,
      fontSize: moderateScale(14),
    },
    buttonText11: {
      color: COLORS.black,
      fontSize: moderateScale(14),
    },
    button11: {
      width: moderateScale(156),
      height: moderateScale(48),
      borderRadius: moderateScale(16),
      borderColor: COLORS.purple4,
      borderWidth: 1,
      alignItems: 'center',
      justifyContent: 'center',
      margin: moderateScale(5),
    },
    buttonContainer: {
      flexDirection: 'row',
    },
  });

  if (numButton === 1) {
    return (
      <TouchableOpacity style={styles.button1} onPress={onPressButton1}>
        <Poppins type="Medium" style={styles.buttonText1}>
          {textButton1}
        </Poppins>
      </TouchableOpacity>
    );
  } else if (numButton === 2) {
    return (
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button11} onPress={onPressButton1}>
          <Poppins type="Medium" style={styles.buttonText11}>
            {textButton1}
          </Poppins>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button2]} onPress={onPressButton2}>
          <Poppins type="Medium" style={[styles.buttonText2]}>
            {textButton2}
          </Poppins>
        </TouchableOpacity>
      </View>
    );
  }
};

export default Button;
