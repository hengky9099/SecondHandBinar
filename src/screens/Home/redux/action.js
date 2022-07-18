import axios from 'axios';
import {baseUrl} from '@env';
import {Alert} from 'react-native';
import {GET_PRODUCT_SUCCESS, SET_LENGTH_PRODUCTS} from './type';
import {setLoading} from '../../../redux/globalAction';

export const getProduct = () => async dispatch => {
  dispatch(setLoading(true));
  try {
    const res = await axios.get(`${baseUrl}/buyer/product`, {
      validateStatus: status => status < 501,
    });
    dispatch(setProductSuccess(res.data));
    dispatch(setLengthProducts(res.data.length));
    dispatch(setLoading(false));
  } catch (error) {
    console.log(error, 'error');
    dispatch(setLoading(false));
    Alert.alert('Error');
  }
};

export const setProductSuccess = data => ({
  type: GET_PRODUCT_SUCCESS,
  payload: data,
});

export const setLengthProducts = data => ({
  type: SET_LENGTH_PRODUCTS,
  payload: data,
});
