import axios from "axios";
import { GET_ERRORS, GET_DOCUMENTS } from "./types";
import { properties } from "../properties.js";
import { DOCUMENTS_URL } from "../properties";
import { MY_DOCUMENTS_PATH } from "../properties";

export const createDocument = (document, history) => async dispatch => {
  try {
    const path = properties.serverURL + DOCUMENTS_URL;
    await axios.post(path, document);
    history.push(MY_DOCUMENTS_PATH);
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

export const getDocuments = () => async dispatch => {
  const path = properties.serverURL + DOCUMENTS_URL;
  const res = await axios.get(path);
  dispatch({
    type: GET_DOCUMENTS,
    payload: res.data
  });
};
