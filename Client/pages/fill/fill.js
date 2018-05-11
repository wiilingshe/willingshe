// pages/fill/fill.js
var app = getApp()
var url = app.globalData.url
var memid = 0
var request = require('../../utils/request.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img: [null, null, null,null, null],
    text: ['上传身份证正面照', '上传身份证正面照', '上传手持身份证照', '上传营业执照', '上传食品经营许可证'],
    access_token: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      access_token: app.accessToken()
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
  
  },
  chosseImg:function(e){
    var index=e.currentTarget.dataset.id
    var that=this
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths[0]
        that.data.img[index] = res.tempFilePaths[0]
        /*
        wx.uploadFile({
          url: url+'api/member/uploadimage', 
          filePath: tempFilePaths,
          name: 'image',
          formData: {
            access_token: app.accessToken(), type: index        
            },
          success: function(res) {
            console.log(res)
            if(res.data.code==1){
              console.log(that.data.img)
              */
              that.setData({
                img: that.data.img
              })
              /*
            }
            if (res.data.code == -1) {
              wx.showModal({
                content: res.data.message,
              })
              if (res.data.errorCode) { app.refreshToken(); }
            }
            
            //do something
          }
        })
        */
      }
    })
  },
  submit:function(e){
    console.log(e.detail.value)
    var that=this
    var path = url + 'api/member/apply'
    var data = e.detail.value
    //console.log(data)
      request.sendRrquest(path, 'GET', data, {})
        .then(function (res) {
          console.log(res.data)
          if (res.data.code == 1) {
            var num = 0
            for (var i = 0; i < that.data.img.length; i++) {
              if (that.data.img[i] == null) {
                wx.showModal({
                  content: that.data.text[i],
                })
                break;
              } else {
                num++
              }
            }
            if (num == 5) {
              wx.redirectTo({
                url: '../submit_success/submit_success',
              })
            
            var path2 = url + 'api/member/uploadimage'
            request.uploadimg({
              url: path2,//这里是你图片上传的接口
              path: that.data.img,//这里是选取的图片的地址数组
              formData: { access_token: app.accessToken(), },
              name: 'image',
            })
          
            }
            
          } 
          if (res.data.code == -1) {
            wx.showModal({
              content: res.data.message,
            })
            if (res.data.errorCode) { app.refreshToken(); }
          }
        }, function (error) {
          console.log(error);
        });
  
   
  },
})