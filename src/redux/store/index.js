import {createStore, applyMiddleware} from 'redux';
import {allReducers} from '../reducer/allReducers';
import logger from 'redux-logger';
import persistReducer from 'redux-persist/es/persistReducer';
import persistStore from 'redux-persist/es/persistStore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import thunk from 'redux-thunk';

const allMiddlewares = applyMiddleware(logger, thunk);

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['global'],
};

const persistedReducer = persistReducer(persistConfig, allReducers);

export const store = createStore(persistedReducer, {}, allMiddlewares);
export const persistor = persistStore(store);

// Home
export const GET_PRODUCT_SUCCESS = 'GET_PRODUCT_SUCCESS';
export const GET_PRODUCT_FAIL = 'GET_PRODUCT_FAIL';
export const GET_PRODUCT_LOADING = 'GET_PRODUCT_LOADING';
export const GET_DETAIL_PRODUCT_SUCCESS = 'GET_DETAIL_PRODUCT_SUCCESS';
export const GET_DETAIL_PRODUCT_FAIL = 'GET_DETAIL_PRODUCT_FAIL';
export const GET_DETAIL_PRODUCT_LOADING = 'GET_DETAIL_PRODUCT_LOADING';
