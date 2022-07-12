import {
  DETAIL_PRODUCT,
  DETAIL_ORDER_PRODUCT,
  SET_DATA_ORDER_SELLER,
  SET_DATA_PRODUCT_SELLER,
  DETAIL_BUYER_PRODUCT,
  SET_DATA_ORDER_BUYER,
} from './variety';

const initialState = {
  orderanSeller: [],
  ProductSeller: [],
  orderanBuyer: [],
  detailProduct: {},
  detailOrderProduct: {},
  detailBuyerProduct: {},
  refreshing: false,
};

const DaftarJualReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DATA_ORDER_SELLER:
      return {
        ...state,
        orderanSeller: action.payload,
      };

    case SET_DATA_PRODUCT_SELLER:
      return {
        ...state,
        ProductSeller: action.payload,
      };

    case SET_DATA_ORDER_BUYER:
      return {
        ...state,
        orderanBuyer: action.payload,
      };

    case DETAIL_PRODUCT:
      return {
        ...state,
        detailProduct: action.detail,
      };

    case DETAIL_ORDER_PRODUCT:
      return {
        ...state,
        detailOrderProduct: action.detail,
      };

    case DETAIL_BUYER_PRODUCT:
      return {
        ...state,
        detailBuyerProduct: action.detail,
      };

    case 'SET_REFRESHING':
      return {
        ...state,
        refreshing: action.payload,
      };

    default:
      return {...state};
  }
};
export default DaftarJualReducer;
