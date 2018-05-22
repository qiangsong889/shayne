import React, { Component } from 'react';
import video from './8895268-preview.mp4';

class App extends Component {
  render() {
    return (
      <div>
        <div className="v-header container">
          <div className="fullscreen-video-wrap">
            <video src="./8895268-preview.mp4" autoPlay loop muted />
          </div>
          <div className="header-overlay" />
          <div className="header-content">
            <h1>Hello Everyone</h1>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type spe...
            </p>
            <a href="" className="btn">
              Read More
            </a>
          </div>
        </div>
        <input
          type="text"
          onChange={e => this.setState({ text: e.target.value })}
        />
        <input type="submit" onClick={() => this.handleClick()} />
      </div>
    );
  }
}

export default App;
