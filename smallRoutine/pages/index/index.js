//index.js
//获取应用实例
const app = getApp()
var shouquan = function(res,uuid,that){
  // console.log(res)
  // console.log(uuid)
  wx.request({
    url:app.globalData.ajaxurl+'/sr/getUserInfo.html',
    method:'POST',
    header:{uuid:uuid},
    data:{
      rawData:res.rawData,
      signature:res.signature,
      encryptedData:res.encryptedData,
      iv:res.iv
    },
    success:function(res1){
      // console.log(res1)
      if(res1.data.status == 1){
        wx.hideLoading();
        if(res1.data.applyStatus == 3){
          //通过
          wx.switchTab({
            url: '/pages/home/home'
          })
        }else if(res1.data.applyStatus == 1){
          //跳转到审核页面
          wx.redirectTo({
            url: "/login/review/review"
          })
        }else if(res1.data.applyStatus == 0){
          //拉黑中
        }else if(res1.data.applyStatus == 2){
          //审核不通过
          wx.hideLoading();
          wx.redirectTo({
            url:"/login/apply/apply"
          })
        }else if(res1.data.applyStatus == 9){
          that.setData({
            ifloading:false
          })
        }
      }else if(res1.data.status == 0){
        wx.showToast({
          title: res1.data.msg,
          icon: 'none',
          duration: 1000
        })
      }
    }
  })
}

function checkPhone(mobile){
  var mobile = mobile;
  if(mobile == ""){
    wx.showToast({
      title: '请输入手机号码',
      icon: 'none',
      duration: 1000
    })
    return false;
  }
  var regExp = /^(86)?((13\d{9})|(15[0,1,2,3,5,6,7,8,9]\d{8})|(18[0,5,6,7,8,9]\d{8}))$/;
  if(!regExp.test(mobile)){
    wx.showToast({
      title: '手机号码格式错误',
      icon: 'none',
      duration: 1000
    })
    return false;
  }
}

