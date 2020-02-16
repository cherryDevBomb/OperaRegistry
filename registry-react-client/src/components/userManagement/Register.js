import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default class Register extends Component {
  render() {
    return (
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group controlId="formBasicLastName">
          <Form.Label>Nume</Form.Label>
          <Form.Control type="text" placeholder="Introduceți numele" />
        </Form.Group>

        <Form.Group controlId="formBasicFirstName">
          <Form.Label>Prenume</Form.Label>
          <Form.Control type="text" placeholder="Introduceți prenumele" />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Parola</Form.Label>
          <Form.Control type="password" placeholder="Introduceți parola" />
        </Form.Group>

        <Form.Group controlId="formBasicConfirmPassword">
          <Form.Label>Confirmă parola</Form.Label>
          <Form.Control type="password" placeholder="Introduceți parola" />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    );
  }
}
