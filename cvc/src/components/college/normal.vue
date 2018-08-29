<template>
	<div class="normal">
		<div class="normal-share">
      分享赚学费
    </div>
    <div class="normal-content">
    	<div class="collegeFooter">
    		<div class="left">
    			<span class="title">全球顶级大师现场开讲</span>
    			<span class="originalPrice">3999元/年</span>
    		</div>
    		<div class="right">
    			1999元/年
    		</div>
    	</div>
    </div>
		<Navigator></Navigator>
	</div>
</template>
<script>
	import footer1 from '@/components/common/footer1'
	import Navigator from '@/components/common/Navigator';
	export default{
		data(){
			return{
			}
		},
		components:{footer1,Navigator},
	}
</script>
<style lang="less">
	.normal{
		&-share{
			width: 1.4rem;
			height: 0.46rem;
			font-size: 0.24rem;
			text-align: center;
			line-height: 0.46rem;
			color: #fff;
			overflow: hidden;
			background-color: #EF4949;
			border-top-left-radius: 0.23rem;
			border-bottom-left-radius: 0.23rem;
			position: absolute;
			top: 0.4rem;
			right: 0;
		}
		&-content{
			height:calc(~"100vh - 1rem");
			position: relative;
			overflow: scroll;
			-webkit-overflow-scrolling:touch;
			.collegeFooter{
				width:100%;
				height:0.92rem;
				position: absolute;
				bottom: 0;
				.left{
					width:70%;
					height:100%;
					background-color: #fff;
					float: left;
				}
				.right{
					width:30%;
					height:100%;
					float: right;
					background-color: #EF4949;
					color:#FFFFFF;
					font-size: 0.3rem;
					line-height: 0.92rem;
					text-align: center;
				}
			}
		}
		.title{
			width:3.3rem;
			font-size: 0.26rem;
			height:100%;
			line-height: 0.92rem;
			float: left;
			margin-left:0.32rem;
			color:#333;
			overflow: hidden;
			text-overflow:ellipsis;
			white-space: nowrap;
		}
		.originalPrice{
			font-size: 0.26rem;
			height:100%;
			line-height: 0.92rem;
			float: right;
			text-decoration: line-through;
			color:#999;
			margin-right: 0.2rem;
		}
	}
</style>