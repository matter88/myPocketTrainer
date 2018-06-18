import axios from "axios";
import { ITEMS_FETCH_DATA_SUCCESS_HEADER } from "../constants.js"

export function itemsFetchDataSuccessHeader(items) {
    let action = {
        type: "ITEMS_FETCH_DATA_SUCCESS_HEADER",
        items
    }
    return action;
}
export function searchUSDA(string) {
   return (dispatch) => {
    axios.post('/banx/usdaDB', {
        searchTerm: string
      })
      .then(function (response) {
        dispatch(itemsFetchDataSuccessHeader(response.data))
      })
      .catch(function (error) {
        console.log(error);
      });
   }
}