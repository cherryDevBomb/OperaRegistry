import axios from "axios";
import {DOCUMENT_CREATED, GET_DOCUMENTS, GET_ERRORS} from "./types";
import {properties} from "../properties.js";
import {DOCUMENTS_URL, NEW_DOCUMENT_UPLOAD_FILE_PATH} from "../properties";

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
