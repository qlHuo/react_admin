import React from 'react';
import './index.scss'

import User from 'service/user-service.jsx'
import MUtil from 'util/mm.jsx';

const _mm = new MUtil();
const _user = new User();


class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: 'admin',
      password: 'admin',
      redirect: _mm.getUrlParam('redirect') || '/'
    }
  }

  componentWillMount () {
    document.title = '登录 - HAPPYMMALL'
  }

  onInputKeyup (e) {
    if (e.keyCode === 13) {
      this.onSubmitLogin();
    }
  }

  // 监听并修改用户名和密码的变化
  onInputChange (e) {
    let inputValue = e.target.value;
    let inputName = e.target.name;
    // console.log(inputName, inputValue); 

    this.setState({
      [inputName]: inputValue
    })
  }
  // 点击登录时，提交表单
  onSubmitLogin () {
    let loginInfo = {
      username: this.state.username,
      password: this.state.password
    };
    let checkResult = _user.checkLoginInfo(loginInfo);

    // 验证通过
    if (checkResult.status) {
      _user.login(loginInfo).then((res) => {
        // 设置本地存储
        _mm.setStorage('userInfo', res)
        this.props.history.push(this.state.redirect);
      }, (errMsg) => {
        _mm.errorTips(errMsg);
      })
      // 验证不通过
    } else {
      _mm.errorTips(checkResult.msg);
    }
  }
  render () {
    return (
      <div className="col-md-4 col-md-offset-4">
        <div className="panel panel-default login-pannel">
          <div className="panel-heading">欢迎登录-HAPPYMMALL</div>
          <div className="panel-body">
            <div>
              <div className="form-group">
                <input
                  type="email"
                  name='username'
                  className="form-control"
                  placeholder="请输入用户名"
                  value='admin'
                  onKeyUp={e => this.onInputKeyup(e)}
                  onChange={e => this.onInputChange(e)} />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  name='password'
                  className="form-control"
                  placeholder="请输入密码"
                  value='admin'
                  onKeyUp={e => this.onInputKeyup(e)}
                  onChange={e => this.onInputChange(e)} />
              </div>
              <button
                className="btn btn-primary btn-lg btn-block"
                onClick={e => { this.onSubmitLogin(e) }}
              >登录</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Login;