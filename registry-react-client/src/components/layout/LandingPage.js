import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import * as appConstants from "../../properties.js";

//sign up or sign in page
export default class LandingPage extends Component {
  render() {
    return (
      <React.Fragment>
        <ButtonToolbar>
          <Button variant="light" href={appConstants.REGISTER_PATH}>
            Sign up
          </Button>
          <Button variant="light" href={appConstants.LOGIN_PATH}>
            Sign in
          </Button>
        </ButtonToolbar>
      </React.Fragment>
    );
  }
}
