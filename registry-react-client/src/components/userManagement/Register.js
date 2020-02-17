import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { createUser } from "../../actions/securityActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const newUser = {
      email: this.state.email,
      lastName: this.state.lastName,
      firstName: this.state.firstName,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword
    };
    console.log(newUser);
    this.props.createUser(newUser, this.props.history);
  }

  render() {
    const { errors } = this.state;

    return (
      <Form onSubmit={this.onSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            name="email"
            type="text"
            placeholder="Enter email"
            value={this.state.email}
            onChange={this.onChange}
            isInvalid={errors.email}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formBasicLastName">
          <Form.Label>Nume</Form.Label>
          <Form.Control
            name="lastName"
            type="text"
            placeholder="Introduceți numele"
            value={this.state.lastName}
            onChange={this.onChange}
            isInvalid={errors.lastName}
          />
          <Form.Control.Feedback type="invalid">
            {errors.lastName}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formBasicFirstName">
          <Form.Label>Prenume</Form.Label>
          <Form.Control
            name="firstName"
            type="text"
            placeholder="Introduceți prenumele"
            value={this.state.firstName}
            onChange={this.onChange}
            isInvalid={errors.firstName}
          />
          <Form.Control.Feedback type="invalid">
            {errors.firstName}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Parola</Form.Label>
          <Form.Control
            name="password"
            type="password"
            placeholder="Introduceți parola"
            value={this.state.password}
            onChange={this.onChange}
            isInvalid={errors.password}
          />
          <Form.Control.Feedback type="invalid">
            {errors.password}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formBasicConfirmPassword">
          <Form.Label>Confirmă parola</Form.Label>
          <Form.Control
            name="confirmPassword"
            type="password"
            placeholder="Introduceți parola"
            value={this.state.confirmPassword}
            onChange={this.onChange}
            isInvalid={errors.confirmPassword}
          />
          <Form.Control.Feedback type="invalid">
            {errors.confirmPassword}
          </Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    );
  }
}

Register.propTypes = {
  errors: PropTypes.object.isRequired,
  createUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(mapStateToProps, { createUser })(Register);
