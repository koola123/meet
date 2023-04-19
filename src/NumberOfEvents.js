import React, { Component } from 'react';


class NumberOfEvents extends Component {
    render() {
        return (
            <div>
            <h3 className="title">Number of Events:</h3>
            <input
            type="text"
            className="numberOfEvents"
            value={32}
            />

            </div>
        );
    };
};


export default NumberOfEvents;