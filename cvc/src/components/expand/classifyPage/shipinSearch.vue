<template>
	<div id="box">
		<classifyPage></classifyPage>
	</div>
</template>

<script>
	import classifyPage from './classifyPage'
	export default{
		data:function(){
			return {
				
			}
		},
		created(){
			document.title="视频分类";
			this.global.shouquan()
			},
		mounted(){
			this.postData('post','/shop-v1-video_category.html').then(res => {
				if(res.status==200){
//					console.log(res.data);
					this.navArrTwo=res.data;
//					console.log(this.navArrTwo);
				}
			})
		},
		components:{
			classifyPage
		},
	}
</script>

<style>
</style>