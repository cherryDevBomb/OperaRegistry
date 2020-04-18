import UserPopup from "../components/fragments/user/UserPopup";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import React from "react";

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
    placement="bottom-start"
    overlay={<UserPopup user={user}/>}
  >
    <div className="btn-link">
      {getFullName(user)}
    </div>
  </OverlayTrigger>
  )
}