var app = getApp()
var userInfo = app.userInfo
//获取应用实例
Page({
  data: {
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    circular:true,              
    interval: 3000,
    duration: 1000,
    loadingHidden: false, // loading 
    imgUrl: [],

    //导航切换
   // navbar: ['每日推荐', '生活服务', '充值缴费', '气价查询'],
   // btnClass: ['dfk', 'dcl', 'dpj', 'ywc'],
    currentTab: 0,
    orderList: [],
    orderDetail: [],
    indexAdList:[],
    hidden: true,
    winHeight: "",//窗口高度
    currentTab: 0, //预设当前项的值
    scrollLeft: 0, //tab标题的滚动条位置
    book_time: null,
    ifscroll:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  //如何以流的形式加载banner图片
  onLoad: function(options){
    console.log(options)
    var that = this
    var path = app.data.url + '/api/index/banner'
    wx.request({
      url: path,
      success: (res)=>{
        console.log('dddddddd:'+JSON.stringify(res.data.data))
          that.setData({
            imgUrl: res.data.data,
          });
      }
    })
      var that = this;
    //  高度自适应
    wx.getSystemInfo({
      success: function (res) {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR - 180;
        console.log(calc)
        that.setData({
          winHeight: calc+60
        });
      }
    });
    this.indexAd()
  },

  /**
   * 导航状态切换
   */
  // 滚动切换标签样式
  switchTab: function (e) {
    this.setData({
      currentTab: e.detail.current
    });
    this.checkCor();
  },
  // 点击标题切换当前页时改变样式
  swichNav: function (e) {
    var cur = e.target.dataset.current;
    if (this.data.currentTaB == cur) { return false; }
    else {
      this.setData({
        currentTab: cur
      })
    }
  },
  //判断当前滚动超过一屏时，设置tab标题滚动条。
  checkCor: function () {
    if (this.data.currentTab > 4) {
      this.setData({
        scrollLeft: 300
      })
    } else {
      this.setData({
        scrollLeft: 0
      })
    }
  },
  //推广列表
  indexAd: function () {
    var that = this
    var path = app.data.url + '/api/index/ad'
    wx.request({
      url: path,
      success: (res) => {
        console.log('ccccc:' + JSON.stringify(res.data.data))
        that.setData({
          indexAdList:res.data.data
        });
      }
    })
  },
  detial: function (e) {
    if(e.currentTarget.dataset.type == 1){
      wx.navigateTo({
        url: "../choiceGoods/choiceGoods?id=" + e.currentTarget.dataset.id
      })
    }else{
      wx.navigateTo({
        url: "../article/article?id=" + e.currentTarget.dataset.id
      })
    }
  },
  onShow: function(){
    
  },
  getcoupon(){
    wx.getStorage({
      key: 'access_token',
      success: function(res1) {
          wx.navigateTo({
            url:'../coupon/coupon'
          })
      },
      fail:function(res1){
        wx.navigateTo({
          url:'../login/login'
        })
      }
    })
    // if(app.globalData.ifzhuce == 0){
    //   wx.navigateTo({
    //     url:'../login/login'
    //   })
    // }else{
    //   wx.navigateTo({
    //     url:'../coupon/coupon'
    //   })
    // }
  },
  detail(e){
    wx.navigateTo({
      url:'../bannerurl/bannerurl?url='+e.currentTarget.dataset.url
    })
  },
  onPullDownRefresh(){
    var that = this;
    wx.login({
      success: function (res) {
        console.log('获取微信授权返回结果：'+JSON.stringify(res))
        if (res.code) {
          //发起网络请求
          app.getSession1(res.code)
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });
    
  },
  list(e){
    console.log(e.currentTarget.dataset.bid)
    wx.navigateTo({
      url:'../flagship/flagship?bid='+e.currentTarget.dataset.bid+'&cid='+e.currentTarget.dataset.cid
    })
  },
  scroll(e){
    console.log(e)
  },
  scroll1(e){
    if(e.detail.scrollTop > 270){
      this.setData({
        ifscroll:true
      })
    }else if(e.detail.scrollTop < 270){
      this.setData({
        ifscroll:false
      })
    }
  }
  // onLoad: function () {
  //   var that = this;
  //   //  高度自适应
  //   wx.getSystemInfo({
  //     success: function (res) {
  //       var clientHeight = res.windowHeight,
  //         clientWidth = res.windowWidth,
  //         rpxR = 750 / clientWidth;
  //       var calc = clientHeight * rpxR - 180;
  //       console.log(calc)
  //       that.setData({
  //         winHeight: calc
  //       });
  //     }
  //   });
  // }

})
