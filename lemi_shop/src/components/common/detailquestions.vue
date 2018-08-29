<template>
	<div class="detailquestions">
		<div class="answerUp" @click="todetail(item.id)">
			<!-- <div class="answerUp"> -->
		  	<div style="margin:0 0.4rem;">
		  		<div class="answer">
		  			<div class="personal">
		  				<ul>
		  					<li>
		  						<img :src="item.face">
		  					</li>
		  					<li>
		  						<span class="name">{{item.nickname}}</span>
		  					</li>
		  				</ul>
		  				<!-- <span class="time">{{item.create_time}}</span> -->
		  			</div>
		  			<div class="problem">
		  				{{item.question}}
		  			</div>
		  			<div style="position:relative" v-if="item.status == 2">
		  				<!-- <div class="voice" @click="tap(item.id)"> -->
		  				<div class="voice">
		  					<img src="../../../static/img/audioBg.png" style="width: 3.6rem;position:absolute">
		  					<svg t="1509953101934" class="icon" style="position: absolute;color: #fff;left: 0.2rem;top:0.15rem;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2969" xmlns:xlink="http://www.w3.org/1999/xlink" width="0.4rem" height="0.4rem">
		  						<path d="M243.90439 513.708336m-115.375401 0a115.375402 115.375402 0 1 0 230.750803 0 115.375402 115.375402 0 1 0-230.750803 0Z" p-id="2970" fill="#ffffff"></path>
		  						<path v-show="playing2" d="M742.851803 949.902074c204.798938-254.072682 203.298946-623.702766-3.387983-876.241456-15.39292-18.807902-31.011839-35.879814-47.030756-51.738732-30.093844-29.793846-78.857591-29.00585-108.674436 1.065995-30.581841 30.84384-29.424847 80.99158 2.362988 110.591426 3.386982 3.153984 5.615971 5.269973 6.139968 5.81097 200.876958 207.371925 202.41995 536.758217 2.840985 745.955132-0.481998 0.505997-2.554987 2.505987-5.72397 5.506971-31.547836 29.875845-32.294833 80.034585-1.441993 110.627427 30.061844 29.806845 78.815591 30.185843 108.646437 0.147999 15.769918-15.880918 31.135839-32.950829 46.26876-51.725732z" p-id="2971" fill="#ffffff"></path>
		  						<path v-show="playing" d="M559.939751 733.196198c-13.657929 19.437899-28.634852 37.113808-44.591768 53.023725-29.387848 29.300848-77.296599 28.509852-106.766447-0.709996l-1.434992-1.422993c-31.764835-31.495837-30.189843-82.84857 2.879985-112.437417 6.804965-6.088968 11.64394-10.720944 12.957933-12.333936 71.27963-87.533546 68.601644-214.704887-7.084964-299.235448-0.594997-0.663997-2.837985-2.712986-6.239967-5.664971-33.670825-29.211849-35.896814-80.846581-4.510977-112.500416 29.815845-30.070844 78.822591-31.441837 108.949435-1.682992 15.48692 15.297921 30.067844 32.249833 43.444775 50.855737 93.686514 130.322324 94.672509 310.784388 2.396987 442.108707z" p-id="2972" fill="#ffffff"></path>
		  					</svg>
		  					<span>{{overheard | zhengshu}}元偷偷听</span>
		  				</div>
		  				<span class="listlenCount">听过 {{item.eavesdrop_nums}}</span>
		  			</div>
		  		</div>
		  	</div>
	  	</div>
	</div>
</template>
<script>
	import {MessageBox } from 'mint-ui';
	export default{
		props:{
			item:Object,
			overheard:String,
		},
		data(){
			return{
				playing:true,
				playing2:true,
			}
		},
		created(){
			// this.global.shouquan();
		},
		methods:{
			todetail(id){
				if(window.location.href.indexOf('ser_id') != -1){
					this.$router.push({path:'reply2',query:{id:id,type:'2',status:'2',ser_id:this.$route.query.ser_id}})
				}else if(window.location.href.indexOf('vid') != -1){
					this.$router.push({path:'reply2',query:{id:id,type:'1',status:'2',vid:this.$route.query.vid}})
				}
			},
			tap(id){
				console.log(1111)
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
					if(window.location.href.indexOf('ser_id') != -1){
						$.ajax({
							type:'post',
							async:false,
							url:self.global.globalBaseUrl+'/shop-v1-ask_cat_answer.html',
							data:{type:'2',id:id},
							xhrFields: {
					          withCredentials: true
					       	},
					       	crossDomain: true,
							success:function(res){
								res = eval('('+res+')');
								if(res.status == 1){
									$('#audio').attr('src',res.voice);
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
								}else if(res.status == 0){
									// MessageBox.confirm('是否跳到支付页面?').then(action => {
									// 	self.$router.push({path:'/toPay',query:{type:'2',askId:id,order_type:'2',ser_id:self.$route.query.ser_id}})
									// });
								}
								$("audio")[0].play();
							}
						})
					}else if(window.location.href.indexOf('vid') != -1){
						$.ajax({
							type:'post',
							async:false,
							url:self.global.globalBaseUrl+'/shop-v1-ask_cat_answer.html',
							data:{type:'1',id:id},
							xhrFields: {
					          withCredentials: true
					        },
					        crossDomain: true,
							success:function(res){
								res = eval('('+res+')');
								if(res.status == 1){
									$('#audio').attr('src',res.voice);
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
								}else if(res.status == 0){
									// MessageBox.confirm('是否跳到支付页面?').then(action => {
									// 	self.$router.push({path:'/toPay',query:{type:'1',askId:id,order_type:'2',vid:self.$route.query.vid}})
									// });
								}
								$("audio")[0].play();
							}
						})
					}
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
	.detailquestions{
		.answerUp{
			background-color: #fff;
			margin-bottom: 0.15rem;
			height: auto;
		}
		.answer .listlenCount{
			position: absolute;
			right: 0;
			line-height: 1.2rem;
			color: #999;
		}
		.answer .personal ul{
			width: 100%;
		}
		.answer .personal ul li{
			float: left;
		}
		.answer .personal ul li:nth-child(2){
			line-height: 0.6rem;
			margin-left: 0.2rem;
			color: #999;
		}
		.answer .personal{
			display: block;
	    	height: 0.66rem;
	    	padding-top: 0.2rem;
	    	.time{
	    		float: right;
	    		line-height: 0.66rem;
	    	}
		}
		.answer .name{
			font-size: 0.24rem;
		}
		.answer .problem{
			font-size: 0.28rem;
			color: #333;
			margin-top: 0.1rem;
		}
		.answer .voice{
			height: 0.7rem;
			width: 4rem;
			// background-color: #fe5875;
			display: inline-block;
	    	border-radius: 0.8rem;
	    	margin-top: 0.2rem;
	    	// text-align: center;
	    	position: relative;
		}
		.answer .voice i{
			position: absolute;
			color: #fff;
			line-height: 0.8rem;
			left: 0.2rem;
		}
		.answer .voice span{
			line-height: 0.7rem;
			color: #fff;
			font-size: 0.26rem;
			display: inline-block;
			position: absolute;
    		left: 1.1rem;
		}
		.answer .personal img{
			height: 0.6rem;
			width: 0.6rem;
			border-radius: 0.6rem;
		}
		.answer{
			width: 100%;
			padding-bottom: 0.2rem;
			// height: 2.6rem;
		}
	}
</style>