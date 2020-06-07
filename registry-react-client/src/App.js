import React, {Component} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style/theme.css";
import "./style/App.css";
import "./style/components/accordion.css"
import "./style/components/badge.css"
import "./style/custom/autosuggest.css"
import "./style/components/btn-variants.css"
import "./style/components/btn-toggle.css"
import "./style/components/form.css"
import "./style/components/icons.css"
import "./style/components/nav.css"
import "./style/custom/landing.css"
import "./style/custom/table.css"
import "./style/components/tab.css"
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./js/redux/store";
import PageHeader from "./js/components/navigation/PageHeader";
import DocumentTable from "./js/components/document/layout/DocumentTable";
import CreateDocument from "./js/components/document/layout/CreateDocument";
import LandingPage from "./js/components/authentication/LandingPage";
import Register from "./js/components/authentication/Register";
import {
  ADMIN_PATH,
  DOCUMENTS_PATH,
  HELP_PATH,
  LOGIN_PATH,
  MY_DOCUMENTS_PATH,
  MY_PROFILE_PATH,
  NEW_DOCUMENT_PATH,
  RECEIVED_DOCUMENTS_PATH,
  REGISTER_PATH
} from "./js/constants/properties";
import jwt_decode from "jwt-decode";
import setJWTToken from "./js/utils/securityUtils";
import {SET_CURRENT_USER} from "./js/redux/actions/actionTypes";
import {logout} from "./js/redux/actions/securityActions";
import SecuredRoute from "./js/components/navigation/SecuredRoute";
import MyDocuments from "./js/components/document/layout/MyDocuments";
import ReceivedDocuments from "./js/components/document/layout/ReceivedDocuments";
import HelpPage from "./js/components/user/layout/HelpPage";
import AdminPage from "./js/components/user/layout/AdminPage";
import MyProfilePage from "./js/components/user/layout/MyProfilePage";

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
    window.location.href = LOGIN_PATH;
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <PageHeader/>

            <Route exact path={LOGIN_PATH} component={LandingPage}/>
            <Route exact path={REGISTER_PATH} component={Register}/>

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
                path={MY_PROFILE_PATH}
                component={MyProfilePage}
              />
              <SecuredRoute
                exact
                path={ADMIN_PATH}
                component={AdminPage}
              />
              <SecuredRoute
                exact
                path={HELP_PATH}
                component={HelpPage}
              />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
