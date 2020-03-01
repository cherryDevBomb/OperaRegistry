import React, {Component} from "react";
import FileUpload from "./FileUpload";
import PropTypes from "prop-types";
import {connect} from "react-redux";

class UploadAfterCreate extends Component {

  componentWillReceiveProps(nextProps) {
    if (nextProps.errorReducer) {
      this.setState({errorReducer: nextProps.errorReducer});
    }
  }

  render() {
    return (
      <React.Fragment>
        <h1>In UploadAfterCreate</h1>
        <FileUpload
          history={this.props.history}
          registryNumber={this.props.documentReducer.mostRecentRegNr}/>
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