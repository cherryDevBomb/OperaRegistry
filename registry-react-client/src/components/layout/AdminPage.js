import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {confirmUserRegistration, declineUserRegistration, getPendingUsers} from "../../actions/adminActions";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {getNoPendingUsersBanner} from "../../utils/emptyBanners";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Jumbotron from "react-bootstrap/Jumbotron";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import {spinnerBanner} from "../../utils/spinnerBanner";
import {getFullName, getInitials} from "../../utils/userUtils";
import AdminActionConfirmModal from "../fragments/user/AdminActionConfirmModal";

class AdminPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false
    }

    this.confirmModalRef = React.createRef();
    this.declineModalRef = React.createRef();

    this.confirmRegistration = this.confirmRegistration.bind(this);
    this.declineRegistration = this.declineRegistration.bind(this);
  }

  componentDidMount() {
    this.props.getPendingUsers();
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
    const pendingUsers = this.props.adminReducer.pendingUsers;

    let tabConfirmationsContent;
    if (this.state.isLoading) {
      tabConfirmationsContent = spinnerBanner();
    } else if (pendingUsers && pendingUsers.length > 0) {
      tabConfirmationsContent = (
        <React.Fragment>
          {pendingUsers.map(user => (
            <React.Fragment key={user.userId}>
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
          ))}
        </React.Fragment>
      )
    } else if (pendingUsers && pendingUsers.length === 0) {
      tabConfirmationsContent = getNoPendingUsersBanner();
    }

    return (
      <React.Fragment>
        <Jumbotron className="mt-4 mx-2 mx-sm-4 pt-3">
          <h4 className="text-center">Pagină Administrator</h4>
          <Tabs defaultActiveKey="open" id="admin-tab" variant="tabs" className="mt-3 pt-1 tabs">
            <Tab eventKey="open" title="Cereri de înregistrare" className="tab-left">
              {tabConfirmationsContent}
            </Tab>
            <Tab eventKey="archived" title="Management privilegii" className="tab-right">
              {/*{tabArchivedContent}*/}
            </Tab>
          </Tabs>
        </Jumbotron>
      </React.Fragment>
    );
  }
}

AdminPage.propTypes = {
  adminReducer: PropTypes.object.isRequired,
  getPendingUsers: PropTypes.func.isRequired,
  confirmUserRegistration: PropTypes.func.isRequired,
  declineUserRegistration: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  adminReducer: state.adminReducer,
});

export default connect(mapStateToProps, {getPendingUsers, confirmUserRegistration, declineUserRegistration})(AdminPage);
