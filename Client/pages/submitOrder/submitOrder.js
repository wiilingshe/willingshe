// pages/submitOrder/submitOrder.js
var app = getApp()
var url = app.globalData.url
var request = require('../../utils/request.js')
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:1,
    access_token:null,
    shop_id: '',
    list: [],
    shop: {}, 
    remarks: '',
    discount:0,//优惠
    total:0,
    fee:0,
    time_show:false,
    send_time: null,
    start_time:'',
    end_time:'',
    kind:'',
    send_way:['不接受配送','配送费'],
    way:0,
    send_show:false,
    address:'',
    ifaddress:0,
    addressLists:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var that = this
    if(options.jian > 0){
      that.setData({
        discount: options.jian
      })
    }
    wx.setNavigationBarTitle({
      title: '提交订单'//页面标题为路由参数 
    })
    var that = this
    //请求商家信息
    try{
      var value = wx.getStorageSync('session')
      if(value){
        that.setData({
          access_token: value.access_token
        })
      }
    }catch(e){}
    try{
      var value = wx.getStorageSync('shop')    
      if (value){
        that.setData({
          shop: value,
          shop_id: value.id
        })
        var value2 = wx.getStorageSync('cart' + value.id)
        var value3 = wx.getStorageSync('goodsCart')
        //可选择的送出时间
        console.log(that.data.shop)
       // var delivery_time = that.data.shop.outfood_info.avg_delivery_time
        var timestamp = Date.parse(new Date())
        //var time = (timestamp / 1000 + delivery_time * 60) * 1000
        var start_time = util.formatTime3(new Date(timestamp))
       // var end_time = that.data.shop.end_time
        console.log(start_time)
        that.setData({
          send_time: start_time,
          start_time: start_time,
          //end_time: end_time
        })
        if (value2) {
          that.setData({
            total: value2.total,
          })
        }
        if (value3) {
          that.setData({
            list: value3[value.id]
          })
        }
      }
      
      
      
    }catch(e){

    }
        
 
   wx.request({
    url:url+'/api/member/address_list',
    method:'POST',
    data:{access_token:app.accessToken()},
    success:function(res){
      for(let i=0;i<res.data.data.length;i++){
        if(res.data.data[i].isdefault == 1){
          var address = res.data.data[i].province+res.data.data[i].city+res.data.data[i].country+res.data.data[i].detail;
          that.setData({
            address:address,
            addressLists:res.data.data,
          })
        }
      }
    }
   })
  

  
  },
  selectaddress(){
    if(this.data.address == ''){
      wx.redirectTo({
        url: '../addressLists/addressLists'
      })
    }else{
      this.setData({
        ifaddress:1
      })
    }
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
    if(this.data.type == 1){
      this.setData({
        
      })
    }else{

    }
   
      
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
  //备注
  input: function (e) {
    this.setData({
      remarks: e.detail.value
    })
  },
  //选择送达时间
 bindTimeChange: function (e) { 
   this.setData({ 
     send_time: e.detail.value 
     }) 
   },
 submit:function(e){
   var that=this

   // if (that.data.remarks==''){
   //   wx.showToast({
   //     title: "请填写好备注",
   //     image: '../../images/icon-fail.png'
   //   })
   // }else 
   if(that.data.address==''){
    wx.showToast({
       title: "请填写好地址",
       image: '../../images/icon-fail.png'
     })
   }else{
     wx.showLoading({
       title: '提交中',
       mask: true,
     })
    var form = e.detail.value
    try{
      var value=wx.getStorageSync('orderRefer')
      if(value){
        form.products =value[that.data.shop_id]
      }
    }catch(e){

    }   
    //提交
    form.total_price = that.data.total - that.data.discount + that.data.fee;
    if(that.data.type == 2){
      form.address = that.data.address;
    }

    var path = url + 'api/order/placeorder' 
    console.log(form)
    console.log(JSON.stringify(form))
    request.sendRrquest(path, 'POST', form, {})
      .then(function (items) {
        console.log(items) 
        wx.hideLoading()      
        if(items.data.code==1){
          app.removek('cart' + that.data.shop_id)
          try {
            var value = app.getk('goodsCart', false)
            var value2 = app.getk('orderRefer', false)
            if (value) {
              for (var key in value) {
                console.log(key)
                if (key == that.data.shop_id) {
                  value[key] = undefined
                  wx.setStorage({
                    key: 'goodsCart',
                    data: value,
                  })
                  break;
                }
              }
              for (var key in value2) {
                if (key == that.data.shop_id) {
                  value2[key] = undefined
                  wx.setStorage({
                    key: 'orderRefer',
                    data: value2,
                  })
                  break;
                }
              }
            }
          } catch (e) { }
          var path = url + 'api/Order/pay'
          console.log(app)
          var data = { access_token:that.data.access_token,openid:app.globalData.openid,order_sn:items.data.data[0].order_sn }
          // var data = { access_token:that.data.access_token,openid:'okSzXt_KIZVhGZe538aOKIMswUiI',order_sn:items.data.data[0].order_sn }
          request.sendRrquest(path, 'POST', data, {}).then(function(items1){
            console.log(items1.data.data[0].paySign);
            var paySign = items1.data.data[0].paySign
            wx.requestPayment({
                'timeStamp': items1.data.data[0].timeStamp,
                'nonceStr': items1.data.data[0].nonceStr,
                'package': items1.data.data[0].package,
                'signType': items1.data.data[0].signType,
                'paySign': paySign,
                'success': function (res) {  
                  console.log(res)
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
                  } else if (res.errMsg == 'requestPayment:fail cancel'){
                    wx.switchTab({
                      url: '../my_order/my_order',
                    })

                  }else{
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
            })
          // var path = url + 'api/order/wechat'
          // var pay_sn = items.data.data[0].pay_sn
          // var data = { pay_sn: pay_sn }
          /*
          request.sendRrquest(path, 'POST', data, {})
            .then(function (items) {
              console.log(items.data);
              //微信支付         
              wx.removeStorage({ key: 'cart' + that.data.shop_id, success: function (res) { console.log(res.data) } })
              try {
                var value = wx.getStorageSync('memid' + memid)
                if (value) {
                  for (var key in value) {
                    if (key == that.data.shop_id) {
                      value[key] = undefined
                      break
                    }
                  }
                  wx.setStorage({
                    key: 'memid' + memid,
                    data: value,
                  })

                }
              } catch (e) {
              }  
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
                  } else if (res.errMsg == 'requestPayment:fail cancel'){
                    wx.switchTab({
                      url: '../my_order/my_order',
                    })

                  }else{
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
          */
        
        }else{
          wx.showModal({
            title: '错误提示', 
            content: items.data.message, 
            showCancel:false,
            confirmColor:'#fe7e00',
            success: function (res) { 
              if (res.confirm) { 
             
                } else if (res.cancel) { 
                  
                  } 
                  }
          })
        } 
      }, function (error) {
        console.log(error);
      }); 
     
   }
   
 },
 //点击展开配送方式选择
  showSend:function(e){
    this.setData({
      send_show: true
    })
  },
 //选择配送方式
 chooseSend:function(e){
   console.log(e.currentTarget.dataset.id)
   var way = e.currentTarget.dataset.id
   this.setData({
     way: e.currentTarget.dataset.id,
     send_show:false,
     
   })
   if(way==1){
     this.setData({
       fee: Number(this.data.shop.send_fee),
       type:2,
     })
     
   }else{
     this.setData({
       fee: 0,
       type:1,
     })
   }
 },
 select(e){
  console.log(this.data.type)
  console.log(e.currentTarget.dataset.address)
  this.setData({
    ifaddress:0,
    address:e.currentTarget.dataset.address
  })
 },
 radioChange: function(e) {
  var way = e.detail.value;
  console.log(way)
  if(way==1){
     this.setData({
       fee: Number(this.data.shop.send_fee),
       type:2,
     })
     
   }else{
     this.setData({
       fee: 0,
       type:1,
     })
   }
 }
})