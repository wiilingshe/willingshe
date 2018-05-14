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
    ifshow:false,
    spec_id:''
  },
  onLoad: function (options) { 
    wx.showLoading()
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
              wx.hideLoading()
              that.setData({
                ifshow:true
              })
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
        wx.getStorage({
          key:'access_token',
          success:function(res1){
            res.confirm && wx.request({
              url: app.data.url + '/api/order/cancel',
              method: 'post',
              data: {
                access_token:res1.data,
                order_id: orderId
              },
              header: { 
                'Content-Type': 'application/x-www-form-urlencoded'
              },
              success: function (res) {
                //--init data
                var status = res.data.code;
                if (status == 1) {
                  wx.showToast({
                    title: '操作成功！',
                    duration: 2000
                  });
                  that.loadOrderList();
                } else {
                  wx.showToast({
                    title:res.data.message,
                    icon:'none',
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
        })

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
            var status = res.data.code;
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
    that.data.page = 1;
    wx.getStorage({
      key:'access_token',
      success:function(res1){
        if(that.data.currentTab == 0){
          var type = ''
          var data = {access_token:res1.data,page:that.data.page}
        }else if(that.data.currentTab == 1){
          var type = 1
          var data = {access_token:res1.data,page:that.data.page,type:type}
        }else if(that.data.currentTab == 2){
          var type = 2
          var data = {access_token:res1.data,page:that.data.page,type:type}
        }else if(that.data.currentTab == 3){
          var type = 3
          var data = {access_token:res1.data,page:that.data.page,type:type}
        }
        wx.request({  // 这是个请求,
          url: app.data.url + '/api/order', //请求地址
          method: 'post', //请求方式
          data: data,
          success: function (res) {
            wx.showToast({
            //  title: res,
              icon: 'success',
              duration: 2000
            });
            //这里才是你刚刚看的那边的那个返回参数里面取的，  app.data.list.order_id 这里才能取的到值
            //--init data        
            var status = res.data.code; // 如果用aaaaa, 那这里就是用aaaaa.data.status 去取状态值
            var list = res.data.data[0].list;
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
      }
    })
  },

  loadReturnOrderList: function () {
    var that = this;
    wx.request({
      url: app.data.url + '/Api/Order/order_refund',
      method: 'post',
      data: {
        uid: app.data.order_id,
        page: that.data.refundpage,
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        //--init data        
        var data = res.data.ord;
        var status = res.data.status;
        if (status == 1) {
          that.setData({
            orderList4: that.data.orderList4.concat(data),
          });
        } else {
          wx.showToast({
            title: "fail",
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
  },

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
    wx.showLoading()
    console.log(e.detail.current)
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
              wx.hideLoading()
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
      // switch (that.data.currentTab) {
      //   case 0:
      //   //because  Cannot read property 'length' of undefined  delete"!"
      //     that.data.orderList0.length && that.loadOrderList();
      //     break;
      //   case 1:
      //     that.data.orderList1.length && that.loadOrderList();
      //     break;
      //   case 2:
      //     that.data.orderList2.length && that.loadOrderList();
      //     break;
      //   case 3:
      //     that.data.orderList3.length && that.loadOrderList();
      //     that.loadReturnOrderList();
      //     break;
      // }
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
    wx.navigateTo({
      url:'../orderform/orderform?type=3&order_id='+order_id+'&spec_id='+e.currentTarget.dataset.sid
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
  fenlei(){
    wx.switchTab({
      url: '../classfiy/classfiy'
    })
  },
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
  },
  refund(e){
    var that = this;
    var orderId = e.currentTarget.dataset.order_id;
    wx.showModal({
      title: '提示',
      content: '你确定要申请退款吗？',
      success: function (res) {
        wx.navigateTo({
          url:'../returns/returns?id='+orderId
        })
      }
    });
  },
  shouhuo(e){
    wx.showLoading()
    var that = this;
    var orderId = e.currentTarget.dataset.order_id;
    wx.getStorage({
      key:'access_token',
      success:function(res1){
        wx.request({
          url:app.data.url+'/api/order/receive',
          method:'POST',
          data:{access_token:res1.data,order_id:orderId},
          success:function(res){
            wx.hideLoading()
            if(res.data.code == 1){
              wx.showToast({
                title:'收货成功',
                icon:'none',
                duration:2000
              })
              if(that.data.currentTab == 0){
                var data = {access_token:res1.data,page:1}
              }else{
                var data = {access_token:res1.data,page:1,type:that.data.currentTab}
              }
              wx.request({
                url:app.data.url+'/api/order',
                method:'POST',
                data:data,
                success:function(res){
                  if(res.data.code == 1){
                    if(that.data.currentTab == 0){
                      that.setData({
                        orderList0:res.data.data[0].list,
                        page:1
                      })
                    }else if(e.detail.current == 1){
                      that.setData({
                        orderList1:res.data.data[0].list,
                        page:1
                      })
                    }else if(e.detail.current == 2){
                      that.setData({
                        orderList2:res.data.data[0].list,
                        page:1
                      })
                    }else if(e.detail.current == 3){
                      that.setData({
                        orderList3:res.data.data[0].list,
                        page:1
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
            }else{
              wx.showToast({
                title:res.data.message,
                icon:'none',
                duration:2000
              })
            }
          }
        })
      }
    })
  },
  wuliu(e){
    wx.showLoading()
    var that = this;
    var orderId = e.currentTarget.dataset.order_id;
    wx.getStorage({
      key:'access_token',
      success:function(res1){
        wx.request({
          url:app.data.url+'/api/order/express',
          method:'POST',
          data:{access_token:res1.data,order_id:orderId},
          success:function(res){
            wx.hideLoading()
            if(res.data.code == 1){
              wx.showModal({
                title: '物流信息',
                content: res.data.data[0].express_name+res.data.data[0].express_num,
                success: function(res) {
                  if (res.confirm) {
                    console.log('用户点击确定')
                  } else if (res.cancel) {
                    console.log('用户点击取消')
                  }
                }
              })
            }else{
              wx.showToast({
                title:res.data.message,
                icon:'none',
                duration:2000
              })
            }
          }
        })
      }
    })
  }
})