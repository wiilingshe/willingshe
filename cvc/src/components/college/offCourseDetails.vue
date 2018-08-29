<template>
	<div class="offCourseDet" :class="returnData?'':'offCourseDet-no'">
		<div class="offCourseDet-content">
			<div class="offCourseDet-content-banner" data-show="0">
				<img :src="result.video_img">
				<div class="offCourseDet-content-banner-myshade ishide"></div>
				<span class="countdownTitle ishide" >报名倒计时</span>
				<span class="countdownTime ishide" ></span>
			</div>
			<div class="infoContainer">
				<div class="offTitle">
					{{result.title}}
				</div>
				<div class="container bottomBorder">
					<img class="imgLeft left" src="../../../static/img/college/offcoursedetails/home_Timeslot.png" alt="">
					<span class="textCont left">{{result.start_time}}—{{result.end_time}}</span>
				</div>
				<div class="container bottomBorder">
					<img class="imgLeft address_icon left" src="../../../static/img/college/offcoursedetails/address_start.png" alt="">
					<span class="textCont left">{{result.address}}</span>
				</div>
				<div class="container">
					<img class="imgLeft my_imgs left" src="../../../static/img/college/offcoursedetails/home_person.png" alt="">
					<span class="textCont left">限{{result.num}}人</span>
				</div>
			</div>
			<div class="offCourseDet-navigator">
				<div class="offCourseDet-navigator-lists" v-if="result.left_text!=null" @click="navLeft()" :style="{'color':navs==1?'#222':'#888'}">{{result.left_text}}
					<span class="line" v-if="navs==1"></span>
				</div>
				<div class="offCourseDet-navigator-lists" v-if="result.right_text!=null" @click="navRight()" :style="{'color':navs==2?'#222':'#888'}">{{result.right_text}}
					<span class="line" v-if="navs==2"></span>
				</div>
			</div>
			<div class="offCourseDet-box" v-show="navs==1 && result.works_intro!=null">
				<div v-html="lhtml" class="offCourseDet-box-cont"></div>	
			</div>
			<div class="offCourseDet-box" v-show="navs==2 && result.course_intro!=null">
				<div v-html="rhtml" class="offCourseDet-box-cont"></div>
			</div>
			<footer1></footer1>
		</div>
		<div class="myLayer" v-show="cancelPop==true">
			<div class="shade"  @click="closePop()"></div>
			<div class="cancelBox" v-show="cancelPop==true">
				<div class="cancelBox-mask">
					<div class="cancelBox-content">
						<img class="close" src="../../../static/img/college/offcoursedetails/my_close.png" @click="closePop()">
						<div class="cancelTitle">
							扫一扫二维码
						</div>
						<div class="qrCode">
							<img :src="result.before_img" alt="before" v-if="hasSign==0" onerror="this.src=&quot;/static/img/zhanwei.png&quot;">
							<img :src="result.after_img" alt="after" v-if="hasSign==1" onerror="this.src=&quot;/static/img/zhanwei.png&quot;">
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="footerNavigator" v-if="returnData==true && isStartSign==true">
			<div class="consultation left" @click="customerService()">
				<img src="../../../static/img/college/offcoursedetails/home_Consultation.png" alt="">
				<span>咨询</span>
			</div>
			<span class="vipFree left"  v-bind:style="singelBtn" v-if="hasSign==0 && isMember==1 && canSign==1 " @click="freeSignup()">会员免费报名</span>
			<span class="vipFree left" v-if="hasSign==0 && isMember==0 && canSign==1" @click="buyVip()">会员免费抢座</span>
			<span class="paid left" v-if="hasSign==0 && isMember==0 && canSign==1" @click="isPop()">付费参加</span>
			<span class="registered left" v-if="hasSign==1 && canSign==0" @click="toInvitationCard()">您已报名</span>
			<span class="registered left" v-if="hasSign==0 && canSign==0">{{Msg}}</span>
		</div>
		<div class="footerNavigator" v-if="returnData==true && isStartSign==false">
			<div class="consultation left" @click="customerService()">
				<img src="../../../static/img/college/offcoursedetails/home_Consultation.png" alt="">
				<span>咨询</span>
			</div>
			<span class="vipFree left" v-if="acType!=1 && isMember==0 && hasSign==0 && canSign==0" @click="buyVip()">会员免费抢座</span>
			<span class=" registered left" v-if="hasSign==0 && canSign==0 && isMember==1 " :style="{'background-color':'#666'}">{{Msg}}</span>
			<span class="left" v-if="hasSign==0 && canSign==0 && isMember==0 " :class="acType==1?'registered':'paid'" :style="{'background-color':'#666'}">
				{{Msg}}
			</span>
			<span class="vipFree left" v-if="acType!=1 && isMember==0 && hasSign==0 && canSign==1" @click="buyVip()">会员免费抢座</span>
			<span class="left" v-if="hasSign==0 && canSign==1" :class="isMember==1 && acType==2?'registered':'paid'" :style="{'background-color':'#666'}">报名还未开始</span>
		</div>
		<div class="footerNavigator" v-if="returnData==false">
			<div class="consultation left" @click="customerService()">
				<img src="../../../static/img/college/offcoursedetails/home_Consultation.png" alt="">
				<span>咨询</span>
			</div>
			<span class="registered left">加载中...</span>
		</div>
		<div class="fillInformation" v-show="pop==true">
			<div class="mask" @click="closeFill()"></div>
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
						<div class="signBtn" :class="has_data?'':'signBtn-no'" @click="has_data?payForSign():''">付费报名</div>
					</div>
				</div>
		</div>
	</div>
