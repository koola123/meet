import React from 'react';
import { shallow } from 'enzyme';
import Event from '../Event';
import mockData from '../mock-data';


describe('<Event /> component', () => {
    let EventWrapper, event;
beforeAll(() => {
    event = mockData[0];
    EventWrapper = shallow(<Event event={event} />)
});

test('render summary title correctly', () => {
    const summary = EventWrapper.find('h2');
    const summaryString = event.summary;
    expect(summary).toBeDefined();
    expect(summary.text()).toBe(summaryString);
});

test('render start time correctly', () => {
    const eventStart = EventWrapper.find('#event-start');
    const dateString = event.start.dateTime;
    expect(eventStart).toBeDefined();
    expect(eventStart.text()).toBe(dateString);
});

test('render location correctly', () => {
    const eventLocation = EventWrapper.find('#event-location');
    const eventLocationString = event.location;
    expect(eventLocation).toBeDefined();
    expect(eventLocation.text()).toBe(`Location: ${eventLocationString}`);
});

test('details is initially collapsed, children hidden, details-btn text is "shown details',() => {
    const detailsButton = EventWrapper.find('.details-btn');
    expect(EventWrapper.state('collapsed')).toBe(true);
    expect(detailsButton).toBeDefined();
    expect(detailsButton.text()).toBe('Show Details');
    expect(EventWrapper.find('.about')).toHaveLength(0);
    expect(EventWrapper.find('.link')).toHaveLength(0);
    expect(EventWrapper.find('.description')).toHaveLength(0);
});

test('details is expanded (collapsed=false) on click', () => {
    const detailsButton = EventWrapper.find('.details-btn');
    detailsButton.simulate('click');
    expect(EventWrapper.find('.about')).toHaveLength(1);
    expect(EventWrapper.find('.link')).toHaveLength(1);
    expect(EventWrapper.find('.description')).toHaveLength(1);
    expect(EventWrapper.state('collapsed')).toBe(false);
});

});