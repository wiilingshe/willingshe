// user/withdrawDetails/withdrawDetails.js
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
    var that = this;
    wx.showLoading({mask:true,title:'加载中'});
    wx.request({
      url:app.globalData.ajaxurl+'/sr/withdraw_income.html',
      header:{uuid:app.globalData.uuid},
      data:{page:1,pageSize:8},
      method:'POST',
      success:res=>{
        wx.hideLoading();
        if(res.data.status==1){
          if(res.data.list.length>0){
            that.setData({
              list:res.data.list
            });
          }else{
            that.setData({
              nodata:true
            })
          }
        }else{
          wx.showToast({
            title:res.data.msg,
            icon:'none',
            duration:3000
          });
          that.setData({nodata:true});
        }
      }
    })
  },
  lower(e){
    var that = this;
    if(!that.data.noMore){
      var newPage = Number(that.data.page)+Number(1);
      that.setData({page:newPage});
      wx.showLoading({mask:true,title:'加载中'});
      wx.request({
        url:app.globalData.ajaxurl+'/sr/withdraw_income.html',
        data:{page:that.data.page,pageSize:8},
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
            wx.showToast({
              title:res.data.msg,
              icon:'none',
              duration:3000
            });
            that.setData({noMore:true});
          }
          
        }
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