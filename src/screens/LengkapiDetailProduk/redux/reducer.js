import {DATA_PRODUCT, STATUS_TOAST_POST_PRODUCT} from './type';

const initialState = {
  dataProduct: {},
  image: {},
  kategori: [],
  statusToastPostProduct: '',
};

const ProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case DATA_PRODUCT:
      return {
        ...state,
        dataProduct: action.payload,
        image: action.image,
        kategori: action.kategori,
      };

    case STATUS_TOAST_POST_PRODUCT:
      return {
        ...state,
        statusToastPostProduct: action.payload,
      };

    default:
      return state;
  }
};
export default ProductReducer;
