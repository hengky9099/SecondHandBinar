const initialState = {
  dataNotif: 0,
};

const NotificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_COUNT_NOTIFICATION':
      return {
        ...state,
        dataNotif: action.payload,
      };

    default:
      return state;
  }
};
export default NotificationReducer;
