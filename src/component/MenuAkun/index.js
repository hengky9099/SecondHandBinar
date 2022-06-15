import {StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {Poppins} from '../FontComponents';
import {moderateScale} from 'react-native-size-matters';
import {COLORS} from '../../helpers/colors';
import Feather from 'react-native-vector-icons/Feather';

const MenuAkun = ({menuName, nameIcon, onPress}) => {
  return (
    <TouchableOpacity style={styles.page} onPress={onPress}>
      <Feather name={nameIcon} size={24} color={COLORS.purple4} />
      <Poppins style={styles.text} type="Medium">
        {menuName}
      </Poppins>
    </TouchableOpacity>
  );
};

export default MenuAkun;

const styles = StyleSheet.create({
  text: {
    fontSize: moderateScale(14),
    color: COLORS.black,
    marginStart: moderateScale(15),
  },
  page: {
    flexDirection: 'row',
    margin: moderateScale(10),
  },
});
