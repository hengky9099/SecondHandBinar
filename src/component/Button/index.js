import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {moderateScale} from 'react-native-size-matters';
import {COLORS} from '../../helpers/colors';
import {Poppins} from '../FontComponents';
import {Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

const Button = ({
  onPressButton1,
  onPressButton2,
  numButton = 1,
  textButton1,
  textButton2,
}) => {
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
          <Poppins type="Medium" style={styles.buttonText1}>
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

const styles = StyleSheet.create({
  buttonText1: {
    fontSize: moderateScale(14),
    color: COLORS.white,
  },
  button1: {
    width: width - moderateScale(30),
    height: moderateScale(48),
    borderRadius: moderateScale(16),
    backgroundColor: COLORS.purple4,
    alignItems: 'center',
    justifyContent: 'center',
    margin: moderateScale(5),
  },
  button2: {
    borderColor: COLORS.purple4,
    width: moderateScale(156),
    height: moderateScale(48),
    borderRadius: moderateScale(16),
    borderWidth: 1,
    alignItems: 'center',
    margin: moderateScale(5),
    justifyContent: 'center',
  },
  buttonText2: {
    color: COLORS.black,
    fontSize: moderateScale(14),
  },
  button11: {
    width: moderateScale(156),
    height: moderateScale(48),
    borderRadius: moderateScale(16),
    backgroundColor: COLORS.purple4,
    alignItems: 'center',
    justifyContent: 'center',
    margin: moderateScale(5),
  },
  buttonContainer: {
    flexDirection: 'row',
  },
});
