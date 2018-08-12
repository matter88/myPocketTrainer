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
import Amplify from 'aws-amplify';
import configuration from '../../src/aws-exports.js'

Amplify.configure(configuration);

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
        <App className="guava" /> 
    </Router>
  </Provider>
, document.getElementById('app')
);

