<template>
	<div id="box11" >
		<mt-tab-container v-model="selected" v-if="this.homeshow">
		  <mt-tab-container-item id="1">
		  	<div>
				<div style="height:3.413rem;">
					<mt-swipe :auto="4000">
					  <mt-swipe-item>
					  	<router-link :to="{path:'/details',query:{'vid':'ClI'}}">
					  		<img class="lunboPic" src="../../../static/img/lunbo/pic25.jpg">
					  	</router-link>
					  </mt-swipe-item>
					  <mt-swipe-item>
					  	<router-link :to="{path:'/mine-course-articles',query:{'artid':'Cw'}}">
					  		<img class="lunboPic" src="../../../static/img/lunbo/pic26.jpg">
					  	</router-link>
					  </mt-swipe-item>
					  <mt-swipe-item>
					  	<router-link :to="{path:'/mine-course-articles',query:{'artid':'A1Y'}}">
					  		<img class="lunboPic" src="../../../static/img/lunbo/pic27.jpg">
					  	</router-link>
					  </mt-swipe-item>
					</mt-swipe>
				</div>
				<div class="header">
					<div class="middle" @click="tolei()">
						<div class="tablecell">
							<div class="ii">
								<i class="icon iconfont icon-dingdan---" style="color:#fe5875"></i>
							</div>
							<div class="name">课程</div>
						</div>
					</div>
					<div class="middle" @click="tokejian()">
						<div class="tablecell">
							<div class="ii">
								<i class="icon iconfont icon-kechengshijian" style="color:#37ace8"></i>
							</div>
							<div class="name">课间</div>
						</div>
					</div>
					<div class="middle" @click="tozhibo()">
						<div class="tablecell">
							<div class="ii">
								<i class="icon iconfont icon-shipindianbo" style="color:#ffbd48"></i>
							</div>
							<div class="name">直播</div>
						</div>
					</div>
				</div>
				<!-- <div class="wenzahng">
					<div class="tou">
						<span>干货新闻&nbsp;|&nbsp;免费</span>
						<span @click="wenzhang()">更多<i class="icon iconfont icon-dayuhao1"></i></span>
						<div v-for="(item,index) in lists" v-if="index < 3">
							<div class="yi" v-if="index==0">
								<router-link :to="{path:'mine-course-articles',query:{artid:item.art_id}}">
									<img :src="item.pic">
									<div class="xinxi">
										<div class="title">{{item.title}}</div>
										<div style="color:#999">{{item.cat_name}}</div>
									</div>
								</router-link>
							</div>
							<div class="qita" v-if="index !=0">
								<router-link :to="{path:'mine-course-articles',query:{artid:item.art_id}}">
									<span style="color:#333"><i class="icon iconfont icon-xuexi1"></i>{{item.title}}</span>
								</router-link>
							</div>
						</div>
					</div>
				</div> -->
				<div class="wenzahng1">
					<div class="title">知识新闻 <span @click="wenzhang()">更多<i class="icon iconfont icon-dayuhao1"></i></span> </div>
					<div class="content">
						<!-- <div class="list" > -->
            <!--:to="{ path: '/mine-course-articles',query:{artid:item.art_id} }"-->
							<a @click="toArticles(item.art_id,item.article_type)" class="list" v-for="(item,index) in lists" :style="{backgroundImage:'url(' + item.pic + ')'}" v-if="index <= 7">
								<div class="title1">
									<div class="chang">{{item.title}}</div>
									<div class="fujia">
										<span>
											<i class="icon iconfont icon-aixin" style="color:#fe5875"></i>
											<span>{{item.collect_num}}</span>
										</span>
										<span style="margin-left:0.2rem;">
											<i class="icon iconfont icon-huihua1" style="color:#5e96d0"></i>
											<span>{{item.comment_num}}</span>
										</span>
									</div>
								</div>
							</a>
						<!-- </div> -->
					</div>
				</div>
			</div>
			<div style="margin-bottom:0.8rem;">
				<footer1></footer1>
			</div>
		  </mt-tab-container-item>
		  <mt-tab-container-item id="2">
		  	<div style="min-height:calc(100vh - 0.75rem);overflow:scroll; -webkit-overflow-scrolling:touch;">
		  		<!-- <activity></activity> -->
		  	</div>
		  </mt-tab-container-item>
		</mt-tab-container>
		<Navigator></Navigator>
	</div>
