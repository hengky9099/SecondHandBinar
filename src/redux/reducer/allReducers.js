import {combineReducers} from 'redux';
import DaftarJualReducer from '../../screens/DaftarJual/redux/reducer';
import ProductReducer from '../../screens/LengkapiDetailProduk/redux/reducer';
import {HomeReducer} from '../../screens/Home/redux/reducer';
import LoginReducer from '../../screens/Login/redux/reducer';
import RegisterReducer from '../../screens/Register/redux/reducer';
import {GlobalReducer} from '../globalReducer';
import {SearchReducer} from '../../screens/Search/redux/reducer';

export const allReducers = combineReducers({
  register: RegisterReducer,
  login: LoginReducer,
  daftarjual: DaftarJualReducer,
  dataProduct: ProductReducer,
  global: GlobalReducer,
  home: HomeReducer,
  search: SearchReducer,
});
