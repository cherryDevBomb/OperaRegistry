import {
  ADMIN_URL,
  CONFIRM_REGISTRATION_URL,
  DECLINE_REGISTRATION_URL,
  GRANT_ADMIN_ROLE_URL,
  PENDING_USERS_URL,
  properties
} from "../properties";
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

export const confirmUserRegistration = (user) => async dispatch => {
  const path = properties.serverURL + ADMIN_URL + CONFIRM_REGISTRATION_URL + "/" + user.userId;
  await axios.put(path);
}

export const declineUserRegistration = (user) => async dispatch => {
  const path = properties.serverURL + ADMIN_URL + DECLINE_REGISTRATION_URL + "/" + user.userId;
  await axios.delete(path);
}

export const grantAdminRole = (users) => async dispatch => {
  console.log(users);
  const path = properties.serverURL + ADMIN_URL + GRANT_ADMIN_ROLE_URL;
  users.forEach(user => {
    const userPath = path + "/" + user.userId;
    axios.put(userPath);
  })
}
