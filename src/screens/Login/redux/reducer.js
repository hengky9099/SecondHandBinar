const initialState = {
  dataLogin: {},
  dataUser: {},
};

const LoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_DATA_LOGIN':
      return {
        ...state,
        dataLogin: action.payload,
      };

    case 'SET_DATA_USER':
      return {
        ...state,
        dataUser: action.payload,
      };

    default:
      return state;
  }
};
export default LoginReducer;
