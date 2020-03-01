/**
 * 封装一个异步的请求工具库
 * 基于 wx.request
 * 
 * 1.用法类似axios返回一个promise
 * request({
 *    ..请求配置
 * }).then((res) => {})
 * 
 * 2.可配置基准路径
 * request.defaults.baseURL = ""
 * 
 * 3.实现错误拦截
 * request.onError(res => {
 *    错误处理
 * })
 */

const request = (confing = {}) => {
  // 判断传入的url是否带有http,再绝对是否加上基准路径
  if (confing.url.search(/^http/) === -1) {
    confing.url = request.defaults.baseURL + confing.url
  }

  // resolve是 .then 里面的函数，一般请求成功时候执行
  // reject 是 .catch 里面的函数，一般用于请求失败时候执行
  return new Promise((resolve, reject) => {
    wx.request({
      ...confing,
      success(res){
        resolve(res)
      },
      fail(res){
        reject(res)
      },
      // 不管成功还是失败都会执行
      complete(res){
        console.log(1)
      }
    })

  })
}

/**
 * request的默认属性
 */
request.defaults = {
  baseURL: ""
}
// 对外暴露
export default request;