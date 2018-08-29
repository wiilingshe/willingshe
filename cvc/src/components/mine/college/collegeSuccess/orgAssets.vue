<template>
	<p>学院资产</p>
</template>

<script>
	
	export default {
		
		data(){
			return{
			
			}
		},
		created(){
			this.global.shouquan();
			document.title = '学院资产'
		},
		methods:{
			
			
		},
		mounted(){
			this.share('学院资产','我的个人中心',this.sharePic);
		}
		
	}
	
</script>

<style scoped>
</style>