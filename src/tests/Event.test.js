import React from 'react';
import { shallow } from 'enzyme';
import Event from '../Event';
import mockData from '../mock-data';


describe('<Event /> component', () => {
    let EventWrapper;
beforeAll(() => {
    EventWrapper = shallow(<Event mockData={mockData} />)
});

test('render event container', () => {
    expect(EventWrapper.find('.event-container')).toHaveLength(1);
});

test('render details button', () => {
    expect(EventWrapper.find('.details')).toHaveLength(1);
});

test('render button title correctly', () => {
    const title = 'show details';
    expect(EventWrapper.find('.details').text()).toEqual(title);
});

// test('simulate click event on button', () => {
//     expect(EventWrapper.find('.details')).simulate('click');
// });

});