<template>
	<div class="problemDetails">
		<audio id="audio" v-show="false"></audio>
		<img src="" id="pic1" style="display:none">
		<img src="" id="pic2" style="display:none">
		<div style="height:0.34rem;width:100%;background-color:#fff;"></div>
		<div class="title1">
			精彩回答
		</div>
		<div style="height:0.256rem;width:100%;background-color:#fff;"></div>
		<div class="pList">
		  	<div class="name1">
		  		<img class="img1" :src="arr.face">
		  		<span style="margin-left: 0.11rem;">{{arr.nickname}}</span>
		  		<!-- <span style="margin-left: 0.2rem;width: 4.4rem;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">问题来自：{{arr.question}}</span> -->
		  		<span style="margin-left: 0.2rem;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;float:right;">{{arr.create_time}}</span>
		  	</div>
		  	<div class="problem1">
		  		{{arr.question}}
		  	</div>
		  	<div class="pic" style="margin-bottom: 0.17rem;">
				<img class="preview-img" v-for="(item, index) in list" :src="item.src" height="100" @click="$preview.open(index, list)">
			</div>
		  	<div class="yuyin1" @click="play()" v-if="ifanswer">
		  		<img src="../../../../static/img/audioBg.png">
		  		<svg t="1509953101934" class="icon" style="position: absolute;color: #fff;left: 0.2rem;top:0.15rem;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2969" xmlns:xlink="http://www.w3.org/1999/xlink" width="0.4rem" height="0.4rem">
					<path d="M243.90439 513.708336m-115.375401 0a115.375402 115.375402 0 1 0 230.750803 0 115.375402 115.375402 0 1 0-230.750803 0Z" p-id="2970" fill="#ffffff"></path>
					<path v-show="playing2" d="M742.851803 949.902074c204.798938-254.072682 203.298946-623.702766-3.387983-876.241456-15.39292-18.807902-31.011839-35.879814-47.030756-51.738732-30.093844-29.793846-78.857591-29.00585-108.674436 1.065995-30.581841 30.84384-29.424847 80.99158 2.362988 110.591426 3.386982 3.153984 5.615971 5.269973 6.139968 5.81097 200.876958 207.371925 202.41995 536.758217 2.840985 745.955132-0.481998 0.505997-2.554987 2.505987-5.72397 5.506971-31.547836 29.875845-32.294833 80.034585-1.441993 110.627427 30.061844 29.806845 78.815591 30.185843 108.646437 0.147999 15.769918-15.880918 31.135839-32.950829 46.26876-51.725732z" p-id="2971" fill="#ffffff"></path>
					<path v-show="playing" d="M559.939751 733.196198c-13.657929 19.437899-28.634852 37.113808-44.591768 53.023725-29.387848 29.300848-77.296599 28.509852-106.766447-0.709996l-1.434992-1.422993c-31.764835-31.495837-30.189843-82.84857 2.879985-112.437417 6.804965-6.088968 11.64394-10.720944 12.957933-12.333936 71.27963-87.533546 68.601644-214.704887-7.084964-299.235448-0.594997-0.663997-2.837985-2.712986-6.239967-5.664971-33.670825-29.211849-35.896814-80.846581-4.510977-112.500416 29.815845-30.070844 78.822591-31.441837 108.949435-1.682992 15.48692 15.297921 30.067844 32.249833 43.444775 50.855737 93.686514 130.322324 94.672509 310.784388 2.396987 442.108707z" p-id="2972" fill="#ffffff"></path>
				</svg>
		  		<!-- <span>{{fee | zheng}}元偷偷听</span> -->
		  		<span>点击播放</span>
		  	</div>
		  	<!-- <div class="amount1">听过：1888</div> -->
	  	</div>
	  	<div style="height:0.34rem;width:100%;background-color:#fff;"></div>
		<div class="title1">
			导师介绍
		</div>
		<div style="height:0.256rem;width:100%;background-color:#fff;"></div>
		<ul class="ul1">
			<li>
				<img :src="teacherInfo.face">
			</li>
			<li>
				<div class="name2">
					{{teacherInfo.username}}
				</div>
				<div class="jieshao">
					{{teacherInfo.desc==null?'暂无职位描述':teacherInfo.desc}}
				</div>
				<div class="shuoming" :class="{shuoming2:more}">
					{{teacherInfo.job_desc==null?'暂无简介':teacherInfo.job_desc}}
				</div>
				<div class="more1" v-if="more" @click="getmore()">更多>></div>
			</li>
		</ul>
		<div style="height:0.34rem;width:100%;background-color:#fff;"></div>
		<div class="title1">
			课程推荐
		</div>
		<div class="course1" v-for="i in teacherSeries">
			<ul class="ul2">
				<li>
					<img class="img2" :src="i.pic">
				</li>
				<li>
					<div class="coursename">
						<div style="font-size:0.222rem;">{{i.ser_title}}</div>
						<div class="down1">
							<span>&yen;{{i.total_fee}}</span>
						</div>
						<span class="two" @click="details(i.ser_id)">立即购买</span>
					</div>
				</li>
			</ul>
		</div>
		<!-- <div style="height:0.768rem;"></div>
		<div class="ask1">
			提问
		</div> -->
		<div class="fast">
			<div class="list1">
				<i class="icon iconfont icon-shouye1" @click="shouye()"></i>
			</div>
			<div class="list2">
				<i class="icon iconfont icon-kefu1" @click="kefu()"></i>
			</div>
		</div>
		<div class="bg" v-show="kefu1" @click="closeKefu()"></div>
		<img class="kefu" :src="code" v-show="kefu1">
	</div>
