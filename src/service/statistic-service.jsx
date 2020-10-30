import MUtil from 'util/mm.jsx';
const _mm = new MUtil();

class Statistic {

  // 获取首页数据数
  getCount () {
    return _mm.request({
      type: 'post',
      url: '/manage/statistic/base_count.do'
    })
  }

}

export default Statistic;