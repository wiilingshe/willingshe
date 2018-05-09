var app = getApp();
Page({
data: {
 cateItems1: [
   {
     cate_id: 1,
     cate_name: "燃气业务",
     ishaveChild: true,
     children:
     [
       {
         child_id: 1,
         name: '我要报数',
         image: "../../images/business3.png",
         path:"http://service.szgas.com.cn/gasutensil/gasUtensilList.jspx"
       },
       {
         child_id: 2,
         name: '气费账单',
         image: "../../images/business4.png"
       },
       {
         child_id: 3,
         name: '预约办理',
         image: "../../images/business5.png"
       },
       {
         child_id: 4,
         name: '科学馆预约',
         image: "../../images/business5.png"
       }
     ]
   },
   {
     cate_id: 2,
     cate_name: "燃气灶具",
     ishaveChild: true,
     children:
     [
       {
         child_id: 1,
         name: '热水器',
         image: "../../images/business3.png"
       },
       {
         child_id: 2,
         name: '气费账单',
         image: "../../images/business4.png"
       },
       {
         child_id: 3,
         name: '预约办理',
         image: "../../images/business5.png"
       },
       {
         child_id: 4,
         name: '科学馆预约',
         image: "../../images/business5.png"
       }
     ]
   },
   {
     cate_id: 3,
     cate_name: "热水器",
     ishaveChild: true,
     children:
     [
       {
         child_id: 1,
         name: '我要报数',
         image: "../../images/business3.png"
       },
       {
         child_id: 2,
         name: '气费账单',
         image: "../../images/logo.png"
       },
       {
         child_id: 3,
         name: '预约办理',
         image: "../../images/business5.png"
       },
       {
         child_id: 4,
         name: '科学馆预约',
         image: "../../images/logo.png"
       }
     ]
   },
   {
     cate_id: 4,
     cate_name: "排油烟机",
     ishaveChild: true,
     children:
     [
       {
         child_id: 1,
         name: '我要报数',
         image: "../../images/business3.png"
       },
       {
         child_id: 2,
         name: '气费账单',
         image: "../../images/logo.png"
       },
       {
         child_id: 3,
         name: '预约办理',
         image: "../../images/business5.png"
       },
       {
         child_id: 4,
         name: '科学馆预约',
         image: "../../images/logo.png"
       },
       {
         child_id: 5,
         name: '预约办理',
         image: "../../images/business5.png"
       },
       {
         child_id: 6,
         name: '科学馆预约',
         image: "../../images/logo.png"
       }
     ]
   },
   {
     cate_id: 5,
     cate_name: "消毒碗柜",
     ishaveChild: true,
     children:
     [
       {
         child_id: 1,
         name: '我要报数',
         image: "../../images/business3.png"
       },
       {
         child_id: 2,
         name: '气费账单',
         image: "../../images/logo.png"
       },
       {
         child_id: 3,
         name: '预约办理',
         image: "../../images/business5.png"
       },
       {
         child_id: 4,
         name: '科学馆预约',
         image: "../../images/logo.png"
       }
     ]
   },
   {
     cate_id: 6,
     cate_name: "土特产",
     ishaveChild: true,
     children:
     [
       {
         child_id: 1,
         name: '我要报数',
         image: "../../images/business3.png"
       },
       {
         child_id: 2,
         name: '气费账单',
         image: "../../images/logo.png"
       },
       {
         child_id: 3,
         name: '预约办理',
         image: "../../images/business5.png"
       },
       {
         child_id: 4,
         name: '科学馆预约',
         image: "../../images/logo.png"
       },
       {
         child_id: 5,
         name: '科学馆预约',
         image: "../../images/logo.png"
       },
        {
         child_id: 6,
         name: '科学馆预约',
         image: "../../images/logo.png"
       }
     ]
   }
 ],
 cateItems:[],
 cateItems2:[],
 curNav: 1,
 curIndex: 0,
 page:1,
},
onLoad(){
  var that = this;
  wx.request({
    url:app.data.url+'/api/goods/category',
    method:'GET',
    success:function(res){
      if(res.data.code == 1){
        that.setData({
          cateItems:res.data.data,
          curNav:res.data.data[0].id
        });
        wx.request({
          url:app.data.url+'/api/goods',
          data:{cid:res.data.data[0].id,page:1,limit:20},
          method:'GET',
          success:function(res){
            console.log(res.data.data[0].data)
            that.setData({
              cateItems2:res.data.data[0].data
            })
          }
        })
      }
    }
  })
},
//事件处理函数  
switchRightTab: function (e) {
  wx.showLoading()
  var that = this;
 // 获取item项的id，和数组的下标值  
 let id = e.target.dataset.id,
   index = parseInt(e.target.dataset.index);
   //console.log(e.target.dataset.id);
 // 把点击到的某一项，设为当前index  
 this.setData({
   curNav: id,
   curIndex: index,
   page:1
 })
 wx.request({
    url:app.data.url+'/api/goods',
    data:{cid:this.data.curNav,page:this.data.page,limit:20},
    method:'GET',
    success:function(res){
      that.setData({
        cateItems2:res.data.data[0].data
      })
       wx.hideLoading()
    }
  })
},
detail(e){
  console.log(e.currentTarget.dataset.id);
  wx.navigateTo({
    url:'../choiceGoods/choiceGoods?id='+e.currentTarget.dataset.id
  })
},
more(){
  var that = this;
  this.data.page = Number(this.data.page)+Number(1);
  wx.request({
    url:app.data.url+'/api/goods',
    data:{cid:this.data.curNav,page:this.data.page,limit:20},
    method:'GET',
    success:function(res){
      var data = that.data.cateItems2.concat(res.data.data[0].data)
      that.setData({
        cateItems2:data
      })
    }
  })
}
})