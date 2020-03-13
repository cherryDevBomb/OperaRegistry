import {FILES_URL, MY_DOCUMENTS_PATH, properties} from "../properties";
import axios from "axios";
import {DOWNLOAD_FILE, UPLOAD_FILE} from "./types";
import FileSaver from "file-saver";
import fileSaver from "../utils/fileSaver";

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
    //TODO try this
    //await axios.post(path, formData);
    await axios.post(path, formData, config);
    alert('File uploaded successfully!');
    history.push(MY_DOCUMENTS_PATH);
    dispatch({
      type: UPLOAD_FILE,
      payload: {}
    });
  } catch (error) {
    console.log(error);
    if (error.response) {
      alert(error.response.data.message);
    } else {
      alert('Something went wrong while uploading this file');
    }
    // dispatch({
    //   type: GET_ERRORS,
    //   payload: err.response.data
    // });
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

    //TODO investigate disposition not being sent as header
    //let fileName = res.headers["content-disposition"].split("filename=")[1] + ".pdf";
    //console.log(fileName);
    const fileName = "file.pdf"

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
    link.setAttribute('download', 'file.pdf');
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