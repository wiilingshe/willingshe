<template>
	<div class="liveHome">
		<span>当前总人数：10001</span>
		<span style="float:right;margin-right:0.2rem;" @click="forum()">前往讨论区</span>
		<div class="content">
			<div class="new">
				<ul>
					<li class="head">
						<img src="../../../static/img/1111.png">
					</li>
					<li class="nameCt">
						<div class="allCt">
							<div class="name">名称名称名称名称</div>
							<div class="content">名称名称</div>
						</div>
					</li>
				</ul>
			</div>
			<div class="new">
				<ul>
					<li class="head">
						<img src="../../../static/img/1111.png">
					</li>
					<li class="nameCt">
						<div class="allCt">
							<div class="name">名称名称名称名称</div>
							<div class="content">名称名称名称名称名称名称名称名称名称名称</div>
						</div>
					</li>
				</ul>
			</div>
			<div class="new">
				<ul>
					<li class="head">
						<img src="../../../static/img/1111.png">
					</li>
					<li class="nameCt">
						<div class="allCt">
							<div class="name">名称名称名称名称</div>
							<div class="content">名称名称名称名称名称名称名称名称名称名称名称名称名称名称名称名称</div>
						</div>
					</li>
				</ul>
			</div>
			<div class="new">
				<ul>
					<li class="head">
						<img src="../../../static/img/1111.png">
					</li>
					<li class="nameCt">
						<div class="allCt">
							<div class="name">名称名称名称名称</div>
							<div class="content">名称名称名称名称名称名称名称名称</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
	export default{
		data(){
			return{

			}
		},
		created(){
			document.title = '聊天直播间';
			this.global.shouquan();
		},
		mounted(){

		},
		methods:{
			forum(){
				// this.$router.push({path:})
			}
		}
	}
</script>
<style>
	.liveHome{
		font-size: 0.26rem;
	}
	.liveHome .new{
		height: 1.2rem;
	}
	.liveHome .new ul li{
		float: left;
	}
	.liveHome .new .head img{
		height: 0.8rem;
		width: 0.8rem;
		border-radius: 0.8rem;
		margin-top: 0.2rem;
		margin-left: 0.15rem;
		margin-right: 0.1rem;
	}
	.liveHome .nameCt{
		display: table;
		height: 1.2rem;
	}
	.liveHome .nameCt .allCt{
		display: table-cell;
		vertical-align: middle;
	}
	.liveHome .nameCt .allCt .name{
		font-size: 0.24rem;
		color: #666;
		margin-bottom: 0.05rem;
	}
	.liveHome .nameCt .allCt .content{
		min-height: 0.4rem;
		max-width: 4.36rem;
		background-color: #fff;
		font-size: 0.27rem;
		border-radius: 0.1rem;
		padding: 0.1rem 0.1rem 0.1rem 0.1rem;
		display: inline-block;
		margin-bottom: 0rem;
	}
</style>