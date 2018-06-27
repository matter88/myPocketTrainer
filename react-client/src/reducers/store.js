import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk';
import reducer from './index.js';
import todaysEntries from './getTodaysEntriesReducer.js';
import getUserStats from './getUserStatsReducer.js';
import setServingSize from './setServingSizeReducer.js';
import headerSearchReducer from './headerSearchReducer';
import userBodyStatsReducer from './userBodyStatsReducer';

export default createStore(
    combineReducers({ 
         reducer,
         todaysEntries, 
         getUserStats, 
         setServingSize, 
         headerSearchReducer,
        userBodyStatsReducer
        }),
    {},
    applyMiddleware(thunk)
)