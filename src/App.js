import React, { Component } from "react";
import "./App.css";
import EventList from "./EventList";
import CitySearch from "./CitySearch";
import NumberOfEvents from "./NumberOfEvents";
import { getEvents } from "./api";
import extractLocations from "./api";
import "./nprogress.css";
import { WarningAlert } from "./Alert";
import WelcomeScreen from './WelcomeScreen';
import { checkToken, getAccessToken } from './api';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      locations: [],
      selectedLocation: "all",
      numberOfEvents: 32,
      offlineText: "",
      showWelcomeScreen: undefined
    };
  }

  async componentDidMount() {
    this.mounted = true;
    const accessToken = localStorage.getItem('access_token');
    const isTokenValid = (await checkToken(accessToken)).error ?  false : true;
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get('code');
    this.setState({ showWelcomeScreen: !(code || isTokenValid) });
    if ((code || isTokenValid) && this.mounted) {
      getEvents().then((events) => {
        if (this.mounted) {
          this.setState({ events, locations: extractLocations(events) });
        }
      });
    }
    
    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({
          events: events,
          locations: extractLocations(events),
        });
      }
    });
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  updateEvents = (
    location = this.state.selectedLocation,
    eventCount = this.state.numberOfEvents
  ) => {
    getEvents().then((events) => {
      const locationEvents =
        location === "all"
          ? events
          : events.filter((event) => event.location === location);
      this.setState({
        events: locationEvents.slice(0, eventCount),
        numberOfEvents: eventCount,
      });
    });
    if (!navigator.onLine) {
      this.setState({
        offlineText:
          "The network is offline. The initial list is loaded from memory.",
      });
    } else {
      this.setState({
        offlineText: "",
      });
    }
  };

  render() {
    if (this.state.showWelcomeScreen === undefined) return <div className="App"/>
    
    return (
      <div className="App">
        <h1>Meet App</h1>
        <WarningAlert text={this.state.offlineText} />
        <h4>Choose your nearest city</h4>
        <CitySearch
          locations={this.state.locations}
          updateEvents={this.updateEvents}
        />
        <NumberOfEvents
          numberOfEvents={this.state.numberOfEvents}
          updateEvents={this.updateEvents}
        />
        <EventList events={this.state.events} />
        <WelcomeScreen showWelcomeScreen={this.state.showWelcomeScreen} getAccessToken={() => getAccessToken()} />
      </div>
    );
  }
}

export default App;
