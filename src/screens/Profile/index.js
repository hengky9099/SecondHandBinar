import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {Button, Header, Input, Poppins} from '../../component';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {moderateScale} from 'react-native-size-matters';
import DropDownPicker from 'react-native-dropdown-picker';
import {COLORS} from '../../helpers/colors';
import {useDispatch, useSelector} from 'react-redux';
import ButtonCamera from '../../component/ButtonCamera';
import {kota} from '../../helpers/kota';
import {launchImageLibrary} from 'react-native-image-picker';
import {baseUrl} from '@env';
import axios from 'axios';
import {setLoading} from '../../redux/globalAction';
import {setDataUser} from '../Login/redux/action';
import {navigate} from '../../helpers/navigate';
import LoadingBar from '../../component/LoadingBar';
import {setStatusToastPostProduct} from '../LengkapiDetailProduk/redux/action';
import Toast from 'react-native-toast-message';

const Profile = ({navigation}) => {
  const {dataLogin, dataUser} = useSelector(state => state.login);
  const {loading} = useSelector(state => state.global);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(dataUser?.city ? dataUser.city : null);
  const [items, setItems] = useState(kota);
  const [image, setImage] = useState('');
  const [user] = useState({
    full_name: dataUser?.full_name ? dataUser?.full_name : 'Nama',
    city: dataUser?.city ? dataUser?.city : 'Kota',
    address: dataUser?.address ? dataUser?.address : 'Alamat',
    phone_number: dataUser?.phone_number ? dataUser?.phone_number : 'Nomer HP',
    email: dataUser?.email ? dataUser?.email : 'Email',
    image: dataUser?.image_url
      ? dataUser?.image_url
      : 'https://avatars.githubusercontent.com/u/62233239?v=4',
  });

  const putProfile = async values => {
    dispatch(setLoading(true));

    try {
      const body = new FormData();
      body.append('full_name', values.full_name);
      body.append('email', values.email);
      body.append('phone_number', values.phone_number);
      body.append('address', values.address);
      body.append('city', value);
      image.uri
        ? body.append('image', {
            uri: image.uri,
            name: image.fileName,
            type: image.type,
          })
        : null;

      const res = await fetch(`${baseUrl}/auth/user`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'multipart/form-data',
          access_token: `${dataLogin.access_token}`,
        },
        body: body,
      });

      const resUserData = await axios.get(res.url, {
        headers: {access_token: `${dataLogin.access_token}`},
      });

      dispatch(setDataUser(resUserData.data));
      dispatch(setLoading(false));
      dispatch(setStatusToastPostProduct('success'));

      navigate('Akun');
    } catch (error) {
      console.log(error);
      Toast.show({
        type: 'errorToast',
        text1: 'Akun gagal untuk diperbaharui',
      });
      dispatch(setLoading(false));
    }
  };

  const changeProfilePhoto = async () => {
    await launchImageLibrary({mediaType: 'photo'}).then(images =>
      setImage(images.assets[0]),
    );
  };

  // For validation
  const validationProfile = Yup.object().shape({
    full_name: Yup.string().required('Nama tidak boleh kosong'),
    address: Yup.string().required('Alamat tidak boleh kosong'),
    email: Yup.string().required('Email tidak boleh kosong'),
    phone_number: Yup.string().required('No. Handphone tidak boleh kosong'),
  });
  return (
    <Formik
      validationSchema={validationProfile}
      initialValues={user}
      enableReinitialize={true}
      onSubmit={(values, {resetForm}) => {
        putProfile(values);
        resetForm();
      }}>
      {({handleChange, handleSubmit, handleBlur, values, errors, touched}) => {
        return (
          <ScrollView flex={1} style={styles.container}>
            <Header
              headerName={'Lengkapi Info Akun'}
              onPressBack={() => {
                navigation.goBack();
              }}
            />
            <View style={styles.contentContainer}>
              <ButtonCamera
                onPress={changeProfilePhoto}
                url={image.uri ? image.uri : user.image}
              />

              <Input
                inputName="Nama"
                required={true}
                placeholder="Nama Lengkap"
                onChangeText={handleChange('full_name')}
                onBlur={handleBlur('full_name')}
                value={values.full_name}
              />
            </View>
            {touched.full_name && errors.full_name && (
              <Text style={styles.errorValidation}>{errors.full_name}</Text>
            )}

            <View style={styles.contentContainer}>
              <Input
                required={true}
                inputName="Email"
                placeholder="Contoh: abcd@mail.com"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
              />
            </View>
            {touched.email && errors.email && (
              <Text style={styles.errorValidation}>{errors.email}</Text>
            )}

            <View style={styles.contentContainer}>
              <View style={styles.toRow}>
                <Poppins style={styles.kota}>Kota</Poppins>
                <Poppins style={styles.asterik}>*</Poppins>
              </View>
              <View style={styles.cityContainer}>
                <DropDownPicker
                  style={styles.dropdownPicker}
                  placeholder="Pilih Kota Anda"
                  open={open}
                  value={value}
                  items={items}
                  setOpen={setOpen}
                  setValue={setValue}
                  setItems={setItems}
                  listMode="SCROLLVIEW"
                />
              </View>
            </View>

            <View style={styles.contentContainer}>
              <Input
                inputName="Alamat"
                required={true}
                placeholder="Contoh: Jalan Hiu 33"
                multiline={true}
                numberOfLines={4}
                styleInput={styles.alamatContainer}
                onChangeText={handleChange('address')}
                onBlur={handleBlur('address')}
                value={values.address}
              />
            </View>
            {touched.address && errors.address && (
              <Text style={styles.errorValidation}>{errors.address}</Text>
            )}

            <View style={styles.contentContainer}>
              <Input
                keyboardType={'numeric'}
                inputName="No Handphone"
                required={true}
                placeholder="Contoh: 08123456789"
                onChangeText={handleChange('phone_number')}
                onBlur={handleBlur('phone_number')}
                value={values.phone_number}
              />
            </View>
            {touched.phone_number && errors.phone_number && (
              <Text style={styles.errorValidation}>{errors.phone_number}</Text>
            )}

            <View style={styles.btnSimpan}>
              {loading ? (
                <LoadingBar loading={loading} />
              ) : (
                <Button textButton1={'Simpan'} onPressButton1={handleSubmit} />
              )}
            </View>
          </ScrollView>
        );
      }}
    </Formik>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    padding: moderateScale(8),
  },
  alamatContainer: {height: moderateScale(100), textAlignVertical: 'top'},
  errorValidation: {
    marginLeft: moderateScale(15),
    color: 'red',
    marginBottom: moderateScale(10),
  },
  contentContainer: {
    marginTop: moderateScale(10),
  },
  btnSimpan: {
    marginVertical: moderateScale(20),
  },
  dropdownPicker: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.neutral2,
    borderRadius: moderateScale(10),
  },
  kota: {
    color: COLORS.black,
    marginStart: moderateScale(5),
  },
  imageContainer: {
    alignItems: 'center',
  },
  asterik: {
    color: COLORS.red,
  },
  toRow: {
    flexDirection: 'row',
  },
  cityContainer: {
    marginHorizontal: moderateScale(18),
  },
});
