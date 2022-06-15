import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import React, {useState} from 'react';
import Header from '../../component/Header';
import Input from '../../component/Input';
import {moderateScale} from 'react-native-size-matters';
import {Poppins} from '../../component/FontComponents';
import {COLORS} from '../../helpers/colors';
import Button from '../../component/Button';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {baseUrl} from '@env';
import axios from 'axios';

const Register = ({navigation}) => {
  const [loading, setLoading] = useState(false);

  // For validation
  const validationSignUp = Yup.object().shape({
    email: Yup.string()
      .email('Please enter a valid Email Address!')
      .required("Email field can't be empty"),
    password: Yup.string()
      .required("Password field can't be empty")
      .min(8, 'Password should be at least 8 character'),
  });

  // Login Function
  const signIn = async values => {
    console.log('Click');
    console.log(baseUrl);
    try {
      const body = {
        full_name: values.name,
        email: values.email,
        password: values.password,
        phone_number: 'null',
        address: 'null',
        image: '',
      };
      const res = await axios.post(`${baseUrl}/auth/register`, body, {
        validateStatus: status => status < 501,
      });
      console.log('HASIL RES: ', res);

      if (res.status <= 201) {
        Alert.alert('Success!', 'Register anda berhasil, silahkan login', [
          {
            text: 'OK',
            onPress: () => {
              navigation.navigate('Login');
            },
          },
        ]);
      } else if (res.data.name === 'badRequestEmail') {
        Alert.alert('Error', 'Email sudah terdaftar');
      } else {
        Alert.alert('Error', 'Tidak bisa register');
      }
    } catch (error) {
      console.log(error);
    } finally {
      // dispatch(setLoading(false));
    }
  };

  return (
    <Formik
      validationSchema={validationSignUp}
      initialValues={{name: '', email: '', password: ''}}
      onSubmit={signIn}>
      {({handleChange, handleSubmit, values, handleBlur, errors, touched}) => {
        return (
          <View flex={1}>
            <Header onPressBack={() => navigation.goBack()} />
            <Poppins style={styles.title}>Daftar</Poppins>
            <View style={styles.contentContainer}>
              <Input
                inputName="Nama"
                placeholder="Nama Lengkap"
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                value={values.name}
              />
              <Input
                inputName="Email"
                placeholder="Contoh: johndee@gmail.com"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
              />
              {touched.email && errors.email && (
                <Text style={styles.errorValidation}>{errors.email}</Text>
              )}
              <Input
                inputName="Buat Password"
                placeholder="Buat Password"
                secureTextEntry={true}
                password={true}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
              />
              {touched.password && errors.password && (
                <Text style={styles.errorValidation}>{errors.password}</Text>
              )}
            </View>
            <View style={styles.btnDaftar}>
              <Button textButton1={'Daftar'} onPressButton1={handleSubmit} />
            </View>
            <View style={styles.bottom}>
              <Text style={styles.txtToLoginLeft}>Sudah punya akun?</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('Login')}
                style={styles.btnToLogin}>
                <Text style={styles.txtToLoginRight}>Masuk di sini</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      }}
    </Formik>
  );
};

export default Register;

const styles = StyleSheet.create({
  contentContainer: {
    marginHorizontal: moderateScale(10),
  },
  title: {
    marginHorizontal: moderateScale(10),
    marginVertical: moderateScale(20),
    fontSize: moderateScale(24),
    fontWeight: '700',
    color: COLORS.black,
  },
  btnDaftar: {
    marginHorizontal: moderateScale(10),
    marginVertical: moderateScale(30),
  },
  bottom: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: moderateScale(40),
  },
  btnToLogin: {
    marginLeft: moderateScale(5),
  },
  txtToLoginRight: {
    color: COLORS.purple4,
    fontWeight: '700',
  },
  txtToLoginLeft: {
    color: COLORS.black,
  },
  errorValidation: {
    marginLeft: moderateScale(10),
    color: 'red',
    marginBottom: 10,
  },
});
