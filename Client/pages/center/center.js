// pages/list/list.js
var app = getApp()
var url = app.globalData.url
var memid = app.globalData.memid
var request = require('../../utils/request.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    personal:{},
   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '个人中心'//页面标题为路由参数 
      })
    var that = this
    var path = url + 'api/member/index'
    request.sendRrquest(path, 'POST', { access_token: app.accessToken() }, {})
      .then(function (res) {

        if (res.data.code == -1) {
          wx.showModal({
            content: res.data.message,
          })
          if (res.data.errorCode) { app.refreshToken(); }
        }
        if (res.data.code == 1) {
          //console.log(res.data.data[0])
          that.setData({
            personal: res.data.data[0]
          });
        }

        // console.log(imgUrls);
      }, function (error) {
        console.log(error);
      });
  
   
   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that=this
    try {
      var value = wx.getStorageSync('memid')   
      if (value) {
        memid = value
      } else {   
        app.getUser()
        memid = app.globalData.memid
      }
      
    } catch (e) {
      // Do something when catch error
      console.log(1)
    }
   
        
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
 
  go_order:function(e){
    wx.switchTab({
      url: '../my_order/my_order',
    })
  }
})