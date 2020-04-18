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
import DocumentOperationModal from "./DocumentOperationModal";
import DocumentTimelineTab from "./DocumentTimelineTab";


class MyDocumentCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedTab: "#description"
    };

    this.archiveModalRef = React.createRef();
  }

  onArchiveClick(e) {
    e.preventDefault();
    this.archiveModalRef.current.handleShow(this.props.document.registryNumber);
  }

  archiveCallback(message) {
    const {document} = this.props;
    let {page} = this.props;
    //go one page back if you archive last document on the current page
    if (this.props.documentReducer.myDocumentsOpen.length === 1 && page > 1) {
      page--;
    }
    this.props.archiveDocument(document.registryNumber, message, page);
    this.props.pageChangedAfterArchiveCallback(page);
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
        <DocumentTimelineTab document={document}/>
      );
    }

    let archiveButton;
    if (!document.archived) {
      archiveButton = (
        <Button variant="archive" size="sm" className="float-right" onClick={this.onArchiveClick.bind(this)}>
          Arhivează
        </Button>
      )
    } else {
      archiveButton = (
        <Button variant="archive" size="sm" className="float-right" disabled={true}>
          Arhivat
        </Button>
      )
    }

    return (
      <React.Fragment>
        <DocumentOperationModal ref={this.archiveModalRef}
                                documentOperationCallback={this.archiveCallback.bind(this)}
                                actionName="arhivați"/>

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
                  {archiveButton}
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
  documentReducer: PropTypes.object.isRequired,
  archiveDocument: PropTypes.func.isRequired,
  downloadFile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  documentReducer: state.documentReducer,
});

export default connect(mapStateToProps, {archiveDocument, downloadFile})(MyDocumentCard);