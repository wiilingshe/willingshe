// tasks/cinemaWork/cinemaWork.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cinema_id: '', //	影院ID
    p_id: '',       //排片ID
    typeNO:5,       //类型 5代表是工作日报
    valueData:'',
    isTask:false,
    submitData:{isShow:0}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    let that = this;
    that.setData({
      cinema_id:options.cinema_id,
      p_id: options.p_id
    });
    that.getData(that.data.typeNO,options.cinema_id, options.p_id);
  
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
   * getData:初始化获取数据
   * by heqingqing 2018/07/13
   * 参数：类型 排片ID 影院ID
   */
  getData: function (typeNO, cinema_id, p_id){
    var that = this;
    wx.request({
      url: app.globalData.ajaxurl + '/sr/chip/task_detail.html',
      method: 'post',
      header: { uuid: app.globalData.uuid },
      data: { 'type': typeNO, 'p_id': p_id , 'cinema_id': cinema_id},
      success: function (res) {
        wx.hideLoading();
          if(res.data.status==1){
            that.setData({
              valueData: res.data.data.journal
            });
          } else {
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              duration: 2000
            })
          }
      }
    })
  },
  /**
   * getVal:获取val值
   * by heqingqing 2018/07/16
   */
  getVal:function(e){
    var that = this;
    that.setData({
      valueData: e.detail.value
    })
  },
  /**
   * submit:保存提交数据
   * by heqingqing 2018/07/16
   */
  submit:function(){
    var that = this;
    wx.request({
      url: app.globalData.ajaxurl + '/sr/chip/handle_task.html',
      method: 'post',
      header: { uuid: app.globalData.uuid },
      data: { 'type': that.data.typeNO, 'p_id': that.data.p_id, 'cinema_id': that.data.cinema_id, 'journal':that.data.valueData },
      success: function (res) {
         wx.showToast({
           title: res.data.msg,
           icon: 'none',
            duration: 3000
         });
         if (res.data.status =='1'){ //成功
           setTimeout(function () {
             wx.navigateBack({
               delta: 1
             })
           }, 500);
         }
      }
    })
  }
})