import {View, Image, StyleSheet} from 'react-native';
import React from 'react';
import {moderateScale} from 'react-native-size-matters';
import {Poppins} from '../FontComponents';
import {COLORS} from '../../helpers/colors';
import {noConnectionPic} from '../../assets';

const NoConnection = connection => {
  if (connection) {
    return null;
  } else if (!connection) {
    return (
      <View style={styles.containerPage}>
        <Image style={styles.image} source={noConnectionPic} />
        <Poppins style={styles.text}>
          Turn On your Internet Connection, Please! :)
        </Poppins>
      </View>
    );
  }
};

export default NoConnection;

const styles = StyleSheet.create({
  containerPage: {
    justifyContent: 'center',
    margin: moderateScale(10),
  },
  image: {
    width: moderateScale(70),
    height: moderateScale(40),
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  text: {
    fontSize: 17,
    color: COLORS.purple4,
    textAlign: 'center',
    margin: moderateScale(15),
  },
});
