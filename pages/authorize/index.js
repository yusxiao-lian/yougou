// pages/authorize/index.js
import request from "../../utils/request.js"
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    // 获取授权
    handleUserInfo(e){
        // console.log(e)
        // 获取用户信息
        let { encryptedData, iv, rawData, signature } = e.detail
        // 获取用户登录凭证
        wx.login({
            success(res) {
                if (res.code) {
                    let userInfo = {
                        encryptedData,
                        iv,
                        rawData,
                        signature,
                        code: res.code
                    }
                    // 发送请求
                    request({
                        url: "/users/wxlogin",
                        method: "POST",
                        data: userInfo
                    }).then((res) => {
                        console.log(res)
                        let token = res.data.message.token
                        // 存储到本地
                        wx.setStorageSync("token", token);

                        // 返回上个页面
                        wx.navigateBack();
                    })
                } else {
                    console.log('登录失败！' + res.errMsg)
                }
            }
        })
    }
})