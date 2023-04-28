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

describe("<EventList /> integration", () => {
  test("the default number of Event components rendered is 32", async () => {
   const AppWrapper = await mount(<App />);
   await AppWrapper.update();
    expect(AppWrapper.find(Event)).toHaveLength(32);
  });
});
