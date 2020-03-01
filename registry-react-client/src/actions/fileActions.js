import {FILES_URL, MY_DOCUMENTS_PATH, properties} from "../properties";
import axios from "axios";
import {UPLOAD_FILE} from "./types";

export const uploadFile = (file, registryNumber, history) => async dispatch => {
  try {
    const path = properties.serverURL + FILES_URL + "/" + registryNumber.toString();
    const formData = new FormData();
    formData.append('file', file)
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }
    await axios.post(path, formData, config);
    history.push(MY_DOCUMENTS_PATH);
    dispatch({
      type: UPLOAD_FILE,
      payload: {}
    });
  } catch (err) {
    console.log(err);
    // dispatch({
    //   type: GET_ERRORS,
    //   payload: err.response
    // });
  }
};