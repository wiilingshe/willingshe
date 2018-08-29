<template>
	<div>
		<button @click="startRecord()">录音</button>
		<button @click="stopRecord()">停止录音</button>
		<button @click="playVoice()">播放录音</button>
		<button @click="stopVoice()">停止播放</button>
		<a href="/applyLive" style="font-size:0.26rem">跳转</a>
	</div>
</template>
<script>
	import wx from 'weixin-js-sdk'
	export default{
		data(){
			return{
				recording:'',
				appId:'',
				nonceStr:'',
				timestamp:'',
				signature:'',
			}
		},
		created(){
			this.global.shouquan();
			this.postData('post','/shop-v1-pay_jssign.html',{url:window.location.href}).then(res => {
				console.log(res)
				if(res.data.status == 1){
					this.appId = res.data.sign.appId;
					this.nonceStr = res.data.sign.nonceStr;
					this.timestamp = res.data.sign.timestamp;
					this.signature = res.data.sign.signature;
					wx.config({
					    // debug: true, 
					    appId: this.appId, 
					    timestamp:this.timestamp, 
					    nonceStr: this.nonceStr, 
					    signature: this.signature,
					    jsApiList: ['startRecord','stopRecord','playVoice'] 
					});
				}
			})
		},
		mounted(){

		},
		methods:{
			config(){
				var self = this;
				wx.config({
					appId: self.appId, 
					timestamp:self.timestamp, 
					nonceStr: self.nonceStr, 
					signature: self.signature,
					jsApiList: ['startRecord','stopRecord','playVoice'] 
				});
			},
			startRecord(){
				this.config();
				wx.ready(function(){
					wx.startRecord({
						cancel: function () {
					       alert('用户拒绝授权录音');
					    }
					});
				});
			},
			stopRecord(){
				var self = this;
				this.config();
				wx.ready(function(){
					wx.stopRecord({
					    success: function (res) {
					        self.recording = res.localId;
					    },
					    fail: function (res) {
					        alert(JSON.stringify(res));
					    }
					});
				});
			},
			playVoice(){
				var self = this;
				this.config();
				wx.ready(function(){
					if (self.recording == '') {
				      alert('请先使用 startRecord 接口录制一段声音');
				      return;
				    }
				    console.log(self.recording)
				    wx.playVoice({
				      localId: self.recording
				    });
			    });
			},
			stopVoice(){
				var self = this;
				this.config();
				wx.pauseVoice({
				    localId: self.recording
				});
				wx.ready(function(){
					wx.stopVoice({
					    localId: self.recording
					});
			    });
			}
		}
	}
</script>
<style>
</style>