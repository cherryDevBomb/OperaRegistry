import Button from "react-bootstrap/Button";
import {getFullName} from "./userUtils";
import React from "react";

export const getReceiverItem = (recipient, isResolved) => {
  let receiverItem;
  if (isResolved) {
    receiverItem = (
      <div>
        <Button variant="recipient-resolved" size="sm">
          {getFullName(recipient)}
        </Button>
        <i className="fas fa-check-circle fa-check-circle-regular"/>
      </div>
    )
  } else {
    receiverItem = (
      <Button variant="recipient" size="sm" className="mr-3">
        {getFullName(recipient)}
      </Button>
    )
  }
  return receiverItem;
}