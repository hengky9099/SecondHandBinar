const initialState = {
  dataLogin: {},
};

const LoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_DATA_LOGIN':
      return {
        ...state,
        dataLogin: action.payload,
      };

    default:
      return state;
  }
};
export default LoginReducer;
