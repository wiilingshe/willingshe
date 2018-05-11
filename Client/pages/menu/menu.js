// pages/menu/menu.js
var app = getApp()
var url = app.globalData.url
var memid=0
var request = require('../../utils/request.js')
var page=1
var seconds=86400
function toDecimal(x) {
  var f = parseFloat(x);
  if (isNaN(f)) {
    return;
  }
  f = Math.round(x * 100) / 100;
  return f;
}   
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:1,
    scroll1:true,
    scroll2: false,
    shop:{},
    n_index:0,
    shop_id: '',
    cindex:0,
    iscollect:0,
    category:[],
    comment_num:0,
    into_view:0,
    good_show:false,
    spec_show: false,
    num:0,
    on_index:null,
    on_num:null,
    good:{},
    option_index:0,
    option_id:null,
    param_name:[],
    param_num: 0,
    good_price:0,
    number:0,
    total:0,
    cart_show:false,
    cart: [],
    cart_index:0,
    on_choose:0,
    orderRefer:[],
    goodsNum:[],
    goods_id:'',
    order_id:'',  
    table_id:'',
    discount:[],
    jian:0,
    tannum:0,
    ifyou1:0,
    iffu:true,
    ifclick:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var that = this
    if (options.q == undefined){      
      var path = url + 'api/shop/detail'  
      var data = { id: options.id, access_token: app.accessToken() }
      that.setData({
        shop_id: options.id,        
      })
      request.sendRrquest(path, 'POST', data, {})
        .then(function (res) {
         if(res.data.code){
          console.log(res.data.data[0].shop.discount)
           that.setData({
             shop: res.data.data[0].shop,
             category: res.data.data[0].category,
             iscollect: res.data.data[0].iscollect,
             comment_num: res.data.data[0].comment_num,
             discount:res.data.data[0].shop.discount
           })
           console.log(res.data.data[0])
           if (res.data.data[0].shop.issend==1){
             that.setData({

             })
           }
         }
         if (res.data.code == -1) {
           wx.showModal({
             content: res.data.message,
           })
           if (res.data.errorCode) { app.refreshToken(); }
         }
         
        }, function (error) {
          console.log(error);
        });   
    }else{ 
      var http = options.q 
      console.log(http)
      var text = decodeURIComponent(http)
      var a=[]
      a=text.split('?')
      a = a[1].split('&') 
      var p={}
      for(var i=0;i<a.length;i++){
        var b = a[i].split('=') 
        p[b[0]]=b[1] 
      } 
      that.setData({
        shop_id: p.id,
        type: p.type,
      })
      console.log(p)    
      
    }
   
    try {
      var value = app.getk('goodsCart',false)      
      if (value) { 
        //遍历对象  
        for(var key in value){   
          if(key==that.data.shop_id){
           console.log(key, that.data.shop_id)
            var cart = []
            var orderRefer = []
            cart = value[key]
           
            var value2 = app.getk('orderRefer', false)
            if (value2){
              for (var key in value2) {
                if (key == that.data.shop_id) {
                  orderRefer = value2[key]
                }
              } 
            }
           console.log(cart)
           that.setData({
            cart: cart,
            orderRefer: orderRefer
          })  
           var value3 = app.getk('cart' + that.data.shop_id, false) 
           if(value3) {
            var path = url + 'api/shop/detail'  
            var data = { id: options.id, access_token: app.accessToken() }
            request.sendRrquest(path, 'POST', data, {}).then(function(res){
              console.log(res.data.data[0].shop.discount)
              if(res.data.data[0].shop.discount != null){
                if(res.data.data[0].shop.discount[0].full<=value3.total){
                  for(let x=0;x<res.data.data[0].shop.discount.length;x++){
                    if(value3.total<res.data.data[0].shop.discount[x].full){
                      console.log(res.data.data[0].shop.discount[x-1].reduce)
                      var jian = res.data.data[0].shop.discount[x-1].reduce
                    }
                    if(x == res.data.data[0].shop.discount.length-1){
                      if(value3.total>res.data.data[0].shop.discount[res.data.data[0].shop.discount.length-1].full){
                        console.log(res.data.data[0].shop.discount[x].reduce)
                        var jian = res.data.data[0].shop.discount[x].reduce
                      }
                    }
                  }
                }else{
                  var jian = 0
                }
              }else{
                var jian = 0
              }
              console.log(jian)
               that.setData({
                 total: value3.total,
                 number: value3.number,
                 jian:jian
               })
            })
           }        
          } 
        
        } 
        
       // console.log(cart, orderRefer)
        }else{
        app.removek('goodsCart', false) 
        app.removek('orderRefer', false) 
        app.removek('cart' + that.data.shop_id, false) 
        } 
        } catch (e) { 
         
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
  
  },
  getAllRects: function () {
    var that=this
    // wx.createSelectorQuery().selectAll('.node').boundingClientRect(function (rects) {
    //   console.log(rects[0].top,that.data.into_view)
    // }).exec()
    // if(this.data.iffu == false){
    //   return false;
    // }
    wx.createSelectorQuery().selectAll('.node').boundingClientRect(function (rects) {
      // console.log(rects[0].top,that.data.into_view)
      rects.forEach(function (rect) {
        rect.dataset // 节点的dataset  
        rect.top     // 节点的上边界坐标
        rect.bottom  // 节点的下边界坐标
        // console.log(rect.dataset.index, rect.top, rect.bottom);
        // if(that.data.scroll1 == false){
        //   if (rect.top <= 189 && rect.bottom>189){
        //     console.log(rect.top,111111111)
        //     that.setData({
        //       cindex: rect.dataset.index,
        //       scroll2:true,
        //     })
        //   }
        // }else{
        //   that.setData({
        //     scroll2:true
        //   })
        // }
        if(that.data.ifclick == true){
          that.setData({
            scroll2:true,
          })
          setTimeout(function(){
            that.data.ifclick = false;
          },200)
        }else{
            if (rect.top <= 189 && rect.bottom>189){
            that.setData({
              cindex: rect.dataset.index
            })
          }
        }
      })
    }).exec()
  },
  scrolltolower1:function(){
      this.setData({
        scroll1: false,
        scroll2:true,
      
      })
      
  },
  scrolltoupper2: function () {
    this.setData({
      scroll1: true,
      scroll2: false,
    
    })
  },
  nav_n:function(e){
   this.setData({
     n_index:e.currentTarget.dataset.n_index
   })
   var that=this
   page=1
   if (e.currentTarget.dataset.n_index==1){
     var path = url + 'api/shop/comment'
     var data = { id: that.data.shop_id, access_token: app.accessToken(), page: page}
     //console.log(data)
     request.sendRrquest(path, 'POST', data, {})
       .then(function (res) {
         if(res.data.code==1){
           that.setData({
             eva: res.data.data[0].list
           })
         }
         if (res.data.code == -1) {
           wx.showModal({
             content: res.data.message,
           })
           if (res.data.errorCode) { app.refreshToken(); }
         }

       }, function (error) {
         console.log(error);
       });
   
   }
  },
  //收藏店铺
  collect:function(e){
    var that=this
    var path = url + 'api/shop/collect'
    var data = { id: that.data.shop_id, access_token: app.accessToken(),}
    //console.log(data)
    request.sendRrquest(path, 'POST', data, {})
      .then(function (res) {
        //console.log(res.data);
        if(res.data.code==1){
          that.setData({
            iscollect: res.data.data[0].status
          })
        }     
        if (res.data.code == -1) {
          wx.showModal({
            content: res.data.message,
          })
          if (res.data.errorCode) { app.refreshToken(); }
        }
      }, function (error) {
        console.log(error);
      });
    
   
  },
  //选择菜品种类
  choose_type:function(e){
    var that = this;
    this.setData({
      scroll2:true,
      ifclick:true,
    })
    var id=e.currentTarget.id
    var index = e.currentTarget.dataset.index
    console.log(id,index)
    this.setData({
      cindex:index,
      into_view: index,      
    })
    if (this.data.scroll1){
      this.setData({
        scroll2: false,
      })
    }
    // wx.createSelectorQuery().selectAll('.node').boundingClientRect(function (rects) {
    //   if(rects[0].top>0){
    //     that.setData({
    //       iffu:false,
    //       scroll2:true
    //     })
    //   }else{
    //     that.setData({
    //       iffu:true
    //     })
    //   }
      
    // }).exec()
  },
  //点击查看详情
  showGood:function(e){
    var index=e.currentTarget.dataset.index
    var num = e.currentTarget.dataset.num
    var that=this
    console.log(this.data.category[index].goods[num])
    for(let i=0;i<that.data.orderRefer.length;i++){
      if(that.data.orderRefer[i].goodsid == this.data.category[index].goods[num].id){
        var aa = that.data.orderRefer[i].count;
      }
    }
    this.setData({
      good_show: true,
      good: this.data.category[index].goods[num],
      tannum:aa
    })
  
  },
  //点击关闭详情
  hideGood: function (e) {
    var that = this
    this.setData({
      good_show: false
    })
  },
  //关闭选择规格
  hide_spec: function () {
    this.setData({
      spec_show: false,
      option_index: 0,
      option_id: null,
      param_name: [],
      param_num: 0,
      good_price: 0,
    })
  },
  //开启选择规格
  show_spec: function () {
    this.setData({
      spec_show: true,
      good_show:false,    
    })
  },
  //选规格
  choose_spec:function(e){
    var index = e.currentTarget.dataset.index
    var num = e.currentTarget.dataset.num
    var that = this
   // console.log(this.data.category[index].goods[num])
    that.setData({
      spec_show: true,
      good: that.data.category[index].goods[num],
      param_num: that.data.category[index].goods[num].params.length,     
      good_price: that.data.category[index].goods[num].price
    })

    if (this.data.category[index].goods[num].option.length>0){
      this.setData({
        option_id: that.data.good.option[0].id,
      })
    }
      
     
   
  },
  //选择规格
  spec0:function(e){
    var index=e.detail.value
    var that=this
    that.setData({
      option_id: that.data.good.option[index].id,
      option_index: index,
      good_price: that.data.good.option[index].price
    })     
  },
  //选择属性
  spec1: function (e) {
    var index = e.currentTarget.dataset.index
    var name = e.detail.value
    var that = this
    this.data.param_name[index] = name
    this.setData({
      param_name: this.data.param_name
    })
  },
  //加入购物车
  addToCart: function () {
    var that = this
    var id,name,price,option_id,option,param
    id = that.data.good.id
    name=that.data.good.name
    price = Number(that.data.good.price)
    var choose = true
    if (that.data.good.option.length>0){
      if (that.data.option_id) {
        option = that.data.good.option[that.data.option_index].title
        option_id = that.data.option_id
        price = that.data.good.option[that.data.option_index].price
      }else{
        wx.showModal({
          content: '请选择规格',
        })
        choose = false
      }
    }
  
    if (that.data.good.params.length> 0){
     // console.log(that.data.param_num)
      for (var i = 0; i < that.data.param_num;i++){
       // console.log(i)
        if(that.data.param_name[i]==undefined){
          wx.showModal({
            content: '请选择' + that.data.good.params[i].title,
          })
          choose = false
          break;
        }else{
          if(i>0){
            param = param + '+' + that.data.param_name[i]
          }else{
            param = that.data.param_name[i]
          }          
        }
      }
    }
   // console.log(name, price, option_id, option, param)
    var conf = true
    var len=that.data.cart.length
    if (choose){
    for (var i = 0; i < len; i++) {
      if (that.data.cart[i].param == param && that.data.cart[i].name == name && that.data.cart[i].option == option) {
        conf = false
        break;
      }
    }
    if (conf) {
      var cart = { id: id, name: name, price: price, total: toDecimal(price), count: 1, option_id: option_id, option: option, param: param }
      if (option_id>0){
        var orderRefer = { specs: option_id, count: 1, param: param }
      }else{
        var orderRefer = { goodsid: id, count: 1, param: param }
      }
      
      that.data.cart[len] = cart
      that.data.orderRefer[len] = orderRefer

    } else {
      that.data.cart[i].count += 1
      that.data.cart[i].total = toDecimal(that.data.cart[i].total + price)
      that.data.orderRefer[i].count += 1
    }
   
    var total = that.data.total
    var number = that.data.number
    total = total + Number(price)
    total = toDecimal(total)
    if(that.data.discount != null){

      if(that.data.discount[0].full<=total){
        for(let x=0;x<that.data.discount.length;x++){
          if(total > that.data.discount[x].full){
            console.log(that.data.discount[x].reduce)
            var jian = that.data.discount[x].reduce
          }
          if(x == that.data.discount.length-1){
            if(total>that.data.discount[that.data.discount.length-1].full){
              console.log(that.data.discount[x].reduce)
              var jian = that.data.discount[x].reduce
            }
          }
        }
      }else{
        var jian = 0
      }
    }else{
      var jian = 0
    }
    number = number + 1
    //列表数据
    //  
    that.setData({
      number: number,
      cart: that.data.cart,
      orderRefer: that.data.orderRefer,
      total: total,
      spec_show:false,
      option_index: 0,
      option_id: null,
      param_name: [],
      param_num: 0,
      good_price: 0,
      jian:jian
    })
    }
    //本地缓存购物车
    var cart = that.data.cart
    var orderRefer = that.data.orderRefer
    try {
      var value = app.getk('goodsCart',false)
      var order = app.getk('orderRefer', false)
     
      if (value) {
        value[that.data.shop_id] = cart
      } else {
        console.log(cart)
        value = {}
        value[that.data.shop_id] = cart
      }
      if (order) {
        order[that.data.shop_id] = orderRefer
      } else {
        order = {}
        order[that.data.shop_id] = orderRefer
      }
      app.putk('goodsCart', value, seconds)
      app.putk('orderRefer', order, seconds)
    } catch (e) {
      // Do something when catch error 
    }
    console.log(value)
    var cart_info = { total: that.data.total, number: that.data.number, }
    app.putk('cart' + that.data.shop_id, cart_info, seconds)
  },
  //没有规格没有属性加入购物车
  removeGood: function (e) {
    var that = this
    var id = e.currentTarget.dataset.id
    var name = e.currentTarget.dataset.name
    var price = e.currentTarget.dataset.price
    var len = that.data.cart.length
    for (var i = 0; i < len; i++) {
      if (that.data.cart[i].id == id && that.data.cart[i].name == name) {
        if (that.data.cart[i].count>1){
          that.data.cart[i].count -= 1
          that.data.cart[i].total = toDecimal(that.data.cart[i].total - price)
          that.data.orderRefer[i].count -= 1
        }else{
          that.data.cart.splice(i,1)
          that.data.orderRefer.splice(i, 1)
        }        
        break;
      }
    }
    var total = that.data.total
    var number = that.data.number
    total = total - Number(price)
    total = toDecimal(total)
    if(that.data.discount != null){

      if(that.data.discount[0].full<=total){
        for(let x=0;x<that.data.discount.length;x++){
          if(total > that.data.discount[x].full){
            console.log(that.data.discount[x].reduce)
            var jian = that.data.discount[x].reduce
          }
          if(x == that.data.discount.length-1){
            if(total>that.data.discount[that.data.discount.length-1].full){
              console.log(that.data.discount[x].reduce)
              var jian = that.data.discount[x].reduce
            }
          }
        }
      }else{
        var jian = 0
      }
    }else{
      var jian = 0;
    }
    number = number - 1
    that.setData({
      number: number,
      cart: that.data.cart,
      orderRefer: that.data.orderRefer,
      total: total,
      jian:jian
    })
    //本地缓存购物车
    var cart = that.data.cart
    var orderRefer = that.data.orderRefer
    try {
      var value = app.getk('goodsCart', false)
      var order = app.getk('orderRefer', false)
      if (value) {
        value[that.data.shop_id] = cart
      } else {
        console.log(cart)
        value = {}
        value[that.data.shop_id] = cart
      }
      if (order) {
        order[that.data.shop_id] = orderRefer
      } else {
        order = {}
        order[that.data.shop_id] = orderRefer
      }
      app.putk('goodsCart', value, seconds)
      app.putk('orderRefer', order, seconds)
    } catch (e) {
      // Do something when catch error 
    }
    console.log(value)
    var ifyou = 0;
    for(let i=0;i<value[that.data.shop_id].length;i++){
      if(value[that.data.shop_id][i].id == id){
        ifyou = ifyou+1;
        that.setData({
          tannum:value[that.data.shop_id][i].count
        })
      }
    }
    console.log('ifyou:'+ifyou)
    that.setData({
      ifyou1:ifyou
    })
    var cart_info = { total: that.data.total, number: that.data.number, }
    app.putk('cart' + that.data.shop_id, cart_info, seconds)
  },
  addGood: function (e) {
    var that = this
    var id = e.currentTarget.dataset.id
    var name = e.currentTarget.dataset.name
    var price = Number(e.currentTarget.dataset.price)
    var len = that.data.cart.length
    var conf=true
    for (var i = 0; i < len; i++) {
      if (that.data.cart[i].id == id && that.data.cart[i].name == name) {
        conf = false
        break;
      }
    }
    if (conf) {
      var cart = { id: id, name: name, price: price, count: 1,total:price }
      var orderRefer = { goodsid: id, count: 1, }
      that.data.cart[len] = cart
      that.data.orderRefer[len] = orderRefer

    } else {
      that.data.cart[i].count += 1
      that.data.cart[i].total = toDecimal(that.data.cart[i].total - price)
      that.data.orderRefer[i].count += 1
    }
    var total = that.data.total
    var number = that.data.number
    total = total + Number(price)
    total = toDecimal(total)
    console.log(that.data.discount)
    if(that.data.discount != null){

      if(that.data.discount != null){
        if(that.data.discount[0].full<=total){
          for(let x=0;x<that.data.discount.length;x++){
            if(total > that.data.discount[x].full){
              console.log(that.data.discount[x].reduce)
              var jian = that.data.discount[x].reduce
            }
            if(x == that.data.discount.length-1){
              if(total>that.data.discount[that.data.discount.length-1].full){
                console.log(that.data.discount[x].reduce)
                var jian = that.data.discount[x].reduce;
                console.log(jian)
              }
            }
          }
        }else{
          var jian = 0
        }
      }else{
        var jian = 0;
      }
    }else{
      var jian = 0
    }
    number = number + 1
    that.setData({
      number: number,
      cart: that.data.cart,
      orderRefer: that.data.orderRefer,
      total: total,
      jian:jian
    })
    console.log(that.data.cart)
    console.log(that.data.orderRefer)
    //本地缓存购物车
    var cart = that.data.cart
    var orderRefer = that.data.orderRefer
    try {
      var value = app.getk('goodsCart', false)
      var order = app.getk('orderRefer', false)
      if (value) {
        value[that.data.shop_id] = cart
      } else {
        console.log(cart)
        value = {}
        value[that.data.shop_id] = cart
      }
      if (order) {
        order[that.data.shop_id] = orderRefer
      } else {
        order = {}
        order[that.data.shop_id] = orderRefer
      }
      app.putk('goodsCart', value, seconds)
      app.putk('orderRefer', order, seconds)
    } catch (e) {
      // Do something when catch error 
    }
    console.log(value)
    var ifyou = 0;
    for(let i=0;i<value[that.data.shop_id].length;i++){
      if(value[that.data.shop_id][i].id == id){
        ifyou = ifyou + 1;
        that.setData({
          tannum:value[that.data.shop_id][i].count
        })
      }
    }
    that.setData({
      ifyou1:ifyou
    })
    console.log('ifyou:'+ifyou)
    var cart_info = { total: that.data.total, number: that.data.number, }
    app.putk('cart' + that.data.shop_id, cart_info, seconds)
  },
  
  
  //购物车显示
  cart_show:function(){
    var that=this
    if (that.data.number>0){
      if (that.data.cart_show) {
        that.setData({
        cart_show: false
      })
    } else {
        that.setData({
        cart_show: true
      })
    }

  }  
    
  },
  //购物车里的数量
  remove2: function (e) {
    var that = this
    var index=e.currentTarget.dataset.index
    var num = that.data.cart[index].count
    var pri = that.data.cart[index].price  
    num--
    var total = that.data.total
    var number = that.data.number
    number--
    total = toDecimal(total - pri)
    that.data.orderRefer[index].count =num  
    //外卖餐盒费
    if (num < 1) {
     var cart=that.data.cart
     //var products = that.data.products    
     cart.splice(index,1)
     that.data.orderRefer.splice(index, 1)
   //  products.splice(index, 1)
   if(that.data.discount != null){

   if(that.data.discount[0].full<=total){
      for(let x=0;x<that.data.discount.length;x++){
        if(total > that.data.discount[x].full){
          console.log(that.data.discount[x].reduce)
          var jian = that.data.discount[x].reduce
        }
        if(x == that.data.discount.length-1){
          if(total>that.data.discount[that.data.discount.length-1].full){
            console.log(that.data.discount[x].reduce)
            var jian = that.data.discount[x].reduce
          }
        }
      }
    }else{
      var jian = 0
    }
   }else{
    var jian = 0
   }
     that.setData({
       cart: cart,
       orderRefer: that.data.orderRefer,
       total: total,
       number:number,
       jian:jian
     })
     if (number<1){
       that.setData({       
         cart_show: false,       
       })
     }
    } else {
      that.data.cart[index].count=num
      that.data.cart[index].total = toDecimal(that.data.cart[index].total - pri)
      that.data.orderRefer[index].count = num
      that.setData({
        cart: that.data.cart,
        total: total,
        number: number,
        orderRefer: that.data.orderRefer
        
      })
    }
    //本地缓存购物车
    var cart = that.data.cart
    var orderRefer = that.data.orderRefer
    try {
      var value = app.getk('goodsCart', false)
      var order = app.getk('orderRefer', false)
      if (value) {
        value[that.data.shop_id] = cart
      } else {
        console.log(cart)
        value = {}
        value[that.data.shop_id] = cart
      }
      if (order) {
        order[that.data.shop_id] = orderRefer
      } else {
        order = {}
        order[that.data.shop_id] = orderRefer
      }
      app.putk('goodsCart', value, seconds)
      app.putk('orderRefer', order, seconds)
    } catch (e) {
      // Do something when catch error 
    }
    console.log(value)
    var cart_info = { total: that.data.total, number: that.data.number, }
    app.putk('cart' + that.data.shop_id, cart_info, seconds)
   
  },
  add2: function (e) {
    var that = this
    var index = e.currentTarget.dataset.index
    var num = that.data.cart[index].count
    var pri = that.data.cart[index].price
    num++
    var total = that.data.total
    var number = that.data.number
    number++
    //列表数据
    that.data.orderRefer[index].count = num  
    total = toDecimal(total + pri)
    if(that.data.discount != null){

      if(that.data.discount[0].full<=total){
        for(let x=0;x<that.data.discount.length;x++){
          if(total > that.data.discount[x].full){
            console.log(that.data.discount[x].reduce)
            var jian = that.data.discount[x].reduce
          }
          if(x == that.data.discount.length-1){
            if(total>that.data.discount[that.data.discount.length-1].full){
              console.log(that.data.discount[x].reduce)
              var jian = that.data.discount[x].reduce
            }
          }
        }
      }else{
        var jian = 0
      }
    }else{
      var jian = 0
    }
      that.data.cart[index].count = num
      that.data.cart[index].total = toDecimal(that.data.cart[index].total + pri)
      that.setData({
        cart: that.data.cart,
        total: total,
        number:number,
        orderRefer: that.data.orderRefer,
        jian:jian
       
      })
      //本地缓存购物车
      var cart = that.data.cart
      var orderRefer = that.data.orderRefer
      try {
        var value = app.getk('goodsCart', false)
        var order = app.getk('orderRefer', false)
        if (value) {
          value[that.data.shop_id] = cart
        } else {
          console.log(cart)
          value = {}
          value[that.data.shop_id] = cart
        }
        if (order) {
          order[that.data.shop_id] = orderRefer
        } else {
          order = {}
          order[that.data.shop_id] = orderRefer
        }
        app.putk('goodsCart', value, seconds)
        app.putk('orderRefer', order, seconds)
      } catch (e) {
        // Do something when catch error 
      }
      console.log(value)
      var cart_info = { total: that.data.total, number: that.data.number, }
      app.putk('cart' + that.data.shop_id, cart_info, seconds)
  },
