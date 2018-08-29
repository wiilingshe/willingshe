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
			<div class="main_weixin" style="background:#fff">
		        <div v-if="bindarr.wechat_is_bound != 0"><i class="iconfont icon-wechat"></i>微信<span class="bound">（已绑定）</span>
		        </div>
		        <div @click="alipay()" v-if="bindarr.alipay_is_bound != 0"><i class="iconfont icon-zhifubao1"></i>支付宝<span
		          class="bound">（已绑定）</span><i class="iconfont icon-dayuhao1" style="color:#eee;float: right;"></i>
		        </div>
		        <div @click="bankcard()" v-if="bindarr.bank_is_bound != 0">
		          <i class="iconfont icon-yinlian1"></i>银行卡
		          <span class="bound">（已绑定）</span>
		          <i class="iconfont icon-dayuhao1" style="color:#eee;float: right;"></i>
		        </div>
		    </div>
		    <div v-if="bindarr.alipay_is_bound == 0" class="main_two" @click="alipay()" style="background:#fff">
		        <div><i class="iconfont icon-zhifubao1" style="margin-left: 0;"></i>绑定支付宝</div>
		        <div><i class="iconfont icon-dayuhao1" style="color:#eee"></i></div>
		      </div>
		      <div v-if="bindarr.bank_is_bound == 0" class="main_three" @click="bankcard()" style="background:#fff">
		        <div class="bankcard()"><i class="iconfont icon-yinlian1" style="margin-left: 0;"></i>绑定银行卡</div>
		        <div><i class="iconfont icon-dayuhao1" style="color:#eee"></i></div>
		    </div>
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
			 <footer1></footer1>
		</div>
	</div>
</template>

<script>
	import footer1 from '@/components/publicPage/footer1'
    export default {
		data(){
			return{
				selected: '1',//默认选中
		        arr: [],
		        arr2: [],
		        arr3: [],
		        balance: 0.00,
		        bindarr: [],
			}
		},
		created(){
			this.global.shouquan();
			this.noShare();
			document.title = '我的资产';
			this.getData('get','/shop-v1-shop_get_balance.html').then(res => {
				if(res.status == 200){
					this.balance = Number(res.data.balance)
            		this.balance = this.balance.toFixed(2);
				}
				console.log(this.balance);
			})
			this.getData('get', '/shop-v1-user_get_member_withdraw.html').then(res => {
		        this.bindarr = res.data;
		      })
		},
		components:{footer1},
		methods:{
				tixian(){
					this.$router.push('/mine-assetsWithdrawals');
				},
				tixianDetailed(){
					this.$router.push('/mine-tixianDetailed');
				},
				shouruDetailed(){
					this.$router.push('/mine-shouruDetailed');
				},
				toggleTabs (tabText) {
			        this.currentView = tabText;
			      },
			      detailed: function () {
			        this.$router.push('/mine-money-withdrawals');
			      },
			      withdrawals: function () {
			        this.$router.push('/mine-money-withdrawals');
			      },
			      alipay: function () {
			        this.$router.push('/mine-money-alipay');
			      },
			      bankcard: function () {
			        this.$router.push('/mine-money-bankcard');
			      },
			      record(){
			        this.$router.push({path: '/mine-money-detailed'})
			      },
			      recharge(){
			        this.$router.push({path: '/recharge'})
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
		font-size: 0.26rem;
		color: #666;
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
	.main_one, .main_two, .main_three {
    height: 0.76rem;
    line-height: 0.76rem;
    border-bottom: 1px solid #f1f2f6;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }


  .icon-zhifubao1 {
    margin-left: 0.2rem;
    margin-right: 0.2rem;
    color: #00BFFF;
    font-size: 0.28rem;
  }

  .icon-yinlian1 {
    margin-left: 0.2rem;
    margin-right: 0.2rem;
    color: #336666;
    font-size: 0.28rem;
  }

  .icon-shouji {
    margin-left: 0.2rem;
    margin-right: 0.2rem;
    color: rgb(254, 88, 117);
    font-size: 0.28rem;
  }

  .icon-dingdan {
    margin-left: 0.2rem;
    margin-right: 0.2rem;
    color: #64508b;
    font-size: 0.28rem;
  }

  .icon-wechat:before {
    margin: 0 0.2rem;
    font-size: 0.28rem;
    margin-right: 0.2rem;
    color: #04be02;
  }

  .bound {
    font-size: 0.22rem;
    color: #999;
  }
	.main_weixin {
    border-bottom: 0.2rem solid #F7F7F7;
    height: auto;
    line-height: 0.7rem;
  }

  .main_weixin > div {
    border-bottom: 1px solid #f1f2f6;
  }
	
</style>