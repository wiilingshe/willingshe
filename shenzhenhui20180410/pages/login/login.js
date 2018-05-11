
var app = getApp()
var url = app.globalData.url
var request = require('../../utils/request.js')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    phoneNumber:null,
    getCode:true,
    time:60,
    code:null,
    session:'',
    mobile:'',
    userinfo:[],
    miao:60,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.getStorage({
      key: 'session',
      success: function (res) {
        that.setData({
          session: res.data
        })
      }
    })
    wx.getUserInfo({
        success:function(res){
          that.setData({
            userinfo:res.userInfo
          })
          console.log(that.data.userinfo)
        }
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
  /**
   * 输入电话号码
   */
  outInput: function (e){
    console.log(e.detail.value)
    this.setData({
      phoneNumber: e.detail.value
    })
    // console.log(this.data.phoneNumber)
  },
  /**
   * 获取验证码
   * 
   */
  takeCode: function(e){
    wx.showLoading()
    var that = this
    var path = url + '/api/Msns'
    var data = { mobile: that.data.phoneNumber, openid: that.data.session.openid,type: 1}
    if(that.data.time != 60){
      return false;
    }
    request.sendRrquest(path , 'POST' , data , {}).then(function (res){
      console.log(res.data);
      wx.hideLoading()
      if(res.data.code ==1){
        wx.showToast({
          title: '获取成功',
          icon: 'none',
          duration: 2000
        })
        var count = setInterval(function () {
          that.data.time--
          if(that.data.time >= 0){
            that.setData({
              time: that.data.time,
              getcode: false
            })
          }else{
            that.setData({
              time: 60,
              getcode: true
            })
            clearInterval(count);
          }
        },1000)
      }else{
        wx.showModal({
          title:'错误提示',
          content: res.data.message,
        })
      }
    }, function (error) {
      console.log(error);
    })
  },
  /**
   * 输入电话号码
   */
  codeInput: function(e) {
    console.log(e.detail.value)
    this.setData({
      code: e.detail.value
    })
  },
  /**
   * 修改电话号码
   */
  modifyPhoneNumber: function (){
    wx.showLoading()
    var that = this 
    var data = { openid:that.data.session.openid,code: this.data.code, mobile: that.data.phoneNumber,sex:that.data.userinfo.gender,nickname:that.data.userinfo.nickName,avatarUrl:that.data.userinfo.avatarUrl,province:that.data.userinfo.province,city:that.data.userinfo.city,country:that.data.userinfo.country}
    var path = url + '/api/member/register'
    //console.log(that.data.lat,that.data.lng)
    request.sendRrquest(path,'POST',data, {})
    .then(function (items){
      console.log(items.data)
      wx.hideLoading()
      if(items.data.code ==1){
        wx.showToast({
          title:'绑定成功',
          icon:"success",
          duration:2000,
          success: function (res){
            //  wx.setStorage({
            //     key:"access_token",
            //     data:res.data.data[0].access_token
            // })
            // setTimeout(function(res){
            //   wx.navigateBack({

            //   })
            // },1500)
            wx.switchTab({
              url: '../index/index'
            })
          }
        })
      }
      if(items.data.code == -1){
        wx.showModal({
          content:items.data.message,
        })
        if(items.data.errorCode){
          app.refreshToken(); 
        }
      }
      }, function (error) {
        console.log(error);
      });
  }
})