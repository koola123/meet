import React from 'react';
import { shallow } from 'enzyme';
import NumberOfEvents from '../NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
    let NumberOfEventsWrapper;
    beforeAll(() => {
      NumberOfEventsWrapper = shallow(<NumberOfEvents />);
    });

test('render number of events input', () => {
    expect(NumberOfEventsWrapper.find('.numberOfEvents')).toHaveLength(1);
});

test('render number of events input title', () => {
    expect(NumberOfEventsWrapper.find('h3').text()).toEqual('Number of Events:');
});

test('number of events input is a number type', () => {
    expect(NumberOfEventsWrapper.find('.numberOfEvents').prop('type')).toBe('number');
});

test('number of events input number is by default 32', () => {
    expect(NumberOfEventsWrapper.find('.numberOfEvents').prop('value')).toEqual(32);
});

});