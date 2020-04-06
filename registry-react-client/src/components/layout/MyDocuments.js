import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getMyDocuments, getMyDocumentsArchived, getMyDocumentsOpen} from "../../actions/documentActions";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import MyDocumentCard from "../fragments/document/MyDocumentCard";
import FileUploadModal from "../fragments/document/FileUploadModal";
import Jumbotron from "react-bootstrap/Jumbotron";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

class MyDocuments extends Component {
  constructor(props) {
    super(props);

    this.state = {
      documentReducer: {}
    };
  }

  componentDidMount() {
    this.props.getMyDocuments(false);
    this.props.getMyDocuments(true);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.documentReducer) {
      this.setState({documentReducer: nextProps.documentReducer});
    }
  }

  render() {
    const myDocumentsOpen = this.props.documentReducer.myDocumentsOpen;
    const myDocumentsArchived = this.props.documentReducer.myDocumentsArchived;

    return (
      <React.Fragment>
        <FileUploadModal history={this.props.history} ref={this.uploadModalRef}/>
        <Jumbotron className="mt-4 mx-4 pt-3">
          <Tabs defaultActiveKey="open" id="my-documents-tab" variant="tabs" className="mt-3 pt-1 tabs">
            <Tab eventKey="open" title="Nearhivate" className="tab-left">
              {myDocumentsOpen.map(document => (
                <MyDocumentCard
                  key={document.registryNumber}
                  document={document}
                ></MyDocumentCard>
              ))}
            </Tab>
            <Tab eventKey="archived" title="Arhivate" className="tab-right">
              {myDocumentsArchived.map(document => (
                <MyDocumentCard
                  key={document.registryNumber}
                  document={document}
                ></MyDocumentCard>
              ))}
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

export default connect(mapStateToProps, { getMyDocuments})(MyDocuments);