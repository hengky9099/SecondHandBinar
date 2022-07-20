// import {baseUrl} from '@env';
import {DATA_PRODUCT} from './type';

export const setDataProduct = (payload, image, kategori) => {
  return {
    type: DATA_PRODUCT,
    payload,
    image,
    kategori,
  };
};
