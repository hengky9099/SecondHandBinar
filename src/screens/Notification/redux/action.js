import axios from 'axios';
import {baseUrl} from '@env';
import {setLoading} from '../../../redux/globalAction';
import {navigate} from '../../../helpers/navigate';

export const setNotification = payload => {
  return {
    type: 'SET_NOTIFICATION',
    payload,
  };
};

// action get byId

export const getNotifikation = id => async dispatch => {
  try {
    dispatch(setLoading(true));
    const res = await axios.get(`${baseUrl}/notification/${id}`);
    if (res.status === 200) {
      dispatch(setDetailNotification(res.data));
      navigate('Notification');
    }
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(setLoading(false));
  }
};

export const setDetailNotification = payload => {
  return {
    type: 'DETAIL_NOTIFICATION',
    detail: payload,
  };
};

export const setRefreshing = payload => {
  return {
    type: 'SET_REFRESHING',
    payload,
  };
};
