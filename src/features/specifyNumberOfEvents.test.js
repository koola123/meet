import React from 'react';
import { mount, shallow } from 'enzyme';
import App from '../App';
import { mockData } from '../mock-data';
import { extractLocations } from '../api';
import CitySearch from '../CitySearch';

import { loadFeature, defineFeature } from 'jest-cucumber';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, test => {
  test('When a user has not specified a number, 32 is the default number', ({ given, when, then }) => {
    let AppWrapper;
    given('the user has not selected a number of events in a city', () => {
      AppWrapper = mount(<App />);
    });

    when('the user has not entered any number into the textfield ', () => {

    });
      // Default is 32; mockData has two events
    then('the user should see all events in that city he has selected', () => {
      AppWrapper.update();
      expect(AppWrapper.find('.EventItem')).toHaveLength(2);
      expect(AppWrapper.state('numberOfEvents')).toBe(32);
      AppWrapper.unmount();
    });

  test('User can change the number of events they want to see', ({ given, when, then }) => {
    let AppWrapper;
    given('the user is typing a number in the number of events textbox, he wants to see', () => {
      AppWrapper = mount(<App />);
    });
  });

    when('the user types a number in the number of events textbox', () => {
      AppWrapper.find('.numberInput').simulate('change', { target: { value: '1'} });
    });

    then('the number the user types inside textbox is what is shown in the textbox', () => {
      AppWrapper.update();
      expect(AppWrapper.find('.EventItem')).toHaveLength(1);
    });
  });
});
