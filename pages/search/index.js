// pages/search/index.js
import request from "../../utils/request.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 搜索输入框的值
    searchValue: '',
    // 搜索商品列表
    goodsList: []
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },
  // 输入框数据发生改变
  handlechange(e){
    // console.log(e)
    // 获取输入值并保存
    let {value} = e.detail
    value = value.replace(/\s*/g, "");
    this.setData({
      searchValue: value
    })
    console.log(Boolean(value))
    // 如果输入值为空则不发送请求
    if (!value) {
      return;
    }
    // 发送搜索请求
    this.getProducts()
  },

  // 输入框发生改变时搜索数据
  getProducts () {
    request({
      url: "/goods/qsearch",
      data: {
        query: this.data.searchValue
      }
    }).then((res) => {
      console.log(res)
      this.setData({
        goodsList: res.data.message
      })
    })
  }

})