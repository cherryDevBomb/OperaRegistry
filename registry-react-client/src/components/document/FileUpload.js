import React, {Component} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {uploadFile} from "../../actions/fileActions";

class FileUpload extends Component {
  constructor(props) {
    super(props);

    this.state = {
      file: null,
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errorReducer) {
      this.setState({errorReducer: nextProps.errorReducer});
    }
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.uploadFile(this.state.file, this.props.registryNumber, this.props.history);
  }

  onChange(e) {
    this.setState({file: e.target.files[0]})
  }

  render() {
    return (
      <React.Fragment>
        <Form onSubmit={this.onSubmit}>
          <Form.Group controlId="formGroupFileUpload">
            <Form.Control
              name="file"
              type="file"
              placeholder="Atașați fișierul"
              onChange={this.onChange}
              //isInvalid={errorReducer.recipients}
            />
            {/*<Form.Control.Feedback type="invalid">*/}
            {/*  {errorReducer.recipients}*/}
            {/*</Form.Control.Feedback>*/}
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </React.Fragment>
    )
  }
}

FileUpload.propTypes = {
  fileReducer: PropTypes.object.isRequired,
  errorReducer: PropTypes.object.isRequired,
  uploadFile: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  errorReducer: state.errorReducer,
  fileReducer: state.fileReducer
});

export default connect(mapStateToProps, {uploadFile})(FileUpload);