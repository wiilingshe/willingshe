// tasks/cinemaCommunication/cinemaCommunication.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bgImg: app.globalData.globalurl +'/img/task/task_Details_bg@2x.png',
    cinema_id:'',
    p_id:'',
    typeNo:1,
    data:{},
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
    });
    that.getData(that.data.typeNo, options.p_id, options.cinema_id)
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
        if (res.data.status == "1"){
          that.setData({
            data:res.data.data
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
   * getVal:获取input输入框的值
   * by heqingqing 2018/07/17
   */
  getVal:function(e){
    let that = this;
    let typeData = e.target.dataset.type;
    let valData = e.detail.value;
    let isVal = (/^\d+\.?\d{0,2}$/.test(e.detail.value));
    if (!isVal && typeData != '4' && typeData != '03' && typeData != '13' && typeData != '23' && typeData != '33'){
      if (valData != ''){
        wx.showToast({
          title: '输入的格式不正确,请重新输入',
          icon: 'none',
          duration: 1000
        });
      }
      valData = 0;
    }
    if (valData==""){
      valData=0;
    }
    if (typeData=="01"){
      let newData = that.data.data;
      newData.claim_first_start = valData
      that.setData({
        data: newData
      })
    } else if (typeData == "02"){
      let newData = that.data.data;
      newData.claim_first_end = valData
      that.setData({
        data: newData
      })
    } else if (typeData == "03"){
      let newData = that.data.data;
      newData.claim_first_remarks = valData
      that.setData({
        data: newData
      })
    } else if (typeData == "11"){
      let newData = that.data.data;
      newData.claim_second_start = valData
      that.setData({
        data: newData
      })
    } else if (typeData == "12"){
      let newData = that.data.data;
      newData.claim_second_end = valData
      that.setData({
        data: newData
      })
    } else if (typeData == "13"){
      let newData = that.data.data;
      newData.claim_second_remarks = valData
      that.setData({
        data: newData
      })
    } else if (typeData == "21"){
      let newData = that.data.data;
      newData.claim_third_start = valData
      that.setData({
        data: newData
      })
    } else if (typeData == "22"){
      let newData = that.data.data;
      newData.claim_third_end = valData
      that.setData({
        data: newData
      })
      
    } else if (typeData == "23"){
      let newData = that.data.data;
      newData.claim_third_remarks = valData
      that.setData({
        data: newData
      })
    } else if (typeData == "31"){
      let newData = that.data.data;
      newData.gold_field_start = valData
      that.setData({
        data: newData
      })
    } else if (typeData == "32"){
      let newData = that.data.data;
      newData.gold_field_end = valData
      that.setData({
        data: newData
      })
    } else if (typeData == "33"){
      let newData = that.data.data;
      newData.gold_field_remarks = valData
      that.setData({
        data: newData
      })
    } else if (typeData == "4"){
      let newData = that.data.data;
      newData.claim_remarks = valData
      that.setData({
        data: newData
      })
    }

     
  },
  /**
   * submit:提交数据
   * by heqingqing 2018/07/17
   */
  submit:function(){
    let that = this;
    let data = that.data.data;
    delete(data.city_name);
    delete (data.claim_start);
    delete (data.claim_end);
    data.type = that.data.typeNo;
    console.log(data);
    wx.request({
      url: app.globalData.ajaxurl + '/sr/chip/handle_task.html',
      method: 'post',
      header: { uuid: app.globalData.uuid },
      data: data,
      success: function (res) {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 3000
        })
        if (res.data.status == "1") {
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