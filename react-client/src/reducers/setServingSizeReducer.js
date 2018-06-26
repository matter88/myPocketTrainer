import { SET_SERVING_SIZE, SUCCESS_SAVED_TO_DAILY_INTAKE } from '../constants';

export default (state = {}, action) => {
    switch (action.type) {
        case SET_SERVING_SIZE:
        const { size } = action;
        return {
            size
        }
    default:
        return state
    }
}