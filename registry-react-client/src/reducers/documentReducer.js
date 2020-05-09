import {
  DOCUMENT_CREATED,
  GET_DOCUMENTS,
  GET_DOCUMENTS_RECEIVED_ARCHIVED,
  GET_DOCUMENTS_RECEIVED_OPEN,
  GET_DOCUMENTS_RECEIVED_RESOLVED,
  GET_MY_DOCUMENTS_ARCHIVED,
  GET_MY_DOCUMENTS_OPEN,
  SAVE_SEARCH_DETAILS
} from "../actions/types";
import {getDefaultSearchDetails} from "../utils/documentSearchUtils";

let searchDetails = getDefaultSearchDetails();

const initialState = {
  documents: [],
  myDocumentsOpen: [],
  myDocumentsArchived: [],
  documentsReceivedOpen: [],
  documentsReceivedResolved: [],
  documentsReceivedArchived: [],
  searchDetails: searchDetails,
  mostRecentRegNr: null,

  documentsPageCount: 1,
  myOpenDocumentsPageCount: 1,
  myArchivedDocumentsPageCount: 1,
  receivedOpenDocumentsPageCount: 1,
  receivedResolvedDocumentsPageCount: 1,
  receivedArchivedDocumentsPageCount: 1
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_DOCUMENTS:
      return {
        ...state,
        documents: action.payload.documentList,
        documentsPageCount: action.payload.pageCount
      };
    case SAVE_SEARCH_DETAILS:
      return {
        ...state,
        searchDetails: action.payload
      };
    case GET_MY_DOCUMENTS_OPEN:
      return {
        ...state,
        myDocumentsOpen: action.payload.documentList,
        myOpenDocumentsPageCount: action.payload.pageCount
      };
    case GET_MY_DOCUMENTS_ARCHIVED:
      return {
        ...state,
        myDocumentsArchived: action.payload.documentList,
        myArchivedDocumentsPageCount: action.payload.pageCount
      };
    case GET_DOCUMENTS_RECEIVED_OPEN:
      return {
        ...state,
        documentsReceivedOpen: action.payload.documentList,
        receivedOpenDocumentsPageCount: action.payload.pageCount
      };
    case GET_DOCUMENTS_RECEIVED_RESOLVED:
      return {
        ...state,
        documentsReceivedResolved: action.payload.documentList,
        receivedResolvedDocumentsPageCount: action.payload.pageCount
      };
    case GET_DOCUMENTS_RECEIVED_ARCHIVED:
    return {
      ...state,
      documentsReceivedArchived: action.payload.documentList,
      receivedArchivedDocumentsPageCount: action.payload.pageCount
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
