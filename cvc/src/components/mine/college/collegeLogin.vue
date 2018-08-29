<!--学院登录页-->
<template>
   <div class="box">
   	   <div class="user">
   	   	<div>账号：</div>
   	   	<div>
   	   		<input ref="user" type="text" class="inputs" placeholder="请输入账号" />
   	   	</div>
   	   </div>
   	   <div class="pass">
   	   	<div>密码：</div>
   	   	<div>
   	   		<input ref="pass" type="password" class="inputs" placeholder="请输入密码"/>
   	   	</div>
   	   </div>
   	   <div class="login">
   	   	<button @click="login()">登录</button>
   	   </div>
   	   <div style="color:#999;font-size:0.26rem;text-align: center;width:100%;position: absolute;bottom: 0.2rem;">
			<div>小象SaaS提供技术支持</div>
			<div>www.saasxx.vip</div>
		</div>
   </div>
</template>

<script>
	import {Toast} from 'mint-ui'
	import Navigator from '../../common/Navigator'
	import md5 from 'js-md5'
	export default {
		data(){
			return {
				
			}
		},
		created(){
			document.title = '绑定'
		},
		methods:{
			login(){
				this.postData('post','/shop-v1-shop_truss_shop.html',{user:this.$refs.user.value,pass:md5('le.mi'+this.$refs.pass.value+'@max'),shop_type:'2'}).then(res => {
					if(res.status == 200){
						if(res.data.status == 1){
							Toast({
								 message: res.data.msg,
								 duration: 1000
							});
							setTimeout(() => {
								 this.$router.push({path: '/mine'});
							}, 1500);
						}else if(res.data.status == 0){
							Toast({
								 message: res.data.msg,
								 duration: 1000
							});
						}
					}
				})
			}
		},
		mounted(){
			this.share('绑定页','我的个人中心',this.sharePic);
		}
	}
</script>

<style scoped>
	.box{
		display: flex;
		flex-direction: column;
	}
	
	.user,.pass{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		height: 1rem;
		align-items: center;
		border-bottom: 1px solid #e1e2e6;
		padding: 0 0.2rem;
		background: #fff;
	}
	.user div:first-child,.pass div:first-child{
		font-size: 0.26rem;
		width: 1.2rem;
		text-align: left;
	}
	.user div:last-child,.pass div:last-child{
		flex: 1;
		display: flex;
		display:-webkit-flex;
		justify-content: flex-start;
		
	}
	.inputs{
		padding: 0.2rem;
		font-size: 0.24rem;
		border: none;
		outline-style: none;
		
	}
	.login{
		text-align: center;
	}
	.login button{
		width: 4rem;
		height: 0.8rem;
		font-size: 0.26rem;
		outline-style: none;
		border: none;
		border-radius: 0.4rem;
		background-color: #1c252c;
		color: white;
		}
</style>