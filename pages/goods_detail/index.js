// pages/goods_detail/index.js
import request from '../../utils/request.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 商品信息详情
    productDetail: '',
    // tab当前点击状态
    currentIndex: 0,
    // 轮播图路径
    imgUrl: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    let id = options.id
    request({
      url: "/goods/detail",
      data: {
        goods_id: id
      }
    }).then((res) => {
      console.log(res)
      // 存储图片路径
      let img = res.data.message.pics
      let imgUrl = img.map((item) => {
        return item.pics_big
      })
      this.setData({
        productDetail: res.data.message,
        imgUrl
      })
      
    })
  },

  // tab栏切换
  handleSelect(e){
    // console.log(e.currentTarget.dataset)
    this.setData({
      currentIndex: e.currentTarget.dataset.index
    })
  },
  // 图片预览
  previewImg(e){
    let index = e.currentTarget.dataset.index;
    wx.previewImage({
      current: this.data.imgUrl[index], // 当前显示图片的http链接
      urls: this.data.imgUrl // 需要预览的图片http链接列表
    })
  },
  // 跳转到购物车页
  goToCart() {
    wx.switchTab({
      url: '/pages/cart/index',
    })
  }
})