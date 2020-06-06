import React, {Component} from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import {Badge} from "react-bootstrap";
import {FAQs} from "../../../constants/FAQs";

export default class HelpPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeKey: null
    }

    this.toggled.bind(this);
    this.getChevron.bind(this);
  }

  toggled(e, key) {
    if (this.state.activeKey !== key) {
      this.setState({activeKey: key});
    } else {
      this.setState({activeKey: null});
    }
  }

  getChevron(key) {
    return this.state.activeKey === key ?
      <i className="fas fa-chevron-up"/> : <i className="fas fa-chevron-down"/>;
  }

  render() {
    let faqsCards = []
    for (let faqIndex = 0; faqIndex < FAQs.length; faqIndex++) {
      const faq = FAQs[faqIndex];

      let stepArray = [];
      for (let stepIndex = 0; stepIndex < faq.steps.length; stepIndex++) {
        stepArray.push(
          <Row noGutters className="mb-2 mx-2 mx-sm-3 mx-md-5" key={faqIndex.toString() + stepIndex.toString()}>
            <Col xs="auto">
              <Badge variant="primary-round" pill className="mr-3">{stepIndex + 1}</Badge>
            </Col>
            <Col xs={10} sm={11}>
              {faq.steps[stepIndex]}
            </Col>
          </Row>
        )
      }

      let note;
      if (faq.note) {
        note = (
          <Row noGutters className="mt-3 mb-2 mx-2 mx-sm-3 mx-md-5">
            <Col xs="auto" className="font-italic">Notă: {faq.note}</Col>
          </Row>
        )
      }

      faqsCards.push(
        <Card className="mt-1 accordion-card" key={faqIndex.toString()}>
          <Accordion.Toggle as={Card.Header} className="accordion-toggle"
                            onClick={(e) => this.toggled(e, faqIndex)}
                            eventKey={faqIndex.toString()}>
            <Row>
              <Col xs="auto">{this.getChevron(faqIndex)}</Col>
              <Col xs={10} className={this.state.activeKey === faqIndex ? "font-weight-bold" : ""}>{faq.question}</Col>
            </Row>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey={faqIndex.toString()}>
            <Card.Body>
              {stepArray}
              {note}
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      )
    }

    return (
      <Accordion className="mx-3 mx-sm-4 mx-md-5 my-4 my-sm-5">
        {faqsCards}
      </Accordion>
    );
  }
}
