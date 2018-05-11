// pages/addAddress/addAddress.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url:'http://gzldrj.com',
    array:[],
    array2:[],
    array3:[],
    provincecode:'',
    citycode:'',
    areacode:'',
    province:'',
    city:'',
    area:'',
    inputTxt:'',
    address:'',
    name:'',
    phone:'',
    ifselect:false,
    default:0,
    id:'',
    selectp:'',
    selectc:'',
    selecta:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var that = this;
    if(options.id != undefined){
      this.setData({
        id:options.id
      })
      // wx.request({
      //   url:app.globalData.url+'/api/member/address_edit',
      //   method:'POST',
      //   data:{access_token:app.accessToken(),id:options.id,name:options.name,mobile:options.phone,province:options.province,city:options.city,country:options.country,detail:options.detail},
      //   success:function(res){
      //     console.log(res.data)
      //     if(res.data.code == -1){
      //        wx.showToast({
      //         title: res.data.message,
      //         duration: 1000
      //       });
      //     }else{

      //     }
      //   }
      // })
      this.setData({
        name:options.name,
        phone:options.phone,
        province:options.province,
        city:options.city,
        area:options.country,
        address:options.detail,
        inputTxt:options.province+options.city+options.country
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
  getname(e){
    this.setData({
      name:e.detail.value
    })
  },
  getphone(e){
    this.setData({
      phone:e.detail.value
    })
  },
  getaddress(e){
    this.setData({
      address:e.detail.value
    })
  },
  checkboxChange(e){
    if(e.detail.value.length>0){
      this.setData({
        default:1
      })
    }else{
      this.setData({
        default:0
      })
    }
  },
  getweizhi(){
    this.setData({
      ifselect:true
    })
    var that = this;
    wx.request({
      url:app.globalData.url+'/api/member/address_query',
      method:'POST',
      data:{access_token: app.accessToken(),type:0},
      success:function(res){
        console.log(res.data.data)
        that.setData({
          array:res.data.data
        })
      }
    })
  },
  getshi(e){
    console.log(e)
    this.setData({
      provincecode:e.currentTarget.id,
      province:e.currentTarget.dataset.name,
      array2:[],
      array3:[],
      city:'',
      area:'',
    })
    var that = this;
    wx.request({
      url:app.globalData.url+'/api/member/address_query',
      method:'POST',
      data:{access_token: app.accessToken(),type:1,provincecode:e.currentTarget.id},
      success:function(res){
        console.log(res.data.data)
        that.setData({
          array2:res.data.data
        })
      }
    })
  },
  getqu(e){
    console.log(e)
    this.setData({
      city:e.currentTarget.dataset.name,
      citycode:e.currentTarget.id,
      array3:[],
      area:'',
    })
    var that = this;
    wx.request({
      url:app.globalData.url+'/api/member/address_query',
      method:'POST',
      data:{access_token: app.accessToken(),type:2,provincecode:that.data.provincecode,citycode:e.currentTarget.id},
      success:function(res){
        console.log(res.data.data)
        that.setData({
          array3:res.data.data
        })
      }
    })
  },
  comfirm(e){
    this.setData({
      area:e.currentTarget.dataset.name,
      areacode:e.currentTarget.id
    })
    console.log(this.data)
  },
  queding(){
    this.setData({
      ifselect:false
    })
    this.setData({
      inputTxt:this.data.province+this.data.city+this.data.area,
    })
  },
  addAddress(){
    var that = this;
    console.log(that.data.default)
    if(that.data.name==''){
      wx.showToast({
        title: '姓名不能为空',
        duration: 1000
      });
      return false;
    }else if(that.data.phone==''){
      wx.showToast({
        title: '号码不能为空',
        image: 'loading',
        duration: 1000
      });
      return false;
    }else if(that.data.inputTxt==''){
      wx.showToast({
        title: '地区不能为空',
        icon: 'loading',
        duration: 1000
      });
      return false;
    }else if(that.data.address==''){
      wx.showToast({
        title: '地址不能为空',
        duration: 1000
      });
      return false;
    }
    if(that.data.id == ''){
      wx.request({
        url:app.globalData.url+'/api/member/address_edit',
        method:'POST',
        data:{access_token:app.accessToken(),name:that.data.name,mobile:that.data.phone,province:that.data.province,city:that.data.city,county:that.data.area,address:that.data.address},
        success:function(res){
          if(res.data.code == 1){
            wx.showToast({
              title: '保存成功',
              duration: 1000
            });
            setTimeout(function(){
              wx.redirectTo({
                url:'../addressLists/addressLists'
              })
            },1000)
          }else{
            wx.showToast({
              title: res.data.message,
              duration: 1000
            });
          }
        }
      })
    }else{
      wx.request({
        url:app.globalData.url+'/api/member/address_edit',
        method:'POST',
        data:{access_token:app.accessToken(),name:that.data.name,mobile:that.data.phone,province:that.data.province,city:that.data.city,county:that.data.area,address:that.data.address,id:that.data.id},
        success:function(res){
          console.log(res.data);
          if(res.data.code == 1){
            if(that.data.default == 1){
              wx.request({
                url:app.globalData.url+'/api/member/address_setdefault',
                method:'POST',
                data:{access_token:app.accessToken(),id:that.data.id},
                success:function(res){
                  if(res.data.code == 1){
                    wx.showToast({
                      title: '保存成功',
                      duration: 1000
                    });
                    setTimeout(function(){
                      wx.redirectTo({
                        url:'../addressLists/addressLists'
                      })
                    },1000)
                  }else{
                    wx.showToast({
                      title: res.data.message,
                      duration: 1000
                    });
                  }
                }
              })
            }else{
              wx.showToast({
                      title: '保存成功',
                      duration: 1000
                    });
                    setTimeout(function(){
                      wx.redirectTo({
                        url:'../addressLists/addressLists'
                      })
                    },1000)
            }
          }else{
            wx.showToast({
              title: res.data.message,
              duration: 1000
            });
          }
        }
      })
    }
  }
})