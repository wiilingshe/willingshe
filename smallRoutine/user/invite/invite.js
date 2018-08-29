// user/invite/invite.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    m_id:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      m_id:options.m_id
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
        title: '邀请好友',
        path: '/pages/index/index?m_id='+that.data.m_id
        
      }
    }
    return { //设置右上角转发按钮
      title: '邀请好友',
      path: '/pages/index/index?m_id='+that.data.m_id
    }
  }
})