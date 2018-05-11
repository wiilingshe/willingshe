// pages/my_order/my_order.js
var app = getApp()
var url = app.globalData.url
var memid = app.globalData.memid
var request = require('../../utils/request.js')
var p=1
var more = true
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:0,
    list:[],
    have:null,

   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { 
    wx.setNavigationBarTitle({
      title: '订单'//页面标题为路由参数 
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
    var that = this
    wx.showLoading({
      title: '加载中',
    })
    that.setData({
      type: 0,
    }) 
    p=1
    var path = url + 'api/order/index'
    var data = { access_token: app.accessToken(), page: p, }
    console.log(data)
    request.sendRrquest(path, 'POST', data, {})
      .then(function (res) {
        wx.hideLoading()
        console.log(res.data.data[0]);
        if (res.data.code == -1) {
          wx.showModal({
            content: res.data.message,
          })
          if (res.data.errorCode) { app.refreshToken(); }
        }

        if (res.data.data[0].list.length > 0) {
          that.setData({
            list: res.data.data[0].list,
            have: true
          })
        } else {
          that.setData({
            have: false
          })
        }


      }, function (error) {
        console.log(error);
      });
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
    p=1
    var that = this
    wx.showLoading({
      title: '加载中',
    })
    that.setData({
      type:0,
    })
    var path = url + 'api/order/index'
    var data = { access_token: app.accessToken(), page: p, }
    console.log(data)
    request.sendRrquest(path, 'POST', data, {})
      .then(function (res) {
        wx.hideLoading()
        console.log(res.data.data[0]);
        if (res.data.code == -1) {
          wx.showModal({
            content: res.data.message,
          })
          if (res.data.errorCode) { app.refreshToken(); }
        }

        if (res.data.data[0].list.length > 0) {
          that.setData({
            list: res.data.data[0].list,
            have: true
          })
        } else {
          that.setData({
            have: false
          })
        }


      }, function (error) {
        console.log(error);
      });
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this
    if (more == true) {
    p++
    var path = url + 'api/order/index'
    if(that.data.type){
      var data = { access_token: app.accessToken(), page: p, status: that.data.type - 1 }
    }else{
      var data = { access_token: app.accessToken(), page: p, }
    }
    request.sendRrquest(path, 'POST', data, {})
      .then(function (res) {
        wx.hideLoading()
        console.log(res.data.data[0]);
        if (res.data.code == -1) {
          wx.showModal({
            content: res.data.message,
          })
          if (res.data.errorCode) { app.refreshToken(); }
        }

        var length = res.data.data[0].list.length
        if (length > 0) {
          var list = that.data.list
          list = list.concat(res.data.data[0].list)
          that.setData({
            list: list
          })
          }else {
          more = false
        }


      }, function (error) {
        console.log(error);
      });
    //console.log(data)
   
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  //评价完成返回
  changeData: function (index) {
    this.data.list[index].is_comment=1
    this.setData({
      list:this.data.list
    })
  },
  nav:function(e){
    var that = this
    var type=e.currentTarget.id
    p = 1
    that.setData({
      type: type,
      list:[]
    })   
    more = true
    var path = url + 'api/order/index'
    if (type>0) {
      var data = { access_token: app.accessToken(), page: p, status: type - 1 }
    } else {
      var data = { access_token: app.accessToken(), page: p, }
    }
    console.log(data)
    request.sendRrquest(path, 'POST', data, {})
      .then(function (res) {
        if (res.data.code == -1) {
          wx.showModal({
            content: res.data.message,
          })
          if (res.data.errorCode) { app.refreshToken(); }
        }

        if (res.data.data[0].list.length > 0) {
          console.log(res.data.data[0].list)
          that.setData({
            list: res.data.data[0].list,
            have: true
          })
        } else {
          that.setData({
            have: false
          })
        }

      }, function (error) {
        console.log(error);
      });
  },
  //立即支付直接微信支付
  payment2: function (e) {
    wx.showLoading({
      title: '请求中',
    })
    var index = e.currentTarget.dataset.index
    var path = url + 'api/order/wechat'
    var pay_sn = this.data.list[index].pay_sn
    var data = { pay_sn: pay_sn }
    request.sendRrquest(path, 'POST', data, {})
      .then(function (items) {
        console.log(items.data);
        //微信支付
        wx.hideLoading()
        var timeStamp = String(items.data.data[0].timeStamp)
        wx.requestPayment({
          'timeStamp': timeStamp,
          'nonceStr': items.data.data[0].nonceStr,
          'package': items.data.data[0].package,
          'signType': 'MD5',
          'paySign': items.data.data[0].paySign,
          'success': function (res) {      
            if (res.errMsg == 'requestPayment:ok') {
              wx.showModal({
                content: '支付成功',
                showCancel: false,
                confirmColor: '#fe7e00',
                success: function (res) {
                  if (res.confirm) {
                    wx.switchTab({
                      url: '../my_order/my_order',
                    })
                  }
                }
              })
            } else if (res.errMsg == 'requestPayment:fail cancel') {
              wx.switchTab({
                url: '../my_order/my_order',
              })

            } else {
              wx.showModal({
                content: '支付失败',
                showCancel: false,
                confirmColor: '#fe7e00',
                success: function (res) {
                  if (res.confirm) {
                    wx.switchTab({
                      url: '../my_order/my_order',
                    })
                  }
                }
              })
            }
          },
          'fail': function (res) {

          }
        })
      }, function (error) {
        console.log(error);
      });

  },
 
})
