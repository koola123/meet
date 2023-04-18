import React from 'react';
import { shallow } from 'enzyme';
import EventList from '../EventList';
import Event from '../Event';
import { parsedMockData } from '../mock-data';

test('render correct number of events', () => {
  const EventListWrapper = shallow(<EventList events={parsedMockData} />);
  expect(EventListWrapper.find(Event)).toHaveLength(parsedMockData.length);
});