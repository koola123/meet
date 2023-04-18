import React from 'react';
import Event from './Event';


const EventList = ({ events }) => {
    return (
        <ul className="EventList">
           {events.map((event) => {
             return <Event key={event.id} event={event}/>
           })}
        </ul>
    );
};


export default EventList;

