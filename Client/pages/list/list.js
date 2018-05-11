// pages/list/list.js
var app = getApp()
var url = app.globalData.url
var request = require('../../utils/request.js')
var page=1
var more=true
Page({

  /**
   * 页面的初始数据
   */
  data: {
    store:[],   
    lat:'',
    lng:'',
    location:'',
    sort:0,
    input:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    var that=this
    //请求商家数据
    wx.getStorage({
      key: 'gps',
      success: function (res) {
        //console.log(res)
        that.setData({
          lat: res.data.lat,
          lng: res.data.lng,     
        })
        var data = {}
        data = { lat: res.data.lat, lng: res.data.lng, page: 1, sort:that.data.sort }
        wx.getStorage({
          key: 'listId',
          success: function (res) {         
              that.setData({
                series_id: res.data.id,
                style: res.data.name
              })
              data.cid = res.data.id
              wx.removeStorageSync('listId')         
          },
          fail: function (res) {

          },
          complete: function (res) {          
            var path = url + 'api/shop/index'
            //console.log(res)
            //console.log(that.data.lat, that.data.lng)
            request.sendRrquest(path, 'GET', data, {})
              .then(function (res) {
                console.log(res.data.data)
                wx.hideLoading()
                that.setData({
                  store: res.data.data[0].list,
                });

              }, function (error) {
                console.log(error);
              });
          }
         
        })

      },
    })

   

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
    var that=this
    if (e.scrollTop>87){     
      that.setData({
        up:true,
      })
    }else{    
      that.setData({
        up: false,
      })
    }
    },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    page=1   
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
        var path = url + 'api/shop/index'
        var data = { lat: that.data.lat, lng: that.data.lng, page: page, sort: that.data.sort }
        //console.log(that.data.lat, that.data.lng)
        request.sendRrquest(path, 'GET', data, {})
          .then(function (res) {
            console.log(res.data.data)
            wx.hideLoading()
            wx.stopPullDownRefresh()
            that.setData({
              store: res.data.data[0].list,
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
    var that=this  
    if(more==true){
      page++;
      var path = url + 'api/shop/index'
      var data = { lat: res.data.lat, lng: res.data.lng, page: page, sort: that.data.sort, search: that.data.search }
      console.log(data)
      request.sendRrquest(path, 'GET', data, {})
        .then(function (res) {
          var len = res.data.data.length
          if (len > 0) {
            that.data.store.push(res.data.data[0].list)
            that.setData({
              store: that.data.store,
            });
          }else{
            more=false
           
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
  choose:function(e){
    var that=this
    page=1
    var index = e.target.dataset.index
      that.setData({
        sort: index,
      })
      var path = url + 'api/shop/index'
      var data = { lat: that.data.lat, lng: that.data.lng, page: page, sort: index }
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
  search:function(){
    var that = this
    var path = url + 'api/index/search'
    var data = { lat: that.data.lat, lng: that.data.lng, search: that.data.input }
    if (this.data.input !== '') {
      wx.showLoading({
        title: '搜索中',
      })
      request.sendRrquest(path, 'GET', data, {})
        .then(function (res) {
          console.log(res.data.data)
          if (res.data.data[0].type == 0) {
            wx.navigateTo({
              url: '../shopLIst/shopLIst?search=' + that.data.input,
            })
          } else {
            wx.navigateTo({
              url: '../otherList/otherList?search=' + that.data.input+'&from=1',
            })
          }

        }, function (error) {
          console.log(error);
        });
    } else {
      wx.showModal({
        content: '请输入搜索内容',
      })
    }
  }
})