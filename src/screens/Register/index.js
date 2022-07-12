import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import React from 'react';
import {moderateScale} from 'react-native-size-matters';
import {COLORS} from '../../helpers/colors';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';
import {postRegister} from './redux/action';
import {Button, Header, Input, Poppins} from '../../component';

const Register = ({navigation}) => {
  const {loading} = useSelector(state => state.global);
  const dispatch = useDispatch();

  // For validation
  const validationSignUp = Yup.object().shape({
    name: Yup.string().required("Name field can't be empty"),
    email: Yup.string()
      .email('Please enter a valid Email Address!')
      .required("Email field can't be empty"),
    password: Yup.string()
      .required("Password field can't be empty")
      .min(8, 'Password should be at least 8 character'),
  });

  // Register Function
  const signUp = values => {
    dispatch(postRegister(values));
  };

  return (
    <Formik
      validationSchema={validationSignUp}
      initialValues={{name: '', email: '', password: ''}}
      onSubmit={signUp}>
      {({handleChange, handleSubmit, values, handleBlur, errors, touched}) => {
        return (
          <ScrollView flex={1}>
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
            </View>
            {touched.name && errors.name && (
              <Text style={styles.errorValidation}>{errors.name}</Text>
            )}
            <View style={styles.contentContainer}>
              <Input
                inputName="Email"
                placeholder="Contoh: johndee@gmail.com"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
              />
            </View>

            {touched.email && errors.email && (
              <Text style={styles.errorValidation}>{errors.email}</Text>
            )}
            <View style={styles.contentContainer}>
              <Input
                inputName="Buat Password"
                placeholder="Buat Password"
                secureTextEntry={true}
                password={true}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                styleInput={styles.inputPassword}
              />
            </View>

            {touched.password && errors.password && (
              <Text style={styles.errorValidation}>{errors.password}</Text>
            )}

            <View style={styles.btnDaftar}>
              {loading ? (
                <ActivityIndicator />
              ) : (
                <Button textButton1="Daftar" onPressButton1={handleSubmit} />
              )}
            </View>
            <View style={styles.bottom}>
              <Text style={styles.txtToLoginLeft}>Sudah punya akun?</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('Login')}
                style={styles.btnToLogin}>
                <Text style={styles.txtToLoginRight}>Masuk di sini</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
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
    marginLeft: moderateScale(15),
    color: 'red',
    marginBottom: moderateScale(10),
  },
  inputPassword: {
    width: moderateScale(310),
  },
});
