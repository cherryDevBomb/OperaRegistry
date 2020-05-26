import React, {Component} from "react";
import Modal from "react-bootstrap/Modal";
import ModalTitle from "react-bootstrap/ModalTitle";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import {connect} from "react-redux";

class AdminActionConfirmModal extends Component {

  constructor(props) {
    super(props);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.onConfirm = this.onConfirm.bind(this);

    this.state = {
      show: false,
      user: null,
    }
  }

  handleShow(user) {
    this.setState({
      user: user,
      show: true
    });
  }

  handleClose() {
    this.setState({show: false})
  }

  onConfirm(e) {
    e.preventDefault();
    this.handleClose();
    this.props.adminConfirmCallback(this.props.user);
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
            <ModalTitle>Confirmare</ModalTitle>
          </Modal.Header>

          <Modal.Body>
            <Row className="my-2">
              <Col>
                <p>Sunteți sigur că doriți
                  să {this.props.actionName} utilizatorului <strong>{this.props.user.fullName}</strong>?</p>
              </Col>
            </Row>
            <Row className="mt-3 mb-2 mr-1 justify-content-end">
              <Col xs="auto" className="my-auto">
                <Button
                  variant="light"
                  onClick={this.onSkipClick}>
                  Anulează
                </Button>
              </Col>
              <Col xs="auto" className="my-auto">
                <Button variant="primary" type="submit" onClick={this.onConfirm}>
                  Confirmă
                </Button>
              </Col>
            </Row>
          </Modal.Body>
        </Modal>
      </React.Fragment>
    );
  }
}

export default connect(null, null, null, {forwardRef: true})(AdminActionConfirmModal);