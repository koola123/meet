import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';

class App extends Component {

  state = {
    events: [],
    locations: []
  }

  render() {
    return (
      <div className="App">
      <h1>Meet App</h1>
      <h4>Choose your nearest city</h4>
      <CitySearch locations={this.state.locations}/>
      <EventList events={this.state.events} />
      <NumberOfEvents/>
     </div>
    );
  };
};

export default App;


