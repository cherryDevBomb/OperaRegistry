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
import {getNewPageNumber, getPagination} from "../../utils/paginationUtils";
import {getNoDocumentsBanner} from "../../utils/noDocumentsBanner";

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
    const activePage = archived ? this.state.activePageArchivedTrue : this.state.activePageArchivedFalse;
    const total = archived ? this.props.documentReducer.myArchivedDocumentsPageCount : this.props.documentReducer.myOpenDocumentsPageCount;
    const newPage = getNewPageNumber(e, activePage, total);
    const tab = archived ? "activePageArchivedTrue" : "activePageArchivedFalse";
    this.setState({[tab]: newPage}, () => {
      this.loadCurrentPage(archived);
      window.scrollTo({ top: 0, behavior: 'smooth' });
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

    let tabOpenContent;
    if (myDocumentsOpen && myDocumentsOpen.length > 0) {
      tabOpenContent = (
        <React.Fragment>
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
        </React.Fragment>
      )
    } else if (myDocumentsOpen && myDocumentsOpen.length === 0) {
      tabOpenContent = getNoDocumentsBanner();
    }

    let tabArchivedContent;
    if (myDocumentsArchived && myDocumentsArchived.length > 0) {
      tabArchivedContent = (
        <React.Fragment>
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
        </React.Fragment>
      )
    } else if (myDocumentsArchived && myDocumentsArchived.length === 0){
      tabArchivedContent = getNoDocumentsBanner();
    }

    return (
      <React.Fragment>
        <Jumbotron className="mt-4 mx-2 mx-sm-4 pt-3">
          <h4 className="text-center">Documentele mele</h4>
          <Tabs defaultActiveKey="open" id="my-documents-tab" variant="tabs" className="mt-3 pt-1 tabs">
            <Tab eventKey="open" title="Nearhivate" className="tab-left">
              {tabOpenContent}
            </Tab>
            <Tab eventKey="archived" title="Arhivate" className="tab-right">
              {tabArchivedContent}
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