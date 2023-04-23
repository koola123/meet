import { loadFeature, defineFeature } from "jest-cucumber";
import React from "react";
import { shallow, mount } from "enzyme";
import mockData from "../mock-data";
import Event from "../Event";
import App from "../App";

const feature = loadFeature("./src/features/showHideAnEventsDetails.feature");

defineFeature(feature, (test) => {
  let EventWrapper, AppWrapper, event;

  beforeEach(() => {
    event = mockData[0];
    AppWrapper = mount(<App />);
    EventWrapper = shallow(<Event event={event} />);
  });

  afterEach(() => {
    AppWrapper.unmount();
  })

  test("An event element is collapsed by default", ({ given, when, then }) => {
    given("the main page was open", () => {});

    when("the user sees a list of events are loaded", () => {
        expect(AppWrapper.find(Event).length).not.toBe(0);
    });

    then("the details of the events are invisible", () => {
      const detailsButton = EventWrapper.find(".details-btn");
      expect(EventWrapper.state("collapsed")).toBe(true);
      expect(detailsButton).toBeDefined();
      expect(detailsButton.text()).toBe("Show Details");
      expect(EventWrapper.find(".about")).toHaveLength(0);
      expect(EventWrapper.find(".link")).toHaveLength(0);
      expect(EventWrapper.find(".description")).toHaveLength(0);
    });
  });

  test("User can expand an event to see its details", ({
    given,
    when,
    and,
    then,
  }) => {
    given("the main page was open", () => {});

    when("the user see list of events are loaded", () => {});

    and("click on the “Show Details” button on any of the event card", () => {
      AppWrapper.find(Event).simulate("click");
    });

    then(
      "specific event is being expanded with details and the „Show Details” button is replace by the „Hide Details” button",
      () => {
        expect(EventWrapper.find(".about")).toHaveLength(1);
        expect(EventWrapper.find(".link")).toHaveLength(1);
        expect(EventWrapper.find(".description")).toHaveLength(1);
        expect(EventWrapper.state("collapsed")).toBe(false);
        expect(EventWrapper.find(".details-btn").text()).toBe(
          "Hide Details"
        );
      }
    );
  });

  test("User can collapse an event to hide its details", ({
    given,
    and,
    when,
    then,
  }) => {
    given("the main page was open", () => {});

    and(
      "the user clicked on the “Show Details” button on any of the event card",
      () => {
        const detailsButton = AppWrapper.find(Event).find('.details-btn');
      }
    );

    when(
      "user clicks on the “Hide Details” button on any of the event cards that were clicked in the previous step",
      () => {
        const detailsButton = EventWrapper.find(".details-btn");
        detailsButton.simulate("click");
      }
    );

    then(
      "the specific event is being collapsed and the event card will be shown without details",
      () => {
        expect(EventWrapper.state("collapsed")).toBe(true);
        expect(EventWrapper.find(".about")).toHaveLength(0);
        expect(EventWrapper.find(".link")).toHaveLength(0);
        expect(EventWrapper.find(".description")).toHaveLength(0);
        expect(EventWrapper.find(".details-btn").text()).toBe(
          "Show Details"
        );
      }
    );
  });
});