//app.js

var request = require('utils/request.js');
App({
  onLaunch: function () {
    // 展示本地存储能力
    var that = this;
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs) 
    // 登录
    var that = this 
    wx.login({
      success: function (res) {
        if (res.code) {
          //发起网络请求
          console.log(res,111111111)
          that.getSession(res.code)
          // wx.request({
          //   url: 'https://api.weixin.qq.com/sns/jscode2session',  
          //   data:{  
          //     appid:'wxc9ed749b72a644f8',  
          //     secret:'cf03f5414be857b150e09de41f5f0286',  
          //     js_code:res.code,  
          //     grant_type:'authorization_code'  
          //   },  
          //   method:'GET', 
          //   success:function(res){
          //     console.log(res.data.openid)
          //     that.globalData.openid = res.data.openid;
          //   } 
          // })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });
    //授权
    wx.authorize({
      scope: 'scope.userInfo',
      success() {
        that.getUserInfo()
        wx.authorize({
          scope: 'scope.userLocation',
          success() {
            // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问         
          }
        })
      },
      fail() {
        that.getauthorize()
      }
    })
  },
  onShow: function (e) {
    // 登录
    var that = this
    wx.checkSession({
      success: function () {
        //session 未过期，并且在本生命周期一直有效
        console.log(33)
      },
      fail: function () {
        //登录态过期
        wx.login({
          success: function (res) {
            if (res.code) {
              //发起网络请求
              console.log(22)
             // that.getSession(res.code)
            } else {
              console.log('获取用户登录态失败！' + res.errMsg)
            }
          }
        });
      }
    })
  },
  //获取openid等信息
  getSession: function (code) {
    var that=this
   // console.log(code)
    wx.request({
      //获取openid接口
      url: this.globalData.url + 'api/login/wxlogin',
      data: {
        js_code: code,
      },
      method: 'GET',
      success: function (res) {
        //获取openid 
        console.log(res.data.data[0].user.wx_openid)
        that.globalData.openid = res.data.data[0].user.wx_openid;
        wx.setStorage({
          key: 'session',
          data: res.data.data[0],
        })
        var path = that.globalData.url + 'api/Login/updateUserInfo'
        var data = { access_token: res.data.data[0].access_token }
        try{
          var value = wx.getStorageSync('userInfo')
          if(value){
            data.province = value.province
            data.city = value.city
            data.headimage = value.avatarUrl
            data.sex = value.gender
            request.sendRrquest(path, 'POST', data, {})
              .then(function (res) {
               // console.log(res.data);

              }, function (error) {
                console.log(error);
              });  
          }
        }catch(e){}
        
      }
    })
  },
  //获取用户信息
  getUserInfo: function (e) {
    var that = this
    //console.log(2)
    /*
    var getInfo = setInterval(function () {
      if (that.globalData.userInfo) {
        clearInterval(getInfo)
      } else {
        */
        wx.getSetting({
          success: res => {
            if (res.authSetting['scope.userInfo']) {
              // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
              wx.getUserInfo({
                success: res => {
                  console.log(res)
                  // 可以将 res 发送给后台解码出 unionId
                  that.globalData.userInfo = res.userInfo
                  // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                  // 所以此处加入 callback 以防止这种情况
                  wx.setStorage({
                    key: 'userInfo',
                    data: res.userInfo,
                  })
                 
                  if (this.userInfoReadyCallback) {
                    that.userInfoReadyCallback(res)
                  }
                }
              })
            } else {
              that.getauthorize()
            }
          }
        })
        /*
      }
    }, 5000)
    */
  },
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
                /*
                wx.getLocation({
                type: 'gcj02',
                success: function (res) {
                wx.setStorage({ key: "gps", data: { lat: res.latitude, lng: res.longitude } })
                }
                })
                
                */
              }
            }, fail: function (res) {

            }
          })

        }
      }
    })
  },
//获取accessToken
  accessToken:function(e){
   // console.log(4)
    var access_token = null
    try {
      var value = wx.getStorageSync('session')
      if (value) {
        //console.log(value)
        access_token = value.access_token
      }
    } catch (e) { }
    return access_token;
  },
  //刷新accessToken
  refreshToken: function (e) {
    console.log(5)
    var that=this
    try {
      var value = wx.getStorageSync('session')
      if (value) {
        var refresh_token = value.refresh_token
        var access_token = value.access_token
        var path = url + 'api/Oauth2/refreshTokenl'
        var data = { access_token: access_token, refresh_token: refresh_token }
        request.sendRrquest(path, 'POST', data, {})
          .then(function (res) {
            console.log(res.data);
            if(res.data.code==1){
              wx.setStorage({
                key: 'session',
                data: res.data.data[0],
              })
            }else{
              if (res.data.errorCode){
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
  globalData: {
    userInfo: null,
    url: 'https://gzldrj.com/',
    keyt: 'VWIBZ-2VN3U-W5OVY-2F52K-ULONJ-MUB6B',
    openid:'',
  },

  putk: function (k, v, t) {
    console.log(t)
    wx.setStorageSync(k, v)
    var seconds = parseInt(t);
    if (seconds >
      0) {
      var timestamp = Date.parse(new Date());
      timestamp = timestamp / 1000 + seconds;
      wx.setStorageSync(k + 'dtime', timestamp + "")
    } else {
      wx.removeStorageSync(k + 'dtime')
    }
  },

  getk:function(k, def) {

    var deadtime = parseInt(wx.getStorageSync(k + 'dtime'))

    if (deadtime) {
      if (parseInt(deadtime) < Date.parse(new Date()) /
        1000) {
        if (def) { return def; }
        else { return; }

      }
    }
    var res = wx.getStorageSync(k);
    if (res) {
      return res;
    } else {
      return def;
    }
  },
  removek:function(k) {
    wx.removeStorageSync(k);
    wx.removeStorageSync(k + 'dtime');
  },
  cleark:function() {
    wx.clearStorageSync();
  }
})

