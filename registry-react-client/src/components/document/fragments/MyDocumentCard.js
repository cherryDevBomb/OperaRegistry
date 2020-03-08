import React, {Component} from "react";
import Card from "react-bootstrap/Card";
import Nav from "react-bootstrap/Nav";
import Badge from "react-bootstrap/Badge";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DocumentCardDescriptionTab from "./DocumentCardDescriptionTab";
import Button from "react-bootstrap/Button";


class MyDocumentCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedTab: "#description"
    };
  }

  onArchiveClick(e) {
    e.preventDefault();
    console.log("archive clicked");
  }

  render() {
    const {document} = this.props;

    let cardBody;
    if (this.state.selectedTab === "#description") {
      cardBody = (
        <DocumentCardDescriptionTab document={document}/>
      );
    } else {
      cardBody = (
        <div>
          <p>Text: History</p>
        </div>
      );
    }

    let archiveButton;
    if (!document.isArchived) {
      archiveButton = (
        <Button variant="success" onClick={this.onArchiveClick}>
          Arhivează
        </Button>
      )
    }

    return (
      <React.Fragment>
        <Card>

          <Card.Header>
            <Container>
              <Row>
                <Col xs={1}>
                  <Badge variant="primary">{document.registryNumber}</Badge>
                </Col>
                <Col xs="auto">
                  <Card.Title>{document.title}</Card.Title>
                </Col>
                <Col>
                  {archiveButton}
                </Col>
              </Row>
            </Container>
            <Nav variant="tabs" defaultActiveKey="#description"
                 onSelect={selectedKey => this.setState({selectedTab: selectedKey})}>
              <Nav.Item>
                <Nav.Link href="#description">Descriere</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="#history">Istoric</Nav.Link>
              </Nav.Item>
            </Nav>
          </Card.Header>

          <Card.Body>
            {cardBody}
          </Card.Body>

        </Card>
      </React.Fragment>
    );
  }
}

export default MyDocumentCard;