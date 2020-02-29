import {GET_ALL_USERS, UPDATE_SELECTED_USERS} from "../actions/types";

const initialState = {
  allUsers: [],
  selectedUsers: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_USERS:
      return {
        ...state,
        allUsers: action.payload
      };
    case UPDATE_SELECTED_USERS:
      return {
        ...state,
        selectedUsers: action.payload
      };
    default:
      return state;
  }
}
