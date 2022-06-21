import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Poppins} from '../FontComponents';
import {moderateScale} from 'react-native-size-matters';
import {COLORS} from '../../helpers/colors';

const IdentityCard = ({urlImage, nama, kota, onPressButton, typeIdentity}) => {
  return (
    <View>
      <View style={styles.page}>
        <View>
          <Image style={styles.image} source={{uri: urlImage}} />
        </View>
        <View>
          <Poppins type="Medium" style={styles.text1}>
            {nama}
          </Poppins>
          <Poppins style={styles.text2}>{kota}</Poppins>
        </View>
        {typeIdentity === 'Penjual' ? (
          <View>
            <TouchableOpacity style={styles.button} onPress={onPressButton}>
              <Poppins type="Medium" style={styles.buttonText}>
                Edit
              </Poppins>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    </View>
  );
};

export default IdentityCard;

const styles = StyleSheet.create({
  button: {
    width: moderateScale(47),
    height: moderateScale(26),
    borderRadius: moderateScale(16),
    backgroundColor: COLORS.purple4,
    margin: moderateScale(5),
  },
  buttonText: {
    color: COLORS.black,
    fontSize: moderateScale(12),
    alignSelf: 'center',
  },
  page: {
    flexDirection: 'row',
    width: moderateScale(328),
    height: moderateScale(80),
    alignSelf: 'center',
  },
  text1: {
    fontSize: moderateScale(14),
    color: COLORS.black,
  },
  text2: {
    fontSize: moderateScale(10),
    color: COLORS.neutral3,
  },
  image: {
    width: moderateScale(48),
    height: moderateScale(48),
    borderRadius: moderateScale(12),
  },
});
