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
		components:{
			classifyPage
		},
		created(){
			document.title="课程分类"
		},
	}
</script>

<style>
</style>