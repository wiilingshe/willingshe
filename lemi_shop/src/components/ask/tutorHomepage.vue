<template>
	<div class="tutorHomepage">
		<ul class="ul3" v-infinite-scroll="loadMore" infinite-scroll-disabled="false" infinite-scroll-immediate-check="false">
			<div class="topAll">
				<div class="tutorList1">
			  		<ul class="ul1">
			  			<li>
			  				<img :src="info.face==null || info.face==''?'../../../static/img/zhanwei.png':info.face">
			  				<div class="attention" v-show="this.$route.query.status==0" @click="attention($event)">+关注</div>
			  				<div class="attentioned" v-show="this.$route.query.status==1" @click="attention($event)">已关注</div>
			  			</li>
			  			<li>
			  				<div class="all1">
			  					<div class="name2">{{info.username}}</div>
			  					<div class="desc1">{{info.followCounts}}人关注</div>
			  				</div>
			  			</li>
			  			<!-- <li>
			  				个人名片
			  			</li> -->
			  		</ul>
			  	</div>
			  	<div class="tutorDesc">
			  		<div class="title1">
			  			{{info.desc==null || info.desc==""?'暂无描述':info.desc}}
			  		</div>
			  		<div class="xaingxi" :class="{xaingxi1:more}">
			  			{{info.job_desc=="" || info.job_desc==null?'暂无职位描述':info.job_desc}}
			  		</div>
			  		<div class="more1" v-if="more" @click="getmore()">更多>></div>
			  	</div>
			</div>
		  	<div class="replyList" v-for="i in lists">
		  		<ul class="ul1">
		  			<li>
		  				<img :src="i.face">
		  			</li>
		  			<li>
		  				<div class="top">
		  					<span>{{i.nickname}}</span>
		  					<span>问题来源：{{i.source_name}}</span>
		  				</div>
		  				<div class="xia">
		  					{{i.question}}
		  				</div>
		  				<div class="fee1">&yen;{{fee}}</div>
		  			</li>
		  		</ul>
		  		<ul class="ul2">
		  			<li class="">
		  				<img :src="info.face==null || info.face==''?'../../../static/img/zhanwei.png':info.face">
		  			</li>
		  			<li class="daan" @click="reply(i.id)">
		  				<div class="yuyin1">
					  		<img src="../../../static/img/audioBg.png">
					  		<svg t="1509953101934" class="icon" style="position: absolute;color: #fff;left: 0.2rem;top:0.15rem;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2969" xmlns:xlink="http://www.w3.org/1999/xlink" width="0.4rem" height="0.4rem">
								<path d="M243.90439 513.708336m-115.375401 0a115.375402 115.375402 0 1 0 230.750803 0 115.375402 115.375402 0 1 0-230.750803 0Z" p-id="2970" fill="#ffffff"></path>
								<path v-show="playing2" d="M742.851803 949.902074c204.798938-254.072682 203.298946-623.702766-3.387983-876.241456-15.39292-18.807902-31.011839-35.879814-47.030756-51.738732-30.093844-29.793846-78.857591-29.00585-108.674436 1.065995-30.581841 30.84384-29.424847 80.99158 2.362988 110.591426 3.386982 3.153984 5.615971 5.269973 6.139968 5.81097 200.876958 207.371925 202.41995 536.758217 2.840985 745.955132-0.481998 0.505997-2.554987 2.505987-5.72397 5.506971-31.547836 29.875845-32.294833 80.034585-1.441993 110.627427 30.061844 29.806845 78.815591 30.185843 108.646437 0.147999 15.769918-15.880918 31.135839-32.950829 46.26876-51.725732z" p-id="2971" fill="#ffffff"></path>
								<path v-show="playing" d="M559.939751 733.196198c-13.657929 19.437899-28.634852 37.113808-44.591768 53.023725-29.387848 29.300848-77.296599 28.509852-106.766447-0.709996l-1.434992-1.422993c-31.764835-31.495837-30.189843-82.84857 2.879985-112.437417 6.804965-6.088968 11.64394-10.720944 12.957933-12.333936 71.27963-87.533546 68.601644-214.704887-7.084964-299.235448-0.594997-0.663997-2.837985-2.712986-6.239967-5.664971-33.670825-29.211849-35.896814-80.846581-4.510977-112.500416 29.815845-30.070844 78.822591-31.441837 108.949435-1.682992 15.48692 15.297921 30.067844 32.249833 43.444775 50.855737 93.686514 130.322324 94.672509 310.784388 2.396987 442.108707z" p-id="2972" fill="#ffffff"></path>
							</svg>
					  		<span>付费偷偷听</span>
					  	</div>
		  			</li>
		  		</ul>
		  	</div>
		  	<loadNo v-show="loadNo1"></loadNo>
			<footer1 v-show="loadNo1"></footer1>
			<div style="height:0.768rem" v-show="loadNo1"></div>
		</ul>
		<div class="tiwen" @click="tiwen()">
			提问
		</div>
	</div>
