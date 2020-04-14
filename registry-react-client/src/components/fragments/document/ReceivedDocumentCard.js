import React, {Component} from "react";
import Card from "react-bootstrap/Card";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DocumentCardDescriptionTab from "./DocumentCardDescriptionTab";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {archiveDocument} from "../../../actions/documentActions";
import {downloadFile} from "../../../actions/fileActions";


class MyDocumentCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedTab: "#description"
    };
  }

  onResolveClick(e) {
    e.preventDefault();
    const {document} = this.props;
    this.props.archiveDocument(document.registryNumber);
  }

  render() {
    const {document} = this.props;
    const docHistory = document.documentHistory.filter(dh => {
      if (dh.internalRecipient) {
        //this.props.securityReducer.user.userId is undefined
        return dh.internalRecipient.userId === this.props.securityReducer.user.userId;
      } else {
        return false;
      }
    })

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

    let headerButton;
    if (document.archived) {
      headerButton = (
        <Button variant="archive" size="sm" className="float-right" disabled={true}>
          Arhivat
        </Button>
      )
    }
    else if (!docHistory.resolved) {
      headerButton = (
        <Button variant="archive" size="sm" className="float-right" onClick={this.onResolveClick.bind(this)}>
          Aprobă
        </Button>
      )
    } else {
      headerButton = (
        <Button variant="archive" size="sm" className="float-right" disabled={true}>
          Aprobat
        </Button>
      )
    }

    return (
      <React.Fragment>
        <Card className="mx-2 mt-3 shadow-sm">

          <Card.Header>
            <Container>
              <Row className="mt-2 mb-1">
                <Col className="col-sm-1 my-auto">
                  <Button variant="number">{document.registryNumber}</Button>
                </Col>
                <Col className="col-sm-8 my-auto">
                  <Card.Title>{document.title}</Card.Title>
                </Col>
                <Col className="col-sm-3 my-auto">
                  {headerButton}
                </Col>
              </Row>
            </Container>
            <Nav variant="pills" defaultActiveKey="#description"
                 onSelect={selectedKey => this.setState({selectedTab: selectedKey})}>
              <Nav.Item>
                <Nav.Link href="#description">Descriere</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="#history">Istoric</Nav.Link>
              </Nav.Item>
            </Nav>
            <hr className="hr-tabs"/>
          </Card.Header>

          <Card.Body>
            {cardBody}
          </Card.Body>

        </Card>
      </React.Fragment>
    );
  }
}

MyDocumentCard.propTypes = {
  securityReducer: PropTypes.object.isRequired,
  archiveDocument: PropTypes.func.isRequired,
  downloadFile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  documentReducer: state.documentReducer,
  securityReducer: state.securityReducer
});

export default connect(mapStateToProps, {archiveDocument, downloadFile})(MyDocumentCard);