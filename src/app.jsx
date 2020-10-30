import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Redirect, Link } from 'react-router-dom';
// 页面
import Home from 'page/home/index.jsx';
// 布局
import Layout from 'components/layout/index.jsx';
// 首页
import Login from 'page/login/index.jsx';
// 错误页面
import ErrorPage from 'page/error/index.jsx';
// 用户列表
import UserList from 'page/user/index.jsx';



class App extends React.Component {
  render () {
    let LayoutRouter =
      (<Layout>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/user/index' component={UserList} />
          <Redirect exact from='/user' to='/user/index' />

          <Route component={ErrorPage} />
        </Switch>
      </Layout>)
    return (

      <Router>
        <Switch>
          <Route path='/login' component={Login} />
          <Route path='/' render={props => LayoutRouter} />
        </Switch>
      </Router>

    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
)