Page({
  data: {
    canIUse: true,
    img1: app.globalData.globalurl+'/img/index/in_more.png',
    img2: app.globalData.globalurl+'/img/index/in_close.png',
    img3: app.globalData.globalurl+'/admin/base/img/logo.png',
    iflogin:false,
    mobile:'',
    ifhave:false,
    yan:'',
    tip:'',
    yanzheng:'获取验证码',
    miao:'60',
    ifyan:false,
    ifloading:true,
    ifgo:true,
  },
  onLoad: function (options) {
    wx.showLoading({
      title: '登录中...',
    })
    var that = this;
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              //用户已经授权过
              that.setData({
                canIUse:true
              })
              app.globalData.userInfo = res.userInfo;
              var infos = res;
            }
          })
        }else{
          wx.hideLoading()
          that.setData({
            canIUse:false,
            ifloading:false
          })
        }
      }
    })
    // console.log(app.globalData.userstatus)
    wx.login({
      success(res2){
        if(options.m_id == undefined){
          var data = {code:res2.code}
        }else{
          var data = {code:res2.code,mid:options.m_id}
        }
        wx.request({
          url:app.globalData.ajaxurl+'/sr/login.html',
          method:'post',
          data:data,
          // header:{uuid:app.globalData.uuid},
          success:function(res1){
            app.globalData.uuid = res1.data.uuid;
            // var res=infos;
            // shouquan(res,res1.data.uuid,that);
            if(res1.data.status == 1){
              wx.hideLoading();
              if(res1.data.applyStatus == 3){
                //通过
                // that.setData({
                //   ifloading:false
                // })
                wx.switchTab({
                  url: '/pages/home/home'
                })
              }else if(res1.data.applyStatus == 1){
                //跳转到审核页面
                wx.redirectTo({
                  url: "/login/review/review"
                })
              }else if(res1.data.applyStatus == 0){
                //拉黑中
              }else if(res1.data.applyStatus == 2){
                //审核不通过
                wx.hideLoading();
                wx.redirectTo({
                  url:"/login/apply/apply"
                })
              }else if(res1.data.applyStatus == 9){
                that.setData({
                  ifloading:false
                })
              }
            }else if(res1.data.status == 0){
              wx.showToast({
                title: res1.data.msg,
                icon: 'none',
                duration: 1000
              })
            }
          }
        })
      }
    })
  },
  judge(){
    
  },
  formSubmit(event){
    var that = this;
    // console.log(event.detail.formId)
    checkPhone(this.data.mobile)
    wx.request({
      url:app.globalData.ajaxurl+'/sr/auth/sms.html',
      method:'POST',
      header:{uuid:app.globalData.uuid},
      data:{type:1,phone:this.data.mobile},
      success:function(res){
        if(res.data.status == 1){
          that.setData({
            ifyan:true
          })
          var init = setInterval(function(){
            that.data.miao--;
            that.setData({
              miao:that.data.miao
            })
            if(that.data.miao == 0){
              clearInterval(init)
              that.setData({
                ifyan:false,
                miao:60,
                yanzheng:'重新获取'
              })
            }
          },1000)
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 1500
          })
        }else{
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 1500
          })
        }
      }
    })
  },
  bindKeyInput: function(e) {
    this.setData({
      mobile: e.detail.value
    })
  },
  bindKeyInput1: function(e) {
    var that = this;
    // console.log(e.detail.value)
    if(e.detail.value.length > 6){
      // return false;
    }else if(e.detail.value.length == 6){
      wx.request({
        url:app.globalData.ajaxurl+'/sr/auth/phone_code.html',
        method:'post',
        data:{phone:this.data.mobile,code:e.detail.value},
        header:{uuid:app.globalData.uuid},
        success:function(res){
          if(res.data.status == 1){
            that.setData({
              ifhave:true,
              tip:'',
            })
          }else{
            that.setData({
              tip:res.data.msg,
              ifhave:false,
            })
          }
        }
      })
    }
    this.setData({
      yan: e.detail.value
    })
  },
  getyan(){
    
  },
  bindGetUserInfo: function (e) {
    var that = this;
    if (e.detail.userInfo) {
      that.setData({
        canIUse:true,
        iflogin:true
      })
      wx.getUserInfo({
        success: function (res) {
          // console.log(res)
          //用户已经授权过
          app.globalData.userInfo = res.userInfo;
          wx.request({
            url:app.globalData.ajaxurl+'/sr/getUserInfo.html',
            method:'post',
            header:{uuid:app.globalData.uuid},
            data:{
              rawData:res.rawData,
              signature:res.signature,
              encryptedData:res.encryptedData,
              iv:res.iv
            },
            success:function(res1){
              if(res1.data.status == 1){
              if(res1.data.applyStatus == 3){
                //通过
                wx.hideLoading();
                wx.switchTab({
                  url: '/pages/home/home'
                })
              }else if(res1.data.applyStatus == 1){
                //跳转到审核页面
                wx.redirectTo({
                  url: "/login/review/review"
                })
              }else if(res1.data.applyStatus == 0){
                //拉黑中
              }else if(res1.data.applyStatus == 2){
                //审核不通过
                wx.hideLoading();
                wx.redirectTo({
                  url:"/login/apply/apply"
                })
              }else if(res1.data.applyStatus == 9){
                that.setData({
                  ifloading:false
                })
              }
            }else if(res1.data.status == 0){
              wx.showToast({
                title: res1.data.msg,
                icon: 'none',
                duration: 1000
              })
            }
            }
          })
        }
      })
    } else {
      that.setData({
        canIUse:false
      })
    }
  },
  bindGetUserInfo1(e){
    var that = this;
    if (e.detail.userInfo) {
      that.setData({
        canIUse:true
      })
      wx.getUserInfo({
        success: function (res) {
          //用户已经授权过
          app.globalData.userInfo = res.userInfo;
          wx.request({
            url:app.globalData.ajaxurl+'/sr/getUserInfo.html',
            method:'post',
            header:{uuid:app.globalData.uuid},
            data:{
              rawData:res.rawData,
              signature:res.signature,
              encryptedData:res.encryptedData,
              iv:res.iv
            },
            success:function(res1){
              if(res1.data.status == 1){
                wx.navigateTo({
                  url: "/login/apply/apply"
                })
              }else{
                
              }
            }
          })
        }
      })
    }else{
      that.setData({
        canIUse:false
      })
    }
  },
  denglu(){
    // wx.getUserInfo({
    //   success(res){
    //     shouquan(res,app.globalData.uuid)
    //   }
    // })
    wx.switchTab({
      url: '/pages/home/home'
    })
  },
  login(){
    // if(app.globalData.userstatus == 9){
    //   wx.showToast({
    //     title: '请先申请加入再登录',
    //     icon: 'none',
    //     duration: 2000
    //   })
    //   return false;
    // }
    this.setData({
      iflogin:true
    })
  },
  close(){
    this.setData({
      iflogin:false
    })
  },
  moblielogin(){

  },
  apply(){
    // console.log(this.data.ifgo)
    // if(this.data.ifgo == true){
    //   wx.showLoading({
    //     title: '加载中',
    //   })
    //   this.data.ifgo = false;
    //   var that = this;
    //   wx.getUserInfo({
    //       success:function(res){
            // console.log(res)
    //         wx.request({
    //           url:app.globalData.ajaxurl+'/sr/getUserInfo.html',
    //           method:'POST',
    //           header:{uuid:app.globalData.uuid},
    //           data:{
    //             rawData:res.rawData,
    //             signature:res.signature,
    //             encryptedData:res.encryptedData,
    //             iv:res.iv
    //           },
    //           success:function(res1){
    //             wx.hideLoading()
    //             that.data.ifgo = true;
    //             if(res1.data.status == 1){
    //               wx.navigateTo({
    //                 url: "/login/apply/apply"
    //               })
    //             }else{
    //               wx.showToast({
    //                 title: res1.data.msg,
    //                 icon: 'none',
    //                 duration: 1000
    //               })
    //             }
    //           }

    //         })
    //       }
    //     })
    // }
    wx.navigateTo({
      url: "/login/apply/apply"
    })
  }
})
