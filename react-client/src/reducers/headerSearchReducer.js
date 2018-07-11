import { ITEMS_FETCH_DATA_SUCCESS_HEADER, NDBNO_SUBMITTEDD_SUCCESS, SUCCESS_SAVED_TO_DAILY_INTAKE } from "../constants"

export default (state = [], action) => {
    switch (action.type) {
        case ITEMS_FETCH_DATA_SUCCESS_HEADER:
            const { itemsSearched } = action;
            return {
                itemsSearched
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
        case SUCCESS_SAVED_TO_DAILY_INTAKE:
            const { lastObjSaved } = action;
            return{
                lastObjSaved,
                items: null
            }
     default: 
        return state       
    }
}