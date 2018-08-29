<template>
	<div class="faceHomePc">
		<div class="nav1">
			<div class="middle1">
				<img :src="info.logo">
				<div class="btn1" @click="jion()">
					立即参加
				</div>
			</div>
		</div>
		<div class="middle2">
			<div style="position:relative;">
				<video id="video1" :src="info.video" :poster="info.pic" @click="play()"></video>
				<div class="videobg" v-show="videobg">
					<i class="icon iconfont icon-bofang" @click="play()"></i>
				</div>
			</div>
			<div class="title2">{{info.title}}</div>
			<div class="desc1" v-html="info.info">
				{{info.info}}
			</div>
			<div class="operating">
				<span :class="{red:type==1}" @click="getType(1)">最多点赞</span>
				<span>/</span>
				<span :class="{red:type==2}" @click="getType(2)">最新上传</span>
				<input type="text" placeholder="搜索关键词" v-model="text">
				<i class="icon iconfont icon-sousuo1" style="cursor:pointer;" @click="search()"></i>
			</div>
			<div class="nodata1" v-show="nodata">
				<img src="../../../../static/img/facePc/nodata.png">
				<div>抱歉！没有找到符合条件的相关作品</div>
				<div style="font-size:14px;">您可以尝试更换关键词: 回家、车票等</div>
			</div>
			<div class="waterfall">
				<div class="item" v-for="i in arr">
					<div class="info1">
						<img class="img1" :src="i.face">
						<p>{{i.nickname}}</p>
						<i class="icon iconfont icon-tixing1" @mouseenter="getInfo(i.masks_user_id,$event)" @mouseleave="closeInfo()"></i>
					</div>
					<img class="img2" :src="i.pic"  @click="details(i.masks_user_id)">
					<div class="content1"  @click="details(i.masks_user_id)">{{i.content | content}}</div>
					<div class="zanNum">
						<i class="icon iconfont icon-dianzan1"></i>{{i.thumbs}}
					</div>
					<!-- <div class="camerainfo"></div> -->
				</div>
			</div>
			<div class="btn2" @click="loadMore()">加载更多</div>
		</div>
		<div class="footer1">
			<div id="middle4" style="position: relative;left: 50%;float: left;">
				<ul class="middle3">
					<li>
						<img :src="info.wechat">
					</li>
					<li>
						<div class="zi" v-html="info.footer_message">
							<div>{{info.footer_message}}</div>
						</div>
					</li>
				</ul>
			</div>
			<div style="color:#999;text-align:center;font-size:14px;margin-top:111px;">{{info.copyright}}</div>
		</div>
		<span class="ding" v-show="ifshow" @click="goTop()">
			<i class="icon iconfont icon-tubiao02"></i>
		</span>
		<div class="bg" v-show="ifdetail" @click="closeDetail()"></div>
		<div class="details" v-show="ifdetail">
			<div class="head1">
				<img src="../../../../static/img/zhanwei.png">
				<span>{{detail.nickname}}</span>
				<i class="icon iconfont icon-guanbi" style="cursor:pointer;" @click="closeDetail()"></i>
			</div>
			<img class="img3" :src="detail.pic">
			<div class="content2">
				{{detail.content}}
			</div>
			<div class="info2">
				<span style="margin-bottom:10px;">照片参数：{{detail.business}}，{{detail.model}}，{{detail.exposure}}，{{detail.focalLength}}，{{detail.sensitive}}</span>
				<span>{{detail.create_time}}</span>
			</div>
			<div class="zan1" @click="jion()">
				<i class="icon iconfont icon-dianzan"></i>
				<div class="shu">{{detail.thumbs}}</div>
			</div>
			<div style="width:100%;height:1px;background-color:#eee;margin-top:30px;"></div>
			<div class="zanList">
				<ul class="ul1">
					<li>
						<div>谁点赞过</div>
						<img src="../../../../static/img/facePc/LIKE.png">
					</li>
					<li>
						<img class="img4" :src="i.face" v-for="i in arr2">
						<div class="loadMore" v-show="loadMore1" @click="loadzan()" style="cursor:pointer;">
							加载更多...
						</div>
					</li>
				</ul>
			</div>
		</div>
		<div class="zuo" v-show="ifdetail">
			<i class="icon iconfont icon-shangyigeshi" @click="pre()"></i>
		</div>
		<div class="you" v-show="ifdetail">
			<i class="icon iconfont icon-xiayiyeshi" @click="next()"></i>
		</div>
		<div class="camerainfo" v-show="camerainfo">
			<img src="../../../../static/img/facePc/border.png">
			<div style="position:relative;z-index:10;font-size:14px;">
				<div class="title1">照片参数</div>
				<div class="info3">
					<span>制造商：</span>
					<span>{{info2.business}}</span>
				</div>
				<div class="info3">
					<span>型号：</span>
					<span>{{info2.model}}</span>
				</div>
				<div class="info3">
					<span>曝光时间：</span>
					<span>{{info2.exposure}}</span>
				</div>
				<div class="info3">
					<span>焦距比例：</span>
					<span>{{info2.focalLength}}</span>
				</div>
				<div class="info3" style="border-bottom:none;">
					<span>ISO：</span>
					<span>{{info2.sensitive}}</span>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import { Toast } from 'mint-ui';
	export default{
		data(){
			return{
				ifdetail:false,
				ifshow:false,
				nodata:false,
				info:[],
				info2:[],
				type:1,
				pageNo:1,
				pageNo2:1,
				arr:[],
				ifload:true,
				text:'',
				detail:[],
				arr2:[],
				loadMore1:true,
				mid:'',
				videobg:true,
				camerainfo:false,
			}
		},
		created(){
			document.title = '面谱';
			var self = this;
			var ua = window.navigator.userAgent.toLowerCase();
			if(ua.match(/MicroMessenger/i) == 'micromessenger'){
				this.$router.push({path:'/faceHome',query:{masks_id:this.$route.query.masks_id,root_id:this.$route.query.root_id}});
			}else{
				 $(window).scroll(function(event){
				 	if($(window).scrollTop() == 0){
				 		self.ifshow = false;
				 	}else{
				 		self.ifshow = true;
				 	}
				 });
				 this.postData('post','/shop-v1-index_checklogin.html',{url:window.location.href,root_id:this.$route.query.root_id}).then(res => {
					 self.postData('post','/shop-v1-masks_info.html',{masks_id:self.$route.query.masks_id}).then(res => {
					 	res.data.footer_message = res.data.footer_message.replace(/\n|\r\n/g, "<br/>");
					 	res.data.info = res.data.info.replace(/\n|\r\n/g, "<br/>");
					 	self.info = res.data;
					 	if(res.data.video == ''){
					 		this.videobg  =false;
					 	}
					 });
					 self.postData('post','/shop-v1-masks_join_lst.html',{masks_id:self.$route.query.masks_id,page:self.pageNo,pageSize:12,orderBy:self.type}).then(res => {
					 	if(res.data.status == 1){
					 		self.arr = res.data.data;
					 	}
					 });
				 })
			}
			document.addEventListener('keydown',function(){
				var event =window.event||arguments.callee.caller.arguments[0];
			    if(event.keyCode== 13){
			        self.pageNo = 1;
					$('.btn2').eq(0).css('display','block');
					self.postData('post','/shop-v1-masks_join_lst.html',{masks_id:self.$route.query.masks_id,page:self.pageNo,pageSize:12,orderBy:self.type,title:self.text}).then(res => {
					 	if(res.data.status == 1){
					 		if(res.data.data.length < 12){
					 			$('.btn2').eq(0).css('display','none');
					 		}
					 		self.arr = res.data.data;
					 	}
					});
			    }
			})
		},
		methods:{
			jion(){
				this.$router.push({path:'/codePc',query:{masks_id:this.$route.query.masks_id,root_id:this.$route.query.root_id}});
			},
			loadMore(){
				if(this.ifload == true){
					$('.btn2').eq(0).text('加载中...');
					this.pageNo = Number(this.pageNo) + Number(1);
					this.postData('post','/shop-v1-masks_join_lst.html',{masks_id:this.$route.query.masks_id,page:this.pageNo,pageSize:12,orderBy:this.type}).then(res => {
						$('.btn2').eq(0).text('加载更多');
					 	if(res.data.status == 1){
					 		if(res.data.data.length != 0){
					 			this.arr = this.arr.concat(res.data.data);
					 		}else{
					 			this.ifload == false;
					 			this.pageNo--;
					 			$('.btn2').eq(0).css('display','none');
					 		}
					 	}
					 })
				}
			},
			getType(type){
				this.pageNo = 1;
				this.type = type;
				$('.btn2').eq(0).css('display','block');
				this.postData('post','/shop-v1-masks_join_lst.html',{masks_id:this.$route.query.masks_id,page:this.pageNo,pageSize:12,orderBy:type}).then(res => {
				 	if(res.data.status == 1){
				 		this.arr = res.data.data;
				 	}
				})
			},
			goTop(){
				$('html,body').animate({scrollTop:0},'slow');
			},
			search(){
				this.pageNo = 1;
				$('.btn2').eq(0).css('display','block');
				this.postData('post','/shop-v1-masks_join_lst.html',{masks_id:this.$route.query.masks_id,page:this.pageNo,pageSize:12,orderBy:this.type,title:this.text}).then(res => {
				 	if(res.data.status == 1){
				 		if(res.data.data.length < 12){
				 			$('.btn2').eq(0).css('display','none');
				 		}
				 		this.arr = res.data.data;
				 	}
				});
			},
			details(id){
				this.arr2 = [];
				this.detail = [];
				this.mid = id;
				this.ifdetail = true;
				this.pageNo2 = 1;
				this.postData('post','/shop-v1-masks_join_detail.html',{masks_user_id:id}).then(res => {
					res.data.content = res.data.content.replace(/_@/g, '<br/>').replace(/_#/g, '<br/>');
					res.data.business = res.data.camera_info.制造商;
					res.data.model = res.data.camera_info.型号;
					res.data.exposure = res.data.camera_info.曝光时间;
					res.data.focalLength = res.data.camera_info.焦距比数;
					res.data.sensitive = res.data.camera_info.ISO感光度;
					this.detail = res.data;
				});
				this.postData('post','/shop-v1-masks_join_thumbs_lst.html',{masks_user_id:id,page:this.pageNo2,pageSize:20}).then(res => {
					this.arr2 = res.data;
					if(res.data.length < 20){
						this.loadMore1 = false;
					}
				})
			},
			closeDetail(){
				this.ifdetail = false;
			},
			loadzan(){
				this.pageNo2++;
				this.postData('post','/shop-v1-masks_join_thumbs_lst.html',{masks_user_id:this.mid,page:this.pageNo2,pageSize:20}).then(res => {
					this.arr2 = this.arr2.concat(res.data);
					if(res.data.length < 20){
						this.loadMore1 = false;
					}
				})
			},
			pre(){
				var self = this;
				this.postData('post','/shop-v1-masks_join_next_detail.html',{masks_id:this.$route.query.masks_id,masks_user_id:this.mid,type:1,orderBy:this.type}).then(res => {
					if(res.data.status == 1){
						res.data.data.content = res.data.data.content.replace(/_@/g, '<br/>').replace(/_#/g, '<br/>');
						res.data.data.business = res.data.data.camera_info.制造商;
						res.data.data.model = res.data.data.camera_info.型号;
						res.data.data.exposure = res.data.data.camera_info.曝光时间;
						res.data.data.focalLength = res.data.data.camera_info.焦距比数;
						res.data.data.sensitive = res.data.data.camera_info.ISO感光度;
						this.detail = res.data.data;
						this.mid = res.data.data.masks_user_id;
						this.postData('post','/shop-v1-masks_join_thumbs_lst.html',{masks_user_id:res.data.data.masks_user_id,page:1,pageSize:20}).then(res => {
							self.pageNo2 = 1;
							self.arr2 = res.data;
							if(res.data.length < 20){
								self.loadMore1 = false;
							}
						})
					}else{
						Toast({
						  message: res.data.msg,
						  duration: 1000
						});
					}
				},res => {
					Toast({
					  message: '接口报错',
					  duration: 1000
					});
				})
			},
			next(){
				var self = this;
				this.postData('post','/shop-v1-masks_join_next_detail.html',{masks_id:this.$route.query.masks_id,masks_user_id:this.mid,type:2,orderBy:this.type}).then(res => {
					if(res.data.status == 1){
						res.data.data.content = res.data.data.content.replace(/_@/g, '<br/>').replace(/_#/g, '<br/>');
						res.data.data.business = res.data.data.camera_info.制造商;
						res.data.data.model = res.data.data.camera_info.型号;
						res.data.data.exposure = res.data.data.camera_info.曝光时间;
						res.data.data.focalLength = res.data.data.camera_info.焦距比数;
						res.data.data.sensitive = res.data.data.camera_info.ISO感光度;
						this.detail = res.data.data;
						this.mid = res.data.data.masks_user_id;
						this.postData('post','/shop-v1-masks_join_thumbs_lst.html',{masks_user_id:res.data.data.masks_user_id,page:1,pageSize:20}).then(res => {
							self.pageNo2 = 1;
							self.arr2 = res.data;
							if(res.data.length < 20){
								self.loadMore1 = false;
							}
						})
					}else{
						Toast({
						  message: res.data.msg,
						  duration: 1000
						});
					}
				},res => {
					Toast({
					  message: '接口报错',
					  duration: 1000
					});
				})
			},
			play(){
				// document.getElementById("video1").onended = function(){
				// 	this.videobg = true;
				// }
				if(document.getElementById('video1').paused == true){
					this.videobg = false;
					$('#video1')[0].play();
				}else{
					this.videobg = true;
					$('#video1')[0].pause();
				}
			},
			getInfo(id,e){
				this.camerainfo = true;
				this.postData('post','/shop-v1-masks_join_detail.html',{masks_user_id:id}).then(res => {
					res.data.business = res.data.camera_info.制造商;
					res.data.model = res.data.camera_info.型号;
					res.data.exposure = res.data.camera_info.曝光时间;
					res.data.focalLength = res.data.camera_info.焦距比数;
					res.data.sensitive = res.data.camera_info.ISO感光度;
					this.info2 = res.data;
				})
				$('.camerainfo').eq(0).css('top',$(e.target).offset().top+25);
				$('.camerainfo').eq(0).css('left',$(e.target).offset().left-183);
			},
			closeInfo(){
				this.info2 = [];
				this.camerainfo = false;
			}
		},
		filters:{
			content(val){
				val = val.replace(/_@/g, '').replace(/_#/g, '').replace(/&nbsp;/g, '').replace(/<br\/>/g, "");
				return val;
			}
		}
	}
</script>
<style lang="less">
	.faceHomePc{
		font-size: 12px;
		color: #333;
		video::-webkit-media-controls-enclosure {
	        overflow:hidden;
	    }
		.camerainfo{
			width: 265px;
			height: 243px;
			position: absolute;
			img{
				position: absolute;
				top: 0;
				left: 0;
			}
			.title1{
				text-align: center;
				margin-top: 28px;
				color: #666;
			}
			.info3{
				margin: 10px 26px;
				height: 27px;
				border-bottom: 1px solid #eee;
				span{
					display: inline-block;
				}
				span:nth-child(1){
					float: left;
				}
				span:nth-child(2){
					float: right;
					color: #999;
				}
			}
		}
		.nav1{
			width: 100%;
			height: 60px;
			background-color: #24292c;
			.middle1{
				width: 80%;
				margin: 0 auto;
				img{
					width: 74px;
					margin-top: 13px;
				}
				.btn1{
					display: inline-block;
					width: 122px;
					height: 35px;
					background-color: #ef4949;
					border-radius: 5px;
					color: #fff;
					font-size: 16px;
					text-align: center;
					line-height: 35px;
					vertical-align: top;
					margin-top: 12.5px;
					float: right;
					cursor: pointer;
				}
				.btn1:hover{
					background-color: #e04747;
				}
			}
		}
		.middle2{
			width: 62.5%;
			margin: 0 auto;
			video{
				width: 100%;
				height: auto;
			}
			.title2{
				text-align: center;
				font-size: 20px;
				margin-top: 15px;
				margin-bottom: 15px;
			}
			.desc{
				font-size: 16px;
			}
			.videobg{
				width: 100%;
				height: 100%;
				background-color: rgba(0,0,0,0.6);
				position: absolute;
				top: 0;
				i{
					color: #fff;
					opacity: 0.8;
					font-size: 64px;
					display: inline-block;
					position: relative;
					margin-left: calc(~"50% - 32px");
					top: calc(~"50% - 32px");
					cursor: pointer;
				}
			}
			.operating{
				height: 60px;
				width: 100%;
				background-color: #fff;
				font-size: 16px;
				position: relative;
				margin-bottom: 30px;
				margin-top: 28px;
				span{
					line-height: 60px;
					display: inline-block;
					vertical-align: top;
					color: #999;
				}
				span:nth-child(1){
					margin-left: 30px;
					cursor: pointer;
				}
				span:nth-child(2){
					margin-left: 15px;
					margin-right: 15px;
				}
				span:nth-child(3){
					cursor: pointer;
				}
				input{
					float: right;
					width: 235px;
					height: 35px;
					border-radius: 35px;
					outline-style: none;
					border:none;
					background-color: #f0eded;
					margin-top: 12.5px;
					margin-right: 20px;
					padding-left: 15px;
				}
				i{
					position: absolute;
					right: 0;
					font-size: 20px;
					top: 18px;
					right: 30px;
					color: #999;
				}
				.red{
					color: #ef4949;
				}
			}
			.nodata1{
				font-size: 16px;
				color: #999;
				text-align: center;
				div{
					margin-top: 10px;
				}
			}
			.waterfall{
				width: 100%;
				-webkit-column-count: 4;
				-moz-column-count: 4;
				column-count: 4;
				.item{
					background-color: #fff;
					border-radius: 10px;
					margin-bottom: 30px;
					-moz-page-break-inside: avoid;
					-webkit-column-break-inside: avoid;
					break-inside: avoid;
					box-shadow:2px 4px 6px #b5b5b5;
					display:inline-block;
					height:100%;
					overflow: auto;
					position: relative;
					cursor: pointer;
					width: 100%;
					.info1{
						padding: 15px;
						.img1{
							width: 36px;
							height: 36px;
							border-radius: 36px;
						}
						p{
							display: inline-block;
							vertical-align: top;
							line-height: 36px;
							margin-left: 6px;
							width: calc(~"100% - 65px");
						    overflow: hidden;
						    white-space: nowrap;
						    text-overflow: ellipsis;
						}
						.icon-tixing1{
							font-size: 15px;
							vertical-align: top;
							display: inline-block;
							line-height: 36px;
							float: right;
							color: #a89e9e;
						}
					}
					.img2{
						width: 100%;
						margin-bottom:10px;
					}
					.content1{
						padding: 0 15px;
						margin-bottom: 15px;
						font-size: 14px;
						color: #999;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 4;
						overflow: hidden;
					}
					.zanNum{
						border-top: 1px solid #eee;
						font-size: 14px;
						color: #999;
						padding: 15px;
						i{
							font-size: 20px;
							margin-right: 10px;
							color: #ef4949;
						}
					}
			    }
			}
			.btn2{
				width: 260px;
				height: 50px;
				text-align: center;
				color: #fff;
				background-color: #24292c;
				line-height: 50px;
				margin: 0 auto;
				font-size: 14px;
				cursor: pointer;
			}
		}
		.footer1{
			width: 100%;
			padding-top: 40px;
			padding-bottom: 30px;
			background-color: #24292c;
			margin-top: 80px;
			.middle3{
				color: #fff;
				font-size: 14px;
				display: inline-block;
				position: relative;
    			left: -50%;
				li{
					float: left;
				}
				li:nth-child(1){
					border-right: 1px solid #999;
					padding-right: 32px;
				}
				li:nth-child(2){
					margin-left: 32px;
				}
				img{
					width: 87px;
					height: 87px;
				}
			}
		}
		.ding{
			display: inline-block;
			position: fixed;
			bottom: 250px;
			right: calc(~"10% - 50px");
			width: 40px;
			height: 40px;
			background-color: #494949;
			border-radius: 5px;
			cursor: pointer;
			i{
				color: #fff;
				font-size: 24px;
				margin-left: 8px;
				margin-top: 6px;
				display: inline-block;
			}
		}
		.bg{
			background-color: rgba(0,0,0,0.6);
			width: 100%;
			min-height: 100%;
			position: fixed;
			z-index: 15;
			top: 0;
		}
		.details{
			width: 50%;
			height: calc(~"100% - 120px");
			overflow: scroll;
			background-color: #fff;
			position: fixed;
			z-index: 16;
			top: 40px;
			left: 25%;
			padding: 20px 0;
			overflow-x: hidden;
			.head1{
				padding: 0 30px;
				margin-bottom: 20px;
				img{
					width: 50px;
					height: 50px;
					border-radius: 50px;
					display: inline-block;
					vertical-align: top;
					margin-right: 10px;
				}
				span{
					display: inline-block;
					vertical-align: top;
					line-height: 50px;
					font-size: 24px;
					width: calc(~"100% - 90px");
				    white-space: nowrap;
				    overflow: hidden;
				    text-overflow: ellipsis;
				}
				i{
					display: inline-block;
					vertical-align: top;
					font-size: 20px;
					line-height: 50px;
					color: #999;
					float: right;
				}
			}
			.img3{
				width: 100%;
			}
			.content2{
				margin-top: 30px;
				font-size: 14px;
				padding: 0 40px;
				line-height: 24px;
			}
			.info2{
				padding: 30px 40px;
				color: #ccc;
				font-size: 14px;
				span{
					display: inline-block;
				}
				span:nth-child(2){
					float: right;
				}
			}
			.zan1{
				width: 88px;
				height: 88px;
				border-radius: 88px;
				border:1px solid #ef4949;
				margin: 0 auto;
				cursor: pointer;
				i{
					color: #ef4949;
					font-size: 50px;
					display: inline-block;
					margin-left: 19px;
					margin-top: 6px;
				}
				.shu{
					color: #666;
					font-size: 14px;
					text-align: center;
				}
			}
			.zanList{
				font-size: 14px;
				margin-top: 40px;
				.ul1{
					width: 100%;
					li{
						float: left;
					}
					li:nth-child(1){
						width: 120px;
						text-align: center;
						color: #ff9d00;
						img{
							width: 40px;
						}
					}
					li:nth-child(2){
						width: calc(~"100% - 120px");
						.img4{
							width: 50px;
							height: 50px;
							border-radius: 50px;
							margin-bottom: 8px;
							margin-right: 8px;
						}
						.loadMore{
							color: #999;
							font-size: 14px;
							text-align: center;
							margin-top: 10px;
							text-decoration: underline;
							margin-bottom: 20px;
						}
					}
				}
			}
		}
		.zuo,.you{
			width: 60px;
			height: 180px;
			border-radius: 5px;
			position: fixed;
			z-index: 15;
			top: 0;
			background-color: #ffffff;
			top: calc(~"50% - 90px");
			cursor: pointer;
			i{
				font-size: 30px;
				margin-left: 15px;
				display: inline-block;
				margin-top: 65px;
				color: #cccccc;
			}
		}
		.zuo{
			left: calc(~"25% - 110px");
		}
		.you{
			right: calc(~"25% - 110px");
		}
	}
</style>