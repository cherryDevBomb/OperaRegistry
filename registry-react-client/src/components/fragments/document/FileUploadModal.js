import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import Button from "react-bootstrap/Button";
import {MY_DOCUMENTS_PATH} from "../../../properties";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import {uploadFile} from "../../../actions/fileActions";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ModalTitle from "react-bootstrap/ModalTitle";

class FileUploadModal extends Component {

  constructor(props) {
    super(props);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      show: false,
      registryNumber: null,
      file: null
    }
  }

  handleShow(registryNumber) {
    this.setState({
      registryNumber: registryNumber,
      show: true
    });
  }

  handleClose() {
    this.setState({show: false})
  }

  onChange(e) {
    this.setState({file: e.target.files[0]})
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.uploadFile(this.state.file, this.state.registryNumber, this.props.history);
    console.log("submit")
  }

  onSkipClick = () => {
    this.props.history.push(MY_DOCUMENTS_PATH);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errorReducer) {
      this.setState({errorReducer: nextProps.errorReducer});
    }
  }

  render() {
    return (
      <React.Fragment>
        <Modal
          centered
          show={this.state.show}
          onHide={this.handleClose}
        >
          <Modal.Header closeButton>
            <ModalTitle>
              Încărcați un fișier
            </ModalTitle>
          </Modal.Header>

          <Modal.Body>
            <p className="mb-3">Atașați un fișier pentru documentul {this.state.registryNumber}</p>
            <Form onSubmit={this.onSubmit}>
              <Form.Group controlId="formGroupFileUpload">
                <Form.Control
                  name="file"
                  type="file"
                  placeholder="Alegeți fișierul"
                  className="mb-3"
                  onChange={this.onChange}
                  //isInvalid={errorReducer.recipients}
                />
                {/*<Form.Control.Feedback type="invalid">*/}
                {/*  {errorReducer.recipients}*/}
                {/*</Form.Control.Feedback>*/}
              </Form.Group>

              <hr/>
              <Row className="mt-3 mb-2 mr-1 justify-content-end">
                <Col xs="auto" className="my-auto">
                  <Button
                    variant="light"
                    onClick={this.onSkipClick}>
                       Skip
                  </Button>
                </Col>
                <Col xs="auto" className="my-auto">
                  <Button variant="primary" type="submit" onSubmit={this.onSubmit}>
                    Confirmă
                  </Button>
                </Col>
              </Row>
            </Form>
          </Modal.Body>

          {/*<Modal.Footer>*/}
          {/*  <Row className="mt-3 mb-2 mr-2 justify-content-end">*/}
          {/*    <Col xs="auto" className="my-auto">*/}
          {/*      <Button*/}
          {/*        variant="light"*/}
          {/*        onClick={this.onSkipClick}>*/}
          {/*        Skip*/}
          {/*      </Button>*/}
          {/*    </Col>*/}
          {/*    <Col xs="auto" className="my-auto">*/}
          {/*      <Button variant="primary" type="submit" onSubmit={this.onSubmit}>*/}
          {/*        Confirmă*/}
          {/*      </Button>*/}
          {/*    </Col>*/}
          {/*  </Row>*/}
          {/*</Modal.Footer>*/}
        </Modal>
      </React.Fragment>
    );
  }
}

FileUploadModal.propTypes = {
  errorReducer: PropTypes.object.isRequired,
  uploadFile: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  errorReducer: state.errorReducer,
  // fileReducer: state.fileReducer
});

export default connect(mapStateToProps, {uploadFile}, null, {forwardRef: true})(FileUploadModal);