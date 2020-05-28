import React, {Component} from "react";
import AdminActionConfirmModal from "./AdminActionConfirmModal";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import {getFullName, getInitials} from "../../../utils/userUtils";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {confirmUserRegistration, declineUserRegistration, getPendingUsers} from "../../../actions/adminActions";


class PendingUserCard extends Component {
  constructor(props) {
    super(props);

    this.confirmModalRef = React.createRef();
    this.declineModalRef = React.createRef();

    this.confirmRegistration = this.confirmRegistration.bind(this);
    this.declineRegistration = this.declineRegistration.bind(this);
  }

  async confirmRegistration(user) {
    await this.props.confirmUserRegistration(user);
    this.props.getPendingUsers();
  }

  async declineRegistration(user) {
    await this.props.declineUserRegistration(user);
    this.props.getPendingUsers();
  }

  render() {
    const {user} = this.props;

    return (
      <React.Fragment>
        <AdminActionConfirmModal ref={this.confirmModalRef}
                                 user={user}
                                 actionName={"confirmați înregistrarea"}
                                 adminConfirmCallback={this.confirmRegistration}
        />
        <AdminActionConfirmModal ref={this.declineModalRef}
                                 user={user}
                                 actionName={"refuzați înregistrarea"}
                                 adminConfirmCallback={this.declineRegistration}
        />

        <Card className="mx-sm-2 mt-3 shadow-sm">
          <Card.Header>
            <Container>
              <Row className="mt-2 mb-1">
                <Col xs={{span: 1, order: 1}} className="my-auto">
                  <Button variant="number">{getInitials(user)}</Button>
                </Col>
                <Col xs={{span: 12, order: 3}} sm={{span: "auto", order: 2}} className="my-auto pt-3 pt-sm-0">
                  <Card.Title>{getFullName(user)}</Card.Title>
                </Col>
                <Col xs={{span: "auto", order: 2}} sm={{span: "auto", order: 3}} className="my-0 py-0 ml-auto">
                  <Row>
                    <Col xs="auto" className="my-auto pr-0">
                      <Button variant="archive" size="sm" className="float-right"
                              onClick={(e) => this.declineModalRef.current.handleShow(user)}>
                        Refuză
                      </Button>
                    </Col>
                    <Col xs="auto" className="my-auto">
                      <Button variant="archive" size="sm" className="float-right"
                              onClick={(e) => this.confirmModalRef.current.handleShow(user)}>
                        Confirmă
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Container>
            <hr className="hr-tabs mt-3 mb-0"/>
          </Card.Header>

          <Card.Body>
            <Row className="mt-0 ml-sm-3">
              <Col xs={12} sm={5} md={3} className="my-auto">
                <strong>Email:</strong>
              </Col>
              <Col xs={12} sm={7} md={6} className="my-auto">
                {user.email}
              </Col>
            </Row>
            <Row className="mt-1 ml-sm-3">
              <Col xs={12} sm={5} md={3} className="my-auto">
                <strong>Departament:</strong>
              </Col>
              <Col xs={12} sm={7} md={6} className="my-auto">
                {user.department}
              </Col>
            </Row>
          </Card.Body>

        </Card>
      </React.Fragment>
    )
  }
}

PendingUserCard.propTypes = {
  adminReducer: PropTypes.object.isRequired,
  confirmUserRegistration: PropTypes.func.isRequired,
  declineUserRegistration: PropTypes.func.isRequired,
  getPendingUsers: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  adminReducer: state.adminReducer,
});

export default connect(mapStateToProps, {
  confirmUserRegistration,
  declineUserRegistration,
  getPendingUsers
})(PendingUserCard);