</template>
<script>
	import { Toast} from 'mint-ui';
	import loadNo from '@/components/common/loadNo';
	import footer1 from '@/components/publicPage/footer1';
	export default{
		data(){
			return{
				playing2:true,
				playing:true,
				info:[],
				more:false,
				pageNo:1,
				lists:[],
				fee:'--',
				ifload:true,
				loadNo1:false,
			}
		},
		created(){
			this.global.shouquan();
			this.postData('post','/shop-v1-shop_get_teacher_info.html',{type:2,id:this.$route.query.id}).then(res => {
				this.info = res.data
			});
			this.postData('post','/shop-v2-ask_lst.html',{source_type:3,source_id:this.$route.query.id,page:1,status:2}).then(res => {
				this.lists = res.data;
			});
			// 获取偷听要多少钱
			this.postData('post','/shop-v2-ask_get_fee.html',{fee_type:2,is_public:1}).then(res => {
				if(res.data.status == 1){
					this.fee = res.data.total_fee
				}else{
					Toast({
					  message: '获取偷听金额失败',
					  iconClass: 'icon iconfont icon-tishi',
					  duration: 1000
					});
				}
			})
		},
		updated(){
			if($('.xaingxi').eq(0).css('height') > '57px'){
				this.more = true;
			};
			// var topHeight = $('.topAll').eq(0).css('height');
			// $('.ul3').eq(0).css('height','calc(100vh - '+topHeight+' - 0.768rem)');
		},
		methods:{
			getmore(){
				$('.xaingxi').eq(0).removeClass('xaingxi1');
				$('.more1').css('display','none');
			},
			loadMore(){
				if(this.ifload == true){
					this.pageNo = Number(this.pageNo)+Number(1);
					this.postData('post','/shop-v2-ask_lst.html',{source_type:3,source_id:this.$route.query.id,page:this.pageNo,status:2}).then(res => {
						if(res.data.length != 0){
							this.lists = this.lists.concat(res.data);
						}else{
							this.pageNo = Number(this.pageNo)-Number(1);
							this.ifload = false;
							this.loadNo1 = true;
						}
					});
				}
			},
			attention(e){
				if($(e.target).attr('class') == 'attentioned'){
					//执行取消关注事件
					this.postData('post','/shop-v1-user_cancel_follow_this.html',{shop_id:this.$route.query.id,follow_type:1}).then(res => {
						if(res.data.status == 1){
							$(e.target).closest('li').find('.attention').css('display','block');
							$(e.target).closest('li').find('.attentioned').css('display','none');
							Toast({
							  message: res.data.msg,
							  iconClass: 'icon iconfont icon-dui',
							  duration: 1000
							});
						}else if(res.data.status == 0){
							Toast({
							  message: res.data.msg,
							  iconClass: 'icon iconfont icon-tishi',
							  duration: 1000
							});
						}
					})
				}else{
					//执行关注事件
					this.postData('post','/shop-v1-user_do_follow_this.html',{shop_id:this.$route.query.id,follow_type:1}).then(res => {
						if(res.data.status == 1){
							$(e.target).closest('li').find('.attentioned').css('display','block');
							$(e.target).closest('li').find('.attention').css('display','none');
							Toast({
							  message: res.data.msg,
							  iconClass: 'icon iconfont icon-dui',
							  duration: 1000
							});
						}else if(res.data.status == 0){
							Toast({
							  message: res.data.msg,
							  iconClass: 'icon iconfont icon-tishi',
							  duration: 1000
							});
						}
					})
				}
			},
			reply(id){
				this.$router.push({path:'/problemDetails',query:{id:id,status:2,type:2}})
			},
			tiwen(){
				this.$router.push({path:'/askQuestions',query:{id:this.$route.query.id}})
			}
		},
		components:{loadNo,footer1},
	}
