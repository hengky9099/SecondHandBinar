import {StyleSheet, TouchableOpacity, View, Image} from 'react-native';
import React from 'react';
import {moderateScale} from 'react-native-size-matters';
import {COLORS} from '../../helpers/colors';
import {cameraPic} from '../../assets';

const ButtonCamera = ({onPress, url, type = 'change'}) => {
  if (type === 'change') {
    return (
      <TouchableOpacity style={styles.toCamera} onPress={onPress}>
        <View style={styles.containerCamera}>
          <Image
            source={url ? {uri: url} : cameraPic}
            style={styles.imageCamera}
          />
        </View>
      </TouchableOpacity>
    );
  } else if (type === 'notChange') {
    return (
      <View style={styles.toCamera}>
        <View style={styles.containerCamera}>
          <Image
            source={url ? {uri: url} : cameraPic}
            style={styles.imageCamera}
          />
        </View>
      </View>
    );
  }
};

export default ButtonCamera;

const styles = StyleSheet.create({
  toCamera: {
    padding: moderateScale(5),
    margin: moderateScale(10),
  },
  containerCamera: {
    backgroundColor: COLORS.primaryPurple,
    borderRadius: moderateScale(20),
    justifyContent: 'center',
    alignItems: 'center',
    width: moderateScale(120),
    // marginHorizontal: moderateScale(100),

    paddingVertical: moderateScale(50),
  },
  imageCamera: {width: moderateScale(30), height: moderateScale(30)},
});
