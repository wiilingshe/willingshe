<template>
	<div class="shouruDetailed_box">
		<div class="shouruDetailed_header">
			<div>单号</div>
			<div>类型</div>
			<div>交易金额</div>
			<div>时间</div>
		</div>
		<div class="shouruDetailed_main">
			<div class="main_box" v-for="item in arr">
				<div>{{ item.order_no }}</div>
				<div>{{ item.type }}</div>
				<div>{{ item.bonus }}</div>
				<div>{{ item.create_time }}</div>
			</div>
		</div>
		<div style="color:#999;font-size:0.26rem;text-align: center;width:100%;margin-bottom:0.2rem;margin-top:0.2rem;">
			<div>小象SaaS提供技术支持</div>
			<div>www.saasxx.vip</div>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				arr:''
			}
		},
		created(){
			document.title = '收入明细';
			this.global.shouquan();
			this.getData('get','/shop-v1-shop_get_shop_wallet.html').then(res => {
				if(res.status == 200){
					this.arr = res.data;
				}
			})
		}
	}
</script>

<style scoped>
	
	
	.shouruDetailed_header{
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
	
	.shouruDetailed_header>div{
		text-align: center;
		flex-basis: 25%;
		-webkit-flex-basis: 25%;
	   
	}
	
	.shouruDetailed_main{
		display: flex;
		display: -webkit-flex;
		flex-direction: column;
		-webkit-flex-direction: column;
		background: #fff;
		
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