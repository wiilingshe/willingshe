// pages/modify_tel/modify_tel.js
var app = getApp()
var url = app.globalData.url
var request = require('../../utils/request.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mobile:null,
    getcode:true,
    time:60,
    code:null
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '绑定手机号'//页面标题为路由参数 
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
  //输入电话号码
  outInput: function (e) {
    //console.log(e.detail.value)
    this.setData({
      mobile: e.detail.value
    })
  },
  /**
 * 获取验证码
 */
  takeCode: function (e) {
    var that = this
    var path = url + 'api/msn/index'
    var data = { mobile: that.data.mobile, }
    //console.log(data)
    request.sendRrquest(path, 'POST', data, {})
      .then(function (res) {
        console.log(res.data);
        if (res.data.code == 1) {
          var count = setInterval(function () {
            that.data.time--
            if (that.data.time >= 0) {
              that.setData({
                time: that.data.time,
                getcode: false
              })
            } else {
              that.setData({
                time: 60,
                getcode: true
              })
            }

          }, 1000)
        } else {
          wx.showModal({
            title: '错误提示',
            content: res.data.message,
          })
        }
      }, function (error) {
        console.log(error);
      });

  },
  //输入电话号码
  codeInput: function (e) {
    //console.log(e.detail.value)
    this.setData({
      code: e.detail.value
    })
  },
  //修改电话号码
  modifyT: function () {
    var that = this
    var data = { access_token: app.accessToken(), code: this.data.code, mobile: this.data.mobile }
    var path = url + 'api/member/bind'
    //console.log(that.data.lat, that.data.lng)
    request.sendRrquest(path, 'POST', data, {})
      .then(function (items) {
        console.log(items.data)
        if (items.data.code==1){
          wx.showToast({
            title: '修改成功',
            icon: "success",
            mask: true,          
            success: function (res) {
              setTimeout(function () { 
               wx.navigateBack({
                 
               })
               }, 1500)
        
            }
        })
        }
        if (res.data.code == -1) {
          wx.showModal({
            content: res.data.message,
          })
          if (res.data.errorCode) { app.refreshToken(); }
        }
        //console.log(items.data.data[0].seller)
      }, function (error) {
        console.log(error);
      });
  },
  
})