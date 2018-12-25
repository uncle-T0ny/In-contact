import { createAction } from 'redux-actions';
import { takeEvery, select } from 'redux-saga/effects';
import { ServerAPI } from "../api/ServerAPI";

export const UPDATE_STATE = 'UPDATE_STATE';
export const FETCH_USER_CONTACTS = 'FETCH_USER_CONTACTS';
export const OPEN_NEW_CONTACT_FORM = 'OPEN_NEW_CONTACT_FORM';
export const CLOSE_NEW_CONTACT_FORM = 'CLOSE_NEW_CONTACT_FORM';
export const CREATE_CONTACT = 'CREATE_CONTACT';

export const updateState = createAction(UPDATE_STATE);
export const userContactsRequest = createAction(FETCH_USER_CONTACTS);
export const openNewContactForm = createAction(OPEN_NEW_CONTACT_FORM);
export const closeNewContactForm = createAction(CLOSE_NEW_CONTACT_FORM);
export const createContact = createAction(CREATE_CONTACT);

const initialState = {
  list: [
    { name: 'Andrew' },
    { name: 'Daniel' }
  ],
  creatingContact: false,
  firstName: '',
  lastName: '',
  phone: '',
  country: '',
  state: '',
  town: '',
  postcode: '',
  street: '',
  build: '',
  apartment: '',
};

export default function contactsReducer(state = initialState, { type, payload }) {
  switch (type) {
    case UPDATE_STATE:
      return { ...state, ...payload };
    case OPEN_NEW_CONTACT_FORM:
      return { ...state, ...{ creatingContact: true } };
    case CLOSE_NEW_CONTACT_FORM:
      return { ...state, ...{ creatingContact: false } };
    default:
      return state;
  }
}

export function* createContactSaga() {
  const { firstName, lastName, phone, town, postcode, street, build, apartment, state, country } = yield select((state) => (state.contacts));

  try {
    let { contactId } = yield ServerAPI.contacts.create({
      firstName, lastName, phone, town, postcode, street, build, apartment, state, country
    });
    console.log('Created contact ', contactId)
  } catch (err) {
    console.log(err);
  }
}

export function* watchContactsSagas() {
  yield [
    takeEvery(CREATE_CONTACT, createContactSaga),
  ];
}