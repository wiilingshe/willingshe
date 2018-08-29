// component/taskSubmit/taskSubmit.js
const app = getApp();
Component({
  properties: {
    custom: {
      type: Object,
      value: {},
      observer: '_Obj',
    }
  },
  data: {
    close: app.globalData.globalurl + '/img/index/in_close.png',
    icon: app.globalData.globalurl + '/img/index/Details_success@3x.png',
    isShow:false,
    p_id:'',
    cinema_id:''

  },
  methods: {
    _Obj(newVal) {
      var that = this;
      that.setData({
        isShow: newVal.isShow,
      });
      if (newVal.p_id){
        that.setData({
          p_id: newVal.p_id,
        })
      }
      if (newVal.cinema_id){
         that.setData({
           cinema_id: newVal.cinema_id
         })
      }
    },
    /**
     * close:关闭组件
     * by heqingqing 2018/7/16
     */
    close:function(){
     var that = this;
     that.setData({
       isShow:false
     })
    },
    /**
     * goCinema:跳到任务详情页
     * by heqingqing 2018/07/18
     */
    goCinema:function(){ 
      let that = this;
      wx.navigateTo({
        url: '/tasks/cinema/cinema?cinema_id=' + that.data.cinema_id + '&p_id=' + that.data.p_id + ''
      });
    }

    }


})