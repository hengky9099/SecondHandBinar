// import {baseUrl} from '@env';
import {DATA_PRODUCT, STATUS_TOAST_POST_PRODUCT} from './type';

export const setDataProduct = (payload, image, kategori) => {
  return {
    type: DATA_PRODUCT,
    payload,
    image,
    kategori,
  };
};

export const setStatusToastPostProduct = payload => {
  return {
    type: STATUS_TOAST_POST_PRODUCT,
    payload,
  };
};
