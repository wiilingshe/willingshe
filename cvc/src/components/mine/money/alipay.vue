<template>
	<div class="box">
		<div style="height:0.17rem;width:100%;background:#f1f2f6"></div>
		<div>
			<div v-if="aliInfo">
				<div class="listcss">
					<span class="listOne">支付宝账号</span>
					<span class="listTwo">{{account}}</span>
				</div>
				<div class="listcss">
					<span class="listOne">真实姓名</span>
					<span class="listTwo">{{name}}</span>
				</div>
				<div class="listcss">
					<span class="listOne">手机号码</span>
					<span class="listTwo">{{phone}}</span>
				</div>
				<div class="login">
					<button @click="change()" style="margin:0;width:4rem;">修改支付宝绑定</button>
				</div>
			</div>
		</div>
		<div v-if="!aliInfo">
			<div class="box_one">
				<div>支付宝账号</div>
				<div>
					<input type="text" ref="alipay" class="alipayInput" />
					<i class="iconfont icon-dayuhao1" style="color: #CCCCCC;"></i>
				</div>
			</div>
			<div class="box_two">
				<div>真实姓名</div>
				<div>
					<input type="text" ref="name" class="alipayInput" />
					<i class="iconfont icon-dayuhao1" style="color: #CCCCCC;"></i>
				</div>
			</div>
			<div class="box_three">
				<div>手机号码</div>
				<div>
					<input type="number" ref="phone" class="alipayInput" />
					<i class="iconfont icon-dayuhao1" style="color: #CCCCCC;"></i>
				</div>
			</div>
			<div class="login" style="position:relative">
				<button class="alipayBtn" @click="setInfo()">提交</button>
				<button class="alipayBtn" @click="diss()">取消</button>
			</div>
		</div>
		<div style="color:#999;font-size:0.26rem;text-align: center;position: absolute;bottom: 0.2rem;width:100%;">
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
				aliInfo:true,
				name:'',
				phone:'',
				account:'',
			}
		},
		created(){
			document.title = '绑定支付宝'
			this.global.shouquan();
			this.noShare();
			this.postData('post','/shop-v1-user_alipay_bundling.html').then(res => {
					if(res.status == 200){
						this.name = res.data.name;
						this.phone = res.data.phone;
						this.account = res.data.account_number;
					}
			})
		},
		mounted(){
		},
		methods:{
			bindali(){
				this.postData('post','/shop-v1-user_alipay_bundling.html',{'name':this.$refs.name.value,'phone':this.$refs.alipay.phone,'account_number':this.$refs.alipay.phone}).then(res => {
					if(res.data.status == 1){
						Toast({
							message:'绑定成功',
							duraction:'500'
						});

					}else if(res.data.status == 0){
						Toast({
							message:res.data.msg,
							duraction:'500'
						})
					}
				})
			},
			change(){
				this.aliInfo = false;
			},
			diss(){
				this.aliInfo =true;
			},
			setInfo(){
				var data = {
					name:this.$refs.name.value,
					phone:this.$refs.phone.value,
					account_number:this.$refs.alipay.value
				}
				this.postData('post','/shop-v1-user_alipay_bundling.html',data).then(res => {
						if(res.status == 200){
							if(res.data.status == 1){
								Toast({
									message:res.data.msg,
									duraction:'500'
								});
								this.aliInfo =true;
								this.name = this.$refs.name.value;
								this.phone = this.$refs.phone.value;
								this.account = this.$refs.alipay.value;
							}else if(res.data.status == 0){
								Toast({
									message:res.data.msg,
									duraction:'500'
								})
							}
						}
				})
			}
		}
	}
</script>

<style scoped>
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
	    border-top: 1px solid #f1f2f6;
	}
	.box{
		display: flex;
		flex-direction: column;
		height: 100%;
		background: #f1f2f6;
	}

	.box_one,.box_two,.box_three{
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



	.alipayInput{
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

   .login button{
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
	.login button{
		width:2rem;
	}
  .login .alipayBtn:nth-child(1){
		margin-right: 0.5rem;
	}
	.login .alipayBtn:nth-child(2){
		margin-left: 0.5rem;
		background: #fff;
		color: #333;
	}
	input{
		color: #333;
	}
</style>
