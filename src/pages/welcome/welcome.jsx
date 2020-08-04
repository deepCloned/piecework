import React, { Component } from "react";

import "./welcome.scss";

class Welcome extends Component {
  state = {
    windowWidth: 0,
    windowHeight: 0,
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

  /* 跳转页面 */
  handleGoLogin(e) {
    this.props.history.push(`/login`);
  }

  render() {
    return (
      <div
        className="welcome"
        style={{
          width: this.state.windowWidth,
          height: this.state.windowHeight,
        }}
      >
        <input
          className="login-tip"
          type="button"
          value="快捷登录"
          onClick={() => {
            this.handleGoLogin();
          }}
        />
      </div>
    );
  }
}

export default Welcome;
