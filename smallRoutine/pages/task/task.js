// pages/task/task.js
const app = getApp()
Page({
    data: {
        Arrow: app.globalData.globalurl + '/img/task/task_more@2x.png',
        imgNull: app.globalData.globalurl + '/img/public/empty_state.png',
        list: [],
        pageNo: 1,
        isLoad: 1,
        isNull: 0,//是否显示无数据提示，默认不显示
        typeNo: 1,//类型
        isLowr: true,//是否允许无限加载
        isTips: false,//是否显示没有更多数据

    },
    onLoad: function (options) {
        var that = this;
        wx.showLoading({
            title: '加载中',
        });
        if (app.globalData.userstatus == 3 && app.globalData.uuid != '') {
            that.getData(that.data.pageNo, app.globalData.uuid, that.data.typeNo);
        } else {
            app.judgState(that.data.pageNo, 'task', that)
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
        var that = this;
    },
    /**
     * goList:跳到任务详情页
     * by heqingqing 2018/07/04
     */
    goList: function (e) {
        let c_id = e.currentTarget.dataset.c;
        let p_id = e.currentTarget.dataset.p;
        wx.navigateTo({
            url: '/tasks/taskList/taskList?c_id=' + c_id + '&p_id=' + p_id + ''
        });
    },
    /**
     * goContacts:跳到联系人
     * by heqingqing 2018/07/05
     */
    goContacts: function (e) {
        let c_id = e.currentTarget.dataset.c;
        let p_id = e.currentTarget.dataset.p;
        wx.navigateTo({
            url: '/tasks/contacts/contacts?c_id=' + c_id + '&p_id=' + p_id + ''
        });
    },
    /**
     * getData:获取数据
     * by heqingqing 2018/07/10
     */
    getData: function (page, uuid, type) {
        let that = this;
        wx.request({
            url: app.globalData.ajaxurl + '/sr/chip_my_task.html',
            method: 'post',
            header: {uuid: uuid},
            data: {'page': page, 'type': type},
            success: function (res) {
                wx.hideLoading();
                wx.stopPullDownRefresh()
                if (res.data.status == '1') {
                    that.data.pageNo += 1;
                    if (res.data.list != '') {
                        let newList = that.data.list.concat(res.data.list);
                        that.setData({
                            list: newList
                        });
                    } else {
                        that.setData({
                            isLowr: false,
                            isTips: true
                        })
                    }

                } else {
                    wx.showToast({
                        title: res.data.msg,
                        icon: 'none',
                        duration: 2000
                    })
                    that.setData({
                        isNull: 1,
                    });
                }
            }
        })
    },
    /**
     * errorFunction:错误图片加载显示
     * by heqingqing 2018/07/10
     */
    errorFunction: function (e) {
        var that = this;
        let index = e.target.dataset.errorimg;
        let listArr = that.data.list;
        listArr[index].bill_pic = '/static/img/err/rose@2x.png'
        that.setData({
            list: listArr
        })
    },
    /**
     * error:小头像加载失败
     * by heqingqing 2018/07/11
     */
    error: function (e) {
        console.log('9');
    },
    /**
     * loadData:无限加载数据
     * by heqingqing 2018/07/11
     */
    loadData: function () {
        var that = this;
        // that.getData(that.data.pageNo);
        wx.navigateTo({
            url: '/user/publish/publish'
        });
    },
    /**
     * lower:无限加载数据
     * by heqingqing 2018/07/31
     */
    lower: function () {
        let that = this;
        if (that.data.isLowr) {
          wx.showLoading({
            title: '加载中',
          });
            that.getData(that.data.pageNo, app.globalData.uuid, that.data.typeNo);
        }

    },
    onPullDownRefresh(){
        var that = this;
        that.setData({
            isLowr: true
        })
        that.data.pageNo = 1;
        that.data.list = [];
        that.getData(that.data.pageNo, app.globalData.uuid, that.data.typeNo);
    },
    onReachBottom(){
        this.lower()
    }
});