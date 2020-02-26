import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createDocument } from "../../actions/documentActions";
import UserDetails from "../user/UserDetails";

class CreateDocument extends Component {
  constructor() {
    super();

    this.state = {
      title: "",
      origin: "",
      isOriginExternal: false,
      isDestinationExternal: false,
      recipientNames: [],
      sentMessage: "",

      errorReducer: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  //life cycle hooks
  componentWillReceiveProps(nextProps) {
    if (nextProps.errorReducer) {
      this.setState({ errorReducer: nextProps.errorReducer });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const newDocument = {
      title: this.state.title,
      origin: this.state.origin,
      isOriginExternal: this.state.isOriginExternal,
      isDestinationExternal: this.state.isDestinationExternal,
      recipientNames: this.state.recipientNames,
      sentMessage: this.state.sentMessage
    };
    console.log(newDocument);
    this.props.createDocument(newDocument, this.props.history);
  }

  onOriginTypeChange(e) {
    if (e === "external") {
      this.setState({ isOriginExternal: true });
    } else {
      this.setState({ isOriginExternal: false });
    }
  }

  onClickChangeOrigin(e) {}

  render() {
    const { errorReducer } = this.state;

    const formGroupOriginType = (
      <ToggleButtonGroup
        type="radio"
        name="originType"
        defaultValue="internal"
        onChange={this.onOriginTypeChange.bind(this)}
      >
        <ToggleButton variant="outline-dark" value="internal">
          Document intern
        </ToggleButton>
        <ToggleButton variant="outline-dark" value="external">
          Document extern
        </ToggleButton>
      </ToggleButtonGroup>
    );

    const defaultCreator = (
      <React.Fragment>
        Originea documentului
        <UserDetails />
      </React.Fragment>
    );

    const formGroupExtOrigin = (
      <Form.Group controlId="formGroupExtOrigin">
        <Form.Label>Originea</Form.Label>
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

    const originPart = this.state.isOriginExternal
      ? { formGroupExtOrigin }
      : { defaultCreator };

    return (
      <React.Fragment>
        <Form onSubmit={this.onSubmit}>
          {formGroupOriginType}
          {originPart}
          {formGroupTitle}

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
  createDocument: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errorReducer: state.errorReducer
});

export default connect(mapStateToProps, { createDocument })(CreateDocument);
