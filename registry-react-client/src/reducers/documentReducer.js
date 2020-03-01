import {DOCUMENT_CREATED, GET_DOCUMENTS} from "../actions/types";

const initialState = {
  documents: [],
  document: {},
  mostRecentRegNr: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_DOCUMENTS:
      return {
        ...state,
        documents: action.payload
      };
    case DOCUMENT_CREATED:
      return {
        ...state,
        mostRecentRegNr: action.payload
      };
    default:
      return state;
  }
}
