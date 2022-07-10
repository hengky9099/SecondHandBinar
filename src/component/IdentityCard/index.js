import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Poppins} from '../FontComponents';
import {moderateScale} from 'react-native-size-matters';
import {COLORS} from '../../helpers/colors';

const IdentityCard = ({urlImage, nama, kota, onPressButton, typeIdentity}) => {
  return (
    <View style={styles.border}>
      <View style={styles.page}>
        <View>
          <Image style={styles.image} source={{uri: urlImage}} />
        </View>
        <View style={styles.textContainer}>
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
    borderColor: COLORS.purple4,
    borderWidth: moderateScale(1),
  },
  buttonText: {
    color: COLORS.black,
    fontSize: moderateScale(12),
    textAlign: 'center',
    marginTop: moderateScale(2),
  },
  page: {
    flexDirection: 'row',
    height: moderateScale(80),
    alignItems: 'center',
    padding: moderateScale(16),
    justifyContent: 'space-evenly',
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
  border: {
    borderWidth: moderateScale(1),
    borderColor: COLORS.neutral1,
    borderRadius: moderateScale(16),
    margin: moderateScale(10),
  },
  textContainer: {
    alignItems: 'flex-start',
    flex: 1,
    marginStart: moderateScale(10),
  },
});
