import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style/custom.css";
import "./style/overrides.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import PageHeader from "./components/layout/PageHeader";
import DocumentTable from "./components/document/DocumentTable";
import CreateDocument from "./components/document/CreateDocument";
import LandingPage from "./components/layout/LandingPage";
import Register from "./components/userManagement/Register";
import Login from "./components/userManagement/Login";
import UserDetails from "./components/user/UserDetails";
import { REGISTER_PATH } from "./properties";
import { LOGIN_PATH } from "./properties";
import { DOCUMENTS_PATH } from "./properties";
import { MY_DOCUMENTS_PATH } from "./properties";
import { NEW_DOCUMENT_PATH } from "./properties";
import jwt_decode from "jwt-decode";
import setJWTToken from "./securityUtils/setJWTToken";
import { SET_CURRENT_USER } from "./actions/types";
import { logout } from "./actions/securityActions";
import SecuredRoute from "./securityUtils/SecuredRoute";

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
                component={UserDetails}
              />
              <SecuredRoute
                exact
                path={NEW_DOCUMENT_PATH}
                component={CreateDocument}
              />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
