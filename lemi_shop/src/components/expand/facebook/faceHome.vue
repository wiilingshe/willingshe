<template>
	<div class="faceHome">
		<div class="video" @click="playVideo()">
			<div class="bg1" :style="'background-image:url('+info.pic+')'">
				<div style="width:100%;height:100%;position:absolute;top:0;background-color:rgba(0,0,0,0.5);" v-show="ifShow"></div>
				<i class="icon iconfont icon-bofang" v-show="ifShow"></i>
				<video id="video" :src="info.video" controls="controls"></video>
			</div>
		</div>
		<div class="desc1">
			<div class="title1">
				<img src="../../../../static/img/face/title_l.png">
				<span>{{info.title}}</span>
				<img src="../../../../static/img/face/title_r.png">
			</div>
			<div class="zhengwen" v-html="info.info">
				{{info.info}}
			</div>
		</div>
		<div class="num1">
			<span class="num2">已有{{list.count}}名摄影师加入</span>
			<div class="tou1">
				<img :src="i.face" v-for="(i,index) in list.data" v-if="index<5">
			</div>
			<i class="icon iconfont icon-dayuhao1"></i>
		</div>
		<div class="search">
			<span :class="{zan:zan}" style="margin-right:0.3rem;" @click="zan1(1)">最多点赞</span>
			<span :class="{new:!zan}" @click="zan1(2)">最新上传</span>
			<input type="text" placeholder="搜索关键词" @click="search()">
			<i class="icon iconfont icon-sousuo1"></i>
		</div>
		<nodata v-if="nodata1"></nodata>
		<div class="alllist">
		<!-- <div class="alllist" :class="{alllist1:iszanmost==false}"> -->
			<!-- <faceList v-show="iszanmost" :type="iszanmost"></faceList>
			<div v-show="!iszanmost" class="list" @click="faceDatails(i.masks_user_id)" v-for="i in users">
				<img class="img1" :src="i.pic">
				<div class="user1">
					<div class="img3">
						<img class="img2" :src="i.face">
					</div>
					<span>{{i.nickname}}</span>
				</div>
				<div class="detail1">
					{{i.content | content}}
				</div>
				<div class="zan1">
					<i class="icon iconfont icon-praise"></i>
					<span>{{i.thumbs}}</span>
				</div>
			</div> -->
			<faceList :type="iszanmost" :orderBy="orderBy"></faceList>
		</div>
		<div style="color:#999;text-align:center;margin-bottom:0.17rem;" v-show="loading">加载中...</div>
		<loadNo v-show="loadNo"></loadNo>
		<div style="height:0.768rem;"></div>
		<ul class="operating1">
			<li @click="getCode()">
				<div style="height:0.4rem;"><i class="icon iconfont icon-qr-code"></i></div>
				<div style="color:#666;font-size:0.205rem;">公众号</div>
				<div class="line1"></div>
			</li>
			<li @click="getTip()">
				<div style="height:0.4rem;"><i class="icon iconfont icon-2"></i></div>
				<div style="color:#666;font-size:0.205rem;">活动须知</div>
			</li>
			<li @click="jion()">
				立即参加
			</li>
		</ul>
		<div class="bg" v-show="tip || ifcode" @click="close()"></div>
		<div class="tip" v-show="tip">
			<div class="tip1">
				<i class="icon iconfont icon-guanbi1" @click="close()"></i>
				<div class="title1">
					活动须知
				</div>
				<div class="desc3" v-html="info.instructions">
					{{info.instructions}}
				</div>
			</div>
		</div>
		<div class="code1" v-show="ifcode">
			<img style="width:100%;" :src="info.wechat">
			<div style="font-size:0.205rem;text-align:center;">扫码进入公众号，了解更多面谱活动的资讯</div>
		</div>
	</div>
