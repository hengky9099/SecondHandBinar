import {View, StyleSheet} from 'react-native';
import React from 'react';
import {COLORS} from '../../helpers/colors';
import {moderateScale} from 'react-native-size-matters';
import {navigate} from '../../helpers/navigate';
import {ButtonCamera, MenuAkun, Poppins, StatusBarCore} from '../../component';

const Akun = () => {
  const logout = () => navigate('Home');
  const pengaturanAkun = () => null;

  return (
    <View style={styles.container}>
      <StatusBarCore />
      <View style={styles.headerAkun}>
        <Poppins style={styles.textHeaderAkun}>Akun Saya</Poppins>
      </View>
      <ButtonCamera />
      <View style={styles.listFiturAkun}>
        <MenuAkun nameIcon="edit-3" menuName="Ubah Akun" onPress={Akun} />
        <MenuAkun
          nameIcon="settings"
          menuName="Pengaturan Akun"
          onPress={pengaturanAkun}
        />
        <MenuAkun nameIcon="log-out" menuName="Keluar" onPress={logout} />
      </View>
      <View style={styles.textVersionContainer}>
        <Poppins style={styles.textVersion} type="Bold">
          Version 1.0.0
        </Poppins>
      </View>
    </View>
  );
};

export default Akun;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  headerAkun: {
    paddingHorizontal: moderateScale(15),
    paddingVertical: moderateScale(10),
  },
  textHeaderAkun: {
    fontSize: moderateScale(20),
    color: COLORS.black,
    fontWeight: 'bold',
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
  imageCamera: {
    width: moderateScale(30),
    height: moderateScale(30),
  },
  listFiturAkun: {
    paddingHorizontal: moderateScale(5),
    paddingTop: moderateScale(10),
  },
  textVersionContainer: {
    alignItems: 'center',
    marginTop: moderateScale(16),
  },
  textVersion: {
    color: COLORS.neutral3,
    fontSize: moderateScale(12),
  },
});
