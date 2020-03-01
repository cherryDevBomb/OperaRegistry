import Autosuggest from 'react-autosuggest';
import React, {Component} from "react";
import "../../style/user-autosuggest.css"
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import {getAllUsers, updateSelectedUsers} from "../../actions/userActions";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getFullName} from "../../securityUtils/userUtils";

class UserAutosuggest extends Component {
  componentDidMount() {
    this.props.getAllUsers();
  }

  constructor() {
    super();

    this.state = {
      value: '',
      suggestions: [],
      allSelectedUsers: [],
      userReducer: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.userReducer) {
      this.setState({userReducer: nextProps.userReducer});
    }
  }

  onChange = (event, {newValue}) => {
    this.setState({
      value: newValue
    });
  };

  // Teach Autosuggest how to calculate suggestions for any given input value.
  getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return this.state.userReducer.allUsers
      .map(section => {
        return {
          departmentName: section.departmentName,
          departmentUsers: section.departmentUsers.filter(user =>
            (user.firstName.toLowerCase().slice(0, inputLength) === inputValue ||
              user.lastName.toLowerCase().slice(0, inputLength) === inputValue))
        };
      })
      .filter(section => section.departmentUsers.length > 0);
  }

//WORKIIIIIIIIIIIING
    // return inputLength === 0 ? [] : this.state.userReducer.allUsers.filter(user =>
    //   (user.firstName.toLowerCase().slice(0, inputLength) === inputValue ||
    //     user.lastName.toLowerCase().slice(0, inputLength) === inputValue)
    // );
  // };

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
  getSuggestionValue = suggestion => suggestion.firstName;

// Use your imagination to render suggestions.
  renderSuggestion = suggestion => (
    <div>
      {suggestion.firstName}
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

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({value}) => {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  onSuggestionSelected = (event, {suggestion, suggestionValue, suggestionIndex, sectionIndex, method}) => {
    event.preventDefault();
    const newListOfSelectedUsers = [...this.state.allSelectedUsers, suggestion];
    // console.log(newListOfSelectedUsers);

    this.setState({
      allSelectedUsers: newListOfSelectedUsers,
      value: ''
    })

    // console.log("all seleted users in inner state:")
    // console.log(this.state.allSelectedUsers);

    //update redux store
    this.props.updateSelectedUsers(newListOfSelectedUsers);

    // console.log("added " + suggestionValue);
    // console.log(this.state.userReducer.selectedUsers);
  }

  onDismissClick = (e) => {
    let updatedValues = this.state.allSelectedUsers.filter(function (item) {
      return item.userId != e.userId;
    });
    this.setState({
      allSelectedUsers: updatedValues
    });

    this.props.updateSelectedUsers(updatedValues);
    //console.log("deleted " + e);
    //console.log(this.state.userReducer.selectedUsers);
  }

  render() {
    const {value, suggestions, allSelectedUsers, userReducer} = this.state;
    console.log(this.state.userReducer.allUsers)

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: 'Introduceți destinatarul',
      value,
      onChange: this.onChange
    };

    console.log(this.state.allSelectedUsers)
    console.log(this.state.userReducer.selectedUsers)
    let previousValues = [];
    for (let i = 0; i < this.state.allSelectedUsers.length; i++) {
      const currentValue = (
        <Button variant={"outline-dark"}>
          {getFullName(this.state.allSelectedUsers[i])}
          <Badge pill variant="primary" onClick={() => this.onDismissClick(this.state.allSelectedUsers[i])}>
            X
          </Badge>
        </Button>
      );
      previousValues = [...previousValues, currentValue];
    }

    // Finally, render it!
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
  updateSelectedUsers: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  userReducer: state.userReducer
});

export default connect(mapStateToProps, {getAllUsers, updateSelectedUsers})(UserAutosuggest);
