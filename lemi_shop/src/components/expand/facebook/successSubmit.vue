<template>
	<div class="successSubmit">
		<div class="tubiao">
			<i class="icon iconfont icon-check"></i>
		</div>
		<div class="zi1">提交成功</div>
		<div class="zi2">工作人员正在审核</div>
		<div class="codeTop">
			<img :src="code" class="code">
		</div>
		<div class="zi3">
			长按关注活动微信公众号
		</div>
		<div class="zi3">
			随时查看审核进度的最新情况
		</div>
		<div class="home" @click="toHome()">
			返回首页
		</div>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				code:''
			}
		},
		created(){
			this.global.shouquan();
			this.postData('post','/shop-v1-masks_info.html',{masks_id:this.$route.query.masks_id}).then(res => {
				this.code = res.data.wechat;
			});
		},
		methods:{
			toHome(){
				this.$router.push({path:'/faceHome',query:{masks_id:this.$route.query.masks_id}})
			}
		}
	}
</script>
<style lang="less">
	.successSubmit{
		height: 100%;
		width: 100%;
		background-color: #fff;
		font-size: 0.205rem;
		color: #333;
		.tubiao{
			width: 1.484rem;
			height: 1.484rem;
			margin:0 auto;
			padding-top: 0.9rem;
			i{
				color: #ef4949;
				font-size: 1.484rem;
			}
		}
		.zi1{
			text-align: center;
			font-size: 0.34rem;
			margin-top: 0.256rem;
		}
		.zi2{
			text-align: center;
			font-size: 0.256rem;
			color: #999;
			margin-top: 0.1rem;
		}
		.codeTop{
			width: 1.706rem;
			height: 1.706rem;
			margin:0 auto;
			margin-top: 2.27rem;
			margin-bottom: 0.05rem;
			.code{
				width: 1.706rem;
				height: 1.706rem;
				text-align: center;
			}
		}
		.zi3{
			text-align: center;
			color: #666;
			font-size: 0.222rem;
			margin-top: 0.1rem;
		}
		.home{
			width: 2.048rem;
			height: 0.682rem;
			border-radius: 0.341rem;
			border:1px solid #ef4949;
			text-align: center;
			line-height: 0.682rem;
			color: #ef4949;
			font-size: 0.256rem;
			margin:0 auto;
			margin-top: 0.5rem;
		}
	}
</style>