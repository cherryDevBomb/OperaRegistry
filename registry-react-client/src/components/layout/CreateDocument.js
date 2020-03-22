import React, {Component} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {createDocument} from "../../actions/documentActions";
import UserAutosuggest from "../fragments/user/UserAutosuggest";
import {getFullName, getInitials} from "../../utils/userUtils";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class CreateDocument extends Component {
  constructor() {
    super();

    this.state = {
      title: "",
      origin: "",
      isOriginExternal: false,
      isDestinationExternal: false,
      recipients: [],
      sentMessage: "",

      errorReducer: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errorReducer) {
      this.setState({errorReducer: nextProps.errorReducer});
    }
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  onOriginTypeChange(e) {
    if (e === "external") {
      this.setState({isOriginExternal: true});
    } else {
      this.setState({isOriginExternal: false});
    }
  }

  onDestinationTypeChange(e) {
    if (e === "external") {
      this.setState({isDestinationExternal: true});
    } else {
      this.setState({isDestinationExternal: false});
    }
  }

  onExtDestinationChange(e) {
    if (e !== "") {
      console.log(e);
      this.setState({
        recipients: [e.target.value]
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    let recipientEmails = [];
    if (!this.state.isDestinationExternal) {
      this.setState({
        recipients: this.props.userReducer.selectedUsers.forEach(rec => recipientEmails.push(rec.email.toString()))
      });
    } else {
      recipientEmails = this.state.recipients;
    }

    const newDocument = {
      title: this.state.title,
      origin: this.state.origin,
      isOriginExternal: this.state.isOriginExternal,
      isDestinationExternal: this.state.isDestinationExternal,
      recipients: recipientEmails,
      sentMessage: this.state.sentMessage
    };
    console.log(newDocument);
    this.props.createDocument(newDocument, this.props.history);
  }

  render() {
    const {errorReducer} = this.state;

    //origin
    const formGroupOriginType = (
      <React.Fragment>
        <Container>
          <Row className="mt-5">
            <Col className="col-sm-4 my-auto">
              <strong className="float-right">Originea documentului</strong>
            </Col>

            <Col className="col-sm-8 my-auto">
              <ToggleButtonGroup
                type="radio"
                name="originType"
                size="sm"
                defaultValue="internal"
                onChange={this.onOriginTypeChange.bind(this)}
              >
                <ToggleButton variant="toggle" value="internal">
                  Document intern
                </ToggleButton>
                <ToggleButton variant="toggle" value="external"
                              disabled={this.state.isDestinationExternal ? true : false}>
                  Document extern
                </ToggleButton>
              </ToggleButtonGroup>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );

    const user = this.props.securityReducer.user;
    const defaultCreator = (
      <Container>
        <Row className="mt-3">
          <Col className="col-sm-4 my-auto">
            <strong className="float-right">Autor</strong>
          </Col>

          <Col className="col-sm-8 my-auto">
            {getFullName(user)}
          </Col>
        </Row>
      </Container>
    );

    const formGroupExtOrigin = (
      <Container>
        <Row className="mt-2 align-items-center">
          <Col className="col-sm-4 my-auto">
            <strong className="float-right">Autor</strong>
          </Col>

          <Col className="col-sm-8 my-auto">
            <Form.Group controlId="formGroupExtOrigin" className="mb-0">
              <Form.Control
                name="origin"
                type="text"
                placeholder="Introduceți de unde provine documentul"
                value={this.state.origin}
                onChange={this.onChange}
                isInvalid={errorReducer.origin}
              />
              <Form.Control.Feedback type="invalid">
                {errorReducer.origin}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
      </Container>
    );

    let originPart;
    if (this.state.isOriginExternal) {
      originPart = formGroupExtOrigin;
    } else {
      originPart = defaultCreator;
    }

    //title
    const formGroupTitle = (
      <Container>
        <Row className="mt-3 align-items-center">
          <Col className="col-sm-4 my-auto">
            <strong className="float-right">Titlu</strong>
          </Col>

          <Col className="col-sm-8 my-auto">
            <Form.Group controlId="formGroupTitle" className="mb-0">
              <Form.Control
                id="title"
                name="title"
                type="text"
                placeholder="Introduceți conținutul pe scurt al documentului"
                value={this.state.title}
                onChange={this.onChange}
                isInvalid={errorReducer.title}
              />
              <Form.Control.Feedback type="invalid">
                {errorReducer.title}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
      </Container>
    );

    //destination
    const formGroupDestinationType = (
      <Container>
        <Row className="mt-3 align-items-center">
          <Col className="col-sm-4 my-auto">
            <strong className="float-right">Destinație</strong>
          </Col>

          <Col className="col-sm-8 my-auto">
            <ToggleButtonGroup
              type="radio"
              name="destinationType"
              size="sm"
              defaultValue="internal"
              onChange={this.onDestinationTypeChange.bind(this)}
            >
              <ToggleButton variant="toggle" value="internal">
                Destinație internă
              </ToggleButton>
              <ToggleButton variant="toggle" value="external" disabled={this.state.isOriginExternal ? true : false}>
                Destinație externă
              </ToggleButton>
            </ToggleButtonGroup>
          </Col>
        </Row>
      </Container>
    );

    const formGroupIntDestination = (
      <Container>
        <Row className="mt-2 align-items-center">
          <Col className="col-sm-4"></Col>
          <Col className="col-sm-8 my-auto">
            <UserAutosuggest placeholder="Introduceți destinatarul"/>
          </Col>
        </Row>
      </Container>
    );

    const formGroupExtDestination = (
      <Container>
        <Row className="mt-2 align-items-center">
          <Col className="col-sm-4"></Col>
          <Col className="col-sm-8 my-auto">
            <Form.Group controlId="formGroupExtDestination" className="mb-0">
              <Form.Control
                name="recipients"
                type="text"
                placeholder="Introduceți destinatarul"
                value={this.state.recipients}
                onChange={this.onExtDestinationChange.bind(this)}
                isInvalid={errorReducer.recipients}
              />
              <Form.Control.Feedback type="invalid">
                {errorReducer.recipients}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
      </Container>
    );

    const formGroupSentMessage = (
      <Container>
        <Row className="mt-3 mb-5 align-items-center">
          <Col className="col-sm-4 my-auto">
            <strong className="float-right">Mesaj</strong>
          </Col>

          <Col className="col-sm-8 my-auto">
            <Form.Group controlId="formGroupSentMessage" className="mb-0">
              <Form.Control
                name="sentMessage"
                type="text"
                placeholder="Introduceți un mesaj pentru destinatar (opțional)"
                value={this.state.sentMessage}
                onChange={this.onChange}
              />
            </Form.Group>
          </Col>
        </Row>
      </Container>
    );

    let destinationPart;
    if (this.state.isDestinationExternal) {
      destinationPart = formGroupExtDestination;
    } else {
      destinationPart = formGroupIntDestination;
    }

    return (
      <Jumbotron className="mx-5 my-4 shadow p-5">
        <h4 className="text-center">Document nou</h4>
        <Form onSubmit={this.onSubmit}>
          <hr/>
          {formGroupOriginType}
          {originPart}
          {formGroupTitle}
          {formGroupDestinationType}
          {destinationPart}
          {formGroupSentMessage}
          <Row className="mt-3 mb=3"><Col>
          <Button variant="primary" type="submit" className="float-right">
            Submit
          </Button>
          </Col></Row>
        </Form>
      </Jumbotron>
    );
  }
}

CreateDocument.propTypes = {
  errorReducer: PropTypes.object.isRequired,
  securityReducer: PropTypes.object.isRequired,
  userReducer: PropTypes.object.isRequired,
  createDocument: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errorReducer: state.errorReducer,
  securityReducer: state.securityReducer,
  userReducer: state.userReducer
});

export default connect(mapStateToProps, {createDocument})(CreateDocument);