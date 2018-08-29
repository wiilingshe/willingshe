<template>
	
	<div class="box">
		<div class="orgTutor" v-show="show">
			温馨提示：您还没有导师...
		</div>
	    <div class="main">
	        <div class="main_one" v-for="i in shopOrg">
	            <div class="left">
	            	<img :src="i.face" alt="" onerror="errorImg02"/>
	            </div>
	            <div class="right">
	            	<div>{{i.username}}</div>
	            	<div>
	            		<div class="count"><i class="iconfont icon-zhibo"></i><span>{{i.video_count}}</span></div>
	            		<div class="video"><i class="iconfont icon-scene"></i><span>{{i.series_count}}</span></div>
	            	</div>
	            </div>
	           
	        </div>
	    </div>
	</div>
</template>

<script>
	
	export default {
		
		data(){
			return{
			      errorImg02:'this.src="' + require('../../../../../static/img/logo.png') + '"',
			      shopOrg:'',
			      show:true
			}
		},
		created(){
			this.global.shouquan();
			document.title = '学院导师';
			this.getData('get','/shop-v1-shop_get_org_shopinfo.html').then(res => {
				if(res.status == 200){
					if(res.data.length == 0){
						this.show = true;
					}else{
						this.show = false;
					}
					this.shopOrg = res.data;
				}
				console.log(this.shopOrg);
			});
		},
		methods:{
			
			
		},
		mounted(){
			this.share('学院导师','我的个人中心',this.sharePic);
		}
		
	}
	
</script>

<style scoped>
	
	.box{
		display: flex;
		flex-direction: column;
	}
	
	
	
	.main_one{
		display: flex;
		display: -webkit-flex;
		flex-direction: row;
		-webkit-flex-direction: row;
		justify-content: flex-start;
		-webkit-justify-content: flex-start;
		height: 1.6rem;
		margin-bottom: 0.2rem;
		background-color: #fff;
	}
	
	.left img{
		width: 1.2rem;
		height: 1.2rem;
		border-radius: 50%;
		margin: 0.2rem;
	}
	
	.right{
		margin-top: 0.4rem;
	}
	
	.right>div:nth-child(1){
		font-size: 0.28rem;
	}
	
	.right>div:nth-child(2){
		font-size: 0.26rem;
		color: #CCCCCC;
		display: flex;
		flex-direction: row;
	}
	
	.main_two{
		font-size: 0.3rem;
		margin-left: 0.2rem;
		margin-right: 0.2rem;
		border-bottom: 1px solid #CCCCCC;
	}
	  
	.main_three{
		font-size: 0.24rem;
		color: #CCCCCC;
		display: flex;
		display: -webkit-flex;
		flex-direction: row;
		-webkit-flex-direction: row;
		justify-content: space-around;
		-webkit-justify-content: space-around;
		padding: 0.1rem 0;
	}
	
	.icon-butlerhead{
		color: #00BFFF;
		
	}
	.icon-scene{
		color: orangered;
		
	}
	
	.icon-zhibo{
		color: orange;
	}
	
	.count{
		margin-right: 0.4rem;
		width: 1rem;
		height: 0.6rem;
		line-height: 0.6rem;
	}
	.video{
		width: 1rem;
		height: 0.6rem;
		line-height: 0.6rem;
	}
	
	.orgTutor{
		font-size: 0.28rem;
		padding: 0.2rem;
	}
	
	
</style>