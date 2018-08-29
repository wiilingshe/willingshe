// user/publish/publish.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    statusText:['申请中','发行中','已结束'],
    page:1,
    nodata:false,
    noMore:false,
    nodataImg:app.globalData.globalurl+'/img/public/empty_state.png',
    noPic:app.globalData.globalurl+'/static/img/err/rose@2x.png'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    wx.hideShareMenu();
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
    var that =this;
    wx.showLoading({mask:true,icon:"loading",title:'加载中'});
    wx.request({
      url:app.globalData.ajaxurl+'/sr/chip_my_task.html',
      header:{uuid:app.globalData.uuid},
      data:{page:1,pageSize:7},
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
          that.setData({
            nodata:true
          });
        }
      }
    });
  },
  /**
    * 图片加载错误时
    * errorFunction
    */
  errorFunction: function (e) {
    var that = this;
    let index = e.target.dataset.errorimg;
    let listArr = that.data.list;
    listArr[index].bill_pic = '/static/img/err/rose@2x.png'
    that.setData({
        list: listArr
    })
  },
  errorIcon(e){

  },
  /**
   * goList:跳到任务详情页
   */
  goList(e){
    let c_id = e.currentTarget.dataset.c;
    let p_id = e.currentTarget.dataset.p;
    let issue_status = e.currentTarget.dataset.issue_status;
    let mis_type = e.currentTarget.dataset.mt;
    let status = e.currentTarget.dataset.st;
    if(issue_status==2){ //影片发行周期已结束时跳转影片详情
      wx.navigateTo({
        url: '/home/myissued/myissued?c_id='+c_id
      });
    }else{ //发行中和申请中的跳转到任务详情
      if(mis_type==2){
        wx.navigateTo({
          url: '/tasks/taskList/taskList?p_id='+p_id+'&c_id='+c_id
        });
      }else if(mis_type==1){ //主动申请审核通过可以跳转
        if(status==2){
          wx.navigateTo({
            url: '/tasks/taskList/taskList?p_id='+p_id+'&c_id='+c_id
          });
        }
      }
    }
  },
  /**
   * goContacts:跳到联系人
   * by heqingqing 2018/07/05
   */
  goContacts: function (e) {
    let c_id = e.currentTarget.dataset.c;
    let p_id = e.currentTarget.dataset.p;
    wx.navigateTo({
        url: '/tasks/contacts/contacts?c_id=' + c_id + '&p_id=' + p_id + ''
    });
  },
  lower(e){ //流加载
    var that = this;
    if(!that.data.noMore){
      var newPage = Number(that.data.page)+Number(1);
      that.setData({page:newPage});
      wx.showLoading({mask:true,icon:"loading",title:'加载中'});
      wx.request({
        url:app.globalData.ajaxurl+'/sr/chip_my_task.html',
        header:{uuid:app.globalData.uuid},
        data:{page:that.data.page,pageSize:7},
        method:'POST',
        success:res=>{
          wx.hideLoading();
          if(res.data.status==1){
            if(res.data.list.length>0){
              var newList = that.data.list.concat(res.data.list);
              that.setData({list:newList});
            }else{
              that.setData({
                noMore:true
              })
            }
          }else{
            wx.showToast({
              title:res.data.msg,
              icon:'none',
              duration:3000
            });
            that.setData({
              noMore:true
            })
          }
        }
      });
    }
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
