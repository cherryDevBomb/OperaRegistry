import axios from "axios";
import {properties} from "../properties.js";
import {LOGIN_URL, REGISTER_URL} from "../properties";
import {GET_ERRORS, SET_CURRENT_USER} from "./types.js";
import setJWTToken from "../utils/securityUtils.js";
import jwt_decode from "jwt-decode";

export const createUser = (newUser) => async dispatch => {
  try {
    const path = properties.serverURL + REGISTER_URL;
    console.log(path);
    await axios.post(path, newUser);
    dispatch({
      type: GET_ERRORS,
      payload: {}
    });
  } catch (error) {
    console.log(error.response.data)
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
  }
};

export const login = LoginRequest => async dispatch => {
  try {
    const path = properties.serverURL + LOGIN_URL;
    const res = await axios.post(path, LoginRequest);
    const {token} = res.data;
    localStorage.setItem("jwtToken", token);
    //set token in header
    setJWTToken(token);
    const decoded = jwt_decode(token);
    dispatch({
      type: SET_CURRENT_USER,
      payload: decoded
    });
  } catch (error) {
    if (error.response) {
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      });
    } else {
      alert("Serviciul nu este disponibil pentru moment")
    }
  }
};

export const logout = () => dispatch => {
  localStorage.removeItem("jwtToken");
  setJWTToken(false);
  dispatch({
    type: SET_CURRENT_USER,
    payload: {}
  });
};
