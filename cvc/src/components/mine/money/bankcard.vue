<template>
	<div class="box bankcard" style="background: #f1f2f6;">
		<!-- <div style="height:0.2rem;width:100%;background:#f1f2f6"></div> -->
		<div v-if="info">
			<div class="listcss">
				<span class="listOne">真实姓名</span>
				<span class="listTwo">{{name}}</span>
			</div>
			<div class="listcss">
				<span class="listOne">手机号码</span>
				<span class="listTwo">{{phone}}</span>
			</div>
			<div class="listcss">
				<span class="listOne">所属银行</span>
				<span class="listTwo">{{bname}}</span>
			</div>
			<div class="listcss">
				<span class="listOne">银行账号</span>
				<span class="listTwo">{{account}}</span>
			</div>
			<div class="listcss">
				<span class="listOne">公开</span>
				<span class="listTwo" v-if="account_type  == 1">否</span>
				<span class="listTwo" v-if="account_type == 2">是</span>
			</div>
			<div class="login">
				<button @click="changeBank()" style="width:4rem;margin-right:0">修改银行卡绑定</button>
			</div>
		</div>
		<div v-if="!info">
			<div v-show="!ifBank">
				<div class="box_one">
					<div>真实姓名</div>
					<div>
						<input type="text" ref="name"/>
						<i class="iconfont icon-dayuhao1" style="color: #CCCCCC;"></i>
					</div>
				</div>
				<div class="box_two">
					<div>手机号码</div>
					<div>
						<input type="number" ref="phone"/>
						<i class="iconfont icon-dayuhao1" style="color: #CCCCCC;"></i>
					</div>
				</div>
				<div class="box_four" @click="chooseBank()">
					<div>所属银行</div>
					<div>
						<input type="text" ref="bank" disabled="disabled" style="background-color:#fff;position: relative;
    top: -0.05rem;" />
						<input type="text" ref="bid" disabled="disabled" style="display:none" value="111"/>
						<i class="iconfont icon-dayuhao1" style="color: #CCCCCC;"></i>
					</div>
				</div>
				<div class="box_five">
					<div>银行账号</div>
					<div>
						<input type="number" ref="account"/>
						<i class="iconfont icon-dayuhao1" style="color: #CCCCCC;"></i>
					</div>
				</div>
				<div class="yinsi">
					<span class=""><p>公开</p><input type="radio" name="yinsi" v-model="yinsi" value="2"></span>
					<span class=""><p>自己看</p><input type="radio" name="yinsi" v-model="yinsi" value="1"></span>
				</div>
				<div class="login" style="position:relative">
					<button @click="bindBank()">提交</button>
					<button @click="diss()">取消</button>
				</div>
			</div>
			<div v-show="ifBank">
				<div class="bankTitle">选择开户行</div>
				<div style="margin-top:0.2rem;">
					<div class="bankchoose" v-for="item in bankList" @click="mineBank(item.bid,item.bname)">{{item.bname}}</div>
				</div>
			</div>
		</div>
		<div style="color:#999;font-size:0.26rem;text-align: center;position:absolute;bottom:0.2rem;width:100%;">
			<div>小象SaaS提供技术支持</div>
			<div>www.saasxx.vip</div>
		</div>
	</div>
</template>

