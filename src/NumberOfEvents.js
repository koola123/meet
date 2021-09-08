import React, { useState } from 'react';
import { ErrorAlert } from './Alert';

function NumberofEvents(props) {
  const [eventsToShow, setEventsToShow] = useState(props.eventsToShow);
  const text = props.text

  const handleChange = (event) => {
    if (event.target.value === "") {
      setEventsToShow(event.target.value);
      props.updateEventNum("NoNum");
    } else {
      setEventsToShow(event.target.value);
      props.updateEventNum(event.target.value)
    }
  }

  return (
    <div className="numberOfEvents">
      <ErrorAlert text={text} />
      <label htmlFor="number">Number of Events: </label>
      <input
        type="number"
        id="number"
        className="numberInput"
        value={eventsToShow}
        onChange={handleChange} />
    </div>
  )
}

export default NumberofEvents;
