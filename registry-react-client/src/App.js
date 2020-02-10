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

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <PageHeader />
          <Route exact path="/documents" component={DocumentTable} />
          <Route exact path="/documents-in-work" component={Dashboard} />
          <Route exact path="/my-documents" component={DocumentTable} />
          <Route exact path="/new-document" component={CreateDocument} />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
