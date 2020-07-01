import React, {Component} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {login} from "../../redux/actions/securityActions";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {DOCUMENTS_PATH} from "../../constants/properties";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errorReducer: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.securityReducer.validToken) {
      this.props.history.push(DOCUMENTS_PATH);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.securityReducer.validToken) {
      this.props.history.push(DOCUMENTS_PATH);
    }
    if (nextProps.errorReducer) {
      this.setState({errorReducer: nextProps.errorReducer});
    }
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  onSubmit(e) {
    e.preventDefault();
    const loginRequest = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.login(loginRequest, this.props.history);
  }

  render() {
    const {errorReducer} = this.state;

    return (
      <Form onSubmit={this.onSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Control
            name="email"
            type="text"
            placeholder="Introduceți adresa de email"
            value={this.state.email}
            onChange={this.onChange}
            isInvalid={errorReducer.email}
          />
          <Form.Control.Feedback type="invalid">
            {errorReducer.email}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
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

        <Button variant="primary" type="submit" block className="mt-5">
          Continuă
        </Button>
      </Form>
    );
  }
}

Login.propTypes = {
  errorReducer: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
  securityReducer: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  securityReducer: state.securityReducer,
  errorReducer: state.errorReducer
});

export default connect(mapStateToProps, {login})(Login);
