import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { LOGIN_PATH } from "../properties";

const SecuredRoute = ({ component: Component, security, ...otherProps }) => (
  <Route
    {...otherProps}
    render={props =>
      security.validToken === true ? (
        <Component {...props} />
      ) : (
        <Redirect to={LOGIN_PATH} />
      )
    }
  />
);

SecuredRoute.propTypes = {
  security: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  security: state.security
});

export default connect(mapStateToProps)(SecuredRoute);
