import { combineReducers } from 'redux';

import userContactsReducer from './ducks/contacts.duck';

const rootReducer = combineReducers({
  contacts: userContactsReducer,
});

export default rootReducer;
