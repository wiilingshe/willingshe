// pages/cooperation/cooperation.js
var app = getApp()
var url = app.globalData.url
var memid = 0
var request = require('../../utils/request.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    summary:'',
    show:true,
    btn:true,
    time:60,
    mobile:null,
    access_token:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '加盟合作'//页面标题为路由参数 
    })
   var that=this
        that.setData({
          access_token: app.accessToken()
        })
        var path = url + 'api/member/join'
        var data = { access_token: app.accessToken(), }
        //console.log(data)
        request.sendRrquest(path, 'GET', data, {})
          .then(function (res) {
            console.log(res.data)
            if (res.data.code==1){
              that.setData({
                summary: res.data.data[0].text
              })
            }
            if (res.data.code == -1){
              wx.showModal({
                content: res.data.message,
              })
              if (res.data.errorCode) { app.refreshToken(); }
            }
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
  show_form:function(e){
    this.setData({
      show:!this.data.show
    })
  },
   /**
   * 获取验证码
   */
  sendCode:function(e){
    var that=this
    var path = url + 'api/msn/index'
    var data = { mobile: that.data.mobile, }
    //console.log(data)
    request.sendRrquest(path, 'POST', data, {})
      .then(function (res) {
        console.log(res.data);
        if (res.data.code==1){
          var count = setInterval(function () {
            that.data.time--
            if (that.data.time >= 0) {
              that.setData({
                time: that.data.time,
                btn: false
              })
            } else {
              that.setData({
                time: 60,
                btn: true
              })
            }

          }, 1000)
        }else{
        wx.showModal({
          title: '错误提示',
          content: res.data.message,
        })
        }
      }, function (error) {
        console.log(error);
      });
   
  },
  //输入手机号码
  input:function(e){
    this.setData({
      mobile:e.detail.value
    })    
  },
  submit:function(e){
    console.log(e.detail.value)
    var path = url + 'api/member/settled'
    var data = e.detail.value
    //console.log(data)
    request.sendRrquest(path, 'GET', data, {})
      .then(function (res) {
        console.log(res.data)
       if(res.data.code==1){
          wx.navigateTo({
            url: '../fill/fill',
          })
       }else{
         wx.showModal({
           content: res.data.message,
         })
       }
      }, function (error) {
        console.log(error);
      });
  }
})