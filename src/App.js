import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';

class App extends Component {

  render() {
    return (
      <div className="App">
      <h1>Meet App</h1>
      <h4>Choose your nearest city</h4>
      <CitySearch suggestions={[]}/>
      <EventList events={[]} />
     </div>
    );
  };
};

export default App;


