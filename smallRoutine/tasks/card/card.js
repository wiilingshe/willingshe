const app = getApp();
var bmap = require('../../static/js/qqmap-wx-jssdk.min.js');
var wxMarkerData = [];  //定位成功回调对象  
var qqmapsdk;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    addressImg: app.globalData.globalurl + '/img/task/task_Details_Positioning1@2x.png',
    timeImg: app.globalData.globalurl + '/img/task/task_Details_time@2x.png',
    btnImg: app.globalData.globalurl + '/img/task/Click@2x.png',
    successIcon: app.globalData.globalurl + '/img/task/done@2x.png',
    resetIcon: app.globalData.globalurl + '/img/task/Reset@2x.png',
    addressText: '',
    timeText:'',
    longitude:'',
    latitude:'',
    markers:[],
    cinema_id:'',
    p_id:'',
    isSuccess:0, //是否打卡成功
    controls:[]
  },
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    let that = this;
    console.log(options);
    that.setData({
      cinema_id: options.cinema_id,
      p_id: options.p_id,
      isSuccess: options.typeData
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (e) {
    this.mapCtx = wx.createMapContext('map');
  },
  /**
   * updated:初始化获取经纬度，并设置
   */
  onShow:function(){
    var that = this;
    qqmapsdk = new bmap({
      key: 'XCIBZ-25O3D-D3P4A-HLMQK-FJSJK-VGFID'//此处使用你自己申请的key
    　　});
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      altitude: true,
      success: function (res) {
        var marker = [{
          id: 0,
          latitude: res.latitude,
          longitude: res.longitude,
          iconPath: "/static/img/task/dingwei@2x.png",
          width: 20,
          height: 34
        }]
        that.setData({
          longitude: res.longitude,
          latitude: res.latitude,
          markers: marker
        });
       
          qqmapsdk.reverseGeocoder({
            location: {
              latitude: res.latitude,
              longitude: res.longitude
            },
            success: function (addressRes) {
              wx.hideLoading();
              var address = addressRes.result.formatted_addresses.recommend;
              that.setData({
                addressText: address
              })
            },
            fail: function (res) {
               
            },
               
          })
      }
    });
      that.getData();
    
    
    

    


  },
  /**
   * getCenterLocation：点击按钮获取经纬度，请求接口
   * by heqingqing 2018/07/10
   */
  getCenterLocation:function(){
    let that = this;
    that.mapCtx.getCenterLocation({
      success: function (res) {
        that.punchTheClock(res.latitude, res.longitude, that.data.addressText, that.data.p_id,that.data.cinema_id)
      }
    })
  },
  /**
   * getData:获取本地展示时间
   */
  getData:function(){
    var that = this;
    setInterval(function(){
      // 时间
      var now = new Date();
      var year = now.getFullYear();       //年
      var month = now.getMonth() + 1;     //月
      var day = now.getDate();            //日
      var hh = now.getHours();            //时
      var mm = now.getMinutes();          //分
      var ss = now.getSeconds();           //秒
      var clock = year + "年";
      if (month < 10)
        clock += "0";
      clock += month + "月";
      if (day < 10)
        clock += "0";
      clock += day + "日" + " ";
      if (hh < 10)
        clock += "0";
      clock += hh + ":";
      if (mm < 10) clock += '0';
      clock += mm + ":";
      if (ss < 10) clock += '0';
      clock += ss;
      that.setData({
        timeText: clock
      });
    },1000)
    
  },
  /**
   * punchTheClock:点击打卡接口
   * by heqingqing 2018/7/12
   * 参数：纬度，	经度，打卡地址，排片ID，影院ID
   */
  punchTheClock: function (latitude, longitude, address, p_id, cinema_id){
    var that = this;
    wx.request({
      url: app.globalData.ajaxurl + '/sr/chip/punch_the_clock.html',
      method: 'post',
      header: { uuid: app.globalData.uuid },
      data: { 'latitude': latitude, 'longitude': longitude, 'address': address, 'p_id': p_id, 'cinema_id': cinema_id},
      success: function (res) {
        wx.showToast({
          title: res.data.msg,
          icon: "none"
        });
        if (res.data.status=='1'){
        that.setData({
          isSuccess:1
        });
        setTimeout(function () {
          wx.navigateBack({
            delta: 1
          })
        }, 500);
        }
      }
    })
  },
  /**
   * reset:重新获取经纬度
   * by heqingqing 2018/07/24
   */
  reset:function(){
    let that = this;
    qqmapsdk = new bmap({
      key: 'XCIBZ-25O3D-D3P4A-HLMQK-FJSJK-VGFID'//此处使用你自己申请的key
    });
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      altitude: true,
      success: function (res) {
        var marker = [{
          id: 0,
          latitude: res.latitude,
          longitude: res.longitude,
          iconPath: "/static/img/task/dingwei@2x.png",
          width: 20,
          height: 34
        }]
        that.setData({
          longitude: res.longitude,
          latitude: res.latitude,
          markers: marker
        });

        qqmapsdk.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          success: function (addressRes) {
            wx.hideLoading();
            var address = addressRes.result.formatted_addresses.recommend;
            that.setData({
              addressText: address
            })
          },
          fail: function (res) {

          },

        })
      }
    });
  }


})