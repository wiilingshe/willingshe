// user/wallet/wallet.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    haveData:false,
    pic:'',
    balance:'--',
    usable_balance:'--',
    page:1,
    list1:[],
    list2:[],
    noMore:false,
    nodata:true,
    dataType:'', //1为发行收入，2为邀请好友收入
    nodataImg:app.globalData.globalurl+'/img/public/empty_state.png'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({mask:true,title:'加载中'});
    //渲染我的钱包余额和待提现数据
    var that = this;
    wx.request({  
      url:app.globalData.ajaxurl+'/sr/member_balance.html',
      data:'',
      header:{uuid:app.globalData.uuid},
      method:'GET',
      success:res=>{
        wx.hideLoading();
        that.setData({haveData:true});
        if(res.data.status==1){
          that.setData({
            balance:res.data.data.balance.toFixed(2),
            usable_balance:res.data.data.usable_balance.toFixed(2)
          });
        }else{
          wx.showToast({title:res.data.msg,icon:"none"});
        }
      }
    });
    //请求发行收入列表数据
    /*wx.request({
      url:app.globalData.ajaxurl+'/sr/commission_income.html',
      data:{page:1,pageSize:8},
      header:{uuid:app.globalData.uuid},
      method:'POST',
      success:res=>{
        wx.hideLoading();
        if(res.data.list.length>0){
          that.setData({
            list1:res.data.list,
            dataType:1
          })
        }else{
          wx.request({ //请求邀请好友收入列表
            url:app.globalData.ajaxurl+'/sr/invite_income.html',
            data:{page:1,pageSize:8},
            header:{uuid:app.globalData.uuid},
            method:'POST',
            success:res=>{
              if(res.data.list.length>0){
                that.setData({
                  list2:res.data.list,
                  dataType:2
                })
              }else{
                that.setData({
                  nodata:true
                })
              }
            }
          })
        }

      }
    });*/
    wx.hideShareMenu();
  },
  withdraw(){
    wx.navigateTo({
      url: '/user/withdraw/withdraw?usable_balance='+this.data.usable_balance
    })
  },
/*  lower(e){
    var that = this;
    wx.showLoading({mask:true,title:'加载中'});
    if(!that.data.noMore){
      if(that.data.dataType==1){
        let newPage = Number(that.data.page)+Number(1);
        that.setData({page:newPage});
        wx.showLoading({mask:true,title:'加载中'});
        wx.request({
          url:app.globalData.ajaxurl+'/sr/commission_income.html',
          data:{page:that.data.page,pageSize:8},
          method:'POST',
          header:{uuid:app.globalData.uuid},
          success:res=>{
            wx.hideLoading();
            if(res.data.list.length>0){
              var newList = that.data.list1.concat(res.data.list);
              that.setData({
                list1:newList
              })
            }else{
              that.setData({noMore:true});
            }
          }
        })
      }else if(that.data.dataType==2){
        let newPage = Number(that.data.page)+Number(1);
        that.setData({page:newPage});
        wx.showLoading({mask:true,title:'加载中'});
        wx.request({
          url:app.globalData.ajaxurl+'/sr/invite_income.html',
          data:{page:that.data.page,pageSize:8},
          method:'POST',
          header:{uuid:app.globalData.uuid},
          success:res=>{
            wx.hideLoading();
            if(res.data.list.length>0){
              var newList = that.data.list2.concat(res.data.list);
              that.setData({
                list2:newList
              })
            }else{
              that.setData({noMore:true});
            }
          }
        })
      }
    }
  },*/

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