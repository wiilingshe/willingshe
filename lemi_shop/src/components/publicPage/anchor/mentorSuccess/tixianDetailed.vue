<template>
	<div class="tixianDetailed_box">
		<div class="tixianDetailed_header">
			<div>时间</div>
			<div>类型</div>
			<div>交易金额</div>
			<div>状态</div>
		</div>
		<div class="tixianDetailed_main" v-infinite-scroll="loadMore"
  infinite-scroll-disabled="false" infinite-scroll-immediate-check="false"
  infinite-scroll-distance="0">
			<div class="main_box" v-for="item in arr">
				<div>{{ item.create_time }}</div>
				<div> {{ item.withdraw_name }}</div>
				<div> {{ item.total_fee }}</div>
				<div class="red" v-if="item.status == 2">交易成功</div>
				<div class="red" v-if="item.status == 1">正在处理</div>
				<div class="red" v-if="item.status == 3">拒绝</div>
			</div>
		</div>
		<div style="color:#999;font-size:0.26rem;text-align: center;width:100%;margin-bottom:0.2rem;margin-top:0.2rem;">
			<footer1></footer1>
		</div>
	</div>
</template>

<script>
	import footer1 from '@/components/publicPage/footer1'
	export default{
		data(){
			return{
				arr:'',
				page:1,
			}
		},
		created(){
			document.title = '提现明细';
			this.global.shouquan();
			this.getData('get','/shop-v1-shop_get_shop_withdraw.html?page=1&pageSize=12').then(res => {
				if(res.status == 200){
					this.arr = res.data;
				}
			})
		},
		methods:{
			loadMore(){
				this.page++;
				var url = '/shop-v1-shop_get_shop_withdraw.html?pageSize=12&page='+this.page;
				this.getData('get',url).then(res => {
					if(res.status == 200){
						this.arr = this.arr.concat(res.data);
					}
				})
			}
		},
		components:{footer1},
	}
</script>

<style scoped>
	
	
	.tixianDetailed_header{
		margin-bottom: 0.2rem;
		display: flex;
		display: -webkit-flex;
		flex-direction: row;
		-webkit-flex-direction: row;
		justify-content: space-between;
		-webkit-justify-content: space-between;
		font-size: 0.27rem;
		border-bottom: 1px solid #e1e2e6;
		background: #FCFCFC;
		height: 1rem;
		line-height: 1rem;
	}
	
	.tixianDetailed_header>div{
		text-align: center;
		flex-basis: 25%;
		-webkit-flex-basis: 25%;
	   
	}
	
	.tixianDetailed_main{
		/*display: flex;
		display: -webkit-flex;
		flex-direction: column;
		-webkit-flex-direction: column;
		background: #fff;
		color: #666;*/
		background: #fff;
		height: calc(~"100vh - 1.2rem");
		overflow:scroll;
		-webkit-overflow-scrolling:touch;
		/*background-color: #f1f2f6;*/
		
	}
	
	.main_box{
		height: 0.8rem;
		line-height: 0.8rem;
		display: flex;
		display: -webkit-flex;
		flex-direction: row;
		-webkit-flex-direction: row;
		justify-content: space-between;
		-webkit-justify-content: space-between;
		font-size: 0.27rem;
		border-top: 1px solid #f1f2f6;
	}
	.main_box:nth-child(1){
		border-top: 0;
	}
	
	.main_box>div{
		text-align: center;
		flex-basis: 25%;
		font-size: 0.21rem;
	}
	
	.main_box>div:nth-child(2){
		position: relative;
	}
	
	.main_box span{
		background: orange;
		color: white;
		position: absolute;
		display: block;
		width: 0.8rem;
		height: 0.4rem;
		line-height: 0.4rem;
		top:0.1rem;
		right: -0.3rem;
		border-radius: 0.05rem;
		font-size: 0.23rem;
		
		
	}
	
	.red{
		color: orange;
	}
</style>