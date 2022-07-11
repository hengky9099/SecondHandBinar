import {combineReducers} from 'redux';
import {HomeReducer} from '../../screens/Home/redux/reducer';
import LoginReducer from '../../screens/Login/redux/reducer';
import RegisterReducer from '../../screens/Register/redux/reducer';
import {GlobalReducer} from '../globalReducer';

export const allReducers = combineReducers({
  register: RegisterReducer,
  login: LoginReducer,
  global: GlobalReducer,
  home: HomeReducer,
});
