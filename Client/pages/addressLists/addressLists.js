// pages/addressLists/addressLists.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lists:[],
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
    var that = this;
    wx.request({
      url:app.globalData.url+'/api/member/address_list',
      type:'POST',
      data:{access_token:app.accessToken()},
      success:function(res){
        console.log(res.data)
        if(res.data.code == 1){
          that.setData({
            lists:res.data.data
          })
        }else{
          wx.showToast({
            title: res.data.message,
            duration: 2000
          })
        }
      }
    })
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
  scrolltolower(){
    console.log(111)
  },
  addAddress(){
    wx.navigateTo({
      url: '../addAddress/addAddress'
    })
  },
  delete(e){
    var that = this;
    console.log(e.currentTarget.id)
    wx.request({
      url:app.globalData.url+'/api/member/address_del',
      type:'POST',
      data:{access_token:app.accessToken(),id:e.currentTarget.id},
      success:function(res){
        if(res.data.code == 1){
          wx.request({
            url:app.globalData.url+'/api/member/address_list',
            type:'POST',
            data:{access_token:app.accessToken()},
            success:function(res1){
              wx.showToast({
                title: '删除成功',
                icon: 'success',
                duration: 2000
              })
              console.log(res1.data)
              if(res1.data.code == 1){
                that.setData({
                  lists:res1.data.data
                })
              }else{
                wx.showToast({
                  title: res1.data.message,
                  duration: 2000
                })
              }
            }
          })
        }else{
          wx.showToast({
            title: res.data.message,
            duration: 2000
          })
        }
      }
    })
  },
  edit(e){
    var that = this;
    console.log(e)
    wx.navigateTo({
      url: '../addAddress/addAddress?id='+e.currentTarget.id+'&name='+e.currentTarget.dataset.name+'&phone='+e.currentTarget.dataset.phone+'&province='+e.currentTarget.dataset.province+'&city='+e.currentTarget.dataset.city+'&country='+e.currentTarget.dataset.country+'&detail='+e.currentTarget.dataset.detail
    })
  }
  
})