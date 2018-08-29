<template>
	<div class="liveHomePage">
		<div :style="{background:bg}" class="bgg"></div>
		<div class="title">
			<ul>
				<li>
					<img :src="tou" class="headPic">
				</li>
				<li style="height:1.2rem;display:table">
					<div style="display: table-cell;vertical-align: middle;">
						<div class="liveName">直播间名称</div>
						<div style="font-size:0.25rem;">100人</div>
					</div>
				</li>
			</ul>
		</div>
		<!-- <div class="newgroup" @click="buildGroup()">
			新建话题
		</div> -->
		<mt-navbar v-model="selected">
		  <mt-tab-item id="1">话题</mt-tab-item>
		  <mt-tab-item id="2">简介</mt-tab-item>
		</mt-navbar>
		<mt-tab-container v-model="selected">
		  <mt-tab-container-item id="1">
		  	<div class="load" v-show="load">加载中...</div>
		  	<!-- <router-link :to="{path:'/liveHome'}" v-for="(item,index) in lists"> -->
			  	<!-- <div class="rowGroup">
			  		<ul>
			  			<li>
			  				<img src="../../../static/img/1111.png">
			  			</li>
			  			<li>
			  				<span class="name">{{item.topic_id}}</span>
			  				<span class="status">{{item.status==1?'审核成功':item.status==2?'审核中':'审核失败'}}</span>
			  			</li>
			  		</ul>
			  	</div> -->
			  	<div v-for="(item,index) in lists">
			  	<mt-cell-swipe title="" :right="[{content: '删除',style: { background: 'red', color: '#fff' },handler: () => deleteNum(item.topic_id)}]">
			  		<router-link :to="{path:'/liveHome',query:{id:item.topic_id}}" style="width:100%;color:#333">
				  		<div style="width:100%;">
					  		<span>{{item.topic_id}}</span>
					  		<span style="font-size:0.27rem;float:right;color:#999">{{item.status==1?'审核成功':item.status==2?'审核中':'审核失败'}}</span>
				  		</div>
			  		</router-link>
			  	</mt-cell-swipe>
			  	</div>
			</router-link>
		  </mt-tab-container-item>
		  <mt-tab-container-item id="2">
		  </mt-tab-container-item>
		</mt-tab-container>
		<div class="edit" @click="buildGroup()">新建话题</div>
	</div>
</template>
<script>
	import { Navbar,TabItem,CellSwipe,Toast,MessageBox } from 'mint-ui';
	export default{
		data(){
			return{
				selected:'1',
				bg:'url(../../../static/img/1.jpg)',
				tou:'../../../static/img/1111.png',
				lists:[],
				load:true,
			}
		},
		created(){
			document.title = '直播间主页';
			this.global.shouquan();
		},
		mounted(){
			this.postData('post','/shop-v1-voice_topic_lst.html').then(res => {
				this.load = false;
				this.lists = res.data;
			})
		},
		methods:{
			buildGroup(){
				this.$router.push({path:'/newGroup'})
			},
			deleteNum(index){
				var self = this;
				MessageBox.confirm('话题删除后不能恢复').then(action => {
					self.postData('post','/shop-v1-voice_topic_del.html',{topic_id:index}).then(res => {
						if(res.data.status == 1){
							self.postData('post','/shop-v1-voice_topic_lst.html').then(res => {
								self.lists = res.data;
							})
							Toast({
								message:'删除成功',
								duraction:500
							})
						}else{
							Toast({
								message:'网络出现问题,请刷新页面重试',
								duraction:1000
							})
						}
					})
				},() => {
					return;
				});
			}
		}
	}
</script>
<style>
	.liveHomePage{
		font-size: 0.26rem;
	}
	.liveHomePage .bgg{
		height: 2.8rem;
	}
	.liveHomePage .title{
		height: 1.2rem;
		width: 100%;
		background-color: #fff;
		border-bottom: 1px solid #e1e2e6;
	}
	.liveHomePage .title ul li{
		float: left;
	}
	.liveHomePage .title ul li img{
		position: relative;
		top: 0.2rem;
		margin-left: 0.2rem;
		margin-right: 0.2rem;
	}
	.liveHomePage .headPic{
		width: 0.8rem;
		height: 0.8rem;
		border-radius: 0.4rem;
	}
	.liveHomePage .liveName{
		font-size: 500;
		margin-bottom: 0.05rem;
	}
	.liveHomePage .newgroup{
		display: inline-block;
	    height: 0.9rem;
	    width: 3rem;
	    background: #3385ff;
	    line-height: 0.9rem;
	    text-align: center;
	    color: #fff;
	    border-radius: 0.6rem;
	    margin-left: calc(50% - 1.5rem);
	    margin-top: 0.2rem;
	    margin-bottom: 0.2rem;
	}
	.liveHomePage .edit{
		position: fixed;
		bottom: 0;
		height: 0.8rem;
	    width: 100%;
	    background: #3385ff;
	    line-height: 0.8rem;
	    text-align: center;
	    color: #fff;
	    font-size: 0.3rem;
	}
	.liveHomePage .mint-tab-item-label{
		font-size: 0.26rem;
	}
	/*.liveHomePage .rowGroup{
		height: 1rem;
		width: 100%;
		background: #fff;
		border-top: 1px solid #f1f2f6;
	}*/
	/*.liveHomePage .rowGroup img{
		width: 0.7rem;
		height: 0.7rem;
		border-radius: 0.7rem;
		margin-top: 0.15rem;
		margin-left: 0.2rem;
	}*/
	/*.liveHomePage .rowGroup ul li{
		float: left;
	}
	.liveHomePage .rowGroup ul li:nth-child(2){
		width: 5.3rem;
	}
	.liveHomePage .rowGroup ul li .name{
		line-height: 1rem;
		margin-left: 0.1rem;
		color: #333;
	}
	.liveHomePage .rowGroup ul li .status{
		float: right;
		line-height: 1rem;
		color: #999;
	}*/
	.liveHomePage .mint-tab-container-item{
		padding-bottom: 0.8rem;
	}
	.liveHomePage .mint-navbar{
		margin-bottom: 3px;
	}
	.liveHomePage .mint-cell:last-child{
		background-image:none;
	}
	.liveHomePage .mint-cell-text{
		color: #333;
	}
	.liveHomePage .mint-cell-title{
		display: none
	}
	.liveHomePage .mint-cell-value{
		width: 100%;
	}
	.liveHomePage .load{
		text-align: center;
		margin: 0.05rem 0;
	}
</style>