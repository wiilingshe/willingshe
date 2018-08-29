<template>
	<div class="codePc">
		<div class="datail">扫码查看详情</div>
		<div class="img1">
			<img :src="info.wechat">
		</div>
		<!-- <div class="name" style="display:none">
			{{info.wechat_msg}}
		</div> -->
		<div class="wrap">
		  <div class="inner">{{info.wechat_msg}}</div>
		</div>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				info:[],
			}
		},
		created(){
			this.postData('post','/shop-v1-masks_info.html',{masks_id:this.$route.query.masks_id}).then(res => {
			 	this.info = res.data;
			 });
		}
	}
</script>
<style lang="less">
	.codePc{
		font-size: 12px;
		width: 100%;
		height: 100%;
		background-color: #333333;
		text-align: center;
		color: #fff;
		.datail{
			font-size: 16px;
			margin-bottom: 24px;
			padding-top: 15%;
		}
		.img1{
			width: 235px;
			height: 235px;
			margin: 0 auto;
			margin-bottom: 30px;
			img{
				width: 235px;
				height: 235px;
			}
		}
		// .name{
		// 	width: 320px;
		// 	height: 50px;
		// 	margin: 0 auto;
		// 	font-size: 14px;
		// 	border: 1px solid #666;
		// 	border-radius: 50px;
		// 	line-height: 50px;
		// 	background-color: #202020;
		// }
		.wrap {
		  float: left; /* 自适应内容宽度 */
		  position: relative;
		  left: 50%; 
		}
		.inner {
			padding: 15px 15px;
			position: relative;
			left: -50%;
			font-size: 14px;
			border: 1px solid #666;
			border-radius: 50px;
			background-color: #202020;
		}
	}
</style>