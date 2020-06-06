import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getPendingUsers} from "../../../redux/actions/adminActions";
import {getNoPendingUsersBanner} from "../../../utils/emptyBanners";
import Jumbotron from "react-bootstrap/Jumbotron";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import {spinnerBanner} from "../../../utils/spinnerUtils";
import PendingUserCard from "../admin/PendingUserCard";
import {getUsersByRole, updateAllUsers} from "../../../redux/actions/userActions";
import {ROLE_USER} from "../../../constants/appConstants";
import GrantAdminRoleTab from "../admin/RoleManagementTab";

class AdminPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false
    }
  }

  componentDidMount() {
    this.props.getPendingUsers();
    this.props.getUsersByRole(ROLE_USER);
  }

  componentWillUnmount() {
    this.props.updateAllUsers([]);
    console.log(this.props.userReducer.allUsers);
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
            <PendingUserCard user={user} key={user.userId}/>
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
            <Tab eventKey="archived" title="Management roluri" className="tab-right">
              <GrantAdminRoleTab/>
            </Tab>
          </Tabs>
        </Jumbotron>
      </React.Fragment>
    );
  }
}

AdminPage.propTypes = {
  adminReducer: PropTypes.object.isRequired,
  userReducer: PropTypes.object.isRequired,
  getPendingUsers: PropTypes.func.isRequired,
  getUsersByRole: PropTypes.func.isRequired,
  updateAllUsers: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  adminReducer: state.adminReducer,
  userReducer: state.userReducer
});

export default connect(mapStateToProps, {getPendingUsers, getUsersByRole, updateAllUsers})(AdminPage);
