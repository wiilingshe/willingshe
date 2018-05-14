// pages/index/index.js
var app=getApp()
var url = app.globalData.url
var userInfo = app.globalData.userInfo
var code = app.globalData.code
var memid = 0
var keyt = app.globalData.keyt
var request = require('../../utils/request.js')
var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
var page=1
var limit=10
var more=true
Page({

  /**
   * 页面的初始数据
   */
  data: {
    memid:0,
    hasUserInfo:false,
    index:0,
    imgUrls: [],
    category: [],
    lat:'',//经度
    lng:'',//纬度
    store:[],
    location:'努力加载中...',//位置信息
    userInfo:{},
    code:0,
    newStore:{},
    newDish:{}
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.chooseLocation({
    //   success:function(res){
    //     console.log(res)
    //   }
    // })
    var that=this  
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
   
    var path = url +'api/index/banner'
    request.sendRrquest(path, 'GET', {}, {})
      .then(function (imgUrls) {
        that.setData({
          imgUrls: imgUrls.data.data
        });
       // console.log(imgUrls);
      }, function (error) {
        console.log(error);
      });
    var path1 = url + 'api/index/category'
    request.sendRrquest(path1, 'GET', {}, {})
      .then(function (response) {
       // console.log(response.data.data)
        var category = response.data.data     
        // console.log(response.data)
        that.setData({
          category: category,
         
        });
        //console.log(response);
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
    var that = this
    var path2 = url + 'api/index/home'
    var path3 = url + 'api/index/recommend'
    var data ={}
    var data2 = {}
    // wx.removeStorageSync('location')
    // wx.removeStorageSync('gps')
    var value = wx.getStorageSync('gps')
    var value2 = wx.getStorageSync('location')
    console.log("==========="+value2)
    if (value) {
      // 如果本地缓存中有对应的位置信息则将其保存，否则调用获取地理位置api
      data = { lat: value.lat, lng: value.lng, page: 1, limit: 10} 
      data2 = { lat: value.lat, lng: value.lng }
      // 将数据更新
      that.setData({
        lat: value.lat,
        lng: value.lng,
        location: value2
      })    
    } 
    // that.setData({
    //   location:'11111111'
    // })
    // wx.getLocation({
    //   type: 'gcj02',
    //   success: function (res) {
    //     console.log(res)
    //     data = { lat: res.latitude, lng: res.longitude, page: 1 ,limit:10}   
    //     data2 = { lat: res.latitude, lng: res.longitude} 
    //     // 发送请求获取首页中的推荐商家的数据更新至视图
    //     request.sendRrquest(path2, 'GET', data, {}).then(function (items) {
    //      // console.log(items.data)
    //      console.log(items); 
    //       that.setData({
    //         store: items.data.data[0].list,
    //       });
    //     }, function (error) {
    //       console.log(error);
    //     }); 
    //     // 获取推荐菜品图片数据(推荐商家上面的菜品图片)
    //     request.sendRrquest(path3, 'GET', data2, {}).then(function (items) {
    //       // console.log(items.data)
    //       that.setData({
    //         newStore: items.data.data[0],
    //         newDish: items.data.data[1]
    //       });
    //       //console.log(items.data.data[0].seller)
    //     }, function (error) {
    //         console.log(error);
    //     }); 
    //     that.setData({
    //       lat: res.latitude,
    //       lng: res.longitude
    //     })
    //     // 将当前地理位置信息保存在本地缓存中
    //     wx.setStorage({ key: "gps", data: { lat: res.latitude, lng: res.longitude } })
    //     var qqmapsdk  = new QQMapWX({
    //       key: keyt // 必填
    //     });

    //     // 调用接口
    //     qqmapsdk.reverseGeocoder({
    //       location: {
    //         latitude: that.data.lat,
    //         longitude: that.data.lng
    //       },
    //       success: function (res1) {
    //         // console.log(res.result);
    //         var ad_info = res1.result.address
    //         that.setData({
    //           // location: ad_info
    //         })
    //         wx.setStorage({
    //           key: 'location',
    //           data: ad_info,
    //         })
    //       },
    //       fail: function (res2) {
    //       },
    //       complete: function (res3) {

    //       }
    //     })
    //   }
    // })

    // 从本地缓存中同步获取指定 key 对应的内容。
    try{
      var value = wx.getStorageSync('gps')
      console.log(value)
      var value2 = wx.getStorageSync('location')
      console.log("==========="+value2)
      if (value) {
        // 如果本地缓存中有对应的位置信息则将其保存，否则调用获取地理位置api
        data = { lat: value.lat, lng: value.lng, page: 1, limit: 10} 
        data2 = { lat: value.lat, lng: value.lng }
        // 将数据更新
        that.setData({
          lat: value.lat,
          lng: value.lng,
          location: value2
        })    
      } else {
        console.log(1111111)
        // 获取当前的地理位置
        wx.getLocation({
          type: 'gcj02',
          success: function (res) {
           console.log(res)
            data = { lat: res.latitude, lng: res.longitude, page: 1 ,limit:10}   
            data2 = { lat: res.latitude, lng: res.longitude}  
            that.setData({
              lat: res.latitude,
              lng: res.longitude
            })
            // 将当前地理位置信息保存在本地缓存中
            wx.setStorage({ key: "gps", data: { lat: res.latitude, lng: res.longitude } })
            var demo = new QQMapWX({
              key: keyt // 必填
            });

            // 调用接口
            demo.reverseGeocoder({
              location: {
                latitude: that.data.lat,
                longitude: that.data.lng
              },
              success: function (res) {
                // console.log(res.result);
                var ad_info = res.result.address
                that.setData({
                  location: ad_info
                })
                wx.setStorage({
                  key: 'location',
                  data: ad_info,
                })
              },
              fail: function (res) {
                console.log(res,111111111);
              },
              complete: function (res) {

              }
            })
          }
        })
      };
      // 发送请求获取首页中的推荐商家的数据更新至视图
      request.sendRrquest(path2, 'GET', data, {})
        .then(function (items) {
         // console.log(items.data)
         console.log(items); 
          that.setData({
            store: items.data.data[0].list,
          });
         // console.log(items.data.data[0].list)
        }, function (error) {
          console.log(error);
        }); 
      // 获取推荐菜品图片数据(推荐商家上面的菜品图片)
      request.sendRrquest(path3, 'GET', data2, {})
        .then(function (items) {
          // console.log(items.data)
          that.setData({
            newStore: items.data.data[0],
            newDish: items.data.data[1]
          });
          //console.log(items.data.data[0].seller)
        }, function (error) {
          console.log(error);
        }); 
    } catch (e) {
      console.log(e);
    }
    /*
    try {
      var value = wx.getStorageSync('location')
      if (value) {
        that.setData({
          location: value
        })
      }else{
        var demo = new QQMapWX({
          key: keyt // 必填
        });

        // 调用接口
        demo.reverseGeocoder({
          location: {
            latitude: that.data.lat,
            longitude: that.data.lng
          },
          success: function (res) {
            console.log(res.result);
            var ad_info = res.result.address
            that.setData({
              location: ad_info
            })
            wx.setStorage({
              key: 'location',
              data: ad_info,
            })
          },
          fail: function (res) {
            console.log(res);
          },
          complete: function (res) {

          }
        })
      }
    } catch (e) { }
   */
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
    // console.log(1111111111111);
    var that=this
   more=true
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        console.log(res);
        that.setData({
          lat: res.latitude,
          lng: res.longitude
        })
        wx.setStorage({ key: "gps", data: { lat: res.latitude, lng: res.longitude } })
        var path2 = url + 'api/index/home'
        var data = { lat: res.latitude, lng: res.longitude, page: 1 ,limit:10,}
        //console.log(that.data.lat, that.data.lng)
        request.sendRrquest(path2, 'GET', data, {})
          .then(function (items) {
            //  console.log(items.data)
            wx.stopPullDownRefresh()
            that.setData({
              store: items.data.data[0].seller,
            });
            //console.log(items.data.data[0].seller)
          }, function (error) {
            console.log(error);
          });
        // 引入SDK核心类
        var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');

        // 实例化API核心类
        var demo = new QQMapWX({
          key: keyt // 必填
        });

        // 调用接口
        demo.reverseGeocoder({
          location: {
            latitude: that.data.lat,
            longitude: that.data.lng
          },
          success: function (res) {
            // console.log(res.result.address_component.district);
            var ad_info = res.result.address
            that.setData({
              location: ad_info
            })

          },
          fail: function (res) {
            console.log(res);
          },
          complete: function (res) {

          }
        })
      }
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log(11111);
    var that = this
    if(more==true){
      page++;
    //console.log(p)
      var path = url + 'api/index/home'
    var data = { lat: that.data.lat, lng: that.data.lng, page: page,limit:10,}
    //console.log(data)
    request.sendRrquest(path, 'GET', data, {})
      .then(function (items) {
        //console.log(items.data.data)
        var len = items.data.data.length
        if(len>0){
          that.data.store.push(items.data.data[0].seller)
          that.setData({
            store: that.data.store,
          });  
        }else{
          more=false
        }
        
      }, function (error) {
        console.log(error);
      });
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
 navList:function(e){
  // console.log(e.currentTarget.dataset)
   var id = e.currentTarget.dataset.id
   var name = e.currentTarget.dataset.name
   wx.setStorage({ key: "listId", data: { id:id,name:name} })
   wx.switchTab({
     url: '../list/list',
   })
 },
 scan:function(e){
   var that = this
  
     wx.scanCode({
       onlyFromCamera: true,
       success: (res) => {
        var start = res.result.indexOf('?');
        var end = res.result.length;
        var canshu = res.result.substr(start,end)
        function getUrlParms(name){
         var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
         var r = canshu.substr(1).match(reg);
         if(r!=null)
         return unescape(r[2]);
         return null;
        }
        wx.navigateTo({
           url: '../menu/menu?id='+getUrlParms('id')
         })
         // wx.showLoading({ title: '加载中', })
         // setTimeout(function () { wx.hideLoading() }, 1500)
         // var result = res.result
         // result = result.split('?')
         // var a = result[1]
         // console.log(a)
         // a = a.split('&')
         // a = a[0].split('=')
         // var table_id = a[1]
         // var path = url + 'api/order/scan'
         // var data = { table_id: table_id, memid: memid }
         //console.log(data)
         // request.sendRrquest(path, 'GET', data, {})
         //   .then(function (items) {
         //     console.log(items.data);
         //     if (items.data.code == 1) {
         //       if (items.data.data.length == 0) {
         //         console.log(2);
         //         wx.navigateTo({
         //           url: '../menu/menu?' + result[1] + '&way=1'
         //         })
         //       } else {
         //         console.log(3);
         //         wx.navigateTo({
         //           url: '../order_detail/order_detail?order_id=' + items.data.data[0].order_id
         //         })
         //       }
         //     } else {
         //       wx.showModal({
         //         content: items.data.message+'，请下拉刷新页面后重新扫码',
         //         showCancel: false,
         //         confirmColor: '#fe7c00',
         //         success: function (res) {
         //           if (res.confirm) {
         //           }
         //         }
         //       })
         //     }
         //   }, function (error) {
         //     console.log(error);
         //   });

       }
     })
    
   
   
  },
  selectLocation: function () {
    var that = this;
    wx.chooseLocation({
      success(res) {
        console.log(res);
        that.setData({
          location:res.address
        });
        console.log(res.latitude,res.longitude)
        wx.setStorage({ key: "gps", data: { lat: res.latitude, lng: res.longitude } })
        wx.setStorage({
          key: 'location',
          data: res.address,
        })
        console.log(res.address)
        var data = { lat: res.latitude, lng: res.longitude, page: 1 ,limit:10}
        // 发送请求获取首页中的推荐商家的数据更新至视图
        request.sendRrquest(url + 'api/index/home', 'GET', data, {}).then(function (items) {
         // console.log(items.data)
         console.log(items); 
          that.setData({
            store: items.data.data[0].list,
          });
        }, function (error) {
          console.log(error);
        }); 
      }
    });
  }
 
})