import React, {Component} from "react";
import {getNewPageNumber, getPagination} from "../../utils/paginationUtils";
import Jumbotron from "react-bootstrap/Jumbotron";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Pagination from "react-bootstrap/Pagination";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getReceivedArchivedDocuments, getReceivedDocuments} from "../../actions/documentActions";
import ReceivedDocumentCard from "../fragments/document/ReceivedDocumentCard";
import {getNoDocumentsBanner} from "../../utils/emptyBanners";

class ReceivedDocuments extends Component {
  constructor(props) {
    super(props);

    this.state = {
      documentReducer: {},
      activePageResolvedTrue: 1,
      activePageResolvedFalse: 1,
      activePageArchived: 1
    };
  }

  loadCurrentPage(resolved) {
    const currentPage = resolved ? this.state.activePageResolvedTrue : this.state.activePageResolvedFalse;
    this.props.getReceivedDocuments(resolved, currentPage);
  }

  loadCurrentPageForArchived() {
    const currentPage = this.state.activePageArchived
    this.props.getReceivedArchivedDocuments(currentPage);
  }

  componentDidMount() {
    this.loadCurrentPage(false);
    this.loadCurrentPage(true);
    this.loadCurrentPageForArchived();
  }

  pageChanged(e, resolved) {
    const activePage = resolved ? this.state.activePageResolvedTrue : this.state.activePageResolvedFalse;
    const total = resolved ? this.props.documentReducer.receivedResolvedDocumentsPageCount : this.props.documentReducer.receivedOpenDocumentsPageCount;
    const newPage = getNewPageNumber(e, activePage, total);
    const tab = resolved ? "activePageResolvedTrue" : "activePageResolvedFalse";

    if (activePage !== newPage) {
      this.setState({[tab]: newPage}, () => {
        this.loadCurrentPage(resolved);
        window.scrollTo({top: 0, behavior: 'smooth'});
      });
    }
  }

  pageChangedForArchived(e) {
    const newPage = getNewPageNumber(e, this.state.activePageArchived, this.props.documentReducer.receivedArchivedDocumentsPageCount);
    const tab = "activePageArchived";

    if (this.state.activePageArchived !== newPage) {
      this.setState({[tab]: newPage}, () => {
        this.loadCurrentPageForArchived();
        window.scrollTo({top: 0, behavior: 'smooth'});
      });
    }
  }

  pageChangedAfterResolve(page) {
    this.setState({'activePageResolvedFalse': page});
    this.setState({'activePageResolvedTrue': 1})
  }

  render() {
    const documentsReceivedOpen = this.props.documentReducer.documentsReceivedOpen;
    const documentsReceivedResolved = this.props.documentReducer.documentsReceivedResolved;
    const documentsReceivedArchived = this.props.documentReducer.documentsReceivedArchived;

    let pagesResolvedFalse = getPagination(this.props.documentReducer.receivedOpenDocumentsPageCount, this.state.activePageResolvedFalse);
    let pagesResolvedTrue = getPagination(this.props.documentReducer.receivedResolvedDocumentsPageCount, this.state.activePageResolvedTrue);
    let pagesResolvedArchived = getPagination(this.props.documentReducer.receivedArchivedDocumentsPageCount, this.state.activePageArchived);

    let tabOpenContent;
    if (documentsReceivedOpen && documentsReceivedOpen.length > 0) {
      tabOpenContent = (
        <React.Fragment>
          {documentsReceivedOpen.map(document => (
            <ReceivedDocumentCard
              key={document.registryNumber}
              document={document}
              page={this.state.activePageResolvedFalse}
              pageChangedAfterResolveCallback={this.pageChangedAfterResolve.bind(this)}
            ></ReceivedDocumentCard>
          ))}
          <Row className="mt-4 mx-auto">
            <Col xs={"auto"} className="mx-auto">
              <Pagination onClick={(e) => this.pageChanged(e, false)}>{pagesResolvedFalse}</Pagination>
            </Col>
          </Row>
        </React.Fragment>
      )
    } else if (documentsReceivedOpen && documentsReceivedOpen.length === 0) {
      tabOpenContent = getNoDocumentsBanner();
    }

    let tabResolvedContent;
    if (documentsReceivedResolved && documentsReceivedResolved.length > 0) {
      tabResolvedContent = (
        <React.Fragment>
          {documentsReceivedResolved.map(document => (
            <ReceivedDocumentCard
              key={document.registryNumber}
              document={document}
              page={this.state.activePageResolvedTrue}
            ></ReceivedDocumentCard>
          ))}
          <Row className="mt-4 mx-auto">
            <Col xs={"auto"} className="mx-auto">
              <Pagination onClick={(e) => this.pageChanged(e, true)}>{pagesResolvedTrue}</Pagination>
            </Col>
          </Row>
        </React.Fragment>
      )
    } else if (documentsReceivedResolved && documentsReceivedResolved.length === 0) {
      tabResolvedContent = getNoDocumentsBanner();
    }

    let tabArchivedContent;
    if (documentsReceivedArchived && documentsReceivedArchived.length > 0) {
      tabArchivedContent = (
        <React.Fragment>
          {documentsReceivedArchived.map(document => (
            <ReceivedDocumentCard
              key={document.registryNumber}
              document={document}
              page={this.state.activePageArchived}
            ></ReceivedDocumentCard>
          ))}
          <Row className="mt-4 mx-auto">
            <Col xs={"auto"} className="mx-auto">
              <Pagination onClick={(e) => this.pageChangedForArchived(e)}>{pagesResolvedArchived}</Pagination>
            </Col>
          </Row>
        </React.Fragment>
      )
    } else if (documentsReceivedArchived && documentsReceivedArchived.length === 0) {
      tabArchivedContent = getNoDocumentsBanner();
    }

    return (
      <React.Fragment>
        <Jumbotron className="mt-4 mx-2 mx-sm-4 mx-4 pt-3">
          <h4 className="text-center">Documente primite</h4>
          <Tabs defaultActiveKey="open" id="my-documents-tab" variant="tabs" className="mt-3 pt-1 tabs">
            <Tab eventKey="open" title="Nerezolvate" className="tab-left">
              {tabOpenContent}
            </Tab>
            <Tab eventKey="resolved" title="Rezolvate" className="tab-right">
              {tabResolvedContent}
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

ReceivedDocuments.propTypes = {
  documentReducer: PropTypes.object.isRequired,
  getReceivedDocuments: PropTypes.func.isRequired,
  getReceivedArchivedDocuments: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  documentReducer: state.documentReducer
});

export default connect(mapStateToProps, {getReceivedDocuments, getReceivedArchivedDocuments})(ReceivedDocuments);