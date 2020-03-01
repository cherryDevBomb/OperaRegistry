import {UPLOAD_FILE} from "../actions/types";

const initialState = {
  uploadedFile: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case UPLOAD_FILE:
      return {
        ...state,
        uploadedFile: action.payload
      };
    default:
      return state;
  }
}
