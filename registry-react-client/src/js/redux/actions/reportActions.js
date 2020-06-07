import {properties, REPORT_URL} from "../../constants/properties";
import axios from "axios";
import {getSearchParams} from "../../utils/documentSearchUtils";


export const generateReport = (searchDetails, fileFormat) => async dispatch => {
  try {
    const path = properties.serverURL + REPORT_URL;
    let params = getSearchParams(searchDetails, null);
    params.fileFormat = fileFormat;
    params = new URLSearchParams(params);
    const config = {
      headers: {
        responseType: 'blob'
      },
      params: params
    }
    const res = await axios.get(path, config);

    let fileName = res.headers["content-disposition"].split("filename=")[1];
    let binaryString = window.atob(res.data);
    let binaryLen = binaryString.length;
    let byteArray = new Uint8Array(binaryLen);
    for (let i = 0; i < binaryLen; i++) {
      byteArray[i] = binaryString.charCodeAt(i);
    }

    let blob = new Blob([byteArray], {type: "application/" + fileFormat});
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
  } catch (error) {
    if (error.response) {
      alert(error.response.data.message);
    } else {
      alert('Something went wrong while generating the report');
    }
  }
}