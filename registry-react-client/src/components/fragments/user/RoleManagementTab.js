import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import {getUsersByRole, updateAllUsers, updateSelectedUsers} from "../../../actions/userActions";
import Button from "react-bootstrap/Button";
import {UPDATE_SELECTED_USERS_FOR_GRANT_ADMIN_ROLE} from "../../../actions/types";
import {ROLE_ADMIN, ROLE_USER} from "../../../constants/appConstants";
import UserAutosuggest from "./UserAutosuggest";
import {grantAdminRole} from "../../../actions/adminActions";
import AdminActionConfirmModal from "./AdminActionConfirmModal";
import {spinnerBanner} from "../../../utils/spinnerUtils";
import Jumbotron from "react-bootstrap/Jumbotron";
import {getReceiverItem} from "../../../utils/userUtils";
import UserPopup from "./UserPopup";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

class RoleManagementTab extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      displayErrorMessage: false
    }

    this.confirmModalRef = React.createRef();
    this.refUserAutosuggest = React.createRef();

    this.grantAdminRole = this.grantAdminRole.bind(this);
  }

  componentDidMount() {
    this.props.getUsersByRole(ROLE_USER);
    this.props.getUsersByRole(ROLE_ADMIN);
  }

  componentWillUnmount() {
    this.props.updateAllUsers([]);
  }

  onGrantRoleButtonClick(e) {
    if (this.props.userReducer.selectedUsersForGrantAdminRole.length === 0) {
      this.setState({displayErrorMessage: true})
    } else {
      this.confirmModalRef.current.handleShow(this.props.userReducer.selectedUsersForGrantAdminRole);
      this.setState({displayErrorMessage: false})
    }
  }

  async grantAdminRole() {
    const selectedUsers = this.props.userReducer.selectedUsersForGrantAdminRole;
    await this.props.grantAdminRole(selectedUsers);
    this.props.updateSelectedUsers([], UPDATE_SELECTED_USERS_FOR_GRANT_ADMIN_ROLE);
    this.refUserAutosuggest.current.clearPrevSelections();
    this.props.getUsersByRole(ROLE_ADMIN);
  }


  render() {
    const admins = this.props.userReducer.admins.map(section => section.departmentUsers).flat();

    let adminsPanel;
    if (this.state.isLoading) {
      adminsPanel = spinnerBanner();
    } else {
      adminsPanel = (
        <Jumbotron className="mx-3 my-4 shadow px-3 py-3">
          <Row>
            <Col>
              <h5>Utilizatori cu rolul de administrator</h5>
            </Col>
          </Row>
          <Row noGutters className="mb-4">
            {admins.map(user => (
              <Col xs="auto" key={user.userId}>
                <OverlayTrigger
                  trigger={['hover', 'focus']}
                  placement="auto"
                  overlay={<UserPopup user={user}/>}
                >
                  {getReceiverItem(user, false)}
                </OverlayTrigger>
              </Col>
            ))}
          </Row>
        </Jumbotron>
      )
    }

    const grantAdminRoleForm = (
      <Container>
        <Row className="mt-5">
          <Col>
            <h5>Acordați rolul de administrator altor utilizatori</h5>
          </Col>
        </Row>
        <Row className="mt-4 align-items-center">
          <Col xs={12} sm={7} className="my-auto">
            <UserAutosuggest ref={this.refUserAutosuggest}
                             placeholder="Introduceți utilizatorul"
                             prevSelectedUsers={[]}
                             actionType={UPDATE_SELECTED_USERS_FOR_GRANT_ADMIN_ROLE}/>
          </Col>
          <Col xs={12} sm="auto">
            <Button variant="primary" onClick={this.onGrantRoleButtonClick.bind(this)}>
              Acordați rolul de administrator
            </Button>
          </Col>
        </Row>

        <Row className="mt-1 align-items-center">
          <Col xs={12} sm={7} className="my-auto">
            {this.state.displayErrorMessage &&
            <div className="small error-feedback">Nu ați indicat nici un utilizator</div>}
          </Col>
        </Row>
      </Container>
    )

    return (
      <React.Fragment>
        <AdminActionConfirmModal ref={this.confirmModalRef}
                                 user={this.props.userReducer.selectedUsersForGrantAdminRole}
                                 actionName={"acordați rolul de administrator"}
                                 adminConfirmCallback={this.grantAdminRole}
        />
        {adminsPanel}
        {grantAdminRoleForm}
      </React.Fragment>
    );
  }
}

RoleManagementTab.propTypes = {
  adminReducer: PropTypes.object.isRequired,
  userReducer: PropTypes.object.isRequired,
  getUsersByRole: PropTypes.func.isRequired,
  grantAdminRole: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  adminReducer: state.adminReducer,
  userReducer: state.userReducer
});

export default connect(mapStateToProps, {
  getUsersByRole,
  grantAdminRole,
  updateSelectedUsers,
  updateAllUsers
})(RoleManagementTab);
