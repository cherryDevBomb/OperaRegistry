import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import {getUsersByRole, updateAllUsers, updateSelectedUsers} from "../../../actions/userActions";
import Button from "react-bootstrap/Button";
import {UPDATE_SELECTED_USERS_FOR_GRANT_ADMIN_ROLE} from "../../../actions/types";
import {ROLE_USER} from "../../../constants/appConstants";
import UserAutosuggest from "./UserAutosuggest";
import {grantAdminRole} from "../../../actions/adminActions";
import AdminActionConfirmModal from "./AdminActionConfirmModal";

class RoleManagementTab extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false
    }

    this.confirmModalRef = React.createRef();
    this.grantAdminRole = this.grantAdminRole.bind(this);

    this.refUserAutosuggest = React.createRef();
  }

  componentDidMount() {
    console.log("admin tab did mount")
    this.props.getUsersByRole(ROLE_USER);
  }

  componentWillUnmount() {
    this.props.updateAllUsers([]);
  }

  async grantAdminRole() {
    const selectedUsers = this.props.userReducer.selectedUsersForGrantAdminRole;
    await this.props.grantAdminRole(selectedUsers);
    this.props.updateSelectedUsers([], UPDATE_SELECTED_USERS_FOR_GRANT_ADMIN_ROLE);
    this.refUserAutosuggest.current.clearPrevSelections();
  }


  render() {
    let tabContent;
    let chosenUsersFeedback;
    if (!this.state.isDestinationExternal && this.state.recipients && this.state.recipients.length === 0) {
      chosenUsersFeedback = (
        <div className="small error-feedback">Nu ați indicat nici un utilizator</div>
      )
    }
    tabContent = (
      <Container>
        <Row className="mt-2 align-items-center">
          <Col xs={12} sm={4}></Col>
          <Col xs={12} sm={8} className="my-auto">
            <UserAutosuggest ref={this.refUserAutosuggest}
                             placeholder="Introduceți utilizatorul"
                             prevSelectedUsers={[]}
                             actionType={UPDATE_SELECTED_USERS_FOR_GRANT_ADMIN_ROLE}/>
          </Col>
        </Row>
        <Row className="mt-1 align-items-center">
          <Col xs={12} sm={4}></Col>
          <Col xs={12} sm={8} className="my-auto">
            {chosenUsersFeedback}
          </Col>
        </Row>
        <Row>
          <Col>
            <Button variant="primary"
                    onClick={(e) => this.confirmModalRef.current.handleShow(this.props.userReducer.selectedUsersForGrantAdminRole)}>
              Acordați rolul de administrator
            </Button>
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
        {tabContent}
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
