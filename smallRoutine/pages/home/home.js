// pages/home/home.js
const app = getApp();
Page({
  data: {
    list:[1,2,3,4,5,6],
    animationData: {},
    surrentindex:0,
    startclientX:0,
    nowitem:0,
    beishu:1,
    img1:app.globalData.ajaxurl+'/img/index/tips.png',
    ifattention:true,
    tipbox:false,
  },
  close(){
    this.setData({
      tipbox:false,
    })
  },
  showtip(){
    this.setData({
      tipbox:true,
    })
  },
  onLoad: function (options) {
    var that = this;
    wx.showLoading()
    if(app.globalData.is_bound_wx != ''){
      if(app.globalData.is_bound_wx == 1){
        this.setData({
          ifattention:true
        })
      }else{
        this.setData({
          ifattention:false
        })
      }
      wx.request({
        url:app.globalData.ajaxurl+'/sr/index_index.html',
        method:'POST',
        success:function(res){
          wx.hideLoading()
          if(res.data.status == 1){
            that.setData({
              list:res.data.list
            })
          }else{
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              duration: 1000
            })
          }
        }
      })
    }else{
      app.judgState('','home',that,'','',options.m_id);
    }
    wx.getSystemInfo({
      success(res){
        that.data.beishu = res.screenWidth/375;
      }
    })

  },
  getData(){
    var that = this;
    wx.request({
      url:app.globalData.ajaxurl+'/sr/index_index.html',
      method:'POST',
      success:function(res){
        wx.hideLoading()
        if(res.data.status == 1){
          that.setData({
            list:res.data.list
          })
        }else{
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 1000
          })
        }
      }
    })
  },
  onshow(){
  },
  todetails(e){
    wx.navigateTo({
      url: '/home/myissued/myissued?c_id='+e.currentTarget.dataset.id
    })
  },
  touchstartitem(event){
    this.setData({
      startclientX:event.changedTouches[0].clientX
    })
  },
  touchmoveitem(event){
    if(this.data.startclientX<event.changedTouches[0].clientX && this.data.nowitem==0){
      var animation = wx.createAnimation({
        duration: 500,
        timingFunction: 'ease',
      })
      this.animation = animation;
      animation.left(event.changedTouches[0].clientX/1.5).step()
      this.setData({
        animationData:animation.export()
      })
    }
  },
  touchenditem(event){
    var that = this;
    var beishu = this.data.beishu;
    if(this.data.startclientX-event.changedTouches[0].clientX>0){
      // 向左滑
      if(this.data.nowitem < this.data.list.length-1){
        this.data.nowitem = this.data.nowitem+1;
        var animation = wx.createAnimation({
          duration: 500,
          timingFunction: 'ease',
        })
        this.animation = animation;
        animation.left(-315*this.data.nowitem*beishu).step()
        this.setData({
          animationData:animation.export()
        })
      }

    }else if(this.data.startclientX-event.changedTouches[0].clientX<0){
      // 向右滑
      if(this.data.nowitem > 0){
        this.data.nowitem = this.data.nowitem-1;
        var animation = wx.createAnimation({
          duration: 500,
          timingFunction: 'ease',
        })
        this.animation = animation;
        animation.left(-315*this.data.nowitem*beishu).step()
        this.setData({
          animationData:animation.export()
        })
      }else{
        wx.showLoading({
          title: '更新片源列表中',
        })
        wx.request({
          url:app.globalData.ajaxurl+'/sr/index_index.html',
          method:'POST',
          success:function(res){
            setTimeout(function(){
              wx.hideLoading()
            },1000)
            if(res.data.status == 1){
              that.setData({
                list:res.data.list,
                nowitem:0
              })
              var animation = wx.createAnimation({
                duration: 500,
                timingFunction: 'ease',
              })
              that.animation = animation;
              animation.left(0).step()
              that.setData({
                animationData:animation.export()
              })
            }else{
              wx.showToast({
                title: res.data.msg,
                icon: 'none',
                duration: 1000
              })
            }
          }
        })
      }
    }
  },
  errorimg(e){
    var that = this;
    that.data.list[e.currentTarget.dataset.index].bill_pic = '/static/img/err/rose@2x.png'
    that.setData({
      list:that.data.list
    })
  },
  tip(){

  },
  onShareAppMessage: function () {
    return {
      title: '电影发行人接单工具',
      path: '/pages/index/index',
      imageUrl:app.globalData.ajaxurl+'/img/index/denglv.png'
    }
  }
})
