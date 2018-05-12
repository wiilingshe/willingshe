// pages/flagship/flagship.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    page:1,
    bid:'',
    cid:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading()
    var that = this;
    that.setData({
      bid:options.bid,
      cid:options.cid
    })
    console.log(options)
    wx.request({
      url:app.data.url+'/api/goods',
      method:'post',
      data:{bid:options.bid,cid:options.cid,page:1,limit:10},
      // data:{bid:2,cid:2,page:1,limit:10},
      success:function(res){
        wx.hideLoading()
        if(res.data.code == 1){
          that.setData({
            list:res.data.data[0].data
          })
        }else{
          wx.showToast({
            title: res.data.message,
            icon: 'success',
            duration: 2000
          })
        }
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

  scrolltolower(){
    wx.showLoading()
    var that = this;
    that.data.page++;
    wx.request({
      url:app.data.url+'/api/goods',
      method:'post',
      data:{bid:that.data.bid,cid:that.data.cid,page:that.data.page,limit:10},
      // data:{bid:2,cid:2,page:1,limit:10},
      success:function(res){
        wx.hideLoading()
        if(res.data.code == 1){
          that.setData({
            list:that.data.list.concat(res.data.data[0].data)
          })
        }else{
          wx.showToast({
            title: res.data.message,
            icon: 'success',
            duration: 2000
          })
        }
      }
    })
  },
  datails(e){
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '../choiceGoods/choiceGoods?id='+e.currentTarget.dataset.id
    })
  }
})