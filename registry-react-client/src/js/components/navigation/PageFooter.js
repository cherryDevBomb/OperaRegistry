import React, {Component} from "react";
import {Container, Row} from "react-bootstrap";
import Col from "react-bootstrap/Col";

export default class PageFooter extends Component {

  render() {
    return (
      <React.Fragment>
        <Container fluid className="page-footer bg-dark text-center py-2">
          <Row>
            <Col xs="auto" className="mx-auto small footer-text">
              © 2020 <strong>Opera Națională Română Cluj-Napoca.</strong> | Realizat cu drag la Universitatea Babeș-Bolyai de către <strong>ubbinfogermană</strong>.
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

