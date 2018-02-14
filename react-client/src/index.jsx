import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { firebaseApp } from './config/firebase.js' ;
import { BrowserRouter as Router } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import App from './components/App.jsx'
import { logUser, logUserOUT } from './actions/index.js';
import store from './reducers/store.js';

// const store = createStore(combineReducers({ reducer }), {}, applyMiddleware());
let redirect;

firebaseApp.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    console.log('user is logged in or has signed up')
    const { email } = user;
    store.dispatch(logUser(email))
  } else {
    // No user is signed in.
    console.log('user is not logged in')
    store.dispatch(logUserOUT())
  }
});

ReactDOM.render( 

  <Provider store={store}>
    <Router>
      <MuiThemeProvider>
        <App />
      </MuiThemeProvider>
    </Router>
  </Provider>
, document.getElementById('app')
);

