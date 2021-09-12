import React from 'react';
import { mount, shallow } from 'enzyme';
import App from '../App';
import { mockData } from '../mock-data';
import { extractLocations } from '../api';
import CitySearch from '../CitySearch';

import { loadFeature, defineFeature } from 'jest-cucumber';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, test => {
  let EventListWrapper;
  let EventWrapper;
  let AppWrapper;
  test('An event element is collapsed by default', ({ given, when, then }) => {
    given('the user hasn\'t expanded an event to see its details', () => {
      EventListWrapper = mount(<EventList events={mockData} />);
      EventWrapper = mount(<Event event={mockData[0]} />);
    });

    when('the user clicks the hide details button on that event', () => {
      AppWrapper = mount(<App />);
    });

    then('the user will not be able to see details of that event.', () => {
      expect(EventWrapper.find('.eventDetails')).toHaveLength(0);
    });
  });

  test('User can expand an event to see its details', ({ given, when, then }) => {
    given('the user has opened an event', () => {
      AppWrapper = mount(<App />);
      EventListWrapper = mount(<EventList events={mockData} />);
      EventWrapper = mount(<Event event={mockData[0]} />);
    });

    when('the user clicks on the show details button', () => {
      EventWrapperfind('.ToggleButton')).at(1).simulate('click');
    });

    then('the user will be able to see an events details', () => {
      expect(EventWrapper.find('.eventDetails')).toHaveLength(2);
    });
  });


  test('User can collapse an event to hide its details', ({ given, and, when, then }) => {
    given('the user opened an event', () => {
      AppWrapper = mount(<App />);
      EventListWrapper = mount(<EventList events={mockData} />);
      EventWrapper = mount(<Event event={mockData[0]} />);
      EventWrapper.find('.ToggleButton').at(1).simulate('click');
      EventWrapper.find('.eventDetails');
    });

    when('the user is clicking on the hide details button', () => {
      EventWrapper.find('.ToggleButton').at(1).simulate('click');
    });

    then('details on an event should be hidden by the user', () => {
      expect(EventWrapper.find('.eventDetails')).toHaveLength(0);
    });

  });
});
