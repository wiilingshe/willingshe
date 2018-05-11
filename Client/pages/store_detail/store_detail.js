// pages/store_detail/store_detail.js
var app = getApp()
var url = app.globalData.url
var memid = app.globalData.memid
var keyt = app.globalData.keyt
var request = require('../../utils/request.js')
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail:{},
    navon:0,
    eva:[],
    shop_id:'',
    main_eva:{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '商家详情'//页面标题为路由参数 
    })
    var that=this
    that.setData({
      shop_id: options.id,
    });
    var path = url + 'api/shop/info'
    var data = { id: options.id, access_token: app.accessToken()}
    //轮播图片
    request.sendRrquest(path, 'POST', data, {})
      .then(function (res) {
        if(res.data.code==1){
          that.setData({
            detail: res.data.data[0],
          });
        }
        if (res.data.code == -1) {
          wx.showModal({
            content: res.data.message,
          })
          if (res.data.errorCode) { app.refreshToken(); }
        }
        //console.log(items.data)
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
  /**
   * 点击收藏
   */
  collect: function (e) {
    var that = this
    var status = that.data.detail.collect
    if (status == 1) {
      status = 2
    } else {
      status = 1
    }
    //商家收藏
    var path = url + 'api/sellerdetail/collect'
    request.sendRrquest(path, 'GET', { selid: this.options.id, memid: memid, status: status }, {})
      .then(function (items) {
        if (items.data.code==1){
          that.data.detail.collect = items.data.data[0].status
          that.setData({
            detail: that.data.detail
          })
        }
      }, function (error) {
        console.log(error);
      });
  },
   /**
   * 优惠信息下拉显示
   */
  dropDown:function(e){
    this.setData({
      more:false,
      coupon_list:this.data.coupon_list2
    })
  },
  /**
   * 领取抵用券
   */
  get_v:function(e){
    var id=e.currentTarget.dataset.id
    console.log(id)
    console.log(memid)
    //领取抵用券
    var path = url + 'api/coupon/receive'
    request.sendRrquest(path, 'GET', { id:id, memid: memid}, {})
      .then(function (items) {
        console.log(items.data)
        if (items.data.code == 1) {
          wx.showToast({
            title:'领取成功',
            mask:true,
            
          })
        }else{
          wx.showToast({
            title: items.data.message,
            mask: true,
            image: '../../images/icon-fail.png'
          })
        }
      }, function (error) {
        console.log(error);
      });
  },
  //外卖
  outfood:function(e){
    var that=this
   
    if (!that.data.outfood) {
      wx.showModal({
        content: '很抱歉，您所在位置已超出配送范围',
        showCancel: false,
        confirmColor: '#fe7e00'
      })
    } else {
      wx.redirectTo({
        url: '../menu/menu?type=2&id=' + that.data.detail.id
      })
    }
  },
  //打电话
  callphone:function(e){
    wx.makePhoneCall({
      phoneNumber: this.data.detail.tel
       })
  }
   
})