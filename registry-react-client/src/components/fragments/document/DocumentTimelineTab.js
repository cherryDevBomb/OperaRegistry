import React, {Component} from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {getUserPopup} from "../../../utils/userUtils";
import Container from "react-bootstrap/Container";
import {connect} from "react-redux";

class DocumentTimelineTab extends Component {
  constructor(props) {
    super(props);

    this.actionMap = {
      "CREATE": " a înregistrat documentul",
      "UPLOAD": " a încărcat un fișier",
      "SEND": " a trimis documentul către ",
      "RESOLVE": " a aprobat documentul",
      "ARCHIVE": " a arhivat documentul"
    }
  }

  getTimelineItem(item) {
    let actor = getUserPopup(item.actor);

    let action = this.actionMap[item.action];
    let destination;
    if (item.action === "SEND") {
      destination = item.internalRecipient ? getUserPopup(item.internalRecipient) : item.externalRecipient;
    }

    let message;
    if (item.message) {
      message = (
        <Row className="mt-n2 mb-2 ml-3" noGutters>
          <Col xs="auto" className="mr-2">
            <i className="fas fa-comment-dots"></i>
          </Col>
          <Col className="my-auto">
            <div className="font-weight-light text-muted small">{item.message}</div>
          </Col>
        </Row>
      )
    }

    return (
      <React.Fragment>
        <Row noGutters={true} className="mb-2">
          <Col xs="auto">{actor}</Col>
          <Col xs="auto" className="mx-1">{action}</Col>
          <Col xs="auto">{destination}</Col>
        </Row>
        {message}
      </React.Fragment>
    )

  }

  render() {
    const documentTimeline = this.props.document.documentTimeline;

    let keyIndex = 0;
    let timeline = (
      Object.keys(documentTimeline).map(key => (
        <Row className="mb-3" key={"Date-" + key}>
          <Col xs={12} sm={2}>
            <strong>{key}</strong>
          </Col>
          <Col xs={12} sm={8} className="my-auto ml-3 ml-sm-0">
            {documentTimeline[key].map(item => (
              <Row key={keyIndex++}>
                <Col>
                  {this.getTimelineItem(item)}
                </Col>
              </Row>
            ))}
          </Col>
        </Row>
      ))
    );

    return (
      <React.Fragment>
        <Container>
          {timeline}
        </Container>
      </React.Fragment>
    )
  }
}

export default connect(null, null)(DocumentTimelineTab);
