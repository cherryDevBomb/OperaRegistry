import React, {Component} from "react";
import Popover from "react-bootstrap/Popover";
import {Button} from "react-bootstrap";
import {getFullName, getInitials} from "../../../utils/userUtils";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../../../style/btn.css"

export default class UserPopup extends Component {
  render() {
    const {user} = this.props;

    return (
      <Popover id="popover-basic" {...this.props}>
        <Popover.Content>
          <Container>
            <Row>
              <Col>
                <Button variant="initials">
                  {getInitials(user)}
                </Button>
              </Col>
              <Col>
                <Row>
                  <strong>{getFullName(user)}</strong>
                </Row>
                <Row>
                  {user.email}
                </Row>
              </Col>
            </Row>
            <hr/>
            <Row>
              <Col>
                <div className="font-weight-light">{user.department}</div>
            </Col>
            </Row>
          </Container>
        </Popover.Content>
      </Popover>
    );
  }
}