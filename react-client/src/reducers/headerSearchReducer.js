import { ITEMS_FETCH_DATA_SUCCESS_HEADER, NDBNO_SUBMITTEDD_SUCCESS } from "../constants"

export default (state = [], action) => {
    switch (action.type) {
        case ITEMS_FETCH_DATA_SUCCESS_HEADER:
            const { items } = action;
            return {
                items
            }
        case NDBNO_SUBMITTEDD_SUCCESS:
            const {
                itemName,
                nutrients
                } = action;
            return {
                itemName,
                nutrients
            }
       
     default: 
        return state       
    }
}