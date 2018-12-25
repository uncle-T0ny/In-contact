import { combineReducers } from 'redux';

import userContactsReducer from './ducks/contacts.duck';
import appReducer from './ducks/app.duck';
import authReducer from './ducks/auth.duck';

const rootReducer = combineReducers({
  contacts: userContactsReducer,
  app: appReducer,
  auth: authReducer,
});

export default rootReducer;
