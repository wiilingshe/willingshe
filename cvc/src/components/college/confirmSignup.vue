<template>
	<div class="confirmSignup" :class="returnData?'':'confirmSignup-no'">
		<div class="confirmSignup-content">
			<div class="confirmSignup-content-banner">
				<img src="../../../static/img/college/confirmsignup/signup_bg.png" alt="">
				<div class="confirmInfo">
					<div class="infoTitle">{{result.title}}</div>
					<div class="infoBox">
						<img src="../../../static/img/college/confirmsignup/signup_time.png" alt="">
						<span>{{result.start_time}}</span>
					</div>
					<div class="infoBox addressCont">
						<img class="left" src="../../../static/img/college/confirmsignup/signup_place.png" alt="">
						<span class="left infoBox_address">{{result.address}}</span>
					</div>
					<div class="infoBox">
						<img src="../../../static/img/college/confirmsignup/signup_Chair.png" alt="">
						<span>余席 {{result.leave_num}}</span>
						<img class="ml52" src="../../../static/img/college/confirmsignup/signup_people.png" alt="">
						<span>已有{{result.attend_num}}人参加</span>
					</div>
				</div>
			</div>
			<div class="confirmSignup-content-legend">
				<h1>请假说明</h1>
				<p><span class="left disc" > • </span><span class="left txt">为保证现场听课的学习效果，希望同学们按时出席。</span></p>
				<p><span class="left disc" > • </span><span class="left txt">当天未签到、未请假的学员，将无法参与接下来1个月的线下学习活动；</span></p>
				<p><span class="left disc" > • </span><span class="left txt">学期内请假3次的同学，将全年无法报名摄客学院的线下学习活动。</span></p>
			</div>
		</div>
		<div class="footerBtn">
			<span class="footerBtn-mainVenue" v-if="leave_num>0" @click="canClick?isPop():''" :class="canClick?'':'footerBtn-mainVenue-none'">报名主会场</span>
			<span class="footerBtn-mainVenue" :class="'footerBtn-mainVenue-none'" v-if="leave_num==0">名额已满</span>
		</div>
		<div class="fillInformation" v-show="pop==true">
			<div class="mask" @click="cancel()"></div>
					<div class="fillInformation-content" v-show="pop==true">
						<div class="formBox" >
							<div class="fillTitle">
								报名信息
							</div>
							<div class="iptBox bottomBorder">
								<span class="iptName left">姓名</span>
								<input type="text" name="contact_name" placeholder="请输入姓名" :value="nametext">
							</div>
							<div class="iptBox bottomBorder">
								<span class="iptName left">所在地</span>
								<input type="text" name="location" placeholder="请输入所在地区" :value="locationtext">
							</div>
							<div class="iptBox bottomBorder">
								<span class="iptName left">手机号</span>
								<input type="text" name="contact_phone" placeholder="请输入手机号码" :value="phonenum" maxlength="11">
								<span class="checkCode right" :class="isCodes?'':'checkCode-no'" @click="isCodes?getCode():''" >获取验证码</span>
							</div>
							<div class="iptBox">
								<span class="iptName left">验证码</span>
								<input type="text" name="code" placeholder="请输入获取的验证码" maxlength="6">
							</div>
							<div class="signBtn" :class="has_data?'':'signBtn-no'" @click="has_data?registerNow():''">立即报名</div>
						</div>
					</div>
			</div>
	</div>
	
