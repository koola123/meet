// src/Event.js

import React, { Component } from 'react';
import { mockData } from './mock-data';

class Event extends Component {
  constructor(props) {
    super(props);
    this.state = {
      opened: false,
      mockData: [],
      event: {}
    };
    this.toggleBox = this.toggleBox.bind(this);
  }

  toggleBox() {
    const { opened } = this.state;
    this.setState({
      opened: !opened,
    });
  }

  mockData = JSON.parse(JSON.stringify(mockData));

  render() {
    return (
      <div className="Event">
      </div>
    );
  }
}

export default Event;
