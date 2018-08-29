// pages/personalCenter/personalCenter.js
//获取应用实例
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    haveData:false,
    avatar:app.globalData.globalurl+'/img/public/noavatar.png',
    nickname:'',
    balance:'',
    moreIcon:app.globalData.globalurl+'/img/personalCenter/more.png',
    message:app.globalData.globalurl+'/img/personalCenter/message.png',
    participate:app.globalData.globalurl+'/img/personalCenter/participate.png',
    wallet:app.globalData.globalurl+'/img/personalCenter/wallet.png',
    invite:app.globalData.globalurl+'/img/personalCenter/invite.png',
    reward:app.globalData.globalurl+'/img/personalCenter/reward.png',
    issue:app.globalData.globalurl+'/img/personalCenter/issue.png',
    m_id:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showNavigationBarLoading();
    //渲染用户个人中心数据
    var that = this;
    wx.request({  //获取个人中心数据
      url:app.globalData.ajaxurl+'/sr/member_get_info.html',
      data:{type:1},
      header:{uuid:app.globalData.uuid},
      method:'GET',
      success:res=>{
        wx.hideNavigationBarLoading();
        that.setData({haveData:true});
        if(res.data.status==1){
          that.setData({
            avatar:res.data.data.face,
            nickname:res.data.data.nickname,
            balance:res.data.data.balance.toFixed(2),
            m_id:res.data.data.m_id
          });
        }else{
          wx.showToast({title:res.data.msg,icon:"none"});
        }
      }
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
  onShareAppMessage: function (res) {
    var that = this;
    if (res.from === 'button') { //设置页面内转发按钮
      return {
        title: '电影发行人接单工具',
        path: '/pages/index/index?m_id='+that.data.m_id,
        imageUrl:app.globalData.globalurl+'/img/public/denglv.png'
      }
    }
    return { //设置右上角转发按钮
      title: '电影发行人接单工具',
      path: '/pages/index/index?m_id='+that.data.m_id,
      imageUrl:app.globalData.globalurl+'/img/public/denglv.png'
    }
  },
  userInfo(e){
    wx.navigateTo({
      url: '/user/userInfo/userInfo',
    })
  },
  viewNotice(e){
    wx.navigateTo({
      url: '/user/notice/notice',
    })
  },
  viewIssue(e){
    wx.navigateTo({
      url: '/user/issue/issue',
    })
  },
  viewPublish(e){
    wx.navigateTo({
      url: '/user/publish/publish',
    })
  },
  goWallet(e){
    wx.navigateTo({
      url:'/user/wallet/wallet',
    })
  },
  viewAssessment(e){
    wx.navigateTo({
      url:'/user/assessment/assessment',
    })
  },
  goInvite(e){
    /*wx.navigateTo({
      url:'/user/invite/invite?m_id='+this.data.m_id,
    })*/

  }
})