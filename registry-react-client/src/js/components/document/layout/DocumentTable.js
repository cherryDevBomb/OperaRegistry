import React, {Component} from "react";
import DocumentRow from "../other/DocumentRow";
import Table from "react-bootstrap/Table";
import {connect} from "react-redux";
import {getDocuments} from "../../../redux/actions/documentActions";
import PropTypes from "prop-types";
import Jumbotron from "react-bootstrap/Jumbotron";
import DocumentSearch from "../other/DocumentSearch";
import Pagination from "react-bootstrap/Pagination";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {getNewPageNumber, getPagination} from "../../../utils/paginationUtils";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import {generateReport} from "../../../redux/actions/reportActions";
import Spinner from "react-bootstrap/Spinner";
import {spinnerBanner} from "../../../utils/spinnerUtils";
import {getNoSearchResultBanner} from "../../../utils/emptyBanners";

class DocumentTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activePage: 1,
      isLoading: false,
      isReportLoading: false
    }
  }

  async loadCurrentPage() {
    this.setState({isLoading: true});
    const searchDetails = this.props.documentReducer.searchDetails;
    await this.props.getDocuments(searchDetails, this.state.activePage);
    this.setState({isLoading: false});
  }

  componentDidMount() {
    this.loadCurrentPage();
  }

  pageChanged(e) {
    const newPage = getNewPageNumber(e, this.state.activePage, this.props.documentReducer.documentsPageCount);

    if (this.state.activePage !== newPage) {
      this.setState({activePage: newPage}, () => {
        this.loadCurrentPage();
        window.scrollTo({top: 0, behavior: 'smooth'});
      });
    }
  }

  async generateReport(format, e) {
    e.preventDefault();
    this.setState({isReportLoading: true});
    await this.props.generateReport(this.props.documentReducer.searchDetails, format);
    this.setState({isReportLoading: false});
  }

  render() {
    const documents = this.props.documentReducer.documents;

    let pages = getPagination(this.props.documentReducer.documentsPageCount, this.state.activePage);

    let pageContent;
    if (this.state.isLoading) {
      pageContent = spinnerBanner();
    } else if (documents && documents.length > 0) {
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
              <DropdownButton title={"Generare raport"} className="float-sm-right mb-3 mb-sm-0">
                <Dropdown.Item as="button" onClick={(e) => this.generateReport("pdf", e)}>PDF</Dropdown.Item>
                <Dropdown.Item as="button" onClick={(e) => this.generateReport("xlsx", e)}>XLS</Dropdown.Item>
              </DropdownButton>
              {this.state.isReportLoading &&
              <Spinner className="float-sm-right mb-3 mb-sm-0 mr-3"
                       as="span"
                       animation="border"
                       variant="primary"
                       role="status"
                       aria-hidden="true"
              />}
            </Col>
          </Row>
        </React.Fragment>
      )
    } else if (documents && documents.length === 0) {
      pageContent = getNoSearchResultBanner();
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
