var app = getApp()
var WxParse = require('../wxParse/wxParse.js');
Page({
  data: {
    showDialog: false,
    showCenterDialog: false,
    detailList: [],
    detailList2:[],
    selectid:'',
    selected:[],
    zhuheid:'',
    selectBox:false,
    selectedinfo:[],
    goods:[],
    num:1,
  },
  onLoad: function (options) {
    let that = this;
    that.getGoodsDetail(options.id);
  },
  getGoodsDetail: function (id) {
    console.log('cc:'+id);
    var that = this
    var path = app.data.url + '/api/goods/detail'
    wx.request({
      url: path,
      data: {
        id:id,
      },
      success: (res) => {
        if(res.data.code == 1){
          that.setData({
            detailList: res.data.data[0],
          });
          WxParse.wxParse('content', 'html', res.data.data[0].content, that, 5)
        }else{
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
    wx.request({
      url:app.data.url + '/api/goods/spec',
      method:'GET',
      data:{id:id},
      success:function(res){
        console.log(res.data.data[0])
        that.setData({
          detailList2:res.data.data[0]
        })
      }
    })
  },
  add(){
    var num = Number(this.data.num) +Number(1);
    this.setData({
      num:num
    })
  },
  remove(){
    if(this.data.num > 1){
      var num = Number(this.data.num) - Number(1);
      this.setData({
        num:num
      })
    }else{
      // wx.showToast({
      //   title: '',
      //   duration: 2000
      // });
    }
  },
  onShow: function () {

  },
  onClickButton: function (e) {
    let that = this;
    // wx.removeStorage({
    //   key: 'access_token',
    //   success: function(res) {
    //     console.log(res.data)
    //   } 
    // })
    wx.getStorage({
      key:'access_token',
      success:function(res1){
        console.log(res1.data)
        if(that.data.zhuheid == ''){
          wx.showToast({
            title: '请选择规格',
            duration: 2000
          });
          return false;
        }else{
          wx.request({
            url:app.data.url + '/api/cart/add',
            method:'POST',
            data:{access_token:res1.data,id:that.data.detailList.id,total:that.data.num,specid:that.data.zhuheid},
            success:function(res){
              if(res.data.code == 1){
                wx.showToast({
                  title: '添加成功',
                  duration: 2000
                });
              }
            }
          })
        }
      },
      fail(res){
        wx.navigateTo({
          url:'../login/login'
        })
      }
    })
    // if(app.globalData.ifzhuce == 0){
    //   wx.navigateTo({
    //     url:'../login/login'
    //   })
    // }else{
    //   if(this.data.zhuheid == ''){
    //     wx.showToast({
    //       title: '请选择规格',
    //       duration: 2000
    //     });
    //     return false;
    //   }else{
    //     wx.getStorage({
    //     key: 'access_token',
    //     success: function(res) {
    //         wx.request({
    //           url:app.data.url + '/api/cart/add',
    //           method:'POST',
    //           data:{access_token:res.data,id:that.data.detailList.id,total:that.data.num,specid:that.data.zhuheid},
    //           success:function(res){
    //             if(res.data.code == 1){
    //               wx.showToast({
    //                 title: '添加成功',
    //                 duration: 2000
    //               });
    //             }
    //           }
    //         })
    //       } 
    //     })
    //   }
    // }


    // switch (e.currentTarget.dataset.index) {
    //   case '0':
    //     that.setData({
    //       showDialog: !this.data.showDialog
    //     });
    //     break;
    //   case '1':
    //     that.setData({
    //       showCenterDialog: !this.data.showCenterDialog
    //     });
    //     break;
    // }
  },
  select(){
    this.setData({
      selectBox:true
    })
  },
  radioChange: function(e) {
    console.log(e);
    var index = e.currentTarget.dataset.id;
    var id = e.detail.value;
    var that = this
    this.data.selected[index] = id;
  },
  queding(){
    var that = this;
    var list = '';
    for(let key in this.data.selected){
      if(list == ''){
        list = this.data.selected[key]
      }else{
        list = list + ','+this.data.selected[key]
      }
    }
    for(let i=0;i<this.data.detailList2.groups.length;i++){
      if(this.data.detailList2.groups[i].specs == list){
        that.setData({
          zhuheid:that.data.detailList2.groups[i].id,
          selectedinfo:that.data.detailList2.groups[i]
        })
        // console.log(that.data.detailList2.goods)
        that.data.detailList2.groups[i].name = that.data.detailList2.goods.name;
        that.data.detailList2.groups[i].goodsNum = that.data.num;
        that.data.detailList2.groups[i].image = that.data.detailList.image;
        console.log(that.data.detailList2.groups[i])
        wx.setStorage({
          key:"selectedinfo",
          data:that.data.detailList2.groups[i]
        })
        wx.setStorage({
          key:"goods",
          data:that.data.detailList2.goods
        })
      }
    }
    this.setData({
      selectBox:false
    })
    console.log(that.data.zhuheid)
  },
  oilConfirm: function () {
    this.setData({
      maskFlag: true,
      oilchooseFlag: false
    })
  },
  onClickdiaCenterView: function () {
    this.setData({
      showCenterDialog: !this.data.showCenterDialog
    });
  },
  buy:function(){
    var that = this;
    if(this.data.zhuheid == ''){
      wx.showToast({
        title: '请选择规格',
        duration: 2000
      });
      return false;
    }
    if(app.globalData.ifzhuce == 0){
      wx.navigateTo({
        url:'../login/login'
      })
    }else{
      wx.getStorage({
        key: 'access_token',
        success: function(res) {
            console.log(res.data)
            wx.navigateTo({
              url:'../orderform/orderform?type=1&spec_id='+that.data.selectedinfo.id+'&count='+that.data.num
            })
        } 
      })
    }
  },
  close1(){
    this.setData({
      selectBox:false
    })
  },
  gouwuche(){
    wx.switchTab({
      url:'../shopping/shopping'
    })
  }
})