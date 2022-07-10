import {StyleSheet, TouchableOpacity, View, Dimensions} from 'react-native';
import React, {useState} from 'react';
import {moderateScale} from 'react-native-size-matters';
import {COLORS} from '../../helpers/colors';
import Feather from 'react-native-vector-icons/Feather';
import {Poppins} from '../FontComponents';

const {width} = Dimensions.get('window');

const ButtonFitur = ({nameFitur, nameIcon, onPressButton}) => {
  const [selected, setSelected] = useState([]);

  return (
    <TouchableOpacity
      onPress={onPressButton ? onPressButton : () => setSelected()}>
      <View style={[styles.toButton, selected && styles.toButtonSelect]}>
        <Poppins
          type="Medium"
          style={[styles.nameFitur, selected && styles.nameFiturSelect]}>
          <Feather name={nameIcon} size={20} /> {nameFitur}
        </Poppins>
      </View>
    </TouchableOpacity>
  );
};

export default ButtonFitur;

const styles = StyleSheet.create({
  toButton: {
    width: width - moderateScale(240),
    height: moderateScale(44),
    borderRadius: moderateScale(16),
    backgroundColor: TouchableOpacity ? COLORS.purple4 : COLORS.primaryPurple,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: moderateScale(8),
    flexGrow: 0,
  },
  toButtonSelect: {backgroundColor: COLORS.primaryPurple},
  nameFitur: {
    fontSize: moderateScale(16),
    color: COLORS.white,
  },
  nameFiturSelect: {
    color: COLORS.black,
  },
});
