<template>
	<div class="faceDetail">
		<img style="display:none" id="tu" src="">
		<img class="pic" :src="info.pic_small">
		<img class="preview-img picsahng" v-for="(item, index) in list" :src="item.src" height="100" @click="$preview.open(index, list)">
		<div class="info">
			<ul>
				<li>
					<div class="img1">
						<img :src="info.face">
					</div>
				</li>
				<li>
					<div class="name1">
						<span style="max-width:4.1rem;display:inline-block;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">{{info.nickname}}的{{info.pic_name}}</span>
						<i class="icon iconfont icon-tixing1" @click="cameraInfo()"></i>
					</div>
					<div class="time1">
						{{info.create_time}}
					</div>
				</li>
				<!-- <li>
					<i class="icon iconfont icon-dianzan1"></i>
				</li> -->
			</ul>
			<div class="cameraInfo" v-show="cameraInfo1">
				<div class="caret"></div>
				<div class="title1">
					照片参数
				</div>
				<div class="info1">
					<span>制造商：</span>
					<span>{{info.business}}</span>
				</div>
				<div class="info1">
					<span>型号：</span>
					<span>{{info.model}}</span>
				</div>
				<div class="info1">
					<span>曝光时间：</span>
					<span>{{info.exposure=='秒'?'未知':info.exposure}}</span>
				</div>
				<div class="info1">
					<span>焦距比数：</span>
					<span>{{info.focalLength}}</span>
				</div>
				<div class="info1" style="border:0;">
					<span>ISO：</span>
					<span>{{info.sensitive}}</span>
				</div>
			</div>
		</div>
		<div style="background-color:#fff;">
			<div class="line"></div>
		</div>
		<div class="article" v-html="info.content">
			{{info.content}}
		</div>
		<div class="zanNum">
			<div class="left1">
				<div>谁点赞过</div>
				<img src="../../../../static/img/face/like1.png">
			</div>
			<div class="right1">
				<div class="face1">
					<img :src="i.face" v-for="i in arr2">
				</div>
				<div class="loadmore1" v-if="arr2.length > 11" @click="loadMore()" v-show="more">加载更多...</div>
			</div>
			<!-- <ul>
				<li>
					<div>谁点赞过</div>
					<img src="../../../../static/img/face/like1.png">
				</li>
				<li>
					<div class="face1">
						<img :src="i.face" v-for="i in arr2">
					</div>
					<div class="loadmore1" v-if="arr2.length > 12" @click="loadMore()" v-show="more">加载更多...</div>
				</li>
			</ul> -->
		</div>
		<div style="height:0.768rem;"></div>
		<ul class="operating" :class="{operating2:info.is_myself==0}">
			<li @click="sharePic()">
				<i class="icon iconfont icon-09"></i>
				<span>分享</span>
				<div class="line1"></div>
			</li>
			<li @click="edit()" v-if="info.is_myself==1">
				<i class="icon iconfont icon-bianji1"></i>
				<span>编辑</span>
			</li>
			<li @click="like(info.masks_user_id)" :class="{red:ifzan==true,nored:ifzan==false}">
				<i class="icon iconfont icon-dianzan1"></i>
				点赞({{info.thumbs}})
			</li>
		</ul>
		<div class="bg" v-show="shareTu" @click="close()">
			加载中...
		</div>
		<div class="bg1" v-show="cameraInfo1" @click="cameraInfoClose()">
		</div>
		<img src="" id="shareTu" v-show="shareTu">
		<div class="home1" @click="goHome()">
			<i class="icon iconfont icon-caidantubiao-02"></i>
			<span>返回首页</span>
		</div>
	</div>