</template>
<script>
	import { Toast } from 'mint-ui'
	import { Indicator } from 'mint-ui'
	import '../../../static/css/animate.min.css'
	export default{
		data(){
			return{
				pop:false,
				result:[],
				userInfo:[],
				leave_num:'',
				has_data:false,
				codes:true,
				phonenum:'',
				setClock:{},
				isCodes:true,
				nametext:'',
				locationtext:'',
				phonecode:'',
				canClick:true,
				returnData:false,
				isGetUserData:false,
				member_id:'',
			}
		},
		created(){
			this.global.shouquan();
			document.title='再次确认';
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
			this.getData('post','/shop-v1-pay_jssign.html',{url:window.location.href}).then(res => {
				console.log(res.data.sign.member_id)
				this.member_id = res.data.sign.member_id
			})
		},
		mounted(){
			var self = this;
			//限制只能输入数字
			$("input[name=contact_phone],input[name=code]").bind("keyup", function () {
			  this.value = this.value.replace(/[^\d]/g, '');
			}).bind("afterpaste", function () {
			  this.value = this.value.replace(/[^\d]/g, '');
			});

			this.getData('post','/shop-v2-college-line_active_get_confirm_info.html',
			{
				active_id:this.$route.query.active_id,
				ca_id:this.$route.query.ca_id,
				car_id:this.$route.query.car_id
			}).then(res=>{
				if(res.data.status==1){
					this.result = res.data.data;
					this.leave_num = res.data.data.leave_num;
				}
				self.returnData=true;
				Indicator.close();
			});
		},
		methods:{
			isPop(){
				var self=this;
				self.canClick=false;
				$('.fillInformation-content').animateCss('fadeInUp');
				this.pop=true;
				$("input[name=code]").val('');
				if(self.isGetUserData==false){
					Indicator.open({
					  spinnerType: 'snake'
					});
					this.getData('post','/shop-v2-college-line_active_get_user_info.html',{}).then(res=>{ //查询用户信息
						if(res.data.status==1){
							this.userInfo=res.data.data;
							this.has_data=true;
							Indicator.close();
							self.isGetUserData=true;
							this.nametext=res.data.data.contact_name;
							this.locationtext=res.data.data.location;
							this.phonenum = res.data.data.contact_phone;
						}else{
							this.has_data=true;
							Indicator.close();
						}
						setTimeout(function(){
							self.canClick=true;
						},2500);
					});
				}else{
					this.has_data=true;
					setTimeout(function(){
						self.canClick=true;
					},2500);
				}
			},
			registerNow(){
				var self=this;
				self.nametext=$("input[name=contact_name]").val();
				self.locationtext=$("input[name=location]").val();
				self.phonecode = $("input[name=code]").val();
				self.phonenum = $("input[name=contact_phone]").val();
				var phoneRegExp = /^(13[0-9]|14[57]|15[012356789]|16[6]|17[0135678]|18[0-9]|19[89])[0-9]{8}$/;
				var nameText =this.nametext.split(" ").join("");
				var locaTiontext = this.locationtext.split(" ").join("");
				var phoneNum = $("input[name=contact_phone]").val();
				if(nameText.length!=0){
					if(locaTiontext.length!=0){
						if(phoneNum.length!=0 && phoneRegExp.test(phoneNum)){
							this.getData('post','/shop-v2-college-line_active_member_free_sign.html',{
								ca_id:this.$route.query.ca_id,
								active_id:this.$route.query.active_id,
								car_id:this.$route.query.car_id,
								code:this.phonecode,
								contact_name:nameText,
								contact_phone:this.phonenum,
								location:locaTiontext,
							}).then(res=>{
								if(res.data.status==1){
									Toast({
										message:res.data.msg,
										duration: 1500
									});
									self.has_data=false;
									setTimeout(function(){
										self.$router.push({path:"/signSuccess",
												query:{
													car_id:self.$route.query.car_id,
													active_id:self.$route.query.active_id,
													ca_id:self.$route.query.ca_id,
													member_id:self.member_id
												}
											})
										self.has_data=true;
									},1500);
								}else{
									Toast({
										message:res.data.msg,
										duration: 1500
									});
									self.has_data=false;
									setTimeout(function(){
										self.has_data=true;
									},1500)
								}
							});
						}else{
							Toast('请填写正确的手机号码');
						}
					}else{
						Toast('请填写所在地');
					}
				}else{
					Toast('请填写正确的姓名');
				}
			},
			cancel(){
				var self = this;
				$('.fillInformation-content').animateCss('fadeOutDown', function() {
				  self.pop=false;
				});
			},
			getCode(){
				var self = this;
				self.nametext=$("input[name=contact_name]").val();
				self.locationtext=$("input[name=location]").val();
				self.phonenum = $("input[name=contact_phone]").val();
				var phoneRegExp = /^(13[0-9]|14[57]|15[012356789]|16[6]|17[0135678]|18[0-9]|19[89])[0-9]{8}$/;
				if($("input[name='contact_phone']").val().length!=0 && phoneRegExp.test($("input[name='contact_phone']").val())){
					self.phonenum = parseInt($("input[name='contact_phone']").val());
					self.getData('post','/shop-v2-college-line_active_send_msg.html',{
						phone:self.phonenum
					}).then(res=>{
						if(res.status==200){
							if(res.data.status==0){
								Toast(res.data.msg);
							}else{
								Toast(res.data.msg);
								let time=60;
								if(self.isCodes){
									self.isCodes=false;
									self.setClock = setInterval(function(){
										time--;
										$('.checkCode').html(time+'s');
										if(time==0){
											clearInterval(self.setClock);
											$('.checkCode').html('重新获取');
											self.isCodes=true;
										}
									},1000);
								}
							}
						}else{
							Toast('提交失败，请再尝试一次');
						}
					})
					return;
				}else{
					Toast('请输入正确的手机号');
				}
			},
		}
	}
