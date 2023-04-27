import React from "react";
import { shallow, mount } from "enzyme";
import EventList from "../EventList";
import Event from "../Event";
import mockData from "../mock-data";
import App from '../App';

describe("<EventList /> component", () => {
  test("render correct number of events", () => {
    const EventListWrapper = shallow(<EventList events={mockData} />);
    expect(EventListWrapper.find(Event)).toHaveLength(mockData.length);
  });
});

describe("<EventList integration", () => {
  test("when the App component is rendered, then the number of Event components rendered by default is 32", () => {
   const AppWrapper = mount(<App />);
    expect(AppWrapper.state("numberOfEvents")).toBe(32);
  });
});
