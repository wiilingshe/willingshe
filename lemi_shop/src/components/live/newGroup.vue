<template>
	<div class="newGroup">
		<div class="row" @click="newName()">
			<ul>
				<li>话题名称</li>
				<li>
					<input type="text" disabled="disabled" v-model="name">
					<i class="iconfont icon-dayuhao1"></i>
				</li>
			</ul>
		</div>
		<div class="row" @click="newDesc()">
			<ul>
				<li>话题简介</li>
				<li>
					<input type="text" disabled="disabled" v-model="desc">
					<i class="iconfont icon-dayuhao1"></i>
				</li>
			</ul>
		</div>
		<div class="row" @click="newGai()">
			<ul>
				<li>话题概要</li>
				<li>
					<input type="text" disabled="disabled" v-model="gai">
					<i class="iconfont icon-dayuhao1"></i>
				</li>
			</ul>
		</div>
		<!-- <div class="row" @click="newClass()">
			<ul>
				<li>话题分类</li>
				<li>
					<input type="text" disabled="disabled" v-model="classification">
					<i class="iconfont icon-dayuhao1"></i>
				</li>
			</ul>
		</div> -->
		<button class="define" @click="define()">确定</button>
	</div>
</template>
<script>
	import { MessageBox,Toast,Indicator } from 'mint-ui';
	export default{
		data(){
			return{
				name:'asda1sd',
				desc:'asdasdsasdasdasdasd',
				gai:'asdasdasdasdasdasdasdasdasasd',
				classification:'',
			}
		},
		created(){
			document.title = '创建话题';
			this.global.shouquan();
		},
		mounted(){

		},
		methods:{
			newName(){
				MessageBox.prompt(' ', '话题名称').then(({ value, action }) => {
				  this.name = value;
				})
			},
			newDesc(){
				MessageBox.prompt(' ', '话题简介').then(({ value, action }) => {
				  this.desc = value;
				})
			},
			newGai(){
				MessageBox.prompt(' ', '话题概要').then(({ value, action }) => {
				  this.gai = value;
				})
			},
			newClass(){
				MessageBox.prompt(' ', '话题分类').then(({ value, action }) => {
				  this.classification = value;
				})
			},
			define(){
				Indicator.open('请稍后...');
				var data = {
					topic_name:this.name,
					topic_intro:this.desc,
					topic_outline:this.gai
				}
				this.postData('post','/shop-v1-voice_voice_topic.html',data).then(res => {
					if(res.status == 200){
						if(res.data.status == 1){
							this.$router.push({path:'/liveHomePage'});
							Indicator.close();
							Toast({
								message:'已提交申请',
								duraction:'500'
							});
						}else if(res.data.status == 0){
							Indicator.close();
							Toast({
								message:res.data.msg,
								deraction:500
							})
						}else{
							this.$router.push({path:'/liveHomePage'});
							Indicator.close();
							Toast({
								message:'已提交申请',
								duraction:'500'
							})
						}
					}
				})
			}
		}
	}
</script>
<style>
	.newGroup{
		font-size: 0.26rem;
	}
	.newGroup .row{
		height: 1rem;
		width: 100%;
		background-color: #fff;
		border-top: 1px solid #f1f2f6;
	}
	.newGroup .row:nth-child(1){
		border-top: 0;
	}
	.newGroup .row ul li{
		float: left;
	}
	.newGroup .row ul li:nth-child(1){
		line-height: 1rem;
		margin-left: 0.2rem;
	}
	.newGroup .row ul li:nth-child(2){
		float: right;
		line-height: 1rem;
	}
	.newGroup .row ul li:nth-child(2) input{
		background:#fff;
		border:0;
		text-align: right;
		position: relative;
		top: -0.06rem;
	}
	.newGroup .define{
		background: #3385ff;
		color: #fff;
		border: 0;
	    width: 3rem;
	    height: 0.8rem;
	    border-radius: 1rem;
	    margin-left: calc(50% - 1.5rem);
	    margin-top: 0.5rem;
	    outline-style: none;
	}
	.newGroup i{
		color: #e0e0e0;
		margin-right: 0.1rem;
	}
</style>