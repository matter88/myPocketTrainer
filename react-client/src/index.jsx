import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { firebaseApp } from './config/firebase.js' ;
import { BrowserRouter as Router } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import PreApp from './components/PreApp.jsx'
import { logUser, logUserOUT } from './actions/index.js';
import store from './reducers/store.js';

firebaseApp.auth().onAuthStateChanged(function(user) {
  if (user) {
    const { email } = user;
    store.dispatch(logUser(email))
  } else {
    store.dispatch(logUserOUT())
  }
});

ReactDOM.render( 
  <Provider store={store}>
    <Router>
      <MuiThemeProvider>
        <PreApp className="guava" />
      </MuiThemeProvider>
    </Router>
  </Provider>
, document.getElementById('app')
);

