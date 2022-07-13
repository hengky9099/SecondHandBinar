// import {baseUrl} from '@env';
import {DATA_PRODUCT} from './type';

export const setDataProduct = payload => {
  return {
    type: DATA_PRODUCT,
    payload,
  };
};
