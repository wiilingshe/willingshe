<template>
	<div class="reply22" id="reply">
		<audio id="audio" v-show="false"></audio>
		<img src="" id="pic1" style="display:none">
		<img src="" id="pic2" style="display:none">
		<div class="xiangqing">
			<ul>
				<li>
					<img :src="arr.face">
				</li>
				<li>
					<span class="name">{{arr.nickname}}</span>
				</li>
				<!-- <li style="qian">¥10</li> -->
			</ul>
		</div>
		<div>
			<div class="problem1">
				{{arr.question}}
			</div>
			<div class="pic">
				<img class="preview-img" v-for="(item, index) in list" :src="item.src" height="100" @click="$preview.open(index, list)">
			</div>
			<div style="background-color:#fff;" v-if="ifanswer">
				<div class="voice" @click="play()">
					<img src="../../static/img/audioBg.png">
					<svg t="1509953101934" class="icon" style="position: absolute;color: #fff;left: 0.2rem;top:0.13rem;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2969" xmlns:xlink="http://www.w3.org/1999/xlink" width="0.4rem" height="0.4rem">
						<path d="M243.90439 513.708336m-115.375401 0a115.375402 115.375402 0 1 0 230.750803 0 115.375402 115.375402 0 1 0-230.750803 0Z" p-id="2970" fill="#ffffff"></path>
						<path v-show="playing2" d="M742.851803 949.902074c204.798938-254.072682 203.298946-623.702766-3.387983-876.241456-15.39292-18.807902-31.011839-35.879814-47.030756-51.738732-30.093844-29.793846-78.857591-29.00585-108.674436 1.065995-30.581841 30.84384-29.424847 80.99158 2.362988 110.591426 3.386982 3.153984 5.615971 5.269973 6.139968 5.81097 200.876958 207.371925 202.41995 536.758217 2.840985 745.955132-0.481998 0.505997-2.554987 2.505987-5.72397 5.506971-31.547836 29.875845-32.294833 80.034585-1.441993 110.627427 30.061844 29.806845 78.815591 30.185843 108.646437 0.147999 15.769918-15.880918 31.135839-32.950829 46.26876-51.725732z" p-id="2971" fill="#ffffff"></path>
						<path v-show="playing" d="M559.939751 733.196198c-13.657929 19.437899-28.634852 37.113808-44.591768 53.023725-29.387848 29.300848-77.296599 28.509852-106.766447-0.709996l-1.434992-1.422993c-31.764835-31.495837-30.189843-82.84857 2.879985-112.437417 6.804965-6.088968 11.64394-10.720944 12.957933-12.333936 71.27963-87.533546 68.601644-214.704887-7.084964-299.235448-0.594997-0.663997-2.837985-2.712986-6.239967-5.664971-33.670825-29.211849-35.896814-80.846581-4.510977-112.500416 29.815845-30.070844 78.822591-31.441837 108.949435-1.682992 15.48692 15.297921 30.067844 32.249833 43.444775 50.855737 93.686514 130.322324 94.672509 310.784388 2.396987 442.108707z" p-id="2972" fill="#ffffff"></path>
					</svg>
					<!-- <i class="iconfont icon-audio-left"></i>  -->
					<span>点击播放</span>
				</div>
			</div>
			<div class="time">
				{{arr.create_time}}
			</div>
		</div>
		<div class="operating" :class="{operating1:ifHeight}">
			<div style="color:#666;position:relative;top:-0.2rem;">点击录音进行语音回答，不用长按，<br/>最多录制60秒，点击开始。</div>
			<ul>
				<li @click="set()">
					<span class="set">发送</span>
				</li>
				<li @mousedown="startRecord(status)">
					<span :class="{record:status,record2:!status}">
						<i class="iconfont icon-zhubo1"></i>
						<div style="color:#fff;position:relative;top:-0.2rem;">{{tip}}</div>
					</span>
				</li>
				<li>
					<span :class="{again:bofang,again1:!bofang}" @click="playVoice()">{{text}}</span>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
	import wx from 'weixin-js-sdk'
	import { Toast,MessageBox,Indicator } from 'mint-ui';
	export default{
		data(){
			return{
				status:true,
				recording:'',
				appId:'',
				nonceStr:'',
				timestamp:'',
				signature:'',
				arr:[],
				ifanswer:false,
				ifHeight:false,
				text:'播放',
				bofang:true,
				playing:true,
				playing2:true,
		  		list:[],
		  		tip:'录音',
			}
		},
		created(){
			var self = this;
			this.global.shouquan();
			this.noShare();
			Indicator.open();
			this.postData('post','/shop-v1-pay_jssign.html',{url:window.location.href}).then(res => {
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
					    jsApiList: ['startRecord','stopRecord','playVoice','uploadVoice','onVoiceRecordEnd'] 
					});
				}
			});
			this.postData('post','/shop-v2-ask_detail.html',{id:this.$route.query.id}).then(res => {
				if(res.data.status == 1){
					this.arr = res.data.data;
					if(res.data.data.pic1 != null && res.data.data.pic2 != null){
				        $('#pic1').attr('src',res.data.data.pic1)
						$('#pic2').attr('src',res.data.data.pic2)
						setTimeout(function(){
							var a = $('#pic1').width()
							var b = $('#pic1').height()
							var c = $('#pic2').width()
							var d = $('#pic2').height()
							self.list= [{
					          src: res.data.data.pic1,
					          w: a,
					          h: b
					        }, {
					          src: res.data.data.pic2,
					          w: c,
					          h: d
					        }];
					        Indicator.close();
						},1000)
					}else if(res.data.data.pic1 != null && res.data.data.pic2 == null){
						$('#pic1').attr('src',res.data.data.pic1)
						setTimeout(function(){
							var a = $('#pic1').width()
							var b = $('#pic1').height()
							self.list= [{
					          src: res.data.data.pic1,
					          w: a,
					          h: b
					        }]
					        Indicator.close();
						},1000)
					}else if(res.data.data.pic1 == null && res.data.data.pic2 != null){
						$('#pic1').attr('src',res.data.data.pic2)
						setTimeout(function(){
							var a = $('#pic1').width()
							var b = $('#pic1').height()
							self.list= [{
					          src: res.data.data.pic2,
					          w: a,
					          h: b
					        }]
					        Indicator.close();
						},1000)
					}else{
						Indicator.close();
					}
				}
			})
		},
		mounted(){
			var screenHeight = document.body.clientHeight;
			var showHeight = $('#reply').height();
	  		if(showHeight <= screenHeight){
			    this.ifHeight = true
			}
		},
		methods:{
			config(){
				var self = this;
				wx.config({
					appId: self.appId, 
					timestamp:self.timestamp, 
					nonceStr: self.nonceStr, 
					signature: self.signature,
					jsApiList: ['startRecord','stopRecord','playVoice','uploadVoice','onVoiceRecordEnd','stopVoice'] 
				});
			},
			startRecord(type){
				if(this.ifanswer == true){
					Toast({
						message:'问题已回答',
						duration:1000
					})
					return false;
				}
				var self = this;
				this.config();
				if(type == true){
					wx.ready(function(){
						wx.startRecord({
							success: function(){
				               self.status = !type;
				               self.tip = '录音中';
				            },
							cancel: function () {
						       alert('用户拒绝授权录音');
						    }
						});
					});
					wx.onVoiceRecordEnd({
					    // 录音时间超过一分钟没有停止的时候会执行 complete 回调
					    complete: function (res) {
					    	self.status = type;
					        self.recording = res.localId;
					        self.tip = '重录';
					    }
					});

				}else{
					wx.ready(function(){
						wx.stopRecord({
						    success: function (res) {
						        self.recording = res.localId;
						        self.status = !type;
						        self.tip = '重录';
						        Toast({
						        	message:'录制成功，点击播放可收听，点击发送可发送语音',
						        	duration:1500
						        })
						    },
						    fail: function (res) {
						        alert(JSON.stringify(res));
						    }
						});
					});
				}
			},
			playVoice(){
				var self = this;
				this.config();
				if(this.bofang == true){
					wx.ready(function(){
						if (self.recording == '') {
					      alert('请先录制声音回答问题');
					      return;
					    }
					    wx.playVoice({
					      localId: self.recording,
					      success:function(){
					      	self.bofang = false;
					      	self.text = '停止';
					      }
					    });
					    wx.onVoicePlayEnd({
						    success: function (res) {
						        self.recording = res.localId; // 返回音频的本地ID
						        self.bofang = true
						        self.text = '播放';
						    }
						});
				    });
				}else{
					self.bofang = true
					self.text = '播放';
					console.log(self.recording)
					wx.ready(function(){

						wx.stopVoice({
						    localId: self.recording
						});
					});
				}
			},
			set(){
				if(this.ifanswer == true){
					Toast({
						message:'问题已回答，无需重复回答',
						duration:1000
					})
					return false;
				}
				var self = this;
				this.config();
				if(self.recording != ''){
					MessageBox.confirm('确定提交回答?').then(action => {
						wx.ready(function(){
							wx.uploadVoice({
							    localId: self.recording,
							    isShowProgressTips: 1,
							    success: function (res) {
							        var serverId = res.serverId;
							        self.postData('post','/shop-v2-ask_answer.html',{'type':self.$route.query.type,'id':self.$route.query.id,'voice':serverId}).then(res => {
							        	if(res.data.status == 1){
							        		self.ifanswer = true;
							        		Toast({
											  message: '回答成功',
											  duration: 1000
											});
							        	}else if(res.data.status == 0){
							        		Toast({
											  message: res.data.msg,
											  duration: 1000
											});
							        	}
							        })
							    }
							});
					    });
					});
				}else{
					Toast({
					  message: '请先录制声音回答问题',
					  duration: 1000
					});
				}
			},
			play(){
				var self = this;
				var IntervalName;
				if($('#audio').attr('src') == undefined || $('#audio').attr('src') == ''){
					play()
					return false;
				}else{
					$('#audio').attr('src','')
					return false
				}
				function play(){
					$.ajax({
						type:'post',
						async: false,
						url:self.global.globalBaseUrl+'/shop-v2-ask_listen.html',
						data:{id:self.$route.query.id},
						xhrFields: {
				          withCredentials: true
				       },
				       crossDomain: true,
						success:function(res){
							res = eval('('+res+')')
							if(res.status == 1){
								$('#audio').attr('src',res.voice)
								IntervalName = setInterval(function(){
									if(self.playing == true && self.playing2 == true){
										self.playing = false;
										self.playing2 = false;
									}else if(self.playing == false && self.playing2 == false){
										self.playing = true;
										self.playing2 = false;
									}else if(self.playing == true && self.playing2 == false){
										self.playing = true;
										self.playing2 = true;
									}
									if($('#audio').attr('src') == undefined || $('#audio').attr('src') == ''){
										window.clearInterval(IntervalName);
									    self.playing = true;
										self.playing2 = true;
									}
								},400)
								audio.addEventListener('ended', function () {
									window.clearInterval(IntervalName);
								    self.playing = true;
									self.playing2 = true;
									$('#audio').attr('src','')
								}, false);
							}else{
								$('#audio').attr('src','')
							}
						}
					});
					$("audio")[0].play();
				}
			}
		}
	}
