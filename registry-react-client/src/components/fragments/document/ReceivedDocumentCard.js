import React, {Component} from "react";
import Card from "react-bootstrap/Card";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DocumentCardDescriptionTab from "./DocumentCardDescriptionTab";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {resolveDocument} from "../../../actions/documentActions";
import {downloadFile} from "../../../actions/fileActions";
import DocumentOperationModal from "./DocumentOperationModal";
import DocumentTimelineTab from "./DocumentTimelineTab";
import ResendDocumentModal from "./ResendDocumentModal";
import {GET_DOCUMENTS_RECEIVED_OPEN, GET_DOCUMENTS_RECEIVED_RESOLVED} from "../../../actions/types";


class ReceivedDocumentCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedTab: "#description"
    };

    this.resolveModalRef = React.createRef();
    this.resendModalRef = React.createRef();
  }

  onResendClick(e) {
    e.preventDefault();
    this.resendModalRef.current.handleShow(this.props.document.registryNumber);
  }

  onResolveClick(e) {
    e.preventDefault();
    this.resolveModalRef.current.handleShow(this.props.document.registryNumber);
  }

  resolveCallback(message) {
    const {document} = this.props;
    let {page} = this.props;
    //go one page back if you resolve last document on the current page
    if (this.props.documentReducer.documentsReceivedOpen.length === 1 && page > 1) {
      page--;
    }
    this.props.resolveDocument(document.registryNumber, message, page);
    this.props.pageChangedAfterResolveCallback(page);
  }

  render() {
    const {document} = this.props;
    const docHistory = document.documentHistory.find(dh => {
      if (dh.internalRecipient) {
        return dh.internalRecipient.userId === parseInt(this.props.securityReducer.user.id);
      } else {
        return false;
      }
    })

    let cardBody;
    if (this.state.selectedTab === "#description") {
      cardBody = (
        <DocumentCardDescriptionTab document={document}/>
      );
    } else {
      cardBody = (
        <DocumentTimelineTab document={document}/>
      );
    }

    let headerButton;
    if (document.archived) {
      headerButton = (
        <Button variant="archive" size="sm" className="float-right" disabled={true}>
          Arhivat
        </Button>
      )
    } else if (!docHistory.resolved) {
      headerButton = (
        <Button variant="archive" size="sm" className="float-right" onClick={this.onResolveClick.bind(this)}>
          Aprobă
        </Button>
      )
    } else {
      headerButton = (
        <Button variant="archive" size="sm" className="float-right" disabled={true}>
          Aprobat
        </Button>
      )
    }

    let resendButton;
    if (!document.archived) {
      resendButton = (
        <Button variant="archive" size="sm" className="float-right" onClick={this.onResendClick.bind(this)}>
          Trimite mai departe
        </Button>
      )
    }

    let resendModal;
    if (!document.archived) {
      if (!docHistory.resolved) {
        resendModal = (
          <ResendDocumentModal ref={this.resendModalRef}
                               page={this.props.page}
                               callbackName={GET_DOCUMENTS_RECEIVED_OPEN}/>
        )
      } else {
        resendModal = (
          <ResendDocumentModal ref={this.resendModalRef}
                               page={this.props.page}
                               callbackName={GET_DOCUMENTS_RECEIVED_RESOLVED}/>
        )
      }
    }

    return (
      <React.Fragment>
        <DocumentOperationModal ref={this.resolveModalRef}
                                documentOperationCallback={this.resolveCallback.bind(this)}
                                actionName="aprobați"/>

        {resendModal}

        <Card className="mx-sm-2 mt-3 shadow-sm">

          <Card.Header>
            <Container>
              <Row className="mt-2 mb-1">
                <Col xs={{span: 1, order: 1}} className="my-auto">
                  <Button variant="number">{document.registryNumber}</Button>
                </Col>
                <Col xs={{span: 12, order: 3}} sm={{span: "auto", order: 2}} className="my-auto pt-3 pt-sm-0">
                  <Card.Title>{document.title}</Card.Title>
                </Col>

                <Col xs={{span: "auto", order: 2}} sm={{span: "auto", order: 3}} className="my-0 py-0 ml-auto">
                  <Row>
                    <Col xs="auto" className="my-auto pr-0">{resendButton}</Col>
                    <Col xs="auto" className="my-auto">{headerButton}</Col>
                  </Row>
                </Col>
              </Row>
            </Container>
            <Nav variant="pills" defaultActiveKey="#description"
                 onSelect={selectedKey => this.setState({selectedTab: selectedKey})}>
              <Nav.Item>
                <Nav.Link href="#description">Descriere</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="#history">Istoric</Nav.Link>
              </Nav.Item>
            </Nav>
            <hr className="hr-tabs"/>
          </Card.Header>

          <Card.Body>
            {cardBody}
          </Card.Body>

        </Card>
      </React.Fragment>
    );
  }
}

ReceivedDocumentCard.propTypes = {
  securityReducer: PropTypes.object.isRequired,
  resolveDocument: PropTypes.func.isRequired,
  downloadFile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  documentReducer: state.documentReducer,
  securityReducer: state.securityReducer
});

export default connect(mapStateToProps, {resolveDocument, downloadFile})(ReceivedDocumentCard);