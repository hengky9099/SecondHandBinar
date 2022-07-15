import {DATA_CATEGORY, DATA_PRODUCT} from './type';

const initialState = {
  dataProduct: {},
  dataCategory: [],
  image: {},
  kategori: [],
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
    case DATA_CATEGORY:
      return {
        ...state,
        dataCategory: action.payload,
      };
    default:
      return state;
  }
};
export default ProductReducer;
