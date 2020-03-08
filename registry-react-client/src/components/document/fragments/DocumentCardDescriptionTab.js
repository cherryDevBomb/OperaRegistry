import React, {Component} from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {DESTINATION_EXTERNAL_DOC_TYPE} from "../../../properties";
import Button from "react-bootstrap/Button";
import {getFullName} from "../../../securityUtils/userUtils";
import Badge from "react-bootstrap/Badge";
import Container from "react-bootstrap/Container";

export default class DocumentCardDescriptionTab extends Component {
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
      </Container>
    )
  }
}