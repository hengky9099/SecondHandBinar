import axios from 'axios';
import {Alert} from 'react-native';
import {baseUrl} from '@env';
import {navigate} from '../../../helpers/navigate';
import {setLoading} from '../../../redux/globalAction';

// Register Function
export const postRegister = values => async dispatch => {
  dispatch(setLoading(true));
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

    if (res.status <= 201) {
      dispatch(setRegister(res.data));
      console.log('DATA: ', res.data);
      Alert.alert('Success!', 'Register anda berhasil, silahkan login', [
        {
          text: 'OK',
          onPress: () => {
            navigate('Login');
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
    dispatch(setLoading(false));
  }
};

export const setRegister = payload => {
  return {
    type: 'SET_REGISTER',
    payload,
  };
};
