import React, {Component} from "react";
import DocumentRow from "../fragments/document/DocumentRow";
import Table from "react-bootstrap/Table";
import {connect} from "react-redux";
import {getDocuments} from "../../actions/documentActions";
import PropTypes from "prop-types";
import Jumbotron from "react-bootstrap/Jumbotron";
import DocumentSearch from "../fragments/document/DocumentSearch";

class DocumentTable extends Component {
  componentDidMount() {
    const searchDetails = this.props.documentReducer.searchDetails;
    this.props.getDocuments(searchDetails);
  }

  render() {
    const documents = this.props.documentReducer.documents;

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
