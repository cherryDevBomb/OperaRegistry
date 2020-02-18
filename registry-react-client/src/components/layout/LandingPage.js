import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import { REGISTER_PATH } from "../../properties.js";
import { DOCUMENTS_PATH } from "../../properties.js";
import { LOGIN_PATH } from "../../properties.js";
import { connect } from "react-redux";
import PropTypes from "prop-types";

//sign up or sign in page
class LandingPage extends Component {
  componentDidMount() {
    if (this.props.security.validToken) {
      this.props.history.push(DOCUMENTS_PATH);
    }
  }

  render() {
    return (
      <React.Fragment>
        <ButtonToolbar>
          <Button variant="light" href={REGISTER_PATH}>
            Sign up
          </Button>
          <Button variant="light" href={LOGIN_PATH}>
            Sign in
          </Button>
        </ButtonToolbar>
      </React.Fragment>
    );
  }
}

LandingPage.propTypes = {
  security: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  security: state.security
});

export default connect(mapStateToProps)(LandingPage);
