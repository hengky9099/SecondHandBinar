import {StyleSheet, Text, View, Scrollview} from 'react-native';
import React, {useState} from 'react';
import {Button, Header, Input} from '../../component';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {moderateScale} from 'react-native-size-matters';
import DropDownPicker from 'react-native-dropdown-picker';
import {COLORS} from '../../helpers/colors';
import {useDispatch, useSelector} from 'react-redux';
import ButtonCamera from '../../component/ButtonCamera';
import {kota} from '../../helpers/kota';
import {launchImageLibrary} from 'react-native-image-picker';

const Profile = ({navigation}) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState(kota);
  const [image, setImage] = useState('');

  const changeProfilePhoto = async () => {
    await launchImageLibrary({mediaType: 'photo'}).then(image =>
      setImage(image.assets[0].uri),
    );
  };

  // For validation
  const validationProfile = Yup.object().shape({
    name: Yup.string().required('Nama tidak boleh kosong'),
    kota: Yup.string().required('Kota tidak boleh kosong'),
    alamat: Yup.string().required('Alamat tidak boleh kosong'),
    handphone: Yup.string().required('No. Handphone tidak boleh kosong'),
  });
  return (
    <Formik
      validationSchema={validationProfile}
      initialValues={{name: '', kota: '', alamat: '', handphone: ''}}>
      {({handleChange, handleBlur, values, errors, touched}) => {
        return (
          <View flex={1} style={styles.container}>
            <Header
              headerName={'Lengkapi Info Akun'}
              onPressBack={() => {
                navigation.goBack();
              }}
            />
            <View style={styles.contentContainer}>
              <ButtonCamera onPress={changeProfilePhoto} />

              <Input
                inputName="Nama*"
                placeholder="Nama Lengkap"
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                value={values.name}
              />
            </View>
            {touched.name && errors.name && (
              <Text style={styles.errorValidation}>{errors.name}</Text>
            )}

            <View style={styles.contentContainer}>
              <Text style={styles.kota}>Kota*</Text>
              <DropDownPicker
                style={styles.dropdownPicker}
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
              />
            </View>
            <View style={styles.contentContainer}>
              <Input
                inputName="Alamat*"
                placeholder="Contoh: Jalan Hiu 33"
                multiline={true}
                numberOfLines={4}
                styleInput={styles.alamatContainer}
                onChangeText={handleChange('alamat')}
                onBlur={handleBlur('alamat')}
                value={values.alamat}
              />
            </View>

            {touched.alamat && errors.alamat && (
              <Text style={styles.errorValidation}>{errors.alamat}</Text>
            )}
            <View style={styles.contentContainer}>
              <Input
                keyboardType={'numeric'}
                inputName="No Handphone*"
                placeholder="Contoh: 08123456789"
                onChangeText={handleChange('handphone')}
                onBlur={handleBlur('handphone')}
                value={values.handphone}
              />
            </View>

            {touched.handphone && errors.handphone && (
              <Text style={styles.errorValidation}>{errors.handphone}</Text>
            )}
            <View style={styles.btnSimpan}>
              <Button textButton1={'Simpan'} />
            </View>
          </View>
        );
      }}
    </Formik>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
  },
  alamatContainer: {height: moderateScale(100), textAlignVertical: 'top'},
  errorValidation: {
    marginLeft: moderateScale(15),
    color: 'red',
    marginBottom: moderateScale(10),
  },
  contentContainer: {
    alignItems: 'center',
  },
  btnSimpan: {
    alignItems: 'center',
    marginTop: moderateScale(640),
    position: 'absolute',
    left: moderateScale(10),
  },
  dropdownPicker: {
    width: moderateScale(325),
    marginLeft: moderateScale(15),
    backgroundColor: COLORS.white,
    borderColor: COLORS.neutral2,
    borderRadius: moderateScale(10),
  },
  kota: {
    color: COLORS.black,
    left: moderateScale(-145),
  },
});
