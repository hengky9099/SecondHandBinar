import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
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
import {baseUrl} from '@env';
import axios from 'axios';
import {setLoading} from '../../redux/globalAction';

const Profile = ({navigation}) => {
  const {dataLogin, dataUser} = useSelector(state => state.login);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState(kota);
  const [image, setImage] = useState('');
  const [user, setUser] = useState({
    full_name: '',
    city: '',
    address: '',
    phone_number: '',
    image: '',
  });

  useEffect(() => {
    getProfile();
  });

  const getProfile = async () => {
    try {
      const res = await axios.get(`${baseUrl}/auth/user`, {
        headers: {access_token: `${dataLogin.access_token}`},
      });
      setUser({
        full_name: res.data.full_name,
        city: res.data.city,
        address: res.data.address,
        phone_number: res.data.phone_number,
        image: res.data.image_url,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const putProfile = async values => {
    try {
      const body = new FormData();
      body.append('full_name', values.full_name);
      body.append('phone_number', values.phone_number);
      body.append('address', values.address);
      body.append('city', value);
      body.append('image', {
        uri: image.uri,
        name: image.fileName,
        type: image.type,
      });
      console.log(body);

      const res = await fetch(`${baseUrl}/auth/user`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'multipart/form-data',
          access_token: `${dataLogin.access_token}`,
        },
        body: body,
      });
    } catch (error) {
      console.log(error);
      dispatch(setLoading(false));
    }
  };

  const changeProfilePhoto = async () => {
    await launchImageLibrary({mediaType: 'photo'}).then(image =>
      setImage(image.assets[0]),
    );
  };

  // For validation
  const validationProfile = Yup.object().shape({
    full_name: Yup.string().required('Nama tidak boleh kosong'),
    address: Yup.string().required('Alamat tidak boleh kosong'),
    phone_number: Yup.string().required('No. Handphone tidak boleh kosong'),
  });
  return (
    <Formik
      validationSchema={validationProfile}
      initialValues={user}
      enableReinitialize={true}
      onSubmit={putProfile}>
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
              <ButtonCamera onPress={changeProfilePhoto} url={user.image} />

              <Input
                inputName="Nama*"
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
                inputName="No Handphone*"
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
              <Button textButton1={'Simpan'} onPressButton1={handleSubmit} />
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
  },
  alamatContainer: {height: moderateScale(100), textAlignVertical: 'top'},
  errorValidation: {
    marginLeft: moderateScale(15),
    color: 'red',
    marginBottom: moderateScale(10),
  },
  contentContainer: {},
  btnSimpan: {
    marginTop: moderateScale(15),
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
    marginStart: moderateScale(5),
  },
  imageContainer: {
    alignItems: 'center',
  },
});
