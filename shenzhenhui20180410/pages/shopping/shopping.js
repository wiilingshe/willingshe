var app = getApp()
Page({
  data: {
    // text:"这是一个页面"
    cartTitle: '购物车',
    minusStatuses: ['disabled', 'disabled', 'normal', 'normal', 'disabled'],
    selectedAllStatus: false,
    loadingHidden: false,
    total: '￥0.00',
    loading:false,
    carts: [
    ]
  },
  onLoad: function (options) {
    wx.showLoading()
    console.log('onload');
    var that = this;
    this.sum();
    // 页面初始化 options为页面跳转所带来的参数
    wx.getStorage({
      key: 'access_token',
      success: function(res) {
          console.log(res.data)
          wx.request({
            url:app.data.url+'/api/cart',
            method:'POST',
            data:{access_token:res.data},
            success:function(res){
              wx.hideLoading()
              if(res.data.code == 1){
                that.setData({
                  carts:res.data.data
                })
              }else{
                wx.showToast({
                  title: res.data.message,
                  icon: 'none',
                  duration: 2000
                })
              }
              that.setData({
                loading:true
              })
            }
          })
      } 
    })
  },
  onReady: function () {
    // 页面渲染完成
  },
  //减少物品
  bindMinus: function (e) {
    var that = this;
    console.log(e)
    var index = parseInt(e.currentTarget.dataset.index);
    var num = parseInt(this.data.carts[index].total);
    // 如果只有1件了，就不允许再减了
    if (num > 1) {
      num--;
    }
    console.log(num)
    // 只有大于一件的时候，才能normal状态，否则disable状态
    var minusStatus = num <= 1 ? 'disabled' : 'normal';
    // 购物车数据
    var carts = this.data.carts;
    carts[index].total = num;
    // 按钮可用状态
    var minusStatuses = this.data.minusStatuses;
    minusStatuses[index] = minusStatus;
    // 将数值与状态写回
    this.setData({
      carts: carts,
      minusStatuses: minusStatuses
    });
    wx.getStorage({
      key:'access_token',
      success:function(res){
        wx.request({
          url:app.data.url+'/api/cart/update',
          method:'POST',
          data:{access_token:res.data,id:e.currentTarget.dataset.id,count:num},
          success:function(res1){
            if(res.data.code == 1){
              wx.showToast({
                title:res1.data.message,
                icon:'success',
                duration:2000
              })
            }else{
              wx.showToast({
                title:res1.data.message,
                icon:'none',
                duration:2000
              })
            }
          }
        })
      }
    })
    this.sum();
  },
  //增加物品的数量
  bindPlus: function (e) {
    var index = parseInt(e.currentTarget.dataset.index);
    var num = parseInt(this.data.carts[index].total);
    // 自增
    num++;
    // 只有大于一件的时候，才能normal状态，否则disable状态
    var minusStatus = num <= 1 ? 'disabled' : 'normal';
    // 购物车数据
    var carts = this.data.carts;
    carts[index].total = num;
    // 按钮可用状态
    var minusStatuses = this.data.minusStatuses;
    minusStatuses[index] = minusStatus;
    // 将数值与状态写回
    this.setData({
      carts: carts,
      minusStatuses: minusStatuses
    });
    wx.getStorage({
      key:'access_token',
      success:function(res){
        wx.request({
          url:app.data.url+'/api/cart/update',
          method:'POST',
          data:{access_token:res.data,id:e.currentTarget.dataset.id,count:num},
          success:function(res1){
            if(res.data.code == 1){
              wx.showToast({
                title:res1.data.message,
                icon:'success',
                duration:2000
              })
            }else{
              wx.showToast({
                title:res1.data.message,
                icon:'none',
                duration:2000
              })
            }
          }
        })
      }
    })
    this.sum();
  },
  //显示购物的数量
  bindManual: function (e) {
    //input的change事件
    var index = parseInt(e.currentTarget.dataset.index);
    // 购物车数据
    var carts = this.data.carts;
    carts[index].num = e.detail.value;
    // 将数值与状态写回
    this.setData({
      carts: carts
    });
    this.sum();
  },
  //复选框选择绑定事件
  bindCheckbox: function (e) {
    /*绑定点击事件，将checkbox样式改变为选中与非选中*/
    //拿到下标值，以在carts作遍历指示用
    var index = parseInt(e.currentTarget.dataset.index);
    //原始的icon状态
    var selected = this.data.carts[index].selected;
    var carts = this.data.carts;
    // 对勾选状态取反
    carts[index].selected = !selected;
    var selectArr = [];
    // 遍历
    for (var i = 0; i < carts.length; i++) {
      if (carts[i].selected == true) {
        selectArr.push(carts[i].selected)
      }
    }
    if (e.currentTarget.dataset.type == 'success_circle') {
      this.setData({
        selectedAllStatus: false
      });
    }
    if (selectArr.length == carts.length) {
      this.setData({
        selectedAllStatus: true
      });
    }
    var carts = this.data.carts;
    // 写回经点击修改后的数组
    this.setData({
      carts: carts,
    });
    this.sum();
  },
  bindSelectAll: function () {
    // 环境中目前已选状态
    var selectedAllStatus = this.data.selectedAllStatus;
    // 取反操作
    selectedAllStatus = !selectedAllStatus;
    // 购物车数据，关键是处理selected值
    var carts = this.data.carts;
    if (carts.length > 0) {
      for (var i = 0; i < carts.length; i++) {
        carts[i].selected = selectedAllStatus;
      }
    } else {
      selectedAllStatus = false
    }
    // 遍历
    this.setData({
      selectedAllStatus: selectedAllStatus,
      carts: carts
    });
    this.sum();
  },
  bindCheckout: function () {
    // 初始化toastStr字符串
    var toastStr = 'cid:';
    // 遍历取出已勾选的cid
    for (var i = 0; i < this.data.carts.length; i++) {
      if (this.data.carts[i].selected) {
        toastStr += this.data.carts[i].cid;
        toastStr += ' ';
      }
    }
    //存回data
    this.setData({
      loadingHidden: true,
      toastStr: toastStr
    });
    this.sum();
  },
  loadingChange: function () {
    this.setData({
      loadingHidden: true
    });
  },
  sum: function () {
    var carts = this.data.carts;
    // 计算总金额
    var total = 0;
    for (var i = 0; i < carts.length; i++) {
      if (carts[i].selected) {
        total += parseInt(carts[i].total) * parseFloat(carts[i].price).toFixed(2);
      }
    }
    // 写回经点击修改后的数组
    this.setData({
      carts: carts,
      loadingHidden: true,
      total: '￥' + total
    });
  },
  del: function (e) {
    //删除购物车商品商品
    var carts = this.data.carts;
    var index = e.target.dataset.index;
    carts.splice(index, 1);
    this.sum();
    this.setData({
      carts: carts
    });
  },
  touchend: function (e) {
    console.log(e);
  },
  round: function (num, point) {
    point = point ? point : 2;
    if (isNaN(num)) {
      return null;
    }
    point = Math.pow(10, point + 1);
    num = num * point;
    if (num === +num) {
      return parseInt((num + 5) / 10) / point * 10;
    } else {
      return +num;
    }
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})