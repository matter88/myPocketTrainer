import { 
    SIGNED_IN, 
    SIGNED_OUT, 
    SET_USERSTATS, 
    REDIRECT_HOME,
    ITEMS_FETCH_DATA_SUCCESS,
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
            console.log("peach", response)
            dispatch(itemsFetchDataSuccess(response.data))
        })
        // .then(() => {
        //     let objArr = helpers.designEntriesArray(this.state.todaysEntries)
        //     let totalCalories = helpers.calculateDailyCalories(this.state.todaysEntries)
        //     console.log('daily summary', objArr)
        //     this.setState({
        //         todaysMacros: objArr,
        //         todaysCalories: totalCalories
        //     })
        // })
        .catch((error) => {
            console.log(error)
        })
    }
}
