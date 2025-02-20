import React, {Component} from "react";
import Modal from "react-bootstrap/Modal";
import ModalTitle from "react-bootstrap/ModalTitle";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import {connect} from "react-redux";
import Container from "react-bootstrap/Container";
import UserAutosuggest from "../../user/reusable/UserAutosuggest";
import {UPDATE_SELECTED_USERS_FOR_DOCUMENT_HISTORY} from "../../../redux/actions/actionTypes";
import PropTypes from "prop-types";
import {getAllAvailableUsers, updateSelectedUsers} from "../../../redux/actions/userActions";
import {resendDocument} from "../../../redux/actions/documentActions";

class ResendDocumentModal extends Component {

  constructor(props) {
    super(props);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.onMessageChange = this.onMessageChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      show: false,
      recipients: "",
      sentMessage: ""
    }
  }

  handleShow(registryNumber) {
    this.props.getAllAvailableUsers(registryNumber);
    this.setState({
      registryNumber: registryNumber,
      show: true
    });
  }

  handleClose() {
    this.setState({show: false})
  }

  onMessageChange(e) {
    this.setState({sentMessage: e.target.value})
  }

  async onSubmit(e) {
    e.preventDefault();
    let recipientEmails = [];
    this.props.userReducer.selectedUsersForDocumentHistory.forEach(rec => recipientEmails.push(rec.email.toString()));
    this.setState({
      recipients: recipientEmails
    }, () => {
      if (this.state.recipients.length > 0) {
        const newHistory = {
          recipients: this.state.recipients,
          sentMessage: this.state.sentMessage
        }
        this.props.resendDocument(this.state.registryNumber, newHistory, this.props.page, this.props.callbackName);
        this.handleClose();
      }
    });
  }

  onSkipClick = () => {
    this.handleClose();
  }

  render() {

    let internalReceiversFeedback;
    if (this.state.recipients && this.state.recipients.length === 0) {
      internalReceiversFeedback = (
        <div className="small error-feedback">Câmp obligatoriu</div>
      )
    }
    const formGroupDestination = (
      <Container>
        <Row className="mt-2 align-items-center">
          <Col xs={12} className="mt-0 p-0 mb-2"><strong>Destinatar</strong></Col>
          <Col xs={12} className="my-auto p-0">
            <UserAutosuggest placeholder="Introduceți destinatarul"
                             includePrincipal={false}
                             prevSelectedUsers={[]}
                             actionType={UPDATE_SELECTED_USERS_FOR_DOCUMENT_HISTORY}/>
          </Col>
        </Row>
        <Row className="mt-1 mb-3 align-items-center">
          <Col xs={12} className="my-auto p-0">
            {internalReceiversFeedback}
          </Col>
        </Row>
      </Container>
    );

    return (
      <React.Fragment>
        <Modal
          centered
          show={this.state.show}
          onHide={this.handleClose}
        >
          <Modal.Header closeButton>
            <ModalTitle>
              Trimiteți documentul Nr. {this.state.registryNumber}
            </ModalTitle>
          </Modal.Header>

          <Modal.Body>

            <Form onSubmit={this.onSubmit}>
              {formGroupDestination}

              <p className="mb-2"><strong>Comentariu (opțional)</strong></p>
              <Form.Group controlId="formGroupMessage">
                <Form.Control
                  as="textarea"
                  rows="3"
                  name="message"
                  type="text"
                  placeholder="Introduceti comentariul"
                  className="mb-3"
                  onChange={this.onMessageChange}
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

ResendDocumentModal.propTypes = {
  documentReducer: PropTypes.object.isRequired,
  userReducer: PropTypes.object.isRequired,
  getAllAvailableUsers: PropTypes.func.isRequired,
  updateSelectedUsers: PropTypes.func.isRequired,
  resendDocument: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  documentReducer: state.documentReducer,
  userReducer: state.userReducer
});

export default connect(mapStateToProps, {
  getAllAvailableUsers,
  updateSelectedUsers,
  resendDocument
}, null, {forwardRef: true})(ResendDocumentModal);