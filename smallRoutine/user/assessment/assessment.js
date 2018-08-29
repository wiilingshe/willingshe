// user/assessment/assessment.js
const app = getApp();
var WxParse = require('../../utils/wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nodes:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that =this;
    wx.showLoading({mask:true,icon:"loading",title:'加载中'});
    wx.request({
      url:app.globalData.ajaxurl+'/sr/config_examine.html',
      data:'',
      header:{uuid:app.globalData.uuid},
      method:'GET',
      success:res=>{
        wx.hideLoading();
        if(res.data.status==1){
          var article = res.data.data;
          WxParse.wxParse('article', 'html', article, that, 0);
        }
      }
    });
    wx.hideShareMenu();
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