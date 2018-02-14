import { SIGNED_IN, SIGNED_OUT, SET_USERSTATS, REDIRECT_HOME } from '../constants';
import { Redirect } from 'react-router-dom'

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