</template>
<script>
	import { Toast,MessageBox,Indicator } from 'mint-ui';
	export default{
		data(){
			return{
				playing2:true,
				playing:true,
				arr:[],
				fee:'',
				list:[],
				ifanswer:true,
				teacherInfo:[],
				teacherSeries:[],
				more:false,
				code:'',
				kefu1:false,
			}
		},
		created(){
			this.global.shouquan();
			Indicator.open();
			var self = this;
			this.postData('post','/shop-v2-ask_get_fee.html',{'fee_type':2,'is_public':1}).then(res => {
				this.fee = res.data.total_fee;
			});
			// 图片预览
			this.postData('post','/shop-v2-ask_detail.html',{id:this.$route.query.id}).then(res => {
				this.arr = res.data.data;
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
			});
			// 获取导师数据
			this.postData('post','/shop-v1-shop_get_teacher_info.html',{'type':1,'id':this.$route.query.id}).then(res => {
				this.teacherInfo = res.data;
			});
			// 获取导师相关课程
			this.postData('post','/shop-v1-shop_get_teacher_series.html',{'type':1,'id':this.$route.query.id,page:1}).then(res => {
				this.teacherSeries = res.data;
			});
			// 判断问题有没有回答
			this.postData('post','/shop-v2-ask_listen.html',{id:self.$route.query.id}).then(res => {
				if(res.data.msg == '该问题尚未进行回答'){
					this.ifanswer = false;
				}
			})
		},
		updated(){
			if($('.shuoming').eq(0).css('height') > '57px'){
				this.more = true;
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
			},
			details(id){
				this.$router.push({path:'/details',query:{'ser_id':id}});
			},
			getmore(){
				$('.shuoming').eq(0).removeClass('shuoming2');
				$('.more1').css('display','none');
			},
			shouye(){
				this.$router.push({path:'/'});
			},
			kefu(){
				this.kefu1 = true;
				this.getData('get','/shop-g1-index_basemsg.html').then(res => {
					this.code = res.data.kefu_qrcode;
				})
			},
			closeKefu(){
				this.kefu1 = false;
			}
		},
		filters:{
			zheng(val){
				val = Math.round(val);
				return val;
			}
		}
	}
