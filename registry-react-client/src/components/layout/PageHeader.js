import React, { Component } from "react";

import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
// import Form from "react-bootstrap/Form";
// import FormControl from "react-bootstrap/FormControl";
// import Button from "react-bootstrap/Button";

export default class PageHeader extends Component {
  render() {
    return (
      <Navbar bg="dark" variant="dark" sticky="top">
        <Navbar.Brand>
          <Link to="/">
            <i className="fas fa-home" />
          </Link>
        </Navbar.Brand>
        <Nav className="mr-auto">
          <LinkContainer to="/documents">
            <Nav.Link>Documente</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/documents-in-work">
            <Nav.Link>Documente in lucru</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/my-documents">
            <Nav.Link href="#pricing">Documentele mele</Nav.Link>
          </LinkContainer>
        </Nav>
        <Navbar.Collapse className="justify-content-end">
          <NavDropdown
            className="white-red-hover dropdown-menu-right"
            title={
              <span>
                <i className="fas fa-plus white-red-hover"></i>
              </span>
            }
            id="nav-dropdown-plus"
          >
            <LinkContainer to="/new-document">
              <NavDropdown.Item>Document nou</NavDropdown.Item>
            </LinkContainer>
          </NavDropdown>
          <NavDropdown
            className="white-red-hover dropdown-menu-right"
            title={
              <span>
                <i className="fas fa-user white-red-hover"></i>
              </span>
            }
            id="nav-dropdown-user"
          >
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">
              Another action
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">
              Separated link
            </NavDropdown.Item>
          </NavDropdown>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
