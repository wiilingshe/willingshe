//app.js
App({
  onLaunch: function () {
    var that = this;
    wx.login({
      success(res){
        that.globalData.code = res.code;
        wx.request({
          url:that.globalData.ajaxurl+'/sr/login.html',
          method:'post',
          data:{code:res.code},
          success:function(res1){
            that.globalData.uuid = res1.data.uuid;
            that.globalData.userstatus = res1.data.applyStatus;
            if(res1.data.status == 1){
              if(res1.data.applyStatus == 3){
                that.globalData.is_bound_wx = res1.data.is_bound_wx;
                //通过
                // wx.switchTab({
                //   url: '/pages/home/home'
                // });
              }else if(res1.data.applyStatus == 1){
                //跳转到审核页面
                wx.redirectTo({
                  url: "/login/review/review"
                })
              }else if(res1.data.applyStatus == 0){
                //拉黑中
                // wx.redirectTo({
                //   url: "/pages/index/index"
                // })
              }else if(res1.data.applyStatus == 2){
                //审核不通过
                wx.hideLoading();
                wx.redirectTo({
                  url:"/login/apply/apply"
                })
              }else if(res1.data.applyStatus == 9){
                wx.hideLoading();
                // wx.redirectTo({
                //   url:"/pages/index/index"
                // })
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
  judgState(pageNo,index,that,c_id,p_id,m_id){
    var self = this;
    wx.login({
      success(res2){
        if(m_id == undefined){
          var data = {code:res2.code}
        }else{
          var data = {code:res2.code,mid:options.m_id}
        }
        wx.request({
          url:self.globalData.ajaxurl+'/sr/login.html',
          method:'post',
          data:{code:res2.code},
          success:function(res1){
            self.globalData.uuid = res1.data.uuid;
            if(res1.data.status == 1){
              if(res1.data.applyStatus == 3){
                //通过
                if(index == 'task'){
                  that.getData(pageNo,res1.data.uuid);
                }else if(index == 'taskList'){
                  that.getTask(c_id, p_id, res1.data.uuid);
                }else if(index == 'home'){
                  that.getData();
                  if(res1.data.is_bound_wx == 1){
                    that.setData({
                      ifattention:true
                    })
                  }else{
                    that.setData({
                      ifattention:false
                    })
                  }
                }
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
                wx.redirectTo({
                  url:"/pages/index/index"
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
  currentPage() {
      return getCurrentPages();
  },
  globalData: {
    userInfo: null,
    globalurl:'https://issuer.oopca.com',
    // globalurl:'http://www.do.com',
    ajaxurl:'https://issuer.oopca.com',
    uuid:'',
    userstatus:'',
    is_bound_wx:'',
    code:'',
  }
})