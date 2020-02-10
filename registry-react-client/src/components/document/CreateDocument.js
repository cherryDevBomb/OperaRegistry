import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createDocument } from "../../actions/documentActions";

class CreateDocument extends Component {
  constructor() {
    super();

    this.state = {
      email: "testEmail",
      title: "",
      docType: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const newDocument = {
      email: this.state.email,
      title: this.state.title,
      docType: this.state.docType
    };
    console.log(newDocument);
    this.props.createDocument(newDocument, this.props.history);
  }

  render() {
    return (
      <React.Fragment>
        <Form onSubmit={this.onSubmit}>
          <Form.Group controlId="formGroupDocCreator">
            <Form.Label column sm="2">
              Emitent
            </Form.Label>
            <Col sm="10">
              <Form.Control
                name="email"
                plaintext
                readOnly
                defaultValue="testEmail"
              />
            </Col>
          </Form.Group>

          <Form.Group controlId="formGroupDocTitle">
            <Form.Label>Titlu</Form.Label>
            <Form.Control
              name="title"
              type="text"
              placeholder="Introduceți titlul"
              value={this.state.title}
              onChange={this.onChange}
            />
          </Form.Group>
          <Form.Group controlId="formGroupDocType">
            <Form.Label>Tipul documentului</Form.Label>
            <Form.Control
              name="docType"
              type="text"
              placeholder="Introduceți tipul documentului"
              value={this.state.docType}
              onChange={this.onChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </React.Fragment>
    );
  }
}

CreateDocument.propTypes = {
  createDocument: PropTypes.func.isRequired
};

export default connect(null, { createDocument })(CreateDocument);
