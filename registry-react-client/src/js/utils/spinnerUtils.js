import Jumbotron from "react-bootstrap/Jumbotron";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import React from "react";

export const spinnerBanner = () => {
  return (
    <React.Fragment>
      <Jumbotron className="mx-3 my-4 shadow px-3 py-3">
        <Row className="my-5">
          <Col xs="auto" className="mx-auto position-relative">
            <Spinner
              animation="border"
              role="status"
              aria-hidden="true"
            />
          </Col>
        </Row>
      </Jumbotron>
    </React.Fragment>
  )
}

export const buttonSpinner = () => {
  return (
    <Spinner className="mr-2"
             as="span"
             animation="border"
             variant="light"
             size="sm"
             role="status"
             aria-hidden="true"
    />
  )
}