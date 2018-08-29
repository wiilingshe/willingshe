<template>
	<div class="reply" id="reply">
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
					<img src="../../../../static/img/audioBg.png">
					<svg t="1509953101934" class="icon" style="position: absolute;color: #fff;left: 0.2rem;top:0.15rem;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2969" xmlns:xlink="http://www.w3.org/1999/xlink" width="0.4rem" height="0.4rem">
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
		  		overheard:'',
			}
		},
		created(){
			var self = this;
			this.global.shouquan();
			this.noShare();
			Indicator.open();
			// 图片预览
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
					        }]
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
			// 判断语音有没有回答
			if(this.$route.query.status === '-1'){
				this.postData('post','/shop-v2-ask_listen.html',{type:self.$route.query.type,id:self.$route.query.id}).then(res => {
					if(res.data.status == 1){
						self.ifanswer = true;
					}
				})
			}else if(this.$route.query.status == 2){
				self.ifanswer = true;
			}
			// 费用
			this.postData('post','/shop-v2-ask_get_fee.html',{fee_type:2,is_public:1}).then(res => {
				this.overheard = res.data.total_fee;
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
								MessageBox.confirm('需付费收听，是否跳转到支付页面?').then(action => {
									if(self.$route.query.type == 2){
										// 偷听
										self.$router.push({path:'/toPay',query:{type:'2',askId:self.$route.query.id,order_type:'2',ser_id:self.$route.query.ser_id,status:self.$route.query.status,is_public:1}})
									}else if(self.$route.query.type == 1){
										self.$router.push({path:'/toPay',query:{type:'1',askId:self.$route.query.id,order_type:'2',vid:self.$route.query.vid,status:self.$route.query.status,is_public:1}})
									}
								});
							}
						}
					});
					$("audio")[0].play();
				}
			}
		},
		filters:{
			zhengshu(val){
				val = Math.round(val);
				return val;
			}
		}
	}
</script>
<style lang="less">
	.reply{
		font-size: 0.26rem;
		background-color: #fff;
		height: 100%;
		/*-webkit-user-select:none;*/
		.voice{
			height: 0.7rem;
		    width: 4rem;
		    // background-color: #fe5875;
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
    		bottom: 0;
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
	.reply .operating{
		text-align: center;
		width: 100%;
		background-color: #fff;
		height: 2.4rem;
		margin-top: 0.5rem;
	}
	.reply .operating ul li{
		float: left;
		width: 33.3333%
	}
	.reply .operating .record{
		height: 1.72rem;
		width: 1.72rem;
		border-radius: 1.8rem;
		display: inline-block;
		background-color:rgb(28, 37, 44);

	}
	.reply .operating .record2{
		height: 1.72rem;
		width: 1.72rem;
		border-radius: 1.8rem;
		display: inline-block;
		background-color:#F44336;

	}
	.reply .operating .record2 i,
	.reply .operating .record i{
		color: #fff;
		line-height: 1.72rem;
		font-size: 1rem;
	}
	.reply .operating ul li:nth-child(1),
	.reply .operating ul li:nth-child(3){
		line-height: 1.72rem;
	}
	.reply .operating .again,
	.reply .operating .set{
		height: 1rem;
		width: 1rem;
		border-radius: 1rem;
		display: inline-block;
		background-color: #d6d6d6;
		text-align: center;
		line-height: 1rem;
		color: #fff;
	}
	.reply .operating .again1{
		height: 1rem;
		width: 1rem;
		border-radius: 1rem;
		display: inline-block;
		background-color: #F44336;
		text-align: center;
		line-height: 1rem;
		color: #fff;
	}
	.reply .problem1{
		background-color: #fff;
		font-size: 0.28rem;
		padding: 0 0.1rem 0.1rem 0.3rem;
		color: #333;

	}
	.reply .time{
		background-color: #fff;
		padding: 0.1rem 0.3rem;
		color: #999;
	}
	.reply .xiangqing{
		height: 0.6rem;
		width: 100%;
		background-color: #fff;
		font-size: 0.26rem;
		padding: 0.2rem 0 0.1rem 0;
		color: #333;
	}
	.reply .xiangqing ul li{
		float: left;
	}
	.reply .xiangqing ul li:nth-child(1){
		margin-left: 0.3rem;
	}
	.reply .xiangqing ul li:nth-child(2){
		line-height: 0.6rem;
		margin-left: 0.2rem;
	}
	.reply .xiangqing ul li:nth-child(3){
		float: right;
		margin-right: 0.3rem;
		line-height: 0.6rem;
		color: red;
		font-size: 0.28rem;
	}
	.reply .xiangqing img{
		width: 0.6rem;
		height: 0.6rem;
		border-radius: 0.6rem;
	}
	.reply .xiangqing .name{
		font-size: 0.26rem;
	}
</style>