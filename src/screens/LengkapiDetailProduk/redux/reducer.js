import {DATA_PRODUCT} from './type';

const initialState = {
  dataProduct: {},
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

    default:
      return state;
  }
};
export default ProductReducer;
