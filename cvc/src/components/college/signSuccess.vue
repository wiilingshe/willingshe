<template>
	<div class="signSuccess" :class="returnData?'':'signSuccess-no'">
		<div class="signSuccess-content">
			<img id="card_pic" :src="pic" class="signSuccess-content-img">
			<div class="signSuccess-content-tips">
				<img src="../../../static/img/college/becomeMember/Instructions.png" alt="">
				<span class="tipsCont">长按保存图片，或发给朋友</span>
			</div>
			<div class="signSuccess-content-legend" v-show="signType==1">
				<h1>请假说明</h1>
				<p><span class="left disc" > • </span><span class="left txt">为保证现场听课的学习效果，希望同学们按时出席。</span></p>
				<p><span class="left disc" > • </span><span class="left txt">当天未签到、未请假的学员，将无法参与接下来1个月的线下学习活动；</span></p>
				<p><span class="left disc" > • </span><span class="left txt">学期内请假3次的同学，将全年无法报名摄客学院的线下学习活动。</span></p>
			</div>
			<div class="signSuccess-content-legend" v-show="signType==2">
				<h1>请假说明</h1>
				<p><span class="left txt">为保证现场听课的学习效果，希望同学们按时出席。<br>如不能到场将不退款，咨询微信号：CVC100001</span></p>
			</div>
		</div>
		<div class="myLayer" v-show="cancelPop==true">
			<div class="shade" @click="closePop()"></div>
			<div class="cancelBox" v-show="cancelPop==true">
				<div class="cancelBox-mask">
					<div class="cancelBox-content">
						<div class="cancelTitle">
							取消报名
						</div>
						<p class="cancelCont">您将取消【{{result.title}}】主会场听课席位。</p>
						<p class="notice">注：取消2次后，将无法报名该课程的现场活动。若当天旷课，将取消三个月内所有现场可报名资格。</p>
						<div class="btn">
							<span class="cancelbtn" @click="closePop()">关闭</span>
							<span @click="canClick?toCancelSign():''">立即请假</span>
						</div>
					</div>
				</div>
			</div>
		</div>
		
		<div class="footerBtn" v-show="canCancel==1">
			<span class="cancel left" @click="cancelSign()">取消报名</span>
			<span class="back left" @click="backToDetail()">返回活动详情</span>
		</div>
		<div class="footerBtn" v-show="canCancel==0">
			<span class="back2 left" @click="backToDetail()">返回活动详情</span>
		</div>
	</div>
