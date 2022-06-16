import {combineReducers} from 'redux';
import RegisterReducer from '../../screens/Register/redux/reducer';
import {GlobalReducer} from '../globalReducer';

export const allReducers = combineReducers({
  register: RegisterReducer,
  global: GlobalReducer,
});
