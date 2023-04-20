import React, { Component } from 'react';

class NumberOfEvents extends Component {
    state = {
        errorText: '',
    };

    handleInputChanged = (event) => {
        const value = event.target.value;
        if (value < 0 || value > 32) {
          this.setState({
            errorText: "Please specify a number between 1-32.",
          });
        } else {
          this.props.updateEvents(undefined, value);
          this.setState({
            errorText: "",
            numberOfEvents: value,
          });
        };
      };


    render() {
        return (
            <div>
            <h3 className="title">Number of Events:</h3>
            <div style={{color: 'red'}}>{this.state.errorText}</div>
            <input
            type="number"
            className="numberOfEvents"
            value={this.props.numberOfEvents ? this.props.numberOfEvent : 32}
            onChange={(event) => this.handleInputChanged(event)}
            />
            </div>
        );
    };
};


export default NumberOfEvents;