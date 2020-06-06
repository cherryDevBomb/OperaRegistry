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

export const getNoSearchResultBanner = () => {
  return (
    <React.Fragment>
      <Jumbotron className="mx-3 my-4 shadow px-3 py-3">
        <Row className="mt-5">
          <Col xs="auto" className="mx-auto position-relative">
            <i className="far fa-frown"></i>
          </Col>
        </Row>
        <Row className="mt-4 mb-5">
          <Col xs="auto" className="mx-auto position-relative">
                <span
                  className="empty-search">Ne pare rău, nu am găsit nici un document pentru căutarea dumneavoastră</span>
          </Col>
        </Row>
      </Jumbotron>
    </React.Fragment>
  )
}

export const getNoPendingUsersBanner = () => {
  return (
    <React.Fragment>
      <Jumbotron className="mx-3 my-4 shadow px-3 py-3">
        <Row className="mt-5">
          <Col xs="auto" className="mx-auto position-relative">
            <i className="fas fa-user-plus"></i>
          </Col>
        </Row>
        <Row className="mt-4 mb-5">
          <Col xs="auto" className="mx-auto position-relative">
            <span className="empty-search">Nu există nici o cerere de înregistrare</span>
          </Col>
        </Row>
      </Jumbotron>
    </React.Fragment>
  )
}