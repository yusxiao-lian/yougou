// pages/cart/index.js
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
        totalPrice: 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        // 获取收货地址
        this.setData({
            address: wx.getStorageSync("address") || {}
        })
        // console.log(this.data.address)
        
    },


    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        // 获取商品列表
        let goods = wx.getStorageSync("goodsList") || []
        this.setData({
            goodsList: goods
        })
        console.log(this.data.goodsList)
        // 计算总价
        this.getTotalPrice()
    },

    // 获取收货地址
    getAddress() {
        wx.chooseAddress({
            success: (res) => {
                this.setData({
                    address: {
                        username: res.userName,
                        useraddress: res.provinceName + res.cityName + res.countyName + res.detailInfo,
                        tel: res.telNumber
                    }
                })

                // 保存本地
                wx.setStorageSync('address', this.data.address);
            }
        })
    },
    // 计算总价格
    getTotalPrice () {
        let price = 0
        this.data.goodsList.forEach(value => {
            price += value.number*value.goods_price 
        })
        // console.log(price)
        this.setData({
            totalPrice: price
        })
    }

})