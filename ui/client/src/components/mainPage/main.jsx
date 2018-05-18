import React, { Component } from 'react';
import VideoComponent from '../videoComponent';
import axios from 'axios';
import './style.css';
import Login from '../LoginPage/index.jsx';
class Main extends Component {
  constructor() {
    super();
    this.state = {
      text: ''
    };
  }
  async handleClick() {
    try {
      const { data } = await axios.post(
        'http://localhost:4000/api',
        this.state.text
      );
      console.log('got data from server', data);
    } catch (err) {
      console.log('err doing /api request to port 4000', err);
    }
  }
  render() {
    return (
      <div>
        <div className="v-header container">
          <VideoComponent />
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

        <Login />
      </div>
    );
  }
}

export default Main;
