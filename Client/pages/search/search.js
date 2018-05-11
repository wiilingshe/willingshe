// pages/search/search.js
var app = getApp()
var url = app.globalData.url
var request = require('../../utils/request.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lat:'',
    lng:'',
    input:'',
    way:0,
   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
     // console.log(options)
     var that=this
      wx.getStorage({ key: 'gps', 
      success: function (res) { 
        console.log(res.data) 
        that.setData({
          lat: res.data.lat,
          lng:res.data.lng
        })
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
  input:function(e){
    //console.log(e.detail.value)
    this.setData({
      input: e.detail.value
    })
  },
  search:function(e){
    var that=this
    var path = url +'api/index/search'
    var data = { lat: this.data.lat, lng: this.data.lng, search: this.data.input,page:1,limit:20,sort:0 }
    if (this.data.input!==''){
      request.sendRrquest(path, 'GET', data, {})
        .then(function (res) {
          console.log(res.data.data)
          if (res.data.data[0].type == 0) {
            wx.redirectTo({
              url: '../shopList/shopList?search=' + that.data.input,
            })
          } else {
            wx.redirectTo({
              url: '../otherList/otherList?search=' + that.data.input + '&from=1',
            })
          }

        }, function (error) {
          console.log(error);
        });
    }else{
      wx.showModal({
        content: '请输入搜索内容',
      })
    }
 
  
  },
})