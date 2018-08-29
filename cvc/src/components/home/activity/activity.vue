<template>
	<div class="activity">
		<div style="height:100vh;overflow:scroll;-webkit-overflow-scrolling:touch;" v-infinite-scroll="loadMore" infinite-scroll-disabled="false" infinite-scroll-immediate-check="false" infinite-scroll-distance="0">
			<div class="activity-list" v-for="i in arr">
				<div class="activity-list-img" @click="toActive(i.id,i._status,i)">
					<img :src="i.active_img">
				</div>
				<div class="activity-list-title">{{i.title}}</div>
				<div class="activity-list-desc">
					<!-- <i class="icon iconfont icon-time">2018-03-30</i> -->
			  		<i class="icon iconfont icon-location">{{i.address}}</i>
			  		<div class="activity-list-desc-btn" v-if="i._status == 1" @click="toActive(i.id,i._status,i)">立即报名</div>
			  		<div class="activity-list-desc-btn1" v-if="i._status == 2" @click="toActive(i.id,i._status,i)">活动结束</div>
			  		<div class="activity-list-desc-btn1" v-if="i._status == 0" @click="toActive(i.id,i._status,i)">活动未开始</div>
				</div>
			</div>
			<div style="margin-bottom:0.5rem;" v-if="footer">
				<footer1></footer1>
			</div>
		</div>
	</div>
	
</template>

<script>
	import Navigator from '@/components/common/Navigator'
	import footer1 from '@/components/common/footer1'
	import { InfiniteScroll,Indicator,TabItem } from 'mint-ui'
	export default {
		data(){
			return{
				arr:[],
				footer:false,
				pageNo:1,
				ifload:true,
			}
		},
		components:{Navigator,footer1},
		created(){
			document.title = '热门活动';
			this.global.shouquan();
			Indicator.open();
			this.postData('post','shop-v1-line_active_get_active_list.html',{page:this.pageNo}).then(res => {
				Indicator.close();
				this.arr = res.data.data;
			},res => {
				Indicator.close();
			})
		},
		methods:{
			toActive(id,status,info){
				if(info.ca_id!=''&&info.car_id!=''&&info.type>1){
					this.$router.push({path:'offCourseDetails',query:{active_id:id,ca_id:info.ca_id,car_id:info.car_id}})
				}else{
					this.$router.push({path:'details2',query:{id:id}})
				}
			},
			loadMore(){
				var self = this;
				if(this.ifload == true){
					Indicator.open();
					this.pageNo = Number(this.pageNo) + Number(1);
					this.postData('post','shop-v1-line_active_get_active_list.html',{page:this.pageNo}).then(res => {
						Indicator.close();
						if(res.data.data.length != 0){
							this.arr = this.arr.concat(res.data.data)
						}
						if(res.data.data.length < 6){
							self.ifload = false;
							self.footer = true;
						}
					})
				}
			}
		}
	}
</script>

<style scoped lang="less">
	.activity{
		&-list{
			background-color: #fff;
			margin-bottom: 0.22rem;
		}
		&-list-img{
			width: 100%;
			height: 4.75rem;
			background-color: #eee;
			overflow: hidden;
			img{
				width: 100%;
			}
		}
		&-list-title{
			font-size: 0.3rem;
			color: #333;
			width: 5rem;
			margin-bottom: 0.08rem;
			margin-top: 0.25rem;
			margin-left: 0.3rem;
			white-space: nowrap;
			text-overflow: ellipsis;
			overflow: hidden;
		}
		&-list-desc{
			font-size: 0.26rem;
			color: #888;
			width: 6.92rem;
			margin: 0 auto;
			padding-bottom: 0.34rem;
			i{
				font-size: 0.26rem;
				margin-right: 0.2rem;
				display: block;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				max-width: 75%;
			}
			i:before{
				margin-right: 0.1rem;
			}
			&-btn,
			&-btn1{
				width: 1.62rem;
				height: 0.72rem;
				border-radius: 0.06rem;
				display: inline-block;
				float: right;
				text-align: center;
				overflow: hidden;
				line-height: 0.72rem;
				color: #fff;
				margin-top: -0.7rem;
			}
			&-btn{
				background-color: #222;
			}
			&-btn1{
				background-color: #999;
			}
		}
	}
</style>