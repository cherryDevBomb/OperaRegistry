import React, {Component} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style/theme.css";
import "./style/App.css";
import "./style/reusables/badge.css"
import "./style/reusables/autosuggest.css"
import "./style/reusables/btn-variants.css"
import "./style/reusables/btn-toggle.css"
import "./style/reusables/font.css"
import "./style/reusables/form.css"
import "./style/reusables/icons.css"
import "./style/reusables/nav.css"
import "./style/components/landing.css"
import "./style/components/table.css"
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./store";
import PageHeader from "./components/fragments/navigation/PageHeader";
import DocumentTable from "./components/layout/DocumentTable";
import CreateDocument from "./components/layout/CreateDocument";
import LandingPage from "./components/layout/LandingPage";
import Register from "./components/fragments/security/Register";
import Login from "./components/fragments/security/Login";
import {
  DOCUMENTS_PATH,
  LOGIN_PATH,
  MY_DOCUMENTS_PATH,
  NEW_DOCUMENT_PATH,
  NEW_DOCUMENT_UPLOAD_FILE_PATH,
  RECEIVED_DOCUMENTS_PATH,
  REGISTER_PATH
} from "./properties";
import jwt_decode from "jwt-decode";
import setJWTToken from "./utils/setJWTToken";
import {SET_CURRENT_USER} from "./actions/types";
import {logout} from "./actions/securityActions";
import SecuredRoute from "./utils/SecuredRoute";
import UploadAfterCreate from "./components/fragments/document/UploadAfterCreate";
import MyDocuments from "./components/layout/MyDocuments";
import ReceivedDocuments from "./components/layout/ReceivedDocuments";

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
            {/*<Route exact path={LOGIN_PATH} component={Login} />*/}

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
