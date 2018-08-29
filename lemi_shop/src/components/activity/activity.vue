<template>
	<div class="activity">
		<mt-navbar v-model="selected">
		  <mt-tab-item id="1">线上课程</mt-tab-item>
		  <mt-tab-item id="2">线下课程</mt-tab-item>
		</mt-navbar>
		<mt-tab-container v-model="selected">
		  <mt-tab-container-item id="1">
			<div style="height:1px;"></div>
			<div class="recommend" v-for="(item,index) in arr4">
				<router-link :to="{path:'/details',query:{'ser_id':item.vid}}">
					<img :src="item.imgUrl" onerror="this.src=&quot;/static/img/pic_addfengmian.png&quot;">
				</router-link>
			</div>
			<div class="recommend" v-for="(item,index) in arr3">
				<router-link :to="{path:'/details',query:{'ser_id':item.vid}}">
					<img :src="item.imgUrl" onerror="this.src=&quot;/static/img/pic_addfengmian.png&quot;">
				</router-link>
			</div>
			<div style="margin-bottom:1rem;">
				<footer1></footer1>
			</div>
		  </mt-tab-container-item>
		  <mt-tab-container-item id="2">
			<ul style="margin-top:1px;" class="list" v-infinite-scroll="loadMore" infinite-scroll-disabled="false" infinite-scroll-distance="10" infinite-scroll-immediate-check="true">
				<div class="main" v-for="item in arr" @click="toActive(item.id,item._status)">
					<div class="activity_left">
						<img :src="item.active_img" alt="" onerror="this.src=&quot;/static/img/pic_addfengmian.png&quot;" />
					</div>
					<div class="activity_right">
						<p class="title11" style="color:#333">{{item.title}}</p>
						<p class="bule" style="color:#fff;background:#fe5875" v-if="item._status==1">{{item._status==1?'立即报名':'活动结束'}}</p>
						<p class="ccc" style="background:#999999" v-if="item._status==2">{{item._status==1?'立即报名':'活动结束'}}</p>
						<p class="ccc" style="background:#999999" v-if="item._status==0">活动未开始</p>
					</div>
				</div>
				<div style="margin-bottom:0.3rem;margin-top:0.2rem" id="footer2">
					<footer1></footer1>
				</div>
			</ul>
		  </mt-tab-container-item>
		</mt-tab-container>
		<Navigator></Navigator>
	</div>
	
</template>

<script>
	import Navigator from '@/components/common/Navigator'
	import footer1 from '@/components/publicPage/footer1'
	import { InfiniteScroll,Indicator,TabItem } from 'mint-ui'
	export default {
		data(){
			return{
				arr:[],
				pageNo:'1',
				cat_id:'',
				selected:'1',
				arr2:[{
					imgUrl:'../../../static/img/lunbo/pic10.png',
					url:'/details',
					vid:'Aw'
				}],
				arr3:[{
					imgUrl:'../../../static/img/lunbo/pic6.png',
					url:'/details',
					vid:'Bg'
				},{
					imgUrl:'../../../static/img/lunbo/pic8.png',
					url:'/details',
					vid:'AA'
				},{
					imgUrl:'../../../static/img/lunbo/pic35.jpg',
					url:'/details2',
					vid:'Bw'
				}],
				arr4:[{
					imgUrl:'../../../static/img/lunbo/pic28.png',
					url:'/details',
					vid:'Cg'
				}],
				arr5:[{
					imgUrl:'../../../static/img/lunbo/pic32.jpg',
					url:'/topay',
					cs_id:'Bg'
				},{
					imgUrl:'../../../static/img/lunbo/pic31.jpg',
					url:'/topay',
					cs_id:'Bw'
				},{
					imgUrl:'../../../static/img/lunbo/pic30.jpg',
					url:'/topay',
					cs_id:'BA'
				}],
			}
		},
		components:{Navigator,footer1},
		created(){
			this.global.shouquan();
			this.postData('post','shop-v1-line_active_get_active_list.html',{page:this.pageNo}).then(res => {
				this.arr = res.data.data;
				if(res.data.data.length <= 3){
					$('#footer2').css({'position':'absolute','bottom':'0.75rem','width':'100%'})
				}
			})
		},
		methods:{
			toActive(id,status){
				this.$router.push({path:'details2',query:{id:id}})
			},
			loadMore(){
				Indicator.open();
				this.pageNo = Number(this.pageNo) + Number(1);
				this.postData('post','shop-v1-line_active_get_active_list.html',{page:this.pageNo}).then(res => {
					Indicator.close();
					if(res.data.data.length != 0){
						this.arr = this.arr.concat(res.data.data)
					}
				})
			}
		}
	}
</script>

<style scoped lang="less">
	.activity{
		.list{
			height: calc(~"100vh - 1.8rem");
			overflow: scroll;
			-webkit-overflow-scrolling:touch;
		}
	}
	.activity{
		// margin-top: 0.1rem;
	}
	.activity .main{
		display: flex;
		flex-direction: row;
		background:#fff;
		margin-bottom: 0.1rem;
	}
	
	.activity .activity_left{
		width: 55%;
		height: 2.2rem;
		padding: 0.1rem 0 0.1rem 0.1rem;
	}
	
	.activity .activity_left img{
		width: 100%;
		height: 100%;
	}
	
	.activity .activity_right{
		width: 45%;
		font-size: 0.26rem;
	}
	.activity .title11{
		/*margin-top: 0.4rem;*/
		padding: 0.4rem 0.2rem;
		text-align: center;
		color: #333;
	}
	.activity .bule{
		width: 80%;
		height: 0.5rem;
		background:#26A2FF;
		line-height: 0.5rem;
		text-align: center;
		margin-left: 10%;
		color: white;
	}
	
	.activity .ccc{
		width: 80%;
		height: 0.5rem;
		background:#CCCCCC;
		line-height: 0.5rem;
		text-align: center;
		margin-left: 10%;
		color: white;
	}
	.titleone .title{
		font-size: 0.3rem;
	    color: #5e96d0;
	    border-left: 0.1rem solid #5e96d0;
	    padding-left: 0.1rem;
	    font-weight: 500;
	}
	.recommend{
		height: 2.58rem;
    	padding-bottom: 0.2rem;
    	background-color: #fff;
	}
	.recommend img{
		width: 100%;
		height: 2.58rem;
	}
	// .mint-swipe-indicators{
	// 	top: -38px;
	// }
	.titleone{
		padding:0.1rem 0.2rem;
		background-color: #fff;
		margin-top: 1px;
	}
	.mint-navbar .mint-tab-item.is-selected{
		border-bottom: 1px solid #5e96d0;
		color: #5e96d0;
    	margin-bottom: -1px;
	}
</style>