</script>
<style lang="less">
	.reply22{
		font-size: 0.26rem;
		background-color: #fff;
		height: 100%;
		/*-webkit-user-select:none;*/
		.voice{
			height: 0.8rem;
		    width: 4rem;
		    // background-color: #f39d40;
		    display: inline-block;
		    border-radius: 0.8rem;
		    margin-top: 0.1rem;
		    // text-align: center;
		    position: relative;
		    margin-left: 0.3rem;
		    i{
		    	position: absolute;
			    color: #fff;
			    line-height: 0.8rem;
			    left: 0.2rem;
		    }
		    span{
		    	line-height: 0.7rem;
			    color: #fff;
			    font-size: 0.26rem;
			    display: inline-block;
			    position: absolute;
			    left: 1.2rem;
		    }
		    img{
		    	width: 3.6rem;
		    	position: absolute;
		    }
		}
		.operating1{
			position: absolute;
    		bottom: 0.4rem;
		}
		.pic{
			background-color: #fff;
			height: auto;
			margin-left: 0.1rem;
			img{
				margin-left: 0.2rem;
			}
		}
	}
	.reply22 .operating{
		text-align: center;
		width: 100%;
		background-color: #fff;
		height: 2.4rem;
		margin-top: 0.5rem;
	}
	.reply22 .operating ul li{
		float: left;
		width: 33.3333%
	}
	.reply22 .operating .record{
		height: 1.72rem;
		width: 1.72rem;
		border-radius: 1.8rem;
		display: inline-block;
		background-color:rgb(28, 37, 44);

	}
	.reply22 .operating .record2{
		height: 1.72rem;
		width: 1.72rem;
		border-radius: 1.8rem;
		display: inline-block;
		background-color:#F44336;

	}
	.reply22 .operating .record2 i,
	.reply22 .operating .record i{
		color: #fff;
		line-height: 1.32rem;
		font-size: .9rem;
	}
	.reply22 .operating ul li:nth-child(1),
	.reply22 .operating ul li:nth-child(3){
		line-height: 1.72rem;
	}
	.reply22 .operating .again,
	.reply22 .operating .set{
		height: 1rem;
		width: 1rem;
		border-radius: 1rem;
		display: inline-block;
		background-color: #d6d6d6;
		text-align: center;
		line-height: 1rem;
		color: #fff;
	}
	.reply22 .operating .again1{
		height: 1rem;
		width: 1rem;
		border-radius: 1rem;
		display: inline-block;
		background-color: #F44336;
		text-align: center;
		line-height: 1rem;
		color: #fff;
	}
	.reply22 .problem1{
		background-color: #fff;
		font-size: 0.3rem;
		padding: 0 0.1rem 0.1rem 0.3rem;
		color: #333;

	}
	.reply22 .time{
		background-color: #fff;
		padding: 0.1rem 0.3rem;
		color: #999;
	}
	.reply22 .xiangqing{
		height: 0.6rem;
		width: 100%;
		background-color: #fff;
		font-size: 0.26rem;
		padding: 0.2rem 0 0.1rem 0;
		color: #333;
	}
	.reply22 .xiangqing ul li{
		float: left;
	}
	.reply22 .xiangqing ul li:nth-child(1){
		margin-left: 0.3rem;
	}
	.reply22 .xiangqing ul li:nth-child(2){
		line-height: 0.6rem;
		margin-left: 0.2rem;
	}
	.reply22 .xiangqing ul li:nth-child(3){
		float: right;
		margin-right: 0.3rem;
		line-height: 0.6rem;
		color: red;
		font-size: 0.28rem;
	}
	.reply22 .xiangqing img{
		width: 0.6rem;
		height: 0.6rem;
		border-radius: 0.6rem;
	}
	.reply22 .xiangqing .name{
		font-size: 0.26rem;
	}
</style>