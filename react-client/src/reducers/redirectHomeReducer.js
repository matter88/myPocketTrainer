import { REDIRECT_HOME } from '../constants.js'

export default (state = {}, action) => {
    switch (action.type) {
        case REDIRECT_HOME: 
        const { tag } = action;
        return {
            tag
        }
    }
}