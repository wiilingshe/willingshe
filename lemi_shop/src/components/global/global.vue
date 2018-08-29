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
