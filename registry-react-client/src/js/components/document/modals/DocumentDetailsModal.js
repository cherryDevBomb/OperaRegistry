import React, {Component} from "react";
import {connect} from "react-redux";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ModalTitle from "react-bootstrap/ModalTitle";
import {Badge} from "react-bootstrap";
import {getUserPopup} from "../../../utils/userUtils";

class DocumentDetailsModal extends Component {

  constructor(props) {
    super(props);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false,
      document: null
    }
  }

  handleShow(document) {
    this.setState({
      document: document,
      show: true
    });
  }

  handleClose() {
    this.setState({show: false})
  }

  render() {
    const {document} = this.props;

    const archivingStatus = document.archived ?
      (
        <Row className="mt-2" noGutters>
          <Col xs="auto">
            <Badge variant="archived" pill={true}>
              <i className="fas fa-check-circle"/>
              arhivat
            </Badge>
          </Col>
          <Col xs="auto" className="ml-2">la data de {document.archivingDate}</Col>
        </Row>
      ) :
      (
        <Row className="mt-2">
          <Col xs="auto">
            <Badge variant="notarchived" pill={true}>
              <i className="fas fa-times-circle"/>
              nearhivat
            </Badge>
          </Col>
        </Row>
      )

    return (
      <React.Fragment>
        <Modal
          centered
          show={this.state.show}
          onHide={this.handleClose}
        >
          <Modal.Header closeButton>
            <ModalTitle>
              Document Nr. {this.props.document.registryNumber}
              <div className="archiving-state-modal-title">{archivingStatus}</div>
            </ModalTitle>
          </Modal.Header>

          <Modal.Body>
            <Row>
              <Col xs={3} className="text-center">
                <strong>Expediat de către</strong>
              </Col>
              <Col xs={3} className="text-center">
                <strong>Destinatar</strong>
              </Col>
              <Col xs={3} className="text-center">
                <strong>Data expedierii</strong>
              </Col>
              <Col xs={3} className="text-center">
                <strong>Data rezolvării</strong>
              </Col>
            </Row>
            <hr/>
            {document.documentHistory.map(dh => (
              <React.Fragment key={dh.documentHistoryId}>
                <Row className="mt-2">
                  <Col xs={3}>
                    {getUserPopup(dh.sender)}
                  </Col>
                  <Col xs={3}>
                    {dh.internalRecipient ? getUserPopup(dh.internalRecipient) : dh.externalRecipient}
                  </Col>
                  <Col xs={3} className="text-center">
                    {dh.sentDate}
                  </Col>
                  <Col xs={3} className="text-center">
                    {dh.resolved ? dh.resolvedDate : "-"}
                  </Col>
                </Row>
              </React.Fragment>
            ))}
          </Modal.Body>
        </Modal>
      </React.Fragment>
    );
  }
}

export default connect(null, null, null, {forwardRef: true})(DocumentDetailsModal);