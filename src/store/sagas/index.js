import {fork, all} from 'redux-saga/effects';
import translateSaga from './translateSaga';
import banksSaga from './banksSaga';

export default function* rootSaga() {
  yield all([fork(translateSaga)]);
  yield all([fork(banksSaga)]);
}
