// import {baseUrl} from '@env';
import {DATA_CATEGORY, DATA_PRODUCT} from './type';
import axios from 'axios';

export const getCategory = () => async dispatch => {
  try {
    const res = await axios.get(
      'https://market-final-project.herokuapp.com/seller/category',
    );

    dispatch(setCategory(res.data));
    console.log(res.data, 'data cateogory');
  } catch (error) {
    console.log(error);
  }
};

export const setDataProduct = (payload, image, kategori) => {
  return {
    type: DATA_PRODUCT,
    payload,
    image,
    kategori,
  };
};

export const setCategory = payload => {
  return {
    type: DATA_CATEGORY,
    payload,
  };
};
