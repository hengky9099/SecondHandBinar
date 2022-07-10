import axios from 'axios';
import {setLoading} from '../../../redux/globalAction';
import {baseUrl} from '@env';
import {navigate} from '../../../helpers/navigate';

export const setOrderSeller = payload => {
  return {
    type: 'SET_DATA_ORDER_SELLER',
    payload,
  };
};

export const setProductSeller = payload => {
  return {
    type: 'SET_DATA_PRODUCT_SELLER',
    payload,
  };
};

export const setOrderBuyer = payload => {
  return {
    type: 'SET_DATA_ORDER_BUYER',
    payload,
  };
};

// action get byId

export const getDetailOrderProduct = id => async dispatch => {
  try {
    dispatch(setLoading(true));

    const res = await axios.get(`${baseUrl}/seller/order/${id}`);
    if (res.status === 200) {
      dispatch(setDetailOrderProduct(res.data));
      navigate('DaftarJual');
    }
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(setLoading(false));
  }
};

export const getDetailProduct = id => async dispatch => {
  try {
    dispatch(setLoading(true));

    const res = await axios.get(`${baseUrl}/seller/product/${id}`);
    if (res.status === 200) {
      dispatch(setDetailProduct(res.data));
      navigate('DaftarJual');
    }
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(setLoading(false));
  }
};

export const getBuyerProduct = id => async dispatch => {
  try {
    dispatch(setLoading(true));

    const res = await axios.get(`${baseUrl}/buyer/product/${id}`);
    if (res.status === 200) {
      dispatch(setDetailBuyerProduct(res.data));
      navigate('DaftarJual');
    }
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(setLoading(false));
  }
};

export const setDetailBuyerProduct = payload => {
  return {
    type: 'DETAIL_BUYER_PRODUCT',
    detail: payload,
  };
};

export const setDetailOrderProduct = payload => {
  return {
    type: 'DETAIL_ORDER_PRODUCT',
    detail: payload,
  };
};

export const setDetailProduct = payload => {
  return {
    type: 'DETAIL_PRODUCT',
    detail: payload,
  };
};

export const setRefreshing = payload => {
  return {
    type: 'SET_REFRESHING',
    payload,
  };
};
