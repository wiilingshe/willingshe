// user/userInfo/userInfo.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    haveData:false,
    avatar:app.globalData.globalurl+'/img/public/noavatar.png',
    moreIcon:app.globalData.globalurl+'/img/personalCenter/more.png',
    nickname:'',
    full_name:'',
    sex:'',
    sexCode:'',
    date:'',
    jobTime:'',
    jobTimeCode:'',
    sexList:['男','女','其他'],
    jobTimeList:['1年以下', '1-3年', '3-5年','5年以上'],
    region:'',
    introduce:'',
    phone:'',
    province_id:'',
    city_id:'',
    zone_id:'',
    haveOptions:false,
    areaArray:{},
    subData:[],
    changeRegion:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({mask:true,icon:"loading",title:'加载中'});
    //渲染我的信息数据
    var that = this;
    wx.request({  //获取我的信息数据
      url:app.globalData.ajaxurl+'/sr/member_detail.html',
      data:'',
      header:{uuid:app.globalData.uuid},
      method:'GET',
      success:res=>{
        wx.hideLoading();
        that.setData({haveData:true});
        if(res.data.status==1){
          that.setData({
            avatar:res.data.data.face,
            nickname:res.data.data.nickname,
            full_name:res.data.data.full_name,
            sex:that.data.sexList[res.data.data.sex-1],
            phone:res.data.data.phone,
            date:res.data.data.birthday,
            jobTime:that.data.jobTimeList[res.data.data.job_time],
            jobTimeCode:res.data.data.job_time,
            region:res.data.data.address,
            introduce:res.data.data.introduce,
            sexCode:res.data.data.sex,
            province_id:res.data.data.province_id,
            city_id:res.data.data.city_id,
            zone_id:res.data.data.zone_id
          });
        }
      }
    });
    wx.hideShareMenu();
  },
  selectsex(){
    var that = this;
    wx.showActionSheet({
      itemList: ['男', '女', '其他'],
      success: function(res) {
        if(res.tapIndex == 0){
          that.setData({
            sex:'男',
            sexCode:1
          })
        }else if(res.tapIndex == 1){
          that.setData({
            sex:'女',
            sexCode:2
          })
        }else{
          that.setData({
            sex:'其他',
            sexCode:3
          })
        }
      },
      fail: function(res) {
        console.log(res.errMsg)
      }
    })
  },
  selectJobTime(){
    var that = this;
    wx.showActionSheet({
      itemList: ['1年以下', '1-3年', '3-5年','5年以上'],
      success: function(res) {
        if(res.tapIndex == 0){
          that.setData({
            jobTime:'1年以下',
            jobTimeCode:0
          })
        }else if(res.tapIndex == 1){
          that.setData({
            jobTime:'1-3年',
            jobTimeCode:1
          })
        }else if(res.tapIndex == 2){
          that.setData({
            jobTime:'3-5年',
            jobTimeCode:2
          })
        }else if(res.tapIndex == 3){
          that.setData({
            jobTime:'5年以上',
            jobTimeCode:3
          })
        }
      },
      fail: function(res) {
        console.log(res.errMsg)
      }
    })
  },
  bindDateChange(e) {
    this.setData({
      date: e.detail.value
    })
  },
  bindFullName(e){
    this.setData({
      full_name:e.detail.value
    })
  },
  bindIntroduce(e){
    this.setData({
      introduce:e.detail.value
    })
  },
  bindRegionChange(e){
    var that = this;
    var provincial = e.detail.value[0].substring(0,e.detail.value[0].length-1);
    var city = e.detail.value[1].substring(0,e.detail.value[1].length-1);
    var qu = e.detail.value[2].substring(0,e.detail.value[2].length-1);
    if(e.detail.value[0] == e.detail.value[1] || e.detail.value[1] == "县"){
      this.setData({
        region:e.detail.value[0]+e.detail.value[2]
      });
    }else{
      this.setData({
        region:e.detail.value.join('')
      });
    };
    wx.request({
      url:app.globalData.ajaxurl+'/common/area_city_lst.html',
      method:'POST',
      success:function(res){
        /*console.log(res.data)*/
        for(let i=0;i<res.data.length;i++){
          for(let x=0;x<res.data[i].provincial.length;x++){
            if(res.data[i].provincial[x].name == provincial){
              /*console.log(res.data[i].provincial[x].aid)*/
              that.setData({
                province_id:res.data[i].provincial[x].aid
              })
              for(let y=0;y<res.data[i].provincial[x].city.length;y++){
                if(res.data[i].provincial[x].city[y].name == city){
                  /*console.log(res.data[i].provincial[x].city[y].aid)*/
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
                          /*console.log(res.data[x].aid)*/
                          that.setData({
                            zone_id:res.data[x].aid
                          })
                        }
                      };
                      that.setData({
                        areaArray: {province_id:that.data.province_id,city_id:that.data.city_id,zone_id:that.data.zone_id},
                        changeRegion:true
                      });
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
  goBindPhone(e){
    var that = this;
    var type = '',mobile='';
    if(that.data.phone==null || that.data.phone==''){
      type = 1;
      mobile = that.data.phone;
    }else {
      type = 2;
      mobile = that.data.phone;
    }
    wx.navigateTo({
      url:'/user/bindPhone/bindPhone?phone='+mobile+'&type='+type
    })
  },
  subReview(e){
    var that = this;
    /*console.log(that.data.full_name,that.data.sexCode,that.data.jobTimeCode,that.data.phone,that.data.introduce,that.data.region,that.data.date);*/
    if(this.data.full_name == '' || this.data.full_name == null){
      wx.showToast({
        title:'请填写姓名',
        icon:"none",
        duration: 1500
      });
      return false;
    }else if(this.data.sexCode == '' || this.data.sexCode == null){
      wx.showToast({
        title:'请选择性别',
        icon:"none",
        duration: 1500
      });
      return false;
    }else if(this.data.date =='' || this.data.date ==null){
      wx.showToast({
        title:'请选择生日日期',
        icon:"none",
        duration: 1500
      });
      return false;
    }else if(this.data.phone =='' || this.data.phone ==null){
      wx.showToast({
        title:'请绑定手机',
        icon:"none",
        duration: 1500
      });
      return false;
    }else if(this.data.jobTime =='' || this.data.jobTime ==null){
      wx.showToast({
        title:'请选择从业时间',
        icon:"none",
        duration: 1500
      });
      return false;
    }else if(this.data.region =='' || this.data.region ==null){
      wx.showToast({
        title:'请选择所在地区',
        icon:"none",
        duration: 1500
      });
      return false;
    }
    var subData = {
      full_name:that.data.full_name,
      sex:that.data.sexCode,
      job_time:that.data.jobTimeCode,
      phone:that.data.phone,
      introduce:that.data.introduce,
      address:that.data.region,
      birthday:that.data.date
    };
    var areaArray2 = {
      province_id:that.data.province_id,city_id:that.data.city_id,zone_id:that.data.zone_id
    };
    var postData ={};
    if(that.data.changeRegion){ //选择所在地区后的数据
      postData = Object.assign(postData,subData,that.data.areaArray);
    }else{ //未选择
      postData = Object.assign(postData,subData,areaArray2);
    };
    wx.setNavigationBarTitle({
      title: '加载中...'
    });
    wx.showNavigationBarLoading();
    wx.request({
      url:app.globalData.ajaxurl+'/sr/member_edit.html',
      data:postData,
      header:{uuid:app.globalData.uuid},
      method:'POST',
      success:res=>{
        wx.hideNavigationBarLoading();
        wx.setNavigationBarTitle({
          title: '我的信息'
        })
        if(res.data.status==1){
          wx.showToast({
            title:res.data.msg,
            icon:"success",
            duration: 1500
          });
          setTimeout(function(){
            wx.switchTab({
              url: '/pages/personalCenter/personalCenter'
            })
          },1500);
        }else{
          wx.showToast({
            title:res.data.msg,
            icon:"none",
            duration: 1500
          });
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (options) {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    try { //获取缓存
      var value = wx.getStorageSync('bindMobile');
      if (value) {
          // Do something with return value
        that.setData({
          phone:value
        });
      }
    } catch (e) {
      // Do something when catch error
      console.log(e);
    }
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
    try { //删除缓存
      wx.removeStorageSync('bindMobile');
    } catch (e) {
      // Do something when catch error
      console.log(e);
    };
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
