import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {COLORS} from '../../helpers/colors';
import {moderateScale} from 'react-native-size-matters';
import MenuAkun from '../../component/MenuAkun';
import {Poppins} from '../../component/FontComponents';
import ButtonIcon from '../../component/ButtonIcon';

const Akun = () => {
  return (
    <View style={styles.container}>
      <View style={styles.headerAkun}>
        <Text style={styles.textHeaderAkun}>Akun Saya</Text>
      </View>
      <ButtonIcon />
      <View style={styles.listFiturAkun}>
        <MenuAkun nameIcon="edit-3" menuName="Ubah Akun" onPress={Akun} />
      </View>
      <View style={styles.textVersion}>
        <Poppins>Version 1.0.0</Poppins>
      </View>
    </View>
  );
};

export default Akun;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: COLORS.white},
  headerAkun: {
    paddingHorizontal: moderateScale(15),
    paddingVertical: moderateScale(10),
  },
  textHeaderAkun: {
    fontFamily: 'Poppins-Bold',
    fontSize: moderateScale(20),
    color: COLORS.black,
  },
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
  listFiturAkun: {
    paddingHorizontal: moderateScale(5),
    paddingTop: moderateScale(10),
  },
  textVersion: {alignItems: 'center', paddingTop: moderateScale(15)},
});
