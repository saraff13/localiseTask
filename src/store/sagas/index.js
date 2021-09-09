import {fork, all} from 'redux-saga/effects';
import translateSaga from './translateSaga';

export default function* rootSaga() {
  yield all([fork(translateSaga)]);
}
