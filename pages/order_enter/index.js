// pages/cart/index.js
import request from '../../utils/request.js'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 收货信息
        address: {},
        // 商品列表
        goodsList: [],
        // 总价
        totalPrice: 0,
      
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // 获取本地的收货地址
        this.setData({
            // 如果本地没有address就等于一个空对象
            address: wx.getStorageSync("address") || {}
        })

    },


    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        // 获取商品列表
        let goods = wx.getStorageSync("goodsList") || []
        this.setData({
            goodsList: goods
        })
  
        // 计算总价
        this.getTotalPrice()
    },


    // 计算总价格
    getTotalPrice() {
        let price = 0
        this.data.goodsList.forEach(value => {
            if (value.selected) {
                price += value.number * value.goods_price
            }

        })
        // console.log(price)
        this.setData({
            totalPrice: price
        })

        // 修改本地存储数据
        wx.setStorageSync("goodsList", this.data.goodsList)
    },
    // 点击支付
    handlePay(){
        // 判断有没token
        let token = wx.getStorageSync("token");
        // 如果没有则跳转到搜权页进行登录搜权
        if (!token) {
            wx.navigateTo({
                url: '/pages/authorize/index',
            })
        } else {
            // 商品信息
            let goodsInfo = this.data.goodsList.map(v => {
                return {
                    goods_id: v.goods_id,
                    goods_number: v.number,
                    goods_price: v.goods_price
                }
            })
            // 创建订单
            request({
                url: "/my/orders/create",
                method: "post",
                header: {
                    Authorization: token
                },
                data: {
                    goods: goodsInfo,
                    order_price: this.data.totalPrice,
                    consignee_addr: this.data.address.username + this.data.address.useraddress + this.data.address.tel
                }
            }).then((res) => {
                // console.log(res)
                wx.showToast({
                    title: res.data.meta.msg,
                    type: "success"
                })
                // 获取支付参数
                request({
                    url: "/my/orders/req_unifiedorder",
                    method: "post",
                    header: {
                        Authorization: token
                    },
                    data: {
                        order_number: res.data.message.order_number
                    }
                }).then(res => {
                    // console.log(res)
                    let payInfo = res.data.message.pay
                    wx.requestPayment({
                       ...payInfo
                    })
                })
            })
        }
        
    }

})