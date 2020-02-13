import axios from "axios";
import { GET_ERRORS, GET_DOCUMENTS } from "./types";
import { properties } from "../properties.js";
import * as appConstants from "../properties.js";

export const createDocument = (document, history) => async dispatch => {
  try {
    const path = properties.serverURL + appConstants.DOCUMENTS_URL;
    console.log(path);
    await axios.post(path, document);
    history.push("/my-documents");
    dispatch({
      type: GET_ERRORS,
      payload: {}
    });
  } catch (err) {
    // dispatch({
    //   type: GET_ERRORS,
    //   payload: err.response.data
    // });
  }
};

export const getDocuments = () => async dispatch => {
  const path = properties.serverURL + appConstants.DOCUMENTS_URL;
  const res = await axios.get(path);
  dispatch({
    type: GET_DOCUMENTS,
    payload: res.data
  });
};