</script>
<style lang="less">
	.problemDetails{
		font-size: 0.205rem;
		color: #333;
		background-color: #fff;
		.kefu{
			width: 4.437rem;
			position: fixed;
			z-index: 11;
			top: 1.3rem;
			left: calc(~"50% - 2.218rem");
		}
		.bg{
			width: 100%;
			height: 100%;
			background-color: rgba(0,0,0,0.6);
			position: fixed;
			z-index: 11;
			top: 0;
		}
		.title1{
			background: #fff;
		    font-size: 0.256rem;
		    padding-left: 0.17rem;
		    border-left: 3px solid #5e96d0;
		    margin-left: 0.17rem;
		}
		.pList{
			background-color: #fff;
			width: calc(~"100% - 0.34rem");
			padding: 0 0.17rem 0.25rem;
			position: relative;
			border-bottom: 1px solid #eee;
			.name1{
				.img1{
					width: 0.409rem;
					height: 0.409rem;
					border-radius: 50%;
					background-color: #eee;
					margin:0.17rem 0;
				}
				span{
					display: inline-block;
				    height: 0.749rem;
				    vertical-align: top;
				    line-height: 0.749rem;
				    color: #999;
				}
			}
			.problem1{
				font-size: 0.222rem;
				margin-bottom: 0.17rem;
			}
			.yuyin1{
				width: 3.41rem;
				height: 0.682rem;
				// background-color: #fe5875;
				border-radius: 0.341rem;
				position: relative;
				// text-align: center;
				span{
					color: #fff;
					font-size: 0.239rem;
					display: inline-block;
				    vertical-align: top;
				    line-height: 0.682rem;
				    position: absolute;
				    left: 1.2rem;
				}
				img{
					width:3.5rem;
					position: absolute;
				}
			}
			.amount1{
				position: absolute;
				bottom: 0.4rem;
				right: 0.17rem;
				color: #999;
			}
			.pic{
				background-color: #fff;
				height: auto;
				img:nth-child(2){
					margin-left: 0.2rem;
				}
			}
		}
		.ul1{
			width: calc(~"100% - 0.34rem");
			padding: 0 0.17rem;
			background-color: #fff;
			overflow: auto;
			border-bottom: 1px solid #eee;
			padding-bottom: 0.34rem;
			li{
				float: left;
			}
			li:nth-child(1){
				img{
					width: 1.024rem;
					height: 1.024rem;
					border-radius: 50%;
				}
			}
			li:nth-child(2){
				width: calc(~"100% - 1.024rem - 0.17rem");
				margin-left: 0.17rem;
				.name2{
					font-size: 0.256rem;
					margin-bottom: 0.05rem;
				}
				.jieshao{
					font-size: 0.239rem;
					margin-bottom: 0.05rem;
				}
				.shuoming{
					font-size: 0.222rem;
					color: #999;
					// display: -webkit-box;
					// -webkit-box-orient: vertical;
					// -webkit-line-clamp: 3;
					// overflow: hidden;
				}
				.shuoming2{
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 3;
					overflow: hidden;
				}
				.more1{
					float: right;
				    margin-top: 0.15rem;
				    color: #5e96d0;
				}
			}
		}
		.course1{
			overflow: auto;
			width: calc(~"100% - 0.34rem");
			padding: 0.256rem 0.17rem;
			border-bottom: 1px solid #eee;
			.ul2{
				li{
					float: left;
				}
				.img2{
					width: 1.28rem;
					height: 1.28rem;
				}
				li:nth-child(2){
					width: calc(~"100% - 1.28rem - 0.17rem");
					margin-left: 0.17rem;
					position: relative;
					height: 1.28rem;
				}
				.coursename{
					height: 1.1rem;
					margin-top: 0.09rem;
					position: relative;
					.down1{
						position: absolute;
						bottom: 0;
						color: #fe5875;
						font-size: 0.222rem;
					}
					.two{
						position: absolute;
						right: 0;
						bottom: 0;
						width: 1.365rem;
						height: 0.5rem;
						background-color: #fe5875;
						border-radius: 0.25rem;
						text-align: center;
						line-height: 0.5rem;
						color: #fff;
						font-size: 0.222rem;
					}
				}
			}
		}
		.ask1{
			height: 0.768rem;
			width: 100%;
			line-height: 0.768rem;
			text-align: center;
			background-color: #fe5875;
			color: #fff;
			font-size: 0.256rem;
			position: fixed;
			bottom: 0;
		}
		.fast{
			width: 0.768rem;
			position: fixed;
			bottom: 0.938rem;
			right: 0.17rem;
			.list1,.list2{
				width: 0.768rem;
				height: 0.768rem;
				background-color: rgba(0,0,0,0.6);
				i{
					color: #fff;
					margin-left: 0.13rem;
					position: relative;
					top: 0.12rem;
					font-size: 0.5rem;
				}
			}
			.list1{
				border-radius: 0.384rem 0.384rem 0 0;
			}
			.list2{
				border-radius: 0 0 0.384rem 0.384rem;
			}
		}
	}
</style>