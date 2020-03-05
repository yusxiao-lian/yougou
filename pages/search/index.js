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
    goodsList: [],
    // 请求状态
    hasrequest: false,
    // 最后搜索值
    lastrequest: '',
    // 历史搜索记录
    historylist: []
  },

  onLoad(){
    let historylist = wx.getStorageSync('historylist') || []
    this.setData({
      historylist
    })
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

    // 搜索值为空再清空搜索数据
    if (value == '') {
      this.setData({
        goodsList: []
      })
    }
    // console.log(Boolean(value))
    // 如果输入值为空则不发送请求
    if (!value) {
      return;
    }

    // 发送搜索请求
    this.getProducts()
  },

  // 输入框发生改变时搜索数据
  getProducts () {
    
    // 判断上次请求是否完成
    if (this.data.hasrequest !== false) {
      return;
    }
    console.log(this.data.searchValue)
    this.setData({
      hasrequest: true,
      // 记录最后一次搜索值
      lastrequest: this.data.searchValue
    })
    request({
      url: "/goods/qsearch",
      data: {
        query: this.data.searchValue
      }
    }).then((res) => {
      console.log(res)
      this.setData({
        goodsList: res.data.message,
        hasrequest: false
      })
      // 判断是否进行了最后一次搜索,如果不是则再发送请求
      if (this.data.lastrequest !== this.data.searchValue) {
        this.getProducts()
      }
    })
  },
  // 点击取消按钮
  handleCancle () {
    this.setData({
      searchValue: '',
      goodsList: []
    })
  },
  // 按下enter键时
  handleEnter (e) {
    // console.log(e.detail)
    // 保存搜索记录
    let historylist = wx.getStorageSync('historylist') || []
    historylist.unshift(e.detail.value)
    // 数组去重
    let newdata = [...new Set(historylist)]
    if (newdata.length >10) {
      newdata.pop()
    }
    wx.setStorageSync('historylist', newdata)
    console.log(newdata)
    wx.redirectTo({
      url: '/pages/goods_list/index?keyword=' + e.detail.value
    })
  },

  // 清空历史记录
  handleDel () {
    wx.setStorageSync('historylist', [])
    this.setData({
      historylist: []
    })
  }
})