</template>
<script>
	import {Toast } from 'mint-ui'
	import { Indicator } from 'mint-ui'
	import '../../../static/css/animate.min.css'
	export default{
		data(){
			return{
				sort:'free',
				cancelPop:false,
				list:['../../../static/img/college/cards_bg.png','../../../static/img/logo.png','name','title','../../../static/img/college/time_gold.png','Date','../../../static/img/college/address_gold.png','address','../../../static/img/ceshi.png'],
				pic:'',
				canCancel:'',
				canClick:true,
				returnData:false,
				signType:'',
				result:[],
			}
		},
		created(){
			this.global.shouquan();
			document.title='活动邀请卡';
			Indicator.open({
			  spinnerType: 'snake'
			});
			$.fn.extend({  //jq自定义动画函数
			  animateCss: function(animationName, callback) {
			    var animationEnd = (function(el) {
			      var animations = {
			        animation: 'animationend',
			        OAnimation: 'oAnimationEnd',
			        MozAnimation: 'mozAnimationEnd',
			        WebkitAnimation: 'webkitAnimationEnd',
			      };
			      for (var t in animations) {
			        if (el.style[t] !== undefined) {
			          return animations[t];
			        }
			      }
			    })(document.createElement('div'));
			    this.addClass('animated ' + animationName).one(animationEnd, function() {
			      $(this).removeClass('animated ' + animationName);

			      if (typeof callback === 'function') callback();
			    });
			    return this;
			  },
			});
		},
		mounted(){
			var self=this;
			var urlLink = window.location.href;
			this.getData('post','/shop-v2-college-line_active_my_sign_card.html',{
				car_id:this.$route.query.car_id,
				url_link:urlLink
			}).then(res=>{
				if(res.data.status==1){
					self.result=res.data.data;
					self.list[1] = res.data.data.face;
					self.list[2] = res.data.data.nickname;
					self.list[3] = res.data.data.title;
					self.list[5] = res.data.data.start_time;
					self.list[7] = res.data.data.address;
					self.list[8] = res.data.data.qr_code;
					self.canCancel = res.data.data.can_cancel;
					self.signType = res.data.data.sign_type;
					self.synthesis(self.list);
					self.returnData=true;
					Indicator.close();
				}else{
					self.synthesis(self.list);
					self.returnData=true;
					Indicator.close();
				}
			})
		},
		methods:{
			getCharNum(str){//获取字符串字符数
		    var char = str.replace(/[^\x00-\xff]/g, '**');
		    return char.length;
			},
			clippingChar(str, len){ //截取字符串 
		    var regexp = /[^\x00-\xff]/g;// 正在表达式匹配中文  
		    // 当字符串字节长度小于指定的字节长度时  
		    if (str.replace(regexp, "aa").length <= len) {  
		      return str;  
		    }  
		    //假设指定长度内都是中文  
		    var m = Math.floor(len/2);  
		    for (var i = m, j = str.length; i < j; i++) {  
	        // 当截取字符串字节长度满足指定的字节长度  
	        if(str.substring(0, i).replace(regexp, "aa").length >= len) {  
            return str.substring(0, i);  
	        }  
		    }  
		    return str;  
			},
			synthesis(list){
				var self = this;
				self.list = list;
				var mycanvas = document.createElement('canvas');
					var len = self.list.length;
					document.body.appendChild(mycanvas);
					$('canvas').css('display', 'none');
					mycanvas.width = 690;
					mycanvas.height = 1230;
					var context = mycanvas.getContext('2d');
					context.fillStyle = "#fff";
					context.fill();
					context.fillRect(0,0,mycanvas.width,mycanvas.height);
					context.beginPath();
					context.stroke();
					function drawing(num){
						if(num<len){
							var img=new Image;
							img.crossOrigin="*";
							img.src = self.list[num];
							if(num==0){
								img.onerror=function(){
									drawing(num+1);
								}
								img.onload = function(){
									context.drawImage(img,0,0,mycanvas.width,mycanvas.height);
									drawing(num+1);
								}
							}else if(num == 1){
								img.onerror=function(){
									drawing(num + 1);
								}
								img.onload=function(){
									context.save();
									context.arc(345,187,68,0,2*Math.PI,false);
									context.clip();
									context.drawImage(img,278,110,134,134);
									context.restore();
									drawing(num + 1);
								}
							}else if(num == 2){
								context.font="30px PingFang-SC-Bold bold";
								context.fillStyle="#222";
								context.textAlign="center";
								if(self.getCharNum(self.list[num])<=10){//限定字符数长度为12，即汉字数为6
									context.fillText(self.list[num],345,280);
								}else{
									context.fillText(self.clippingChar(self.list[num],10)+'...',345,280);
								}
								drawing(num + 1);
							}else if(num == 3){
								context.font= "32px PingFang-SC-Medium"
								context.fillStyle="#ECCE85";
								context.textAlign="left";
								console.log(self.getCharNum(self.list[3]));
								if(self.getCharNum(self.list[3])<=28){  //此处是根据标题是否长度溢出作处理，溢出则换行，后面的内容也跟着适配
									context.fillText(self.list[num],130,542);
								}else{
									var chr =self.list[num].split('');
									var temp = "";
									var row=[];
									for(var a = 0; a<chr.length; a++){
										if(context.measureText(temp).width < 420 ){
										}else{
											row.push(temp);
											temp="";
										}
										temp += chr[a];
									}
									row.push(temp);
									for(var b=0; b< row.length;b++){
										context.fillText(row[b],130,482+(b+1)*42);
									}
								}
								drawing(num + 1);
							}else if(num == 4){
								img.onerror=function(){
									drawing(num + 1);
								}
								img.onload=function(){
									if(self.getCharNum(self.list[3])<=28){
										context.drawImage(img,130,580,30,30);
									}else{
										context.drawImage(img,130,590,30,30);
									}
									drawing(num + 1);
								}
							}else if(num == 5){
								context.font="28px PingFang-SC-Light";
								context.fillStyle="#ECCE85";
								context.textAlign="left";
								if(self.getCharNum(self.list[3])<=28){
									context.fillText(self.list[num],175,605);
								}else{
									context.fillText(self.list[num],175,615);
								}
								drawing(num + 1);
							}else if(num == 6){
								img.onerror=function(){
									drawing(num + 1);
								}
								img.onload=function(){
									if(self.getCharNum(self.list[3])<=28){
										context.drawImage(img,130,635,28,35);
									}else{
										context.drawImage(img,130,635,28,35);
									}
									drawing(num + 1);
								}
							}else if(num == 7){
								context.font="28px PingFang-SC-Light";
								context.fillStyle="#ECCE85";
								context.textAlign="left";
								var chr =self.list[num].split('');
								var temp = "";
								var row=[];
								for(var a = 0; a<chr.length; a++){
									if(context.measureText(temp).width < 360 ){
									}else{
										row.push(temp);
										temp="";
									}
									temp += chr[a];
								}
								row.push(temp);
								if(self.getCharNum(self.list[3])<=28){
									for(var b=0; b< row.length;b++){
										context.fillText(row[b],175,620+(b+1)*42);
									}
								}else{
									for(var b=0; b< row.length;b++){
										context.fillText(row[b],175,620+(b+1)*42);
									}
								}
								drawing(num + 1)
							}else if(num == 8){
								img.onerror=function(){
									drawing(num + 1);
								}
								img.onload=function(){
									context.drawImage(img,255,940,180,180);
									drawing(num + 1);
								}
							}
							else{
								drawing(num + 1);
							}
						}else{
							self.pic = mycanvas.toDataURL("image/jpeg");
						}
					};
					drawing(0);
			},
			backToDetail(){
				this.$router.push({path:'/offCourseDetails',
					query:{
						ca_id:this.result.ca_id,
						active_id:this.result.active_id,
						car_id:this.result.car_id,
					}
				})
			},
			cancelSign(){
				$('.cancelBox').animateCss('zoomIn');
				this.cancelPop=true;
			},
			toCancelSign(){
				var self=this;
				this.getData('post','/shop-v2-college-line_active_cancel_sign.html',
					{
						car_id:this.$route.query.car_id
					}).then(res=>{
						if(res.data.status==1){
							Toast({
								message:res.data.msg,
								duration: 1500
							});
							self.canClick=false;
							setTimeout(function(){
								self.canClick=true;
								self.$router.push({path:'/offCourseDetails',
									query:{
										ca_id:self.$route.query.ca_id,
										active_id:self.$route.query.active_id,
										car_id:self.$route.query.car_id,
									}
								})
							},1500)
							self.cancelPop=false;
						}else{
							Toast({
								message:res.data.msg,
								duration: 1500
							});
							self.canClick=false;
							setTimeout(function(){
								self.canClick=true;
							},1500)
						}
					})
			},
			closePop(){
				var self = this;
				$('.cancelBox').animateCss('zoomOut', function() {
				  self.cancelPop=false;
				});
			}

		}
	}