</template>
<script>
	import { Toast,Indicator } from 'mint-ui';
	import loadNo from '@/components/common/loadNo';
	import nodata from '@/components/common/nodata'
	import faceList from '@/components/expand/facebook/faceList'
	export default{
		data(){
			return{
				tip:false,
				info:[],
				pageNo:1,
				users:[],
				zan:true,
				orderBy:1,
				ifLoad:true,
				ifShow:true,
				ifcode:false,
				loading:false,
				loadNo:false,
				nodata1:false,
				ifvideo:true,
				list:[],
				iszanmost:true,
			}
		},
		created(){
			document.title = '面谱';
			// 判断是不是微信
			var ua = window.navigator.userAgent.toLowerCase();
			if(ua.match(/MicroMessenger/i) == 'micromessenger' || window.location.host.indexOf('localhost:8080') != -1){
				var self = this;
				this.global.shouquan();
				this.postData('post','/shop-v1-masks_info.html',{'masks_id':this.$route.query.masks_id}).then(res => {
					res.data.info = res.data.info.replace(/\n|\r\n/g, "<br/>");
					this.info = res.data;
					if(res.data.video == ''){
						this.ifShow = false;
						this.ifvideo = false;
					}
				});
				// 监听是不是到底部
				// var $window = $(window);
	   //     		var $document = $(document);
				// document.addEventListener('scroll',function(){
				// 	if(self.iszanmost == false){
				// 		if($document.scrollTop() + $window.height() >= $document.height()){
				// 			if(self.ifLoad == true){
				// 				self.loading = true;
				// 				self.pageNo = Number(self.pageNo)+Number(1);
				// 				self.postData('post','/shop-v1-masks_join_lst.html',{masks_id:self.$route.query.masks_id,page:self.pageNo,pageSize:10,orderBy:self.orderBy}).then(res => {
				// 					self.loading = false;
				// 					if(res.data.data.length != 0){
				// 						self.users = self.users.concat(res.data.data);
				// 						if(res.data.data.length < 10){
				// 							self.ifLoad = false;
				// 							self.loadNo = true;
				// 						}
				// 					}else{
				// 						self.ifLoad = false;
				// 						self.loadNo = true;
				// 						self.pageNo = Number(self.pageNo)-Number(1);
				// 					}
				// 				})
				// 			}else{
				// 				self.loadNo = true;
				// 			}
				// 		}
				// 	}
				// });
				this.postData('post','/shop-v1-masks_count_joins.html',{masks_id:this.$route.query.masks_id}).then(res => {
					this.list = res.data;
				})
			}else{
			 this.postData('post','shop-v1-index_get_root.html').then(res => {
			  this.$router.push({path:'/faceHomePc',query:{masks_id:this.$route.query.masks_id,root_id:this.$route.query.root_id}});
			 })
			}
		},
		mounted(){
		},
		updated(){
			this.share(this.info.title,this.info.info,this.info.pic);
		},
		methods:{
			getTip(){
				this.tip = true;
			},
			close(){
				this.tip = false;
				this.ifcode = false;
			},
			getCode(){
				this.ifcode = true;
			},
			jion(){
				this.$router.push({path:'/faceJion',query:{masks_id:this.$route.query.masks_id}})
			},
			faceDatails(id){
				this.$router.push({path:'/faceDetail',query:{masks_id:this.$route.query.masks_id,id:id,rid:this.$route.query.root_id}})
			},
			playVideo(){
				if(this.ifvideo == true){
					if(document.getElementById('video').paused == true){
						$('#video').css('opacity','1');
						$('#video')[0].play();
						this.ifShow = false;
					}else{
						$('#video').css('opacity','0');
						$('#video')[0].pause();
						this.ifShow = true;
					}
				}
			},
			search(){
				this.$router.push({path:'/faceSearch',query:{masks_id:this.$route.query.masks_id}})
			},
			zan1(type){
				Indicator.open();
				this.iszanmost = true;
				this.ifLoad = true;
				this.pageNo = 1;
				this.loadNo = false;
				if(type == 1){
					this.zan = true;
					this.orderBy = 1;
					// this.postData('post','/shop-v1-masks_join_lst.html',{masks_id:this.$route.query.masks_id,page:this.pageNo,pageSize:10,orderBy:this.orderBy}).then(res => {
					// 	if(res.data.data.length != 0){
					// 		this.users = res.data.data;
					// 	}
					// })
				}else{
					this.iszanmost = false;
					this.zan = false;
					this.orderBy = 2;
					// this.postData('post','/shop-v1-masks_join_lst.html',{masks_id:this.$route.query.masks_id,page:this.pageNo,pageSize:10,orderBy:this.orderBy}).then(res => {
					// 	if(res.data.data.length != 0){
					// 		this.users = res.data.data;
					// 	}
					// })
				}
			},
			getMore(){
				if(this.ifLoad == true){
					$('.loadMore').text('加载中...');
					this.pageNo = Number(this.pageNo)+Number(1);
					this.postData('post','/shop-v1-masks_join_lst.html',{masks_id:this.$route.query.masks_id,page:this.pageNo,pageSize:10,orderBy:this.orderBy}).then(res => {
						if(res.data.data.length != 0){
							$('.loadMore').text('加载更多...');
							this.users = this.users.concat(res.data.data);
						}else{
							$('.loadMore').text('到底啦');
							this.ifLoad = false;
							this.pageNo = Number(this.pageNo)-Number(1);
						}
					})
				}else{
					Toast({
					  message: '数据加载完毕',
					  iconClass: 'icon iconfont icon-2',
					  duration: 1000
					});
				}
			}
		},
		components:{loadNo,nodata,faceList},
		filters:{
			content(val){
				val = val.replace(/_@/g, '').replace(/_#/g, '').replace(/&nbsp;/g, '').replace(/<br\/>/g, "");
				return val;
			}
		}
	}
</script>
<style lang="less">
	.faceHome{
		font-size: 0.205rem;
		color: #333;
		video::-webkit-media-controls-enclosure {
	        overflow:hidden;
	    }
		.code1{
			width: 4.438rem;
			// height: 4.438rem;
			position: fixed;
			top: 50%;
			left: 50%;
			margin: -2.219rem 0 0 -2.219rem;
			z-index: 11;
			background-color: #fff;
			padding-bottom: 0.17rem;
		}
		.video{
			width: 100%;
			height: 3.413rem;
			background-color: #fff;
			position: relative;
			.bg1{
				background-color: rgba(0,0,0,0.6);
				width: 100%;
				height: 100%;
				position: absolute;
				top: 0;
				background-size: cover;
    			background-origin: content-box;
				i{
					font-size: 0.8rem;
					margin-left: calc(~"50% - 0.4rem");
					position: absolute;
					top: calc(~"50% - 0.4rem");
					color: rgba(255,255,255,0.6);
				}
			}
			video{
				height: 100%;
    			width: 100%;
    			opacity: 0;
			}
		}
		.desc1{
			background-color: #fff;
			width: calc(~"100% - 0.34rem");
			padding:0.17rem 0.17rem;
			border-bottom: 1px solid #eee;
			.title1{
				text-align: center;
				font-size: 0.256rem;
				margin-bottom: 0.05rem;
				img{
					width: 0.3rem;
				}
				span{
					margin: 0 0.06rem;
				}
			}
			.zhengwen{
				font-size: 0.222rem;
				color: #666;
				line-height: 0.35rem;
			}
		}
		.num1{
			height: 0.9rem;
			width: calc(~"100% - 0.34rem");
			padding: 0 0.17rem;
			background-color: #fff;
			position: relative;
			margin-bottom: 0.17rem;
			.num2{
				line-height: 0.9rem;
				color: #ef4949;
			}
			.tou1{
				display: inline-block;
				float: right;
				margin-top: 0.2rem;
				margin-right: 0.2rem;
				img{
					width: 0.5rem;
					height: 0.5rem;
					border-radius: 50%;
				}
				img:nth-child(2){
					position: relative;
					left: -0.08rem;
				}
				img:nth-child(3){
					position: relative;
					left: -0.16rem;
				}
				img:nth-child(4){
					position: relative;
					left: -0.24rem;
				}
				img:nth-child(5){
					position: relative;
					left: -0.32rem;
				}
			}
			.icon-dayuhao1{
				position: absolute;
				right: 0;
				color: #ddd;
				top: 0.25rem;
			}
		}
		.search{
			background-color: #fff;
			height: 0.768rem;
			width: calc(~"100% - 0.34rem");
			padding: 0 0.17rem;
			position: relative;
			margin-bottom: 0.17rem;
			.new,.zan{
				color: #ef4949;
				line-height: 0.768rem;
			}
			input{
				float: right;
				height: 0.45rem;
				margin-top: 0.15rem;
				border-radius: 0.4rem;
				outline-style: none;
				border:none;
				background-color: #f0eded;
				padding-left: 0.45rem;
				width: 3rem;

			}
			i{
				position: absolute;
				right: 3.2rem;
				top: 0.21rem;
				color: #999;
				font-weight: bold;
				font-size: 0.3rem;
			}
		}
		.alllist1{
			width: calc(~"100% - 0.34rem");
			padding: 0 0.17rem;
			-webkit-column-count: 2;
			-moz-column-count: 2;
			column-count: 2;
		}
		.alllist{
			.list{
				margin-bottom: 0.17rem;
				display:inline-block;
				width:2.98rem;
				background-color:#fff;
				height:100%;
				overflow: auto;
				.img1{
					width: 100%;
				}
			}
			.user1{
				height: 0.682rem;
				width: calc(~"100% - 0.34rem");
				padding: 0 0.17rem;
				position: relative;
				.img3{
					width: 0.72rem;
					height: 0.72rem;
					border-radius: 50%;
					position: absolute;
					top: -0.15rem;
					background-color: #fff;
					.img2{
						width: 0.68rem;
						height: 0.68rem;
						border-radius: 50%;
						position: absolute;
						top: 0.02rem;
						left: 0.02rem;
					}
				}
				span{
					line-height: 0.682rem;
					margin-left: 0.85rem;
					width: 1.9rem;
				    overflow: hidden;
				    white-space: nowrap;
				    text-overflow: ellipsis;
				    display: inline-block;
				    font-size: 0.222rem;
				}
			}
			.detail1{
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 5;
				overflow: hidden;
				color: #666;
				width: calc(~"100% - 0.34rem");
				padding: 0 0.17rem;
			}
			.zan1{
				margin-right: 0.17rem;
				float: right;
				margin-top: 0.2rem;
				margin-bottom: 0.2rem;
				color: #ef4949;
				i{
					font-size: 0.3rem;
				}
			}
		}
		.loadMore{
			color: #999;
			font-size: 0.239rem;
			text-decoration: underline;
			width: 100%;
			text-align: center;
			height: 1rem;
			line-height: 0.8rem;
		}
		.operating1{
			width: 100%;
			height: 0.768rem;
			overflow:auto;
			position: fixed;
			bottom: 0;
			li{
				float: left;
				height: 0.768rem;
				font-size: 0.239rem;
			}
			li:nth-child(1){
				width: calc(~"1.065rem - 1px");
				background-color: #fff;
				color: #666;
				text-align: center;
				position: relative;
				// border-right: 1px solid #eee;
				.line1{
					width: 1px;
					height: 0.5rem;
					background-color: #eee;
					position: absolute;
					right: 0;
					top: 0.134rem;
				}
				i{
					line-height: 0.5rem;
					font-size: 0.28rem;
					color: #5ebd9f;
				}
			}
			li:nth-child(2){
				width: 1.065rem;
				background-color: #fff;
				color: #666;
				text-align: center;
				i{
					line-height: 0.5rem;
					font-size: 0.28rem;
					color: #ff9d00;
				}
				// span{
				// 	position: relative;
				// 	top: -0.06rem;
				// }
			}
			li:nth-child(3){
				width: calc(~"100% - 1.065rem - 1.065rem");
				background-color: #ef4949;
				color: #fff;
				line-height: 0.768rem;
				text-align: center;
			}
		}
		.tip{
			width: 4.266rem;
			height: 5.632rem;
			background-color: #ef4949;
			position: fixed;
			z-index: 15;
			top: 50%;
			left: 50%;
			border-radius: 0.128rem;
			margin:-2.816rem 0 0 -2.133rem;
			.tip1{
				width: 4.045rem;
				height: 5.41rem;
				background-color: #ffeed5;
				border-radius: 0.128rem;
				margin-left: 0.1105rem;
				margin-top: 0.1105rem;
				position: relative;
				i{
					position: absolute;
					right: -0.55rem;
					color: #fff;
					top: -0.55rem;
					font-size: 0.45rem;
					color: #999;
				}
			}
			.title1{
				font-size: 0.256rem;
				color: #ef4949;
				text-align: center;
				margin-bottom: 0.17rem;
				padding-top: 0.17rem;
			}
			.desc3{
				width: calc(~"100% - 0.512rem");
				padding: 0 0.256rem;
				height: 4.33rem;
				overflow: auto;
				.desc2{
					margin-bottom: 0.13rem;
				}
			}
		}
		.bg{
			width: 100%;
			height: 100%;
			background-color: rgba(0,0,0,0.6);
			position: fixed;
			top: 0;
		}
	}
</style>