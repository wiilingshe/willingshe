// tasks/cinemaResources/cinemaResources.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [
      { title:'喷绘',name: '', value: '1' },
      { title:'抢票',name: '', value: '2', checked: 'true' },
     
    ],
    cinema_id: '',
    p_id: '',
    typeNo:3,
    data:{},
    air_brushing_is_on:false,//喷绘是否选中
    ticket_is_on:false,//抢票是否选中
    submitData: { isShow: 0 }


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
      cinema_id: options.cinema_id,
      p_id: options.p_id
    })
    that.getData(that.data.typeNo, options.p_id, options.cinema_id);
   
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
   * getData:初始化获取数据
   * by heqingqing 2018/07/17
   * 参数：type p_id cinema_id
   */
  getData(type, p_id, cinema_id){
    let that = this;
    wx.request({
      url: app.globalData.ajaxurl + '/sr/chip/task_detail.html',
      method: 'post',
      header: { uuid: app.globalData.uuid },
      data: { 'type': type, 'p_id': p_id, 'cinema_id': cinema_id},
      success: function (res) {
        wx.hideLoading();
        if (res.data.status == 1) {
          that.setData({
            data: res.data.data
          })
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
   * getVal:获取备注的input值
   */
  getVal:function(e){
    console.log(e);
    let that = this;
    let type = e.target.dataset.type;
    let valData = e.detail.value;
    if (type=='0'){  //喷绘备注
      let newData = that.data.data;
      newData.air_brushing_is_on_remarks = valData
      that.setData({
        data: newData
      })
    }else if(type =="1"){ //抢票备注
      let newData = that.data.data;
      newData.ticket_remarks = valData
      that.setData({
        data: newData
      })
    }else if(type =="2"){ //其他备注
      let newData = that.data.data;
      newData.schedule_remarks = valData
      that.setData({
        data: newData
      })
    }
  },
  /**
   * getCheck:获取多选框是否选中
   * by heqingqing 208/07/17
   */
  checkboxChange:function(e){
    let that = this;
    let type = e.target.dataset.type;
    if (e.detail.value == ''){ //等于空未选中
      if (type=="0"){
        let newData = that.data.data;
        newData.air_brushing_is_on =0;
        that.setData({
          data: newData
        })
      } else if (type == "1"){
        let newData = that.data.data;
        newData.ticket_is_on = 0;
        that.setData({
          data: newData
        })
      }
    }else{  //选中
      if (type == "0") {
        let newData = that.data.data;
        newData.air_brushing_is_on = 1;
        that.setData({
          data: newData
        })
      } else if (type == "1"){
        let newData = that.data.data;
        newData.ticket_is_on = 1;
        that.setData({
          data: newData
        })
      }
    }

  },
  /**
   * submit:提交数据
   * by heqingqing 2018/07/17
   */
  submit:function(){
   let that= this;
   let newData= that.data.data;
   newData.type = that.data.typeNo;
   newData.p_id = that.data.p_id;
   newData.cinema_id = that.data.cinema_id;
   wx.request({
     url: app.globalData.ajaxurl + '/sr/chip/handle_task.html',
     method: 'post',
     header: { uuid: app.globalData.uuid },
     data: newData,
     success: function (res) {
       wx.showToast({
         title: res.data.msg,
         icon: 'none',
         duration: 3000
       });
       if (res.data.status == '1') {
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