import {FILES_URL, MY_DOCUMENTS_PATH, properties} from "../properties";
import axios from "axios";
import {DOWNLOAD_FILE, GET_ERRORS, UPLOAD_FILE} from "./types";

export const uploadFile = (file, registryNumber, history) => async dispatch => {
  try {
    const path = properties.serverURL + FILES_URL + "/" + registryNumber.toString();
    const formData = new FormData();
    formData.append('file', file)
    // const config = {
    //   headers: {
    //     'content-type': 'multipart/form-data'
    //   }
    // }
    //await axios.post(path, formData, config);
    await axios.post(path, formData);
    dispatch({
      type: GET_ERRORS,
      payload: {}
    })
    history.push(MY_DOCUMENTS_PATH);
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: {file: "Alegeți un fișier sau apăsați \"Skip\""}
    })
  }
};

export const downloadFile = (registryNumber) => async dispatch => {
  try {
    const path = properties.serverURL + FILES_URL + "/" + registryNumber.toString();
    const config = {
      headers: {
        responseType: 'blob'
      }
    }
    const res = await axios.get(path, config);

    let fileName = res.headers["content-disposition"].split("filename=")[1];
    let binaryString = window.atob(res.data);
    let binaryLen = binaryString.length;
    let byteArray = new Uint8Array(binaryLen);
    for (let i = 0; i < binaryLen; i++) {
      byteArray[i] = binaryString.charCodeAt(i);
    }

    let blob = new Blob([byteArray], {type: "application/pdf"});
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    dispatch({
      type: DOWNLOAD_FILE,
      payload: fileName
    });
  } catch (error) {
    console.log(error);
    if (error.response) {
      alert(error.response.data.message);
    } else {
      alert('Something went wrong while downloading this file');
    }
  }
}