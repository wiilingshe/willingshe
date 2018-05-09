//pages/indent/indent.js
//获取应用实例
var app = getApp();
var common = require("../../utils/common.js");
Page({
  data: {
    winWidth: 0,
    winHeight: 0,
     // tab切换  
    currentTab: 0,
    isStatus: 'pay',
    //10待付款，20待发货，30待收货 40、50已完成
    type: "",
     //订单类型: 1为待收货2为已完成3为已取消（不传默认返回全部）
    page: 1,
    refundpage: 0,
    orderList0: [],
    orderList1: [],
    orderList2: [],
    orderList3: [],
    orderList4: [],
  },
  onLoad: function (options) { 
    this.initSystemInfo();
    this.setData({
      // currentTab: parseInt(options.currentTab),
      type: options.otype
    });
    var that = this;
    //  高度自适应
    wx.getStorage({
      key: 'access_token',
      success: function(res) {
          that.setData({
            access_token:res.data
          })
          wx.request({
            url:app.data.url+'/api/order',
            method:'POST',
            data:{access_token:res.data,page:1},
            success:function(res){
              if(res.data.code == 1){
                that.setData({
                  orderList0:res.data.data[0].list
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
  getOrderStatus: function () {
    return this.data.currentTab == 0 ? 1 : this.data.currentTab == 2 ? 2 : this.data.currentTab == 3 ? 3 : 0;
  },

  //取消订单
  removeOrder: function (e) {
    var that = this;
    var orderId = e.currentTarget.dataset.order_id;
    wx.showModal({
      title: '提示',
      content: '你确定要取消订单吗？',
      success: function (res) {
        res.confirm && wx.request({
          url: app.data.url + '/api/order/cancel',
          method: 'post',
          data: {
            access_token:"",
            id: order_id,
            type: that.data.currentTab,
          },
          header: { 
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          success: function (res) {
            //--init data
            var status = res.data.status;
            if (status == 1) {
              wx.showToast({
                title: '操作成功！',
                duration: 2000
              });
              that.loadOrderList();
            } else {
              wx.showToast({
                title:'success',
                duration: 2000
              });
            }
          },
          fail: function () {
            // fail
            wx.showToast({
              title: '网络异常！',
              duration: 2000
            });
          }
        });

      }
    });
  },

  //确认收货
  recOrder: function (e) {
    var that = this;
    var orderId = e.currentTarget.dataset.order_id;
    wx.showModal({
      title: '提示',
      content: '你确定已收到宝贝吗？',
      success: function (res) {
        res.confirm && wx.request({
          url: app.data.url + '/api/order/receive',
          method: 'post',
          data: {
            id: order_id,
            type: 'receive',
          },
          header: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          success: function (res) {
            //--init data
            var status = res.data.status;
            if (status == 1) {
              wx.showToast({
                title: '操作成功！',
                duration: 2000
              });
              that.loadOrderList();
            } else {
              wx.showToast({
                title: 'fail',
                duration: 2000
              });
            }
          },
          fail: function () {
            // fail
            wx.showToast({
              title: '网络异常！',
              duration: 2000
            });
          }
        });
      }
    });
  },
  loadOrderList: function () {
    var that = this;
    wx.request({  // 这是个请求,
      url: app.data.url + '/api/order', //请求地址
      method: 'post', //请求方式
      data: {//请求需要带过去的参数
        // 这里是你要传出去的参数，你可以去app那里取
        // 请求参数,对照接口文档里面的 body
        access_token : "",
        type: that.data.currentTab, //这是取当前tab	订单类型:
        // 1为待收货2为已完成3为已取消（不传默认返回全部）  这里取值报错了， 不能这样取
        page: that.data.page, //		第几页(不传默认第1页)		  
        limit: 10 //  	每页条数（不传默认10条）	
      },
      header: {//   请求头部设置
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {// 请求成功后的回调,这里的res是你请求完成后,
      //有要用她的返回值就会在res里面,你也可以随便命名,你这里取名字只是个变量， 下面用的时候就得用aaaaa去点
      // 先看看是不是请求成功
        wx.showToast({
        //  title: res,
          icon: 'success',
          duration: 2000
        });
        //这里才是你刚刚看的那边的那个返回参数里面取的，  app.data.list.order_id 这里才能取的到值
        //--init data        
        var status = res.data.status; // 如果用aaaaa, 那这里就是用aaaaa.data.status 去取状态值
        var list = res.data.ord;
        switch (that.data.currentTab) {
          case 0:
            that.setData({
              orderList0: list,
            });
            break;
          case 1:
            that.setData({
              orderList1: list,
            });
            break;
          case 2:
            that.setData({
              orderList2: list,
            });
            break;
          case 3:
            that.setData({
              orderList3: list,
            });
            break;
          case 4:
            that.setData({
              orderList4: list,
            });
            break;
        }
      },
      fail: function () {
        // fail
        wx.showToast({
          title: '网络异常！',
          duration: 2000
        });
      }
    });
  },

  // loadReturnOrderList: function () {
  //   var that = this;
  //   wx.request({
  //     url: app.data.url + '/Api/Order/order_refund',
  //     method: 'post',
  //     data: {
  //       uid: app.data.order_id,
  //       page: that.data.refundpage,
  //     },
  //     header: {
  //       'Content-Type': 'application/x-www-form-urlencoded'
  //     },
  //     success: function (res) {
  //       //--init data        
  //       var data = res.data.ord;
  //       var status = res.data.status;
  //       if (status == 1) {
  //         that.setData({
  //           orderList4: that.data.orderList4.concat(data),
  //         });
  //       } else {
  //         wx.showToast({
  //           title: "fail",
  //           duration: 2000
  //         });
  //       }
  //     },
  //     fail: function () {
  //       // fail
  //       wx.showToast({
  //         title: '网络异常！',
  //         duration: 2000
  //       });
  //     }
  //   });
  // },

  // returnProduct:function(){
  // },
  initSystemInfo: function () {
    var that = this;

    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    });
  },
  bindChange: function (e) {
    var that = this;
    that.setData({ 
      currentTab: e.detail.current ,
      page:1
    });
    //  高度自适应
    wx.getStorage({
      key: 'access_token',
      success: function(res) {
          that.setData({
            access_token:res.data
          })
          if(e.detail.current == 0){
            var data = {access_token:res.data,page:1}
          }else{
            var data = {access_token:res.data,page:1,type:e.detail.current}
          }
          wx.request({
            url:app.data.url+'/api/order',
            method:'POST',
            data:data,
            success:function(res){
              if(res.data.code == 1){
                if(e.detail.current == 0){
                  that.setData({
                    orderList0:res.data.data[0].list
                  })
                }else if(e.detail.current == 1){
                  that.setData({
                    orderList1:res.data.data[0].list
                  })
                }else if(e.detail.current == 2){
                  that.setData({
                    orderList2:res.data.data[0].list
                  })
                }else if(e.detail.current == 3){
                  that.setData({
                    orderList3:res.data.data[0].list
                  })
                }
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
  swichNav: function (e) {
    var that = this;
    if (that.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      var current = e.target.dataset.current;
      that.setData({
        currentTab: parseInt(current),
        type: e.target.dataset.otype,
      });

      //没有数据就进行加载
      switch (that.data.currentTab) {
        case 0:
        //because  Cannot read property 'length' of undefined  delete"!"
          that.data.orderList0.length && that.loadOrderList();
          break;
        case 1:
          that.data.orderList1.length && that.loadOrderList();
          break;
        case 2:
          that.data.orderList2.length && that.loadOrderList();
          break;
        case 3:
          that.data.orderList3.length && that.loadOrderList();
          that.loadReturnOrderList();
          break;
      }
    };
  },
  /**
   * 微信支付订单
   */
  // payOrderByWechat: function(event){
  //   var orderId = event.currentTarget.dataset.orderId;
  //   this.prePayWechatOrder(orderId);
  //   var successCallback = function(response){
  //     console.log(response);
  //   }
  //   common.doWechatPay("money", successCallback);
  // },
  
  payOrderByWechat: function (e) {
    var order_id = e.currentTarget.dataset.order_id;
    var order_sn = e.currentTarget.dataset.ordersn;
    if (!order_sn) {
      wx.showToast({
        title: "订单异常!",
        duration: 2000,
      });
      return false;
    }
    wx.request({
      url: app.data.url + '/Api/Wxpay/wxpay',
      data: {
        order_id: order_id,
        order_sn: order_sn,
        uid: app.data.order_id,
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }, // 设置请求的 header
      success: function (res) {
        if (res.data.status == 1) {
          var order = res.data.arr;
          wx.requestPayment({
            timeStamp: order.timeStamp,
            nonceStr: order.nonceStr,
            package: order.package,
            signType: 'MD5',
            paySign: order.paySign,
            success: function (res) {
              wx.showToast({
                title: "支付成功!",
                duration: 2000,
              });
              setTimeout(function () {
                wx.navigateTo({
                  url: '../user/dingdan?currentTab=1&otype=deliver',
                });
              }, 3000);
            },
            fail: function (res) {
              wx.showToast({
                title: 'fail',
                duration: 3000
              })
            }
          })
        } else {
          wx.showToast({
          //  title: res.data.err,
            title:'sucess',
            duration: 2000
          });
        }
      },
      fail: function (e) {
        // fail
        wx.showToast({
          title: '网络异常！',
          duration: 2000
        });
      }
    })
  },

  /**
   * 调用服务器微信统一下单接口创建一笔微信预订单
   */
  //   prePayWechatOrder: function(orderId){
  //     var uri = "/ztb/userZBT/GetWxOrder";
  //     var method = "post";
  //     var dataMap = {
  //       SessionId: app.globalData.userInfo.sessionId,
  //       OrderNo: orderId
  //     }
  //     console.log(dataMap);
  //     var successCallback = function (response) {
  //       console.log(response);
  //     };
  //     common.sentHttpRequestToServer(uri, dataMap, method, successCallback);
  //   }
  more(){
    var that = this;
    that.data.page++;
    //  高度自适应
    wx.getStorage({
      key: 'access_token',
      success: function(res) {
          that.setData({
            access_token:res.data
          })
          if(that.data.currentTab == 0){
            var type = ''
            var data = {access_token:res.data,page:that.data.page}
          }else if(that.data.currentTab == 1){
            var type = 1
            var data = {access_token:res.data,page:that.data.page,type:type}
          }else if(that.data.currentTab == 2){
            var type = 2
            var data = {access_token:res.data,page:that.data.page,type:type}
          }else if(that.data.currentTab == 3){
            var type = 3
            var data = {access_token:res.data,page:that.data.page,type:type}
          }
          wx.request({
            url:app.data.url+'/api/order',
            method:'POST',
            data:data,
            success:function(res){
              if(res.data.code == 1){
                var list = that.data.orderList0.concat(res.data.data[0].list)
                that.setData({
                  orderList0:list
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
  }
})