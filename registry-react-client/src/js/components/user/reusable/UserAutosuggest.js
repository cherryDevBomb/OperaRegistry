import Autosuggest from 'react-autosuggest';
import React, {Component} from "react";
import "../../../../style/custom/autosuggest.css"
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getFullName} from "../../../utils/userUtils";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {getAllUsers, getUsersByRole, updateAllUsers, updateSelectedUsers} from "../../../redux/actions/userActions";

class UserAutosuggest extends Component {
  constructor(props) {
    super(props);

    let {prevSelectedUsers} = this.props;

    this.state = {
      value: '',
      suggestions: [],
      allSelectedUsers: prevSelectedUsers,
      userReducer: {}
    };
  }

  onChange = (event, {newValue}) => {
    this.setState({
      value: newValue
    });
  };

  clearPrevSelections() {
    this.setState({
      allSelectedUsers: []
    });
  }

  //how to calculate suggestions for any given input value.
  getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : this.props.userReducer.allUsers
      .map(section => {
        return {
          department: section.department,
          departmentName: section.departmentName,
          departmentUsers: section.departmentUsers.filter(user =>
            (user.firstName.toLowerCase().slice(0, inputLength) === inputValue ||
              user.lastName.toLowerCase().slice(0, inputLength) === inputValue))
        };
      })
      .filter(section => section.departmentUsers.length > 0);
  }

// returns value which will populate input when suggestion is selected
  getSuggestionValue = suggestion => getFullName(suggestion);

  renderSuggestion = suggestion => (
    <div>
      <Container>
        <Row><Col>
          {getFullName(suggestion)}
        </Col></Row>
        <Row><Col className="email-text">
          {suggestion.email}
        </Col></Row>
      </Container>
    </div>
  );

  renderSectionTitle(section) {
    return (
      <strong>{section.departmentName}</strong>
    );
  }

  getSectionSuggestions(section) {
    return section.departmentUsers;
  }

  onSuggestionsFetchRequested = ({value}) => {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  onSuggestionSelected = (event, {suggestion, suggestionValue, suggestionIndex, sectionIndex, method}) => {
    event.preventDefault();

    //update selectedUsers list
    const newListOfSelectedUsers = [...this.state.allSelectedUsers, suggestion];
    this.setState({
      allSelectedUsers: newListOfSelectedUsers,
      value: ''
    })
    const {actionType} = this.props
    this.props.updateSelectedUsers(newListOfSelectedUsers, actionType);

    //update remaining suggestion possibilities
    let remainingUsers = this.props.userReducer.allUsers
      .map(section => {
        return {
          department: section.department,
          departmentName: section.departmentName,
          departmentUsers: section.departmentUsers.filter(item =>
            item.userId !== suggestion.userId
          )
        };
      })
    this.props.updateAllUsers(remainingUsers);
  }

  onDismissClick = (e) => {
    //update selectedUsers list
    let updatedValues = this.state.allSelectedUsers.filter(function (item) {
      return item.userId !== e.userId;
    });
    this.setState({
      allSelectedUsers: updatedValues
    });
    const {actionType} = this.props
    this.props.updateSelectedUsers(updatedValues, actionType);

    //update remaining suggestion possibilities
    let remainingUsers = this.props.userReducer.allUsers
      .map(section => {
        return {
          department: section.department,
          departmentName: section.departmentName,
          departmentUsers: (e.department === section.departmentName) ? [...section.departmentUsers, e] : section.departmentUsers
        }
      });
    this.props.updateAllUsers(remainingUsers);
  }

  render() {
    const {value, suggestions} = this.state;
    const {placeholder} = this.props;

    const showPlaceholder = this.state.allSelectedUsers.length === 0 ? placeholder : "";
    const inputProps = {
      placeholder: showPlaceholder,
      value,
      onChange: this.onChange
    };

    let previousValues = [];
    for (let i = 0; i < this.state.allSelectedUsers.length; i++) {
      const currentValue = (
        <Button variant="autosuggest" size="sm" key={this.state.allSelectedUsers[i].userId}>
          {getFullName(this.state.allSelectedUsers[i])}
          <i className="fas fa-times-circle fa-times-circle-close"
             onClick={() => this.onDismissClick(this.state.allSelectedUsers[i])}/>
        </Button>
      );
      previousValues = [...previousValues, currentValue];
    }

    return (
      <div className={"autosuggest-container"}>
        {previousValues}
        <Autosuggest
          multiSection={true}
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          onSuggestionSelected={this.onSuggestionSelected.bind(this)}
          getSuggestionValue={this.getSuggestionValue}
          renderSuggestion={this.renderSuggestion}
          renderSectionTitle={this.renderSectionTitle}
          getSectionSuggestions={this.getSectionSuggestions}
          inputProps={inputProps}
        />
      </div>
    );
  }
}

UserAutosuggest.propTypes = {
  userReducer: PropTypes.object.isRequired,
  getAllUsers: PropTypes.func.isRequired,
  getUsersByRole: PropTypes.func.isRequired,
  updateSelectedUsers: PropTypes.func.isRequired,
  updateAllUsers: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  userReducer: state.userReducer
});

export default connect(mapStateToProps, {
  getAllUsers,
  getUsersByRole,
  updateSelectedUsers,
  updateAllUsers
}, null, {forwardRef: true})(UserAutosuggest);