</script>
<style>
	.cancelBox{
		-webkit-animation-duration: 0.2s;
		-moz-animation-duration: 0.2s;
		-o-animation-duration: 0.2s;
		-ms-animation-duration: 0.2s;
	}
</style>
<style lang="less">
	.signSuccess{
		height:100vh;
		font-size: 0.28rem;
		position: relative;
		&-no{
			opacity: 0;
		}
		&-content{
			width:100%;
			height: calc(~"100vh - 0.9rem");
			overflow-y: auto;
			overflow-x: hidden;
			-webkit-overflow-scrolling:touch;
			&-img{
				width:6.9rem;
				margin:0.3rem 0.3rem 0;
			}
			&-tips{
				width:100%;
				text-align: center;
				img{
					width:0.26rem;
					display: inline-block;
				}
				.tipsCont{
					font-size: 0.26rem;
					display: inline-block;
					color:#666;
				}
			}
			&-legend{
				padding:0.4rem 0.3rem;
				height: 3.5rem;
				h1{
					font-size: 0.28rem;
					color:#333;
					margin-bottom: 0.28rem;
				}
				p{
					font-size: 0.26rem;
					color: #666;
					line-height: 0.45rem;
				}
			}
		}
		.myLayer{
			position: relative;
			z-index: 998;
			.shade{
				position: fixed;
		    left: 0;
		    top: 0;
		    width: 100%;
		    height: 100%;
				background-color: #000;
				opacity: 0.7;
				/*z-index: 8;*/
				pointer-events:auto;
			}
			.cancelBox{
				display: table;
				width:100%;
				height:100%;
				position: fixed;
				left:0;
				top:0;
				/*z-index: 9;*/
				pointer-events:none;
				&-mask{
					display: table-cell;
					vertical-align: middle;
					text-align: center;
					/*z-index: 9;*/
				}
				&-content{
					display: inline-block;
					width:4.2rem;
					height:auto;
					background-color: #fff;
					/*z-index: 999;*/
					border-radius: 0.06rem;
					padding: 0 0.4rem;
					pointer-events:auto;
					.cancelTitle{
						font-size: 0.36rem;
						color:#333;
						font-weight: 600;
						margin-top: 0.4rem;
					}
					p{
						text-align: left;
						font-size: 0.3rem;
					}
					.cancelCont{
						color:#333;
						margin:0.3rem 0 0.2rem 0;
					}
					.notice{
						font-size: 0.26rem;
						color:#999;
					}
					.btn{
						width:100%;
						height:0.6rem;
						margin-top: 0.2rem;
						span{
							float: left;
							width:99%/2;
						}
						.cancelbtn{
							color:#999;
							border-right: 0.02rem solid #DDD;
						}
					}
				}
			}
		}
		.footerBtn{
			width:100%;
			height:0.9rem;
			position: absolute;
			bottom:0;
			left:0;
			.cancel{
				width:3rem;
				height:0.9rem;
				color:#fff;
				font-size: 0.3rem;
				line-height: 0.9rem;
				text-align: center;
				background-color: #666;
			}
			.back{
				width:4.5rem;
				height:0.9rem;
				line-height: 0.9rem;
				font-size: 0.3rem;
				color:#fff;
				background-color: #222;
				text-align: center;
			}
			.back2{
				width:100%;
				height:0.9rem;
				line-height: 0.9rem;
				font-size: 0.3rem;
				color:#fff;
				background-color: #222;
				text-align: center;
			}
		}
		.left{
			float: left;
		}
		.right{
			float: right;
		}
		.disc{
			width:3%;
		}
		.txt{
			width:97%;
		}
	}
</style>