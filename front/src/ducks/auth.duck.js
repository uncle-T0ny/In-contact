import { createAction } from 'redux-actions';
import { takeEvery, put } from 'redux-saga/effects';
import { ServerAPI } from '../api/ServerAPI';
import { LocalStorageAPI } from '../api/LocalStorageAPI';
import { closeModal } from './app.duck';

export const UPDATE_STATE = 'UPDATE_STATE';
export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_IN_REQUEST = 'SIGN_IN_REQUEST';
export const CHECK_AUTH_TOKEN = 'CHECK_AUTH_TOKEN';
export const LOG_OUT = 'LOG_OUT';

export const updateState = createAction(UPDATE_STATE);
export const signUpRequest = createAction(SIGN_UP_REQUEST);
export const signInRequest = createAction(SIGN_IN_REQUEST);
export const checkAuth = createAction(CHECK_AUTH_TOKEN);
export const logOut = createAction(LOG_OUT);

const initialState = {
  loggedIn: false,
  logInEmail: '',
  logInPassword: '',
  signUpEmail: '',
  signUpPassword: '',
};

export default function appReducer(state = initialState, { type, payload }) {
  switch (type) {
    case UPDATE_STATE:
      return { ...state, ...payload };
    default:
      return state;
  }
}

export function* signUpSaga({ payload }) {
  const { email, password } = payload;

  let { token } = yield ServerAPI.auth.signUp(email, password);

  LocalStorageAPI.saveAuthToken(token);
}

export function* signInSaga({ payload }) {
  const { email, password } = payload;
  try {
    let { token } = yield ServerAPI.auth.signIn(email, password);
    LocalStorageAPI.saveAuthToken(token);
    yield put({ type: UPDATE_STATE, payload: { loggedIn: true }});
    yield put(closeModal());
  } catch (err) {
    console.log(err)
  }
}

export function* checkAuthTokenSaga() {
  try {
    let { isAuthenticated } = yield ServerAPI.auth.check();
    yield put({ type: UPDATE_STATE, payload: { loggedIn: isAuthenticated }});

    if (!isAuthenticated) {
      LocalStorageAPI.saveAuthToken(null);
    }
  } catch (err) {
    console.log(err);
    LocalStorageAPI.saveAuthToken(null);
  }
}


export function* logOutSaga() {
  yield ServerAPI.auth.logOut();
  LocalStorageAPI.saveAuthToken(null);
  yield put({ type: UPDATE_STATE, payload: { loggedIn: false }});
}

export function* watchAuthSagas() {
  yield [
    takeEvery(SIGN_UP_REQUEST, signUpSaga),
    takeEvery(SIGN_IN_REQUEST, signInSaga),
    takeEvery(CHECK_AUTH_TOKEN, checkAuthTokenSaga),
    takeEvery(LOG_OUT, logOutSaga),
  ];
}