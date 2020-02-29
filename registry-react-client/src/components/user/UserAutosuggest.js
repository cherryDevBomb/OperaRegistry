import Autosuggest from 'react-autosuggest';
import React, {Component} from "react";
import "../../style/user-autosuggest.css"
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";

// Imagine you have a list of languages that you'd like to autosuggest.
const languages = [
  {
    id: 1,
    name: 'C++',
    year: 1972
  },
  {
    id: 2,
    name: 'C1',
    year: 1972
  },
  {
    id: 3,
    name: 'C2',
    year: 1972
  },
  {
    id: 4,
    name: 'Elm',
    year: 2012
  }
];

// Teach Autosuggest how to calculate suggestions for any given input value.
const getSuggestions = value => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0 ? [] : languages.filter(lang =>
    lang.name.toLowerCase().slice(0, inputLength) === inputValue
  );
};

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion.name;

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => (
  <div>
    {suggestion.name}
  </div>
);

class UserAutosuggest extends Component {
  constructor() {
    super();

    // Autosuggest is a controlled component.
    // This means that you need to provide an input value
    // and an onChange handler that updates this value (see below).
    // Suggestions also need to be provided to the Autosuggest,
    // and they are initially empty because the Autosuggest is closed.
    this.state = {
      value: '',
      suggestions: [],
      allValues: []
    };
  }

  onChange = (event, {newValue}) => {
    this.setState({
      value: newValue
    });
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({value}) => {
    this.setState({
      suggestions: getSuggestions(value)
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
      allValues: [...this.state.allValues, suggestion],
      value: ''
    })
  }

  onDismissClick = (e) => {
    console.log(e);
    let updatedValues = this.state.allValues.filter(function(item) {
      return item.id != e.id;
    });
    this.setState({
      allValues: updatedValues
    });
  }

  render() {
    const {value, suggestions} = this.state;

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: 'Type a programming language',
      value,
      onChange: this.onChange
    };

    let previousValues = [];
    for (let i = 0; i < this.state.allValues.length; i++) {
      const currentValue = (
        //<Badge variant="secondary" size="lg">
        <Button variant={"outline-dark"}>
          {this.state.allValues[i].name}
          <Badge pill variant="primary" onClick={() => this.onDismissClick(this.state.allValues[i])}>
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
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
        />
      </div>
    );
  }
}

export default UserAutosuggest;