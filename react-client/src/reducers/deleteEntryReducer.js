import { DELETE_ENTRY } from '../constants'

export default (state = {}, action) => {
    switch (action.type) {
        case DELETE_ENTRY:
            return state
    default:
        return state
    }
}