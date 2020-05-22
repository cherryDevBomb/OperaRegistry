import React, {Component} from "react";
import DocumentRow from "../fragments/document/DocumentRow";
import Table from "react-bootstrap/Table";
import {connect} from "react-redux";
import {getDocuments} from "../../actions/documentActions";
import PropTypes from "prop-types";
import Jumbotron from "react-bootstrap/Jumbotron";
import DocumentSearch from "../fragments/document/DocumentSearch";
import Pagination from "react-bootstrap/Pagination";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {getNewPageNumber, getPagination} from "../../utils/paginationUtils";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import {generateReport} from "../../actions/reportActions";
import Button from "react-bootstrap/Button";

class DocumentTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activePage: 1
    }
  }

  loadCurrentPage() {
    const searchDetails = this.props.documentReducer.searchDetails;
    this.props.getDocuments(searchDetails, this.state.activePage);
  }

  componentDidMount() {
    this.loadCurrentPage();
  }

  pageChanged(e) {
    const newPage = getNewPageNumber(e, this.state.activePage, this.props.documentReducer.documentsPageCount);
    this.setState({activePage: newPage}, () => {
      this.loadCurrentPage();
    });
  }

  generateReport(format, e) {
    e.preventDefault();
    this.props.generateReport(this.props.documentReducer.searchDetails, format);
  }

  render() {
    const documents = this.props.documentReducer.documents;

    let pages = getPagination(this.props.documentReducer.documentsPageCount, this.state.activePage);

    let pageContent;
    if (documents.length > 0) {
      pageContent = (
        <React.Fragment>
          <Jumbotron className="mx-3 my-4 shadow px-3 py-3">
            <Table responsive className="table-fixed">
              <thead>
              <tr>
                <th className="th text-center" style={{width: "12%"}}>Nr. înregistrare</th>
                <th className="th" style={{width: "13%"}}>Emitent</th>
                <th className="th text-center" style={{width: "15%"}}>Data înregistrării</th>
                <th className="th" style={{width: "30%"}}>Titlu</th>
                <th className="th" style={{width: "15%"}}>Destinatar</th>
                <th className="th text-center" style={{width: "10%"}}>Stare</th>
                <th className="th text-center" style={{width: "5%"}}>Acțiuni</th>
              </tr>
              </thead>
              <tbody>
              {documents.map(document => (
                <DocumentRow
                  key={document.registryNumber}
                  document={document}
                  searchStr={this.props.documentReducer.searchDetails.searchStr}
                ></DocumentRow>
              ))}
              </tbody>
            </Table>
          </Jumbotron>

          <Row className="mt-4 mx-auto d-flex justify-content-center text-center">
            <Col xs={12} sm={"auto"} className="mx-auto d-flex justify-content-center">
              <Pagination className="mx-auto" onClick={this.pageChanged.bind(this)}>{pages}</Pagination>
            </Col>
            <Col xs={{order: 12}}>
              <DropdownButton title="Generare raport" className="float-sm-right mb-3 mb-sm-0">
                <Dropdown.Item as="button" onClick={(e) => this.generateReport("pdf", e)}>PDF</Dropdown.Item>
                {/*TODO change to xls*/}
                <Dropdown.Item as="button" onClick={(e) => this.generateReport("pdf", e)}>XLS</Dropdown.Item>
              </DropdownButton>
            </Col>
          </Row>
        </React.Fragment>
      )
    } else {
      pageContent = (
        <React.Fragment>
          <Jumbotron className="mx-3 my-4 shadow px-3 py-3">
            <Row className="mt-5">
              <Col xs="auto" className="mx-auto position-relative">
                <i className="far fa-frown"></i>
              </Col>
            </Row>
            <Row className="mt-4 mb-5">
              <Col xs="auto" className="mx-auto position-relative">
                <span className="empty-search">Ne pare rău, nu am găsit nici un document pentru căutarea dumneavoastră</span>
              </Col>
            </Row>
          </Jumbotron>
        </React.Fragment>
      )
    }

    return (
      <div>
        <DocumentSearch/>
        {pageContent}
      </div>
    );
  }
}

DocumentTable.propTypes = {
  documentReducer: PropTypes.object.isRequired,
  getDocuments: PropTypes.func.isRequired,
  generateReport: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  documentReducer: state.documentReducer
});

export default connect(mapStateToProps, {getDocuments, generateReport})(DocumentTable);
