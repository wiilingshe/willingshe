<!--订单详情页数组-->
<template>
	<div class="detaildemo">
		<div class="top">
			<span>{{selected==2?'单品订单':selected==3?'活动订单':selected==4?'套餐订单':'专栏订单'}}</span>
			<!-- <i class="icon iconfont icon-iconfonticonfontdelete" @click="deleteit(details.order_no)"></i> -->
		</div>
		<div class="items">
			<div class="left">
				<img v-if="details.pic" :src=details.pic alt="" :onerror="errorImg01"/>
				<img v-if="details.active_img" :src=details.active_img alt="" :onerror="errorImg01"/>
				<img v-if="details.pic == null " src="/static/img/pic_addfengmian.png" alt="" />
			</div> 
			<div class="right">  
				<div>{{ details.title }}</div>      
				<div></div>
				<div><span>{{ details.create_time }}</span></div>
				<div>
				<div>{{ details.create_time }}</div>
				<div style="color:#999">x1</div>
				<!-- <div class="red" v-if="details.status == 1">待支付</div>
				<div class="ccc" v-else-if="details.status == 3">已取消</div>
				<div class="org" v-else="details.status == 2">已支付</div> -->
				</div>
			</div>
		</div>
		<div class="bottom">
			<div class="wai">
				合计&nbsp;&yen&nbsp;<span class="money">{{details.total_fee}}</span>
				<span class="paybtn" v-if="details.status==1">去结算</span>
			</div>
		</div>
	</div>
</template>

<script>
	import { Toast,CellSwipe } from 'mint-ui';
	export default {
		props:{
			details:Object,
			selected:String,
		},
		data(){
			return{
				status:[],
				errorImg01: 'this.src="' + require('../../../../static/img/pic_addfengmian.png') + '"'
			}
		},
		created(){
			// this.global.shouquan();
		},
		methods:{
			deleteit(orderNo){
				if(this.selected == 2){
					this.postData('post','/shop-v1-order_video_del.html',{order_no:orderNo}).then(res => {
						if(res.data.status == 1){
							Toast({
								 message: '删除成功',
								  duration: 500
							})
						}else{
							Toast({
								 message: res.data.msg,
								  duration: 500
							})
						}
					})
				}else if(this.selected == 3){
					var url = '/shop-v1-order_active_del?order_no='+orderNo
					this.getData('get',url).then(res => {
						if(res.data.status == 1){
							Toast({
								 message: '删除成功',
								  duration: 500
							})
						}else{
							Toast({
								 message: res.data.msg,
								  duration: 500
							})
						}
					})
				}else if(this.selected == 4){
					this.postData('post','/shop-v1-comboset_series_del.html',{order_no:orderNo}).then(res => {
						if(res.data.status == 1){
							Toast({
								 message: '删除成功',
								  duration: 500
							})
						}else{
							Toast({
								 message: res.data.msg,
								  duration: 500
							})
						}
					})
				}else if(this.selected == 1){
					this.postData('post','/shop-v1-order_series_del.html',{order_no:orderNo}).then(res => {
						if(res.data.status == 1){
							Toast({
								 message: '删除成功',
								  duration: 500
							})
						}else{
							Toast({
								 message: res.data.msg,
								  duration: 500
							})
						}
					})
				}
			}
		}
	}
</script>

<style scoped lang="less">
	.detaildemo{
		.top{
			height: 0.66rem;
			font-size: 0.26rem;
			width: 100%;
			background-color: #fff;
			border-bottom: 1px solid #eee;
			line-height: 0.66rem;
			span:nth-child(1){
				margin-left: 0.2rem;
				color: #333;
			}
			i{
				float: right;
				margin-right: 0.2rem;
				color: #999;
				font-size: 0.3rem;
				// position: relative;
				// top: 0.05rem;
			}
		}
		.bottom{
			height: 0.9rem;
			width: 100%;
			background-color: #fff;
			margin-bottom: 0.2rem;
			line-height: 0.9rem;
			.wai{
				font-size: 0.26rem;
				width: 100%;
				line-height: 0.9rem;
				text-align: right;
				color: #666;
				.money{
					font-size: 0.25rem;
					color: #fe5875;
					margin-right: 0.2rem;
				}
				.paybtn{
					height: 0.5rem;
					width: 1.4rem;
					background-color: #fe5875;
					color: #fff;
					display: inline-block;
					line-height: 0.5rem;
    				text-align: center;
    				margin-right: 0.2rem;
    				border-radius: 0.08rem;
				}
			}
		}
	}
	.box{
		display: flex;
		flex-direction: column;
	}
	
	.items{
		display: flex;
		flex-direction: row;
		border-bottom: 1px solid #eee;
		background: #fff;
	}
	
	.left{
		width: 2rem;
		height: 1.4rem;
		margin: 0.2rem;
	}
	
	.left img{
		width: 100%;
		height: 100%;
	}
	
	.right{
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 0.15rem 0.15rem 0.15rem 0;;
		color: #fff;
		
	}
	
	.right>div:nth-child(1){
		width: 4rem;
		font-size: 0.24rem;
		overflow:hidden;
		text-overflow:ellipsis;
		white-space:nowrap;
		color:#333;
		
	}
	
	.right>div:nth-child(2){
		width: 4rem;
		font-size: 0.24rem;
		overflow:hidden;
		text-overflow:ellipsis;
		white-space:nowrap;
		color:#fff;
		
	}
	
	.right>div:nth-child(3){
		font-size: 0.22rem;
		text-align: left;
		color: #999;
		height: 0.6rem;
		line-height: 0.6rem;
	}
	
	.right>div:nth-child(4){
		font-size: 0.22rem;
		color: #fff;
		text-align: left;
		height: 0.3rem;
		line-height: 0.3rem;
		
	}
	
	.right>div:nth-child(5){
		font-size: 0.2rem;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		line-height: 0.3rem;
		color: #999;
	}
	
	.red{
		color: #fcab53;
		
	}
	
	.ccc{
		color: #999;
	}
	
	.org{
		color: orange;
	}
	
</style>