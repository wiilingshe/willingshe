// pages/orderform/orderform.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectedinfo:[],
    goods:[],
    addressinfo:[],
    selectaddress:false,
    addressList:[],
    youhuijuan:false,
    list:[],
    voucher_id:'',
    useing:'',
    keyongcoupon:[],
    jian:0,
    postage:0,
    type:'',
    spec_id:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var that = this;
    wx.getStorage({
      key: 'selectedinfo',
      success: function(res) {
          console.log(res.data)
          that.setData({
            selectedinfo:res.data
          })
      } 
    })
    wx.getStorage({
      key:'access_token',
      success:function(res1){
        if(options.type == 1){
          var data = {access_token:res1.data,type:options.type,spec_id:options.spec_id,count:options.count}
          that.data.type = 1
          that.data.spec_id = options.spec_id;
        }else if(options.type == 2){
          var data={access_token:res1.data,type:2}
          that.data.type = 2
        }else if(options.type == 3){
          var data={access_token:res1.data,type:3,order_id:options.order_id}
          that.data.type = 1;
          that.data.spec_id = options.spec_id;
        }
        wx.request({
          url:app.data.url+'/api/order/pre',
          method:'POST',
          data:data,
          success:function(res){
            if(res.data.code == 1){
              console.log(res.data.data[0].products[0])
              if(res.data.data[0].voucher.length != 0){
                that.setData({
                  selectedinfo:res.data.data[0].products[0],
                  postage:res.data.data[0].postage,
                  keyongcoupon:res.data.data[0].voucher,
                  useing:'有优惠券使用'
                })
              }else{
                that.setData({
                  selectedinfo:res.data.data[0].products[0],
                  postage:res.data.data[0].postage,
                  useing:'暂无优惠券使用'
                })
              }
            }else{
              wx.showToast({
                title:res.data.message,
                icon:'none',
                duration:2000
              })
            }
            console.log(res.data)
          }
        })
      }
    })
    wx.getStorage({
      key: 'access_token',
      success: function(res) {
        wx.request({
          url:app.data.url+'/api/address/list',
          method:'POST',
          data:{access_token:res.data},
          success:function(res){
            for(let i =0;i<res.data.data[0].list.length;i++){
              if(res.data.data[0].list[i].isdefault == 1){
                that.setData({
                  addressinfo:res.data.data[0].list[i]
                })
              }
            }
          }
        })
        // wx.request({
        //   url:app.data.url+'/api/personal/coupon',
        //   method:'POST',
        //   data:{access_token:res.data},
        //   success:function(res1){
        //     if(res1.data.code == 1){
        //       that.setData({
        //         list:res1.data.data[0].list
        //       })
        //       if(res1.data.data[0].list.length != 0){
        //         for(let i=0;i<res1.data.data[0].list.length;i++){
        //           var price = that.data.selectedinfo.price*that.data.selectedinfo.goodsNum;
        //           if(Number(price)>Number(res1.data.data[0].list[i].fullmoney)){
        //             that.data.keyongcoupon = that.data.keyongcoupon.concat(res1.data.data[0].list[i])
        //           }
        //         }
        //         console.log(that.data.keyongcoupon)
        //         that.setData({
        //           keyongcoupon:that.data.keyongcoupon,
        //           useing:'有优惠券使用'
        //         })
        //       }else{
        //         that.setData({
        //           useing:'暂无优惠券使用'
        //         })
        //       }
        //     }else{
        //       wx.showToast({
        //         title: res1.data.message,
        //         icon: 'none',
        //         duration: 2000
        //       })
        //     }
        //   }
        // })
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
  pay(){
    wx.showLoading()
    var that = this;
    wx.getStorage({
      key: 'access_token',
      success: function(res) {
        if(that.data.voucher_id == ''){
          var data = {access_token:res.data,type:that.data.type,spec_id:that.data.spec_id,count:that.data.selectedinfo.count,address_id:that.data.addressinfo.address_id}
        }else{
          var data = {access_token:res.data,type:that.data.type,spec_id:that.data.spec_id,count:that.data.selectedinfo.count,address_id:that.data.addressinfo.address_id,voucher_id:that.data.voucher_id}
        }
        wx.request({
          url:app.data.url+'/api/order/place',
          method:'POST',
          data:data,
          success:function(res1){
            if(res1.data.code == 1){
              wx.request({
                url:app.data.url+'/api/pay/wechat',
                method:'POST',
                data:{access_token:res.data,pay_sn:res1.data.data[0].pay_sn},
                success:function(res2){
                  wx.hideLoading()
                  if(res2.data.code == 1){
                    wx.requestPayment({
                      'timeStamp': res2.data.data[0].timeStamp.toString(),
                      'nonceStr': res2.data.data[0].nonceStr,
                      'package': res2.data.data[0].package,
                      'signType': res2.data.data[0].signType,
                      'paySign': res2.data.data[0].paySign,
                      'success': function (res) {  
                        console.log(res)
                        if (res.errMsg == 'requestPayment:ok') { 
                        wx.showModal({
                          content: '支付成功',
                          showCancel: false,
                          confirmColor: '#fe7e00',
                          success: function (res) {
                            if (res.confirm) {
                              wx.navigateTo({
                                url: '../indent/indent',
                              })
                            }
                          }
                        })
                        } else if (res.errMsg == 'requestPayment:fail cancel'){
                          wx.navigateTo({
                            url: '../indent/indent',
                          })

                        }else{
                          wx.showModal({
                            content: '支付失败',
                            showCancel: false,
                            confirmColor: '#fe7e00',
                            success: function (res) {
                              if (res.confirm) {
                                wx.navigateTo({
                                  url: '../indent/indent',
                                })
                              }
                            }
                          })
                        }
                      },
                      'fail': function (res) {
                       
                      }
                    })
                  }else{
                    wx.showToast({
                      title: res2.data.message,
                      icon:'none',
                      duration: 2000
                    })
                  }
                }
              })
            }else{
              wx.hideLoading()
              wx.showToast({
                title: res1.data.message,
                icon:'none',
                duration: 2000
              })
            }
          }
        })
      } 
    })
  },
  selectaddresslist(){
    var that = this;
    wx.showLoading()
    this.setData({
      selectaddress:true
    });
    wx.getStorage({
      key: 'access_token',
      success: function(res) {
        wx.request({
          url:app.data.url+'/api/address/list',
          method:'POST',
          data:{access_token:res.data},
          success:function(res1){
            wx.hideLoading()
            if(res1.data.code == 1){
              that.setData({
                addressList:res1.data.data[0].list
              })
            }else{
              wx.showToast({
                title: res1.data.message,
                icon:'none',
                duration: 2000
              });
            }
          }
        })
      }
    })
  },
  selectaddress(e){
    console.log(e)
    console.log(this.data.addressinfo)
    this.data.addressinfo.name = e.currentTarget.dataset.name;
    this.data.addressinfo.mobile = e.currentTarget.dataset.mobile;
    this.data.addressinfo.province = e.currentTarget.dataset.province;
    this.data.addressinfo.city = e.currentTarget.dataset.city;
    this.data.addressinfo.country = e.currentTarget.dataset.country;
    this.data.addressinfo.detail = e.currentTarget.dataset.detail;
    this.data.addressinfo.address_id = e.currentTarget.dataset.id;
    this.setData({
      addressinfo:this.data.addressinfo,
      selectaddress:false
    })
  },
  addaddress(){
    wx.navigateTo({
      url:'../address/address'
    })
  },
  addresslist1(){
    this.setData({
      selectaddress:false
    })
  },
  couponList(){
    var that = this;
    this.setData({
      youhuijuan : true
    })
  },
  close(){
    this.setData({
      youhuijuan : false
    })
  },
  getItem(e){
    console.log(e.currentTarget.dataset.jian)
    this.setData({
      voucher_id:e.currentTarget.dataset.id,
      youhuijuan : false,
      useing:e.currentTarget.dataset.name,
      jian:Number(e.currentTarget.dataset.jian)
    })
  }
})