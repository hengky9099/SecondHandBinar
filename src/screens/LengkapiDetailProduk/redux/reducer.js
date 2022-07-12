import {DATA_PRODUCT} from './type';

const initialState = {
  dataProduct: {},
};

const ProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case DATA_PRODUCT:
      return {
        ...state,
        dataProduct: action.payload,
      };

    default:
      return state;
  }
};
export default ProductReducer;
