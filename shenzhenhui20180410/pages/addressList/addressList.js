// pages/addressList/addressList.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lists:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading()
    var that = this;
    wx.getStorage({
      key: 'access_token',
      success: function(res) {
          console.log(res.data);
          wx.request({
            url:app.data.url+'/api/address/list',
            method:'POST',
            data:{access_token:res.data},
            success:function(res){
              if(res.data.code == 1){
                wx.hideLoading()
                that.setData({
                  lists:res.data.data[0].list
                })
              }else{
                wx.showToast({
                  title: res.data.message,
                  icon: 'none',
                  duration: 2000
                })
              }
            }
          })
      } 
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
  addAddress(){
    wx.navigateTo({
      url:'../address/address'
    })
  },
  edit(e){
    var that = this;
    console.log(e)
    wx.navigateTo({
      url: '../address/address?id='+e.currentTarget.id+'&name='+e.currentTarget.dataset.name+'&phone='+e.currentTarget.dataset.phone+'&province='+e.currentTarget.dataset.province+'&city='+e.currentTarget.dataset.city+'&country='+e.currentTarget.dataset.country+'&detail='+e.currentTarget.dataset.detail
    })
  }
})