<template>
	<div class="audit">
		<div :class="{top:top,top1:top1,top2:top2}">
			<div class="round" v-show="hasStatus">
			</div>
			<div class="status">{{status}}</div>
			<svg width="2.6rem" height="2.6rem" xmlns="http://www.w3.org/2000/svg" v-show="!hasStatus">
				<circle id="backdrop" r="1.2rem" cy="1.3rem" cx="1.3rem" stroke-width="3" stroke="#5898f7" fill="none"/> 
				<circle id="progress" r="1.2rem" cy="1.3rem" cx="1.3rem" stroke-width="4" stroke="#fff" fill="none"/> 
			</svg>
		</div>
		<div class="content">
			<div>提交成功，请等待管理员审核！</div>
			<div class="tip">预计一个工作日内完成审核！</div>
		</div>
		<div class="liveBtn1" v-if="liveHomePage" @click="toLiveHome()">查看直播间主页</div>
		<div class="liveBtn1" v-if="applyLive" @click="apply()">申请直播间</div>
		<button class="refresh" @click="refresh()">刷新状态</button>
	</div>
</template>
<script>
	import { Indicator } from 'mint-ui';
	export default{
		data(){
			return{
				top:true,
				top1:false,
				top2:false,
				status:'审核中...',
				liveHomePage:false,
				hasStatus:false,
				applyLive:false,
			}
		},
		created(){
			document.title = '审核';
			this.global.shouquan();
		},
		mounted(){
			if(this.$route.query.type == 'live'){
				if(this.$route.query.status == 0){
					this.top = false;
					this.top1 = false;
					this.top2 = true;
					this.hasStatus = true;
					this.status = '审核失败';
					this.applyLive = true;
					this.liveHomePage = false;
				}else if(this.$route.query.status == 1){
					this.top = false;
					this.top1 = true;
					this.top2 = false;
					this.hasStatus = true;
					this.status = '审核成功';
					this.liveHomePage = true;
				}else if(this.$route.query.status == 2){
					this.top = true;
					this.top1 = false;
					this.top2 = false;
					this.hasStatus = false;
					this.status = '审核中...';
					this.liveHomePage = false;
				}else{
					this.top = true;
					this.top1 = false;
					this.top2 = false;
					this.hasStatus = false;
					this.status = '审核中...';
					this.liveHomePage = false;
				}
			}else if(this.$route.query.type == 'group'){
				if(this.$route.query.status == 0){
					this.top = false;
					this.top1 = false;
					this.top2 = true;
					this.hasStatus = true;
					this.status = '审核失败';
					this.applyLive = true;
					this.liveHomePage = false;
				}else if(this.$route.query.status == 1){
					this.top = false;
					this.top1 = true;
					this.top2 = false;
					this.hasStatus = true;
					this.status = '审核成功';
					this.liveHomePage = true;
				}else if(this.$route.query.status == 2){
					this.top = true;
					this.top1 = false;
					this.top2 = false;
					this.hasStatus = false;
					this.status = '审核中...';
					this.liveHomePage = false;
				}else{
					this.top = true;
					this.top1 = false;
					this.top2 = false;
					this.hasStatus = false;
					this.status = '审核中...';
					this.liveHomePage = false;
				}
			}
		},
		methods:{
			refresh(){
				Indicator.open();
				if(this.$route.query.type == 'live'){
					this.postData('post','/shop-v1-voice_apply_status.html').then(res =>{
						Indicator.close();
						if(res.status == 200){
							if(res.data.status == 1){
								this.top = false;
								this.top1 = true;
								this.top2 = false;
								this.hasStatus = true;
								this.status = '审核成功';
								this.liveHomePage = true;
							}else if(res.data.status == 0){
								this.top = false;
								this.top1 = false;
								this.top2 = true;
								this.hasStatus = true;
								this.status = '审核失败';
								this.applyLive = true;
								this.liveHomePage = false;
							}else if(res.data.status == 2){
								this.top = true;
								this.top1 = false;
								this.top2 = false;
								this.hasStatus = false;
								this.status = '审核中...';
								this.liveHomePage = false;
							}else{
								this.top = true;
								this.top1 = false;
								this.top2 = false;
								this.hasStatus = false;
								this.status = '审核中...';
								this.liveHomePage = false;
							}
						}
					})
				}else if(this.$route.query.type == 'group'){
					this.postData('post','/shop-v1-voice_topic_status.html').then(res =>{
						Indicator.close();
						if(res.status == 200){
							if(res.data.status == 1){
								this.top = false;
								this.top1 = true;
								this.top2 = false;
								this.hasStatus = true;
								this.status = '审核成功';
								this.liveHomePage = true;
							}else if(res.data.status == 0){
								this.top = false;
								this.top1 = false;
								this.top2 = true;
								this.hasStatus = true;
								this.status = '审核失败';
								this.liveHomePage = false;
								this.applyLive = true;
							}else if(res.data.status == 2){
								this.top = true;
								this.top1 = false;
								this.top2 = false;
								this.hasStatus = false;
								this.status = '审核中...';
								this.liveHomePage = false;
							}else{
								this.top = true;
								this.top1 = false;
								this.top2 = false;
								this.hasStatus = false;
								this.status = '审核中...';
								this.liveHomePage = false;
							}
						}
					})
				}
			},
			toLiveHome(){
				this.$router.push({path:'/liveHomePage'})
			},
			apply(){
				this.$router.push({path:'/applyLive'})
			}
		}
	}
