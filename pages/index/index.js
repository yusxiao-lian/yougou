import request from '../../utils/request.js'

Page({
  data: {
    // 轮播图
    banner: [],
    // 导航
    navs: [],
    // 产品
    products: []
  },
  onLoad(){
    // 获取轮播图
    request({
      url: '/home/swiperdata'
    }).then((res) => {
      this.setData({
        banner: res.data.message
      })
    }),
    // 获取导航
    request({
      url: "/home/catitems"
    }).then((res) => {
      // console.log(res)
      let message = res.data.message
      let data = message.map((item, index) => {
        if (index === 0) {
          item.url = "/pages/category/index"
        }
        return item;
      })
      this.setData({
        navs: data
      })
      // console.log(this.data.navs)
    }),
    // 获取楼层内容
    request({
      url: "/home/floordata"
    }).then((res) => {
      this.setData({
        products: res.data.message
      })
      console.log(res)
    })

  }
})
