import {combineReducers} from "redux";
import adminReducer from "./adminReducer";
import errorReducer from "./errorReducer";
import documentReducer from "./documentReducer";
import securityReducer from "./securityReducer";
import userReducer from "./userReducer";
import fileReducer from "./fileReducer";

export default combineReducers({
  errorReducer: errorReducer,
  documentReducer: documentReducer,
  securityReducer: securityReducer,
  userReducer: userReducer,
  adminReducer: adminReducer,
  fileReducer: fileReducer
});
