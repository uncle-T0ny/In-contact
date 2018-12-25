import { fork } from 'redux-saga/effects';
import { watchAuthSagas } from './ducks/auth.duck';
import { watchContactsSagas } from './ducks/contacts.duck';

export default function* rootSaga() {
  yield fork(watchAuthSagas);
  yield fork(watchContactsSagas);
}
