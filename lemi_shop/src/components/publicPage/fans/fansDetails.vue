<template>
	<div class="box fans">
		<div class="header">
			<div class="header_left">
				<img :src="arr.face" alt="" />
			</div>
			<div class="header_right">	
				<div>昵称：{{arr.nickname?arr.nickname:'加载中...'}}</div>
			</div>
		</div>
		<div class="main">
			<div>
				<span>他的花费</span>
				<span>￥{{arr.total_spend}}</span>
			</div>
			<div>
				<span>邀请人</span>
				<span>{{arr.invite_name}}</span>
			</div>
			<div @click="fansfans(arr.member_id)">
			    <span>他的粉丝</span>
			    <span>
			    	<span style="position: relative;top: -0.05rem;">{{arr.fan_num}}</span>
			    	<i class="iconfont icon-dayuhao1" style="color:#f1f2f6"></i>
			    </span>
			</div>
			<div>
				<span>地址</span>
				<span>{{arr.location}}</span>
			</div>
			<div>
		        <span>性别</span>
				<span>{{arr.sex==1?'男':arr.sex==2?'女':'其他'}}</span>
			</div>
			<div>
				<span>出生日期</span>
				<span>{{arr.birthday}}</span>
			</div>
		</div>
		<div style="color:#999;font-size:0.26rem;text-align: center;position: absolute;width: 100%;bottom: 0.2rem;">
			<footer1></footer1>
		</div>
	</div>
</template>

<script>
	import footer1 from '@/components/publicPage/footer1'
	export default {
		
		data(){
			return{
				selected:'1',
				arr:[],
			}
		},
		created(){
			var self = this;
			this.global.shouquan();
			this.noShare();
			// document.title = '粉丝详情页';
			var url ='shop-v1-user_get_my_fans_detail.html?member_id='+ this.$route.query.member_id
			this.getData('get',url).then(res => {
				if(res.status == 200){
					if(res.data.status == 1){
						document.title =  res.data.data.nickname;
						this.arr = res.data.data
					}
				}
			})
		},
		components:{footer1},
		methods:{
			fansfans(id){
				this.postData('post','shop-v1-user_get_my_fans_list.html',{member_id:id}).then(res => {
					this.$router.push({path:'mine-fans',query:{'member_id':id}})
				})
			}
		}
	}
		
</script>

<style>
	.fans .box{
		display: flex;
		flex-direction: column;
	}
	
	.fans .header{
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		height: 1.4rem;
		background: #3385FF;
	}
	
	.fans .header_left img{
		margin-left: 0.2rem;
		width: 1rem;
		height: 1rem;
		border-radius: 50%;
		margin-top: 0.2rem;
		background: #fff;
	}
	.fans .header_right{
		font-size: 0.26rem;
		margin-left: 0.2rem;
		margin-top: 0.5rem;
		color: white;
	}
	.fans .main{
		background: #fff;
	}
	.fans .main div{
		font-size: 0.26rem;
		height: 1rem;
		line-height: 1rem;
		margin: 0 0.2rem;
		border-bottom: 1px solid #f1f2f6;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	.fans .main div:last-child{
		border-bottom: 0
	}
	.fans .main div span:nth-child(2){
		color: #666;
	}
</style>