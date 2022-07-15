import {SET_CONNECTION, SET_LOADING, SET_REFRESHING} from './globalTypes';

export const setLoading = payload => {
  return {
    type: SET_LOADING,
    payload,
  };
};

export const setRefreshing = refresh => {
  return {
    type: SET_REFRESHING,
    refresh,
  };
};

export const setConnection = connection => {
  return {
    type: SET_CONNECTION,
    connection,
  };
};
