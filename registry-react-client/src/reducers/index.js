import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import documentReducer from "./documentReducer";

export default combineReducers({
  errors: errorReducer,
  document: documentReducer
});
