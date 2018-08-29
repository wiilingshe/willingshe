// home/allCity/allCity.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    close: app.globalData.globalurl + '/img/index/in_close.png',
    icon: app.globalData.globalurl +'/img/index/Details_success@3x.png',
    img1:app.globalData.globalurl +'/img/index/home_Details_Not%20caught.png',
    ifbg:false,
    tip:false,
    sendok:false,
    noget:false,
    regionlist:[],
    selectone:'all',
    c_id:'',
    regionlists:[],
    alertcity:'',
    p_id:'',
    itemdata:{},
    top1:0,
    page2:1,
    index1:'',
    iffull:false,
  },
  onLoad: function (options) {
    var that = this;
    this.setData({
      c_id:options.c_id
    })
    wx.request({
      url:app.globalData.ajaxurl+'/common/area_simple_region.html',
      success:function(res){
        that.setData({
          regionlist:res.data
        })
      }
    })
    this.data.itemdata = {c_id:options.c_id,page:1}
    wx.request({
      url:app.globalData.ajaxurl+'/sr/chip/recruit_lst.html',
      method:'POST',
      data:that.data.itemdata,
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
  alertModal(e){
    var that = this;
    that.data.index1 = e.currentTarget.dataset.index;
    // console.log(e.currentTarget.dataset.city,e.currentTarget.dataset.id)
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
  selecteditem(e){
    this.data.iffull = false;
    var that = this;
    wx.showLoading({
      title: '加载中',
    })
    this.setData({
      selectone:e.currentTarget.dataset.index
    })
    if(e.currentTarget.dataset.id == undefined){
      this.data.itemdata = {c_id:that.data.c_id,page:1}
    }else{
      this.data.itemdata = {c_id:that.data.c_id,page:1,region_id:e.currentTarget.dataset.id}
    }
    wx.request({
      url:app.globalData.ajaxurl+'/sr/chip/recruit_lst.html',
      method:'POST',
      data:that.data.itemdata,
      header:{uuid:app.globalData.uuid},
      success:function(res){
        wx.hideLoading()
        if(res.data.status == 1){
          if(that.data.itemdata.region_id == 4){
            if(res.data.data.length < 10){
              var list = res.data.data;
              that.data.itemdata = {c_id:that.data.c_id,page:1,region_id:8}
              wx.request({
                url:app.globalData.ajaxurl+'/sr/chip/recruit_lst.html',
                method:'POST',
                data:that.data.itemdata,
                header:{uuid:app.globalData.uuid},
                success:function(res){
                  list = list.concat(res.data.data);
                  that.setData({
                    top1:0,
                    regionlists:list
                  })
                }
              })
            }else{
              that.setData({
                top1:0,
                regionlists:res.data.data
              })
            }
          }else{
            that.setData({
              top1:0,
              regionlists:res.data.data
            })
          }
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
  lower(){
    if(this.data.iffull == false){
      wx.showLoading({
        title: '加载中',
      })
      var that = this;
      if(that.data.itemdata.region_id == 8){
        that.data.page2++;
        wx.request({
          url:app.globalData.ajaxurl+'/sr/chip/recruit_lst.html',
          method:'POST',
          data:{c_id:that.data.c_id,page:that.data.page2,region_id:8},
          header:{uuid:app.globalData.uuid},
          success:function(res){
            wx.hideLoading()
            if(res.data.status == 1){
              console.log(res.data.data.length)
              if(res.data.data.length == 0){
                that.setData({
                  iffull:true
                })
              }else{
                var list = that.data.regionlists.concat(res.data.data)
                that.setData({
                  regionlists:list
                })
              }
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
        this.data.itemdata.page++;
        wx.request({
          url:app.globalData.ajaxurl+'/sr/chip/recruit_lst.html',
          method:'POST',
          data:that.data.itemdata,
          header:{uuid:app.globalData.uuid},
          success:function(res){
            wx.hideLoading()
            if(res.data.status == 1){
              if(that.data.itemdata.region_id == 4){
                if(res.data.data.length == 0){
                  that.data.page2 = 1;
                  that.data.itemdata.region_id = 8;
                  wx.request({
                    url:app.globalData.ajaxurl+'/sr/chip/recruit_lst.html',
                    method:'POST',
                    data:{c_id:that.data.c_id,page:1,region_id:8},
                    header:{uuid:app.globalData.uuid},
                    success:function(res){
                      if(res.data.status == 1){
                        if(res.data.data.length == 0){
                          that.setData({
                            iffull:true
                          })
                        }else{
                          var list = that.data.regionlists.concat(res.data.data)
                          that.setData({
                            regionlists:list
                          })
                        }
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
                  if(res.data.data.length == 0){
                    that.setData({
                      iffull:true
                    })
                  }else{
                    var list = that.data.regionlists.concat(res.data.data)
                    that.setData({
                      regionlists:list
                    })
                  }
                }
              }else{
                if(res.data.data.length == 0){
                  that.setData({
                    iffull:true
                  })
                }else{
                  var list = that.data.regionlists.concat(res.data.data)
                  that.setData({
                    regionlists:list
                  })
                }
              }
            }else{
              wx.hideLoading()
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
  }
})