import React, {Component} from "react";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import {connect} from "react-redux";
import {getDocuments} from "../../../actions/documentActions";
import PropTypes from "prop-types";
import InputGroup from "react-bootstrap/InputGroup";
import Dropdown from "react-bootstrap/Dropdown";
import "../../../style/reusables/document-search.css"
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import UserAutosuggest from "../user/UserAutosuggest";
import {
  UPDATE_SELECTED_USERS_FOR_DESTINATION_SEARCH,
  UPDATE_SELECTED_USERS_FOR_ORIGIN_SEARCH
} from "../../../actions/types";
import {getAllUsers} from "../../../actions/userActions";
import DatePicker from "react-datepicker/es";
import 'react-datepicker/dist/react-datepicker.css';

class DocumentSearch extends Component {
  constructor(props) {
    super(props);

    this.refOrigin = React.createRef();
    this.refDestination = React.createRef();

    this.state = {
      originType: "Oricare",
      originUsers: [],
      origin: "",
      destinationType: "Oricare",
      destinationUsers: [],
      destination: "",
      state: "Oricare",
      searchStr: "",
      createdDate: "Oricând",
      from: new Date(),
      to: new Date()
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    let snapshot = {};
    if (this.refOrigin && this.refOrigin.current) {
      let selectedUsersForOriginSearch = this.refOrigin.current.props.userReducer.selectedUsersForOriginSearch
      if (selectedUsersForOriginSearch && selectedUsersForOriginSearch !== this.state.originUsers) {
        snapshot.origin = selectedUsersForOriginSearch;
      }
    }
    if (this.refDestination && this.refDestination.current) {
      let selectedUsersForDestinationSearch = this.refDestination.current.props.userReducer.selectedUsersForDestinationSearch;
      if (selectedUsersForDestinationSearch && selectedUsersForDestinationSearch !== this.state.destinationUsers) {
        snapshot.destination = selectedUsersForDestinationSearch;
      }
    }
    return snapshot;
  }

  //save selected users to state before updating component
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (snapshot) {
      if (snapshot.origin) {
        this.setState({originUsers: snapshot.origin});
      }
      if (snapshot.destination) {
        this.setState({destinationUsers: snapshot.destination});
      }
    }
  }

