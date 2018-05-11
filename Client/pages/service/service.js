// pages/service/service.js
var app = getApp()
var url = app.globalData.url
var memid = 0
var request = require('../../utils/request.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mobile:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var path = url + 'api/index/contact'
    var that=this
    request.sendRrquest(path, 'GET', {}, {})
      .then(function (res) {
       // console.log(res.data.data[0])
        that.setData({
          mobile: res.data.data[0].mobile
        });
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
  call:function(e){
    wx.makePhoneCall({
      phoneNumber: this.data.mobile //仅为示例，并非真实的电话号码
    })
  }
})