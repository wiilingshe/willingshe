//logs.js
var app = getApp();
const util = require('../../utils/util.js')

Page({
  data: {
    userInfo: {},
    logs: []
    
  },

  onLoad: function () {
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo,
        loadingHidden: true
      })
    });

    // this.loadOrderStatus();
  },
  onShow: function () {
    // this.loadOrderStatus();
  },
  loadOrderStatus: function () {
    //获取用户订单数据
    var that = this;
    wx.request({
      url: app.data.url + '/api/order',
      method: 'post',
      data: {
        userId: app.data.userId,
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
      },
      error: function (e) {
        wx.showToast({
          title: '网络异常！',
          duration: 2000
        });
      }
    });
  },
  yuyue(){
    wx.navigateTo({
      url: '../reservation/reservation'
    })
  }
})