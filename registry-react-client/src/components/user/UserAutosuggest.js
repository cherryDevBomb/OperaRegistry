import Autosuggest from 'react-autosuggest';
import React, {Component} from "react";
import "../../style/user-autosuggest.css"
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import { getAllUsers } from "../../actions/userActions";
import PropTypes from "prop-types";
import {connect} from "react-redux";

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

    // let allUsers = [];
    // for (let i = 0; i < this.state.userReducer.allUsers.length; i++) {
    //   allUsers.push(this.state.userReducer.allUsers[i])
    // }
    // console.log(allUsers)
    const allUsers = [
      {userId: 2, firstName: "Viorel", lastName: "G", department: "GENERAL_MANAGER", email: "gv@gmail.com"},
      {userId: 3, firstName: "Vasea", lastName: "G", department: "GENERAL_MANAGER", email: "vas@gmail.com"}
    ]

    return inputLength === 0 ? [] : allUsers.filter(user =>
      (user.firstName.toLowerCase().slice(0, inputLength) === inputValue ||
      user.lastName.toLowerCase().slice(0, inputLength) === inputValue)
    );
  };

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
    this.setState({
      allSelectedUsers: [...this.state.allSelectedUsers, suggestion],
      value: ''
    })
  }

  onDismissClick = (e) => {
    let updatedValues = this.state.allSelectedUsers.filter(function(item) {
      return item.userId != e.userId;
    });
    this.setState({
      allSelectedUsers: updatedValues
    });
  }

  getFullName = (user) => {
    return user.firstName + " " + user.lastName + "   ";
  }

  render() {
    const {value, suggestions, allSelectedUsers, userReducer} = this.state;
    
    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: 'Introduceți destinatarul',
      value,
      onChange: this.onChange
    };

    let previousValues = [];
    for (let i = 0; i < this.state.allSelectedUsers.length; i++) {
      const currentValue = (
        <Button variant={"outline-dark"}>
          {this.getFullName(this.state.allSelectedUsers[i])}
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
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          onSuggestionSelected={this.onSuggestionSelected.bind(this)}
          getSuggestionValue={this.getSuggestionValue}
          renderSuggestion={this.renderSuggestion}
          inputProps={inputProps}
        />
      </div>
    );
  }
}

UserAutosuggest.propTypes = {
  userReducer: PropTypes.object.isRequired,
  getAllUsers: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  userReducer: state.userReducer
});

export default connect(mapStateToProps, { getAllUsers })(UserAutosuggest);
