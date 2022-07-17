import {combineReducers} from 'redux';
import LoginReducer from '../../screens/Login/redux/reducer';
import NotificationReducer from '../../screens/Notification/redux/reducer';
import RegisterReducer from '../../screens/Register/redux/reducer';
import {GlobalReducer} from '../globalReducer';

export const allReducers = combineReducers({
  register: RegisterReducer,
  login: LoginReducer,
  notifikasi: NotificationReducer,
  global: GlobalReducer,
});
