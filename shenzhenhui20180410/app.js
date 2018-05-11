
// app.js
var request = require('utils/request.js');
App({
  data: {
    userId: 1,
    appId: "wx6188bb06271804e1",
    appKey: "",
    url: 'https://sr.gzldkj.cn:442',
    secret: "e8d12c8628dc1043bf8b6d4199624afd",
    grant_type: "",
    ifzhuce:'',
  },

  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    //调用API从本地缓存中获取数据
    var that = this;
    wx.login({
      success: function (res) {
        console.log('获取微信授权返回结果：'+JSON.stringify(res))
        if (res.code) {
          //发起网络请求
          that.getSession(res.code)
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });
    this.getUserInfo();
  },
  //获取用户信息
  getUserInfo: function (res) {
    var that = this
    if (this.globalData.userInfo) {
      typeof res == "function" && res(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              console.log('获取微信授权返回结果2：' + JSON.stringify(res))
              that.globalData.userInfo = res.userInfo
              typeof res == "function" && res(that.globalData.userInfo)
              //that.getJsCode(code)
            }
          })
        }
      })
    }
  },

  onShow: function (e) {
    //登录
    var that = this
    wx.checkSession({
      success: function () {
        //session 未过期  并在本生命周期一直有
      },
      fail: function () {
        //登录状态过期
        wx.login({
          success: function (res) {
            if (res.code) {
              //发起网络请求
              console.log(22)
               that.getSession(res.code)
            } else {
              console.log('获取用户登录态失败！' + res.errMsg)
            }
          }
        })
      }
    })
  },
  //获取js_code    //wx.login登录时获取的
  getJSCode(code) {
    wx.request({
      method: 'GET',
      header: {

      }, //设置请求的header 
      success: (res) => {
        console.log(res.data);
        if (res.errcode && res.errcode == 40029 && res.statusCode !== 200) {
          wx.showToast({
            title: 'Code无效，稍后重试',
            duration: 10000
          });

        } else {
          let openid = res.data.openid,
            sessin_key = res.data.session_key;
          wx.setStorageSync(LoginSessionKey, { openid, session_key })
        }
      },
      fail: function () {
        wx.showToast({
          title: '请求失败，稍后重试',
          duration: 10000
        });

      },
      complete: function () {
        wx.hideToast();
      }

    })
  },

  /**
  * 发送请求封装的方法 
  */

  sendRequest: function (url, method, data, header) {
    var promise = new Promise(function (resolve, reject) {
      wx.request({
        url: url,
        data: data,
        method: method,
        header: header,
        success: resolve,
        fail: reject
      })
    });
    return promise;
  },

  /**
  * 全局参数
  */

  globalConfig: {
    url: 'https://sr.gzldkj.cn',
    access_token: null,
    newId: null
  },
  //判断是否登录过 如果没有就跳转到绑定页面
  getOrBindTelPhone: function (returnUrl) {
    var user = this.globalData.userInfo;
    if (!user.tel) {
      wx.navigateTo({
        url: 'pages/binding/binding'
      });
    }
  },
  //定义全局参数
  globalData: {
    url: 'https://sr.gzldkj.cn:442',
    userInfo: null
  },

  onPullDownRefresh: function () {
    wx.stopPullDownRefresh();
  },
  getUrlParam(name) {
    // 获取参数
    var url = url;
    // 正则筛选地址栏
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    // 匹配目标参数
    var result = url.substr(1).match(reg);
    //返回参数值
    return result ? decodeURIComponent(result[2]) : null;
  },
  //获取登录信息



  //授权通知
  getauthorize: function () {
    var that = this
    // console.log(3)
    wx.showModal({
      title: '警告',
      content: '您点击了拒绝授权,将无法正常显示个人信息,点击确定重新获取授权。',
      success: function (res) {
        if (res.confirm) {
          wx.openSetting({
            success: (res) => {
              if (res.authSetting["scope.userInfo"]) {////如果用户重新同意了授权登录
                // that.getUser()
                that.getUserInfo()
              }
              if (res.authSetting["scope.userLocation"]) {
              }
            }, fail: function (res) {

            }
          })

        }
      }
    })
  },


  //获取accessToken
  accessToken: function (e) {
    console.log("asdfasf");
    var access_token = null
    try {
      var value = wx.getStorageSync('session')
      if (value) {
        console.log(value)
        access_token = value.openid
      }
    } catch (e) { }
    return access_token;
  },
  //再次刷新
  refreshToken: function (e) {

    var that = this
    try {
      var value = wx.getStorageSync('session')
      if (value) {
        var refresh_token = value.refresh_token
        var access_token = value.access_token
        var path = url + '/api/member/login'
        var data = { access_token: access_token, refresh_token: refresh_token }
        request.sendRrquest(path, 'POST', data, {})
          .then(function (res) {
            console.log(res.data);
            if (res.data.code == 1) {
              wx.setStorage({
                key: 'session',
                data: res.data.data[0],
              })
            } else {
              if (res.data.errorCode) {
                wx.login({
                  success: function (res) {
                    if (res.code) {
                      //发起网络请求
                      that.getSession(res.code)
                    } else {
                      console.log('获取用户登录态失败！' + res.errMsg)
                    }
                  }
                });
              }
            }
          }, function (error) {
            console.log(error);
          });
      }
    } catch (e) { }

  },
  //获取openid /code
  getSession: function (code) {
    var that = this;
    console.log(that.globalData.url + '/api/wx',code)
    wx.request({
    	url:that.globalData.url + '/api/wx',
    	method:'GET',
    	data:{js_code:code},
    	dataType:'json',
    	success:function(res){
    		console.log(res.data,123456789);
        //获取opied
        wx.setStorage({
          key: 'session',
          data: res.data.data[0],
        })
        var path = that.globalData.url + "/api/member/login"
        var data = { openid: res.data.data[0].openid };
        request.sendRrquest(path, 'POST', data, {})
      .then(function (res) {
        if(res.data.code == -1){
          that.globalData.ifzhuce = 0;
          wx.removeStorage({
            key: 'access_token',
            success: function(res) {
              console.log(res.data)
            } 
          })
        }else{
          that.globalData.ifzhuce = 1;
          console.log(111111,res.data.data[0].access_token)
          wx.setStorage({
            key:"access_token",
            data:res.data.data[0].access_token
          })
        }
      }, function (error) {
        console.log(error);
      });
        // try {
        //   var value = wx.getStorageSync('userInfo')
        //   if (value) {
        //     request.sendRrquest(path, 'POST', data, {})
        //       .then(function (res) {

        //       }, function (error) {
        //         console.log(error);
        //       });
        //   }
        // } catch (e) { }
    	}
    })

  },
  //获取openid /code
  getSession1: function (code) {
    var that = this;
    console.log(that.globalData.url + '/api/wx',code)
    wx.request({
      url:that.globalData.url + '/api/wx',
      method:'GET',
      data:{js_code:code},
      dataType:'json',
      success:function(res){
        console.log(res.data,123456789);
        //获取opied
        wx.setStorage({
          key: 'session',
          data: res.data.data[0],
        })
        var path = that.globalData.url + "/api/member/login"
        var data = { openid: res.data.data[0].openid };
        request.sendRrquest(path, 'POST', data, {})
      .then(function (res) {
        wx.stopPullDownRefresh()
        if(res.data.code == -1){
          that.globalData.ifzhuce = 0;
          wx.removeStorage({
            key: 'access_token',
            success: function(res) {
              console.log(res.data)
            } 
          })
        }else{
          that.globalData.ifzhuce = 1;
          console.log(111111,res.data.data[0].access_token)
          wx.setStorage({
            key:"access_token",
            data:res.data.data[0].access_token
          })
        }
      }, function (error) {
        wx.stopPullDownRefresh()
        console.log(error);
      });
        // try {
        //   var value = wx.getStorageSync('userInfo')
        //   if (value) {
        //     request.sendRrquest(path, 'POST', data, {})
        //       .then(function (res) {

        //       }, function (error) {
        //         console.log(error);
        //       });
        //   }
        // } catch (e) { }
      }
    })

  }

});





