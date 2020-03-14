import React, {Component} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {createDocument} from "../../actions/documentActions";
import UserAutosuggest from "../user/UserAutosuggest";
import {getFullName} from "../../utils/userUtils";

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

    //origin part
    const formGroupOriginType = (
      <React.Fragment>
        <p>Originea documentului </p>
        <ToggleButtonGroup
          type="radio"
          name="originType"
          defaultValue="internal"
          onChange={this.onOriginTypeChange.bind(this)}
        >
          <ToggleButton variant="outline-dark" value="internal">
            Document intern
          </ToggleButton>
          <ToggleButton variant="outline-dark" value="external"
                        disabled={this.state.isDestinationExternal ? true : false}>
            Document extern
          </ToggleButton>
        </ToggleButtonGroup>
      </React.Fragment>
    );

    const user = this.props.securityReducer.user;
    const defaultCreator = (
      <Form.Control plaintext readOnly defaultValue={getFullName(user)}/>
    );

    const formGroupExtOrigin = (
      <Form.Group controlId="formGroupExtOrigin">
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
    );

    let originPart;
    if (this.state.isOriginExternal) {
      originPart = formGroupExtOrigin;
    } else {
      originPart = defaultCreator;
    }

    //title
    const formGroupTitle = (
      <Form.Group controlId="formGroupTitle">
        <Form.Label>Titlu</Form.Label>
        <Form.Control
          name="title"
          type="text"
          placeholder="Introduceți titlul (conținutul pe scurt al documentului)"
          value={this.state.title}
          onChange={this.onChange}
          isInvalid={errorReducer.title}
        />
        <Form.Control.Feedback type="invalid">
          {errorReducer.title}
        </Form.Control.Feedback>
      </Form.Group>
    );

    //destination part
    const formGroupDestinationType = (
      <ToggleButtonGroup
        type="radio"
        name="destinationType"
        size="sm"
        defaultValue="internal"
        onChange={this.onDestinationTypeChange.bind(this)}
      >
        <ToggleButton variant="outline-dark" value="internal">
          Destinație internă
        </ToggleButton>
        <ToggleButton variant="outline-dark" value="external" disabled={this.state.isOriginExternal ? true : false}>
          Destinație externă
        </ToggleButton>
      </ToggleButtonGroup>
    );

    //internal destination (user autosuggest)
    const formGroupIntDestination = (
      <UserAutosuggest/>
    );

    //external destination (plain string)
    const formGroupExtDestination = (
      <Form.Group controlId="formGroupExtDestination">
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
    );

    const formGroupSentMessage = (
      <Form.Group controlId="formGroupSentMessage">
        <Form.Label>Mesaj</Form.Label>
        <Form.Control
          name="sentMessage"
          type="text"
          placeholder="Introduceți un mesaj pentru destinatar (opțional)"
          value={this.state.sentMessage}
          onChange={this.onChange}
        />
      </Form.Group>
    );

    let destinationPart;
    if (this.state.isDestinationExternal) {
      destinationPart = formGroupExtDestination;
    } else {
      destinationPart = formGroupIntDestination;
    }

    return (
      <React.Fragment>
        <Form onSubmit={this.onSubmit}>
          {formGroupOriginType}
          {originPart}
          {formGroupTitle}
          {formGroupDestinationType}
          {destinationPart}
          {formGroupSentMessage}
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </React.Fragment>
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