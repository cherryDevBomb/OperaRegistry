import React, { Component } from "react";
import Form from "react-bootstrap/Form";
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
      docType: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  //life cycle hooks
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
    const newDocument = {
      email: this.state.email,
      title: this.state.title,
      docType: this.state.docType
    };
    console.log(newDocument);
    this.props.createDocument(newDocument, this.props.history);
  }

  render() {
    const { errors } = this.state;

    return (
      <React.Fragment>
        <Form onSubmit={this.onSubmit}>
          <Form.Group controlId="formGroupDocTitle">
            <Form.Label>Titlu</Form.Label>
            <Form.Control
              name="title"
              type="text"
              placeholder="Introduceți titlul"
              value={this.state.title}
              onChange={this.onChange}
              isInvalid={errors.title}
            />
            <Form.Control.Feedback type="invalid">
              {errors.title}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formGroupDocType">
            <Form.Label>Tipul documentului</Form.Label>
            <Form.Control
              name="docType"
              type="text"
              placeholder="Introduceți tipul documentului"
              value={this.state.docType}
              onChange={this.onChange}
              isInvalid={errors.docType}
            />
            <Form.Control.Feedback type="invalid">
              {errors.docType}
            </Form.Control.Feedback>
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
  errors: PropTypes.object.isRequired,
  createDocument: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(mapStateToProps, { createDocument })(CreateDocument);
