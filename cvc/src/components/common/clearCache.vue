<template>
	<div class="clearCache">
		<button @click="clear()">clear</button>
	</div>
</template>
<script>
	export default{
		data(){
			return{

			}
		},
		methods:{
			clear(){
				this.getData('get','/shop-v1-index_clear_member').then(res => {
					if(res.data.status == 1){
						this.$router.push({path:'/'})
					}
				})
			}
		}
	}
</script>
<style lang="less">
	.clearCache{
		button{
			width: 3rem;
    		height: 1rem;
    		margin-left: calc(~"50% - 1.5rem");
    		margin-top: 2rem;
		}
	}
</style>