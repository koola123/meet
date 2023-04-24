import { loadFeature, defineFeature } from "jest-cucumber";
import React from "react";
import { mount } from "enzyme";
import App from "../App";
import NumberOfEvents from "../NumberOfEvents";
import mockData from "../mock-data";
import Event from '../Event';

const feature = loadFeature("./src/features/specifyNumberOfEvents.feature");

defineFeature(feature, (test) => {
  let AppWrapper;

  beforeEach(() => {
    AppWrapper = mount(<App />);
  });

  afterEach(() => {
    AppWrapper.unmount();
  });

  test("When user hasn’t specified a number, 32 is the default number", ({
    given,
    when,
    then,
  }) => {
    given("the main page was open", async () => {
      await AppWrapper.update();
    });

    when("user does not specify the number of events to be shown", () => {});

    then(
      "the user will receive the first 32 upcoming events on the screen",
      () => {
       expect(AppWrapper.find(NumberOfEvents).find('.numberOfEvents').prop("type")).toBe("number");
       expect(AppWrapper.find(NumberOfEvents).find('.numberOfEvents').prop("value")).toEqual(32);
       expect(AppWrapper.state('numberOfEvents')).toEqual(32);
       expect(AppWrapper.find(Event).length).toEqual(mockData.slice(0,32).length);
      }
    );
  });

  test("User can change the number of events they want to see", ({
    given,
    when,
    then,
  }) => {
    given("the main page was open", async () => {
      await AppWrapper.update();
    });

    when("user types in the number of events to be shown", async () => {
      const eventObject = { target: { value: 2 } };
      AppWrapper.find(NumberOfEvents).find('.numberOfEvents').simulate('change', eventObject);
    });

    then(
      "user will receive the “typed” number of upcoming events on the screen",
      async () => {
        await AppWrapper.update();
        expect(AppWrapper.find(Event)).toHaveLength(2);
      }
    );
  });
});
