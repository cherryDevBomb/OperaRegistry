import React, {Component} from "react";
import DocumentRow from "../fragments/document/DocumentRow";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import {connect} from "react-redux";
import {getDocuments} from "../../actions/documentActions";
import PropTypes from "prop-types";
import Jumbotron from "react-bootstrap/Jumbotron";
import DocumentSearch from "../fragments/document/DocumentSearch";

class DocumentTable extends Component {
  componentDidMount() {
    this.props.getDocuments();
  }

  render() {
    const documents = this.props.documentReducer.documents;

    return (
      <div>
        <DocumentSearch/>

        <Jumbotron className="mx-3 my-4 shadow px-3 py-3">
          <Table responsive>
            <thead>
            <tr>
              <th className="th">Nr. înregistrare</th>
              <th className="th">Emitent</th>
              <th className="th">Data înregistrării</th>
              <th className="th">Titlu</th>
              <th className="th">Destinatar</th>
              <th className="th">Stare</th>
              <th className="th">Atașament</th>
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
