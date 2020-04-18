import React, {Component} from "react";
import "../../../style/reusables/icons.css";
import "../../../style/reusables/badge.css";
import {Badge} from "react-bootstrap";
import {getUserPopup} from "../../../utils/userUtils";
import {DESTINATION_EXTERNAL_DOC_TYPE, ORIGIN_EXTERNAL_DOC_TYPE} from "../../../properties";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {downloadFile} from "../../../actions/fileActions";

class DocumentRow extends Component {

  onDownloadClick(e) {
    e.preventDefault();
    const {document} = this.props;
    this.props.downloadFile(document.registryNumber);
  }

  render() {
    const {document} = this.props;

    const registryNumber = (
      <Badge variant="regNr">
        {document.registryNumber}
      </Badge>
    )

    let origin;
    if (document.documentType !== ORIGIN_EXTERNAL_DOC_TYPE) {
      origin = getUserPopup(document.createdBy);
    } else {
      origin = (
        <React.Fragment>
          external motherfucker
        </React.Fragment>
      )
    }

    let destination;
    if (document.documentType !== DESTINATION_EXTERNAL_DOC_TYPE) {
      destination = document.documentHistory.map(dh => {
          const item = getUserPopup(dh.internalRecipient);
          return <React.Fragment key={dh.documentHistoryId}>{item}</React.Fragment>
        }
      );
    } else {
      destination = document.documentHistory.map(dh => {
          const item = (
            <div>
              {dh.externalRecipient}
            </div>
          );
          return <React.Fragment key={dh.documentHistoryId}>{item}</React.Fragment>
        }
      );
    }

    let archivingState;
    if (document.archived) {
      archivingState = (
        <Badge variant="archived" pill={true}>
          <i className="fas fa-check-circle"/>
          arhivat
        </Badge>
      )
    } else {
      archivingState = (
        <Badge variant="notarchived" pill={true}>
          <i className="fas fa-times-circle"/>
          nearhivat
        </Badge>
      )
    }

    const download = document.hasAttachment ?
      <i className="fas fa-file-download" onClick={this.onDownloadClick.bind(this)}/> : "";

    return (
      <tr>
        <td style={{width: "12%"}} className="text-center">{registryNumber}</td>
        <td style={{width: "13%"}}>{origin}</td>
        <td style={{width: "15%"}} className="text-center">{document.createdDate}</td>
        <td style={{width: "30%"}}>{document.title}</td>
        <td style={{width: "15%"}}>{destination}</td>
        <td style={{width: "10%"}} className="text-center">{archivingState}</td>
        <td style={{width: "5%"}} className="text-center">{download}</td>
      </tr>
    );
  }
}

DocumentRow.propTypes = {
  downloadFile: PropTypes.func.isRequired
};

export default connect(null, {downloadFile})(DocumentRow);
