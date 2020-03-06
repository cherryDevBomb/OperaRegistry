import axios from "axios";
import {
  DOCUMENT_CREATED,
  GET_DOCUMENTS,
  GET_DOCUMENTS_RECEIVED_ARCHIVED,
  GET_DOCUMENTS_RECEIVED_OPEN,
  GET_ERRORS,
  GET_MY_DOCUMENTS_ARCHIVED,
  GET_MY_DOCUMENTS_OPEN
} from "./types";
import {properties} from "../properties.js";
import {DOCUMENTS_RECEIVED_URL, DOCUMENTS_URL, MY_DOCUMENTS_URL, NEW_DOCUMENT_UPLOAD_FILE_PATH} from "../properties";

export const createDocument = (document, history) => async dispatch => {
  try {
    const path = properties.serverURL + DOCUMENTS_URL;
    const res = await axios.post(path, document);
    history.push(NEW_DOCUMENT_UPLOAD_FILE_PATH);
    dispatch({
      type: DOCUMENT_CREATED,
      payload: res.data
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

export const getMyDocumentsOpen = () => async dispatch => {
  const path = properties.serverURL + MY_DOCUMENTS_URL;
  const res = await axios.get(path, { params: {archived: false}});
  dispatch({
    type: GET_MY_DOCUMENTS_OPEN,
    payload: res.data
  });
};

export const getMyDocumentsArchived = () => async dispatch => {
  const path = properties.serverURL + MY_DOCUMENTS_URL;
  const res = await axios.get(path, { params: {archived: true}});
  dispatch({
    type: GET_MY_DOCUMENTS_ARCHIVED,
    payload: res.data
  });
};

export const getDocumentsReceivedOpen = () => async dispatch => {
  const path = properties.serverURL + DOCUMENTS_RECEIVED_URL;
  const res = await axios.get(path, { params: {archived: false}});
  dispatch({
    type: GET_DOCUMENTS_RECEIVED_OPEN,
    payload: res.data
  });
};

export const getDocumentsReceivedArchived = () => async dispatch => {
  const path = properties.serverURL + DOCUMENTS_RECEIVED_URL;
  const res = await axios.get(path, { params: {archived: true}});
  dispatch({
    type: GET_DOCUMENTS_RECEIVED_ARCHIVED,
    payload: res.data
  });
};