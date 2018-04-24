import { REDIRECT_TO_CREATE } from '../constants'

export default (state = {}, action) => {
    switch(action.type) {
        case REDIRECT_TO_CREATE:
            const { routeToCreateState } = action;
            return {
                routeToCreateState
            }
        default:
            return state
    }
}