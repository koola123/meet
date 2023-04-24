import { loadFeature, defineFeature } from "jest-cucumber";
import React from "react";
import { mount } from "enzyme";
import Event from "../Event";
import App from "../App";

const feature = loadFeature("./src/features/showHideAnEventsDetails.feature");

defineFeature(feature, (test) => {
  let AppWrapper;

  beforeEach(() => {
    AppWrapper = mount(<App />);
  });

  afterEach(() => {
    AppWrapper.unmount();
  })

  test("An event element is collapsed by default", ({ given, when, then }) => {

    given("the main page was open", async () => {
      await AppWrapper.update();
    });
 
    when("the user sees a list of events are loaded", () => {
        expect(AppWrapper.find(Event).length).toBeGreaterThan(0);
    });

    then("the details of the events are invisible", () => {
      AppWrapper.find(Event).forEach(eventComponent => { 
        expect(eventComponent.find('.event-details')).toHaveLength(0);
        expect(eventComponent.state('collapsed')).toBe(true);
        expect(eventComponent.find('.details-btn').text()).toBe('Show Details');
      });
    });
  });

  test("User can expand an event to see its details", ({
    given,
    when,
    and,
    then,
  }) => {
    given("the main page was open", async () => {
      await AppWrapper.update();
    });

    when("the user sees a list of events are loaded", () => {
      expect(AppWrapper.find(Event).length).toBeGreaterThan(0);
    });

    and("click on the “Show Details” button on any of the event card", () => {
      AppWrapper.find(Event).at(0).find('.details-btn').simulate('click');
    });

    then(
      "specific event is being expanded with details and the „Show Details” button is replace by the „Hide Details” button",
      () => {
        expect(AppWrapper.find(Event).at(0).find('.event-details')).toHaveLength(1);
        expect(AppWrapper.find(Event).at(0).state('collapsed')).toBe(false);
        expect(AppWrapper.find(Event).at(0).find('.details-btn').text()).toBe('Hide Details');
      }
    );
  });

  test("User can collapse an event to hide its details", ({
    given,
    and,
    when,
    then,
  }) => {
    given("the main page was open", async () => {
      await AppWrapper.update();
    });
    
    and(
      "the user clicked on the “Show Details” button on any of the event card",
      () => {
        AppWrapper.find(Event).at(0).find('.details-btn').simulate('click');
      }
    );

    when(
      "user clicks on the “Hide Details” button on any of the event cards that were clicked in the previous step",
      () => {
        AppWrapper.find(Event).at(0).find('.details-btn').simulate('click');
      }
    );

    then(
      "the specific event is being collapsed and the event card will be shown without details",
      () => {
        expect(AppWrapper.find(Event).at(0).find('.event-details')).toHaveLength(0);
        expect(AppWrapper.find(Event).at(0).state('collapsed')).toBe(true);
        expect(AppWrapper.find(Event).at(0).find('.details-btn').text()).toBe('Show Details');
      }
    );
  });
});