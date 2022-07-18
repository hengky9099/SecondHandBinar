import {StyleSheet, TouchableOpacity, View, Dimensions} from 'react-native';
import React, {useState} from 'react';
import {moderateScale} from 'react-native-size-matters';
import {COLORS} from '../../helpers/colors';
import Feather from 'react-native-vector-icons/Feather';
import {Poppins} from '../FontComponents';

const {width} = Dimensions.get('window');

const ButtonFitur = ({nameFitur, nameIcon, onPressButton, disabled}) => {
  const [selected, setSelected] = useState([]);

  return (
    <TouchableOpacity onPress={() => setSelected(onPressButton)}>
      {setSelected ? (
        <View style={[styles.toButton, selected && styles.toButtonSelect]}>
          <Poppins
            type="Medium"
            style={[styles.nameFitur, selected && styles.nameFiturSelect]}>
            <Feather name={nameIcon} size={20} /> {nameFitur}
          </Poppins>
        </View>
      ) : null}
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
