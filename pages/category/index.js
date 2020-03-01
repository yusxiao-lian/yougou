import request from '../../utils/request.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 数据信息
    menusData: [],
    // 当前页
    currentpage: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    request({
      url: "/categories"
    }).then((res) => {
      this.setData({
        menusData: res.data.message
      })
      console.log(res)
    })
  },
  // 点击切换菜单
  handlechange (e) {
    let index = e.currentTarget.dataset.index
    this.setData({
      currentpage: index
    })
  }
})