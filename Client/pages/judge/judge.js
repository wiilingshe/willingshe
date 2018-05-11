// pages/judge/judge.js
var app = getApp()
var url = app.globalData.url
var memid = app.globalData.memid
var request = require('../../utils/request.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    memid:'',
    order_id:'',
    score:0,
    word: ['', '差评', '差评', '一般','一般','好评'],
    len:0,
    img:[],
    goods: [],
    isthumb:[],
    isjudge:[],
    con:[],
    id:[],
    index:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    try {
      var value = wx.getStorageSync('memid')
      if (value) {
        memid = value
      } else {
        app.getUser()
        memid = app.globalData.memid
      }  
    } catch (e) {
      // Do something when catch error
      console.log(1)
    }
    that.setData({
      memid:memid,
      order_id: options.id
    })
   
    if (options.index!==undefined){
      that.setData({
        index: options.index
      })
    }
    wx.setNavigationBarTitle({
      title: '评价'//页面标题为路由参数 
    })
    console.log(options)
    var path = url + 'api/order/before'
    var data = { order_id: options.id,memid:memid }
    //console.log(data)
    request.sendRrquest(path, 'GET', data, {})
      .then(function (items) {
        console.log(items.data);
        that.setData({
          goods: items.data.data
        })
        //给所有菜品赋isthumb和con值
        console.log(that.data.goods)

        for (var i = 0; i < that.data.goods.length; i++) {
          that.data.isthumb[i] = 0
          that.data.con[i] = '',
            that.data.id[i] = that.data.goods[i].id
        }
        console.log(that.data.isthumb, that.data.id, that.data.con)
        that.setData({
          isthumb: that.data.isthumb,
          con: that.data.con,
          id: that.data.id
        })
      }, function (error) {
        console.log(error);
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
  onShareAppMessage: function () {
  
  },
  //总体评分
  judge:function(e){
    var index=e.currentTarget.dataset.index+1
    this.setData({
      score:index
    })
  },
  //写总体评价
  content: function (e) {
    this.setData({
      content: e.detail.value
    })
  },
  //点赞
  thumb:function(e){
   var index=e.currentTarget.dataset.index
   var status = this.data.isthumb[index]
   if (status==1){
     this.data.isthumb[index]=0
     this.setData({
       isthumb: this.data.isthumb
     })
   }else{
     this.data.isthumb[index] = 1
     this.setData({
       isthumb: this.data.isthumb
     })
   }
  },
  //点击评价
  eva: function (e) {
    var index = e.currentTarget.dataset.index
    var status = this.data.isjudge[index]
    if (status == 1) {
      this.data.isjudge[index] = 0
      this.setData({
        isjudge: this.data.isjudge
      })
    } else {
      this.data.isjudge[index] = 1
      this.setData({
        isjudge: this.data.isjudge
      })
    }
  },
  //写评价
  input:function(e){
    var index = e.currentTarget.dataset.index
    this.data.con[index]=e.detail.value
    this.setData({
      con: this.data.con
    })
  },
  //提交图片
  add_img:function(){
    var that=this
    wx.chooseImage({
      count: 1, // 默认9 
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有 
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有 
      success: function (res) { 
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片 
        var tempFilePaths = res.tempFilePaths[0] 
        that.data.img.push(tempFilePaths)
        that.setData({
          img: that.data.img
        })
        } 
    })
  },
  formSubmit:function(e){   
    var that=this
    wx.showLoading({
      title: '提交中',
    })
    var form = e.detail.value
    form.id=this.data.id
    form.isthumb = this.data.isthumb
    form.con = this.data.con
    form.image_num = that.data.img.length
    console.log(form)
    var path = url + 'api/order/comment'
    console.log(that.data.img[0])
      request.sendRrquest(path, 'POST', form, {})
        .then(function (items) {
          console.log(items.data);
          wx.hideLoading()
          if (items.data.code==1){
            wx.showToast({
              title: '提交成功',
              icon:'success'
            })
            if (that.data.img.length > 0) {
            var path2 = url + 'api/order/comment_image'
            request.uploadimg({
              url: path2,//这里是你图片上传的接口
              path: that.data.img,//这里是选取的图片的地址数组
              formData: { memid: memid, order_id: that.data.order_id},
              name:'image',
              type: 1,
              index:that.data.index
            })

            } 
          }
        }, function (error) {
          console.log(error);
        });
   
  },
  //删除图片
  clear:function(e){
    var index=e.currentTarget.dataset.index
    this.data.img.splice(index,1)
    
    this.setData({
      img: this.data.img
    })
  }
})