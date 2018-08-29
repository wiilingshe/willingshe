// pages/list/list.js
const app = getApp();
Page({
  data: {
    img1:app.globalData.ajaxurl+'/img/public/empty_state.png',
    upTriangle:app.globalData.ajaxurl+'/img/index/up_triangle.png',
    animationData: '',
    screenWidth:'',
    beishu:1,
    animationData1:{},
    page1:1,
    page2:1,
    list1:[],
    list2:[],
    ifload2:false,
    ifshow:true,
    startclientX:'',
    newlist1:0,
    newlist2:0,
    tabitem:0,
    animationData3:{},
    startClientX3:0,
    nowItem:0,
    list3:[],
    cidArr:{},
    miltiples:1,
    scrollTop:0,
    scrollTop2:0,
  },
  onLoad: function (options) {
    var that = this;
    wx.showLoading({
      title: '加载中',
    });
    wx.request({
      url:app.globalData.ajaxurl+'/sr/index_index.html',
      method:'GET',
      data:'',
      success:res=>{
        /*console.log(res);*/
        if(res.data.status==1){
          let c_json =[];
          for(var i in res.data.list){ //遍历出c_id成为新的数组
            c_json.push(res.data.list[i].c_id);
          }
          /*console.log(c_json);
          console.log(c_json[2]);*/
          that.setData({
            list3:res.data.list,
            cidArr:c_json,
          });
          /*console.log(that.data.cidArr);*/
          that.getClaim(that.data.cidArr[0],1);
        }else{
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 1000
          })
        }
      }
    });
    wx.getSystemInfo({
      success(res){
        that.data.beishu = res.screenWidth/375
      }
    });
    wx.getSystemInfo({
      success(res){
        that.data.multiples = res.screenWidth/375;
      }
    });
  },
  getClaim(c_id,page){ //获取该影片的预排片榜单
    var that = this;
    wx.request({
      url:app.globalData.ajaxurl+'/sr/charts/claim.html',
      method:'POST',
      data:{page:page,c_id:c_id},
      success:function(res){
        wx.hideLoading();
        /*console.log(res);*/
        if(res.data.status == 1){
          that.data.newlist1 = res.data.data.length;
          for(let i=0;i<res.data.data.length;i++){
            res.data.data[i].claim_start = Number(res.data.data[i].claim_start).toFixed(1)
            res.data.data[i].claim_end = Number(res.data.data[i].claim_end).toFixed(1)
          }
          that.setData({
            list1:res.data.data
          })
        }else{
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 1000
          })
        }
      }
    });
  },
  getInterview(c_id,page){ //获取今日走访量榜单
    var that = this;
    wx.request({
      url:app.globalData.ajaxurl+'/sr/charts/interview.html',
      method:'POST',
      data:{page:page,c_id:c_id},
      success:function(res){
        wx.hideLoading();
        if(res.data.status == 1){
          that.data.newlist2 = res.data.data.length;
          that.setData({
            list2:res.data.data
          })
          that.data.ifload2 = true;
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
  more1(){
    var that = this;
    if(this.data.newlist1 != 0){
      wx.showLoading({
        title: '加载中',
      });
      var that = this;
      this.data.page1++;
      wx.request({
        url:app.globalData.ajaxurl+'/sr/charts/claim.html',
        method:'POST',
        data:{page:that.data.page1,c_id:that.data.cidArr[that.data.nowItem]},
        success:function(res){
          wx.hideLoading();
          if(res.data.status == 1){
            for(let i=0;i<res.data.data.length;i++){
              res.data.data[i].claim_start = Number(res.data.data[i].claim_start).toFixed(1)
              res.data.data[i].claim_end = Number(res.data.data[i].claim_end).toFixed(1)
            }
            var list = that.data.list1.concat(res.data.data)
            that.setData({
              list1:list
            })
            that.data.newlist1 = res.data.data.length;
          }else{
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              duration: 1000
            })
          }
        }
      })
    };
    /*console.log(this.data.newlist1);*/
  },
  more2(){
    var that = this;
    if(this.data.newlist2 != 0){
      wx.showLoading({
        title: '加载中',
      })
      var that = this;
      this.data.page2++;
      wx.request({
        url:app.globalData.ajaxurl+'/sr/charts/interview.html',
        method:'POST',
        data:{page:that.data.page2,c_id:that.data.cidArr[that.data.nowItem]},
        success:function(res){
          wx.hideLoading();
          if(res.data.status == 1){
            var list = that.data.list2.concat(res.data.data)
            that.setData({
              list2:list
            })
            that.data.newlist2 = res.data.data.length;
          }else{
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              duration: 1000
            })
          }
        }
      })
    }else{

    }
  },
  item1(){
    var beishu = this.data.beishu;
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    })
    this.animation = animation;
    animation.left(beishu*78).step();
    var animation1 = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    })
    this.animation1 = animation1;
    animation1.left('0').step();
    this.setData({
      animationData:animation.export(),
      animationData1:animation1.export()
    })
    this.setData({
      tabitem:0,
      scrollTop:0
    })
  },
  item2(){
    var that = this;
    var beishu = this.data.beishu;
    var animation = wx.createAnimation({
      duration: 300,
      timingFunction: 'ease',
    })
    var animation1 = wx.createAnimation({
      duration: 300,
      timingFunction: 'ease',
    })
    this.animation = animation;
    animation.left(beishu*266).step();
    this.animation1 = animation1;
    animation1.left('-100%').step()
    this.setData({
      animationData:animation.export(),
      animationData1:animation1.export()
    })
    this.setData({
      tabitem:1,
      scrollTop2:0
    })
    if(this.data.ifload2 == false){ //切换今日走访量榜单
      that.getInterview(that.data.cidArr[that.data.nowItem],1);

    };
    /*console.log(this.data.ifload2);*/
  },
  touchstartitem(event){
    this.setData({
      startclientX:event.changedTouches[0].clientX
    })
  },
  touchenditem(event){
    var beishu = this.data.beishu;
    if(this.data.startclientX-event.changedTouches[0].clientX>0){
      // 向左滑
      // this.item2()
    }else if(event.changedTouches[0].clientX-this.data.startclientX>0){
      // 向右滑
      //this.item1()
    }
  },
  // 顶部影片滑动切换
  touchStartItem(event){
    this.setData({
      startClientX3:event.changedTouches[0].clientX
    })
  },
  touchMoveItem(event){
    var that = this;
    if((that.data.startClientX3<event.changedTouches[0].clientX) && that.data.nowItem==0){
      var animation = wx.createAnimation({
        duration:500,
        timingFunction:'ease',
      });
      that.animation = animation;
      animation.left(event.changedTouches[0].clientX/1.5).step();
      that.setData({
        animationData3:animation.export()
      })
    }
  },
  touchEndItem(event){
    var that = this;
    var multiples = that.data.multiples;
    /*console.log(that.data.startClientX3);
    console.log(event.changedTouches[0].clientX);
    console.log(that.data.startClientX3-event.changedTouches[0].clientX);*/
    if(that.data.startClientX3-event.changedTouches[0].clientX>0){
      // 左滑
      if(that.data.nowItem<that.data.list3.length-1){
        /*console.log('left');*/
        that.data.nowItem = that.data.nowItem+1;
        /*console.log(that.data.nowItem);
        console.log(that.data.cidArr[that.data.nowItem]);*/
        wx.showLoading({
          title: '加载中',
        });
        that.getClaim(that.data.cidArr[that.data.nowItem],1); //左滑的同时渲染左侧数据
        that.item1(); //启动动画；
        that.setData({
          ifload2:false,
          page1:1,
          page2:1,
          scrollTop:0
        }); //重置右侧状态
        /*console.log(that.data.ifload2);*/
        /*console.log(that.data.list3.length-1);*/
        var animation = wx.createAnimation({
          duration:500,
          timingFunction:'ease'
        });
        that.animation = animation;
        animation.left(-90*that.data.nowItem*multiples).step();
        that.setData({
          animationData3:animation.export()
        })
      }
    }else if(that.data.startClientX3-event.changedTouches[0].clientX<0){
      // 右滑
      if(that.data.nowItem > 0){
        /*console.log('right');*/
        that.data.nowItem = that.data.nowItem-1;
        /*console.log(that.data.nowItem);
        console.log(that.data.cidArr[that.data.nowItem]);*/
        wx.showLoading({
          title: '加载中',
        });
        that.getClaim(that.data.cidArr[that.data.nowItem],1); //左滑的同时渲染左侧数据
        that.item1(); //启动动画
        that.setData({
          ifload2:false,
          page1:1,
          page2:1,
          scrollTop2:0
        }); //重置右侧状态
        /*console.log(that.data.ifload2);*/
        var animation = wx.createAnimation({
          duration:500,
          timingFunction: 'ease'
        });
        that.animation = animation;
        animation.left(-90*that.data.nowItem*multiples).step();
        that.setData({
          animationData3:animation.export()
        })
      }else{
        /*console.log('right2');
        console.log(that.data.nowItem);*/
        var animation = wx.createAnimation({
          duration: 500,
          timingFunction: 'ease',
        })
        that.animation = animation;
        animation.left(0).step()
        that.setData({
          animationData3:animation.export()
        })
      }
    }
  },
})
