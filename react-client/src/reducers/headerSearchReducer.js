import { ITEMS_FETCH_DATA_SUCCESS_HEADER } from "../constants"

export default (state = [], action) => {
    switch (action.type) {
        case ITEMS_FETCH_DATA_SUCCESS_HEADER:
            const { items } = action;
            return {
                items
            }
     default: 
        return state       
    }
}