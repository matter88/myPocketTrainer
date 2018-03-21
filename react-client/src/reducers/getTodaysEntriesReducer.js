import { ITEMS_FETCH_DATA_SUCCESS, DELETE_ENTRY } from "../constants"

export default (state = [], action) => {
    switch (action.type) {
        case ITEMS_FETCH_DATA_SUCCESS:
            const { items } = action;
            return {
                items
            }
        case DELETE_ENTRY:
            return state
     default: 
        return state       
    }
}
