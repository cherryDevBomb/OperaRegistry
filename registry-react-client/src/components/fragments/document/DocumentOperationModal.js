import React, {Component} from "react";
import Modal from "react-bootstrap/Modal";
import ModalTitle from "react-bootstrap/ModalTitle";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import {connect} from "react-redux";

class DocumentOperationModal extends Component {

  constructor(props) {
    super(props);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      show: false,
      registryNumber: null,
      message: ""
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
    this.setState({message: e.target.value})
  }

  onSubmit(e) {
    e.preventDefault();
    this.handleClose();
    this.props.documentOperationCallback(this.state.message);
  }

  onSkipClick = () => {
    this.handleClose();
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
              Sunteți sigur că doriți să {this.props.actionName} documentul Nr. {this.state.registryNumber}?
            </ModalTitle>
          </Modal.Header>

          <Modal.Body>
            <p className="mb-3"><strong>Comentariu (opțional)</strong></p>
            <Form onSubmit={this.onSubmit}>
              <Form.Group controlId="formGroupMessage">
                <Form.Control
                  as="textarea"
                  rows="3"
                  name="message"
                  type="text"
                  placeholder="Introduceti comentariul"
                  className="mb-3"
                  onChange={this.onChange}
                />
              </Form.Group>

              <hr/>
              <Row className="mt-3 mb-2 mr-1 justify-content-end">
                <Col xs="auto" className="my-auto">
                  <Button
                    variant="light"
                    onClick={this.onSkipClick}>
                    Anulează
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
        </Modal>
      </React.Fragment>
    );
  }
}

export default connect(null, null, null, {forwardRef: true})(DocumentOperationModal);