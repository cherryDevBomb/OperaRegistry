import React, { Component } from "react";

import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import { DOCUMENTS_PATH } from "../../../properties.js";
import { MY_DOCUMENTS_PATH } from "../../../properties.js";
import { NEW_DOCUMENT_PATH } from "../../../properties.js";
import { REGISTER_PATH } from "../../../properties.js";
import { LOGIN_PATH } from "../../../properties.js";
import { LOGOUT_PATH } from "../../../properties.js";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logout } from "../../../actions/securityActions";
import {RECEIVED_DOCUMENTS_PATH} from "../../../properties";

class PageHeader extends Component {
  logout() {
    this.props.logout();
    window.location.href = "/";
  }

  render() {
    const { validToken, user } = this.props.securityReducer;
    
    const userIsAuthenticated = (
      <React.Fragment>
        <Nav className="mr-auto">
          <LinkContainer to={DOCUMENTS_PATH}>
            <Nav.Link>Documente</Nav.Link>
          </LinkContainer>
          <LinkContainer to={MY_DOCUMENTS_PATH}>
            <Nav.Link>Documentele mele</Nav.Link>
          </LinkContainer>
          <LinkContainer to={RECEIVED_DOCUMENTS_PATH}>
            <Nav.Link>Documente primite</Nav.Link>
          </LinkContainer>
        </Nav>

        <Navbar.Collapse className="justify-content-end">
          <LinkContainer to={NEW_DOCUMENT_PATH}>
            <Nav.Link>
              <i className="fas fa-plus" />
              {"  "}Document nou
            </Nav.Link>
          </LinkContainer>

          <NavDropdown
            className="dropdown-menu-left"
            title={
              <span>
                <i className="fas fa-user" />
                {"  " + user.firstName + " " + user.lastName}
              </span>
            }
          >
            <NavDropdown.Item>Your profile</NavDropdown.Item>
            <NavDropdown.Divider />

            <LinkContainer to={LOGOUT_PATH} onClick={this.logout.bind(this)}>
              <NavDropdown.Item>Sign out</NavDropdown.Item>
            </LinkContainer>
          </NavDropdown>
        </Navbar.Collapse>
      </React.Fragment>
    );

    const userIsNotAuthenticated = (
      <React.Fragment>
        <Nav className="mr-auto">
          <LinkContainer to={LOGIN_PATH}>
            <Nav.Link>Documente</Nav.Link>
          </LinkContainer>
        </Nav>

        <Navbar.Collapse className="justify-content-end">
          <LinkContainer to={REGISTER_PATH}>
            <Nav.Link>Sign up</Nav.Link>
          </LinkContainer>

          <LinkContainer to={LOGIN_PATH}>
            <Nav.Link>Sign in</Nav.Link>
          </LinkContainer>
        </Navbar.Collapse>
      </React.Fragment>
    );

    let headerLinks;

    if (validToken && user) {
      headerLinks = userIsAuthenticated;
    } else {
      headerLinks = userIsNotAuthenticated;
    }

    return (
      <Navbar bg="dark" variant="dark" sticky="top">
        <Navbar.Brand>
          <Link to="/">
            <i className="fas fa-home" />
          </Link>
        </Navbar.Brand>
        {headerLinks}
      </Navbar>
    );
  }
}

PageHeader.propTypes = {
  logout: PropTypes.func.isRequired,
  securityReducer: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  securityReducer: state.securityReducer
});

export default connect(mapStateToProps, { logout })(PageHeader);
