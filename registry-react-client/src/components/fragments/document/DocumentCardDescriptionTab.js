import React, {Component} from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {DESTINATION_EXTERNAL_DOC_TYPE} from "../../../properties";
import Button from "react-bootstrap/Button";
import {getFullName} from "../../../utils/userUtils";
import Container from "react-bootstrap/Container";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {downloadFile} from "../../../actions/fileActions";
import UserPopup from "../user/UserPopup";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import {getReceiverItem} from "../../../utils/uiUtils";
import Tooltip from "react-bootstrap/Tooltip";
import FileUploadModal from "./FileUploadModal";

class DocumentCardDescriptionTab extends Component {
  constructor(props) {
    super(props);
    this.uploadModalRef = React.createRef();

    this.state = {
      hasAttachment: this.props.document.hasAttachment
    }
  }

  onDownloadClick(e) {
    e.preventDefault();
    const {document} = this.props;
    this.props.downloadFile(document.registryNumber);
  }

  openUploadFileModal(e) {
    this.uploadModalRef.current.handleShow(this.props.document.registryNumber);
  }

  refresh() {
    this.setState({hasAttachment: true});
  }

  render() {
    const {document} = this.props;

    const createdByRow = (
      <Row className="mt-1">
        <Col className="col-sm-3 my-auto">
          <strong>Înregistrat de către:</strong>
        </Col>
        <Col className="col-sm-6 my-auto">
          <OverlayTrigger
            trigger={['hover', 'focus']}
            placement="bottom-start"
            overlay={<UserPopup user={document.createdBy}/>}
          >
            <div className="btn-link">
              {getFullName(document.createdBy)}
            </div>
          </OverlayTrigger>
        </Col>
      </Row>
    );

    let originRow;
    if (document.origin !== null) {
      originRow = (
        <Row className="mt-2">
          <Col className="col-sm-3 my-auto">
            <strong>Origine:</strong>
          </Col>
          <Col className="col-sm-6 my-auto">
            {document.origin}
          </Col>
        </Row>
      )
    }

    let receiversRow;
    if (document.documentType === DESTINATION_EXTERNAL_DOC_TYPE) {
      receiversRow = (
        document.documentHistory.map(dh => (
            <Col className="col-xs-auto my-auto px-0" key={dh.documentHistoryId}>
              <Button variant="recipient" size="sm" className="mr-3">
                {dh.externalRecipient}
              </Button>
            </Col>
          )
        )
      )
    } else {
      receiversRow = (
        document.documentHistory.map(dh => (
            <Col md="auto" className="my-auto px-0" key={dh.documentHistoryId}>
              <OverlayTrigger
                trigger={['hover', 'focus']}
                placement="bottom-start"
                overlay={<UserPopup user={dh.internalRecipient}/>}
              >
                {getReceiverItem(dh.internalRecipient, dh.resolved)}
              </OverlayTrigger>
            </Col>
          )
        )
      )
    }

    let downloadLinkColumn;
    if (this.state.hasAttachment) {
      downloadLinkColumn = (
        <Col className="col-sm-6 pl-0 my-auto">
          <OverlayTrigger placement="right" overlay={<Tooltip>Descarcă fișier</Tooltip>}>
            <Button variant="light-pure" onClick={this.onDownloadClick.bind(this)}>
              <i className="fas fa-file-download ml-1 mr-2"/>
            </Button>
          </OverlayTrigger>
        </Col>
      )
    } else {
      downloadLinkColumn = (
        <Col className="col-sm-6 my-auto">
          Nu exista nici un fișier atașat.
          <OverlayTrigger placement="right" overlay={<Tooltip>Încarcă un fișier</Tooltip>}>
            <Button variant="light-pure" onClick={this.openUploadFileModal.bind(this)}>
              <i className="fas fa-file-upload ml-1 mr-2"/>
            </Button>
          </OverlayTrigger>
        </Col>
      )
    }

    return (
      <React.Fragment>
        <FileUploadModal refreshCallback={this.refresh.bind(this)} skipButtonText="Anulează" ref={this.uploadModalRef}/>
        <Container>
          {createdByRow}
          {originRow}

          <Row className="mt-1">
            <Col className="col-sm-3 my-auto">
              <strong>Destinatari:</strong>
            </Col>
            <Col className="col-xs-auto my-auto ml-3">
              <Row>
                {receiversRow}
              </Row>
            </Col>
          </Row>

          <Row className="mt-3">
            <Col className="col-sm-3 my-auto">
              <strong>Atașament:</strong>
            </Col>
            {downloadLinkColumn}
          </Row>
        </Container>
      </React.Fragment>
    )
  }
}

DocumentCardDescriptionTab.propTypes = {
  downloadFile: PropTypes.func.isRequired
};

export default connect(null, {downloadFile})(DocumentCardDescriptionTab);