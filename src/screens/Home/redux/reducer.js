import {GET_PRODUCT_SUCCESS, SET_LENGTH_PRODUCTS} from './type';

const initialState = {
  products: [],
  lengthProducts: 0,
};

export const HomeReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCT_SUCCESS:
      return {
        ...state,
        products: action.payload,
      };

    case SET_LENGTH_PRODUCTS:
      return {
        ...state,
        lengthProducts: action.payload,
      };
    default:
      return state;
  }
};
