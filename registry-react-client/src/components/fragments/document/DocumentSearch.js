import React, {Component} from "react";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import {connect} from "react-redux";
import {getDocuments} from "../../../actions/documentActions";
import PropTypes from "prop-types";
import InputGroup from "react-bootstrap/InputGroup";
import Dropdown from "react-bootstrap/Dropdown";
import "../../../style/reusables/documentSearch.css"
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import UserAutosuggest from "../user/UserAutosuggest";
import {
  UPDATE_SELECTED_USERS_FOR_DESTINATION_SEARCH,
  UPDATE_SELECTED_USERS_FOR_ORIGIN_SEARCH
} from "../../../actions/types";
import {getAllUsers} from "../../../actions/userActions";

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
      createdDate: "Oricând"
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
    console.log("DocSearch componentDidUpdate");
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
    // console.log("onChange in DocSearch triggered");
    this.setState({[e.target.name]: e.target.value});
  }

  onSubmit(e) {
    e.preventDefault();
    let origin = this.refOrigin.current.props.userReducer.selectedUsersForOriginSearch;
    let destination = this.refDestination.current.props.userReducer.selectedUsersForDestinationSearch;
    if (origin !== this.state.originUsers) {
      this.setState({originUsers: origin});
    }
    if (destination !== this.state.destinationUsers) {
      this.setState({destinationUsers: destination}, function () {
        console.log(this.state);
      });
    }

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

    const CustomDropdown = React.forwardRef(
      ({children, style, className, 'aria-labelledby': labeledBy}, ref) => {
        return (
          <div
            ref={ref}
            style={style}
            className={className}
            aria-labelledby={labeledBy}
          >
            <Container>
              <Row className="mt-3 align-items-center">
                <Col className="col-sm-2 my-auto">
                  <strong className="float-right">Emitent</strong>
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
                  <strong className="float-right">Destinatar</strong>
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

                  {/*<Form.Group controlId="formGroupTitle" className="mb-0">*/}
                  {/*  <Form.Control*/}
                  {/*    id="title"*/}
                  {/*    name="title"*/}
                  {/*    type="text"*/}
                  {/*    placeholder="Introduceți conținutul pe scurt al documentului"*/}
                  {/*    value={this.state.title}*/}
                  {/*    onChange={this.onChange}*/}
                  {/*  />*/}
                  {/*</Form.Group>*/}
                </Col>

                {specificPersonDestinationInput}
              </Row>


            </Container>
            <FormControl
              autoFocus
              name="searchStr"
              className="mx-3 my-2 w-auto"
              placeholder="Part of title"
              onChange={this.onChange}
              value={this.state.searchStr}
            />
          </div>
        );
      },
    );

    return (
      <Container className="searchContainer mx-auto shadow">
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
                <Dropdown.Menu as={CustomDropdown} className="dropdown-search mr-n2 mt-n1"/>
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
