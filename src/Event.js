import React, { Component } from 'react';


class Event extends Component {

    state = {
        collapsed: true
    };

    toggleDetails = () => {
        this.setState((prevState) => ({
            collapsed: !prevState.collapsed,
        }));
    };

    render() {
        const { event } = this.props;
        const { collapsed } = this.state;
        return(
            <div className="Event">
                <h2>{event.summary}</h2>
                <p id="event-start">{event.start.dateTime}</p>
                <p id="event-location">{`Location: ${event.location}`}</p>
                {!collapsed && (
                    <div className="event-details">
                        <h3 className="about">About this event:</h3>
                        <a 
                        className="link" 
                        href={event.htmlLink}
                        target="_blank"
                        rel="noopener noreferrer">
                            See details on Google Calendar
                        </a>
                        <p className="description">{event.description}</p>
                    </div>
                )}
               <button 
               className="details-btn"
               onClick={this.toggleDetails}>
               { collapsed ? "Show" : "Hide" } Details
            </button>
            </div>
        );
    };
};

export default Event;