</script>
<style>
	.fillInformation-content{
		-webkit-animation-duration: 0.2s;
		-moz-animation-duration: 0.2s;
		-o-animation-duration: 0.2s;
		-ms-animation-duration: 0.2s;
	}
</style>
<style lang="less">
	.confirmSignup{
		height:100vh;
		font-size: 0.28rem;
		position: relative;
		&-no{
			opacity: 0;
		}
		&-content{
			width:100%;
			height: calc(~"100vh - 0.9rem");
			overflow: auto;
			-webkit-overflow-scrolling:touch;
			&-banner{
				width:100%;
				height:6.52rem;
				position: relative;
				img{
					width:100%;
				}
				.confirmInfo{
					position: absolute;
					left:0.3rem;
					bottom:0;
					.infoTitle{
						color:#fff;
						font-size: 0.42rem;
						margin-bottom: 0.4rem;
					}
					.infoBox{
						color:#fff;
						margin-bottom:0.3rem;
						width:100%;
						img{
							width:0.28rem;
							margin-right: 0.2rem;
						}
						&_address{
							max-width: 90%;
						}
					}
					.addressCont{
						min-height: 0.5rem;
					}
				}
			}
			&-legend{
				padding:0.4rem 0.3rem;
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
		.footerBtn{
			width:100%;
			height:0.9rem;
			position: absolute;
			bottom:0;
			left:0;
			&-mainVenue{
				width:100%;
				height:0.9rem;
				line-height: 0.9rem;
				display: block;
				text-align: center;
				font-size: 0.28rem;
				color:#fff;
				background-color: #222;
				&-none{
					background-color: #999;
				}
			}
		}
		.fillInformation{
			position:relative;
			z-index:998;
			font-size: 0.28rem;
			&-content{
				width:100%;
				height:6.2rem;
				background-color: #fff;
				position: fixed;
				bottom:0;
				left:0;
				z-index: 99;
				border-top-left-radius: 0.1rem;
				border-top-right-radius: 0.1rem;
				/* transition:all 0.5s ease; */
				.formBox{
					padding: 0.4rem 0.32rem 0 0.32rem;
				}
				.fillTitle{
					font-size: 0.36rem;
					color:#333333;
					font-weight: 700;
				}
				.iptBox{
					width: 100%;
					height: 0.68rem;
					padding-top: 0.22rem;
				}
				.iptName{
					width:1.2rem;
					font-size: 0.28rem;
					height:0.46rem;
					line-height:0.46rem;
					color:#222;
				}
				.checkCode{
					border: 0.02rem solid #222222;
					color: #222222;
					width: 1.6rem;
					text-align: center;
					height: 0.46rem;
					line-height: 0.46rem;
					border-radius: 0.06rem;
					&-no{
						opacity: 0.5;
					}
				}
				input{
					border:none;
					width:3.2rem;
					float: left;
					height:0.46rem;
					line-height:0.46rem;
					color:#333;
					font-size: 0.28rem;
					outline: none;
				}
				.more{
					width: 0.2rem;
					margin-top: 0.1rem;
				}
				.signBtn{
					width:100%;
					height:0.9rem;
					background-color: #222;
					color:#fff;
					line-height: 0.9rem;
					text-align: center;
					margin-top: 0.4rem;
					border-radius: 0.06rem;
					&-no{
						opacity: 0.5;
					}
				}
			}
			.mask{
				width:100%;
				height:100%;
				background-color: #000;
				opacity: 0.7;
				position: fixed;
				left:0;
				top:0;
				z-index: 9;
			}
		}
		.left{
			float: left;
		}
		.right{
			float: right;
		}
		.ml52{
			margin-left: 0.52rem;
		}
		.disc{
			width:3%;
		}
		.txt{
			width:97%;
		}
		.bottomBorder{
			border-bottom: 0.02rem solid #DDDDDD;
		}
		.clear{
			clear: both;
		}
	}

</style>