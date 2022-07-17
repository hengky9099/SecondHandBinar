import {combineReducers} from 'redux';
import DaftarJualReducer from '../../screens/DaftarJual/redux/reducer';
import LoginReducer from '../../screens/Login/redux/reducer';
import NotificationReducer from '../../screens/Notification/redux/reducer';
import RegisterReducer from '../../screens/Register/redux/reducer';
import {GlobalReducer} from '../globalReducer';

export const allReducers = combineReducers({
  register: RegisterReducer,
  login: LoginReducer,
  notifikasi: NotificationReducer,
  daftarjual: DaftarJualReducer,
  notifikasi: NotificationReducer,
  global: GlobalReducer,
});
