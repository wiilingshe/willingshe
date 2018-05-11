// pages/shopList/shopList.js
var app = getApp()
var url = app.globalData.url
var request = require('../../utils/request.js')
var page = 1
var more = true
Page({

  /**
   * 页面的初始数据
   */
  data: {
    store: [],
    lat: '',
    lng: '',
    location: '',
    sort: 0,
    input: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    //请求商家数据
    that.setData({
      input: options.search
    })
    try {
      var value = wx.getStorageSync('gps')
      var data = {}
      if (value) {
        that.setData({
          lat: value.lat,
          lng: value.lng,
        })
        data = { lat: value.lat, lng: value.lng, page: 1, sort: that.data.sort, search: that.data.input }
      } else {
        wx.getStorage({
          key: 'gps',
          success: function (res) {
            //console.log(res)
            that.setData({
              lat: res.data.lat,
              lng: res.data.lng,
            })
            data = { lat: res.data.lat, lng: res.data.lng, page: 1, sort: that.data.sort, search: that.data.input }
          }
        })
      }
      var path = url + 'api/index/search'
      console.log(data)
      request.sendRrquest(path, 'GET', data, {})
        .then(function (items) {
          console.log(items.data.data)
          that.setData({
            store: items.data.data[0].list,
          });
          console.log(items.data.data)
        }, function (error) {
          console.log(error);
        });

    } catch (e) { }
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
  onPageScroll: function (e) {
    //console.log(e)
    var that = this
    if (e.scrollTop > 87) {
      that.setData({
        up: true,
      })
    } else {
      that.setData({
        up: false,
      })
    }
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    page = 1
    var that = this
    wx.showLoading({
      title: '加载中',
    })
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        that.setData({
          lat: res.latitude,
          lng: res.longitude
        })
        var path = url + 'api/index/search'
        var data = { lat: that.data.lat, lng: that.data.lng, page: page, sort: that.data.sort ,search: that.data.search}
        //console.log(that.data.lat, that.data.lng)
        request.sendRrquest(path, 'GET', data, {})
          .then(function (items) {
            console.log(items.data.data)
            wx.hideLoading()
            wx.stopPullDownRefresh()
            that.setData({
              store: items.data.data[0].list,
            });
            //  console.log(items.data.data)
          }, function (error) {
            console.log(error);
          });

      }
    })


  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this
    if (more == true) {
      page++;
      var path = url + 'api/index/search'
      var data = { lat: that.data.lat, lng: that.data.lng, page: page, sort: that.data.sort, search: that.data.search }
      console.log(data)
      request.sendRrquest(path, 'GET', data, {})
        .then(function (items) {
          var len = items.data.data.length
          if (len > 0) {
            that.data.store.push(items.data.data[0].list)
            that.setData({
              store: that.data.store,
            });
          } else {
            more = false

          }
        }, function (error) {
          console.log(error);
        });
    }


  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  //选择筛选项
  choose: function (e) {
    var that = this
    page = 1
    var index = e.target.dataset.index
    that.setData({
      sort: index,
    })
    var path = url + 'api/index/search'
    console.log(that.data.input)
    var data = { lat: that.data.lat, lng: that.data.lng, page: page, sort: index,limit:20,search: that.data.input }
    //console.log(that.data.lat, that.data.lng)
    request.sendRrquest(path, 'GET', data, {})
      .then(function (items) {
        console.log(items.data.data)
        that.setData({
          store: items.data.data[0].list,
        });
        //  console.log(items.data.data)
      }, function (error) {
        console.log(error);
      });

  },
  input: function (e) {
    //console.log(e.detail.value)
    this.setData({
      input: e.detail.value
    })
  },
  search: function () {
    var that = this
    wx.showLoading({
      title: '搜索中',
    })
    var path = url + 'api/index/search'
    that.setData({
      sort: 0,
      store: []
    })
    page = 1
    var data = { lat: that.data.lat, lng: that.data.lng, page: page, sort: 0, search: that.data.input,limit:20 }
    console.log(data)
    request.sendRrquest(path, 'GET', data, {})
      .then(function (items) {
        wx.hideLoading()
        console.log(items.data.data)
        that.setData({
          store: items.data.data[0].list,
        });
        //  console.log(items.data.data)
      }, function (error) {
        console.log(error);
      });
  }
})