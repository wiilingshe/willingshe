// tasks/taskList/taskList.js
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        searchIcon: app.globalData.globalurl + '/img/task/task_search@2x.png',
        arrowIcon: app.globalData.globalurl + '/img/task/task_down@2x.png',
        distanceIcon: app.globalData.globalurl + '/img/task/task_more@2x2.png',
        isCinema: 0, //是否显示影院状态 默认不显示
        cinemaText: '全部影院',
        topData: '', //头部数据
        pageNo: 1,  //无限加载默认值
        c_id: '',
        pId: '',
        typeNo: 0, //影院类型,默认0，全部影院
        list: [],  //列表数据
        latitude: '',
        longitude: '',
        isLower: true, //是否触发滚动事件
        nothing: 0  //是否显示暂无数据
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.showLoading({
            title: '加载中',
        })
        let that = this;
        // 查看是否授权
        if(app.globalData.userstatus==3 && app.globalData.uuid!=''){
            that.getTask(options.c_id, options.p_id, app.globalData.uuid);
        }else{
            app.judgState('','taskList',that,options.c_id, options.p_id);
        }
        that.setData({
            c_id: options.c_id,
            pId: options.p_id
        });
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        this.mapCtx = wx.createMapContext('map');
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        let that = this;
        that.setData({
            pageNo: 1,
            list: [],
            typeNo: 0,
            cinemaText: '全部影院',
        });
        wx.getLocation({
            type: 'gcj02', //返回可以用于wx.openLocation的经纬度
            altitude: true,
            success: function (res) {
                wx.showLoading({
                    title: '加载中',
                });
                that.getList(res.latitude, res.longitude, that.data.pId, that.data.pageNo, that.data.typeNo);
                that.setData({
                    latitude: res.latitude,
                    longitude: res.longitude
                });
            }
        });

    },
    /**
     * goSearch：跳到搜索页
     *  by heqingqing 2018/07/04
     */
    goSearch: function () {
        var that = this;
        wx.navigateTo({
            url: '/tasks/search/search?latitude=' + that.data.latitude + '&longitude=' + that.data.longitude + '&c_id=' + that.data.c_id + '&pId=' + that.data.pId + ''
        });
    },
    /**
     * goCinema:跳到影院页面
     * by heqingqing 2018/07/05
     */
    goCinema: function (e) {
        var cinema_id = e.currentTarget.dataset.cinema;
        var p_id = e.currentTarget.dataset.p;
        wx.navigateTo({
            url: '/tasks/cinema/cinema?cinema_id=' + cinema_id + '&p_id=' + p_id + ''
        });
    },
    /**
     * isShow:是否显示影院状态(显示则隐藏，隐藏则显示)
     * by heqingqing 2018/07/10
     */
    isShow: function () {
        var that = this;
        if (this.data.isCinema == '1') {
            that.setData({
                isCinema: 0
            });
        } else {
            that.setData({
                isCinema: 1
            });
        }
    },
    /**
     * getTask:获取头部信息
     * by heqingqing 2018/07/11
     * 参数：排片ID 片源ID
     */
    getTask: function (c, p, uuid) {
        let that = this;
        wx.request({
            url: app.globalData.ajaxurl + '/sr/chip/task_state.html',
            method: 'post',
            header: {uuid: uuid},
            data: {'c_id': c, 'p_id': p},
            success: function (res) {
                wx.hideLoading();
                if (res.data.status == 1) {
                    that.setData({
                        topData: res.data.data
                    })
                }
            }
        })
    },
    /**
     * getList:获取列表信息
     * by heqingqing 2018/07/12
     * 参数：纬度    经度 排片ID page
     */
    getList: function (latitude, longitude, p, page, status, title) {
        var that = this;
        if (title) {
            var data1 = {
                'latitude': latitude,
                'longitude': longitude,
                'p_id': p,
                'page': page,
                'type': status,
                'title': title
            }
        } else {
            var data1 = {'latitude': latitude, 'longitude': longitude, 'p_id': p, 'page': page, 'type': status}
        }
        wx.request({
            url: app.globalData.ajaxurl + '/sr/chip/task_lst.html',
            method: 'post',
            header: {uuid: app.globalData.uuid},
            data: data1,
            success: function (res) {
                wx.hideLoading();
                wx.stopPullDownRefresh();
                if (res.data.status == 1) {
                    if (res.data.data.length != '0') {
                        that.data.pageNo += 1;
                        let newList = that.data.list;
                        newList = newList.concat(res.data.data);
                        that.setData({
                            list: newList
                        })
                    } else {
                        that.setData({
                            isLower: false,
                            // nothing: 1

                        })
                    }

                }
                if (res.data.data == '' && page==1){
                  that.setData({
                    nothing:1
                  })
                }

            }
        })
    },
    /**
     * lower:无限加载数据
     * by heqingqing 2018/07/12
     */
    lower: function () {
        var that = this;
        if (that.data.isLower) {
          wx.showLoading({
            title: '加载中',
          });
            that.getList(that.data.latitude, that.data.longitude, that.data.pId, that.data.pageNo, that.data.typeNo);
        }
    },
    /**
     * whole:影院选择状态
     * by heqingqing 2018/07/12
     */
    whole: function (e) {
        let that = this;
        let type = e.currentTarget.dataset.type;
        that.setData({
            list: [],
            nothing: 0
        })
        if (type == '0') { //全部
            that.setData({
                cinemaText: '全部影院',
                typeNo: 0,
                isCinema: 0,
            })
        } else if (type == '2') { //已完成
            that.setData({
                cinemaText: '已完成',
                typeNo: 2,
                isCinema: 0,
            })
        } else if (type == '1') { //未完成
            that.setData({
                cinemaText: '未完成',
                typeNo: 1,
                isCinema: 0,
            })
        }
        that.getList(that.data.latitude, that.data.longitude, that.data.pId, 1, that.data.typeNo);


    },
    /**
     * stopPullDownRefresh:下拉刷新
     */
    onPullDownRefresh:function(){
      let that = this;
      that.getList(that.data.latitude, that.data.longitude, that.data.pId, that.data.pageNo, that.data.typeNo);
    }
})