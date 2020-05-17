import React, {Component} from "react";
import "../../../style/reusables/icons.css";
import "../../../style/reusables/badge.css";
import {Badge} from "react-bootstrap";
import {getUserPopup} from "../../../utils/userUtils";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {downloadFile} from "../../../actions/fileActions";
import {DESTINATION_EXTERNAL_DOC_TYPE, ORIGIN_EXTERNAL_DOC_TYPE} from "../../../constants/appConstants";
import DocumentDetailsModal from "./DocumentDetailsModal";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Highlighter from "react-highlight-words";

class DocumentRow extends Component {
  constructor(props) {
    super(props);
    this.detailsModalRef = React.createRef();
  }

  onDetailsClick(e) {
    e.preventDefault();
    this.detailsModalRef.current.handleShow(this.props.document);

  }

  onDownloadClick(e) {
    e.preventDefault();
    const {document} = this.props;
    this.props.downloadFile(document.registryNumber);
  }

  render() {
    const {document} = this.props;
    const currentUserId = parseInt(this.props.securityReducer.user.id);

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
          {document.origin}
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

    const isSender = document.createdBy.userId === currentUserId;
    const isRecipient = document.documentHistory.some(dh => (dh.internalRecipient && dh.internalRecipient.userId === currentUserId));
    const shouldDisplayFile = document.hasAttachment && (isSender || isRecipient);
    const actions = shouldDisplayFile ?
      (
        <React.Fragment>
          <OverlayTrigger placement="auto" overlay={<Tooltip>Vizualizează detalii</Tooltip>}>
            <i className="fas fa-info-circle mr-2" onClick={this.onDetailsClick.bind(this)}/>
          </OverlayTrigger>
          <OverlayTrigger placement="auto" overlay={<Tooltip>Descarcă fișier</Tooltip>}>
            <i className="fas fa-file-download fa-file-download-rem4" onClick={this.onDownloadClick.bind(this)}/>
          </OverlayTrigger>
        </React.Fragment>
      ) :
      (
        <React.Fragment>
          <OverlayTrigger placement="auto" overlay={<Tooltip>Vizualizează detalii</Tooltip>}>
            <i className="fas fa-info-circle mr-2" onClick={this.onDetailsClick.bind(this)}/>
          </OverlayTrigger>
          <i className="fas fa-file-download fa-file-download-rem4 icon-invisible"/>
        </React.Fragment>
      )

    const searchItems = this.props.searchStr.trim().split(" ");
    console.log(searchItems);

    return (
      <React.Fragment>
        <DocumentDetailsModal document={this.props.document} ref={this.detailsModalRef}/>

        <tr>
          <td style={{width: "12%"}} className="text-center">{registryNumber}</td>
          <td style={{width: "13%"}}>{origin}</td>
          <td style={{width: "15%"}} className="text-center">{document.createdDate}</td>
          <td style={{width: "30%"}}>
            <Highlighter
              highlightClassName="highlight"
              searchWords={searchItems}
              autoEscape={true}
              textToHighlight={document.title}
            />
          </td>
          <td style={{width: "15%"}}>{destination}</td>
          <td style={{width: "10%"}} className="text-center">{archivingState}</td>
          <td style={{width: "5%"}} className="text-center">{actions}</td>
        </tr>
      </React.Fragment>
    );
  }
}

DocumentRow.propTypes = {
  securityReducer: PropTypes.object.isRequired,
  downloadFile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  securityReducer: state.securityReducer,
});

export default connect(mapStateToProps, {downloadFile})(DocumentRow);