import React, {Component} from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {DESTINATION_EXTERNAL_DOC_TYPE} from "../../../properties";
import Button from "react-bootstrap/Button";
import {getFullName} from "../../../utils/userUtils";
import Badge from "react-bootstrap/Badge";
import Container from "react-bootstrap/Container";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {downloadFile} from "../../../actions/fileActions";

class DocumentCardDescriptionTab extends Component {

  onDownloadClick(e) {
    e.preventDefault();
    const {document} = this.props;
    this.props.downloadFile(document.registryNumber);
  }

  render() {
    const {document} = this.props;

    const createdByRow = (
      <Row>
        <Col sm={2}>
          Creat de:
        </Col>
        <Col xs={1}>
          <Badge variant="info" pill={true}>
            {document.createdBy.firstName[0] + document.createdBy.lastName[0]}
          </Badge>
        </Col>
        <Col xs="auto">
          {getFullName(document.createdBy)}
        </Col>
      </Row>
    );

    let originRow;
    if (document.origin !== null) {
      originRow = (
        <Row>
          <Col sm={2} className="justify-content-end">
            Origine:
          </Col>
          <Col sm="auto" className="align-items-start">
            {document.origin}
          </Col>
        </Row>
      )
    }

    let receiversRow;
    if (document.documentType === DESTINATION_EXTERNAL_DOC_TYPE) {
      receiversRow = (
        document.documentHistory.map(dh => (
            <Col key={dh.documentHistoryId}>
              <Button variant="secondary">
                {dh.externalRecipient}
              </Button>
            </Col>
          )
        )
      )
    } else {
      receiversRow = (
        document.documentHistory.map(dh => (
            <Col key={dh.documentHistoryId}>
              <Button variant="secondary">
                {getFullName(dh.internalRecipient)}
              </Button>
            </Col>
          )
        )
      )
    }

    let downloadLinkRow;
    if (document.hasAttachment) {
      downloadLinkRow = (
        <Row>
          <Col>
            <Button variant="outline-info" onClick={this.onDownloadClick.bind(this)}>
              Descarcă fișier
            </Button>
          </Col>
        </Row>
      )
    }

    return (
      <Container>
        {createdByRow}
        {originRow}
        <Row>
          <Col sm={2}>
            Destinatari:
          </Col>
          <Row>
            {receiversRow}
          </Row>
        </Row>
        {downloadLinkRow}
      </Container>
    )
  }
}

DocumentCardDescriptionTab.propTypes = {
  downloadFile: PropTypes.func.isRequired
};

export default connect(null, {downloadFile})(DocumentCardDescriptionTab);