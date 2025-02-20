import React, {Component} from "react";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import {connect} from "react-redux";
import {getDocuments, saveSearchDetails} from "../../../redux/actions/documentActions";
import PropTypes from "prop-types";
import InputGroup from "react-bootstrap/InputGroup";
import Dropdown from "react-bootstrap/Dropdown";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import UserAutosuggest from "../../user/reusable/UserAutosuggest";
import {
  UPDATE_SELECTED_USERS_FOR_DESTINATION_SEARCH,
  UPDATE_SELECTED_USERS_FOR_ORIGIN_SEARCH
} from "../../../redux/actions/actionTypes";
import {getAllUsers, updateAllUsers, updateSelectedUsers} from "../../../redux/actions/userActions";
import DatePicker from "react-datepicker/es";
import 'react-datepicker/dist/react-datepicker.css';
import "../../../../style/custom/document-search.css"
import {getDefaultSearchDetails} from "../../../utils/documentSearchUtils";
import Spinner from "react-bootstrap/Spinner";

class DocumentSearch extends Component {
  constructor(props) {
    super(props);

    this.refOrigin = React.createRef();
    this.refDestination = React.createRef();
    this.toggleButtonRef = React.createRef();

    const {searchDetails} = this.props.documentReducer;
    this.state = searchDetails;

    this.lastFieldChanged = "";
    this.isLoading = false;

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.setState({showDropdown: false});
    this.setState({isLoading: false});
    this.getUsersNotSelected();
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    let snapshot = {};
    let selectedUsersForOriginSearch = this.props.userReducer.selectedUsersForOriginSearch;
    if (selectedUsersForOriginSearch && selectedUsersForOriginSearch !== this.state.originUsers) {
      snapshot.origin = selectedUsersForOriginSearch;
    }
    let selectedUsersForDestinationSearch = this.props.userReducer.selectedUsersForDestinationSearch;
    if (selectedUsersForDestinationSearch && selectedUsersForDestinationSearch !== this.state.destinationUsers) {
      snapshot.destination = selectedUsersForDestinationSearch;
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
    this.props.getAllUsers(false);
  }

  async getUsersNotSelected() {
    await this.props.getAllUsers(true);
    const selectedOrigin = this.props.userReducer.selectedUsersForOriginSearch;
    const selectedDestination = this.props.userReducer.selectedUsersForDestinationSearch;

    let remainingUsers = this.props.userReducer.allUsers
      .map(section => {
        return {
          department: section.department,
          departmentName: section.departmentName,
          departmentUsers: section.departmentUsers.filter(item => {
              const includedInOrigin = selectedOrigin.some(selectedItem => selectedItem.userId === item.userId);
              const includedInDestination = selectedDestination.some(selectedItem => selectedItem.userId === item.userId);
              return !includedInOrigin && !includedInDestination;
            }
          )
        };
      })
    this.props.updateAllUsers(remainingUsers);
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
      if (key === "searchStr") {
        this.props.getDocuments(this.state, 1);
        this.props.saveSearchDetails(this.state);
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

  async resetSearchDetails() {
    this.setState({isLoading: true});

    await this.props.updateSelectedUsers([], UPDATE_SELECTED_USERS_FOR_ORIGIN_SEARCH);
    await this.props.updateSelectedUsers([], UPDATE_SELECTED_USERS_FOR_DESTINATION_SEARCH);
    await this.refOrigin.current && this.refOrigin.current.clearPrevSelections();
    await this.refDestination.current && this.refDestination.current.clearPrevSelections();

    const newState = getDefaultSearchDetails();
    this.props.saveSearchDetails(newState);
    await this.setState(
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
        this.props.getDocuments(this.state, 1);
      }
    )

    this.setState({isLoading: false});

    if (this.state.showDropdown === true) {
      this.toggleButtonRef.click();
    }
  }

  async onSubmit(e) {
    e.preventDefault();
    await this.setState({isLoading: true});

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
      await this.setState({originUsers: origin}, () => {
        this.props.saveSearchDetails(this.state);
        this.props.getDocuments(this.state, 1);
      });
    } else if (destination && (destination !== this.state.destinationUsers)) {
      await this.setState({destinationUsers: destination}, () => {
        this.props.saveSearchDetails(this.state);
        this.props.getDocuments(this.state, 1);
      });
    } else {
      await this.props.saveSearchDetails(this.state);
      await this.props.getDocuments(this.state, 1);
    }

    this.setState({isLoading: false});

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
        <Col xs={12} sm={6} className="mt-2 mt-sm-0">
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
        <Col xs={12} sm={6} className="mt-2 mt-sm-0">
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
            <Col xs={0} sm={2} className="my-auto"/>
            <Col className="mt-3">Între:</Col>
          </Row>
          <Row className="mt-2">
            <Col xs={0} sm={2} className="my-auto"/>
            <Col sm={4} className="my-auto">
              <DatePicker id="from"
                          name="from"
                          className="mr-2"
                          maxDate={this.state.to}
                          value={this.state.from.toLocaleDateString("en-GB")}
                          selected={this.state.from}
                          onChange={(e) => this.onDateChange("from", e)}/>
            </Col>
            <Col sm={4} className="my-auto mt-3 mt-sm-0">
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
                <Col xs={5} sm={2}>
                  <strong>Emitent</strong>
                </Col>
                <Col xs={7} sm={4}>
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
                <Col xs={5} sm={2}>
                  <strong>Destinatar</strong>
                </Col>
                <Col xs={7} sm={4}>
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
                <Col xs={5} sm={2} className="my-auto">
                  <strong>Stare</strong>
                </Col>
                <Col xs={7} sm={4} className="my-auto">
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
                <Col xs={5} sm={2} className="my-auto">
                  <strong>Nume</strong>
                </Col>
                <Col xs={7} sm={10} className="my-auto w-100">
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
                <Col xs={5} sm={2} className="my-auto">
                  <strong>Data înregistrării</strong>
                </Col>
                <Col xs={7} sm={4} className="my-auto">
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
                {this.state.isLoading &&
                <Spinner
                  animation="border"
                  variant="brownish"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />}
                {!this.state.isLoading && <i className="fas fa-search"></i>}

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
  userReducer: PropTypes.object.isRequired,
  getAllUsers: PropTypes.func.isRequired,
  getDocuments: PropTypes.func.isRequired,
  saveSearchDetails: PropTypes.func.isRequired,
  updateAllUsers: PropTypes.func.isRequired,
  updateSelectedUsers: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  documentReducer: state.documentReducer,
  userReducer: state.userReducer,
});

export default connect(mapStateToProps, {
  getAllUsers,
  getDocuments,
  saveSearchDetails,
  updateAllUsers,
  updateSelectedUsers
})(DocumentSearch);
