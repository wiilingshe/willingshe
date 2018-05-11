// pages/mycoupon/mycoupon.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    page:1,
    ifshow:false
  },
  onLoad: function (options) {
    wx.showLoading()
    var that = this;
    wx.getStorage({
      key: 'access_token',
      success: function(res1) {
          wx.request({
            url: app.data.url+'/api/personal/coupon',
            method:'POST',
            data: {access_token:res1.data,page:1,limit:10,type:1},
            success: function(res) {
              wx.hideLoading()
              if(res.data.code == 1){
                that.setData({
                  list:res.data.data[0].list
                })
              }else{
                wx.showToast({
                  title: res.data.message,
                  icon: 'none',
                  duration: 2000
                })
              }
              that.setData({
                ifshow:true
              })
            }
          })
      },
      fail:function(res){
        wx.hideLoading()
        wx.showModal({
          title: '提示',
          content: '您尚未注册，是否前往注册页面？',
          success: function(res) {
            if (res.confirm) {
              wx.navigateTo({
                url: '../login/login'
              })
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }
    })
  },
  onReady: function () {
  
  },
  onShow: function () {
  
  },
  more(){
    var that = this;
    this.data.page++;
    wx.getStorage({
      key: 'access_token',
      success: function(res1) {
          wx.request({
            url: app.data.url+'/api/personal/coupon',
            method:'POST',
            data: {access_token:res1.data,page:that.data.page,limit:10,type:1},
            success: function(res) {
              if(res.data.code == 1){
                var a = that.data.list.concat(res.data.data[0].list)
                that.setData({
                  list:a
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
  getItem(){
    wx.switchTab({
      url: '../classfiy/classfiy'
    })
  }
})