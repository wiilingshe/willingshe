// tasks/cinemaInspection/cinemaInspection.js
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        bgImg: app.globalData.globalurl + '/img/task/88888.png',
        cancelIcon: app.globalData.globalurl + '/img/task/task_Details_close@2x.png',
        arr1: [],
        name: 'pic',
        typeNo: 2,
        other_type: 0,
        p_id: '',
        cinema_id: '',
        submitData: {isShow: 0},
        data: {},
        upType: 1
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.showLoading({
            title: '加载中',
        })
        let that = this;
        that.setData({
            p_id: options.p_id,
            cinema_id: options.cinema_id
        });
        that.getData(that.data.typeNo, options.p_id, options.cinema_id);

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
     * upImg1:图片上传
     * by heqingqing 2018/07/16
     */
    upImg1: function (e) {
        let that = this;
        let type = e.currentTarget.dataset.value;
        if (type == '0') { //海报图片
            that.setData({
                other_type: 1
            })
        } else if (type == '1') { //展示图片
            that.setData({
                other_type: 2
            })
        } else if (type == '2') {  //预告片图片
            that.setData({
                other_type: 3
            })
        }
        wx.chooseImage({
            count: 1, // 默认9
            sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
                let tempFilePaths = res.tempFilePaths;
                let formDa = {
                    'type': that.data.upType,
                    'other_type': that.data.other_type,
                    'pc_id': that.data.p_id,
                    'name': that.data.name
                }
                wx.uploadFile({
                    url: app.globalData.ajaxurl + '/sr/chip_upload_picture.html',
                    filePath: tempFilePaths[0],
                    name: that.data.name,
                    formData: formDa,
                    header: {"content-type": 'multipart/form-data', uuid: app.globalData.uuid},
                    success: function (res) {
                        let newData = JSON.parse(res.data);
                        if (newData.status == '1') {
                            if (type == '0') { //海报图片
                                let newArr = that.data.data;
                                let newBjb = {'pi_id': newData.pi_id, 'pi_img': newData.pi_img};
                                newArr.bill_pics_list.push(newBjb);
                                that.setData({
                                    data: newArr
                                });
                            } else if (type == '1') { //展架图片
                                let newArr = that.data.data;
                                let newBjb = {'pi_id': newData.pi_id, 'pi_img': newData.pi_img};
                                newArr.display_rack_pics_list.push(newBjb);
                                that.setData({
                                    data: newArr
                                });

                            } else if (type == '2') { //预告片图片
                                let newArr = that.data.data;
                                let newBjb = {'pi_id': newData.pi_id, 'pi_img': newData.pi_img};
                                newArr.prevue_pics_list.push(newBjb);
                                that.setData({
                                    data: newArr
                                });

                            }
                        }
                    }
                })
            }
        })
    },
    /**
     * cancelImg:删除上传图片
     * by heqingqing 2018/07/16
     */
    cancelImg: function (e) {
        let that = this;
        let index = e.target.dataset.index;   //下标
        let pi_id = e.target.dataset.pid;
        let typeData = e.target.dataset.type;  //类型
        if (typeData == '0') { //海报图片
            let newArr = that.data.data;
            newArr.bill_pics_list.splice(index, 1);
            that.setData({
                data: newArr
            });
        } else if (typeData == '1') { //展架图片
            let newArr = that.data.data;
            newArr.display_rack_pics_list.splice(index, 1);
            that.setData({
                data: newArr
            });
        } else if (typeData == '2') { //预告片图片
            let newArr = that.data.data;
            newArr.prevue_pics_list.splice(index, 1);
            that.setData({
                data: newArr
            });
        }

    },
    /**
     * submit:提交数据
     * by heqingqing 2018/07/13
     */
    submit: function () {
        let that = this;
        let newObj = {};
        let bill_pics_list = [];
        let display_rack_pics_list = [];
        let prevue_pics_list = [];
        that.data.data.bill_pics_list.forEach(function (item, index) {
            bill_pics_list.push(item.pi_id)
        });
        that.data.data.display_rack_pics_list.forEach(function (item, index) {
            display_rack_pics_list.push(item.pi_id)
        });
        that.data.data.prevue_pics_list.forEach(function (item, index) {
            prevue_pics_list.push(item.pi_id)
        });
        newObj.bill_pics = bill_pics_list.join();
        newObj.display_rack_pics = display_rack_pics_list.join();
        newObj.prevue_pics = prevue_pics_list.join();
        newObj.type = that.data.typeNo;
        newObj.p_id = that.data.data.p_id;
        newObj.cinema_id = that.data.data.cinema_id;
        newObj.bill_pics_remarks = that.data.data.bill_pics_remarks;
        newObj.display_rack_pics_remarks = that.data.data.display_rack_pics_remarks;
        newObj.prevue_pics_remarks = that.data.data.prevue_pics_remarks;
        newObj.materiel_remarks = that.data.data.materiel_remarks;
        wx.request({
            url: app.globalData.ajaxurl + '/sr/chip/handle_task.html',
            method: 'POST',
            header: {uuid: app.globalData.uuid},
            data: newObj,
            success: function (res) {
                wx.showToast({
                    title: res.data.msg,
                    icon: 'none',
                    duration: 3000
                });
                if (res.data.status == "1") {
                  setTimeout(function () {
                    wx.navigateBack({
                      delta: 1
                    })
                  }, 500);
                   
                }
            }
        });
    },
    /**
     * getVal:获取input输入框的值
     * by heqingqing 2018/07/16
     */
    getVal: function (e) {
        let that = this;
        let typeData = e.target.dataset.type;
        let valData = e.detail.value;
        if (typeData == "0") {  //海报说明
            let newData = that.data.data;
            newData.bill_pics_remarks = valData;
            that.setData({
                data: newData
            })
        } else if (typeData == "1") { //展架说明
            let newData = that.data.data;
            newData.display_rack_pics_remarks = valData;
            that.setData({
                data: newData
            })

        } else if (typeData == "2") { //预告片说明
            let newData = that.data.data;
            newData.prevue_pics_remarks = valData;
            that.setData({
                data: newData
            })

        } else if (typeData == "3") { //其他备注
            let newData = that.data.data;
            newData.materiel_remarks = valData;
            that.setData({
                data: newData
            })
        }
    },
    /**
     * getData:初始化获取数据
     * by heqingqing 2018/07/17
     */
    getData: function (type, p_id, cinema_id) {
        let that = this;
        wx.request({
            url: app.globalData.ajaxurl + '/sr/chip/task_detail.html',
            method: 'POST',
            header: {uuid: app.globalData.uuid},
            data: {'type': type, 'p_id': p_id, 'cinema_id': cinema_id},
            success: function (res) {
                wx.hideLoading();
                if (res.data.status == "1") {
                    that.setData({
                        data: res.data.data
                    })
                } else {
                  wx.showToast({
                    title: res.data.msg,
                    icon: 'none',
                    duration: 2000
                  })
                }
            }
        });
    }

})