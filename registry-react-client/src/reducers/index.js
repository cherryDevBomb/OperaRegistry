import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import documentReducer from "./documentReducer";
import securityReducer from "./securityReducer";
import userReducer from "./userReducer";

export default combineReducers({
  errorReducer: errorReducer,
  documentReducer: documentReducer,
  securityReducer: securityReducer,
  userReducer: userReducer
});
