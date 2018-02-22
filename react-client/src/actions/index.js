import { 
    SIGNED_IN, 
    SIGNED_OUT, 
    SET_USERSTATS, 
    REDIRECT_HOME,
    ITEMS_FETCH_DATA_SUCCESS,
    GET_USERSTATS
 } from '../constants';
import { Redirect } from 'react-router-dom'
import helpers from '../helpers.js';
import axios from 'axios';
import store from '../reducers/store.js';



export function logUser(email) {
    const action = {
        type: SIGNED_IN,
        email
    }
    return action;
}


export function logUserOUT() {
    const action = {
        type: SIGNED_OUT,
        email: null
    }
    return action;
}

export function setUserStats(userObj) {
    const action = {
        type: SET_USERSTATS,
        userObj
    }
    return action;
}

export function redirectHome() {
    const action = {
        type: REDIRECT_HOME,
        tag : <Redirect to='/' />
    }
    return action;
}

export function itemsFetchDataSuccess(items) {
    return {
        type: 'ITEMS_FETCH_DATA_SUCCESS',
        items
    };
}

export function getTodaysEntries(email) {
    return (dispatch) => {
        axios.get('/banx/getTodaysJournal', {
            params: {
                email: email
            }
        })
        .then((response) => {
            dispatch(itemsFetchDataSuccess(response.data))
        })
        // .then(() => {
        //     let objArr = helpers.designEntriesArray()
        //     let totalCalories = helpers.calculateDailyCalories()
        //     console.log('actions index objArr redesigned', objArr)
        //     // this.setState({
        //     //     todaysMacros: objArr,
        //     //     todaysCalories: totalCalories
        //     // })
        // })
        .catch((error) => {
            console.log(error)
        })
    }
}

export function userStatsFetchedSuccess(stats) {
    return {
        type: 'GET_USERSTATS',
        stats
    }
}

export function getUserStats(email) {
    return (dispatch) => {
        axios.get('/banx/getUserStats', {
            params: {
                email: email
            }
        })
        .then((response) => {
            console.log('action index', response.data)
            dispatch(userStatsFetchedSuccess(response.data))
        })
        .catch((error) => {
            console.log(error);
        });
    }
}

export function deletedEntrySuccess() {
    return {
        type: 'DELETE_ENTRY'
    }
}

export function deleteEntry(objId) {
    return (dispatch) => {
        axios.post('/banx/deleteEntry', {
            _id : objId
          })
          .then((response) => {
            console.log(response);
            dispatch(deletedEntrySuccess())
          })
          .catch((error) => {
            console.log(error);
          });
    }
}
