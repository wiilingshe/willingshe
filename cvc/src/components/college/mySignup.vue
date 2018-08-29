<template>
	<div class="mySignup" :class="returnData?'':'mySignup-no'">
		<p class="mySignup-tips" v-if="!nodata">为保证现场听课的学习效果，希望同学们按时出席。</p>
		<div class="mySignup-content">
			<nodata v-if="nodata"></nodata>
			<div v-for="res in signArr">
				<div class="mySignup-content-lists" v-if="res.type==0 || res.type==1" @click="goInvite(res.active_id)">
					<div class="mySignup-content-lists-detail">
						<span class="mySignup-activiesTitle">{{res.active_title}}</span>
						<span class="mySignup-startTime">{{res.start_time}}</span>
						<span class="mySignup-address">{{res.address}}</span>
					</div>
					<div class="mySignup-content-lists-isSignup">
						<span class="mySignup-btn">{{res.status}}</span>
					</div>
				</div>
				<div class="mySignup-content-lists" v-if="res.type==2" @click="goInvite(res.active_id)">
					<div class="mySignup-content-lists-detail">
						<span class="mySignup-activiesTitle grey-font">{{res.active_title}}</span>
						<span class="mySignup-startTime grey-font">{{res.start_time}}</span>
						<span class="mySignup-address grey-font">{{res.address}}</span>
					</div>
					<div class="mySignup-content-lists-isSignup">
						<span class="mySignup-btn grey-bg">{{res.status}}</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import { Indicator } from 'mint-ui'
	import nodata from '@/components/common/nodata'
	export default{
		data(){
			return{
				signArr:[],
				page1:1,
				nodata:false,
				returnData:false,
				member_id:'',
			}
		},
		created(){
			this.global.shouquan();
			document.title='我的报名';
			Indicator.open({
			  spinnerType: 'snake'
			});
			this.getData('post','/shop-v1-pay_jssign.html',{url:window.location.href}).then(res => {
				console.log(res.data.sign.member_id)
				this.member_id = res.data.sign.member_id
			})
		},
		mounted(){
			this.getData('post','/shop-v2-college-line_active_my_sign_list.html',{page_id:1}).then(res=> {
				if(res.data.status==1){
					this.signArr = res.data.list;
					this.returnData=true;
					Indicator.close();
				}
				else{
					this.nodata=true;
					this.returnData=true;
					Indicator.close();
				}
			});
		},
		methods:{
			goInvite(id){
				this.$router.push({path:'/signSuccess',
					query:{
						car_id:id,
						member_id:this.member_id
					}
				});
			}
		},
		components:{nodata}
	}
</script>
<style lang="less">
@light-grey:#999;
	.mySignup{
		padding: 0 0.3rem;
		font-size: 0.28rem;
		overflow-y: auto;
		overflow-x: hidden;
		-webkit-overflow-scrolling:touch;
		&-no{
			opacity: 0;
		}
		&-tips{
			width:100%;
			font-size: 0.26rem;
			color:#999999;
			padding:0.3rem 0;
		}
		&-content{
			min-height: 100vh;
			&-lists{
				height:1.92rem;
				padding: 0.3rem 0.3rem 0 0.3rem;
				background: #fff;
				border-radius: 0.06rem;
				margin-bottom: 0.2rem;
				&-detail{
					float: left;
					width:5.1rem;
					height:100%;
				}
				&-isSignup{
					float: left;
					display: inline-block;
					width:calc(~"100% - 5.1rem");
					height:calc(~"100% - 0.7rem");
					padding-top: 0.7rem;
				}
			}
		}
		&-activiesTitle{
			display: block;
			font-size: 0.32rem;
			color:#333333;
			margin-bottom: 0.32rem;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			width: 98%;
		}
		&-startTime{
			display: block;
			font-size: 0.28rem;
			background: url('../../../static/img/college/mysignup/time_start.png') no-repeat left center;
			background-size: 0.24rem 0.25rem;
			text-indent: 0.38rem;
			margin-bottom: 0.22rem;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			width: 98%;
		}
		&-address{
			display: block;
			font-size: 0.28rem;
			background: url('../../../static/img/college/mysignup/address_start.png') no-repeat left center;
			background-size: 0.22rem 0.27rem;
			text-indent: 0.38rem;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			width: 98%;
		}
		&-btn{
			display: block;
			height:0.42rem;
			line-height: 0.42rem;
			font-size: 0.26rem;
			text-align: center;
			background-color: #222222;
			color:#fff;
			border-radius: 0.06rem;
		}
		.grey-font{
			color:@light-grey;
		}
		.grey-bg{
			background: @light-grey;
		}
	}
</style>