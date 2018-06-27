import { SET_USERSTATS_SUCCESS } from '../constants.js';

export default (state = {}, action) => {

        switch (action.type) {
            case SET_USERSTATS_SUCCESS: 
                const { userObj } = action
                return {
                    userObj
                }
            default:
                return state
        }
}