class MUtil {
  request (param) {
    return new Promise((resolve, reject) => {
      $.ajax({
        type: param.type || 'get',
        url: param.url || '',
        dataType: param.dataType || 'json',
        data: param.data || null,
        success: (res) => {
          // 数据请求成功
          if (res.status === 0) {
            typeof resolve === 'function' && resolve(res.data, res.msg)
            // 没有登录状态，强制登录
          } else if (res.status === 10) {
            this.doLogin();
          } else {
            typeof reject === 'function' && reject(res.msg || res.data);
          }

        },
        error: (err) => {
          typeof reject === 'function' && reject(err.statusText);
        }
      })
    })

  }
  // 跳转登录
  doLogin () {
    window.location.href = '/login?redirect=' + encodeURIComponent(window.location.pathname);
  }
  // 获取url参数
  getUrlParam (name) {
    // param=123&param1=456
    let queryString = window.location.search.split('?')[1] || '';

    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");

    let result = queryString.match(reg);

    return result ? decodeURIComponent(result[2]) : null;
  }
  // 错误提示
  errorTips (errMsg) {
    alert(errMsg || '出错啦')
  }

  // 将用户信息添加到本地存储
  setStorage (name, data) {
    let dataType = typeof data;
    if (dataType === 'object') {
      window.localStorage.setItem(name, JSON.stringify(data));
    } else if (['number', 'string', 'boolean'].indexOf(dataType) > -1) {
      window.localStorage.setItem(name, data);
    } else {
      alert('信息有误，不能存储');
    }
  }
  // 获取用户信息的本地存储
  getStorage (name) {
    let data = window.localStorage.getItem(name);
    if (data) {
      return JSON.parse(data);
    } else {
      return ''
    }
  }

  // 删除某一用户信息的本地存储
  removeStorage (name) {
    window.localStorage.removeItem(name);
  }
}

export default MUtil;