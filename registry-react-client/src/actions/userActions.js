import axios from "axios";
import {GET_ALL_USERS, UPDATE_ALL_USERS, UPDATE_SELECTED_USERS} from "./types";
import { properties } from "../properties.js";
import {USERS_GROUPED_URL} from "../properties";

export const getAllUsers = () => async dispatch => {
  const path = properties.serverURL + USERS_GROUPED_URL;
  const res = await axios.get(path);
  dispatch({
    type: GET_ALL_USERS,
    payload: res.data
  });
};

export const updateSelectedUsers = (selectedUsers) => dispatch => {
  dispatch({
    type: UPDATE_SELECTED_USERS,
    payload: selectedUsers
  });
};

export const updateAllUsers = (remainingUsers) => dispatch => {
  dispatch({
    type: UPDATE_ALL_USERS,
    payload: remainingUsers
  });
};
