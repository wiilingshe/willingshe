<template>
	<div class="footer">
		<span @click="guanwang()">{{info.provision}}</span><br/>
		<span @click="guanwang()">{{info.domain}}</span>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				info:[],
				url:'',
			}
		},
		created(){
			if(sessionStorage.getItem('info') == null){
				this.getData('get','/index-index-config.html').then(res => {
					this.info = res.data;
					sessionStorage.setItem('info', JSON.stringify(res.data));
					this.url = res.data.domain;
				})
			}else{
				this.info = JSON.parse(sessionStorage.getItem('info'))
				this.url = JSON.parse(sessionStorage.getItem('info')).domain;
			}
		},
		methods:{
			guanwang(){
				window.location.href = this.url;
			}
		}
	}
</script>
<style lang="less">
	.footer{
		color:#999;
		font-size:0.221rem;
		text-align: center;
		padding-bottom: 0.2rem;
		padding-top: 0.2rem;
	}
</style>
