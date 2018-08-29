// user/withdraw/withdraw.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
     Arrow: app.globalData.globalurl + '/img/withdraw/withdraw_more.png',
     usable_balances:'--'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({mask:true,title:'加载中'});
    this.setData({
      usable_balances:options.usable_balance
    });
  },
  todetails(e){
    wx.navigateTo({
      url: '/user/withdrawDetails/withdrawDetails',
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.hideLoading();
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