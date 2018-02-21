import { ITEMS_FETCH_DATA_SUCCESS } from "../constants"

export default (state = [], action) => {
    switch (action.type) {
        case ITEMS_FETCH_DATA_SUCCESS:
            const { items } = action;
            return {
                items
            }
     default: 
        return state       
    }
}