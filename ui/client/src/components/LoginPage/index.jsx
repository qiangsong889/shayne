import React, { Component } from 'react';
import './style.css';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: ''
    };
  }
  render() {
    return (
      <div className="login">
        <div className="Combined-Shape" />
        <br />
        <div className="loginBox">
          <div className="content">欢迎来到AQ, 请登录</div>
          <input type="text" placeholder="用户名" />
          <br />
          <input type="password" placeholder="密码" />
          <br />
          <button className="denglu">登陆</button>
        </div>
        <div>
          没有账号？ 请<a href="">注册</a>
        </div>
      </div>
    );
  }
}

export default Login;
