import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { createUser } from "../../actions/securityActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { DOCUMENTS_PATH } from "../../properties";
import {getAllDepartments} from "../../actions/userActions";

class Register extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      department: "",
      password: "",
      confirmPassword: "",
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.securityReducer.validToken) {
      this.props.history.push(DOCUMENTS_PATH);
    }
    this.props.getAllDepartments();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.errorReducer) {
      return {errorReducer: nextProps.errorReducer};
    } else {
      return null;
    }
  }

  componentDidUpdate(prevProps, prevState, ss) {
    if (prevProps.errorReducer && prevProps.errorReducer !== this.props.errorReducer) {
      this.setState({errorReducer: prevProps.errorReducer});
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
      department: this.state.department,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword
    };
    console.log(newUser);
    this.props.createUser(newUser, this.props.history);
  }

  render() {
    const { errorReducer } = this.state;

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
            isInvalid={errorReducer.email}
          />
          <Form.Control.Feedback type="invalid">
            {errorReducer.email}
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
            isInvalid={errorReducer.lastName}
          />
          <Form.Control.Feedback type="invalid">
            {errorReducer.lastName}
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
            isInvalid={errorReducer.firstName}
          />
          <Form.Control.Feedback type="invalid">
            {errorReducer.firstName}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="department">
          <Form.Label>Departament</Form.Label>
        <Form.Control as="select"
                      name="department"
                      value={this.state.department}
                      onChange={this.onChange}
                      isInvalid={errorReducer.department}>
          <option key="noOption" value={null}>-</option>
          {this.props.userReducer.departments.map(department => (
            <option key={department} value={department}>{department}</option>
          ))}
        </Form.Control>
          <Form.Control.Feedback type="invalid">
            {errorReducer.department}
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
            isInvalid={errorReducer.password}
          />
          <Form.Control.Feedback type="invalid">
            {errorReducer.password}
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
            isInvalid={errorReducer.confirmPassword}
          />
          <Form.Control.Feedback type="invalid">
            {errorReducer.confirmPassword}
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
  errorReducer: PropTypes.object.isRequired,
  securityReducer: PropTypes.object.isRequired,
  userReducer: PropTypes.object.isRequired,
  getAllDepartments: PropTypes.func.isRequired,
  createUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  securityReducer: state.securityReducer,
  errorReducer: state.errorReducer,
  userReducer: state.userReducer
});

export default connect(mapStateToProps, { getAllDepartments, createUser })(Register);
