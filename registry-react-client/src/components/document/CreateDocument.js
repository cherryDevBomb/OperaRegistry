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
      title: "",
      origin: "",

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
      email: this.state.email,
      title: this.state.title,
      docType: this.state.docType
    };
    console.log(newDocument);
    this.props.createDocument(newDocument, this.props.history);
  }

  

  render() {
    const { errorReducer } = this.state;

    return (
      <React.Fragment>
        <Form onSubmit={this.onSubmit}>
          <div key={"inline-radio"} className="mb-3">
            <Form.Check inline label="internă" type="radio" id={"inline-radio-1"} />
            <Form.Check inline label="externă" type="radio" id={"inline-radio-2"} />
          </div>

          <Form.Group controlId="formGroupDocTitle">
            <Form.Label>Titlu</Form.Label>
            <Form.Control
              name="title"
              type="text"
              placeholder="Introduceți titlul"
              value={this.state.title}
              onChange={this.onChange}
              isInvalid={errorReducer.title}
            />
            <Form.Control.Feedback type="invalid">
              {errorReducer.title}
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
              isInvalid={errorReducer.docType}
            />
            <Form.Control.Feedback type="invalid">
              {errorReducer.docType}
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
  errorReducer: PropTypes.object.isRequired,
  createDocument: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errorReducer: state.errorReducer
});

export default connect(mapStateToProps, { createDocument })(CreateDocument);
