<template>
	<div class="box">
		<div class="header">
			<div class="header_one">
				<div>我的资产(人民币)</div>
			</div>
			<div class="header_two">
				{{balance}}
			</div>
		</div>
		<div class="main" style="background:#fff">
			<div class="main_one" @click="tixian()">
				<div><i class="iconfont icon-tixian"></i>提现</div>
				<div><i class="iconfont icon-dayuhao1"></i></div>
			</div>
			<div class="main_two" @click="tixianDetailed()">
				<div><i class="iconfont icon-tongxunlu1"></i>提现明细</div>
				<div><i class="iconfont icon-dayuhao1"></i></div>
			</div>
			<div class="main_three" @click="shouruDetailed()">
				<div><i class="iconfont icon-tixian2"></i>收入明细</div>
				<div><i class="iconfont icon-dayuhao1"></i></div>
			</div>
		</div>
		<div style="color:#999;font-size:0.26rem;text-align: center;position: absolute;width: 100%;bottom: 0.2rem;">
			<div>小象SaaS提供技术支持</div>
			<div>www.saasxx.vip</div>
		</div>
	</div>
</template>

<script>
    export default {
		data(){
			return{
				balance:0	
			}
		},
		created(){
			this.global.shouquan();
			this.noShare();
			document.title = '我的资产';
			this.getData('get','/shop-v1-user_get_balance.html').then(res => {
				if(res.status == 200){
					this.balance = Number(res.data.data.balance) + Number(res.data.data.largess_balance) + Number(res.data.data.recharge_balance)
            		this.balance = this.balance.toFixed(2);
				}
				console.log(this.balance);
			})
		},
		methods:{
				tixian(){
					this.$router.push('/mine-assetsWithdrawals');
				},
				tixianDetailed(){
					this.$router.push('/mine-tixianDetailed');
				},
				shouruDetailed(){
					this.$router.push('/mine-shouruDetailed');
				}
		}
	
	}

</script>

<style scoped>
	.box{
		display: flex;
		flex-direction:column;
	}
	.header{
		display: flex;
		background: #5e96d0;
		height: 2rem;
		color: white;
		font-size: 0.28rem;
		flex-direction: column;
	}
	.header_one{
		display: flex;
		height: 0.6rem;
		line-height: 0.6rem;
		flex-direction: row;
		justify-content:space-between;
		margin: 0 0.2rem;
	}
	.header_two{
		font-size: 1rem;
		padding-left: 0.2rem;
	}
	
	.main{
		display: flex;
		flex-direction: column;
		
	}
	
	.main_one,.main_two,.main_three{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		font-size: 0.28rem;
		height: 1rem;
		line-height: 1rem;
		margin-left: 0.2rem;
		margin-right: 0.2rem;
		border-bottom: 1px solid #f1f2f6;
	}
	
	.icon-dayuhao1{
		color: #f1f2f6;
	}
	.icon-tixian{
		font-size: 0.3rem;
		color:orange;
		margin-right: 0.2rem;
	}
	.icon-tongxunlu1{
		font-size: 0.3rem;
		color: orangered;
		margin-right: 0.2rem;
	}
	.icon-tixian2{
		font-size: 0.3rem;
		color: green;
		margin-right: 0.2rem;
	}
	
</style>