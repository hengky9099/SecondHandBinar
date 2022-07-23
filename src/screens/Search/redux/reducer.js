import {GET_DATA_SEARCH} from './type';

const initialState = {
  dataSearch: [],
};

export const SearchReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DATA_SEARCH:
      return {
        ...state,
        dataSearch: action.payload,
      };

    default:
      return state;
  }
};
