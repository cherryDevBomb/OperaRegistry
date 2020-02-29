import axios from "axios";
import { GET_ALL_USERS } from "./types";
import { properties } from "../properties.js";
import { USERS_URL } from "../properties";

export const getAllUsers = () => async dispatch => {
  const path = properties.serverURL + USERS_URL;
  const res = await axios.get(path);
  dispatch({
    type: GET_ALL_USERS,
    payload: res.data
  });
};
