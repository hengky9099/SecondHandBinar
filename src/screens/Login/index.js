import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import Header from '../../component/Header';
import Input from '../../component/Input';
import {moderateScale} from 'react-native-size-matters';
import {Poppins} from '../../component/FontComponents';
import {COLORS} from '../../helpers/colors';
import Button from '../../component/Button';
import {Formik} from 'formik';
import * as Yup from 'yup';

const Login = ({navigation}) => {
  // For validation
  const validationSignIn = Yup.object().shape({
    email: Yup.string()
      .email('Please enter a valid Email Address!')
      .required("Email field can't be empty"),
    password: Yup.string()
      .required("Password field can't be empty")
      .min(8, 'Password should be at least 8 character'),
  });

  return (
    <Formik
      validationSchema={validationSignIn}
      initialValues={{email: '', password: ''}}
      onSubmit={console.log('Login')}>
      {({handleChange, handleSubmit, values, handleBlur, errors, touched}) => {
        return (
          <View flex={1}>
            <Header onPressBack={() => navigation.goBack()} />
            <Poppins style={styles.title}>Masuk</Poppins>
            <View style={styles.contentContainer}>
              <Input
                inputName="Email"
                placeholder="Contoh: johndee@gmail.com"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
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
              />
              {touched.password && errors.password && (
                <Text style={styles.errorValidation}>{errors.password}</Text>
              )}
            </View>
            <View style={styles.btnDaftar}>
              <Button textButton1={'Masuk'} onPressButton1={handleSubmit} />
            </View>
            <View style={styles.bottom}>
              <Text style={styles.txtToLoginLeft}>Belum punya akun?</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('Register')}
                style={styles.btnToLogin}>
                <Text style={styles.txtToLoginRight}>Daftar di sini</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      }}
    </Formik>
  );
};

export default Login;

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
