import {StyleSheet, TouchableOpacity, View, Image} from 'react-native';
import React from 'react';
import {camera} from '../../assets/icon';
import {moderateScale} from 'react-native-size-matters';
import {COLORS} from '../../helpers/colors';

const ButtonIcon = ({onPress}) => {
  return (
    <TouchableOpacity style={styles.toCamera} onPress={onPress}>
      <View style={styles.containerCamera}>
        <Image source={camera} style={styles.imageCamera} />
      </View>
    </TouchableOpacity>
  );
};

export default ButtonIcon;

const styles = StyleSheet.create({
  toCamera: {
    padding: moderateScale(5),
    margin: moderateScale(10),
  },
  containerCamera: {
    backgroundColor: COLORS.primaryPurple,
    borderRadius: moderateScale(15),
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: moderateScale(100),
    paddingVertical: moderateScale(50),
  },
  imageCamera: {width: moderateScale(30), height: moderateScale(30)},
});
