<script type="text/javascript">
import axios from 'axios'
import qs from 'qs'
const globalBaseUrl = 'https://www.oopca.com'
// const globalBaseUrl = 'https://www.saasxx.vip'
// const globalBaseUrl = 'http://www.lemi.com'
var token = '';
var rootToken = '';
axios.defaults.withCredentials = true
axios.defaults.crossDomain = true
axios.defaults.baseURL = globalBaseUrl
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'

//获取root_id
function getRootId(){
	// var root_id;
	// return root_id = 'Aw';
	var href = window.location.href;
	if(unescape(href).indexOf('root_id') != -1){
		var start = unescape(window.location.href).indexOf('root_id=');
		var end = unescape(window.location.href).indexOf('&',start);
		if(end != -1){
			var root_id = unescape(window.location.href).substring(parseInt(start+8),end)
		}else{
			var root_id = unescape(window.location.href).substr(parseInt(start+8))
		}
		return root_id;
	}else{
		return root_id = '';
	}
}

function shouquan(){
	var root_id = getRootId();
	if(root_id == ''){
		var data = {url:window.location.href}
	}else{
		var data = {root_id:root_id,url:window.location.href}
	}
	axios({
			method:'post',
			url:globalBaseUrl+'/shop-v1-index_checklogin.html',
			data:qs.stringify(data)
	}).then(res => {
		if(res.data.status == 0){
			window.location.href = res.data.url;
		}else if(res.data.status == 2){
			window.location.href = '/failTip';
		}
	})
	console.log(window.location.href)
	if(window.location.href.indexOf('classification')!=-1 || window.location.href.indexOf('successPay')!=-1 || window.location.href.indexOf('failpay')!=-1 || window.location.href.indexOf('goodsLists')!=-1 || window.location.href.indexOf('failPay')!=-1 || window.location.href.indexOf('goodDetails')!=-1){
		console.log(1111)
		if($('html').width() == 375){
			$('html').css('font-size','calc(375 / 320 * 50px)')
		}else if($('html').width() == 320){
			$('html').css('font-size','calc(320 / 320 * 50px)')
		}else if($('html').width() == 414){
			$('html').css('font-size','calc(414 / 320 * 50px)')
		}else if($('html').width() >= 768){
			$('html').css('font-size','calc(768 / 320 * 50px)')
		}else if($('html').width() >= 1024){
			$('html').css('font-size','calc(1024 / 320 * 50px)')
		}
	}else{
		(function flexible (window, document) {
		  var docEl = document.documentElement
		  var dpr = window.devicePixelRatio || 1

		  // adjust body font size
		  function setBodyFontSize () {
		    if (document.body) {
		      document.body.style.fontSize = (12 * dpr) + 'px'
		    }
		    else {
		      document.addEventListener('DOMContentLoaded', setBodyFontSize)
		    }
		  }
		  setBodyFontSize();

		  // set 1rem = viewWidth / 10
		  function setRemUnit () {
		    var rem = docEl.clientWidth / 7.5
		    docEl.style.fontSize = rem + 'px'
		  }

		  setRemUnit()

		  // reset rem unit on page resize
		  window.addEventListener('resize', setRemUnit)
		  window.addEventListener('pageshow', function (e) {
		    if (e.persisted) {
		      setRemUnit()
		    }
		  })

		  // detect 0.5px supports
		  if (dpr >= 2) {
		    var fakeBody = document.createElement('body')
		    var testElement = document.createElement('div')
		    testElement.style.border = '.5px solid transparent'
		    fakeBody.appendChild(testElement)
		    docEl.appendChild(fakeBody)
		    if (testElement.offsetHeight === 1) {
		      docEl.classList.add('hairlines')
		    }
		    docEl.removeChild(fakeBody)
		  }
		}(window, document))
	}
}
function add0(m){return m<10?'0'+m:m }
function format(){
	var time = new Date();
	var y = time.getFullYear();
	var m = time.getMonth()+1;
	var d = time.getDate();
	var h = time.getHours();
	var mm = time.getMinutes();
	var s = time.getSeconds();
	return y+'-'+add0(m)+'-'+add0(d)+' '+add0(h)+':'+add0(mm)+':'+add0(s);
}
export default
{
  globalBaseUrl,
  shouquan,
  // shouquan1,
  format,
  getRootId
}
</script>
