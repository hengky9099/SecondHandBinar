import {SET_NOTIFICATION, DETAIL_NOTIFICATION} from './variety';

const initialState = {
  dataNotification: [],
  detailNotification: {},
  refreshing: false,
};

const NotificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NOTIFICATION:
      return {
        ...state,
        dataNotification: action.payload,
      };

    case DETAIL_NOTIFICATION:
      return {
        ...state,
        detailNotification: action.detail,
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
export default NotificationReducer;
