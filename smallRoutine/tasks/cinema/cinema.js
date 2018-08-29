// tasks/cinema/cinema.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arr: [
      { title: '排片沟通', content: '与影城沟通排片率、黄金场排片率', state: '0' },
      { title: '投放资源', content: '确认影院是否提供投放资源', state: '0' },
      { title: '物料检查', content: '海报、展架、预告片等物料落实', state: '0' },
      { title: '附加套餐', content: '抢票喷绘、发布会路演等额外活动', state: '0' },
      { title: '工作日报', content: '对该影院的沟通结果总结', state: '0' }
    ],
    addressIcon: app.globalData.globalurl+'/img/task/task_Positioning@2x.png',
    dataArr:[],
    cinema_id:'',
    p_id:'',
    status:0,
    msg:''
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    let that = this;
    // that.getData(options.cinema_id, options.p_id);
    that.setData({
      cinema_id: options.cinema_id,
      p_id: options.p_id
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
    let that = this;
    that.getData(that.data.cinema_id,that.data.p_id);
  },
  /**
   * goSubmission:跳到各自详情页提交
   * by heqingqing 2018/07/05
   */
  goSubmission:function(event){
    let dataId = event.target.id;
    let that = this;
    if (that.data.status=='2'){
      wx.showToast({
        title: that.data.msg,
        icon: 'none',
        duration: 1000
      })
      return
    }
    if (that.data.dataArr.is_on_clock !='1'){
      wx.showToast({
        title: '请先打卡',
        icon: 'none',
        duration: 1000
      })
      return
    }
    if (dataId=='0'){//排片沟通
      wx.navigateTo({
        url: '/tasks/cinemaCommunication/cinemaCommunication?cinema_id=' + that.data.cinema_id + '&p_id=' + that.data.p_id + ''
      })
    } else if (dataId=='1'){//投放资源
      wx.navigateTo({
        url: '/tasks/cinemaResources/cinemaResources?cinema_id=' + that.data.cinema_id + '&p_id=' + that.data.p_id + ''
      })
    } else if (dataId == '2'){//物料检查
      wx.navigateTo({
        url: '/tasks/cinemaInspection/cinemaInspection?cinema_id=' + that.data.cinema_id + '&p_id=' + that.data.p_id + ''
      })
    } else if (dataId == '3'){//附加套餐
      wx.navigateTo({
        url: '/tasks/cinemaAdditional/cinemaAdditional?cinema_id=' + that.data.cinema_id + '&p_id=' + that.data.p_id + ''
      })
    } else if (dataId == '4'){ //工作日报
      wx.navigateTo({
        url: '/tasks/cinemaWork/cinemaWork?cinema_id=' + that.data.cinema_id + '&p_id=' + that.data.p_id+''
      })
    }
  },
  /**
   * goCard:跳到打卡页
   * by heqingqing 2018/07/06
   */
  goCard:function(e){
    let typeData = e.currentTarget.dataset.type; //判断是否打卡，1为打卡，0为不打卡
    let that = this;
    if (that.data.status == '2') {
      wx.showToast({
        title: that.data.msg,
        icon: 'none',
        duration: 1000
      })
      return
    }
    wx.navigateTo({
      url: '/tasks/card/card?cinema_id=' + that.data.cinema_id + '&p_id=' + that.data.p_id + '&typeData=' + typeData+''
    })
  },
  /**
   * getData:获取初始化数据
   */
  getData: function (cinema_id, p_id){
    let that = this;
    wx.request({
      url: app.globalData.ajaxurl + '/sr/chip/get_task_status.html',
      method: 'post',
      header: { uuid: app.globalData.uuid },
      data: { 'cinema_id': cinema_id, 'p_id': p_id},
      success: function (res) {

        if (res.data.status == 1 || res.data.status == 2){
            let newArr = that.data.arr;
            newArr[0].state = res.data.data.is_claim;
            newArr[1].state = res.data.data.is_brushing;
            newArr[2].state = res.data.data.is_bill;
            newArr[3].state = res.data.data.is_meal;
            newArr[4].state = res.data.data.is_journal;
            that.setData({
              dataArr:res.data.data,
              arr: newArr,
              status: res.data.status,
              msg: res.data.msg
            })
        }

      }
    })
  }
})