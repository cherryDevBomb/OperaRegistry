import React, {Component} from "react";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import {connect} from "react-redux";
import {getDocuments} from "../../../actions/documentActions";
import PropTypes from "prop-types";
import Jumbotron from "react-bootstrap/Jumbotron";
import InputGroup from "react-bootstrap/InputGroup";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import "../../../style/reusables/documentSearch.css"
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import UserAutosuggest from "../user/UserAutosuggest";

class DocumentSearch extends Component {
  constructor() {
    super();

    this.state = {
      originType: "Oricare",
      origin: "",
      destinationType: "Oricare",
      destination: "",
      state: "Oricare",
      searchStr: "",
      createdDate: "Oricând"
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  // onChangeOriginType(e) {
  //   console.log(e.target.value);
  //   this.setState({originType: e.target.value});
  // }

  onSubmit(e) {
    e.preventDefault();
    console.log(this.state.searchStr);
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

    let specificPersonInput;
    if (this.state.originType === "Creat de o anumită persoană") {
      specificPersonInput = (
        <Col className="col-sm-5 my-auto">
          <UserAutosuggest/>
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
                  <strong className="float-right">Origine</strong>
                </Col>

                <Col className="col-sm-5 my-auto">
                  <Form.Control as="select"
                                value={this.state.originType}
                                // onChange={(e) => this.onChangeOriginType(e)}>
                                onChange={(e) => this.setState( {originType: e.target.value})}>
                    <option value="Oricare">Oricare</option>
                    <option value="Internă">Internă</option>
                    <option value="Externă">Externă</option>
                    <option value="Creat de o anumită persoană">Creat de o anumită persoană</option>
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
                {specificPersonInput}
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
                         placeholder="Search"
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
  getDocuments: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  documentReducer: state.documentReducer
});

export default connect(mapStateToProps, {getDocuments})(DocumentSearch);
