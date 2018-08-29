// home/myissued/myissued.js
var WxParse = require('../../utils/wxParse/wxParse.js');
const app = getApp();
Page({
  data: {
    close: app.globalData.globalurl + '/img/index/in_close.png',
    icon: app.globalData.globalurl +'/img/index/Details_success@3x.png',
    img1:app.globalData.globalurl +'/img/index/home_Details_Not%20caught.png',
    img2:app.globalData.globalurl +'/img/public/rose@2x.png',
    animationData:{},
    beishu:1,
    scrollTop:0,
    scrolly1:true,
    scrolly2:true,
    info:[],
    regionlist:[],
    selectone:'all',
    c_id:'',
    regionlists:[],
    alertcity:'',
    p_id:'',
    itemdata:{},
    ifbg:false,
    tip:false,
    sendok:false,
    noget:false,
    top1:0,
    top2:0,
    top3:0,
    top4:0,
    ifscroll:false,
    ifscroll2:true,
    scrollTop2:0,
    richtext:'',
    tabitem:0,
    ifios:true,
    ifmore:false,
    index1:'',
  },
  onLoad: function (options) {
    wx.showLoading()
    var that = this;
    this.setData({
      c_id:options.c_id
    })
    wx.getSystemInfo({
      success(res){
        that.data.beishu = res.screenWidth/375
        if(res.system.indexOf('Android') != -1){
          that.setData({
            ifios:false
          })
        }else{
          that.setData({
            ifios:true
          })
        }
      }
    })
    wx.request({
      url:app.globalData.ajaxurl+'/sr/chip/detail.html',
      method:'POST',
      data:{c_id:options.c_id},
      // data:{c_id:24},
      success:function(res){
        // console.log(res.data)
        if(res.data.status == 1){
          // console.log(res.data.data)
          WxParse.wxParse('detiel', 'html', res.data.data.mission, that,5);
          that.setData({
            info:res.data.data,
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
    wx.request({
      url:app.globalData.ajaxurl+'/common/area_simple_region.html',
      success:function(res){
        that.setData({
          regionlist:res.data
        })
      }
    })
    wx.request({
      url:app.globalData.ajaxurl+'/sr/chip/recruit_lst.html',
      method:'POST',
      data:{c_id:options.c_id,page:1},
      header:{uuid:app.globalData.uuid},
      success:function(res){
        if(res.data.status == 1){
          that.setData({
            regionlists:res.data.data
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
  onShow: function () {
    var that = this;
    setTimeout(function(){
      wx.hideLoading()
      var query = wx.createSelectorQuery();
      query.select('#info1').boundingClientRect();
      query.select('#info2').boundingClientRect();
      query.select('#info3').boundingClientRect();
      query.select('#info4').boundingClientRect();
      query.exec(function(res){
        var top1 = res[0].top-res[0].top;
        var top2 = res[1].top-res[0].top;
        var top3 = res[2].top-res[0].top;
        var top4 = res[3].top-res[0].top;
        // console.log(res[0].top,res[1].top,res[2].top,res[3].top)
        that.setData({
          top1:top1,
          top2:top2,
          top3:top3,
          top4:top4,
        })
      })
    },1000)
  },
  option1(){
    var that = this;
    // var query = wx.createSelectorQuery();
    // query.select('#info1').boundingClientRect();
    // query.exec(function(res){
    //   that.setData({
    //     scrollTop:res[0].top
    //   })
    // })
    that.setData({
      ifscroll:true,
      tabitem:0
    })
    that.setData({
      scrollTop:that.data.top1
    })
    that.setData({
      ifscroll:false
    })
    var beishu = this.data.beishu;
    var animation = wx.createAnimation({
      duration: 300,
      timingFunction: 'ease',
    })
    this.animation = animation;
    animation.left(beishu*34).step()
    this.setData({
      animationData:animation.export()
    })
  },
  option2(){
    var that = this;
    that.setData({
      ifscroll:true,
      tabitem:1
    })
    that.setData({
      scrollTop:that.data.top2
    })
    that.setData({
      ifscroll:false
    })
    var beishu = this.data.beishu;
    var animation = wx.createAnimation({
      duration: 300,
      timingFunction: 'ease',
    })
    this.animation = animation;
    animation.left(beishu*126).step()
    this.setData({
      animationData:animation.export()
    })
  },
  option3(){
    var that = this;
    that.setData({
      ifscroll:true,
      tabitem:2
    })
    that.setData({
      scrollTop:that.data.top3
    })
    that.setData({
      ifscroll:false
    })
    var beishu = this.data.beishu;
    var animation = wx.createAnimation({
      duration: 300,
      timingFunction: 'ease',
    })
    this.animation = animation;
    animation.left(beishu*219).step()
    this.setData({
      animationData:animation.export()
    })
  },
  option4(){
    var that = this;
    that.setData({
      ifscroll:true,
      tabitem:3
    })
    that.setData({
      scrollTop:that.data.top4
    })
    that.setData({
      ifscroll:false
    })
    var beishu = this.data.beishu;
    var animation = wx.createAnimation({
      duration: 300,
      timingFunction: 'ease',
    })
    this.animation = animation;
    animation.left(beishu*312).step()
    this.setData({
      animationData:animation.export()
    })
  },
  tocity(){
    wx.navigateTo({
      url: '/home/allCity/allCity?c_id='+this.data.c_id
    })
  },
  selecteditem(e){
    var that = this;
    wx.showLoading({
      title: '加载中',
    })
    this.setData({
      selectone:e.currentTarget.dataset.index
    })
    if(e.currentTarget.dataset.id == undefined){
      var data = {c_id:that.data.c_id,page:1}
    }else{
      var data = {c_id:that.data.c_id,page:1,region_id:e.currentTarget.dataset.id}
    }
    wx.request({
      url:app.globalData.ajaxurl+'/sr/chip/recruit_lst.html',
      method:'POST',
      data:data,
      header:{uuid:app.globalData.uuid},
      success:function(res){
        wx.hideLoading()
        if(res.data.status == 1){
          that.setData({
            regionlists:res.data.data
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
  alertModal(e){
  // console.log(e.currentTarget.dataset.city,e.currentTarget.dataset.id)
  var that = this;
  that.data.index1 = e.currentTarget.dataset.index;
  this.setData({
    ifbg:true,
    tip:true,
    alertcity:e.currentTarget.dataset.city,
    p_id:e.currentTarget.dataset.id
  })
  },
  confirmapply(){
    var that = this;
    wx.request({
      url:app.globalData.ajaxurl+'/sr/chip/putinfor.html',
      method:'POST',
      data:{p_id:that.data.p_id,c_id:that.data.c_id},
      header:{uuid:app.globalData.uuid},
      success:function(res){
        if(res.data.status == 1){
          that.data.regionlists[that.data.index1].pma_status = 1
          that.setData({
            ifbg:true,
            tip:false,
            sendok:true,
            regionlists:that.data.regionlists,
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
  close1(){
    this.setData({
      ifbg:false,
      sendok:false
    })
  },
  close2(){
    this.setData({
      ifbg:false,
      noget:false
    })
  },
  close3(){
    this.setData({
      ifbg:false,
      tip:false,
    })
  },
  downloaditem(e){
    wx.showLoading({
      title: '加载中',
    })
    wx.downloadFile({
      url: e.currentTarget.dataset.url,
      success: function(res) {
        var filePath = res.tempFilePath
        wx.openDocument({
          filePath: filePath,
          success: function (res) {
            wx.hideLoading()
          }
        })
        // if(res.statusCode === 200) {
        //   wx.showToast({
        //     title: '下载成功',
        //     icon: 'success',
        //     duration: 2000
        //   })
        // }
      },
      fail(){
        wx.hideLoading()
        wx.showToast({
          title: '下载文件不存在，请重新上传',
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
  upper(){
  },
  lower(){
    // console.log(this.data.scrollTop2*this.data.beishu,parseInt(170*this.data.beishu))
    // if(this.data.scrollTop2*this.data.beishu>=parseInt(170*this.data.beishu)){
    //   this.setData({
    //     ifscroll2:false,
    //     ifscroll:true,
    //   })
    // }
  },
  scroll(e){
    // this.setData({
    //   scrollTop2:e.detail.scrollTop
    // })
  },
  scroll2(e){
    if(e.detail.scrollTop<this.data.top2){
      this.setData({
        tabitem:0
      })
      var beishu = this.data.beishu;
      var animation = wx.createAnimation({
        duration: 300,
        timingFunction: 'ease',
      })
      this.animation = animation;
      animation.left(beishu*34).step()
      this.setData({
        animationData:animation.export()
      })
    }else if(e.detail.scrollTop<this.data.top3){
      this.setData({
        tabitem:1
      })
      var beishu = this.data.beishu;
      var animation = wx.createAnimation({
        duration: 300,
        timingFunction: 'ease',
      })
      this.animation = animation;
      animation.left(beishu*126).step()
      this.setData({
        animationData:animation.export()
      })
    }else if(e.detail.scrollTop<this.data.top4){
      this.setData({
        tabitem:2
      })
      var beishu = this.data.beishu;
      var animation = wx.createAnimation({
        duration: 300,
        timingFunction: 'ease',
      })
      this.animation = animation;
      animation.left(beishu*219).step()
      this.setData({
        animationData:animation.export()
      })
    }else{
      this.setData({
        tabitem:3
      })
      var beishu = this.data.beishu;
      var animation = wx.createAnimation({
        duration: 300,
        timingFunction: 'ease',
      })
      this.animation = animation;
      animation.left(beishu*312).step()
      this.setData({
        animationData:animation.export()
      })
    }
  },
  upper2(){
    // this.setData({
    //   ifscroll2:true,
    //   ifscroll:false,
    //   scrollTop:0
    // })
  },
  moreinfo(){
    var that = this;
    this.setData({
      ifmore:!this.data.ifmore
    })
    var query = wx.createSelectorQuery();
    query.select('#info1').boundingClientRect();
    query.select('#info2').boundingClientRect();
    query.select('#info3').boundingClientRect();
    query.select('#info4').boundingClientRect();
    query.exec(function(res){
      var top1 = res[0].top-res[0].top;
      var top2 = res[1].top-res[0].top;
      var top3 = res[2].top-res[0].top;
      var top4 = res[3].top-res[0].top;
      // console.log(res[0].top,res[1].top,res[2].top,res[3].top)
      that.setData({
        top1:top1,
        top2:top2,
        top3:top3,
        top4:top4,
      })
    })
  },
  onPullDownRefresh:function(){
    var that = this;
    this.setData({
      selectone:'all'
    })
    wx.request({
      url:app.globalData.ajaxurl+'/sr/chip/recruit_lst.html',
      method:'POST',
      data:{c_id:this.data.c_id,page:1},
      header:{uuid:app.globalData.uuid},
      success:function(res){
        wx.stopPullDownRefresh();
        if(res.data.status == 1){
          that.setData({
            regionlists:res.data.data
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
})