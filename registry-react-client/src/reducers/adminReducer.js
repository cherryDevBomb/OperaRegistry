import {GET_PENDING_USERS} from "../actions/types";

const initialState = {
  pendingUsers: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PENDING_USERS:
      return {
        ...state,
        pendingUsers: action.payload
      };
    default:
      return state;
  }
}