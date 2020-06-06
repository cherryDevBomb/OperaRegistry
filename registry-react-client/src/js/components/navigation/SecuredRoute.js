import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { LOGIN_PATH } from "../../constants/properties";

const SecuredRoute = ({ component: Component, securityReducer, ...otherProps }) => (
  <Route
    {...otherProps}
    render={props =>
      securityReducer.validToken === true ? (
        <Component {...props} />
      ) : (
        <Redirect to={LOGIN_PATH} />
      )
    }
  />
);

SecuredRoute.propTypes = {
  securityReducer: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  securityReducer: state.securityReducer
});

export default connect(mapStateToProps)(SecuredRoute);