</template>
<script>
	import footer1 from '@/components/common/footer1'
	import {Toast,Indicator } from 'mint-ui'
	import '../../../static/css/animate.min.css'
	//时间戳转换
	function formatDate(nS){
	    if(nS==null)
	    {
	      return 'null';
	    }else{
	      var now = new Date(parseInt(nS*1000));
	      var year = now.getFullYear();
	      var month = now.getMonth() + 1;
	      var date = now.getDate();
	      var hour = now.getHours();
	      var minute = now.getMinutes();
	      var second = now.getSeconds();
	      return year + "." + month + "." + date + " ";
	    }
	};
	export default{
		data(){
			return{
				result:[],
				lhtml:'',
				rhtml:'',
				isRegistered: false,
				navs:1,
				singelBtn:{width:'5.5rem',backgroundColor:'#222'},
				cancelPop:false,
				hasSign:'',
				isMember:'',
				canSign:'',
				Msg:'',
				pop:false,
				isCodes:true,
				userInfo:[],
				has_data:false,
				setCountDowns:{},
				isStartSign:'',
				nametext:'',
				locationtext:'',
				phonecode:'',
				phonenum:'',
				isGetUserData:false,
				returnData:false,
				handClose:'',
				acType:'',
				activeStatus:'',
				member_id:'',
			}
		},
		created(){
			this.global.shouquan();
			var self = this;
			document.title='活动详情';
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
		  this.$nextTick(function () {
		  	  	
		  })
		  this.getData('post','/shop-v2-college-line_active_get_active_info.html',{
		  	ca_id:this.$route.query.ca_id,
		  	active_id:this.$route.query.active_id,
		  	car_id:this.$route.query.car_id
		  }).then(res=>{
		  	this.returnData=true;
				this.result=res.data.data;
				if(res.data.data.subtitle==null || res.data.data.subtitle==undefined){
					self.share(res.data.data.title,res.data.data.title,res.data.data.video_img);
				}else{
					self.share(res.data.data.title,res.data.data.subtitle,res.data.data.video_img);
				};
				this.lhtml=res.data.data.works_intro;
				this.rhtml=res.data.data.course_intro;
				this.hasSign=res.data.data.has_sign;
				this.isMember=res.data.data.is_member;
				this.canSign=res.data.data.can_sign;
				this.Msg=res.data.data.msg;
				this.handClose =res.data.data.hand_close;
				this.acType=res.data.data.ac_type;
				this.activeStatus=res.data.data.active_status;
				Indicator.close();
				var countt =res.data.data.snatch_start_time;
				var countdown =document.getElementsByClassName('countdownTime')[0];
					this.getDate(countt);
					this.setCountDowns=setInterval(function(){//设置倒计时
						self.getDate(countt);
						let presentTime=parseInt(new Date().getTime()/1000);//获取当前时间
							if($('.offCourseDet-content-banner').attr('data-show')==1){ //时间到了报名按钮显示
								self.isStartSign=true;
							}else{
								self.isStartSign=false;
							}
							if(presentTime>=countt){ //如果抢票时间到了隐藏倒计时并停止计时器
								$('.countdownTitle,.countdownTime,.offCourseDet-content-banner-myshade').hide();
								clearInterval(self.setCountDowns);
							}
					},1000);
			});

			//限制只能输入数字
			$("input[name=contact_phone],input[name=code]").bind("keyup", function () {
			  this.value = this.value.replace(/[^\d]/g, '');
			}).bind("afterpaste", function () {
			  this.value = this.value.replace(/[^\d]/g, '');
			});
		},
		destroyed(){
			clearInterval(this.setCountDowns);
		},
		methods:{
			isPop(){
				var self = this;
				$('.fillInformation-content').animateCss('fadeInUp');
				this.pop=!this.pop;
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
					})
				}else{
					this.has_data=true;
				}
			},
			navLeft(){
				this.navs=1;
			},
			navRight(){
				this.navs=2;
			},
			freeSignup(){
				this.$router.push({path:"/confirmSignup",
					query:{
						ca_id:this.$route.query.ca_id,
						active_id:this.$route.query.active_id,
		  			car_id:this.$route.query.car_id
					}
				});
			},
	  	tow(n) {
	  		if(n<0){
	  			n=0;
	  		}else{
	  			n=n;
	  		}
	  	 return n >= 0 && n < 10 ? '0' + n : '' + n;
	  	},
	  	getDate(countt) { 
	  		var self=this;
		  	var oDate = new Date();//获取现在日期对象
		  	var oldTime = oDate.getTime();//现在距离1970年的毫秒数
		  	var newDate = new Date(parseInt(countt*1000));//获取指定日期对象
		  	var newTime = newDate.getTime();//距离1970年的毫秒数
		  	var second = Math.floor((newTime - oldTime) / 1000);//未来时间距离现在的秒数
		  	var day = Math.floor(second / 86400);//整数部分代表的是天；一天有24*60*60=86400秒 ；
		  	second = second % 86400;//余数代表剩下的秒数；
		  	var hour = Math.floor(second / 3600);//整数部分代表小时；
		  	second %= 3600; //余数代表 剩下的秒数；
		  	var minute = Math.floor(second / 60);
		  	second %= 60;
		  	var str = this.tow(day) + '<span class="time">天</span>'
		  	  + this.tow(hour) + '<span class="time">时</span>'
		  	  + this.tow(minute) + '<span class="time">分</span>'
		  	  + this.tow(second) + '<span class="time">秒</span>';
		  	  if(document.getElementsByClassName('countdownTime')[0] != undefined){
		  			document.getElementsByClassName('countdownTime')[0].innerHTML = str;
		  	  }
		  	  let presentTimes=parseInt(new Date().getTime()/1000);
	  	  	if(presentTimes>=countt){
	  	  		$('.countdownTitle,.countdownTime,.offCourseDet-content-banner-myshade').hide();
	  	  		self.isStartSign=true;
	  	  		if(document.getElementsByClassName('offCourseDet-content-banner')[0] != undefined){
	  	  			document.getElementsByClassName('offCourseDet-content-banner')[0].setAttribute('data-show','1');
	  	  		}
	  	  	}else{
	  	  		this.isStartSign=false;
	  	  		if(self.acType==2){ //acType为0表示未发布，1为已发布，2为即将开始;
	  	  			if(self.activeStatus==1){ //activeStatus为1表示未开始，2为进行中，3为已结束;
	  	  				$('.countdownTitle,.countdownTime,.offCourseDet-content-banner-myshade').show();
	  	  			}else{
	  	  				$('.countdownTitle,.countdownTime,.offCourseDet-content-banner-myshade').hide();
	  	  			}
	  	  		}
	  	  	}
	  	},
	  	customerService(){
	  		$('.cancelBox').animateCss('zoomIn');
	  		this.cancelPop=true;
	  	},
	  	closePop(){
	  		var self = this;
	  		$('.cancelBox').animateCss('zoomOut', function() {
	  		  self.cancelPop=false;
	  		});
	  	},
	  	closeFill(){
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
					$("input[name='contact_phone']").val(this.phonenum);
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
									/*let that = this;*/
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
      buyVip(){
      	this.$router.push({path:'/collegeHome'});
      },
      payForSign(){
      	var self =this;
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
			      	self.getData('post','/shop-v2-college-line_active_pay_sign.html',{
			      		ca_id:self.$route.query.ca_id,
			      		active_id:self.$route.query.active_id,
			      		car_id:self.$route.query.car_id,
			      		code:self.phonecode,
			      		contact_name:nameText,
			      		contact_phone:self.phonenum,
			      		location:locaTiontext,
			      	}).then(res=>{
			      		if(res.data.status==1){
			      			self.has_data=false;
			      			self.getData('post','/shop-v1-pay_order.html',{type:3,balance:0,a_id:self.$route.query.active_id,order_type:self.result.type}).then(res1 => {
			      				if(res1.data.status == 1){
			      					self.getData('post','/shop-v1-pay_topay.html',{type:3,pay_type:1,order_no:res1.data.order_no}).then(res2 => {
			      						self.pay2(res2.data,self.$route.query.car_id,self.$route.query.active_id,self.$route.query.ca_id)
			      					})
			      				}else if(res1.data.status == 0){
			      					Toast({
			      						message:res1.data.msg,
			      						duration: 1500
			      					});
			      				}
			      			});
	      					setTimeout(function(){
			      				self.has_data=true;
			      			},1500);
			      		}else{
			      			self.has_data=false;
			      			Toast({
												message:res.data.msg,
												duration: 1500
											});
			      			setTimeout(function(){
			      				self.has_data=true;
			      			},1500);
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
      toInvitationCard(){
      	this.$router.push({path:'/signSuccess',query:{
      		car_id:this.$route.query.car_id,
      		active_id:this.$route.query.active_id,
      		ca_id:this.$route.query.ca_id,
      		member_id:this.member_id
      	}})
      },
		},
		components:{footer1},
	}
</script>
<style>
	.cancelBox,.fillInformation-content{
		-webkit-animation-duration: 0.2s;
		-moz-animation-duration: 0.2s;
		-o-animation-duration: 0.2s;
		-ms-animation-duration: 0.2s;
	}
</style>
<style lang="less">
	.offCourseDet{
		font-size: 0.28rem;
		position: relative;
		height:100vh;
		&-no{
			opacity: 0;
		}
		&-content{
			width:100%;
			height: calc(~"100vh - 0.98rem");
			overflow-y: auto;
			overflow-x: hidden;
			-webkit-overflow-scrolling:touch;
			&-banner{
				width:100%;
				height:4.5rem;
				position: relative;
				box-shadow: 1px 1px 1px #eee;
				&-myshade{
					width:100%;
					height:100%;
					position: absolute;
					left:0;
					top:0;
					background-color: #000;
					opacity: 0.7;
					z-index: 8;
				}
				img{
					width:100%;
					height:4.5rem;
					display: block;
				}
				.countdownTitle{
					display: block;
			    position: absolute;
			    width: 100%;
			    text-align: center;
			    left: 0;
			    top: 1.74rem;
			    color: #fff;
			    font-size: 0.35rem;
			    font-family: PingFang-SC-Regular;
			    z-index: 10;
				}
				.countdownTime{
					display: block;
			    position: absolute;
			    width: 100%;
			    text-align: center;
			    top: 2.32rem;
			    color: #FFF;
			    font-size: 0.6rem;
			    font-family: PingFang-SC-Medium;
			    z-index: 10;
					span{
						font-size: 0.3rem;
						margin-left:0.1rem;
						margin-right: 0.1rem;
						font-family: PingFang-SC-Light;
					}
				}
			}
			.infoContainer{
				width:calc(~"100% - 0.6rem");
				padding:0 0.3rem;
				background-color: #fff;
				margin-bottom: 0.2rem;
				.offTitle{
					width:100%;
					height:1rem;
					color:#333333;
					font-size: 0.36rem;
					line-height: 1rem;
					overflow: hidden;
			    text-overflow: ellipsis;
			    white-space: nowrap;
				}
				.container{
					width:100%;
					height:0.9rem;
					line-height: 0.9rem;
					.imgLeft{
						width:0.33rem;
						margin:0.25rem 0.2rem 0 0;
					}
					.address_icon{
						width:0.27rem;
					}
					.my_imgs{
						margin:0.3rem 0.2rem 0 0;
					}
					.textCont{
						color:#666;
						color: #666;
				    overflow: hidden;
				    text-overflow: ellipsis;
				    white-space: nowrap;
				    width: 90%;
					}
					.imgRight{
						width:0.35rem;
						margin-top:0.25rem;
					}
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
				pointer-events: auto;
			}
			.cancelBox{
				display: table;
				width:100%;
				height:100%;
				position: fixed;
				left:0;
				top:0;
				pointer-events: none;
				&-mask{
					display: table-cell;
					vertical-align: middle;
					text-align: center;
				}
				&-content{
					position: relative;
					display: inline-block;
					width:4.22rem;
					height:5.52rem;
					background-color: #fff;
					border-radius: 0.06rem;
					padding: 0 0.4rem;
					pointer-events: auto;
					.close{
						width: 0.3rem;
				    display: block;
				    position: absolute;
				    right: 0.1rem;
				    top: 0.1rem;
				    pointer-events: auto;
					}
				}
				.cancelTitle{
					font-size: 0.36rem;
					color:#333;
					font-weight: 600;
					margin-top: 0.4rem;
					margin-bottom: 0.3rem;
				}
				p{
					text-align: left;
					font-size: 0.3rem;
				}
				.qrCode{
					width: 3.16rem;
			    height: 3.16rem;
			    margin: 0 auto;
					img{
						width:100%;
						height:100%;
					}
				}
				.btn{
					width:100%;
					margin-top: 0.4rem;
				}
			}
		}
		&-navigator{
			width:100%;
			height:0.9rem;
			background-color: #fff;
			overflow: hidden;
			white-space: nowrap;
			box-shadow: 1px 1px 1px #eee;
			&-lists{
				display: inline-block;
				width:100%/2;
				height:0.9rem;
				text-align: center;
				line-height: 0.9rem;
				position: relative;
				span{
					width: 0.52rem;
					height: 0.04rem;
					background-color: #222;
					position: absolute;
					bottom: 0;
					left: calc(~"50% - 0.26rem");
				}
			}
		}
		&-box{
			background-color: #fff;
			&-cont{
				width:100%;
				img{
					width:100%;
				}
			}
		}
		.fillInformation{
			font-size: 0.28rem;
			position: relative;
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
				transition:all 0.5s ease;
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
					height:0.46rem;
					line-height:0.46rem;
					font-size:0.28rem;
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
					color:#333;
					font-size: 0.28rem;
					line-height:0.46rem;
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
		.footerNavigator{
			width:calc(~"100% - 0.52rem");
			height:0.98rem;
			position: absolute;
			bottom:0;
			left:0;
			background-color: #fff;
			padding-top:0.14rem;
			padding-left:0.52rem;
			font-size: 0.28rem;
			color:#fff;
			z-index: 7;
			border-top: 1px solid #eee;
			.consultation{
				img{
					width:0.46rem;
				}
				span{
					display: block;
					font-size: 0.22rem;
					color:#333333;
				}
			}
			.vipFree{
				font-size: 0.28rem;
				color:#fff;
				text-align: center;
				width:2.6rem;
				height:0.82rem;
				line-height: 0.82rem;
				background-color: #222;
				border-radius: 0.06rem;
				margin-left: 0.62rem;
			}
			.paid{
				font-size: 0.28rem;
				color:#fff;
				text-align: center;
				width:2.6rem;
				height:0.82rem;
				line-height: 0.82rem;
				border-radius: 0.06rem;
				background-color: #222;
				margin-left:0.32rem;
			}
			.registered{
				font-size: 0.28rem;
				color:#fff;
				text-align: center;
				width:5.7rem;
				height:0.82rem;
				line-height: 0.82rem;
				border-radius: 0.06rem;
				background-color: #666;
				margin-left: 0.42rem;
			}
			.otherStatus{
				text-align: center;
				width:6.43rem;
				height:0.82rem;
				line-height: 0.82rem;
				border-radius: 0.06rem;
				background-color: #666;
			}
		}
		/*.footer{
			margin-bottom: 1rem;
		}*/
		.left{
			float: left;
		}
		.right{
			float: right;
		}
		.ishide{
			display: none;
		}
		.bottomBorder{
			border-bottom:0.02rem solid #EEEEEE;
		}
	}
</style>