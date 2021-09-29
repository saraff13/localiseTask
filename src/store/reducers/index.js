import {combineReducers} from 'redux';
import translateReducer from './translateReducer';
import banksReducer from './banksReducer';

export default combineReducers({
  translateReducer,
  banksReducer,
});
