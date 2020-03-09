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
        totalPrice: 0,
        // 是否全选
        selectAll: true
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
        // console.log(this.data.goodsList)
        // 判断全选
        this.isSelectAll()
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
    // 增减商品数量
    handleNumber(e){
        // console.log(e.currentTarget.dataset.number)
        let { number, index } = e.currentTarget.dataset
        if (this.data.goodsList[index].number === 1 && number === -1) {
            wx.showModal({
                title: '温馨提示',
                content: '确认删除此商品吗',
                success:(res) => {
                    if (res.confirm) {
                        this.data.goodsList.splice(index, 1)
                    } else if (res.cancel) {
                        console.log('用户点击取消')
                    }
                    // 修改
                    this.setData({
                        goodsList: this.data.goodsList
                    })
                    // 刷新总价格
                    this.getTotalPrice()
                }
            })

        } else {
            this.data.goodsList[index].number += number
        }
       
        // 刷新页面数量
        this.setData({
            goodsList: this.data.goodsList
        })

        // 刷新总价格
        this.getTotalPrice()
        
    },
    // 输入数量
    handleBlur(e){
        // console.log(e.detail.value)
        let { index } = e.currentTarget.dataset;
        let number = e.detail.value
        // 取整
        number = Math.floor(Number(number)) 
        // 判断是否小于1
        if (number < 1) {
            number = 1
        }
        
        this.data.goodsList[index].number = number
        // 修改值
        this.setData({
            goodsList: this.data.goodsList
        })
        // 计算总价
        this.getTotalPrice()
    },
    // 点击勾选商品
    handleSelect(e){
        let { index } = e.currentTarget.dataset
        this.data.goodsList[index].selected = !this.data.goodsList[index].selected
        this.setData({
            goodsList: this.data.goodsList
        })
        // 每次点击都要判断全选
        this.isSelectAll()
        // 计算总价
        this.getTotalPrice()
    },
    // 判断是否全选
    isSelectAll(){
        let state = true
        this.data.goodsList.forEach(value => {
            if (state === false) {
                return
            }
            if (value.selected === false) {
                state = false
            }
        })
        this.setData({
            selectAll: state
        })
    },
    // 点击全选按钮
    handleSelectAll(){
        let state = !this.data.selectAll
        
        // 给商品遍历加状态
        this.data.goodsList.forEach(v => {
            v.selected = state
        })
        // 
        this.setData({
            selectAll: state,
            goodsList: this.data.goodsList
        })
        this.getTotalPrice()
    }

})