import {
  GET_ADMIN_USERS,
  GET_ALL_DEPARTMENTS,
  GET_ALL_USERS,
  UPDATE_ALL_USERS,
  UPDATE_SELECTED_USERS_FOR_DESTINATION_SEARCH,
  UPDATE_SELECTED_USERS_FOR_DOCUMENT_HISTORY,
  UPDATE_SELECTED_USERS_FOR_GRANT_ADMIN_ROLE,
  UPDATE_SELECTED_USERS_FOR_ORIGIN_SEARCH
} from "../actions/actionTypes";

const initialState = {
  allUsers: [],
  admins: [],
  selectedUsersForDocumentHistory: [],
  selectedUsersForOriginSearch: [],
  selectedUsersForDestinationSearch: [],
  selectedUsersForGrantAdminRole: [],
  departments: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_USERS:
      return {
        ...state,
        allUsers: action.payload
      };
    case GET_ADMIN_USERS:
      return {
        ...state,
        admins: action.payload
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
      case UPDATE_SELECTED_USERS_FOR_GRANT_ADMIN_ROLE:
      return {
        ...state,
        selectedUsersForGrantAdminRole: action.payload
      };
    case UPDATE_ALL_USERS:
      return {
        ...state,
        allUsers: action.payload
      };
    case GET_ALL_DEPARTMENTS:
      return {
        ...state,
        departments: action.payload
      };
    default:
      return state;
  }
}
