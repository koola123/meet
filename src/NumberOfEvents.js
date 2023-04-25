import React, { Component } from "react";
import { ErrorAlert } from './Alert';

class NumberOfEvents extends Component {
  state = {
    numberOfEvents: 32,
    errorText: '',
  };

  handleInputChanged = (event) => {
    const value = event.target.value;
    if (value < 0 || value > 100) {
      this.setState({
        errorText: "Specify a number between 1 to 100."
      });
    } else {
      this.props.updateEvents(undefined, value);
      this.setState({
        errorText: "",
        numberOfEvents: value
      });
    }
  };

  render() {
    return (
      <div>
        <h3 className="title">Number of Events:</h3>
        <input
          type="number"
          className="numberOfEvents"
          value={this.state.numberOfEvents}
          onChange={(event) => this.handleInputChanged(event)}
        />
        <span className="error-alert-msg">
        <ErrorAlert text={this.state.errorText}/>
        </span>
      </div>
    );
  }
}

export default NumberOfEvents;
