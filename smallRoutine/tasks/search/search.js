// tasks/search/search.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchIcon: app.globalData.globalurl +'/img/task/task_search@2x.png',
    focus:true,
    searchinput:'',
    list:[],
    latitude:'',
    longitude:'',
    c_id:'',
    pId:'',
    isLower:true, 
    nothing:false,
    pageNo:1

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    that.setData({
      latitude: options.latitude,
      longitude: options.longitude,
      c_id: options.c_id,
      pId: options.pId
    })
  
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
   * cancel:清空输入框的值
   * by heqingqing 2018/07/13
   */
  cancel:function(){
    wx.navigateBack({
      delta: 1
    })
    // let that = this;
    // that.setData({
    //   searchinput:''
    // })
  },
  /**
   * inputVal:获取input值
   * by heqingqing 2018/07/13
   */
  inputVal:function(e){
    let that = this;
    let valData = e.detail.value;
    that.setData({
      searchinput:valData
    })   
  },
  /**
   * goData:请求接口数据
   * by heqingqing 2018/07/13
   */
  goData:function(){
    wx.showLoading({
      title: '加载中',
    });
    let that = this;
    that.setData({
      list:[]
    })
    that.getList(that.data.latitude, that.data.longitude, that.data.pId, that.data.pageNo,'0', that.data.searchinput )
    
    
  },
  /**
   * getList:获取列表信息
   * by heqingqing 2018/07/12
   * 参数：纬度 	经度 排片ID page
   */
  getList: function (latitude, longitude, p, page, status, title) {
    var that = this;
    if (title) {
      var data1 = { 'latitude': latitude, 'longitude': longitude, 'p_id': p, 'page': page, 'type': status, 'title': title }
    } else {
      var data1 = { 'latitude': latitude, 'longitude': longitude, 'p_id': p, 'page': page, 'type': status }
    }
    wx.request({
      url: app.globalData.ajaxurl + '/sr/chip/task_lst.html',
      method: 'post',
      header: { uuid: app.globalData.uuid },
      data: data1,
      success: function (res) {
        wx.hideLoading();
        if (res.data.status == 1) {
          if (res.data.data.length != '0') {
            that.data.pageNo += 1;
            let newList = that.data.list;
            newList = newList.concat(res.data.data);
            that.setData({
              list: newList
            })
          } else {
            that.setData({
              isLower: false
            })
          }

        }
        if (res.data.data == '' && page == 1) {
          that.setData({
            nothing: 1
          })
        }

      }
    })
  },
  /**
   * lower:是否无限加载
   */
  lower: function () {
    var that = this;
    if (that.data.isLower) {
      wx.showLoading({
        title: '加载中',
      });
      that.getList(that.data.latitude, that.data.longitude, that.data.pId, that.data.pageNo, '0', that.data.searchinput);
    }
  },
  /**
   * goCinema:跳到影院页面
   * by heqingqing 2018/07/05
   */
  goCinema: function (e) {
    var cinema_id = e.currentTarget.dataset.cinema;
    var p_id = e.currentTarget.dataset.p;
    wx.navigateTo({
      url: '/tasks/cinema/cinema?cinema_id=' + cinema_id + '&p_id=' + p_id + ''
    });
  },

 
})