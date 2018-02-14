import { SIGNED_IN, SIGNED_OUT } from '../constants';

export default (state = {}, action) => {
    switch (action.type) {
        case SIGNED_IN:
            const { email } = action;
            return {
                email
            }
        case SIGNED_OUT:
            return {
                email
            }    
    default:
        return state
    }
}