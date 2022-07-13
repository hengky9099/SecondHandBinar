import {StyleSheet, TouchableOpacity, View, Image, Text} from 'react-native';
import React from 'react';
import {moderateScale} from 'react-native-size-matters';
import {COLORS} from '../../helpers/colors';
import {cameraPic} from '../../assets';


const ButtonCamera = ({onPress, url}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.toCamera} onPress={onPress}>
        <Image
          source={url ? {uri: url} : cameraPic}
          style={url ? styles.urlCamera : styles.imageCamera}
        />
      </TouchableOpacity>
    </View>
  );
};

export default ButtonCamera;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  toCamera: {
    padding: moderateScale(5),
    margin: moderateScale(10),
    backgroundColor: COLORS.primaryPurple,
    borderRadius: moderateScale(20),
    width: moderateScale(120),
    height: moderateScale(120),
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageCamera: {width: moderateScale(30), height: moderateScale(30)},
  urlCamera: {
    width: moderateScale(120),
    height: moderateScale(120),
    borderRadius: moderateScale(20),
  },
});
