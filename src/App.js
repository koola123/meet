import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { getEvents } from './api';

class App extends Component {

  state = {
    events: [],
    locations: []
  }


  updateEvents = (location) => {
    getEvents().then((events) => {
      const locationEvents = events.filter((event) => event.location === location);
      this.setState({
        events: locationEvents
      });
    });
  }

  render() {
    return (
      <div className="App">
      <h1>Meet App</h1>
      <h4>Choose your nearest city</h4>
      <CitySearch locations={this.state.locations} updateEvents={this.updateEvents}/>
      <EventList events={this.state.events} />
      <NumberOfEvents/>
     </div>
    );
  };
};

export default App;