<script>
	import {Toast} from 'mint-ui'
	export default{
		data(){
			return{
				ifBank:false,
				bankList:'',
				name:'',
				phone:'',
				bank:'',
				account:'',
				info:true,
				yinsi:'1',
				account_type:'',
				bname:'',
			}
		},
		created(){
			document.title = '绑定银行卡'
			this.global.shouquan();
			this.noShare();
			this.postData('post','/shop-v1-user_bank_bundling.html').then(res => {
				this.name = res.data.name;
				this.phone = res.data.phone;
				this.account = res.data.bank_account;
				this.account_type = res.data.account_type;
				this.bname = res.data.bname;
			})
		},
		mounted(){
			this.postData('post','/shop-v1-user_bank.html').then(res => {
				this.bankList = res.data
			})
		},
		methods:{
			bindBank(){
				var self = this;
				var data = {
					name:this.$refs.name.value,
					phone:this.$refs.phone.value,
					bank_account:this.$refs.account.value,
					bid:this.$refs.bid.value,
					bname:this.$refs.bank.value,
					account_type:this.yinsi
				}
				console.log(data)
				this.postData('post','/shop-v1-user_bank_bundling.html',data).then(res => {
					if(res.data.status == 1){
						Toast({
							message:'绑定成功',
							duracrion:'500'
						});
						this.info = true;
						this.postData('post','/shop-v1-user_bank_bundling.html').then(res => {
							this.name = res.data.name;
							this.phone = res.data.phone;
							this.account = res.data.bank_account;
							this.account_type = res.data.account_type;
							this.bname = res.data.bname;
						})
					}else if(res.data.status == 0){
						Toast({
							message:res.data.msg,
							duracrion:'500'
						})
					}
				})
			},
			chooseBank(){
				this.ifBank = true;
			},
			mineBank(id,bank){
				this.ifBank = false;
				this.$refs.bid.value = id;
				this.$refs.bank.value = bank;
			},
			changeBank(){
				this.info = false;
			},
			diss(){
				this.info = true;
			}
		}
	}
</script>

<style>
	.listOne{
		margin-left: 0.2rem;
	}
	.listTwo{
		float: right;
		margin-right: 0.3rem;
	}
	.listcss{
		height: 0.8rem;
	    width: 100%;
	    background: #fff;
	    line-height: 0.8rem;
	    font-size: 0.27rem;
	    color: #333;
	    border-top: 1px solid #e1e2e6;
	}
	.box{
		flex-direction: column;
		font-size: 0.26rem;
		height: 100%;
		background: #f1f2f6;
		color: #333
	}

	.box_one,.box_two,.box_three,.box_four,.box_five{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		font-size: 0.28rem;
		border-bottom: 1px solid #e1e2e6;
		height: 0.8rem;
		line-height: 0.8rem;
		padding:0 0.2rem;
		background: #fff;
	}

	/*.iconfont{
		color: #CCCCCC;
	}*/

	.bankcard input{
		height: 0.6rem;
		border: none;
		outline-style: none;

	}

	.login{
   	display: flex;
   	flex-direction: row;
   	justify-content: center;
    margin-top: 1rem;
   }

   .bankcard button{
		width: 4rem;
		height: 0.8rem;
		font-size: 0.26rem;
		outline-style: none;
		border: none;
		border-radius: 0.4rem;
		background-color: #3385ff;
		color: white;
	}
	.bankTitle{
		height: 0.8rem;
	    width: 100%;
	    text-align: center;
	    background: #fff;
	    line-height: 0.8rem;
	    font-size: 0.3rem;
	    border-bottom: 1px solid #e1e2e6;
	}
	.bankchoose{
		height: 0.7rem;
	    width: 100%;
	    background: #fff;
	    border-top: 1px solid #e1e2e6;
	    line-height: 0.7rem;
	    padding-left: 0.2rem;
	    font-size: 0.28rem;
	}
	.bankchoose:nth-child(1){
		border-top: 0
	}
	.login button{
		width:2rem;
	}
  .bankcard .login button:nth-child(1){
		margin-right: 0.5rem;
	}
	.login button:nth-child(2){
		margin-left: 0.5rem;
		background: #fff;
		color: #333;
	}
	.yinsi{
		height: 0.8rem;
		width:100%;
		background: #fff;
		line-height: 0.8rem;
	}
	.yinsi span{
		width:46%;
		display: inline-block;
		margin-left: 0.2rem;
	}
	.yinsi span button{
		position: absolute;
	}
	.yinsi input{
		position: relative;
		top: 0.2rem;
		left: 0.2rem;
	}
	.yinsi p{
		display: inline-block;
		margin-left: 0.5rem;
	}
</style>