</script>
<style>
	.audit{
		height: 100%;
		background: #fff;
		width: 100%;
	}
	.audit .top{
		height: 3.5rem;
	    width: 100%;
	    background: -webkit-linear-gradient(left top, #6ac9f6 , #3385ff);
	    background: -o-linear-gradient(bottom right, #6ac9f6, #3385ff); 
	    background: -moz-linear-gradient(bottom right, #6ac9f6, #3385ff);
	    background: linear-gradient(to bottom right, #6ac9f6 , #3385ff);
	}
	.audit .top1{
		height: 3.5rem;
	    width: 100%;
	    background: -webkit-linear-gradient(left top, #a5e571 , #58af47);
	    background: -o-linear-gradient(bottom right, #a5e571, #58af47);
	    background: -moz-linear-gradient(bottom right, #a5e571, #58af47);
	    background: linear-gradient(to bottom right, #a5e571 , #58af47);
	}
	.audit .top2{
		height: 3.5rem;
	    width: 100%;
	    background: -webkit-linear-gradient(left top, #ff8357 , #ff3639);
	    background: -o-linear-gradient(bottom right, #ff8357, #ff3639);
	    background: -moz-linear-gradient(bottom right, #ff8357, #ff3639);
	    background: linear-gradient(to bottom right, #ff8357 , #ff3639);
	}
	.audit .round{
		width: 2.4rem;
	    height: 2.4rem;
	    border: 0.1rem solid #fff;
	    border-radius: 2.4rem;
	    margin-left: calc(50% - 1.3rem);
    	top: 0.5rem;
	    position: absolute;
	}
	.audit #progress{ 
		stroke-dasharray: 110px;
		stroke-dashoffset: 100px;
		animation: progressAnimation 350ms linear infinite;
	}
	.audit svg{
		margin-left: calc(50% - 1.3rem);
		margin-top: 0.5rem;
	}
	@keyframes progressAnimation{ 
		from { stroke-dashoffset: 100px; } 
		to { stroke-dashoffset: 300px; } 
	}
	.audit .status{
		position: absolute;
		font-size: 0.5rem;
    	color: #fff;
    	top: 1.5rem;
    	left: calc(50% - 0.99rem);
	}
	.audit .content{
		font-size: 0.3rem;
		text-align: center;
		margin-top: 1rem;
	}
	.audit .tip{
		color: #999;
		text-align: center;
		margin-top: 0.2rem;
		font-size: 0.28rem;
	}
	.audit .refresh{
		background: #3385ff;
		color: #fff;
		border:0;
		width: 3rem;
		height: 0.8rem;
		border-radius: 0.8rem;
		font-size: 0.26rem;
		margin-left: calc(50% - 1.5rem);
		position: absolute;
		bottom: 0.5rem;
		outline-style: none;
	}
	.audit .liveBtn1{
		width: 3rem;
		height: 0.7rem;
		font-size: 0.27rem;
		background: #fff;
		text-align: center;
		border:1px solid #999;
		line-height: 0.7rem;
		color: #999;
		margin-left: calc(50% - 1.5rem);
		margin-top: 0.5rem;
	}
</style>