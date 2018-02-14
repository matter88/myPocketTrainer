import { create } from "domain";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from 'redux-logger'
import reducer from './index.js'
import bodyStats from './userBodyStatsReducer.js'

const logger = createLogger();

export default createStore(
    combineReducers({ reducer, bodyStats }),
    {},
    applyMiddleware(logger)
)