import React, { Component } from "react";
import DocumentRow from "./fragments/DocumentRow";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { connect } from "react-redux";
import { getDocuments } from "../../actions/documentActions";
import PropTypes from "prop-types";

class DocumentTable extends Component {
  componentDidMount() {
    this.props.getDocuments();
  }

  render() {
    const documents = this.props.documentReducer.documents;

    return (
      <div>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-primary">Search</Button>
        </Form>

        <Table responsive>
          <thead>
            <tr>
              <th className="th">Nr. înregistrare</th>
              <th className="th">Emitent</th>
              <th className="th">Data înregistrării</th>
              <th className="th">Titlu</th>
              <th className="th">Destinație</th>
              <th className="th">Arhivat</th>
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

export default connect(mapStateToProps, { getDocuments })(DocumentTable);
