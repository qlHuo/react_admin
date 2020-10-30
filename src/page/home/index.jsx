import React from 'react';
import './index.scss';
import { Link } from 'react-router-dom';

import PageTitle from 'components/page-title/index.jsx'

import Statistic from 'service/statistic-service.jsx';
import MUtil from 'util/mm.jsx';

const _statistic = new Statistic();
const _mm = new MUtil();

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userCount: '-',
      productCount: '-',
      orderCount: '-'
    }
  }

  componentDidMount () {
    this.loadCount()
  }

  loadCount () {
    _statistic.getCount().then(res => {
      console.log(res);
      this.setState({
        userCount: res.userCount,
        productCount: res.productCount,
        orderCount: res.orderCount
      })
    }, errMsg => {
      _mm.errorTips(errMsg)
    })
  }

  render () {
    return (
      <div id='page-wrapper'>
        <PageTitle title='首页' />
        <div className='row'>
          <div className="col-md-4">
            <Link to='/user' className='color-box brown'>
              <p className="count">{this.state.userCount}</p>
              <p className="description">
                <i className="fa fa-user-o"></i>
                <span>总用户数</span>
              </p>
            </Link>
          </div>
          <div className="col-md-4">
            <Link to='/product' className='color-box green'>
              <p className="count">{this.state.productCount}</p>
              <p className="description">
                <i className="fa fa-check-square"></i>
                <span>总商品数</span>
              </p>
            </Link>
          </div>
          <div className="col-md-4">
            <Link to='/order' className='color-box blue'>
              <p className="count">{this.state.orderCount}</p>
              <p className="description">
                <i className="fa fa-first-order"></i>
                <span>总订单数</span>
              </p>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

export default Home;