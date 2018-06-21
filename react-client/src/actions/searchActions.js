import axios from "axios";
import { ITEMS_FETCH_DATA_SUCCESS_HEADER, NDBNO_SUBMITTEDD_SUCCESS } from "../constants.js"

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
      .then(function(response) {
        dispatch(itemsFetchDataSuccessHeader(response.data))
      })
      .catch(function (error) {
        console.log(error);
      });
   }
}

export function ndbnoSubmittedSuccess(itemName, nutrients) {
  let action = {
    type: "NDBNO_SUBMITTEDD_SUCCESS",
    itemName,
    nutrients
  }
  return action;
}

export function submitNDBNO(string) {
  return (dispatch) => {
    axios
      .get("banx/usdaReport", {
        params: {
          ndbno: string
        }
      })
      .then(response => {
        let itemName = response.data.report.food.name;
        let nutrients = response.data.report.food.nutrients;     
        dispatch(ndbnoSubmittedSuccess(itemName, nutrients))
      })
      .catch(error => {
        console.log(error);
      });
  }
}