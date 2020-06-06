import axios from "axios";
import {GET_ADMIN_USERS, GET_ALL_DEPARTMENTS, GET_ALL_USERS, UPDATE_ALL_USERS} from "./actionTypes";
import {properties} from "../../constants/properties.js";
import {
  DEPARTMENTS_URL,
  DOCUMENTS_URL,
  USERS_AVAILABLE_URL,
  USERS_BY_ROLE_URL,
  USERS_GROUPED_URL,
  USERS_URL
} from "../../constants/properties";
import {ROLE_ADMIN} from "../../constants/appConstants";

export const getAllUsers = includePrincipal => async dispatch => {
  const path = properties.serverURL + USERS_GROUPED_URL;
  const res = await axios.get(path, {params: {includePrincipal: includePrincipal}});
  dispatch({
    type: GET_ALL_USERS,
    payload: res.data
  });
};

export const getUsersByRole = (role) => async dispatch => {
  const path = properties.serverURL + USERS_GROUPED_URL + USERS_BY_ROLE_URL;
  const actionType = role === ROLE_ADMIN ? GET_ADMIN_USERS : GET_ALL_USERS;
  const res = await axios.get(path, {params: {role: role}});
  dispatch({
    type: actionType,
    payload: res.data
  });
}

export const updateSelectedUsers = (selectedUsers, actionType) => dispatch => {
  dispatch({
    type: actionType,
    payload: selectedUsers
  });
};

export const updateAllUsers = (remainingUsers) => dispatch => {
  dispatch({
    type: UPDATE_ALL_USERS,
    payload: remainingUsers
  });
};

export const getAllAvailableUsers = registryNumber => async dispatch => {
  const path = properties.serverURL + DOCUMENTS_URL + "/" + registryNumber + USERS_AVAILABLE_URL
  const res = await axios.get(path);
  dispatch({
    type: UPDATE_ALL_USERS,
    payload: res.data
  });
};

export const getAllDepartments = () => async dispatch => {
  const path = properties.serverURL + USERS_URL + DEPARTMENTS_URL;
  const res = await axios.get(path);
  dispatch({
    type: GET_ALL_DEPARTMENTS,
    payload: res.data
  });
};
