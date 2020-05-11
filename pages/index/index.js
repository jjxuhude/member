//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  getCoupon(e) {
    console.log(e.detail.iv)
    console.log(e.detail.encryptedData)

    let openid = wx.getStorageSync('token')
    console.log(openid)
    wx.request({
      method: 'post',
     url: 'http://member_i.css.org/addCoupon',//本地
      // url: 'https://wecapiuat.chowsangsang.com.cn/account/addCoupon', //uat
      data: {
        openid: openid,
        iv: e.detail.iv,
        encryptedData: e.detail.encryptedData,
        type:2,
        couponId:441
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
      }
    })
  },

  couponList(e) {
    console.log(e.detail.iv)
    console.log(e.detail.encryptedData)

    let openid = wx.getStorageSync('token')
    console.log(openid)
    wx.request({
      method: 'post',
     url: 'http://member_i.css.org/couponList',//本地
      // url: 'https://wecapiuat.chowsangsang.com.cn/account/couponList', //uat
      data: {
        openid: openid
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
      }
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
