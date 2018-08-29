// login/review/review.js
var app = getApp();
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
    wx.showNavigationBarLoading();
    wx.login({
      success(res){
        console.log(res.code)
        wx.request({
          url:app.globalData.ajaxurl+'/sr/login.html',
          method:'post',
          data:{code:res.code},
          success(res){
            wx.hideNavigationBarLoading();
            // 停止下拉动作
            wx.stopPullDownRefresh();
            if(res.data.applyStatus == 3){
              wx.showToast({
                title: '审核成功',
                icon: 'none',
                duration: 1000
              })
              setTimeout(function(){
                wx.switchTab({
                  url: '/pages/home/home'
                })
              },1000)
            }else{
              wx.showToast({
                title: '审核中',
                icon: 'none',
                duration: 1000
              })
            }
          }
        })
      }
    })
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