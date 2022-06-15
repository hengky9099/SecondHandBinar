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

const Register = ({navigation}) => {
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
  // const signInnWithEmail = async values => {
  //   try {
  //     setLoading(true);
  //     const res = await auth.signInWithEmailAndPassword(
  //       values.email,
  //       values.password,
  //     );

  //     const token = await messaging.getToken();

  //     if (token) {
  //       let isUpdate = false;
  //       await myDb.ref(`users/${res.user.uid}`).update({
  //         notifToken: token,
  //       });
  //       isUpdate = true;

  //       if (isUpdate) {
  //         const results = await myDb.ref(`users/${res.user.uid}`).once('value');
  //         if (results.val()) {
  //           dispatch(setUser(results.val()));
  //           navigation.navigate('Main');
  //         }
  //       }
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     // setLoading(false);
  //   }
  // };

  return (
    <Formik
      validationSchema={validationSignUp}
      initialValues={{email: '', password: ''}}
      onSubmit={console.log('Register')}>
      {({handleChange, handleSubmit, values, handleBlur, errors, touched}) => {
        return (
          <View flex={1}>
            <Header onPressBack={() => navigation.goBack()} />
            <Poppins style={styles.title}>Daftar</Poppins>
            <View style={styles.contentContainer}>
              <Input inputName="Nama" placeholder="Nama Lengkap" />
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
