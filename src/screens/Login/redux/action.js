import axios from 'axios';
import {Alert} from 'react-native';
import {baseUrl} from '@env';
import {navigate} from '../../../helpers/navigate';
import {setLoading} from '../../../redux/globalAction';

// Register Function
export const postLogin = values => async dispatch => {
  dispatch(setLoading(true));

  try {
    const body = {
      email: values.email,
      password: values.password,
    };
    const res = await axios.post(`${baseUrl}/auth/login`, body, {
      validateStatus: status => status < 501,
    });
    console.log('HASIL RES: ', res);

    if (res.status <= 201) {
      dispatch(setLogin(res.data));
      navigate('MainApp');
    } else if (res.data.name === 'wrongEmailPassword') {
      Alert.alert('Sorry', res.data.message);
    } else {
      Alert.alert('Error', 'Tidak bisa Login');
    }
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(setLoading(false));
  }
};

export const setLogin = payload => {
  return {
    type: 'SET_DATA_LOGIN',
    payload,
  };
};
