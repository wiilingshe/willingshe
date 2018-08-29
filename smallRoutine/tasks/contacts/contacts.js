// tasks/contacts/contacts.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[]
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    var that = this;
    that.getData(options.c_id, options.p_id);
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
   * getData:获取初始化数据
   * by heqingqing 2018/07/11
   */
  getData: function (c_id, p_id){
    var that = this;
    wx.request({
      url: app.globalData.ajaxurl + '/sr/chip_my_partner.html',
      method: 'post',
      header: { uuid: app.globalData.uuid },
      data: { 'c_id': c_id, 'p_id': p_id},
      success: function (res) {
        wx.hideLoading();
        if (res.data.status == 1){
          that.setData({
            list: res.data.list
          })
        }
      }
    })
   
      
  },
  /**
   * calling:拨打电话功能
   * by heqingqing 2018/07/23
   */
  calling:function(e){
    let tel = e.currentTarget.dataset.tel;
    wx.makePhoneCall({
      phoneNumber: tel 
    })
  }


})