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
import {getPagination} from "../../utils/paginationUtils";

class DocumentTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activePage: 1,
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
    const newPageNumber = parseInt(e.target.text)
    this.setState({activePage: newPageNumber}, () => {
      this.loadCurrentPage();
    });
  }

  render() {
    const documents = this.props.documentReducer.documents;

    let pages = getPagination(this.props.documentReducer.documentsPageCount, this.state.activePage);

    return (
      <div>
        <DocumentSearch/>

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
              <th className="th text-center" style={{width: "5%"}}>Atașament</th>
            </tr>
            </thead>
            <tbody>
            {documents.map(document => (
              <DocumentRow
                key={document.registryNumber}
                document={document}
              ></DocumentRow>
            ))}
            </tbody>
          </Table>
        </Jumbotron>

        <Row className="mt-4 mx-auto">
          <Col xs={"auto"} className="mx-auto">
            <Pagination onClick={this.pageChanged.bind(this)}>{pages}</Pagination>
          </Col>
        </Row>
      </div>
    );
  }
}

DocumentTable.propTypes = {
  documentReducer: PropTypes.object.isRequired,
  getDocuments: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  documentReducer: state.documentReducer
});

export default connect(mapStateToProps, {getDocuments})(DocumentTable);
