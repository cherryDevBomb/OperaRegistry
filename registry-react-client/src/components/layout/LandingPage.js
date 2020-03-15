import React, {Component} from "react";
import Button from "react-bootstrap/Button";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import {REGISTER_PATH} from "../../properties.js";
import {DOCUMENTS_PATH} from "../../properties.js";
import {LOGIN_PATH} from "../../properties.js";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import Jumbotron from "react-bootstrap/Jumbotron";
import Login from "../fragments/userManagement/Login";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import background from "../../resources/landing-bg-poster.jpg"

class LandingPage extends Component {
  componentDidMount() {
    if (this.props.securityReducer.validToken) {
      this.props.history.push(DOCUMENTS_PATH);
    }
  }

  render() {
    return (
      <div className="landing-div bg">
        <Jumbotron className="jumbotron-login">
          <p className="text-center">
            <h3>Intră în cont</h3>
          </p>
          {/*<p>*/}
          {/*  This is a simple hero unit, a simple jumbotron-style component for calling*/}
          {/*  extra attention to featured content or information.*/}
          {/*</p>*/}
          {/*<p>*/}
          {/*  <Button variant="primary">Learn more</Button>*/}
          {/*</p>*/}

          <ButtonToolbar>
            <Container>
              <Row><Col>
                <Login {...this.props}/>
              </Col></Row>
              <Row className="signup-row">
                <Col xs={1}/>
                <Col xs={6} className="text-right">
                  Nu ai cont?
                </Col>
                <Col xs={4} className="text-left">
                  <Button variant="sign-up" href={REGISTER_PATH}>
                    Cont nou
                  </Button>
                </Col>
                <Col xs={1}/>
              </Row>
            </Container>
          </ButtonToolbar>
        </Jumbotron>
      </div>
    );
  }
}

LandingPage.propTypes = {
  securityReducer: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  securityReducer: state.securityReducer
});

export default connect(mapStateToProps)(LandingPage);
