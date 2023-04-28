import React, { Component } from "react";
import "./App.css";
import EventList from "./EventList";
import CitySearch from "./CitySearch";
import NumberOfEvents from "./NumberOfEvents";
import { getEvents } from "./api";
import extractLocations from "./api";
import "./nprogress.css";
import { WarningAlert } from "./Alert";
import WelcomeScreen from "./WelcomeScreen";
import { checkToken, getAccessToken } from "./api";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import EventGenre from './EventGenre';



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      locations: [],
      selectedLocation: "all",
      numberOfEvents: 32,
      offlineText: "",
      showWelcomeScreen: undefined,
    };
  }

  async componentDidMount() {
    this.mounted = true;
    const accessToken = localStorage.getItem("access_token");
    const isTokenValid =
      !window.location.href.startsWith("http://localhost") &&
      !(accessToken && !navigator.onLine) &&
      (await checkToken(accessToken)).error
        ? false
        : true;
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");
    const byPassWelcomeScreen = code || isTokenValid;

    this.setState({ showWelcomeScreen: !byPassWelcomeScreen });

    if (byPassWelcomeScreen) {
      getEvents().then((events) => {
        if (this.mounted) {
          this.setState({
            events: events.slice(0,32),
            locations: extractLocations(events),
          });
        }
      });
    }
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

  getData = () => {
    const { locations, events } = this.state;
    const data = locations.map((location) => {
      const number = events.filter(
        (event) => event.location === location
      ).length;
      const city = location.split(", ").shift();
      return { city, number };
    });
    return data;
  };

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    if (this.state.showWelcomeScreen === undefined)
      return <div className="App" />;

    return this.state.showWelcomeScreen ? (
      <WelcomeScreen
        showWelcomeScreen={this.state.showWelcomeScreen}
        getAccessToken={() => getAccessToken()}
      />
    ) : (
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
        <div className="events-in-each-city-txt"><b>Events in each city</b></div>
        <div className="data-vis-wrapper">
          <EventGenre events={this.state.events} />
          <ResponsiveContainer height={400}>
          <ScatterChart
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20,
            }}
          >
            <CartesianGrid />
            <XAxis type="category" dataKey="city" name="city" />
            <YAxis type="number" dataKey="number" name="number of events" allowDecimals={false} />
            <Tooltip cursor={{ strokeDasharray: "3 3" }} />
            <Scatter data={this.getData()} fill="#8884d8" />
          </ScatterChart>
          </ResponsiveContainer>
          </div>
        <EventList events={this.state.events} />
      </div>
    );
  }
}

export default App;
