import * as types from '../actionTypes';
import {put, takeLatest} from 'redux-saga/effects';
import axios from 'axios';

export default function* translateSaga() {
  yield takeLatest(types.TRANSLATION_START, translate);
}

function* translate(action) {
  try {
    const result = yield axios.get(action.payload);
    console.log('Saga result => ', result);

    yield put({
      type: types.TRANSLATION_SUCCESS,
      payload: result.data,
    });
  } catch (error) {
    console.log('Saga error => ', error);
    yield put({
      type: types.TRANSLATION_FAIL,
      payload: error,
    });
  }
}
