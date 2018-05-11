// pages/myCollection/myCollection.js
var app = getApp()
var url = app.globalData.url
var request = require('../../utils/request.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    store:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '我的收藏'//页面标题为路由参数 
    })
   
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
    var path = url + 'api/member/mycollect'
    var data = { access_token: app.accessToken(), }
    console.log(data)
    request.sendRrquest(path, 'GET', data, {})
      .then(function (res) {
        wx.hideLoading()
        console.log(res.data.data[0]);
        if (res.data.code == -1) {
          wx.showModal({
            content: res.data.message,
          })
          if (res.data.errorCode) { app.refreshToken(); }
        }

        if (res.data.data[0].list.length > 0) {
          that.setData({
            store: res.data.data[0].list,          
          })
        } 


      }, function (error) {
        console.log(error);
      });

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
  
  }
})