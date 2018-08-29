<template>
	<div class="faceSearch">
		<div class="search">
			<i class="icon iconfont icon-sousuo2"></i>
			<input type="text" name="" placeholder="搜索关键字" v-model="text">
			<span @click="search()">搜索</span>
		</div>
		<div class="history" v-show="history1">
			<div class="title1">历史搜索</div>
			<div class="list1">
				<span class="one1" v-for="i in historyList" @click="search(i)">{{i}}</span>
			</div>
		</div>
		<div class="history" v-show="history">
			<div class="title1">热门搜索</div>
			<div class="list1">
				<span class="one1" v-for="i in hotList" @click="search(i)">{{i}}</span>
			</div>
		</div>
		<ul class="ul1" v-infinite-scroll="loadMore" infinite-scroll-disabled="false" infinite-scroll-immediate-check="false" v-show="!history">
			<div style="text-align:center;color:#999;margin-top:0.17rem" v-show="loading2">加载中...</div>
			<nodata v-show="nodata"></nodata>
			<div class="alllist1">
				<div class="list" @click="faceDatails(i.masks_user_id)" v-for="i in arr">
					<!-- <div class="img1" :style="'background-image:url('+i.pic+')'"></div> -->
					<img class="img1" :src="i.pic">
					<div class="user1">
						<div class="img3">
							<img class="img2" :src="i.face">
						</div>
						<span>{{i.nickname}}</span>
					</div>
					<div class="detail1" v-html="i.content">
						{{i.content}}
					</div>
					<div class="zan1">
						<i class="icon iconfont icon-praise"></i>
						<span>{{i.thumbs}}</span>
					</div>
				</div>
			</div>
			<div style="text-align:center;color:#999;margin-bottom:0.17rem;" v-show="loading">加载中...</div>
			<loadNo v-show="loadend"></loadNo>
		</ul>
		<!-- <div style="height:0.768rem" v-show="!history"></div> -->
		<!-- <ul class="operating" v-show="!history">
			<li @click="getTip()">
				<i class="icon iconfont icon-2"></i>
				<span>活动须知</span>
			</li>
			<li @click="jion()">
				立即参加
			</li>
		</ul> -->
		<div class="bg" v-show="tip" @click="close()"></div>
		<div class="tip" v-show="tip">
			<div class="tip1">
				<i class="icon iconfont icon-guanbi1" @click="close()"></i>
				<div class="title1">
					活动须知
				</div>
				<div class="desc3">
					<div class="desc2">
						1、请按照视频中指定光圈进行拍摄，不建议用Photoshop 等电脑软件进行大幅度的后期修改，允许使用附加镜头，请作者尽量保留照片的原始信息；
					</div>
					<div class="desc2">
						2、每一幅摄影作品需要有简单的描述，包含纪实摄影五要素：何时（when）、何地（where）、何事（what）、何因（why）、何人（who）；
					</div>
					<div class="desc2">
						3、上传作品数量不限，但建议作者认真选片后上传；
					</div>
					<div class="desc2">
						4、上传的作品大小不得超过5M；
					</div>
					<div class="desc2">
						5、上传时间：2018年1月22日-2月14日。
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import { InfiniteScroll,Toast } from 'mint-ui';
	import nodata from '@/components/common/nodata';
    import loadNo from '@/components/common/loadNo';
	export default{
		data(){
			return{
				history:true,
				history1:false,
				text:'',
				pageNo:1,
				tip:false,
				arr:[],
				pageNo:1,
				hotList:[],
				loading:false,
				loading2:false,
				ifload:true,
				nodata:false,
				loadend:false,
				historyList:[],
			}
		},
		created(){
			this.global.shouquan();
			if(window.localStorage.getItem('history') != null){
				this.history1 = true;
				this.historyList = window.localStorage.getItem('history');
				this.historyList = JSON.parse(this.historyList);
				if(this.historyList.length > 10){
					this.historyList = this.historyList.slice(0,9);
				}
			}
			this.postData('post','/shop-v1-masks_info.html',{masks_id:this.$route.query.masks_id}).then(res => {
				this.hotList = res.data.hot_key;
			});
		},
		methods:{
			search(text){
				this.history1 = false;
				if(text != undefined){
					this.text = text;
				}
				if(this.text != ''){
					// 历史搜索
					if(window.localStorage.getItem('history') != null){
						this.historyList = window.localStorage.getItem('history');
						this.historyList = JSON.parse(this.historyList);
					}
					var ifjia = true;
					if(this.historyList == null){
						this.historyList = [];
					}
					console.log(this.historyList)
					for(let i=0;i<this.historyList.length;i++){
						if(this.historyList[i] == this.text){
							ifjia = false;
						}
					}
					if(ifjia == true){
						this.historyList.unshift(this.text);
					}
					if(this.historyList.length > 10){
						this.historyList = this.historyList.slice(0,10);
					}
					this.historyList = JSON.stringify(this.historyList);
					window.localStorage.setItem('history',this.historyList);
					this.arr = [];
					this.ifload = true;
					this.loadend = false;
					this.history = false;
					this.loading = false;
					this.loading2 = true;
					this.nodata = false;
					this.postData('post','/shop-v1-masks_join_lst.html',{masks_id:this.$route.query.masks_id,page:this.pageNo,pageSize:10,title:this.text}).then(res => {
						this.loading2 = false;
						this.arr = res.data.data;
						if(res.data.data.length == 0){
							this.nodata = true;
						}
					})
				}else{
					Toast({
					  message: '请输入搜索内容',
					  iconClass: 'icon iconfont icon-2',
					  duration: 1000
					});
				}
			},
			loadMore(){
				if(this.ifload == true){
					this.loading = true;
					this.pageNo++;
					this.postData('post','/shop-v1-masks_join_lst.html',{masks_id:this.$route.query.masks_id,page:this.pageNo,pageSize:10,title:this.text}).then(res => {
						if(res.data.data != 0){
							this.loading = false;
							this.arr = this.arr.concat(res.data.data);
						}else{
							this.ifload = false;
							this.pageNo = 1;
							this.loading = false;
							this.loadend = true;
						}
					})
				}
			},
			getTip(){
				this.tip = true;
			},
			close(){
				this.tip = false;
			},
			faceDatails(id){
				this.$router.push({path:'/faceDetail',query:{masks_id:this.$route.query.masks_id,id:id}});
			}
		},
		components:{nodata,loadNo},
		watch:{
			text(val){
				if(val == ''){
					this.arr = [];
					this.history = true;
					this.historyList = window.localStorage.getItem('history');
					this.historyList = JSON.parse(this.historyList);
					if(this.historyList == null){
						this.history1 = false;
					}else{
						this.history1 = true;
					}
				}
			}
		}
	}
