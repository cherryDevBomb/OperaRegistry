import {
  GET_ALL_USERS,
  UPDATE_ALL_USERS,
  UPDATE_SELECTED_USERS_FOR_DESTINATION_SEARCH,
  UPDATE_SELECTED_USERS_FOR_DOCUMENT_HISTORY,
  UPDATE_SELECTED_USERS_FOR_ORIGIN_SEARCH
} from "../actions/types";

const initialState = {
  allUsers: [],
  selectedUsersForDocumentHistory: [],
  selectedUsersForOriginSearch: [],
  selectedUsersForDestinationSearch: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_USERS:
      return {
        ...state,
        allUsers: action.payload
      };
    case UPDATE_SELECTED_USERS_FOR_DOCUMENT_HISTORY:
      return {
        ...state,
        selectedUsersForDocumentHistory: action.payload
      };
    case UPDATE_SELECTED_USERS_FOR_ORIGIN_SEARCH:
      return {
        ...state,
        selectedUsersForOriginSearch: action.payload
      };
    case UPDATE_SELECTED_USERS_FOR_DESTINATION_SEARCH:
      return {
        ...state,
        selectedUsersForDestinationSearch: action.payload
      };
    case UPDATE_ALL_USERS:
      return {
        ...state,
        allUsers: action.payload
      };
    default:
      return state;
  }
}
