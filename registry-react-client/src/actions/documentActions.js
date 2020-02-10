import axios from "axios";
import { GET_ERRORS } from "./types";
import { properties } from "../properties.js";

export const createDocument = (document, history) => async dispatch => {
  try {
    const path = properties.serverURL + "/document/new";
    console.log(path);
    const res = await axios.post(path, document);
    history.pushState("/my-documents");
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};
