import {
  GET_PRODUCT_FAIL,
  GET_PRODUCT_LOADING,
  GET_PRODUCT_SUCCESS,
} from '../../../redux/store/index';

const initialState = {
  loading: false,
  products: [],
};

export const HomeReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCT_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case GET_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload,
      };
    case GET_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
