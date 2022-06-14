import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Poppins} from '../FontComponents';
import {moderateScale} from 'react-native-size-matters';
import {COLORS} from '../../helpers/colors';
import Feather from 'react-native-vector-icons/Feather';

const Header = ({headerName, onPressBack, backArrowBackground = false}) => {
  const styles = StyleSheet.create({
    text: {
      fontSize: moderateScale(14),
      color: COLORS.black,
    },
    textTitle: {
      justifyContent: 'center',
      flex: 1,
      alignItems: 'center',
    },
    backArrow: {
      justifyContent: 'flex-start',
      backgroundColor: backArrowBackground ? COLORS.white : '',
      borderRadius: backArrowBackground ? moderateScale(100) : 0,
    },
    page: {
      flexDirection: 'row',
      margin: moderateScale(5),
    },
    icon: {
      margin: moderateScale(5),
    },
  });

  return (
    <View style={styles.page}>
      <TouchableOpacity style={styles.backArrow} onPress={onPressBack}>
        <Feather
          style={styles.icon}
          name="arrow-left"
          size={24}
          color={COLORS.black}
        />
      </TouchableOpacity>
      {headerName ? (
        <View style={styles.textTitle}>
          <Poppins type="Medium" style={styles.text}>
            {headerName}
          </Poppins>
        </View>
      ) : null}
    </View>
  );
};

export default Header;
