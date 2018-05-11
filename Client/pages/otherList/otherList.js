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
    from:1,
    store: [],
    show:[],
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
    var data = {}
    var path=''
    //请求商家数据
    try {
      var value = wx.getStorageSync('gps')  
      if (value) {
        that.setData({
          lat: value.lat,
          lng: value.lng,
        })
        
      } else {
        wx.getStorage({
          key: 'gps',
          success: function (res) {
            //console.log(res)
            that.setData({
              lat: res.data.lat,
              lng: res.data.lng,
            })
            
          }
        })
      }
    } catch (e) { }
    console.log(options)
    if (options.from==1){
    that.setData({
      input: options.search
    })
    data = { lat: that.data.lat, lng: that.data.lng, page: 1, sort: that.data.sort, search: that.data.input }
    path= url + 'api/index/searchgoods'
    }else{
      that.setData({
        from:options.from
      })
      data = { lat: that.data.lat, lng: that.data.lng, page: 1, sort: that.data.sort,}
      path = url + 'api/index/menu'
    }
    console.log(data,path)
    request.sendRrquest(path, 'GET', data, {})
      .then(function (items) {
        console.log(items.data.data)
        var show = []
        for (var i = 0; i < items.data.data[0].list.length; i++) {
          show[i] = 2
        }
        that.setData({
          store: items.data.data[0].list,
          show: show
        });

        console.log(items.data.data)
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
        if(that.data.from==1){
          var path = url + 'api/index/searchgoods'
          var data = { lat: that.data.lat, lng: that.data.lng, page: page, sort: that.data.sort, search: that.data.input }
        }else{
          var path = url + 'api/index/menu'
          var data = { lat: that.data.lat, lng: that.data.lng, page: page, sort: that.data.sort,}
        }       
        //console.log(that.data.lat, that.data.lng)
        request.sendRrquest(path, 'GET', data, {})
          .then(function (items) {
            console.log(items.data.data)
            wx.hideLoading()
            wx.stopPullDownRefresh()
            var show = []
            for (var i = 0; i < items.data.data[0].list.length; i++) {
              show[i] = 2
            }
            that.setData({
              store: items.data.data[0].list,
              show:show
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
      if(that.data.from==1){
        var path = url + 'api/index/searchgoods'
      }else{
        var path = url + 'api/index/menu' 
      }
      var data = { lat: that.data.lat, lng: that.data.lng, page: page, sort: that.data.sort, search: that.data.input }
      console.log(data)
      request.sendRrquest(path, 'GET', data, {})
        .then(function (items) {
          var len = items.data.data.length
          if (len > 0) {
            var show=[]
            for(var i=0;i<len;i++){
              show[i]=2
            }
            that.data.store.push(items.data.data[0].list)
            that.data.show.push(show)
            that.setData({
              store: that.data.store,
              show: that.data.show,
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
    if(that.data.from==1){
      var path = url + 'api/index/searchgoods'
    }else{
      var path = url + 'api/index/menu'
    }
    var data = { lat: that.data.lat, lng: that.data.lng, page: page, sort: index, search: that.data.input}
    //console.log(that.data.lat, that.data.lng)
    request.sendRrquest(path, 'GET', data, {})
      .then(function (items) {
        console.log(items.data.data)
        var show = []
        for (var i = 0; i < items.data.data[0].list.length; i++) {
          show[i] = 2
        }
        that.setData({
          store: items.data.data[0].list,
          show:show
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
    if (that.data.from == 1) {
      var path = url + 'api/index/searchgoods'
    } else {
      var path = url + 'api/index/menu'
    }
    that.setData({
      sort: 0,
      store: []
    })
    page = 1
    var data = { lat: that.data.lat, lng: that.data.lng, page: page, sort: 0, search: that.data.input }
    //console.log(path)
    request.sendRrquest(path, 'GET', data, {})
      .then(function (items) {
        wx.hideLoading()
       // console.log(items.data.data)
        var show = []
        for (var i = 0; i < items.data.data[0].list.length; i++) {
          show[i] = 2
        }
        that.setData({
          store: items.data.data[0].list,
          show:show
        });
        //  console.log(items.data.data)
      }, function (error) {
        console.log(error);
      });
  },
  showHide:function(e){
    var index=e.currentTarget.dataset.index
    this.data.show[index]=100
    this.setData({
      show:this.data.show
    })
    console.log(this.data.show)
  }
})