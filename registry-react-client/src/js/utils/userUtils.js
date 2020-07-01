import UserPopup from "../components/user/reusable/UserPopup";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import React from "react";
import Button from "react-bootstrap/Button";

export const getFullName = user => {
  return user.firstName + " " + user.lastName;
};

export const getInitials = user => {
  return user.firstName[0] + user.lastName[0];
}

export const getUserPopup = user => {
  return (
    <OverlayTrigger
      trigger={['hover', 'focus']}
      placement="auto"
      overlay={<UserPopup user={user}/>}
    >
      <div className="btn-link">
        {getFullName(user)}
      </div>
    </OverlayTrigger>
  )
}

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