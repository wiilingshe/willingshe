// pages/about_us/about_us.js
var app = getApp()
var url = app.globalData.url
var WxParse = require('../../wxParse/wxParse.js');
var request = require('../../utils/request.js')
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
    wx.setNavigationBarTitle({
      title: '关于我们'//页面标题为路由参数 
    })
  var that=this
  var article =''
  var path = url + 'api/index/about'
  request.sendRrquest(path, 'GET', {}, {})
    .then(function (items) {
      //console.log(items.data);
      article=items.data.data[0].content
      WxParse.wxParse('article', 'html', article, that, 5);
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