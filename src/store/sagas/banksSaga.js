import * as types from '../actionTypes';
import {put, takeLatest} from 'redux-saga/effects';
import axios from 'axios';

export default function* banksSaga() {
  yield takeLatest(types.GET_BANKS_DATA_START, getBanksData);
}

function* getBanksData(action) {
  try {
    const result = yield axios.get(action.payload);
    // console.log('Saga result => ', result.data);

    yield put({
      type: types.GET_BANKS_DATA_SUCCESS,
      payload: result.data,
    });
  } catch (error) {
    console.log('Saga error => ', error);
    yield put({
      type: types.GET_BANKS_DATA_FAIL,
      payload: error,
    });
  }
}
