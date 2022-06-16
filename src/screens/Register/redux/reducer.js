const initialState = {
  dataRegister: {},
};

const RegisterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_DATA_REGISTER':
      return {
        ...state,
        dataRegister: action.payload,
      };

    default:
      return state;
  }
};
export default RegisterReducer;
