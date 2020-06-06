import React, {Component} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import Jumbotron from "react-bootstrap/Jumbotron";
import {Button} from "react-bootstrap";
import {getFullName, getInitials} from "../../../utils/userUtils";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

class MyProfilePage extends Component {
  render() {
    const user = this.props.securityReducer.user;
    console.log(user)

    return (
      <React.Fragment>
        <Jumbotron className="mt-4 mx-2 mx-sm-4 pt-3">
          <h4 className="text-center">Contul meu</h4>
          <Container>
            <Row className="mt-5">
              <Col xs="auto" className="mx-auto">
                <Button variant="initials" size="lg">
                  {getInitials(user)}
                </Button>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col xs="auto" className="mx-auto">
                <h5 className="font-weight-normal">{getFullName(user)}</h5>
              </Col>
            </Row>
            <Row className="mt-1">
              <Col xs="auto" className="mx-auto">
                {user.email}
              </Col>
            </Row>
            <Row className="mt-3">
              <Col xs="auto" className="mx-auto">
                <div className="font-weight-light">{user.department}</div>
              </Col>
            </Row>
          </Container>
        </Jumbotron>
      </React.Fragment>
    );
  }
}

MyProfilePage.propTypes = {
  securityReducer: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  securityReducer: state.securityReducer
});

export default connect(mapStateToProps)(MyProfilePage);
