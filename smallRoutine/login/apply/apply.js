// login/apply/apply.js
const app = getApp();
Page({
  data: {
    img1:app.globalData.ajaxurl+'/img/personalCenter/more.png',
    sex:'',
    sexid:'',
    date:'',
    region:'',
    tou:'',
    name:'',
    sexid:'',
    job_time:'',
    province_id:'',
    city_id:'',
    zone_id:'',
    phone:'',
    jieshao:'',
    yan:'',
    miao:60,
    ifyan:false,
    userinfodata:[],
    yantext:'获取验证码'
  },
  onLoad: function (options) {
    wx.showLoading()
    var that = this;
    wx.getUserInfo({
      success(res){
        that.setData({
          tou:res.userInfo.avatarUrl
        })
      }
    })
    if(app.globalData.uuid == ''){
      wx.login({
        success:function(res){
         wx.request({
            url:app.globalData.ajaxurl+'/sr/login.html',
            method:'post',
            data:{code:res.code},
            header:{uuid:app.globalData.uuid},
            success:function(res1){
              wx.request({
                url:app.globalData.ajaxurl+'/sr/member_detail.html',
                method:'POST',
                header:{uuid:res1.data.uuid},
                success:function(res){
                  wx.hideLoading()
                  if(res.data.status == 1){
                    that.setData({
                      userinfodata:res.data.data,
                      region:res.data.data.address==null?'':res.data.data.address,
                      province_id:res.data.data.province_id,
                      city_id:res.data.data.city_id,
                      zone_id:res.data.data.zone_id,
                      name:res.data.data.nickname,
                      phone:res.data.data.phone,
                    })
                    if(res.data.data.sex == 1){
                      that.setData({
                        sex:'男',
                        sexid:1
                      })
                    }else if(res.data.data.sex == 2){
                      that.setData({
                        sex:'女',
                        sexid:2
                      })
                    }else{
                      that.setData({
                        sex:'其他',
                        sexid:3
                      })
                    }
                    if(res.data.data.job_time == 0){
                      that.setData({
                        date:'1年以下',
                        job_time:0
                      })
                    }else if(res.data.data.job_time == 1){
                      that.setData({
                        date:'1-3年',
                        job_time:1
                      })
                    }else if(res.data.data.job_time == 2){
                      that.setData({
                        date:'3-5年',
                        job_time:2
                      })
                    }else{
                      that.setData({
                        date:'5年以上',
                        job_time:3
                      })
                    }
                  }else{
                    wx.showToast({
                      title: res.data.msg,
                      icon: 'none',
                      duration: 1000
                    })
                  }
                }
              })
            }
          })
        }
      })
    }else{
      wx.request({
        url:app.globalData.ajaxurl+'/sr/member_detail.html',
        method:'POST',
        header:{uuid:app.globalData.uuid},
        success:function(res){
          wx.hideLoading()
          if(res.data.status == 1){
            that.setData({
              userinfodata:res.data.data,
              region:res.data.data.address==null?'':res.data.data.address,
              province_id:res.data.data.province_id,
              city_id:res.data.data.city_id,
              zone_id:res.data.data.zone_id,
              name:res.data.data.nickname,
              phone:res.data.data.phone,
            })
            if(res.data.data.sex == 1){
              that.setData({
                sex:'男',
                sexid:1
              })
            }else if(res.data.data.sex == 2){
              that.setData({
                sex:'女',
                sexid:2
              })
            }else{
              that.setData({
                sex:'其他',
                sexid:3
              })
            }
            if(res.data.data.job_time == 0){
              that.setData({
                date:'1年以下',
                job_time:0
              })
            }else if(res.data.data.job_time == 1){
              that.setData({
                date:'1-3年',
                job_time:1
              })
            }else if(res.data.data.job_time == 2){
              that.setData({
                date:'3-5年',
                job_time:2
              })
            }else{
              that.setData({
                date:'5年以上',
                job_time:3
              })
            }
          }else{
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              duration: 1000
            })
          }
        }
      })
    }
    
  },
  selectsex(){
    var that = this;
    wx.showActionSheet({
      itemList: ['男', '女', '其他'],
      success: function(res) {
        if(res.tapIndex == 0){
          that.setData({
            sex:'男',
            sexid:1
          })
        }else if(res.tapIndex == 1){
          that.setData({
            sex:'女',
            sexid:2
          })
        }else{
          that.setData({
            sex:'其他',
            sexid:3
          })
        }
      },
      fail: function(res) {
        console.log(res.errMsg)
      }
    })
    
  },
  bindDateChange: function(e) {
    var that = this;
    wx.showActionSheet({
      itemList: ['1年以下', '1-3年', '3-5年','5年以上'],
      success: function(res) {
        if(res.tapIndex == 0){
          that.setData({
            date:'1年以下',
            job_time:0
          })
        }else if(res.tapIndex == 1){
          that.setData({
            date:'1-3年',
            job_time:1
          })
        }else if(res.tapIndex == 2){
          that.setData({
            date:'3-5年',
            job_time:2
          })
        }else{
          that.setData({
            date:'5年以上',
            job_time:3
          })
        }
      },
      fail: function(res) {
        console.log(res.errMsg)
      }
    })
  },
  bindRegionChange(e){
    var that = this;
    var provincial = e.detail.value[0].substring(0,e.detail.value[0].length-1);
    var city = e.detail.value[1].substring(0,e.detail.value[1].length-1);
    var qu = e.detail.value[2].substring(0,e.detail.value[2].length-1);
    console.log(e.detail.value)
    if(e.detail.value[0]==e.detail.value[1] || e.detail.value[1]=='县'){
      this.setData({
        region:e.detail.value[0]+e.detail.value[2]
      })
    }else{
      this.setData({
        region:e.detail.value.join('')
      })
    }
    wx.request({
      url:app.globalData.ajaxurl+'/common/area_city_lst.html',
      method:'POST',
      success:function(res){
        console.log(res.data)
        for(let i=0;i<res.data.length;i++){
          for(let x=0;x<res.data[i].provincial.length;x++){
            if(res.data[i].provincial[x].name == provincial){
              console.log(res.data[i].provincial[x].aid)
              that.setData({
                province_id:res.data[i].provincial[x].aid
              })
              for(let y=0;y<res.data[i].provincial[x].city.length;y++){
                if(res.data[i].provincial[x].city[y].name == city){
                  console.log(res.data[i].provincial[x].city[y].aid)
                  that.setData({
                    city_id:res.data[i].provincial[x].city[y].aid
                  })
                  wx.request({
                    url:app.globalData.ajaxurl+'/common/area_three.html',
                    data:{aid:res.data[i].provincial[x].city[y].aid},
                    method:'POST',
                    success:function(res){
                      for(let x=0;x<res.data.length;x++){
                        if(res.data[x].name == qu){
                          console.log(res.data[x].aid)
                          that.setData({
                            zone_id:res.data[x].aid
                          })
                        }
                      }
                    }
                  })
                }
              }
            }
          }
        }
      }
    })
  },
  bindname(e){
    this.setData({
      name: e.detail.value
    })
  },
  bindphone(e){
    this.setData({
      phone: e.detail.value
    })
  },
  bindjieshao(e){
    this.setData({
      jieshao: e.detail.value
    })
  },
  bindyan(e){
    this.setData({
      yan: e.detail.value
    })
  },
  getyan(e){
    var that = this;
    var mobile = this.data.phone;
    if(mobile == ""){
      wx.showToast({
        title: '请输入手机号码',
        icon: 'none',
        duration: 1000
      })
      return false;
    }
    var regExp = /^(13[0-9]|14[57]|15[012356789]|16[6]|17[0135678]|18[0-9]|19[89])[0-9]{8}$/;
    if(!regExp.test(mobile)){
      wx.showToast({
        title: '手机号码格式错误',
        icon: 'none',
        duration: 1000
      })
      return false;
    }
    wx.request({
      url:app.globalData.ajaxurl+'/sr/auth/sms.html',
      method:'POST',
      data:{type:2,phone:this.data.phone},
      header:{uuid:app.globalData.uuid},
      success:function(res){
        if(res.data.status == 1){
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 1000
          })
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
                yantext:'重新获取'
              })
            }
          },1000)
        }else{
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 1000
          })
        }
      }
    })
  },
  sendapply(){
    console.log(this.data.name,app.globalData.userstatus,this.data.sexid,this.data.job_time,this.data.province_id,this.data.city_id,this.data.zone_id,this.data.phone,this.data.jieshao)
    var that = this;
    if(this.data.name == ''){
      wx.showToast({
        title: '姓名必须填写',
        icon: 'none',
        duration: 1000
      })
      return false;
    }else if(this.data.sexid == ''){
      wx.showToast({
        title: '性别必须填写',
        icon: 'none',
        duration: 1000
      })
      return false;
    }else if(this.data.date == ''){
      wx.showToast({
        title: '从业时间必须填写',
        icon: 'none',
        duration: 1000
      })
      return false;
    }else if(this.data.region == ''){
      wx.showToast({
        title: '所在地区必须填写',
        icon: 'none',
        duration: 1000
      })
      return false;
    }else if(this.data.phone == ''){
      wx.showToast({
        title: '手机必须填写',
        icon: 'none',
        duration: 1000
      })
      return false;
    }else if(this.data.yan == ''){
      wx.showToast({
        title: '验证码必须填写',
        icon: 'none',
        duration: 1000
      })
      return false;
    }
    wx.showLoading()
    var data = {full_name:this.data.name,status:app.globalData.userstatus,sex:this.data.sexid,job_time:this.data.job_time,province_id:this.data.province_id,city_id:this.data.city_id,phone:this.data.phone,code:this.data.yan,zone_id:this.data.zone_id,introduce:this.data.jieshao,address:this.data.region}
    wx.request({
      url:app.globalData.ajaxurl+'/sr/member_update.html',
      method:'POST',
      header:{uuid:app.globalData.uuid},
      data:data,
      success:function(res){
        wx.hideLoading()
        if(res.data.status == 1){
          setTimeout(function(){
            wx.hideLoading()
            wx.navigateTo({
              url: "/login/review/review"
            })
          },1000)
        }else{
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 1000
          })
        }
      }
    })
  }
})