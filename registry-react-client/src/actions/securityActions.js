import axios from "axios";
import { properties } from "../properties.js";
import * as appConstants from "../properties.js";
import { GET_ERRORS } from "./types.js";
import { SET_CURRENT_USER } from "./types.js";
import setJWTToken from "../securityUtils/setJWTToken.js";
import jwt_decode from "jwt-decode";

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

export const login = LoginRequest => async dispatch => {
  try {
    const path = properties.serverURL + appConstants.LOGIN_URL;
    console.log(path);
    const res = await axios.post(path, LoginRequest);
    const { token } = res.data;
    localStorage.setItem("jwtToken", token);
    //set token in header
    setJWTToken(token);
    const decoded = jwt_decode(token);
    dispatch({
      type: SET_CURRENT_USER,
      payload: decoded
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};