</script>
<style lang="less">
	.tutorHomepage{
		font-size: 0.205rem;
		color: #333;
		.ul3{
			height: 100vh;
			overflow:scroll;
			-webkit-overflow-scrolling:touch;
		}
		.tutorList1{
			.ul1{
				background-color: #fff;
				height: 1.834rem;
				li{
					float: left;
				}
				li:nth-child(1){
					width: 1.365rem;
					position: relative;
					padding-top: 0.34rem;
					img{
						width: 1.024rem;
						height: 1.024rem;
						border-radius: 50%;
						margin-left: 0.17rem;
					}
					.attention{
						width: 0.853rem;
						height: 0.384rem;
						border-radius: 0.192rem;
						border:1px solid #5e96d0;
						color: #5e96d0;
						text-align: center;
						line-height: 0.384rem;
						position: absolute;
					    bottom: -0.17rem;
					    left: 0.255rem;
					    background-color: #fff;
					}
					.attentioned{
						width: 0.853rem;
						height: 0.384rem;
						border-radius: 0.192rem;
						border:1px solid #5e96d0;
						color: #fff;
						text-align: center;
						line-height: 0.384rem;
						position: absolute;
					    bottom: -0.17rem;
					    left: 0.255rem;
					    background-color: #5e96d0;
					}
				}
				li:nth-child(2){
					width: calc(~"100% - 1.365rem - 1.109rem - 0.17rem - 0.2rem");
					padding-right: 0.2rem;
					display: table;
					.all1{
						height: 1.834rem;
						display: table-cell;
    					vertical-align: middle;
						.name2{
							font-size: 0.239rem;
							margin-bottom: 0.03rem;
						}
						.desc1{
							color: #999;
						}
					}
				}
				li:nth-child(3){
					width: 1.109rem;
					height: 0.5rem;
					border:1px solid #5e96d0;
					border-radius: 0.085rem;
					text-align: center;
					line-height: 0.5rem;
					color: #5e96d0;
					margin-top: 0.667rem;
				}
			}
		}
		.tutorDesc{
			background-color: #fff;
			width: calc(~"100% - 0.34rem");
			padding: 0rem 0.17rem;
			overflow: auto;
			padding-bottom: 0.256rem;
			border-bottom: 1px solid #eee;
			.title1{
				font-size: 0.239rem;
				margin-bottom: 0.08rem;
			}
			.xaingxi{
				font-size: 0.222rem;
				color: #999;
			}
			.xaingxi1{
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 3;
				overflow: hidden;
			}
			.more1{
				float: right;
				color: #5e96d0;
				margin-top: 0.24rem;
			}
		}
		.replyList{
			background-color: #fff;
			overflow: auto;
			width: calc(~"100% - 0.34rem");
			padding: 0.256rem 0.17rem;
			border-bottom: 1px solid #eee;
			.ul1{
				li{
					float: left;
				}
				li:nth-child(1){
					img{
						width: 0.682rem;
						height: 0.682rem;
						border-radius: 50%;
					}
				}
				li:nth-child(2){
					width: calc(~"100% - 0.852rem");
					margin-left: 0.17rem;
					.top{
						color: #999;
						font-size: 0.205rem;
						margin-bottom: 0.1rem;
					}
					.xia{
						font-size: 0.222rem;
					}
					.fee1{
						margin-top: 0.1rem;
						color: #fe5875;
						margin-bottom: 0.18rem;
					}
				}
			}
			.ul2{
				li{
					float: left;
				}
				li:nth-child(1){
					img{
						width: 0.682rem;
						height: 0.682rem;
						border-radius: 50%;
						margin-left: 0.23rem;
					}
				}
				li:nth-child(2){
					margin-left: 0.1rem;
					.yuyin1{
						width: 3.41rem;
						height: 0.682rem;
						border-radius: 0.341rem;
						position: relative;
						span{
							color: #fff;
							font-size: 0.239rem;
							display: inline-block;
						    vertical-align: top;
						    line-height: 0.682rem;
						    position: absolute;
						    left: 1.1rem;
						}
						img{
							width:3.5rem;
							position: absolute;
						}
					}
				}
			}
		}
		.tiwen{
			height: 0.768rem;
			width: 100%;
			background-color: #fe5875;
			color: #fff;
			text-align: center;
			line-height: 0.768rem;
			position: fixed;
			bottom: 0;
			z-index: 2;
			font-size: 0.256rem;
		}
	}
</style>