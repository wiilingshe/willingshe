var sendRrquest = function (url, method, data, header) {
  var promise = new Promise(function (resolve, reject) {
    wx.request({
      url: url,
      data: data,
      method: method,
      header: header,
      success: resolve,
      fail: reject
    })
  });
  return promise;
};

module.exports.sendRrquest = sendRrquest

/*
  var that = thisR
    var path = url + 'api/coupon/info'
    var data = {id: options.id}
    //console.log(data)
    request.sendRrquest(path, 'GET', data, {})
      .then(function (items) {
        //console.log(items.data);
        that.setData({
          c_detail: items.data.data[0],
          total: items.data.data[0].price
        })
      }, function (error) {
        console.log(error);
      });
      */
var uploadimg=function uploadimg(data) {
  var that = this
  var i, success, fail
  console.log(data)
   i = data.i ? data.i : 0,
    success = data.success ? data.success : 0,
    fail = data.fail ? data.fail : 0;
   data.formData.type=i
  // console.log(data.formData)
  wx.uploadFile({
    url: data.url,
    filePath: data.path[i],
    name: data.name,
    formData: data.formData,
    success: (resp) => {
      success++;
      console.log(success)
      console.log(resp);
      //这里可能有BUG，失败也会执行这里
    },
    fail: (res) => {
      fail++;
      console.log('fail:' + i + "fail:" + fail);
    },
    complete: (res) => {
      console.log(res);
        i++;       
      if (i == data.path.length) { //当图片传完时，停止调用   
       // console.log('执行完毕');
       // console.log('成功：' + success + " 失败：" + fail); 
       //wx.redirectTo({
       //  url: '../submit_success/submit_success',
     //  })
       
      } else {//若图片还没有传完，则继续调用函数
        console.log(i);
        data.i = i;
        data.success = success;
        data.fail = fail;
        that.uploadimg(data);
      }

    }
  });
}
module.exports.uploadimg = uploadimg
