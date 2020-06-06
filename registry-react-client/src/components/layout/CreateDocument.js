import React, {Component} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {createDocument} from "../../actions/documentActions";
import UserAutosuggest from "../fragments/user/UserAutosuggest";
import {getFullName} from "../../utils/userUtils";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {UPDATE_SELECTED_USERS_FOR_DOCUMENT_HISTORY} from "../../actions/types";
import {getAllUsers, updateAllUsers, updateSelectedUsers} from "../../actions/userActions";
import FileUploadModal from "../fragments/document/FileUploadModal";
import {buttonSpinner} from "../../utils/spinnerUtils";

class CreateDocument extends Component {
  componentDidMount() {
    this.props.getAllUsers(false);
    this.props.updateSelectedUsers([], UPDATE_SELECTED_USERS_FOR_DOCUMENT_HISTORY);
  }

  constructor(props) {
    super(props);

    this.state = {
      title: "",
      origin: "",
      isOriginExternal: false,
      isDestinationExternal: false,
      recipients: "",
      sentMessage: "",

      isLoading: false,

      documentReducer: {},
      errorReducer: {},
    };

    this.uploadModalRef = React.createRef();

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.errorReducer) {
      return {errorReducer: nextProps.errorReducer};
    } else {
      return null;
    }
  }

  componentDidUpdate(prevProps, prevState, ss) {
    if (prevProps.errorReducer && prevProps.errorReducer !== this.props.errorReducer) {
      this.setState({errorReducer: prevProps.errorReducer});
    }
  }

  componentWillUnmount() {
    this.props.updateAllUsers([]);
  }

  isInputValid() {
    if ((this.state.isOriginExternal && this.state.origin === "") ||
      (this.state.title === "") ||
      (this.state.isDestinationExternal && (!this.state.recipients || this.state.recipients.length === 0)) ||
      (!this.state.isDestinationExternal && this.props.userReducer.selectedUsersForDocumentHistory.length === 0)) {
      return false;
    }
    return true;
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  onOriginTypeChange(e) {
    if (e === "external") {
      this.setState({isOriginExternal: true});
    } else {
      this.setState({isOriginExternal: false});
    }
  }

  onDestinationTypeChange(e) {
    if (e === "external") {
      this.setState({isDestinationExternal: true});
      this.props.updateSelectedUsers([], UPDATE_SELECTED_USERS_FOR_DOCUMENT_HISTORY);
      this.props.getAllUsers(false);
    } else {
      this.setState({isDestinationExternal: false});
    }
  }

  onExtDestinationChange(e) {
    if (e !== "") {
      this.setState({
        recipients: [e.target.value]
      });
    }
  }

  async createDocument() {
    this.setState({isLoading: true});

    const newDocument = {
      title: this.state.title,
      origin: this.state.origin,
      originExternal: this.state.isOriginExternal,
      destinationExternal: this.state.isDestinationExternal,
      recipients: this.state.recipients,
      sentMessage: this.state.sentMessage
    };
    await this.props.createDocument(newDocument);
    this.setState({isLoading: false});

    if (this.isInputValid() && this.props.documentReducer.mostRecentRegNr) {
      this.uploadModalRef.current.handleShow(this.props.documentReducer.mostRecentRegNr);
    }
  }

  async onSubmit(e) {
    e.preventDefault();
    if (!this.state.isDestinationExternal) {
      let recipientEmails = [];
      this.props.userReducer.selectedUsersForDocumentHistory.forEach(rec => recipientEmails.push(rec.email.toString()));
      this.setState({
        recipients: recipientEmails
      }, () => {
        this.createDocument()
      });
    } else {
      this.createDocument()
    }
  }

  render() {
    const {errorReducer} = this.state;

    //origin
    const formGroupOriginType = (
      <React.Fragment>
        <Container>
          <Row className="mt-5">
            <Col xs={12} sm={4} className="my-auto">
              <strong className="float-sm-right">Originea documentului</strong>
            </Col>

            <Col xs={12} sm={8} className="my-auto">
              <ToggleButtonGroup
                type="radio"
                name="originType"
                size="sm"
                defaultValue="internal"
                onChange={this.onOriginTypeChange.bind(this)}
              >
                <ToggleButton variant="toggle" value="internal">
                  Document intern
                </ToggleButton>
                <ToggleButton variant="toggle" value="external"
                              disabled={this.state.isDestinationExternal ? true : false}>
                  Document extern
                </ToggleButton>
              </ToggleButtonGroup>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );

    const user = this.props.securityReducer.user;
    const defaultCreator = (
      <Container>
        <Row className="mt-3">
          <Col xs={4} className="my-auto">
            <strong className="float-sm-right">Autor</strong>
          </Col>

          <Col xs={8} className="my-auto">
            {getFullName(user)}
          </Col>
        </Row>
      </Container>
    );

    const formGroupExtOrigin = (
      <Container>
        <Row className="mt-2 align-items-center">
          <Col xs={12} sm={4} className="my-auto">
            <strong className="float-sm-right">Autor</strong>
          </Col>

          <Col xs={12} sm={8} className="my-auto">
            <Form.Group className="mb-0">
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
          </Col>
        </Row>
      </Container>
    );

    let originPart;
    if (this.state.isOriginExternal) {
      originPart = formGroupExtOrigin;
    } else {
      originPart = defaultCreator;
    }

    //title
    const formGroupTitle = (
      <Container>
        <Row className="mt-3 align-items-center">
          <Col xs={12} sm={4} className="my-auto">
            <strong className="float-sm-right">Titlu</strong>
          </Col>

          <Col xs={12} sm={8} className="my-auto">
            <Form.Group className="mb-0">
              <Form.Control
                id="title"
                name="title"
                type="text"
                placeholder="Introduceți conținutul pe scurt al documentului"
                value={this.state.title}
                onChange={this.onChange}
                isInvalid={errorReducer.title}
              />
              <Form.Control.Feedback type="invalid">
                {errorReducer.title}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
      </Container>
    );

    //destination
    const formGroupDestinationType = (
      <Container>
        <Row className="mt-3 align-items-center">
          <Col xs={12} sm={4} className="my-auto">
            <strong className="float-sm-right">Destinație</strong>
          </Col>

          <Col xs={12} sm={8} className="my-auto">
            <ToggleButtonGroup
              type="radio"
              name="destinationType"
              size="sm"
              defaultValue="internal"
              onChange={this.onDestinationTypeChange.bind(this)}
            >
              <ToggleButton variant="toggle" value="internal">
                Destinație internă
              </ToggleButton>
              <ToggleButton variant="toggle" value="external" disabled={this.state.isOriginExternal ? true : false}>
                Destinație externă
              </ToggleButton>
            </ToggleButtonGroup>
          </Col>
        </Row>
      </Container>
    );

    let internalReceiversFeedback;
    if (!this.state.isDestinationExternal && this.state.recipients && this.state.recipients.length === 0) {
      internalReceiversFeedback = (
        <div className="small error-feedback">Câmp obligatoriu</div>
      )
    }
    const formGroupIntDestination = (
      <Container>
        <Row className="mt-2 align-items-center">
          <Col xs={12} sm={4}></Col>
          <Col xs={12} sm={8} className="my-auto">
            <UserAutosuggest placeholder="Introduceți destinatarul"
                             includePrincipal={false}
                             prevSelectedUsers={[]}
                             actionType={UPDATE_SELECTED_USERS_FOR_DOCUMENT_HISTORY}/>
          </Col>
        </Row>
        <Row className="mt-1 align-items-center">
          <Col xs={12} sm={4}></Col>
          <Col xs={12} sm={8} className="my-auto">
            {internalReceiversFeedback}
          </Col>
        </Row>
      </Container>
    );

    const formGroupExtDestination = (
      <Container>
        <Row className="mt-2 align-items-center">
          <Col xs={12} sm={4}></Col>
          <Col xs={12} sm={8} className="my-auto">
            <Form.Group className="mb-0">
              <Form.Control
                name="recipients"
                type="text"
                placeholder="Introduceți destinatarul"
                value={this.state.recipients}
                onChange={this.onExtDestinationChange.bind(this)}
                isInvalid={errorReducer.recipients}
              />
              <Form.Control.Feedback type="invalid">
                {errorReducer.recipients}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
      </Container>
    );

    const formGroupSentMessage = (
      <Container>
        <Row className="mt-3 mb-5 align-items-center">
          <Col xs={12} sm={4} className="my-auto">
            <strong className="float-sm-right">Mesaj</strong>
          </Col>

          <Col xs={12} sm={8} className="my-auto">
            <Form.Group className="mb-0">
              <Form.Control
                as="textarea"
                rows="3"
                name="sentMessage"
                type="text"
                placeholder="Introduceți un mesaj pentru destinatar (opțional)"
                value={this.state.sentMessage}
                onChange={this.onChange}
              />
            </Form.Group>
          </Col>
        </Row>
      </Container>
    );

    let destinationPart;
    if (this.state.isDestinationExternal) {
      destinationPart = formGroupExtDestination;
    } else {
      destinationPart = formGroupIntDestination;
    }

    return (
      <React.Fragment>
        <FileUploadModal history={this.props.history} skipButtonText="Skip" ref={this.uploadModalRef}/>
        <Jumbotron className="mx-2 mx-sm-5 my-4 px-1 px-sm-5 py-5 shadow">
          <h4 className="text-center">Document nou</h4>
          <Form onSubmit={this.onSubmit}>
            <hr/>
            {formGroupOriginType}
            {originPart}
            {formGroupTitle}
            {formGroupDestinationType}
            {destinationPart}
            {formGroupSentMessage}
            <Row className="mt-3 mb=3"><Col className="text-center">
              <Button variant="primary" type="submit" className="float-sm-right">
                {this.state.isLoading && buttonSpinner()}
                Confirmă
              </Button>
            </Col></Row>
          </Form>
        </Jumbotron>
      </React.Fragment>
    );
  }
}

CreateDocument.propTypes = {
  documentReducer: PropTypes.object.isRequired,
  errorReducer: PropTypes.object.isRequired,
  securityReducer: PropTypes.object.isRequired,
  userReducer: PropTypes.object.isRequired,
  createDocument: PropTypes.func.isRequired,
  getAllUsers: PropTypes.func.isRequired,
  updateAllUsers: PropTypes.func.isRequired,
  updateSelectedUsers: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  documentReducer: state.documentReducer,
  errorReducer: state.errorReducer,
  securityReducer: state.securityReducer,
  userReducer: state.userReducer
});

export default connect(mapStateToProps, {
  createDocument,
  getAllUsers,
  updateAllUsers,
  updateSelectedUsers
})(CreateDocument);