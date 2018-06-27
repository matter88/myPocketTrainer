import { SET_SERVING_SIZE} from '../constants';

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