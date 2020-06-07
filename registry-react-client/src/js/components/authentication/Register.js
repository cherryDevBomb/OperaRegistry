import React, {Component} from "react";
import Form from "react-bootstrap/Form";
import {createUser} from "../../redux/actions/securityActions";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {DOCUMENTS_PATH} from "../../constants/properties";
import {getAllDepartments} from "../../redux/actions/userActions";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

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

      isLoading: false,
      isRegistrationComplete: false
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
    this.setState({[e.target.name]: e.target.value});
  }

  async onSubmit(e) {
    e.preventDefault();
    this.setState({isLoading: true});

    const newUser = {
      email: this.state.email,
      lastName: this.state.lastName,
      firstName: this.state.firstName,
      department: this.state.department,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword
    };
    await this.props.createUser(newUser);
    this.setState({isLoading: false});
    if (!this.props.errorReducer) {
      this.setState({isRegistrationComplete: true});
    }
  }

  render() {
    const {errorReducer} = this.state;

    let registrationForm;
    if (!this.state.isRegistrationComplete) {
      registrationForm = (
        <Jumbotron className="mx-2 mx-sm-3 mx-md-5 my-4 px-1 px-sm-5 py-5 shadow">
          <h4 className="text-center mb-4">Creați cont nou</h4>
          <Container>
            <Form onSubmit={this.onSubmit}>
              <Row className="mt-2 justify-content-center mx-auto">
                <Col xs={12} sm={6} lg={4} className="my-auto">
                  <Form.Group controlId="formBasicFirstName">
                    <Form.Label><strong>Prenume</strong></Form.Label>
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
                </Col>
                <Col xs={12} sm={6} lg={4} className="my-auto">
                  <Form.Group controlId="formBasicLastName">
                    <Form.Label><strong>Nume</strong></Form.Label>
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
                </Col>
              </Row>

              <Row className="justify-content-center mx-auto">
                <Col xs={12} lg={8} className="my-auto">
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label><strong>Email</strong></Form.Label>
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
                </Col>
              </Row>

              <Row className="justify-content-center mx-auto">
                <Col xs={12} lg={8} className="my-auto">
                  <Form.Group controlId="department">
                    <Form.Label><strong>Departament</strong></Form.Label>
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
                </Col>
              </Row>

              <Row className="justify-content-center mx-auto">
                <Col xs={12} sm={6} lg={4} className="my-auto">
                  <Form.Group controlId="formBasicPassword">
                    <Form.Label><strong>Parola</strong></Form.Label>
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
                </Col>
                <Col xs={12} sm={6} lg={4} className="my-auto">
                  <Form.Group controlId="formBasicConfirmPassword">
                    <Form.Label><strong>Confirmă parola</strong></Form.Label>
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
                </Col>
              </Row>

              <Row className="mt-4 mb=3 justify-content-center mx-auto">
                <Col sm={8} lg={5} className="text-center"/>
                <Col xs={12} sm={4} lg={3} className="text-center">
                  <Button variant="primary" type="submit" block>
                    {this.state.isLoading &&
                    <Spinner className="mr-2"
                             as="span"
                             animation="border"
                             variant="light"
                             size="sm"
                             role="status"
                             aria-hidden="true"
                    />}
                    Confirmă
                  </Button>
                </Col>
              </Row>
            </Form>
          </Container>
        </Jumbotron>
      )
    } else {
      registrationForm = (
        <Jumbotron className="mx-2 mx-sm-3 mx-md-5 my-4 px-2 px-sm-5 py-5 shadow">
          <Row className="mt-5">
            <Col xs="auto" className="mx-auto position-relative">
              <i className="fas fa-user-check"></i>
            </Col>
          </Row>
          <Row className="mt-4 mb-5">
            <Col xs="auto" className="mx-auto position-relative text-center">
              <span className="empty-search">Cererea dvs. a fost înregistrată cu succes. După procesarea cererii, veți fi notificat prin email.</span>
            </Col>
          </Row>
        </Jumbotron>
      )
    }

    return (
      <React.Fragment>
        {registrationForm}
      </React.Fragment>
    )
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

export default connect(mapStateToProps, {getAllDepartments, createUser})(Register);
