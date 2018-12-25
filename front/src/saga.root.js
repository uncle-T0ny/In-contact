import { takeEvery } from 'redux-saga';
import { fork, takeLatest, take, put } from 'redux-saga/effects';
import { watchAuthSagas } from './ducks/auth.duck';

export default function* rootSaga() {
  yield fork(watchAuthSagas);
}
