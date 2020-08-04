import React, { Component } from "react";

import {User} from '../../model/user';
import {Auth} from '../../model/auth';
import "./login.scss";

class Login extends Component {
  state = {
    windowWidth: 0,
    windowHeight: 0,
    phone: "",
    code: "",
    timeLeft: 10,
    lock: false, // 为 false 时禁止点击获取验证码
    logoImg: 'https://piecework-server-product.oss-cn-hangzhou.aliyuncs.com/B7340AC613E9DB676863FA0AB485BBCA.png',
    phoneImg: 'https://piecework-server-product.oss-cn-hangzhou.aliyuncs.com/C684FD5CE735A21914F70DD5EB4882A2.png',
    codeImg: 'https://piecework-server-product.oss-cn-hangzhou.aliyuncs.com/81437C9D40C795F972DAAFC830D67E0D.png',
  };

  componentDidMount() {
    // 获取屏幕高度和宽度
    this.setWindowSize();
  }

  setWindowSize() {
    const height = document.documentElement.clientHeight;
    const width = document.documentElement.clientWidth;
    this.setState({
      windowHeight: height,
      windowWidth: width,
    });
  }

  handleInputPhone(e) {
    e.persist();
    this.setState({
      phone: e.target.value,
    });
  }

  handleInputCode(e) {
    e.persist();
    this.setState({
      code: e.target.value,
    });
  }

  /* 获取验证码 */
  async handleGetCode() {
    const { lock, phone } = this.state;
    console.log(phone)
    // if (lock) {
    //   console.log("请勿重复获取验证码");
    //   return;
    // } else {
    //   this.setState({
    //     lock: true
    //   })
    // }
    const res = Auth.getCodeByPhone({phone})
    console.log('res is', res)
  }

  /* 提交登录 */
  async handleConfirmLogin() {
    const loginRes = await User.getUserInfo()
  }

  render() {
    const {
      windowHeight,
      windowWidth,
      phone,
      code,
      timeLeft,
      lock,
      logoImg,
      codeImg,
      phoneImg,
    } = this.state;

    return (
      <div
        className="login"
        style={{
          width: windowWidth,
          height: windowHeight,
        }}
      >
        <div className="logo">
          <img className="logo-image" src={logoImg} alt="logo"></img>
          <span className="app-name">管单单</span>
        </div>
        <form className="login-area">
          <div className="input-common phone">
            <img src={phoneImg} alt="phone"></img>
            <input
              type="text"
              value={phone}
              placeholder="请输入手机号"
              onChange={this.handleInputPhone.bind(this)}
            ></input>
          </div>
          <div className="input-common code">
            <img src={codeImg} alt="code"></img>
            <input
              type="text"
              value={code}
              placeholder="请输入验证码"
              onChange={(e) => {
                this.handleInputCode(e);
              }}
            ></input>
            <span
              className={`get-code ${lock ? 'is-lock' : ''}`}
              onClick={() => {
                this.handleGetCode();
              }}
            >
              {lock ? timeLeft + "秒后重新发送" : "获取验证码"}
            </span>
          </div>
          <input
            type="button"
            value="登录"
            className="confirm"
            onClick={() => {
              this.handleConfirmLogin();
            }}
          ></input>
        </form>
        <div className="slogan">-- 让管理更高效 --</div>
      </div>
    );
  }
}

export default Login;
