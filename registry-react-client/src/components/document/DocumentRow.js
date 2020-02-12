import React, { Component } from "react";

export default class DocumentRow extends Component {
  render() {
    const { document } = this.props;
    return (
      <tr>
        <td>{document.registryNumber}</td>
        <td>{document.createdDate}</td>
        <td>{document.createdBy}</td>
        <td>{document.title}</td>
        <td>{document.documentType}</td>
        <td>{document.globalStatus}</td>
      </tr>
    );
  }
}
