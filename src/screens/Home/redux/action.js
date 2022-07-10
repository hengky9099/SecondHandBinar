/* eslint-disable no-undef */
import axios from 'axios';
import {baseUrl} from '@env';
import {Alert} from 'react-native';
import {
  GET_PRODUCT_FAIL,
  GET_PRODUCT_LOADING,
  GET_PRODUCT_SUCCESS,
} from '../../../redux/store/index.js';

export const setProductSuccess = data => ({
  type: GET_PRODUCT_SUCCESS,
  payload: data,
});

export const setProductLoading = loading => ({
  type: GET_PRODUCT_LOADING,
  payload: loading,
});

export const setProductFailed = error => ({
  type: GET_PRODUCT_FAIL,
  payload: error,
});

export const getProduct = async dispatch => {
  dispatch(setProductLoading(true));
  try {
    const res = await axios.get(`${baseUrl}/buyer/product`, body, {
      validateStatus: status => status < 501,
    });
    setProductSuccess(res.data);
    dispatch(setProductLoading(false));
  } catch (error) {
    dispatch(setProductFailed(error));
    dispatch(setProductLoading(false));
    Alert.alert('Error');
  }
};
