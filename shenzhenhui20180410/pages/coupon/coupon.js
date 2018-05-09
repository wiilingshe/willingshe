var app = getApp();
Page({
  data: {
    winHeight: "",//窗口高度
    currentTab: 0, //预设当前项的值
    scrollLeft: 0, //tab标题的滚动条位置
    expertList: [{ //假数据
    }],
    list:[],
    page:1,
    access_token:'',
  },
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
  onLoad: function () {
    var that = this;
    //  高度自适应
    wx.getStorage({
      key: 'access_token',
      success: function(res) {
          that.setData({
            access_token:res.data
          })
          wx.request({
            url:app.data.url+'/api/personal/coupon/center',
            method:'POST',
            data:{access_token:res.data},
            success:function(res){
              if(res.data.code == 1){
                that.setData({
                  list:res.data.data[0].list
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
    wx.getSystemInfo({
      success: function (res) {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR - 180;
        console.log(calc)
        that.setData({
          winHeight: calc
        });
      }
    });
  },
  more(){
    console.log(111)
  },
  getItem(e){
    wx.showLoading()
    console.log(e.currentTarget.dataset.id)
    var that = this;
    wx.request({
      url:app.data.url+'/api/personal/coupon/receive',
      method:'POST',
      data:{access_token:that.data.access_token,vid:e.currentTarget.dataset.id},
      success:function(res){
        wx.hideLoading()
        if(res.data.code == 1){
          wx.showToast({
            title: '领取成功',
            icon: 'none',
            duration: 2000
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
//  footerTap: app.footerTap
})