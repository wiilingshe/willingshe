<!--学院页面-->
<template>
	<div class="box">
		<div class="main">
			<div class="main-box" @click="login()">
				<div>绑定学院账号</div>
				<div>></div>
			</div>
			<div class="main-box" @click="apply(url)">
				<div>申请学院<span v-if="show" style="color:#666">（{{status}}）</span></div>
				<div>></div>
			</div>
		</div>
		<div style="color:#999;font-size:0.26rem;text-align: center;position: absolute;width: 100%;bottom: 0.2rem;">
			<div>小象SaaS提供技术支持</div>
			<div>www.saasxx.vip</div>
		</div>
	</div>
</template>

<script>
	import Navigator from '../../common/Navigator'
	export default {
		data(){
			return {
				show:true,
				status:'--',
				url:'',
			}
		},
		created(){
			document.title = '绑定机构';
			this.global.shouquan();
			this.getData('get','/shop-v1-shop_get_shop_status.html',{shop_type:'2'}).then(res => {
				if(res.data.status == null){
					this.status = '未申请'
					this.url = '/mine-college-apply';
				}else if(res.data.status == '1'){
					this.status = '审核通过'
					this.url = '/mine-org';
				}else if(res.data.status == '2'){
					this.status = '审核失败'
					this.url = '/mine-college-apply';
				}else if(res.data.status == '3'){
					this.status = '审核中'
					this.url = '';
				}else if(res.data.status == '4'){
					this.status = '账号冻结'
					this.url = '';
				}
			})
		},
		methods:{
			login:function(){
				this.$router.push('/mine-college-login');
			},
			apply:function(url){
				this.$router.push(url);
			}
		},
		mounted(){
			this.share('账号绑定','我的个人中心',this.sharePic);
		}
	}
	
</script>

<style scoped>
	.main-box{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		font-size: 0.26rem;
		line-height: 0.8rem;
		border-bottom: 0.02rem solid #eee;
		margin: 0 0.2rem;
	}
	.main-box div:nth-child(2){
		color: #eaeaea;
	}
	.main{
		background: #fff;
	}
</style>