import React from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export const getNoDocumentsBanner = () => {
  return (
    <React.Fragment>
      <Jumbotron className="mx-3 my-4 shadow px-3 py-3">
        <Row className="mt-5">
          <Col xs="auto" className="mx-auto position-relative">
            <i className="fas fa-file-alt"></i>
          </Col>
        </Row>
        <Row className="mt-4 mb-5">
          <Col xs="auto" className="mx-auto position-relative">
            <span className="empty-search">Nu există nici un document</span>
          </Col>
        </Row>
      </Jumbotron>
    </React.Fragment>
  )
}