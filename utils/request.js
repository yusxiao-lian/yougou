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
 * request.onEeeor(res => {
 *    错误处理
 * })
 */