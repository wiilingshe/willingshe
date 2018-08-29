// user/notice/notice.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    page:1,
    noMore:false,
    nodata:false,
    nodataImg:app.globalData.globalurl+'/img/public/empty_state.png'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that =this;
    wx.showLoading({mask:true,icon:"loading",title:'加载中'});
    wx.request({
      url:app.globalData.ajaxurl+'/sr/notice_list.html',
      data:{page:1,pageSize:10},
      method:'POST',
      header:{uuid:app.globalData.uuid},
      success:res=>{
        wx.hideLoading();
        if(res.data.status==1){
          if(res.data.list.length>0){
            that.setData({
              list:res.data.list
            });
          }else{
            that.setData({nodata:true});
          }
        }else if(res.data.status==0){
          that.setData({nodata:true});
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
        }
        
      }
    });
    wx.hideShareMenu();
  },
  lower(e){
    var that = this;
    if(!that.data.noMore){
      var newPage = Number(that.data.page)+Number(1);
      that.setData({page:newPage});
      wx.showLoading({mask:true,title:'加载中'});
      wx.request({
        url:app.globalData.ajaxurl+'/sr/notice_list.html',
        data:{page:that.data.page,pageSize:10},
        method:'POST',
        header:{uuid:app.globalData.uuid},
        success:res=>{
          wx.hideLoading();
          if(res.data.status==1){
            if(res.data.list.length>0){
              var newList = that.data.list.concat(res.data.list);
              that.setData({
                list:newList
              })
            }else{
              that.setData({noMore:true});
            }
          }else{
            that.setData({noMore:true});
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              duration:3000
            })
          }
        }
      })
    }
  },
  toNotice(e){
    let nt_id = e.currentTarget.dataset.n;
    let ass_id = e.currentTarget.dataset.ass;
    let other_ass_id = e.currentTarget.dataset.other;
    /*判断消息类型，跳转到相应页面*/
    if(nt_id==1){
      wx.navigateTo({
        url: '/home/myissued/myissued?n_id='+nt_id+'&c_id='+ass_id
      })
    }else if(nt_id==2){
      wx.reLaunch({
        url: '/pages/home/home?n_id='+nt_id+'&ass_id='+ass_id
      })
    }else if(nt_id==3){
      wx.navigateTo({
        url: '/tasks/cinema/cinema?p_id='+ass_id+'&cinema_id='+other_ass_id
      })
    }
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
  
  }
})