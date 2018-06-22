import {
  SIGNED_IN,
  SIGNED_OUT,
  SET_USERSTATS,
  REDIRECT_HOME,
  ITEMS_FETCH_DATA_SUCCESS,
  GET_USERSTATS,
  SET_SERVING_SIZE,
  REDIRECT_TO_CREATE,
  SUCCESS_SAVED_TO_DAILY_INTAKE,
} from "../constants";
import { Redirect } from "react-router-dom";
import axios from "axios";
import React from "react";
import helpers from "../helpers.js";

export function logUser(email) {
  const action = {
    type: SIGNED_IN,
    email
  };
  return action;
}

export function logUserOUT() {
  const action = {
    type: SIGNED_OUT,
    email: null
  };
  return action;
}

export function setUserStats(userObj) {
  const action = {
    type: SET_USERSTATS,
    userObj
  };
  return action;
}

export function redirectHome() {
  const action = {
    type: REDIRECT_HOME,
    tag: <Redirect to="/" />
  };
  return action;
}

export function itemsFetchDataSuccess(items) {
  return {
    type: ITEMS_FETCH_DATA_SUCCESS,
    items
  };
}

export function getTodaysEntries(email) {
  return dispatch => {
    axios
      .get("/banx/getTodaysJournal", {
        params: {
          email: email
        }
      })
      .then(response => {
        dispatch(itemsFetchDataSuccess(response.data));
      })
      .catch(error => {
        console.log(error);
      });
  };
}

export function userStatsFetchedSuccess(stats) {
  return {
    type: GET_USERSTATS,
    stats
  };
}

export function getUserStats(email) {
  return dispatch => {
    axios
      .get("/banx/getUserStats", {
        params: {
          email: email
        }
      })
      .then(response => {
        dispatch(userStatsFetchedSuccess(response.data));
      })
      .catch(error => {
        console.log(error);
      });
  };
}

export function deletedEntrySuccess() {
  return {
    type: DELETE_ENTRY
  };
}

export function deleteEntry(objId) {
  return dispatch => {
    axios
      .post("/banx/deleteEntry", {
        _id: objId
      })
      .then(response => {
        dispatch(getTodaysEntries());
      })
      .catch(error => {
        console.log(error);
      });
  };
}

export function setServingSize(size) {
  return {
    type: SET_SERVING_SIZE,
    size
  };
}

export function routeToCreate() {
  const action = {
    type: REDIRECT_TO_CREATE,
    routeToCreateState: true
  };
  return action;
}

export function getYesterday(email) {
  return dispatch => {
    axios
      .get("/banx/getYesterdayJournal", {
        params: {
          email: email
        }
      })
      .then(response => {
        dispatch(itemsFetchDataSuccess(response.data));
      })
      .catch(error => {
        console.log(error);
      });
  };
}

export function getTomorrowFoodAc(email) {
  return dispatch => {
    axios
      .get("/banx/getTomorrowJournal", {
        params: {
          email: email
        }
      })
      .then(response => {
        dispatch(itemsFetchDataSuccess(response.data));
      })
      .catch(error => {
        console.log(error);
      });
  };
}

export function savetoDailyIntakeSuccess(lastObjSaved) {
  console.log('1')
  let action = {
    type: "SUCCESS_SAVED_TO_DAILY_INTAKE",
    lastObjSaved
  }
  return action;
}

export function saveToDailyIntake(obj, name, email) {
  return (dispatch) => {
    var redesignedObj = helpers.redesign(obj);
    redesignedObj["email"] = email;
    redesignedObj["createdAt"] = new Date();
    redesignedObj["Calories"] = redesignedObj["Energy"];
    redesignedObj["Fats"] = redesignedObj["Total lipid (fat)"];
    redesignedObj["Name"] = name;
    axios
      .post("/banx/caloriesInput", redesignedObj)
      .then(() => {
        dispatch(savetoDailyIntakeSuccess(redesignedObj))
      })
      .catch(function(error) {
        console.log(error);
      });
  }
}