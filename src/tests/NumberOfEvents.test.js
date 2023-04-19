import React from 'react';
import { shallow } from 'enzyme';
import NumberOfEvents from '../NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
    let NumberOfEventsWrapper;
    beforeAll(() => {
      NumberOfEventsWrapper = shallow(<NumberOfEvents />);
    });

test('render text input', () => {
    expect(NumberOfEventsWrapper.find('.numberOfEvents')).toHaveLength(1);
});

test('render title of number of events input', () => {
    expect(NumberOfEventsWrapper.find('h3').text()).toEqual('Number of Events:');
});

test('render default number of events is 32', () => {
    expect(NumberOfEventsWrapper.find('.numberOfEvents').prop('value')).toEqual(32);
});

test('', () => {

});

test('', () => {

});


});