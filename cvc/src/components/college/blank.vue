<template>
	<div class="blank">
		<div class="blank-imgContainer">
			<img src="../../../static/img/college/blank/feilin.png" alt="">
		</div>
		<div class="blank-cause">
			您还未加入摄客学院
		</div>
		<div class="blank-btnCont">
			<span class="blank-btnCont-learn">了解摄客学院</span>
		</div>
	</div>
</template>
<script>
	export default{
		data(){
			return{

			}
		}
	}
</script>
<style lang="less">
	.blank{
		padding-top:3.3rem;
		&-imgContainer{
			width: 100%;
			height:1.88rem;
			text-align: center;
			img{
				width:2.2rem;
				margin:0 auto;
			}
		}
		&-cause{
			margin-top: 0.44rem;
			font-size: 0.3rem;
			color:#999;
			text-align: center;
		}
		&-btnCont{
			width:100%;
			&-learn{
				display: block;
				margin:0 auto;
				width:2.7rem;
				height:0.9rem;
				font-size: 0.3rem;
				line-height: 0.9rem;
				background-color:#222;
				text-align: center;
				color:#fff;
				border-radius: 0.06rem;
				margin-top: 0.64rem;
			}
		}
	}
</style>