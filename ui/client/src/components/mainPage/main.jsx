import React, { Component } from 'react';
import VideoComponent from '../videoComponent';
import axios from 'axios';
import './style.css';
import Login from '../LoginPage/index.jsx';
import Map from '../mapPage/index.jsx';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionId: null
    };
    this.gainSessionId = this.gainSessionId.bind(this);
  }
  initMap() {
    console.log('library is loaded');
  }
  gainSessionId(id) {
    console.log('trying to call gainsessionid', id);
    this.setState({
      sessionId: id
    });
  }
  render() {
    return (
      <div>
        <Login gainSessionId={this.gainSessionId} />
        <Map sessionId={this.state.sessionId} />
      </div>
    );
  }
}

export default Main;
