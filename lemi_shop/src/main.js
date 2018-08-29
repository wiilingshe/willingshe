import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import $ from 'jquery'
import qs from 'qs'
import global_ from './components/global/global'
import Mint from 'mint-ui'
import wx from 'weixin-js-sdk'
import VuePreview from 'vue-preview'
import Vuex from 'vuex'

// import vconsole from 'vconsole'
import '../static/css/min-ui.css'
import storeConfig from './vuex/store.js'

Vue.prototype.global = global_
Vue.prototype.qs = qs;
Vue.use(VuePreview)
Vue.use(Mint)
Vue.use(Vuex)


// Vue.use(vconsole)
// Vue.prototype.tokenVal = function(){
//   if(window.location.host.indexOf('shop.bn-t.cn') != -1 || window.location.host.indexOf('shop.saasxx.vip') != -1 || window.location.host.indexOf('www.saasxx.vip') != -1){
//     if(unescape(window.location.href).indexOf('token=') != -1){
//       var href = window.location.href;
//       var start = unescape(window.location.href).indexOf('token=');
//       var end = unescape(window.location.href).indexOf('&',start);
//       if(end != -1){
//         var token = unescape(window.location.href).substring(parseInt(start+6),end)
//       }else{
//         var token = unescape(window.location.href).substr(parseInt(start+6))
//       }
//       axios.defaults.headers.token = token
//     }else{
//       axios.defaults.headers.token = localStorage.getItem('token')
//     }
//     axios.defaults.headers.rootToken = localStorage.getItem('rootToken')
//   }
// }

