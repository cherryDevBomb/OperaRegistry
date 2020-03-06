import {
  DOCUMENT_CREATED,
  GET_DOCUMENTS,
  GET_DOCUMENTS_RECEIVED_ARCHIVED,
  GET_DOCUMENTS_RECEIVED_OPEN,
  GET_MY_DOCUMENTS_ARCHIVED,
  GET_MY_DOCUMENTS_OPEN
} from "../actions/types";

const initialState = {
  documents: [],
  myDocumentsOpen: [],
  myDocumentsArchived: [],
  documentsReceivedOpen: [],
  documentsReceivedArchived: [],
  mostRecentRegNr: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_DOCUMENTS:
      return {
        ...state,
        documents: action.payload
      };
    case GET_MY_DOCUMENTS_OPEN:
      return {
        ...state,
        myDocumentsOpen: action.payload
      };
    case GET_MY_DOCUMENTS_ARCHIVED:
      return {
        ...state,
        myDocumentsArchived: action.payload
      };
    case GET_DOCUMENTS_RECEIVED_OPEN:
      return {
        ...state,
        documentsReceivedOpen: action.payload
      };
    case GET_DOCUMENTS_RECEIVED_ARCHIVED:
      return {
        ...state,
        documentsReceivedArchived: action.payload
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