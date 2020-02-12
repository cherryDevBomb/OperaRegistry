import { GET_DOCUMENTS } from "../actions/types";

const initialState = {
  documents: [],
  document: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_DOCUMENTS:
      return {
        ...state,
        documents: action.payload
      };
    default:
      return state;
  }
}
