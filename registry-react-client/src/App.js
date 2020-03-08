import React, {Component} from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style/theme.css";
import "./style/overrides.css";
import "./style/btn.css";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./store";
import PageHeader from "./components/layout/PageHeader";
import DocumentTable from "./components/document/DocumentTable";
import CreateDocument from "./components/document/CreateDocument";
import LandingPage from "./components/layout/LandingPage";
import Register from "./components/userManagement/Register";
import Login from "./components/userManagement/Login";
import {
  DOCUMENTS_PATH,
  LOGIN_PATH,
  MY_DOCUMENTS_PATH,
  NEW_DOCUMENT_PATH,
  NEW_DOCUMENT_UPLOAD_FILE_PATH, RECEIVED_DOCUMENTS_PATH,
  REGISTER_PATH
} from "./properties";
import jwt_decode from "jwt-decode";
import setJWTToken from "./securityUtils/setJWTToken";
import {SET_CURRENT_USER} from "./actions/types";
import {logout} from "./actions/securityActions";
import SecuredRoute from "./securityUtils/SecuredRoute";
import UploadAfterCreate from "./components/document/UploadAfterCreate";
import MyDocuments from "./components/document/MyDocuments";
import ReceivedDocuments from "./components/document/ReceivedDocuments";

const jwtToken = localStorage.jwtToken;

if (jwtToken) {
  setJWTToken(jwtToken);
  const decoded = jwt_decode(jwtToken);
  store.dispatch({
    type: SET_CURRENT_USER,
    payload: decoded
  });

  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logout());
    window.location.href = "/";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <PageHeader />

            <Route exact path="/" component={LandingPage} />
            <Route exact path={REGISTER_PATH} component={Register} />
            <Route exact path={LOGIN_PATH} component={Login} />

            <Switch>
              <SecuredRoute
                exact
                path={DOCUMENTS_PATH}
                component={DocumentTable}
              />
              <SecuredRoute
                exact
                path={MY_DOCUMENTS_PATH}
                component={MyDocuments}
              />
              <SecuredRoute
                exact
                path={RECEIVED_DOCUMENTS_PATH}
                component={ReceivedDocuments}
              />
              <SecuredRoute
                exact
                path={NEW_DOCUMENT_PATH}
                component={CreateDocument}
              />
              <SecuredRoute
                exact
                path={NEW_DOCUMENT_UPLOAD_FILE_PATH}
                component={UploadAfterCreate}
              />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
