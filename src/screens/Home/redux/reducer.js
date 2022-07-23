import {
  BANNER,
  DATA_CATEGORY,
  GET_PRODUCT_SUCCESS,
  PRODUCT_CATEGORY,
  SET_LENGTH_PRODUCTS,
} from './type';

const initialState = {
  products: [],
  lengthProducts: 0,
  dataCategory: [],
  dataProductperCategory: [],
  banner: [],
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

    case DATA_CATEGORY:
      return {
        ...state,
        dataCategory: action.payload,
      };

    case PRODUCT_CATEGORY:
      return {
        ...state,
        dataProductperCategory: action.payload,
      };

    case BANNER:
      return {
        ...state,
        banner: action.payload,
      };

    default:
      return state;
  }
};