</template>

<script>
	import { Navbar, TabItem ,Toast } from 'mint-ui';
	import footer1 from '@/components/publicPage/footer1'
	import Navigator from '@/components/common/Navigator'
	import wx from 'weixin-js-sdk'
	export default {
		data(){
			return {
				arr:[{
					imgUrl:'../../../static/img/lunbo/pic6.png',
					url:'/details',
					vid:'Bg'
				},{
					imgUrl:'../../../static/img/lunbo/pic8.png',
					url:'/details',
					vid:'AA'
				},{
					imgUrl:'../../../static/img/lunbo/pic9.png',
					url:'/details2',
					vid:'Bw'
				}],
				arr2:[{
					imgUrl:'../../../static/img/lunbo/pic10.png',
					url:'/details',
					vid:'Aw'
				},{
					imgUrl:'../../../static/img/lunbo/pic24.jpg',
					url:'/details',
					vid:'Aw'
				}],
				lists:[],
				selected:'1',
        		homeshow:true,
			}
		},
		created(){
			var self = this;
			this.global.shouquan();
			this.postData('post','/shop-v1-index_basemsg.html').then(res => {
				document.title = res.data.title;
				self.share(res.data.title,res.data.description,res.data.logo)
     		})
//      隐藏首页
//      this.postData('post','/shop-v1-index_get_root.html').then(res => {
//        this.homeshow= res.data.rootId !== "Aw";
//      })

		},
		mounted(){
			this.getData('GET','/shop-v1-article_lst.html',{is_best:'1'}).then(res => {
				this.lists = res.data.data
			})
		},
		components:{Navigator,footer1},
		methods:{
			tolei(){
				this.$router.push({path:'/classification'})
			},
			toremen(){
				this.$router.push({path:'/activity'})
			},
			tokejian(){
				this.$router.push({path:'/mine-course-playtime'})
			},
			wenzhang(){
				this.$router.push({path:'/mine-course-playtime'})
			},
			tozhibo(){
				Toast({
				  message: '敬请期待',
				  duration: 1000
				});
			},
      toArticles(id,type){
        switch(type) {
          case 1:
            this.$router.push({path: "/mine-course-articles", query: {artid: id}})
            break;
          case 2:
            this.$router.push({path: "/mine-course-vote", query: {artid: id}})
            break;
          case 3:
            this.$router.push({path: "/mine-course-mesay", query: {artid: id}})
            break;
          case 4:
            this.$router.push({path: "/mine-course-articles", query: {artid: id}})
            break;
        }
      },
		},
	}
</script>