</template>
<script>
	import { Toast,Indicator } from 'mint-ui';
	export default{
		data(){
			return{
				cameraInfo1:false,
				shareTu:false,
				info:[],
				iflike:false,
				list:[{
		          src: '../../../../static/img/zhanwei.png',
		          w: 600,
		          h: 600
		        }],
		        pageNo:1,
		        more:true,
		        arr2:[],
		        url:'',
		        ifLoad:true,
		        ifbase:false,
		        ifzan:false,
		        ifnum:1,
				arr: ['../../../../static/img/face/share_bg.png','../../../../static/img/zhanwei.png','../../../../static/img/zhanwei.png','willingshe作品','','../../../../static/img/zhanwei.png'],
			}
		},
		created(){
			document.title = '作品详情';
			// Indicator.open('加载中...');
			var self = this;
			this.global.shouquan();
			if(window.location.href.indexOf('root_id') != -1){
	        	this.url = window.location.href;
	        }else{
	        	this.postData('post','/shop-v1-index_get_root.html').then(res => {
	        		if(res.data.status == 1){
	        			this.url = window.location.href + '&root_id=' + res.data.rootId;
	        		}
	        	})
	        };
	        // 判断有没有点赞
	        this.postData('post','/shop-v1-masks_join_thumbs.html',{masks_user_id:this.$route.query.id}).then(res => {
	        	if(res.data.status == 0){
	        		this.ifzan = true;
	        		// 获取点赞列表
					this.postData('post','/shop-v1-masks_join_thumbs_lst.html',{masks_user_id:this.$route.query.id,page:this.pageNo,pageSize:12}).then(res => {
						self.arr2 = res.data;
					});
					// 获取详情
					this.postData('post','/shop-v1-masks_join_detail.html',{masks_user_id:this.$route.query.id}).then(res => {
						res.data.content = res.data.content.replace(/_@/g, '<br/>').replace(/_#/g, '<br/>');
						res.data.business = res.data.camera_info.制造商;
						res.data.model = res.data.camera_info.型号;
						res.data.exposure = res.data.camera_info.曝光时间;
						res.data.focalLength = res.data.camera_info.焦距比数;
						res.data.sensitive = res.data.camera_info.ISO感光度;
						self.info = res.data;
						self.arr[3] = res.data.nickname+'作品';
						self.arr[4] = res.data.content;
						var width = res.data.camera_info.图片宽度.replace(/px/g,'');
						var height = res.data.camera_info.图片高度.replace(/px/g,'');
						self.list = [{
				          src: self.info.pic,
				          w: width,
				          h: height
				        }];
						var shareTile = res.data.pic_name
						var sharedesc = res.data.content.replace(/_@/g, '').replace(/_#/g, '').replace(/&nbsp;/g, '').replace(/<br\/>/g, "").substring(0,36)
						self.share(shareTile,sharedesc,res.data.pic);
					});
	        	}else{
	        		this.ifzan = false;
	        		this.postData('post','/shop-v1-masks_join_cancel_thumbs.html',{masks_user_id:this.$route.query.id}).then(res => {
	        			// 获取点赞列表
						self.postData('post','/shop-v1-masks_join_thumbs_lst.html',{masks_user_id:self.$route.query.id,page:self.pageNo,pageSize:12}).then(res => {
							self.arr2 = res.data;
						});
						// 获取详情
						self.postData('post','/shop-v1-masks_join_detail.html',{masks_user_id:self.$route.query.id}).then(res => {
							res.data.content = res.data.content.replace(/_@/g, '<br/>').replace(/_#/g, '<br/>');
							res.data.business = res.data.camera_info.制造商;
							res.data.model = res.data.camera_info.型号;
							res.data.exposure = res.data.camera_info.曝光时间;
							res.data.focalLength = res.data.camera_info.焦距比数;
							res.data.sensitive = res.data.camera_info.ISO感光度;
							self.info = res.data;
							self.arr[3] = res.data.nickname+'作品';
							self.arr[4] = res.data.content;
							var width = res.data.camera_info.图片宽度.replace(/px/g,'');
							var height = res.data.camera_info.图片高度.replace(/px/g,'');
							self.list = [{
					          src: self.info.pic,
					          w: width,
					          h: height
					        }];
							var shareTile = res.data.pic_name
							var sharedesc = res.data.content.replace(/_@/g, '').replace(/_#/g, '').replace(/&nbsp;/g, '').replace(/<br\/>/g, "").substring(0,36)
							self.share(shareTile,sharedesc,res.data.pic);
						});
	        		})
	        	}
	        })
		},
		mounted(){
		},
		updated(){
			// if(this.ifnum == 1){
			// 	this.ifnum++;
			// 	var shareTile = this.info.pic_name
			// 	var sharedesc = this.info.content.substring(0,36)+'...';
			// 	this.share(shareTile,sharedesc,this.info.pic);
			// }
		},
		methods:{
			cameraInfo(){
				this.cameraInfo1 = true;
			},
			cameraInfoClose(){
				this.cameraInfo1 = false;
			},
			loadMore(){
				this.pageNo = Number(this.pageNo)+Number(1);
				this.postData('post','/shop-v1-masks_join_thumbs_lst.html',{masks_user_id:this.$route.query.id,page:this.pageNo,pageSize:12}).then(res => {
					if(res.data.length != 0){
						this.arr2 = this.arr2.concat(res.data);
					}else{
						this.more = false;
						this.pageNo = Number(this.pageNo)-Number(1);
					}
				})
			},
			like(id){
				this.postData('post','/shop-v1-masks_join_thumbs.html',{masks_user_id:id}).then(res => {
					// 点赞成功
					if(res.data.status == 1){
						this.ifzan = true;
						this.info.thumbs++;
						Toast({
						  message: res.data.msg,
						  iconClass: 'icon iconfont icon-dianzantianchong',
						  duration: 1000
						});
					}else{
						this.postData('post','/shop-v1-masks_join_cancel_thumbs.html',{masks_user_id:id}).then(res => {
							// 取消点赞
							this.info.thumbs--;
							this.ifzan = false;
							Toast({
							  message: res.data.msg,
							  iconClass: 'icon iconfont icon-quxiaozan',
							  duration: 1000
							});
						})
					}
					this.pageNo = 1;
					this.postData('post','/shop-v1-masks_join_thumbs_lst.html',{masks_user_id:this.$route.query.id,page:this.pageNo,pageSize:12}).then(res => {
						this.arr2 = res.data;
					});
				})
			},
			goHome(){
				this.$router.push({path:'/faceHome',query:{masks_id:this.$route.query.masks_id,root_id:this.$route.query.rid}})
			},
			sharePic(){
				this.$router.push({path:'facePromotion',query:{masks_id:this.$route.query.masks_id,id:this.$route.query.id,rid:this.$route.query.rid}});
				return false;
		        var self = this;
		        Indicator.open('加载中...');
				this.postData('post','/shop-v1-masks_join_pic_info.html',{masks_user_id:this.$route.query.id,url:this.url}).then(res => {
					Indicator.close();
					this.arr[1] = res.data.pic;
					this.arr[2] = res.data.face;
					this.arr[5] = res.data.urlCode;
					var arr = this.arr;
			        var mycanvas = document.createElement('canvas');
			        document.body.appendChild(mycanvas);
			        $('canvas').css('display', 'none');
			        var len = arr.length;
			        mycanvas.width = 1080;
			        mycanvas.height = 1920;
			        if (mycanvas.getContext) {
			          var context = mycanvas.getContext('2d');
			          // 设置背景色
			          context.fillStyle = '#fff';
			          context.fill();
			          context.fillRect(0, 0, mycanvas.width, mycanvas.height);
			          context.beginPath();
			          context.stroke();
			          var h = 0;

			          function drawing(num) {
			            if (num < len) {
			              var img = new Image;
			              img.crossOrigin = "*";
			              img.src = arr[num];
			              if (num == 0) {
			                img.onerror = function () {
			                  drawing(num + 1);
			                }
			                img.onload = function () {
			                  context.drawImage(img, 0, 0, mycanvas.width, mycanvas.height);
			                  drawing(num + 1);
			                }
			              } else if (num == 1) {
			                img.onerror = function () {
			                  drawing(num + 1);
			                }
			                img.onload = function () {
			                  context.drawImage(img, 0, 0, mycanvas.width, 726);
			                  drawing(num + 1);
			                }
			              } else if (num == 2) {
			                context.drawImage(img, mycanvas.width / 2 - 80, 640, 160, 160);
			                drawing(num + 1);
			              } else if (num == 3) {
			                context.font = '52px Microsoft YaHei';
			                context.fillStyle = '#333';
			                context.textAlign = 'center';
			                context.fillText(arr[num], mycanvas.width / 2, 880);
			                drawing(num + 1);
			              } else if (num == 4) {
			              	var length = arr[num].length;
			              	for(let i=0;i<4;i++){
			              		var ji = Number(i)+Number(1);
			              		var text = arr[num].substring(i*18,18*ji);
			              		context.font = '48px Microsoft YaHei';
				                context.fillStyle = '#999';
				                context.textAlign = 'center';
				                var jvli = Number(930) + Number(65) * Number(ji)
				                context.fillText(text, mycanvas.width / 2, jvli);
			              	}
			                drawing(num + 1);
			              } else if (num == 5) {
			                img.onerror = function () {
			                  drawing(num + 1);
			                }
			                img.onload = function () {
			                  context.drawImage(img, 730, 1475, 220, 220);
			                  drawing(num + 1);
			                }
			              }
			            } else {
			              self.imgPath = mycanvas.toDataURL("image/jpeg");
			              $('#shareTu').attr('src',self.imgPath);
			              self.shareTu = true;
			            }
			          }
			          drawing(0);
			        }
				})
	      	},
	      	close(){
	      		this.shareTu = false;
	      	},
	      	edit(){
	      		this.$router.push({path:'/faceJion',query:{masks_id:this.$route.query.masks_id,id:this.$route.query.id}});
	      	}
		}
	}
</script>
<style lang="less">
	.faceDetail{
		font-size: 0.205rem;
		color: #333;
		.home1{
			width: 1.35rem;
			height: 0.4266rem;
			border-radius: 0.4266rem 0 0 0.4266rem;;
			background-color: rgba(0,0,0,0.6);
			position: fixed;
			z-index: 11;
			bottom: 1.28rem;
			right: 0;
			i{
				color: #fff;
				font-size: 0.3rem;
				margin-left: 0.1rem;
				position: relative;
				top: 0.03rem;
			}
			span{
				color: #fff;
				font-size: 0.205rem;
			}
		}
		.pic{
			width: 100%;
			background-color: #fff;
			border-bottom: 1px solid #eee;
			background-color: #fff;
		}
		.picsahng{
			width: 100%;
		    height: auto;
		    position: absolute;
		    top: 0;
		    z-index: 11;
		    opacity: 0;
		}
		.info{
			padding-left: 0.34rem;
			height: 1.2rem;
			background-color: #fff;
			position: relative;
			ul{
				li{
					float: left;
					.img1{
						width: 1.274rem;
						height: 1.274rem;
						position: relative;
						top: -0.256rem;
						background-color: #fff;
						border-radius: 0.128rem;
						position: relative;
						z-index: 12;
						img{
							width: 1.194rem;
							height: 1.194rem;
							margin-top: 0.04rem;
							margin-left: 0.04rem;
							border-radius: 0.128rem;
						}
					}
					.name1{
						margin-bottom: 0.1rem;
						margin-top: 0.25rem;
						i{
							font-size: 0.28rem;
							color: #666;
						}
					}
					.time1{
						color: #999;
					}
				}
				li:nth-child(2){
					margin-left: 0.17rem;
				}
				li:nth-child(3){
					width: 0.546rem;
					height: 0.546rem;
					border-radius: 50%;
					float: right;
					margin-right: 0.17rem;
					text-align: center;
					margin-top: 0.327rem;
					background-color: #ef4949;
					i{
						color: #fff;
						position: relative;
						top: 0.01rem;					
					}
				}
			}
			.cameraInfo{
				width: 3.587rem;
				padding: 0 0.34rem;
				height: 4.1rem;
				border-radius: 0.128rem;
				background-color: #fff;
				position: absolute;
				z-index: 14;
				top: 0.8rem;
    			left: 0.8rem;
				box-shadow: 0px 0px 20px 1px #888888;
				padding-top: 0.25rem;
				.title1{
					text-align: center;
					font-size: 0.256rem;
				}
				.info1{
					padding: 0.213rem 0;
					border-bottom: 1px solid #eee;
					span:nth-child(2){
						float: right;
						display: inline-block;
						color: #999;
					}
				}
				.caret{
					width: 0;
					height: 0;
					border: 0.2rem solid transparent;
					border-bottom-color: #fff;
					position: absolute;
					top: -0.3rem;
					right: 1.08rem;
				}
			}
		}
		.line{
			height: 1px;
			width: calc(~"100% - 0.34rem");
			margin:0 auto;
			background-color: #eee;
		}
		.article{
			background-color: #fff;
			color: #666;
			width: calc(~"100% - 0.34rem");
			padding: 0.34rem 0.17rem;
			line-height: 0.3rem;
    		letter-spacing: 0.02rem;
    		border-bottom: 1px solid #eee;
		}
		.zanNum{
			background-color: #fff;
			// overflow: -webkit-paged-y;
			// overflow: paged-y;
			padding-top: 0.256rem;
			min-height: 0.9rem;
			.left1{
				width: 1.365rem;
				color: #ff9d00;
				text-align: center;
				margin-top: 0.08rem;
				display: inline-block;
				vertical-align: top;
				img{
					width: 0.5rem;
					margin-top: 0.03rem;
				}
			}
			.right1{
				width: calc(~"100% - 1.43rem");
				display: inline-block;
				.face1{
					img{
						width: 0.6827rem;
						height: 0.6827rem;
						border-radius: 50%;
						margin-right: 0.06rem;
						margin-bottom: 0.1rem;
						border: 1px solid #eee;
					}
				}
				.loadmore1{
					color: #999;
					text-align: center;
					text-decoration: underline;
				    height: 1rem;
				    line-height: 0.8rem;
				    font-size: 0.239rem;
				}
			}
			ul{
				li{
					float: left;
				}
				li:nth-child(1){
					width: 1.365rem;
					color: #ff9d00;
					text-align: center;
					margin-top: 0.08rem;
					img{
						width: 0.5rem;
						margin-top: 0.03rem;
					}
				}
				li:nth-child(2){
					width: calc(~"100% - 1.365rem");
					.face1{
						height: 0.9rem;
						img{
							width: 0.6827rem;
							height: 0.6827rem;
							border-radius: 50%;
							margin-right: 0.06rem;
							margin-bottom: 0.1rem;
							border: 1px solid #eee;
						}
					}
					.loadmore1{
						color: #999;
						text-align: center;
						text-decoration: underline;
					    height: 1rem;
					    line-height: 0.8rem;
					    font-size: 0.239rem;
					}
				}
			}
		}
		.operating{
			width: 100%;
			height: 0.768rem;
			overflow:auto;
			position: fixed;
			bottom: 0;
			background-color: #fff;
			li{
				width: 100%/3;
				float: left;
				height: 0.768rem;
				font-size: 0.239rem;
			}
			li:nth-child(1),li:nth-child(2){
				// width: 2.133rem;
				// background-color: #fff;
				color: #666;
				text-align: center;
				i{
					line-height: 0.768rem;
					font-size: 0.28rem;
					color: #ff9d00;
				}
			}
			li:nth-child(1){
				// border-right: 1px solid #eee;
				position: relative;
				.line1{
					width: 1px;
					height: 0.5rem;
					background-color: #eee;
					position: absolute;
					right: 0;
					top: 0.134rem;
				}
			}
			li:nth-child(2){
				i{
					color: rgb(55, 172, 232);
				}
			}
			li:nth-child(3){
				// width: calc(~"100% - 2.133rem");
				color: #fff;
				// background-color: #ddd;
				line-height: 0.768rem;
				text-align: center;
				i{
					font-size: 0.3rem;
				}
			}
			.red{
				background-color: #ef4949;
			}
			.nored{
				background-color: #ddd;
			}
		}
		.operating2{
			li:nth-child(1){
				width: 2.133rem;
			}
			li:nth-child(2){
				width: calc(~"100% - 2.133rem");
				color: #fff;
				// background-color: #ddd;
				line-height: 0.768rem;
				text-align: center;
				i{
					font-size: 0.3rem;
					color: #fff;
				}
			}
			.red{
				background-color: #ef4949;
			}
			.nored{
				background-color: #ddd;
			}
		}
		.bg{
			width: 100%;
			height: 100%;
			background-color: rgba(0,0,0,0.6);
			position: fixed;
			z-index: 13;
			top: 0;
			color: #fff;
			text-align: center;
			line-height: 6rem;
		}
		.bg1{
			width: 100%;
			height: 100%;
			background-color: transparent;
			position: fixed;
			z-index: 13;
			top: 0;
			color: #fff;
			text-align: center;
			line-height: 6rem;
		}
		#shareTu{
			width: 4.608rem;
			height: 8.1925rem;
			position: fixed;
			z-index: 14;
			top: 50%;  
			left: 50%; 
			margin: -4.09625rem 0 0 -2.304rem;
		}
	}
</style>