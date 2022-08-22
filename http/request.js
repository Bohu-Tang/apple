const baseUrl = 'http://127.0.0.1:7001'
// 请求方法
function http(url, method = "GET", data = {}) {
  // 拼接请求地址
  let fullUrl = baseUrl + url;
  // 读取本地token
  // let temp = wx.getStorageSync('Authorization')
  // // 有token时带上token进行请求
  // if (temp.length > 0) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: fullUrl,
        data: data,
        // header: {
        //   Authorization: 'Bearer ' + temp
        // },
        method: method,
        timeout: 60000,
        success: (result) => {
          if (result.statusCode === 200) {
            resolve(result.data);
          } else if (result.statusCode === 401) {
            reject(result)
          }
        },
        fail: (res) => {
          wx.showToast({
            title: '请求失败',
          })
          reject(res)
        },
      })
    })
  // } else {
  //   wx.showToast({
  //     title: '登录失效，请重新打开小程序',
  //   })
  // }
}

module.exports = {
  http
}