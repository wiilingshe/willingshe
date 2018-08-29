<!--最终提交页面-->
<template>
	<div class="box anchorSubmit">
		<div class="header">
			<i class="iconfont icon-v3"></i>
		</div>
		<div class="text">
			<p>工作人员将审核认证，审核结果。</p>
			<p>将通过短信通知你，请耐心等待哦。</p>
		</div>
		<div class="login">
			<button @click="index()">点击返回首页{{second}}秒</button>
		</div>
	</div>
	
</template>

<script>
	
	export default {
		data(){
			return{
				second:3
			}
			
		},
		methods:{
			index:function(){
				this.$router.push('/');
			}
			
           
		},
		mounted(){
			this.share('提交','我的个人中心',this.sharePic);
		}
	}
	
</script>

<style scoped>
	
	.box{
		display: flex;
		flex-direction: column;
		text-align: center;
	}
	
	.header{
		height: 2.4rem;
	}
	
	.icon-v3{
		font-size: 1.4rem;
		color: #3385FF;
		line-height: 2.4rem;
	}
	
	.text{
		font-size: 0.24rem;
		color: #CCCCCC;
	}
	
	.anchorSubmit button{
		width: 4rem;
		height: 0.8rem;
		font-size: 0.26rem;
		outline-style: none;
		border: none;
		border-radius: 0.4rem;
		background-color: #3385ff;
		color: white;
	}
</style>