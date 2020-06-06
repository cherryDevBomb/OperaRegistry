import {DOWNLOAD_FILE, UPLOAD_FILE} from "../actions/actionTypes";

const initialState = {
  uploadedFile: null,
  downloadedFile: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case UPLOAD_FILE:
      return {
        ...state,
        uploadedFile: action.payload
      };
    case DOWNLOAD_FILE:
      return {
        ...state,
        downloadedFile: action.payload
      };
    default:
      return state;
  }
}
