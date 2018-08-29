// user/bindPhone/bindPhone.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    buttonText:'',
    phoneNum:'',
    sendMsg:false,
    isCheck:false,
    msmButtonText:'获取验证码',
    seconds:'60',
    msgCode:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    if(options.type==1){
      that.setData({buttonText:'绑  定'});
    }else if(options.type==2){
      that.setData({buttonText:'绑定新手机',phoneNum:options.phone});
    };
    wx.hideShareMenu();
  },
  getPhoneKey(e){ //获取手机号码输入框的值
    this.setData({phoneNum:e.detail.value});
    if(e.detail.value.length==11 && this.data.msgCode.length==6){
      this.setData({isCheck:true});
    }else{
      this.setData({isCheck:false});
    }
  },
  getMsgCode(e){ //获取短信验证码
    var that = this;
    var phoneRegExp = /^(13[0-9]|14[57]|15[012356789]|16[6]|17[0135678]|18[0-9]|19[89])[0-9]{8}$/;
    if(phoneRegExp.test(that.data.phoneNum)){
      wx.request({
        url:app.globalData.ajaxurl+'/sr/auth/sms.html',
        data:{type:3,phone:that.data.phoneNum},
        header:{uuid:app.globalData.uuid},
        method:'POST',
        success:res=>{
          wx.showToast({
            title:res.data.msg,
            icon:"none",
            duration: 1500
          });
          if(res.data.status==1){
            that.setData({sendMsg:true});
            var init = setInterval(function(){
              that.data.seconds--;
              that.setData({seconds:that.data.seconds});
              if(that.data.seconds==0){
                clearInterval(init);
                that.setData({
                  sendMsg:false,
                  seconds:'60',
                  msmButtonText:'重新获取'
                })
              }
            },1000);
          }
        }
      });
    }else{
      wx.showToast({
        title:'请输入正确的手机号码',
        icon:"none",
        duration: 1500
      });
    }
  },
  getCodeKey(e){ //获取短信验证码输入框的值
    if(e.detail.value.length==6 && this.data.phoneNum.length!=0) {
      this.setData({isCheck:true,msgCode:e.detail.value});
    }else if(e.detail.value.length==6 && this.data.phoneNum.length==0){
      this.setData({isCheck:false,msgCode:e.detail.value});
      wx.showToast({
        title:'请输入手机号码',
        icon:"none",
        duration: 1500
      })
    }else if(e.detail.value.length<6){
      this.setData({isCheck:false,msgCode:''});
    }
  },
  bindMobile(e){
    var that = this;
    var phoneRegExp = /^(13[0-9]|14[57]|15[012356789]|16[6]|17[0135678]|18[0-9]|19[89])[0-9]{8}$/;
    if(phoneRegExp.test(this.data.phoneNum)){
      wx.setNavigationBarTitle({
        title: '加载中...'
      });
      wx.showNavigationBarLoading();
      wx.request({
        url:app.globalData.ajaxurl+'/sr/auth/phone_code.html',
        data:{phone:that.data.phoneNum,code:that.data.msgCode},
        header:{uuid:app.globalData.uuid},
        method:'POST',
        success:res=>{
          wx.setNavigationBarTitle({
            title: '绑定手机'
          });
          wx.hideNavigationBarLoading();
          if(res.data.status==1){
            wx.showToast({
              title:'',
              icon:"success",
              duration: 1000
            });
            setTimeout(function(){ //缓存手机号
              try {
                  wx.setStorageSync('bindMobile',that.data.phoneNum);
              } catch (e) {   
                console.log('发生错误:'+e);
              }
              wx.navigateBack({
                delta: 1
              })
            },1000);
          }else{
            wx.showToast({
              title:res.data.msg,
              icon:"none"
            });
          }
        }
      })
    }else{
      wx.showToast({
        title:'请输入正确的手机号码',
        icon:"none",
        duration: 1000
      })
    }
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
  
  }
})