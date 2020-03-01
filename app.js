import request from './utils/request.js'
App({
  onLaunch: function(){
    // 加基准路径
    request.defaults.baseURL = "https://api-hmugo-web.itheima.net/api/public/v1"
  }
})