//清空购物车
  clearCart:function(){
    var that=this
    wx.showModal({
      title:'提示',
      content:'是否清空购物车内所有商品',
      confirmText:'清空',
      confirmColor:'#fe7901',
      success: function (res) {
        if (res.confirm) { 
          that.setData({
            cart:[],
            orderRefer: [],
            total: 0,
            number:0,
            cart_show:false,
           
          })
          wx.removeStorage({ key: 'cart'+that.data.shop_id, success: function (res) { console.log(res.data) } })
          try {
            var value = app.getk('goodsCart',false)
            var value2 = app.getk('orderRefer',false)
            if (value) {
              for (var key in value) {
                if (key == that.data.shop_id) {
                  value[key] = undefined
                  break
                }
              }
              for (var key in value2) {
                if (key == that.data.shop_id) {
                  value2[key] = undefined
                  break;
                }
              }
              wx.setStorage({
                key: 'orderRefer',
                data: value2,
              })
              wx.setStorage({
                key: 'goodsCart',
                data: value,
              })
              console.log(value)
            }
          } catch (e) {
          }
        } else if (res.cancel) { 
            
        }
      }
    })
  },
  //点好了
  submit:function(){
    var that=this
    if (that.data.number>0){
      wx.setStorage({
        key: 'shop',
        data: that.data.shop,
      })
      wx.navigateTo({
        url: '../submitOrder/submitOrder?jian='+that.data.jian
      })
    } else {
      wx.showModal({ 
        title: '提示', 
        content: '购物车是空的，请先点菜',
        showCancel:false, 
        confirmColor:'#fe7e00',
        success: function (res) { 
          if (res.confirm) { 
            
            }  
        }  
             })
    }
   
  }
 
})