<template>
	<div class="becomeMember">
		<div class="becomeMember-content">
			<div class="becomeMember-content-tips">
				<img src="../../../static/img/college/becomeMember/Instructions.png" alt="">
				<span class="tipsCont">长按保存图片，或发给朋友</span>
			</div>
			<div class="startLearning">开始学习</div>
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
	.becomeMember{
		position: relative;
		&-content{
			width:100%;
			height:100vh;
			&-tips{
				width:100%;
				/*position: absolute;
				left:0;
				bottom:1.2rem;*/
				text-align: center;
				img{
					width:0.26rem;
					display: inline-block;
				}
				.tipsCont{
					font-size: 0.26rem;
					display: inline-block;
					color:#666;
				}
			}
			.startLearning{
				width:100%;
				height:0.9rem;
				background-color: #222;
				color:#fff;
				font-size: 0.3rem;
				line-height: 0.9rem;
				text-align: center;
				position: absolute;
				left:0;
				bottom:0;
			}
		}
	}
</style>