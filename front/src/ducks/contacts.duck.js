import { createAction } from 'redux-actions';

export const FETCH_USER_CONTACTS = 'FETCH_USER_CONTACTS';

export const userContactsRequest = createAction(FETCH_USER_CONTACTS);

const initialState = {
  list: [
    { name: 'Andrew' },
    { name: 'Daniel' }
  ]
};

export default function contactsReducer(contacts = initialState, { type, payload }) {
  switch (type) {
    case FETCH_USER_CONTACTS:
    default:
      return contacts;
  }
}
