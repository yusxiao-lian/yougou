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
    onLoad: function(options) {
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
    handleSelect(e) {
        // console.log(e.currentTarget.dataset)
        this.setData({
            currentIndex: e.currentTarget.dataset.index
        })
    },
    // 图片预览
    previewImg(e) {
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
    },
    // 加入购物车
    addCart() {
        // 获取本地存储商品
        let goodsList = wx.getStorageSync("goodsList") || []

        // 判断商品是否已经存在
        let exist = goodsList.some(item => {
            let isExist = item.goods_id == this.data.productDetail.goods_id
            // 如果已经存在则商品数量加一
            if (isExist) {
                item.number += 1
                wx.showToast({
                    title: '数量+1',
                    icon: 'success'
                })
            }
            return isExist
        })

        // 如果不存在则将商品添加
        if (!exist) {
            goodsList.unshift({
                goods_id: this.data.productDetail.goods_id,
                goods_price: this.data.productDetail.goods_price,
                goods_name: this.data.productDetail.goods_name,
                goods_small_logo: this.data.productDetail.goods_small_logo,
                number: 1,
                selected: true
            })
            wx.showToast({
                title: '加入成功',
                icon: 'success'
            })
        }
       
        // 重新写入本地存储
        wx.setStorageSync('goodsList', goodsList)
    }
})