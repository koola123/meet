import { loadFeature, defineFeature } from "jest-cucumber";
import React from "react";
import { mount } from "enzyme";
import App from "../App";
import mockData from "../mock-data";
import CitySearch from "../CitySearch";

const feature = loadFeature("./src/features/filterEventsByCity.feature");

defineFeature(feature, (test) => {

  test("When user hasn’t searched for a city, show upcoming events from all cities.", ({
    given,
    when,
    then,
  }) => {
    given("user hasn’t searched for any city", () => {});

    let AppWrapper;
    when("the user opens the app", () => {
      AppWrapper = mount(<App />);
    });

    then("the user should see the list of upcoming events.", () => {
      AppWrapper.update();
      expect(AppWrapper.find(".Event")).toHaveLength(32);
    });
  });

  test("User should see a list of suggestions when they search for a city", ({
    given,
    when,
    then,
  }) => {
    let AppWrapper;
    given("the main page is open", () => {
      AppWrapper = mount(<App />);
    });

    when("the user starts typing in the city textbox", () => {
      AppWrapper.find(CitySearch)
        .find(".city")
        .simulate("change", {
          target: { value: "Berlin" },
        });
    });

    then(
      "the user should receive a list of cities (suggestions) that match what they’ve typed",
      () => {
        expect(
          AppWrapper.find(CitySearch).find(".suggestions li")
        ).toHaveLength(2);
        AppWrapper.unmount();
      }
    );
  });

  test("User can select a city from the suggested list", ({
    given,
    and,
    when,
    then,
  }) => {
    let AppWrapper;
    given("user was typing “Berlin” in the city textbox", async () => {
      AppWrapper = await mount(<App />);
      AppWrapper.find(".city").simulate("change", {
        target: { value: "Berlin" },
      });
    });

    and("the list of suggested cities is showing", () => {
      expect(AppWrapper.find(".suggestions li")).toHaveLength(2);
    });

    when(
      "the user selects a city (e.g., “Berlin, Germany”) from the list",
      () => {
        AppWrapper.find(".suggestions li").at(0).simulate("click");
      }
    );

    then(
      "their city should be changed to that city (i.e., “Berlin, Germany”)",
      () => {
        expect(AppWrapper.find(CitySearch).state("query")).toBe(
          "Berlin, Germany"
        );
      }
    );

    and(
      "the user should receive a list of upcoming events in that city",
      async () => {
        const berlinGermanyEvents = mockData.filter(event => event.location === "Berlin, Germany");
        await AppWrapper.update();
        expect(AppWrapper.find(".Event")).toHaveLength(berlinGermanyEvents.length);
      }
    );
  });
});
