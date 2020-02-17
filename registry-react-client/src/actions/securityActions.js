import axios from "axios";
import { properties } from "../properties.js";
import * as appConstants from "../properties.js";
import { GET_ERRORS } from "./types.js";

export const createUser = (newUser, history) => async dispatch => {
  try {
    const path = properties.serverURL + appConstants.REGISTER_URL;
    console.log(path);
    await axios.post(path, newUser);
    history.push(appConstants.LOGIN_PATH);
    dispatch({
      type: GET_ERRORS,
      payload: {}
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};
