import React, { Component } from "react";
import DocumentRow from "./DocumentRow";
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
    const documents = this.props.document.documents;

    return (
      <div>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-primary">Search</Button>
        </Form>

        <Table responsive>
          <thead>
            <tr>
              <th>Nr. înregistrare</th>
              <th>Data înregistrării</th>
              <th>Emitent</th>
              <th>Titlu</th>
              <th>Tip document</th>
              <th>Stare</th>
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
  document: PropTypes.object.isRequired,
  getDocuments: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  document: state.document
});

export default connect(mapStateToProps, { getDocuments })(DocumentTable);
