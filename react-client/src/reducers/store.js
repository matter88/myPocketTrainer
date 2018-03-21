import { create } from "domain";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk';
import reducer from './index.js';
import todaysEntries from './getTodaysEntriesReducer.js';
import getUserStats from './getUserStatsReducer.js';
import setServingSize from './setServingSizeReducer.js';

const logger = createLogger();

export default createStore(
    combineReducers({ reducer, todaysEntries, getUserStats, setServingSize}),
    {},
    applyMiddleware(thunk)
)