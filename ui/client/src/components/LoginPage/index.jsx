import React, { Component } from 'react';
import './style.css';
import axios from 'axios';
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'codingchallenge@brandify.com',
      password: 'appl!c@nt',
      sessionId: '',
      err: ''
    };
  }
  async handleSubmitClick() {
    try {
      const { data } = await axios.post(
        'https://one-staging-api.brandify.com/service/user/authenticate',
        this.state
      );
      if (data.session) {
        this.setState({
          sessionId: data.session.sessionId
        });
        this.props.gainSessionId(data.session.sessionId);
      } else {
        this.setState({
          err: data.status.description
        });
        console.log('err');
      }
    } catch (err) {
      console.log('having error ', err);
    }
  }
  render() {
    return (
      <div className="login">
        {this.state.sessionId ? (
          <div>session verified</div>
        ) : (
          <div>
            <h2>log in to gain session id:</h2> <br />
            {this.state.err && <div>{this.state.err}</div>}
            <input
              type="text"
              id="username"
              onChange={e => this.setState({ username: e.target.value })}
            />
            <br />
            <input
              id="password"
              type="text"
              onChange={e => this.setState({ password: e.target.value })}
            />
            <br />
            <button onClick={() => this.handleSubmitClick()}>submit</button>
          </div>
        )}
      </div>
    );
  }
}

export default Login;
