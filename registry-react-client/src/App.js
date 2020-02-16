import React from "react";
import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style/custom.css";
import "./style/overrides.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import PageHeader from "./components/layout/PageHeader";
import DocumentTable from "./components/document/DocumentTable";
import Dashboard from "./components/Dashboard";
import CreateDocument from "./components/document/CreateDocument";
import * as appConstants from "./properties.js";
import LandingPage from "./components/layout/LandingPage";
import Register from "./components/userManagement/Register";
import Login from "./components/userManagement/Login";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <PageHeader />

          <Route exact path="/" component={LandingPage} />
          <Route exact path={appConstants.REGISTER_PATH} component={Register} />
          <Route exact path={appConstants.LOGIN_PATH} component={Login} />

          <Route
            exact
            path={appConstants.DOCUMENTS_PATH}
            component={DocumentTable}
          />
          <Route exact path="/documents-in-work" component={Dashboard} />
          <Route
            exact
            path={appConstants.MY_DOCUMENTS_PATH}
            component={DocumentTable}
          />
          <Route
            exact
            path={appConstants.NEW_DOCUMENT_PATH}
            component={CreateDocument}
          />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
