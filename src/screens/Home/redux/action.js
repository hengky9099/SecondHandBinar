import axios from 'axios';
import {baseUrl} from '@env';
import {Alert} from 'react-native';
import {
  BANNER,
  DATA_CATEGORY,
  GET_PRODUCT_SUCCESS,
  PRODUCT_CATEGORY,
  SET_LENGTH_PRODUCTS,
} from './type';
import {setLoading, setRefreshing} from '../../../redux/globalAction';

export const getProduct = () => async dispatch => {
  dispatch(setLoading(true));
  try {
    const res = await axios.get(`${baseUrl}/buyer/product`, {
      validateStatus: status => status < 501,
    });
    dispatch(setProductSuccess(res.data));
    dispatch(setLengthProducts(res.data.length));

    const resCategory = await axios.get(`${baseUrl}/seller/category`);
    dispatch(setCategory(resCategory.data));

    const resBanner = await axios.get(`${baseUrl}/seller/banner`);
    dispatch(setBanner(resBanner.data));

    dispatch(setLoading(false));
    dispatch(setRefreshing(false));
  } catch (error) {
    console.log(error, 'error');
    dispatch(setLoading(false));
    dispatch(setRefreshing(false));

    Alert.alert('Error', error);
  }
};

export const getProductperCategory = idCategory => async dispatch => {
  dispatch(setLoading(true));
  try {
    const res = await axios.get(
      `${baseUrl}/buyer/product?category_id=${idCategory}`,
      {
        validateStatus: status => status < 501,
      },
    );
    dispatch(setCategoryProduct(res.data));

    dispatch(setLoading(false));

    console.log(res.data);
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

export const setCategory = payload => {
  return {
    type: DATA_CATEGORY,
    payload,
  };
};

export const setCategoryProduct = payload => {
  return {
    type: PRODUCT_CATEGORY,
    payload,
  };
};

export const setBanner = payload => {
  return {
    type: BANNER,
    payload,
  };
};