</script>
<style lang="less">
	.faceSearch{
		font-size: 0.205rem;
		color: #333;
		.search{
			height: 0.768rem;
			width: calc(~"100% -0.34rem");
			padding: 0 0.17rem;
			position: relative;
			background-color: #fff;
			i{
				position: absolute;
				top: 0.22rem;
				left: 0.35rem;
				font-size: 0.3rem;
				color: #a9a8a8;
			}
			input{
				height: 0.5rem;
				width: 4.69rem;
				border-radius: 0.25rem;
				background-color: #f1f2f6;
				border:none;
				outline-style: none;
				margin-top: 0.134rem;
				padding-left: 0.6rem;
			}
			span{
				color: #ef4949;
				font-size: 0.222rem;
				line-height: 0.768rem;
				margin-left: 0.17rem;
			}
		}
		.history{
			width: calc(~"100% - 0.34rem - 0.17rem");
			padding: 0 0.17rem 0 0.34rem;
			.title1{
				color: #999;
				margin-top: 0.239rem;
				margin-bottom: 0.17rem;
			}
			.list1{
				.one1{
					// min-width: 1.024rem;
					padding: 0 0.25rem;
					height: 0.5rem;
					margin-bottom: 0.17rem;
					background-color: #a89e9e;
					display: inline-block;
					border-radius: 0.25rem;
					text-align: center;
					line-height: 0.5rem;
					color: #fff;
					font-size: 0.222rem;
					margin-right: 0.1rem;
				}
			}
		}
		.operating{
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
				width: 2.133rem;
				background-color: #fff;
				color: #666;
				text-align: center;
				i{
					line-height: 0.768rem;
					font-size: 0.28rem;
					color: #ff9d00;
				}
			}
			li:nth-child(2){
				width: calc(~"100% - 2.133rem");
				background-color: #ef4949;
				color: #fff;
				line-height: 0.768rem;
				text-align: center;
			}
		}
		.ul1{
			height: calc(~"100vh - 0.768rem");
			overflow: scroll;
			-webkit-overflow-scrolling:touch;
		}
		.alllist1{
			width: calc(~"100% - 0.34rem");
			padding: 0 0.17rem;
			-webkit-column-count: 2;
			-moz-column-count: 2;
			column-count: 2;
			margin-top: 0.17rem;
			// div:nth-child(2n+1) .img1{
			// 	height: 3.67rem;
			// }
			// div:nth-child(2n+2) .img1{
			// 	height: 2.389rem;
			// }
			// div:nth-child(2n+3) .img1{
			// 	height: 3.67rem;
			// }
			// div:nth-child(2n+4) .img1{
			// 	height: 2.389rem;
			// }
			// div:nth-child(2n+5) .img1{
			// 	height: 3.67rem;
			// }
			// div:nth-child(2n+6) .img1{
			// 	height: 2.389rem;
			// }
			// div:nth-child(2n+7) .img1{
			// 	height: 2.389rem;
			// }
			// div:nth-child(2n+8) .img1{
			// 	height: 3.67rem;
			// }
			// div:nth-child(2n+9) .img1{
			// 	height: 3.67rem;
			// }
			// div:nth-child(2n+10) .img1{
			// 	height: 3.67rem;
			// }
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
		.tip{
			width: 4.266rem;
			height: 5.632rem;
			background-color: #ef4949;
			position: fixed;
			top: 0;
			border-radius: 0.128rem;
			margin-left: calc(~"50% - 2.0225rem");
			margin-top: 1rem;
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