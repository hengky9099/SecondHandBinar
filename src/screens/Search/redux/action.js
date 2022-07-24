import axios from 'axios';
import {baseUrl} from '@env';
import {Alert} from 'react-native';
import {setLoading, setRefreshing} from '../../../redux/globalAction';
import {GET_DATA_SEARCH} from './type';

export const getSearchProduct = search => async dispatch => {
  dispatch(setLoading(true));
  try {
    const res = await axios.get(`${baseUrl}/buyer/product?search=${search}`, {
      validateStatus: status => status < 501,
    });
    dispatch(setDataSearch(res.data));

    dispatch(setLoading(false));
    dispatch(setRefreshing(false));

    console.log(res.data);
  } catch (error) {
    console.log(error, 'error');
    dispatch(setLoading(false));
    dispatch(setRefreshing(false));

    Alert.alert('Error', error);
  }
};

export const setDataSearch = payload => {
  return {
    type: GET_DATA_SEARCH,
    payload,
  };
};
