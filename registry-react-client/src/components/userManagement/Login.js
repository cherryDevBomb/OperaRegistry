import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { login } from "../../actions/securityActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { DOCUMENTS_PATH } from "../../properties";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.security.validToken) {
      this.props.history.push(DOCUMENTS_PATH);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.security.validToken) {
      this.props.history.push(DOCUMENTS_PATH);
    }
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const loginRequest = {
      email: this.state.email,
      password: this.state.password
    };
    console.log(loginRequest);
    this.props.login(loginRequest, this.props.history);
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

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    );
  }
}

Login.propTypes = {
  errors: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
  security: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  security: state.security,
  errors: state.errors
});

export default connect(mapStateToProps, { login })(Login);