Vue.prototype.$ajax = axios
Vue.prototype.postData = function (type, url, data) {
  // this.tokenVal();
  return new Promise((resolve, reject) => {
    axios({
      method: type,
      url: url,
      data: qs.stringify(data),
    }).then((response) => {
      resolve(response)
    }, (response) => {
      reject(response)
    })
  })
}
Vue.prototype.uploadPic = function (type, url, data) {
  // this.tokenVal();
  return new Promise((resolve, reject) => {
    axios({
      method: type,
      url: url,
      data: data,
      headers: {'Content-Type': 'multipart/form-data'}
    }).then((response) => {
      resolve(response)
    }, (response) => {
      reject(response)
    })
  })
}
Vue.prototype.getData = function (type, url, data) {
  // this.tokenVal();
  return new Promise((resolve, reject) => {
    axios({
      method: type,
      url: url,
      data: qs.stringify(data)
    }).then((response) => {
      resolve(response)
    }, (response) => {
      reject(response)
    })
  })
}
Vue.prototype.sharePic = 'http://vrjishu1.oss-cn-shenzhen.aliyuncs.com/logo.jpg'
Vue.prototype.share = function (title, desc, imgUrl,name,phone,pic) {
  console.log(name,phone)
  // this.tokenVal();
  var url = unescape(window.location.href);
  var length = url.length;
  if (url.indexOf('token') != -1) {
    var tokenNum = url.substr(url.indexOf('token'))
    if (url.indexOf('&', url.indexOf('token')) == -1) {
      var x = Number(url.indexOf('token')) - Number(1)
      var url1 = url.slice(0, x)
    } else {
      var x = Number(url.indexOf('token')) - Number(1)
      var a = url.indexOf('&', url.indexOf('token'))
      var url1 = url.slice(0, x) + url.slice(a, length)
    }
  } else {
    var url1 = url;
  }
  // alert(url1)
  axios({
    method: 'POST',
    url: '/shop-v1-pay_jssign.html',
    data: qs.stringify({url: url1})
  }).then(res => {
    if (res.status == 200) {
      // alert(res.data.sign.url)
      if (res.data.status == 1) {
        axios({
          method: 'POST',
          url: 'shop-v1-index_get_root.html'
        }).then(response => {
          if (response.status == 200) {
            if (response.data.status == 1) {
              if (response.data.rootId == 'A1A') {
                if (window.location.href.indexOf('classification') != -1) {
                  $('.lis').eq(1).css('display', 'none')
                  $('.lis').eq(2).css('display', 'none')
                } else if (window.location.href.indexOf('details') != -1) {
                  $('.buyed').text('你已购买，请点击添加客服微信')
                }
              }
              if (window.location.href.indexOf('root_id=') == -1) {
                if (res.data.sign.url.indexOf('?') != -1) {
                  res.data.sign.url = res.data.sign.url + '&root_id=' + response.data.rootId
                } else {
                  res.data.sign.url = res.data.sign.url + '?root_id=' + response.data.rootId
                }
              }
              // 判断链接有没有member_id，有的话去掉，因为分享连接后会带上member_id，避免冲突出错
              if(res.data.sign.url.indexOf('?member_id=') != -1){
                if(res.data.sign.url.indexOf('&',res.data.sign.url.indexOf('?member_id=')) != -1){
                  res.data.sign.url = res.data.sign.url.substring(0,res.data.sign.url.indexOf('?member_id=')+1)+res.data.sign.url.substring(res.data.sign.url.indexOf('&',res.data.sign.url.indexOf('?member_id='))+1)
                }else{
                  res.data.sign.url = res.data.sign.url.substring(0,res.data.sign.url.indexOf('?member_id='))
                }
              }else if(res.data.sign.url.indexOf('&member_id=') != -1){
                if(res.data.sign.url.indexOf('&',res.data.sign.url.indexOf('&member_id=')+1) == -1){
                  res.data.sign.url = res.data.sign.url.substring(0,res.data.sign.url.indexOf('&member_id='))
                }else{
                  res.data.sign.url = res.data.sign.url.substring(0,res.data.sign.url.indexOf('&member_id='))+res.data.sign.url.substring(res.data.sign.url.indexOf('&',res.data.sign.url.indexOf('&member_id=')+1))
                }
              }
              wx.config({
                debug: false,
                appId: res.data.sign.appId,
                timestamp: res.data.sign.timestamp,
                nonceStr: res.data.sign.nonceStr,
                signature: res.data.sign.signature,
                jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone']
              });
              // if(name == undefined){
              //   var url = res.data.sign.url+'&member_id='+res.data.sign.member_id
              // }else if(this.$route.query.name != undefined){
              //   var url = res.data.sign.url+'&member_id='+res.data.sign.member_id
              // }else{
              //   var url = res.data.sign.url+'&member_id='+res.data.sign.member_id+'&name='+name+'&phone='+phone+'&pic='+pic
              // }
              // console.log(url)
              var url = res.data.sign.url+'&member_id='+res.data.sign.member_id
              wx.ready(function () {
                wx.onMenuShareAppMessage({
                  title: title,
                  desc: desc,
                  link: url,
                  imgUrl: imgUrl
                });
                wx.onMenuShareTimeline({
                  title: title,
                  link: url,
                  imgUrl: imgUrl
                });
                wx.onMenuShareQQ({
                  title: title,
                  desc: desc,
                  link: url,
                  imgUrl: imgUrl
                });
                wx.onMenuShareWeibo({
                  title: title,
                  desc: desc,
                  link: url,
                  imgUrl: imgUrl
                });
                wx.onMenuShareQZone({
                  title: title,
                  desc: desc,
                  link: url,
                  imgUrl: imgUrl
                });
              });
            }
          }
        })
      }
    }
  }).catch(res => {

  })
}
Vue.prototype.noShare = function () {
  // if(axios.defaults.headers.token == undefined){
  //   axios.defaults.headers.token = localStorage.getItem('token')
  // }
  var url = unescape(window.location.href);
  var length = url.length;
  if (url.indexOf('token') != -1) {
    var tokenNum = url.substr(url.indexOf('token'))
    if (url.indexOf('&', url.indexOf('token')) == -1) {
      var x = Number(url.indexOf('token')) - Number(1)
      var url1 = url.slice(0, x)
    } else {
      var x = Number(url.indexOf('token')) - Number(1)
      var a = url.indexOf('&', url.indexOf('token'))
      var url1 = url.slice(0, x) + url.slice(a, length)
    }
  } else {
    var url1 = url;
  }
  axios({
    method: 'POST',
    url: '/shop-v1-pay_jssign.html',
    data: qs.stringify({url: url1})
  }).then(res => {
    if (res.status == 200) {
      if (res.data.status == 1) {
        axios({
          method: 'POST',
          url: 'shop-v1-index_get_root.html'
        }).then(response => {
          if (response.status == 200) {
            if (response.data.status == 1) {
              if (response.data.rootId == 'A1A') {
                if (window.location.href.indexOf('mine-order') != -1) {
                  $('.mint-navbar').find('a').eq(0).css('display', 'none');
                  this.selected = '2'
                } else if (window.location.href.indexOf('serAsk') != -1) {
                  $('.type ul').find('li').eq(0).css('display', 'none');
                  $('.type ul').find('li').eq(1).css('width', '100%');
                  this.choosed = false;
                } else if (window.location.href.indexOf('classification') != -1) {
                  $('.lis').eq(1).css('display', 'none')
                  $('.lis').eq(2).css('display', 'none')
                } else if (window.location.href.indexOf('mine-course') != -1) {
                  $('.mint-navbar').find('.mint-tab-item').eq(0).css('display', 'none');
                  this.selected = '2'
                } else if (window.location.href.indexOf('mineAsk') != -1) {
                  $('.type').find('li').eq(0).css('display', 'none');
                  $('.type').find('li').eq(1).css('width', '100%');
                  console.log($('.type'))
                  this.choose = false;
                  this.postData('post', 'shop-v1-ask_my_questions.html', {
                    type: this.type2,
                    page: this.pageNo,
                    status: this.status
                  }).then(res => {
                    this.arr = res.data;
                    this.listLength = res.data.length;
                    if (res.data.length == 0) {
                      this.load = false;
                      this.load4 = true;
                    } else {
                      this.load = false;
                    }
                  })
                }
              }
              if (res.data.sign.url.indexOf('?') != -1) {
                res.data.sign.url = res.data.sign.url + '&root_id=' + response.data.rootId
              } else {
                res.data.sign.url = res.data.sign.url + '?root_id=' + response.data.rootId
              }
              wx.config({
                debug: false,
                appId: res.data.sign.appId,
                timestamp: res.data.sign.timestamp,
                nonceStr: res.data.sign.nonceStr,
                signature: res.data.sign.signature,
                jsApiList: ['hideAllNonBaseMenuItem']
              });
              wx.ready(function () {
                wx.hideAllNonBaseMenuItem();
              });
            }
          }
        })
      }
    }
  }).catch(res => {

  })
}
Vue.config.productionTip = false;
new Vue({
  el: '#app',
  router,
  storeConfig,//使用storeConfig
  template: '<App/>',
  components: {App}
});



