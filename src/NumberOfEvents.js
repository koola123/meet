import React, { Component } from 'react';

class NumberOfEvents extends Component {

    state = {
        query: 32,
    }

    handleInputChanged = (event) => {
        const value = event.target.value;
        this.setState({
          query: value,
        });
      };


    render() {
        return (
            <div>
            <h3 className="title">Number of Events:</h3>
            <input
            type="number"
            className="numberOfEvents"
            value={this.state.query}
            onChange={this.handleInputChanged}
            />
            </div>
        );
    };
};


export default NumberOfEvents;