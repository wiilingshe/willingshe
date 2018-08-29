<template>
	<div class="applyLive">
		<div v-show="list">
			<div class="row" @click="selectTou()" style="position:relative">
				<ul>
					<li>直播间头像</li>
					<li>
						<img :src="touxiang1">
						<input type="file" id="file" @change="handle($event)" style="position: absolute;left: 3rem;top: 0.3rem;opacity: 0;">
						<i class="iconfont icon-dayuhao1"></i>
					</li>
				</ul>
			</div>
			<div class="row liveName" @click="editName()">
				<ul>
					<li>直播间名称</li>
					<li>
						<input type="text" v-model="liveName" disabled="disabled">
						<i class="iconfont icon-dayuhao1"></i>
					</li>
				</ul>
			</div>
			<div class="row liveDesc" @click="editDesc()">
				<ul>
					<li>直播间简介</li>
					<li>
						<input type="text" v-model="liveDesc" disabled="disabled">
						<i class="iconfont icon-dayuhao1"></i>
					</li>
				</ul>
			</div>
			<div class="liveBg" @click="selectBg()" style="position:relative">
				<ul>
					<li style="display:table;height:1.4rem;">
						<div style="display:table-cell;vertical-align:middle;">
							<div>直播间背景</div>
							<div>建议尺寸320*230</div>
						</div>
					<li>
						<img :src="bg1" style="position: relative;top: 0.3rem;">
						<input type="file" id="file1" @change="handle1($event)" style="position:absolute;left: 3rem;top: 0.4rem;opacity: 0;">
						<i class="iconfont icon-dayuhao1"></i>
					</li>
				</ul>
			</div>
			<div class="next" @click="next()">下一步</div>
		</div>
	</div>
</template>
<script>
	import { MessageBox,Toast } from 'mint-ui';
	export default{
		data(){
			return{
				liveName:'',
				liveDesc:'',
				touxiang:'../../../static/img/1111.png',
				touxiang1:'../../../static/img/1111.png',
				bg:'../../../static/img/1111.png',
				bg1:'../../../static/img/1111.png',
				appId:'',
				nonceStr:'',
				timestamp:'',
				signature:'',
				list:true,
			}
		},
		created(){
			// this.list = false;
			document.title = '申请直播间';
			this.global.shouquan();
			this.postData('post','/shop-v1-voice_apply_status.html').then(res => {
				if(res.status == 200){
					if(res.data.status == 1){
						// 直播间申请成功
						this.$router.push({path:'/audit',query:{status:'1',type:'live'}})
					}else if(res.data.status == 2){
						// 直播间审核中
						this.$router.push({path:'/audit',query:{status:'2',type:'live'}})
					}else if(res.data.status == 0){
						// 直播间审核失败
						this.$router.push({path:'/audit',query:{status:'0',type:'live'}})
					}else{
						// 未申请直播间
						return;
					}
				}
			})
		},
		mounted(){
			this.share('申请直播间','',this.sharePic);
		},
		methods:{
			selectTou(){
				console.log(1)
				var self = this;
			},
			selectBg(){
				console.log(2)
				var self = this;
			},
			handle($event){
				var self = this;
				this.touxiang = $event.target.files[0];
				var reader = new FileReader();
				reader.readAsDataURL(this.touxiang);
				reader.onload = function(){
					self.touxiang1 = reader.result;
				}
			},
			handle1($event){
				var self = this;
				this.bg = $event.target.files[0];
				var reader = new FileReader();
				reader.readAsDataURL(this.bg);
				reader.onload = function(){
					self.bg1 = reader.result;
				}
			},
			editName(){
				MessageBox.prompt(' ', '直播间名称', {inputPlaceholder: '请输入名称'}).then(({ value, action }) => {
				  this.liveName = value;
				})
			},
			editDesc(){
				MessageBox.prompt(' ', '直播间简介', {inputPlaceholder: '请输入简介'}).then(({ value, action }) => {
				  this.liveDesc = value;
				})
			},
			next(){
				var formData = new FormData();
				formData.append('room_head',this.touxiang);
				formData.append('room_intro',this.liveDesc);
				formData.append('room_name',this.liveName);
				formData.append('room_background',this.bg);
				this.uploadPic('post','/shop-v1-voice_voice_apply.html',formData).then(res => {
					if(res.status == 200){
						if(res.data.status == 1){
							this.$router.push({path:'/audit',query:{'type':'live'}})
						}else{
							Toast({
								message:res.data.msg,
								duraction:500
							})
						}
					}
				})
			}
		}
	}
</script>
<style>
	.applyLive{
		font-size: 0.26rem;
		color: #333;
	}
	.applyLive .row{
		height: 1rem;
		width: calc(100% - 0.4rem);
		background: #fff;
		line-height: 1rem;
		padding: 0 0.2rem;
		border-top: 1px solid #f1f2f6;
	}
	.applyLive .row:nth-child(1){
		border-top: 0
	}
	.applyLive .row img{
		width: 0.6rem;
		height: 0.6rem;
		border-radius: 0.3rem;
		position: relative;
		top: 0.1rem;
	}
	.applyLive .row ul li{
		float: left;
	}
	.applyLive .row ul li:nth-child(2){
		float: right;
		height: 1rem;
		/*margin-top: 0.1rem;*/
	}
	.row i{
		color: #eaeaea;
	}
	.liveDesc input,
	.liveName input{
		background: #fff;
		border:0;
		text-align: right;
		font-size: 0.26rem;
		position: relative;
		top: -0.08rem;
	}
	.applyLive .liveBg{
		background: #fff;
		height: 1.4rem;
		border-top: 1px solid #f1f2f6;
		width: calc(100% - 0.4rem);
		padding: 0 0.2rem;
	}
	.applyLive .liveBg ul li{
		float: left;
	}
	.applyLive .liveBg ul li:nth-child(2){
		float: right;
		height: 1.4rem;
	}
	.applyLive .liveBg ul li:nth-child(2) input{
		background: #fff;
		border:0;
	}
	.applyLive .liveBg ul li:nth-child(2) i{
		color: #e1e2e6;
	}
	.liveBg img{
		width: 0.8rem;
		height: 0.8rem;
	}
	.applyLive .next{
		background: #3385ff;
		width: 2.4rem;
		height: 0.6rem;
		text-align: center;
		line-height: 0.6rem;
		color: #fff;
		border-radius: 0.3rem;
		margin-left: calc(50% - 1.2rem);
		margin-top: 3rem;
	}
	.mint-msgbox-title{
		font-size: 0.3rem;
		color: #333;
	}
	.mint-msgbox-confirm,
	.mint-msgbox-cancel{
		font-size: 0.26rem;
	}
	.mint-msgbox-input input{
		height: 0.4rem;
		font-size: 0.26rem;
		color: #666;
		position: relative;
		left: -0.1rem;
		text-align: center;
	}
</style>