import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import documentReducer from "./documentReducer";
import securityReducer from "./securityReducer";

export default combineReducers({
  errors: errorReducer,
  document: documentReducer,
  security: securityReducer
});
