import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import Header from '../../component/Header';
import Input from '../../component/Input';
import {moderateScale} from 'react-native-size-matters';
import {Poppins} from '../../component/FontComponents';
import {COLORS} from '../../helpers/colors';
import Button from '../../component/Button';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useSelector, useDispatch} from 'react-redux';
import {postLogin} from './redux/action';

const Login = ({navigation}) => {
  const {loading} = useSelector(state => state.global);
  const dispatch = useDispatch();

  // For validation
  const validationSignIn = Yup.object().shape({
    email: Yup.string()
      .email('Please enter a valid Email Address!')
      .required("Email field can't be empty"),
    password: Yup.string()
      .required("Password field can't be empty")
      .min(8, 'Password should be at least 8 character'),
  });

  // Login Function
  const signIn = values => {
    dispatch(postLogin(values));
  };

  return (
    <Formik
      validationSchema={validationSignIn}
      initialValues={{email: '', password: ''}}
      onSubmit={signIn}>
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
              />
            </View>
            {touched.password && errors.password && (
              <Text style={styles.errorValidation}>{errors.password}</Text>
            )}

            <View style={styles.btnLogin}>
              {loading ? (
                <ActivityIndicator />
              ) : (
                <Button textButton1={'Masuk'} onPressButton1={handleSubmit} />
              )}
            </View>
            <View style={styles.bottom}>
              <Text style={styles.txtToRegisterLeft}>Belum punya akun?</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('Register')}
                style={styles.btnToRegister}>
                <Text style={styles.txtToRegisterRight}>Daftar di sini</Text>
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
    alignItems: 'center',
  },
  title: {
    marginHorizontal: moderateScale(10),
    marginVertical: moderateScale(20),
    fontSize: moderateScale(24),
    fontWeight: '700',
    color: COLORS.black,
  },
  btnLogin: {
    alignItems: 'center',
    marginVertical: moderateScale(30),
  },
  bottom: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: moderateScale(40),
  },
  btnToRegister: {
    marginLeft: moderateScale(5),
  },
  txtToRegisterRight: {
    color: COLORS.purple4,
    fontWeight: '700',
  },
  txtToRegisterLeft: {
    color: COLORS.black,
  },
  errorValidation: {
    marginLeft: moderateScale(15),
    color: 'red',
    marginBottom: 10,
  },
});
