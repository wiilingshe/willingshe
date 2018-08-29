<template>
	<div class="nodata">
		<div class="all">
			<i class="icon iconfont icon-wushuju"></i>
			<div>暂无数据！</div>
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
	.nodata{
		text-align: center;
		color: #999;
		width: 100%;
		margin-top: 0.17rem;
		.all{
			i:before{
				font-size: 1.5rem;
			}
			div{
				font-size: 0.221rem;
			}
		}
	}
</style>