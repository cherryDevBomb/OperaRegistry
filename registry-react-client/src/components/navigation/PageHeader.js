import React, { Component } from "react";

import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import { DOCUMENTS_PATH } from "../../properties.js";
import { MY_DOCUMENTS_PATH } from "../../properties.js";
import { NEW_DOCUMENT_PATH } from "../../properties.js";
import { REGISTER_PATH } from "../../properties.js";
import { LOGIN_PATH } from "../../properties.js";
import { LOGOUT_PATH } from "../../properties.js";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logout } from "../../actions/securityActions";
import {RECEIVED_DOCUMENTS_PATH} from "../../properties";
import {getFullName} from "../../utils/userUtils";

class PageHeader extends Component {

  logout() {
    this.props.logout();
    window.location.href = LOGIN_PATH;
  }

  render() {
    const { validToken, user } = this.props.securityReducer;
    
    const userIsAuthenticated = (
      <React.Fragment>
        <Navbar.Toggle aria-controls="navbar-authenticated" />
        <Navbar.Collapse id="navbar-authenticated">
        <Nav className="mr-auto">
          <LinkContainer to={DOCUMENTS_PATH}>
            <Nav.Link>
              <i className="fas fa-table" />
              Toate documentele</Nav.Link>
          </LinkContainer>
          <LinkContainer to={MY_DOCUMENTS_PATH}>
            <Nav.Link>
              <i className="fas fa-paper-plane" />
              Documentele mele</Nav.Link>
          </LinkContainer>
          <LinkContainer to={RECEIVED_DOCUMENTS_PATH}>
            <Nav.Link>
              <i className="fas fa-inbox" />
              Documente primite</Nav.Link>
          </LinkContainer>
        </Nav>

        <Navbar.Collapse className="justify-content-end">
          <LinkContainer to={NEW_DOCUMENT_PATH}>
            <Nav.Link>
              <i className="fas fa-plus" />
              Document nou
            </Nav.Link>
          </LinkContainer>

          <NavDropdown
            alignRight
            className="dropdown-menu-right pull-right"
            title={
              <span>
                <i className="fas fa-user" />
                {getFullName(user)}
              </span>
            }
          >
            <NavDropdown.Item><i className="fas fa-id-card" /> Contul tău</NavDropdown.Item>
            <NavDropdown.Item><i className="fas fa-question" /> Ajutor</NavDropdown.Item>
            <NavDropdown.Divider />

            <LinkContainer to={LOGOUT_PATH} onClick={this.logout.bind(this)}>
              <NavDropdown.Item><i className="fas fa-sign-out-alt" /> Deconectați-vă</NavDropdown.Item>
            </LinkContainer>
          </NavDropdown>
        </Navbar.Collapse>
        </Navbar.Collapse>
      </React.Fragment>
    );

    const userIsNotAuthenticated = (
      <React.Fragment>
        <span className="span-title">Registratura Operei Naționale Române Cluj-Napoca</span>
        <Navbar.Collapse id="navbar-not-authenticated" className="justify-content-end">
          <LinkContainer to={REGISTER_PATH}>
            <Nav.Link>Cont nou</Nav.Link>
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
      <Navbar collapseOnSelect bg="dark" variant="dark" sticky="top" expand="sm">
        <Navbar.Brand>
          <Link to={LOGIN_PATH}>
            <div className="logo"></div>
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