import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getMyDocumentsArchived, getMyDocumentsOpen} from "../../actions/documentActions";
import Card from "react-bootstrap/Card";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import DocumentRow from "./fragments/DocumentRow";
import MyDocumentCard from "./fragments/MyDocumentCard";

class MyDocuments extends Component {
  componentDidMount() {
    this.props.getMyDocumentsOpen();
    this.props.getMyDocumentsArchived();
  }

  render() {
    const myDocumentsOpen = this.props.documentReducer.myDocumentsOpen;
    const myDocumentsArchived = this.props.documentReducer.myDocumentsArchived;

    return (
      <React.Fragment>
        <Tabs defaultActiveKey="open" id="my-documents-tab">
          <Tab eventKey="open" title="Nearhivate">
            {myDocumentsOpen.map(document => (
              <MyDocumentCard
                key={document.registryNumber}
                document={document}
              ></MyDocumentCard>
            ))}
          </Tab>
          <Tab eventKey="archived" title="Arhivate">
            {myDocumentsArchived.map(document => (
              <MyDocumentCard
                key={document.registryNumber}
                document={document}
              ></MyDocumentCard>
            ))}
          </Tab>
        </Tabs>
      </React.Fragment>
    );
  }
}

MyDocuments.propTypes = {
  documentReducer: PropTypes.object.isRequired,
  getMyDocumentsOpen: PropTypes.func.isRequired,
  getMyDocumentsArchived: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  documentReducer: state.documentReducer
});

export default connect(mapStateToProps, { getMyDocumentsOpen, getMyDocumentsArchived })(MyDocuments);