<template>
	<div class="rechargeList">
		<div class="xuan">
			<span :class="{selected:selected1}" @click="choose(1)">金额充值</span>
			<span :class="{selected:!selected1}" @click="choose(2)">积分充值</span>
		</div>
	  	<ul v-infinite-scroll="loadMore" infinite-scroll-disabled="false" infinite-scroll-immediate-check="false">
		  <li v-for="item in list">
		  	<div class="item">
		  		<div class="allTop">
		  			<div class="all">
			  			<div>{{item.status==1?'充值成功':'充值失败'}}</div>
			  			<div>{{item.create_time}}</div>
		  			</div>
		  		</div>
		  		<div class="allTop1">
		  			<span class="recharge" v-if="item.status==0">+{{item.recharge_balance}}</span>
		  			<span class="recharge1" v-if="item.status==1">+{{item.recharge_balance}}</span>
		  		</div>
		  	</div>
		  </li>
		  <nodata v-if="nodata1"></nodata>
		</ul>
	</div>
</template>
<script>
	import { InfiniteScroll,Indicator,Toast } from 'mint-ui';
	import nodata from '@/components/common/nodata'
	export default{
		data(){
			return{
				pageNo:'1',
				pageNo2:'1',
				selected:1,
				list:[],
				list2:[],
				dataLength:true,
				dataLength2:true,
				nodata1:false,
				selected1:true,
			}
		},
		created(){
			this.global.shouquan();
			this.noShare();
		},
		mounted(){
			Indicator.open();
			this.postData('post','/shop-v1-user_recharge_mblog.html',{page:this.pageNo}).then(res => {
				if(res.data.length != 0){
					this.list = res.data;
				}else{
					this.nodata1 = true
				}
				Indicator.close();
			})
		},
		methods:{
			loadMore(){
				if(this.selected1 == true){
					if(this.dataLength == true){
						this.pageNo = Number(this.pageNo)+Number(1);
						Indicator.open();
						this.postData('post','/shop-v1-user_recharge_mplog.html',{page:this.pageNo}).then(res => {
							if(res.data.length != 0){
								this.list = this.list.concat(res.data)
								Indicator.close();
							}else if(res.data.length == 0){
								Indicator.close();
								Toast({
									message:'数据加载完毕',
									duration: 500
								});
								this.dataLength = false;
								this.pageNo = Number(this.pageNo)-Number(1);
							}else if(res.data.status == 0){
								Toast({
									message:res.data.msg,
									duration: 500
								})
							}
						})
					}
				}else{
					if(this.dataLength2 == true){
						this.pageNo2 = Number(this.pageNo2)+Number(1);
						Indicator.open();
						this.postData('post','/shop-v1-user_recharge_mplog.html',{page:this.pageNo2}).then(res => {
							if(res.data.length != 0){
								this.list = this.list.concat(res.data)
								Indicator.close();
							}else if(res.data.length == 0){
								Indicator.close();
								Toast({
									message:'数据加载完毕',
									duration: 500
								});
								this.dataLength2 = false;
								this.pageNo2 = Number(this.pageNo2)-Number(1);
							}else if(res.data.status == 0){
								Toast({
									message:res.data.msg,
									duration: 500
								})
							}
						})
					}
				}
			},
			choose(index){
				Indicator.open();
				this.nodata1 = false;
				this.list = [];
				if(index == 1){
					this.selected1 = true;
					this.dataLength = true;
					this.pageNo = 1;
					this.postData('post','/shop-v1-user_recharge_mblog.html',{page:this.pageNo}).then(res => {
						if(res.data.length != 0){
							this.list = res.data;
						}else{
							this.nodata1 = true
						}
						Indicator.close();
					})
				}else if(index == 2){
					this.selected1 = false;
					this.pageNo2 = 1;
					this.dataLength2 = true;
					this.postData('post','/shop-v1-user_recharge_mplog.html',{page:this.pageNo2}).then(res => {
						if(res.data.length != 0){
							this.list = res.data;
						}else{
							this.nodata1 = true
						}
						Indicator.close();
					})
				}
			}
		},
		components:{nodata}
	}
</script>
<style lang="less">
	.rechargeList{
		font-size: 0.24rem;
		.nav{
			display: flex;
			display: -webkit-flex;
			background-color: #fff;
			height: 0.8rem;
			line-height: 0.8rem;
			div{
				width: 50%;
				text-align: center;
				color: #999;
			}
			.selected{
				color: #5e96d0;
				border-bottom: 1px solid #5e96d0;
			}
		}
		.item{
			background-color: #fff;
			height: 0.9rem;
			width: 100%;
			margin-top: 0.17rem;
			display: flex;
			display: -webkit-flex;
			.allTop{
				display: table;
				height: 0.9rem;
				width: 50%;
				.all{
					display: table-cell;
					vertical-align: middle;
					padding-left: 0.17rem;
					div:nth-child(2){
						color: #999;
						margin-top: 0.05rem;
					}
				}
			}
			.allTop1{
				width: 50%;
				.recharge1,
				.recharge{
					float: right;
					display: inline-block;
					line-height: 0.9rem;
					padding-right: 0.17rem;
				}
				.recharge1{
					color: red;
				}
			}
		}
		.xuan{
			height: 0.76rem;
			width: 100%;
			background-color: #fff;
			line-height: 0.76rem;
			color: #999;
			span{
				margin-left: 0.17rem;
			}
			.selected{
				color: #5e96d0;
			}
		}
	}
</style>