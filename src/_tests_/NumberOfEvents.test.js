import React from 'react';
import { shallow } from 'enzyme';
import NumberOfEvents from '../NumberOfEvents';

describe('<NumberofEvents /> component', () => {
  let NumberOfEventsWrapper;
  beforeAll(() => {
    NumberOfEventsWrapper = shallow(<NumberOfEvents />);
  });

  test('textbox is rendered', () => {
    expect(NumberOfEventsWrapper.find('.EventsNumber')).toHaveLength(1);
  })
});
