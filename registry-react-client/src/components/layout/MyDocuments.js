import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getMyDocuments} from "../../actions/documentActions";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import MyDocumentCard from "../fragments/document/MyDocumentCard";
import Jumbotron from "react-bootstrap/Jumbotron";
import Pagination from "react-bootstrap/Pagination";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import {getPagination} from "../../utils/paginationUtils";

class MyDocuments extends Component {
  constructor(props) {
    super(props);

    this.state = {
      documentReducer: {},
      activePageArchivedTrue: 1,
      activePageArchivedFalse: 1
    };
  }

  loadCurrentPage(archived) {
    const currentPage = archived ? this.state.activePageArchivedTrue : this.state.activePageArchivedFalse;
    this.props.getMyDocuments(archived, currentPage);
  }

  componentDidMount() {
    this.loadCurrentPage(false);
    this.loadCurrentPage(true);
  }

  pageChanged(e, archived) {
    const newPageNumber = parseInt(e.target.text)
    const tab = archived ? "activePageArchivedTrue" : "activePageArchivedFalse";
    this.setState({[tab]: newPageNumber}, () => {
      this.loadCurrentPage(archived);
    });
  }

  pageChangedAfterArchive(page) {
    this.setState({'activePageArchivedFalse': page});
    this.setState({'activePageArchivedTrue': 1})
  }

  render() {
    const myDocumentsOpen = this.props.documentReducer.myDocumentsOpen;
    const myDocumentsArchived = this.props.documentReducer.myDocumentsArchived;

    let pagesArchivedFalse = getPagination(this.props.documentReducer.myOpenDocumentsPageCount, this.state.activePageArchivedFalse);
    let pagesArchivedTrue = getPagination(this.props.documentReducer.myArchivedDocumentsPageCount, this.state.activePageArchivedTrue);

    return (
      <React.Fragment>
        <Jumbotron className="mt-4 mx-2 mx-sm-4 pt-3">
          <Tabs defaultActiveKey="open" id="my-documents-tab" variant="tabs" className="mt-3 pt-1 tabs">
            <Tab eventKey="open" title="Nearhivate" className="tab-left">
              {myDocumentsOpen.map(document => (
                <MyDocumentCard
                  key={document.registryNumber}
                  document={document}
                  page={this.state.activePageArchivedFalse}
                  pageChangedAfterArchiveCallback={this.pageChangedAfterArchive.bind(this)}
                ></MyDocumentCard>
              ))}
              <Row className="mt-4 mx-auto">
                <Col xs={"auto"} className="mx-auto">
                  <Pagination onClick={(e) => this.pageChanged(e, false)}>{pagesArchivedFalse}</Pagination>
                </Col>
              </Row>
            </Tab>
            <Tab eventKey="archived" title="Arhivate" className="tab-right">
              {myDocumentsArchived.map(document => (
                <MyDocumentCard
                  key={document.registryNumber}
                  document={document}
                  page={this.state.activePageArchivedTrue}
                ></MyDocumentCard>
              ))}
              <Row className="mt-4 mx-auto">
                <Col xs={"auto"} className="mx-auto">
                  <Pagination onClick={(e) => this.pageChanged(e, true)}>{pagesArchivedTrue}</Pagination>
                </Col>
              </Row>
            </Tab>
          </Tabs>
        </Jumbotron>
      </React.Fragment>
    );
  }
}

MyDocuments.propTypes = {
  documentReducer: PropTypes.object.isRequired,
  getMyDocuments: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  documentReducer: state.documentReducer
});

export default connect(mapStateToProps, {getMyDocuments})(MyDocuments);