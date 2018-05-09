
//const sendRequest = app.sendRequest;
//const url = app.globalConfig.url;
//const sendRequest = app.sendRequest;
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    location: {},
    street: "",
    address: "",
    detail:"",//地址详情
    ifselect:false,
    array:[],
    array2:[],
    array3:[],
    region: ['广东省', '广州市', '海珠区'] ,
    province1:[{name:'广东省',code:'1'},{name:'广东省',code:'2'},{name:'广东省',code:'3'},{name:'广东省',code:'4'},{name:'广东省',code:'5'},{name:'广东省',code:'6'},{name:'广东省',code:'7'},{name:'广东省',code:'8'},{name:'广东省',code:'9'},{name:'广东省',code:'10'}],
    city1:[{name:'广州市','code':1},{name:'广州市','code':2},{name:'广州市','code':3},{name:'广州市','code':4},{name:'广州市','code':5},{name:'广州市','code':6},{name:'广州市','code':7},{name:'广州市','code':8}],
    county1:[{name:'天河区',code:1},{name:'天河区',code:2},{name:'天河区',code:3},{name:'天河区',code:4},{name:'天河区',code:5},{name:'天河区',code:6},{name:'天河区',code:7},{name:'天河区',code:8},{name:'天河区',code:9},{name:'天河区',code:10}],
    provincecode:'',
    citycode:'',
    areacode:'',
    province:'',
    city:'',
    area:'',
    inputTxt:'',
    default:0,
    name:'',
    phone:'',
    access_token:'',
    id:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log(options)
    if(options.id != undefined){
      this.setData({
        id:options.id
      })
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
    // const path = app.data.url + '/api/address/list'
    // const data = { access_token: app.accessToken() }
    // const that = this;
    // sendRequest(path, 'POST', data, {})
    //   .then(function (res) {
    //     console.log(res)
    //     var province = res.data.province
    //     var city = res.data.city
    //     var county = res.data.county
    //     that.setData({
    //       region: [province, city, county],
    //       address: res.data.address,
    //       street: res.data.street
    //     })
    //   }, function (error) {
    //     console.log(error);
    //   });

    // wx.getLocation({
    //   success: function (res) {
    //     console.log(res)
    //     that.setData({
    //       hasLocation: true,
    //       location: {
    //         latitude: res.latitude
    //       }
    //     })
    //   }
    // })
  },
  bindRegionChange: function (e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    // this.setData({
    //   region: e.detail.value
    // })
  },
  formSubmit: function (e) {
    // const that = this;
    // const path = url + '/api/system/address'
    // const data = { 
    // access_token: app.accessToken(), 
    // province: e.detail.value.region[0], 
    // city: e.detail.value.region[1],
    // county: e.detail.value.region[2], 
    // street: e.detail.value.street, 
    // address: e.detail.value.address
    // }

    // sendRequest(path, 'POST', data, {})
    //   .then(function (res) {
    //     console.log(res)

    //   }, function (error) {
    //     console.log(error);
    //   });
    // console.log(e);
    // wx.navigateTo({
    //   url: ""
    // })
  },
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
  getweizhi(){
    var that = this;
    this.setData({
      ifselect:true,
      array:that.data.province1
    })
    // wx.request({
    //   url:app.globalData.url+'/api/member/address_query',
    //   method:'POST',
    //   data:{access_token: app.accessToken(),type:0},
    //   success:function(res){
    //     console.log(res.data.data)
    //     that.setData({
    //       array:res.data.data
    //     })
    //   }
    // })
  },
  getshi(e){
    var that = this;
    console.log(e)
    this.setData({
      provincecode:e.currentTarget.id,
      province:e.currentTarget.dataset.name,
      array2:[],
      array3:[],
      city:'',
      area:'',
      array2:that.data.city1
    })
    // wx.request({
    //   url:app.globalData.url+'/api/member/address_query',
    //   method:'POST',
    //   data:{access_token: app.accessToken(),type:1,provincecode:e.currentTarget.id},
    //   success:function(res){
    //     console.log(res.data.data)
    //     that.setData({
    //       array2:res.data.data
    //     })
    //   }
    // })
  },
  getqu(e){
    console.log(e)
    var that = this;
    this.setData({
      city:e.currentTarget.dataset.name,
      citycode:e.currentTarget.id,
      array3:[],
      area:'',
      array3:that.data.county1
    })
    // wx.request({
    //   url:app.globalData.url+'/api/member/address_query',
    //   method:'POST',
    //   data:{access_token: app.accessToken(),type:2,provincecode:that.data.provincecode,citycode:e.currentTarget.id},
    //   success:function(res){
    //     console.log(res.data.data)
    //     that.setData({
    //       array3:res.data.data
    //     })
    //   }
    // })
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
  switch2Change(e){
    if(e.detail.value == false){
      this.setData({
        default:0
      })
    }else{
      this.setData({
        default:1
      })
    }
  },
  addAddress(){
    var that = this;
    console.log(that.data.default)
    if(that.data.name==''){
      wx.showToast({
        title: '姓名不能为空',
        icon: 'none',
        duration: 1000
      });
      return false;
    }else if(that.data.phone==''){
      wx.showToast({
        title: '号码不能为空',
        icon: 'none',
        duration: 1000
      });
      return false;
    }else if(that.data.inputTxt==''){
      wx.showToast({
        title: '地区不能为空',
        icon: 'none',
        duration: 1000
      });
      return false;
    }else if(that.data.address==''){
      wx.showToast({
        title: '地址不能为空',
        icon: 'none',
        duration: 1000
      });
      return false;
    }
    if(that.data.id == ''){
      wx.showLoading()
      // 添加地址
      wx.getStorage({
        key: 'access_token',
        success: function(res1) {
          console.log(res1.data)
          wx.request({
            url:app.globalData.url+'/api/address/edit',
            method:'POST',
            data:{access_token:res1.data,name:that.data.name,mobile:that.data.phone,province:that.data.province,city:that.data.city,county:that.data.area,address:that.data.address},
            success:function(res){
              wx.hideLoading()
              if(res.data.code == 1){
                wx.showToast({
                  title: '保存成功',
                  icon: 'none',
                  duration: 2000
                });
                setTimeout(function(){
                  wx.redirectTo({
                    url:'../addressList/addressList'
                  })
                },2000)
              }else{
                wx.showToast({
                  title: res.data.message,
                  duration: 1000
                });
              }
            }
          })
        } 
      })
    }else{
      // 编辑地址
      wx.showLoading()
      wx.getStorage({
        key: 'access_token',
        success:function(res1){
          wx.request({
            url:app.globalData.url+'/api/address/edit',
            method:'POST',
            data:{access_token:res1.data,name:that.data.name,mobile:that.data.phone,province:that.data.province,city:that.data.city,county:that.data.area,address:that.data.address,id:that.data.id},
            success:function(res){
              console.log(res.data);
                wx.hideLoading()
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
                            url:'../addressList/addressList'
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
                      url:'../addressList/addressList'
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
      })
    }
  }
})