import React, { Component } from 'react';
import video from './8895268-preview.mp4';

class App extends Component {
  render() {
    return (
      <div className="fullscreen-video-wrap">
        <video src="./8895268-preview.mp4" autoPlay loop muted />
      </div>
    );
  }
}

export default App;
