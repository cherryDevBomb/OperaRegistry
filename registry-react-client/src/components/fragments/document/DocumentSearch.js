import React, {Component} from "react";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import {connect} from "react-redux";
import {getDocuments, saveSearchDetails} from "../../../actions/documentActions";
import PropTypes from "prop-types";
import InputGroup from "react-bootstrap/InputGroup";
import Dropdown from "react-bootstrap/Dropdown";
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
import "../../../style/reusables/document-search.css"
// import 'bootstrap-select/dist/css/bootstrap-select.css'
import {getDefaultSearchDetails} from "../../../utils/documentUtils";

class DocumentSearch extends Component {
  constructor(props) {
    super(props);

    this.refOrigin = React.createRef();
    this.refDestination = React.createRef();
    this.toggleButtonRef = React.createRef();

    const {searchDetails} = this.props.documentReducer;
    this.state = searchDetails;

    this.lastFieldChanged = "";

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
    console.log(this.state.showDropdown);
  }

  componentWillUnmount() {
    this.props.getAllUsers();
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value});
    this.lastFieldChanged = e.target.name;

    //check if you need to reset origin/destination users
    if (e.target.name === "originType" && e.target.value !== "O anumită persoană") {
      this.setState({originUsers: []}, () => {
        this.props.saveSearchDetails(this.state);
      });
    }
    if (e.target.name === "destinationType" && e.target.value !== "O anumită persoană") {
      this.setState({destinationUsers: []}, () => {
        this.props.saveSearchDetails(this.state);
      });
    }
  }

  onChangeSearchStr(e) {
    const key = e.target.name;
    this.setState({searchStr: e.target.value}, () => {
      if (key == "searchStr") {
        this.props.getDocuments(this.state);
      }
    });
    this.lastFieldChanged = e.target.name;
  }

  onDateChange(field, newDate) {
    this.setState({
      [field]: newDate
    });
    this.lastFieldChanged = field;
  }

  resetSearchDetails() {
    const newState = getDefaultSearchDetails();

    this.props.saveSearchDetails(newState);
    this.setState(
      {
        originType: newState.originType,
        originUsers: newState.originUsers,
        destinationType: newState.destinationType,
        destinationUsers: newState.destinationUsers,
        state: newState.state,
        searchStr: newState.searchStr,
        createdDate: newState.createdDate,
        from: newState.from,
        to: newState.to
      },
      () => {
        this.props.getDocuments(this.state);
      }
    )

    if (this.state.showDropdown === true) {
      this.toggleButtonRef.click();
    }
  }

  onSubmit(e) {
    e.preventDefault();

    // check if origin & destination should be updated before saving state to store
    let origin;
    let destination;
    if (this.refOrigin && this.refOrigin.current) {
      origin = this.refOrigin.current.props.userReducer.selectedUsersForOriginSearch;
    }
    if (this.refDestination && this.refDestination.current) {
      destination = this.refDestination.current.props.userReducer.selectedUsersForDestinationSearch;
    }
    if (origin && (origin !== this.state.originUsers)) {
      this.setState({originUsers: origin}, () => {
        this.props.saveSearchDetails(this.state);
        this.props.getDocuments(this.state);
      });
    } else if (destination && (destination !== this.state.destinationUsers)) {
      this.setState({destinationUsers: destination}, () => {
        this.props.saveSearchDetails(this.state);
        this.props.getDocuments(this.state);
      });
    } else {
      this.props.saveSearchDetails(this.state);
      this.props.getDocuments(this.state);
    }

    if (this.state.showDropdown === true) {
      this.toggleButtonRef.click();
    }
  }

  toggleDropdown() {
    this.setState({showDropdown: !this.state.showDropdown});
  }

  render() {
    const CustomToggle = React.forwardRef(({children, onClick}, ref) => (
      <Button variant="searchbar"
              href=""
              ref={ref}
              onClick={e => {
                e.preventDefault();
                this.toggleDropdown();
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
        <Col className="col-sm-6 ">
          <UserAutosuggest ref={this.refOrigin}
                           placeholder="Introduceți numele"
                           includePrincipal={true}
                           prevSelectedUsers={this.state.originUsers}
                           actionType={UPDATE_SELECTED_USERS_FOR_ORIGIN_SEARCH}/>
        </Col>
      );
    }

    let specificPersonDestinationInput;
    if (this.state.destinationType === "O anumită persoană") {
      specificPersonDestinationInput = (
        <Col className="col-sm-6">
          <UserAutosuggest ref={this.refDestination}
                           placeholder="Introduceți numele"
                           includePrincipal={true}
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
          <Row className="mt-2">
            <Col className="col-sm-2 my-auto"/>
            <Col className="col-sm-4 my-auto">
              <DatePicker id="from"
                          name="from"
                          className="mr-2"
                          maxDate={this.state.to}
                          value={this.state.from.toLocaleDateString("en-GB")}
                          selected={this.state.from}
                          onChange={(e) => this.onDateChange("from", e)}/>
            </Col>
            <Col className="col-sm-4 my-auto">
              <DatePicker id="to"
                          name="to"
                          minDate={this.state.from}
                          maxDate={new Date()}
                          value={this.state.to.toLocaleDateString("en-GB")}
                          selected={this.state.to}
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
              <Row className="mt-3 align-items-baseline">
                <Col className="col-sm-2">
                  <strong>Emitent</strong>
                </Col>
                <Col className="col-sm-4">
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

              <Row className="mt-3 align-items-baseline">
                <Col className="col-sm-2">
                  <strong>Destinatar</strong>
                </Col>
                <Col className="col-sm-4">
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
                <Col className="col-sm-4 my-auto">
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
                    autoFocus={this.lastFieldChanged === "state" || this.lastFieldChanged === "searchStrDropdown"}
                    name="searchStrDropdown"
                    className="my-2 w-100"
                    placeholder="Introduceți un termen care face parte din titlu sau numărul de înregistrare"
                    onChange={this.onChangeSearchStr.bind(this)}
                    value={this.state.searchStr}
                  />
                </Col>
              </Row>

              <Row className="mt-3 align-items-center">
                <Col className="col-sm-2 my-auto">
                  <strong>Data înregistrării</strong>
                </Col>
                <Col className="col-sm-4 my-auto">
                  <Form.Control as="select"
                                value={this.state.createdDate}
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
                  <Button variant="light" className="mr-n2"
                          onClick={this.resetSearchDetails.bind(this)}
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
                         onChange={this.onChangeSearchStr.bind(this)}
                         className="mx-auto search-input">
            </FormControl>

            <InputGroup.Append className="ml-3">
              <Dropdown alignRight show={this.state.showDropdown}>
                <Dropdown.Toggle as={CustomToggle} ref={(node) => this.toggleButtonRef = node}/>
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
  getAllUsers: PropTypes.func.isRequired,
  getDocuments: PropTypes.func.isRequired,
  saveSearchDetails: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  documentReducer: state.documentReducer,
});

export default connect(mapStateToProps, {getAllUsers, getDocuments, saveSearchDetails})(DocumentSearch);
