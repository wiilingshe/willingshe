// pages/returns/returns.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectedinfo:[],
    goods:[],
    addressinfo:[],
    selectaddress:false,
    addressList:[],
    youhuijuan:false,
    list:[],
    voucher_id:'',
    useing:'',
    keyongcoupon:[],
    jian:0,
    postage:0,
    type:'',
    spec_id:'',
    alldata:[],
    jieshi:'',
    address:'',
    id:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      id:options.id
    })
    wx.getStorage({
      key: 'access_token',
      success: function(res) {
        wx.request({
          url:app.data.url+'/api/address/list',
          method:'POST',
          data:{access_token:res.data},
          success:function(res){
            for(let i =0;i<res.data.data[0].list.length;i++){
              if(res.data.data[0].list[i].isdefault == 1){
                that.setData({
                  addressinfo:res.data.data[0].list[i]
                })
              }
            }
          }
        })
      } 
    })
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
    selectaddresslist(){
    var that = this;
    wx.showLoading()
    this.setData({
      selectaddress:true
    });
    wx.getStorage({
      key: 'access_token',
      success: function(res) {
        wx.request({
          url:app.data.url+'/api/address/list',
          method:'POST',
          data:{access_token:res.data},
          success:function(res1){
            wx.hideLoading()
            if(res1.data.code == 1){
              that.setData({
                addressList:res1.data.data[0].list
              })
            }else{
              wx.showToast({
                title: res1.data.message,
                icon:'none',
                duration: 2000
              });
            }
          }
        })
      }
    })
  },
    selectaddress(e){
    console.log(e)
    console.log(this.data.addressinfo)
    this.data.addressinfo.name = e.currentTarget.dataset.name;
    this.data.addressinfo.mobile = e.currentTarget.dataset.mobile;
    this.data.addressinfo.province = e.currentTarget.dataset.province;
    this.data.addressinfo.city = e.currentTarget.dataset.city;
    this.data.addressinfo.country = e.currentTarget.dataset.country;
    this.data.addressinfo.detail = e.currentTarget.dataset.detail;
    this.data.addressinfo.address_id = e.currentTarget.dataset.id;
    this.setData({
      addressinfo:this.data.addressinfo,
      selectaddress:false
    })
  },
  addaddress(){
    wx.navigateTo({
      url:'../address/address'
    })
  },
  addresslist1(){
    this.setData({
      selectaddress:false
    })
  },
  couponList(){
    var that = this;
    this.setData({
      youhuijuan : true
    })
  },
  close(){
    this.setData({
      youhuijuan : false
    })
  },
  getItem(e){
    console.log(e.currentTarget.dataset.jian)
    this.setData({
      voucher_id:e.currentTarget.dataset.id,
      youhuijuan : false,
      useing:e.currentTarget.dataset.name,
      jian:Number(e.currentTarget.dataset.jian)
    })
  },
  getaddress(e){
    this.setData({
      address:e.detail.value
    })
  },
  getjieshi(e){
    this.setData({
      jieshi:e.detail.value
    })
  },
  tijiao(){
    wx.showLoading()
    var that = this;
    console.log(this.data.address)
    wx.getStorage({
      key:'access_token',
      success:function(res1){
        wx.request({
          url:app.data.url+'/api/order/refund',
          method:'post',
          data:{access_token:res1.data,order_id:that.data.id,reason:that.data.address,des:that.data.jieshi,address_id:that.data.addressinfo.address_id},
          success:function(res){
            wx.hideLoading()
            if(res.data.code == 1){
              wx.showToast({
                title:'申请成功',
                icon:'none',
                duration:2000
              })
              setTimeout(function(){
                wx.navigateTo({
                  url:'../indent/indent'
                })
              },2000)
            }else{
               wx.showToast({
                title:res.data.message,
                icon:'none',
                duration:2000
              })
            }
          }
        })
      }
    })
  }
})