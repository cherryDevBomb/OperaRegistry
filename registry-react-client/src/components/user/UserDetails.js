import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class UserDetails extends Component {
  render() {
    const user = this.props.securityReducer.user;
    console.log("Props in userDetails: " + this.props);

    return (
      <div>
        <h6>{user.email}</h6>
      </div>
    );
  }
}

UserDetails.propTypes = {
  securityReducer: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  securityReducer: state.securityReducer
});

export default connect(mapStateToProps)(UserDetails);
