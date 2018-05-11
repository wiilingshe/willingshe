// pages/qualification/qualification.js
var app = getApp()
var url = app.globalData.url
var request = require('../../utils/request.js')
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '营业资质'//页面标题为路由参数 
    })
    var that = this
    that.setData({
      shop_id: options.id,
    });
    var path = url + 'api/shop/qualifications'
    var data = { id: options.id, access_token: app.accessToken() }
    //轮播图片
    request.sendRrquest(path, 'POST', data, {})
      .then(function (res) {
        if(res.data.code==1){
          that.setData({
            detail: res.data.data[0],
          });
        }
        if (res.data.code == -1) {
          wx.showModal({
            content: res.data.message,
          })
          if (res.data.errorCode) { app.refreshToken(); }
        }
       
        //console.log(items.data)
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