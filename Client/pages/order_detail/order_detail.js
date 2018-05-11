// pages/bm_order_detail/bm_order_detail.js
var app = getApp()
var url = app.globalData.url
var request = require('../../utils/request.js')
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:'',
    order: {},
    goods_hide:[],
    order_id:0,
    pay: [{ id: 1, name: '支付宝' }, { id: 2, name: '支付宝' }, { id: 3, name: '微信 ' }, { id: 4, name: '百度钱包' }, { id: 5, name: '京东' }, { id: 6, name: 'qq钱包' }, { id: 7, name: 'NFC支付' }, { id: 8, name: '拉卡拉钱包' }, { id: 15, name: '拉卡拉微信' }, { id: 16, name: '招商银行' }, { id: 17, name: '银联二维码' }],
    deadtime: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var order_id = options.order_id
    //var order_id = 1
    wx.setNavigationBarTitle({
      title: '订单详情'//页面标题为路由参数 
    })
    var that = this
    that.setData({
      order_id: order_id,
    })
    var path = url + 'api/order/detail'
    var data = { id: order_id, access_token: app.accessToken() }
    //console.log(data)
    request.sendRrquest(path, 'POST', data, {})
      .then(function (res) {
        console.log(res.data.data[0])
        if(res.data.code==1){
          var deadtime = res.data.data[0].deadtime
          var counntDown = setInterval(function () {
            if (deadtime > 0) {
              deadtime--
              var time = util.timeChange(deadtime)
              that.setData({
                deadtime: time,
              })
            } else {
              clearInterval(counntDown)
              that.setData({
                deadtime: null,
              })
            }
          }, 1000)
          
          that.setData({
            order: res.data.data[0],
           
          })
         
        }
        if (res.data.code == -1) {
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
    /*
    var that=this
    var path = url + 'api/order/detail'
    var data = { order_id: that.data.order_id, access_token: app.accessToken() }
    //console.log(data)
    request.sendRrquest(path, 'POST', data, {})
      .then(function (res) {
      if(res.data.code==1){
        that.setData({
          order: res.data.data[0],
        })
      }
      if (res.data.code == -1) {
        wx.showModal({
          content: res.data.message,
        })
        if (res.data.errorCode) { app.refreshToken(); }
      }  

      }, function (error) {
        console.log(error);
      });
   */
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
    var that=this
    var path = url + 'api/order/detail'
    var data = { id: that.data.order.id, access_token: app.accessToken() }
    //console.log(data)
    request.sendRrquest(path, 'POST', data, {})
      .then(function (res) {
        console.log(res.data.data[0])
        if (res.data.code == 1) {
          var deadtime = res.data.data[0].deadtime
          var counntDown = setInterval(function () {
            if (deadtime > 0) {
              deadtime--
              var time = util.timeChange(deadtime)
              that.setData({
                deadtime: time,
              })
            } else {
              clearInterval(counntDown)
              that.setData({
                deadtime: null,
              })
            }
          }, 1000)

          that.setData({
            order: res.data.data[0],

          })

        }
        if (res.data.code == -1) {
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
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  //评价完成返回
  changeData: function (index) {
    this.data.order.iscomment=1
    this.setData({
      order: this.data.order
    })

  },
  

 //外卖支付直接微信支付
 payment2: function (e) {
   wx.showLoading({
     title: '请求中',
   })
   var that=this
   var path = url + 'api/order/wechat'
   var pay_sn = this.data.order.pay_sn
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
                  wx.redirectTo({
                    url: '../order_detail/order_detail?id='+that.data.order.order_id,
                  })
                 }
               }
             })
           } else if (res.errMsg == 'requestPayment:fail cancel') {
             wx.redirectTo({
               url: '../order_detail/order_detail?id=' + that.data.order.order_id,
             })

           } else {
             wx.showModal({
               content: '支付失败',
               showCancel: false,
               confirmColor: '#fe7e00',
               success: function (res) {
                 if (res.confirm) {
                   wx.redirectTo({
                     url: '../order_detail/order_detail?id=' + that.data.order.order_id,
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
 //取消订单
 cancel2: function (e) {
   var that = this
   var order_id = e.currentTarget.id
   wx.showModal({
     title: '您确定要取消订单吗？',
     cancelText: '放弃取消',
     cancelColor: '#a6a6a6',
     confirmText: '取消订单',
     confirmColor: '#fe7e00',
     success: function (res) {
       if (res.confirm) {
         var path = url + 'api/order/cancel'
         var data = { access_token: app.accessToken(), id: order_id }
         console.log(data)
         request.sendRrquest(path, 'POST', data, {})
           .then(function (items) {
             console.log(items.data);
             if (items.data.code == 1) {
               wx.reLaunch({
                 url: '../my_order/my_order',
               })
             }
           }, function (error) {
             console.log(error);
           });
       } else if (res.cancel) {

       }
     }
   })
 },
 
 
 
})