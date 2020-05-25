import {PENDING_USERS_URL, properties} from "../properties";
import axios from "axios";
import {GET_PENDING_USERS} from "./types";

export const getPendingUsers = () => async dispatch => {
  const path = properties.serverURL + PENDING_USERS_URL;
  const res = await axios.get(path);
  dispatch({
    type: GET_PENDING_USERS,
    payload: res.data
  });
};

export const confirmUserRegistration = (userId) => async dispatch => {

}