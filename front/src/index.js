import React from 'react';
import ReactDOM from 'react-dom';
import createSagaMiddleware from 'redux-saga';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';

import rootReducer from './reducer.root';
import rootSaga from './saga.root';

import App from './pages/main/Main';
import './index.scss';

const theme = createMuiTheme({
  palette: {
    primary: blue,
  },
});

const sagaMiddleware = createSagaMiddleware();

const initialState = {};

export const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(
    sagaMiddleware
  )
);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <App />
    </Provider>
  </MuiThemeProvider>
  , document.getElementById('root'));