  componentWillUnmount() {
    this.props.getAllUsers();
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  onDateChange(field, newDate) {
    this.setState({
      [field]: newDate
    });
  }

  onSubmit(e) {
    e.preventDefault();
    console.log("submit called")

    // check of origin & destinaton should be updated
    let origin;
    let destination;
    if (this.refOrigin && this.refOrigin.current) {
      origin = this.refOrigin.current.props.userReducer.selectedUsersForOriginSearch;
    }
    if (this.refDestination && this.refDestination.current) {
      destination = this.refDestination.current.props.userReducer.selectedUsersForDestinationSearch;
    }
    if (origin !== this.state.originUsers) {
      this.setState({originUsers: origin});
    }
    if (destination !== this.state.destinationUsers) {
      this.setState({destinationUsers: destination}, function () {
        console.log(this.state);
      });
    }

    // perform search
    // const {document} = this.props;
    // this.props.downloadFile(document.registryNumber);
  }

  render() {
    const CustomToggle = React.forwardRef(({children, onClick}, ref) => (
      <Button variant="searchbar"
              href=""
              ref={ref}
              onClick={e => {
                e.preventDefault();
                onClick(e);
              }}
      >
        {children}
        &#x25bc;
      </Button>
    ));

    let specificPersonOriginInput;
    if (this.state.originType === "O anumită persoană") {
      specificPersonOriginInput = (
        <Col className="col-sm-5 my-auto">
          <UserAutosuggest ref={this.refOrigin}
                           placeholder="Introduceți numele"
                           prevSelectedUsers={this.state.originUsers}
                           actionType={UPDATE_SELECTED_USERS_FOR_ORIGIN_SEARCH}/>
        </Col>
      );
    }

    let specificPersonDestinationInput;
    if (this.state.destinationType === "O anumită persoană") {
      specificPersonDestinationInput = (
        <Col className="col-sm-5 my-auto">
          <UserAutosuggest ref={this.refDestination}
                           placeholder="Introduceți numele"
                           prevSelectedUsers={this.state.destinationUsers}
                           actionType={UPDATE_SELECTED_USERS_FOR_DESTINATION_SEARCH}/>
        </Col>
      );
    }

    let specificDateInput;
    if (this.state.createdDate === "Personalizat") {
      specificDateInput = (
        <React.Fragment>
          <Row>
            <Col className="col-sm-2 my-auto"/>
            <Col className="mt-3">Între:</Col>
          </Row>
          <Row>
            <Col className="col-sm-2 my-auto"/>
            <Col className="col-sm-5 my-auto">
              <DatePicker id="from"
                          name="from"
                          value={this.state.from.toLocaleDateString("en-GB")}
                          onChange={(e) => this.onDateChange("from", e)}/>
            </Col>
            <Col className="col-sm-5 my-auto">
              <DatePicker id="to"
                          name="to"
                          value={this.state.to.toLocaleDateString("en-GB")}
                          onChange={(e) => this.onDateChange("to", e)}/>
            </Col>
          </Row>
        </React.Fragment>
      )
    }

    const CustomDropdown = React.forwardRef(
      ({children, style, className, 'aria-labelledby': labeledBy}, ref) => {
        return (
          <div
            ref={ref}
            style={style}
            className={className}
            aria-labelledby={labeledBy}
          >
            <Container className="search-dropdown-inner">
              <Row className="mt-3 align-items-center">
                <Col className="col-sm-2 my-auto">
                  <strong>Emitent</strong>
                </Col>
                <Col className="col-sm-5 my-auto">
                  <Form.Control as="select"
                                name="originType"
                                value={this.state.originType}
                                onChange={this.onChange}>
                    <option value="Oricine">Oricine</option>
                    <option value="Intern">Intern</option>
                    <option value="Extern">Extern</option>
                    <option value="O anumită persoană">O anumită persoană</option>
                  </Form.Control>
                </Col>
                {specificPersonOriginInput}
              </Row>

              <Row className="mt-3 align-items-center">
                <Col className="col-sm-2 my-auto">
                  <strong>Destinatar</strong>
                </Col>
                <Col className="col-sm-5 my-auto">
                  <Form.Control as="select"
                                value={this.state.destinationType}
                                name="destinationType"
                                onChange={this.onChange}>
                    <option value="Oricine">Oricine</option>
                    <option value="Intern">Intern</option>
                    <option value="Extern">Extern</option>
                    <option value="O anumită persoană">O anumită persoană</option>
                  </Form.Control>
                </Col>
                {specificPersonDestinationInput}
              </Row>

              <Row className="mt-3 align-items-center">
                <Col className="col-sm-2 my-auto">
                  <strong>Stare</strong>
                </Col>
                <Col className="col-sm-5 my-auto">
                  <Form.Control as="select"
                                name="state"
                                value={this.state.state}
                                onChange={this.onChange}>
                    <option value="Oricare">Oricare</option>
                    <option value="Arhivate">Arhivate</option>
                    <option value="Nearhivate">Nearhivate</option>
                  </Form.Control>
                </Col>
              </Row>

              <Row className="mt-3 align-items-center">
                <Col className="col-sm-2 my-auto">
                  <strong>Nume</strong>
                </Col>
                <Col className="col-sm-10 my-auto w-100">
                  <FormControl
                    name="searchStr"
                    className="my-2 w-100"
                    placeholder="Introduceți un termen care face parte din titlu sau numărul de înregistrare"
                    onChange={this.onChange}
                    value={this.state.searchStr}
                  />
                </Col>
              </Row>

              <Row className="mt-3 align-items-center">
                <Col className="col-sm-2 my-auto">
                  <strong>Data înregistrării</strong>
                </Col>
                <Col className="col-sm-5 my-auto">
                  <Form.Control as="select"
                                value={this.state.destinationType}
                                name="createdDate"
                                onChange={this.onChange}>
                    <option value="Oricând">Oricând</option>
                    <option value="Astăzi">Astăzi</option>
                    <option value="Ieri">Ieri</option>
                    <option value="În ultimile 7 zile">În ultimile 7 zile</option>
                    <option value="În ultimile 30 de zile">În ultimile 30 de zile</option>
                    <option value="Personalizat">Personalizat</option>
                  </Form.Control>
                </Col>
              </Row>
              {specificDateInput}

              <Row className="mt-3 mb-2 justify-content-end">
                <Col xs="auto" className="my-auto">
                  <Button variant="light" type="submit" className="mr-n2"
                  >
                    <strong>Resetați</strong>
                  </Button>
                </Col>
                <Col xs="auto" className="my-auto">
                  <Button variant="primary" type="submit" className="mr-0"
                  >
                    Căutați
                  </Button>
                </Col>
              </Row>

            </Container>
          </div>
        );
      },
    );

    return (
      <Container className="search-container mx-auto shadow">
        <Form onSubmit={this.onSubmit}>
          <InputGroup className="mt-3 mx-2 align-self-center">
            <InputGroup.Prepend>
              <Button variant="searchbar"
                      type="submit"
                      className="mr-0"
              >
                <i className="fas fa-search"></i>
              </Button>
            </InputGroup.Prepend>

            <FormControl type="text"
                         name="searchStr"
                         aria-describedby="search-btn"
                         placeholder="Căutați documente"
                         value={this.state.searchStr}
                         onChange={this.onChange}
                         className="mx-auto search-input">
            </FormControl>

            <InputGroup.Append className="ml-3">
              <Dropdown alignRight>
                <Dropdown.Toggle as={CustomToggle}/>
                <Dropdown.Menu as={CustomDropdown} className="dropdown-search mr-n2 mt-0"/>
              </Dropdown>
            </InputGroup.Append>
          </InputGroup>
        </Form>
      </Container>
    );
  }
}

DocumentSearch.propTypes = {
  documentReducer: PropTypes.object.isRequired,
  getDocuments: PropTypes.func.isRequired,
  getAllUsers: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  documentReducer: state.documentReducer,
});

export default connect(mapStateToProps, {getDocuments, getAllUsers})(DocumentSearch);
