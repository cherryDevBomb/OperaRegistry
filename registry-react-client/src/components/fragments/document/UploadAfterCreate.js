import React, {Component} from "react";
import FileUpload from "./FileUpload";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import Button from "react-bootstrap/Button";
import {MY_DOCUMENTS_PATH} from "../../../properties";

class UploadAfterCreate extends Component {

  componentWillReceiveProps(nextProps) {
    if (nextProps.errorReducer) {
      this.setState({errorReducer: nextProps.errorReducer});
    }
  }

  onSkipClick = () => {
    this.props.history.push(MY_DOCUMENTS_PATH);
  }

  render() {
    return (
      <React.Fragment>
        <FileUpload
          history={this.props.history}
          registryNumber={this.props.documentReducer.mostRecentRegNr}>
        </FileUpload>
        <Button
          variant="outline-secondary"
          onClick={this.onSkipClick}>
          Skip for now
        </Button>
      </React.Fragment>
    );
  }
}

UploadAfterCreate.propTypes = {
  documentReducer: PropTypes.object.isRequired,
  errorReducer: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  errorReducer: state.errorReducer,
  documentReducer: state.documentReducer
});

export default connect(mapStateToProps, null)(UploadAfterCreate);