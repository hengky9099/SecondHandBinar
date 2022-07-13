import {DATA_CATEGORY, DATA_PRODUCT} from './type';

const initialState = {
  dataProduct: {},
  dataCategory: [],
};

const ProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case DATA_PRODUCT:
      return {
        ...state,
        dataProduct: action.payload,
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
