import { GET_USERSTATS } from "../constants";

export default (state = {}, action) => {
    switch (action.type) {
        case GET_USERSTATS:
            const { stats } = action;
            return {
                stats
            }
     default:
        return state       
    }
}