<style lang="less">
	#box11{
		height: 100%;
		.header{
			height: 1.5rem;
			width: 100%;
			background-color: #fff;
			display: flex;
			display: -webkit-flex;
			font-size: 0.26rem;
			color: #666;
			.middle{
				display: table;
				height: 100%;
				width: 100%/3;
				.tablecell{
					display: table-cell;
					vertical-align: middle;
					.ii{
						width: 0.8rem;
					    height: 0.8rem;
					    margin: 0 auto;
						i{
							font-size: 0.8rem;
							width: 0.8rem
						}
					}
					.name{
						text-align: center;
						margin-top: 0.1rem;
					}
				}
			}
		}
		.wenzahng{
			height: 4.15rem;
			width: 6rem;
			margin: 0 auto;
			background-color: #fff;
			margin-top: 0.2rem;
			border-radius: 0.2rem;
			font-size: 0.28rem;
			color: #5e96d0;
			font-weight: bold;
			.tou{
				padding-top: 0.2rem;
				margin-left: 0.2rem;
				span:nth-child(2){
					float: right;
					color: #999;
					font-size: 0.25rem;
					i{
						font-size: 0.25rem;
						margin-right: 0.2rem;
					}
				}
				.yi{
					margin-top: 0.4rem;
					img{
						height: 1.5rem;
						width: 2.05rem;
					}
					.xinxi{
						display: inline-block;
						font-weight:normal;
						color: #333;
						position: relative;
						top: -0.45rem;
						margin-left: 0.2rem;
						.title{
							width: 3.2rem;
							white-space: nowrap;
							text-overflow: ellipsis;
							overflow:hidden;
						}
					}
				}
				.qita{
					font-weight: normal;
					color: #333;
					padding-top: 0.25rem;
					width: 5.5rem;
				    text-overflow: ellipsis;
				    white-space: nowrap;
				    overflow: hidden;
					i{
						color: #5e96d0;
						font-size: 0.3rem;
						margin-right: 0.1rem;
						font-weight: 500;
					}
				}
			}
		}
		.wenzahng1{
			.title{
				color: rgb(94, 150, 208);
				font-size: 0.238rem;
				margin-left: 0.17rem;
				margin-top: 0.17rem;
				position: relative;
				font-weight: bold;
				span{
					float: right;
					position: absolute;
					right: 0.12rem;
					top: -0.1rem;
					color: #999;
					i:before{
						font-size: 0.25rem;
					}
				}
			}
			.content{
				width: 6.058rem;
				margin: 0 auto;
				font-size: 0.238rem;
				.list{
					width: 2.944rem;
					height: 2.944rem;
					background-color: #37ace8;
					display: inline-block;
					float: left;
					margin-top: 0.17rem;
					position: relative;
					background-size: cover;
					i:before{
						font-size:0.29rem;
					}
					.title1{
						font-size: 0.238rem;
						position: absolute;
						bottom: 0;
						color: #fff;
						width: 100%;
						background: -webkit-linear-gradient(transparent, #000); /* Safari 5.1 - 6.0 */
					    background: -o-linear-gradient(transparent, #000); /* Opera 11.1 - 12.0 */
					    background: -moz-linear-gradient(transparent, #000); /* Firefox 3.6 - 15 */
					    background: linear-gradient(transparent, #000); /* 标准的语法（必须放在最后） */
						.chang{
							width: 2.604rem;
							margin-left: 0.17rem;
							text-overflow: -o-ellipsis-lastline;
							overflow: hidden;
							text-overflow: ellipsis;
							display: -webkit-box;
							-webkit-line-clamp: 2;
							-webkit-box-orient: vertical;
						}
						.fujia{
							padding-left: 0.17rem;
							width: 100%;
							padding-bottom: 0.17rem;
						}
					}
				}
				.list:nth-child(2n){
					margin-left: 0.17rem;
				}
				.list:last-child{
					margin-bottom: 0.17rem;
				}
			}
		}
	}
	#box1 .mint-swipe{
		height: 3.413rem;
	}
	#box1 .mint-navbar{
		background-color: #fff;
		color:#fff;
		overflow: hidden;
		height: 0.8rem;
	}
	#box1 .mint-navbar .mint-tab-item.is-selected{
		color:#5e96d0;
		border-bottom: 1px solid #5e96d0;
	    margin-bottom: 0px;
	}
	#box1 .mint-navbar{
		// position: fixed;
		top: 0;
		z-index: 2;
		width: 100%;
	}
	#box1 .mint-tab-item-label{
		font-size: 0.27rem;
		position: relative;
		top: -0.05rem;
	}
	.lunboPic{
		// height: 8rem;
		width: 100%;
	}
	.titleone .title{
		font-size: 0.3rem;
	    color: #333;
	    border-left: 0.1rem solid #ef1818;
	    padding-left: 0.1rem;
	    font-weight: 500;
	}
	.recommend{
		height: 2.58rem;
		padding: 0 0.2rem;
    	padding-bottom: 0.2rem;
    	background-color: #fff;
	}
	.recommend img{
		width: 100%;
		height: 2.58rem;
	}
  #box1 .mint-swipe-indicators{
		top: 2.2rem;
	}
	.titleone{
		padding:0.1rem 0.2rem;
		background-color: #fff;
		margin-top: 0.2rem;
	}

	/*导航*/
	.nav{
		font-size: 0.26rem;
	}
</style>
