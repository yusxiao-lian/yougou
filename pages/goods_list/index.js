// pages/goods_list/index.js
import request from "../../utils/request.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 搜索关键字
    keyword: '',
    // 页码
    pagenum: 1,
    // 商品列表
    goodsList: [],
    // 数据是否已经全部请求完毕
    getAll: false,
    // 上一次请求是否已经完成
    hasrequest: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    // 获取关键字
    let keyword = options.keyword
    this.setData({
      keyword: keyword
    })

    //获取商品数据
    this.getGoodsList()
  },

  // 根据关键字获取商品列表
  getGoodsList () {
    // 如果已经请求完数据则不再发送请求
    if (this.data.getAll) {
      return;
    }
    setTimeout((v) => {
      request({
        url: "/goods/search",
        data: {
          query: this.data.keyword,
          pagenum: this.data.pagenum,
          pagesize: 10
        }
      }).then((res) => {
        let goods = res.data.message.goods
        // 数据改造
        let newgoods = goods.map((item) => {
          item.goods_price = Number(item.goods_price).toFixed(2)
          return item
        })
        this.setData({
          goodsList: [...this.data.goodsList, ...newgoods],
          hasrequest: false
        })
        // 如果已经请求完数据
        if (this.data.goodsList.length === res.data.message.total) {
          this.setData({
            getAll: true
          })
        }
      })
    },2000)
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.hasrequest === false) {
      this.setData({
        pagenum: this.data.pagenum + 1,
        hasrequest: true
      })
      this.getGoodsList()
    }
  }


})