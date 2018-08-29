<template>
	<div class="faceJion">
		<div class="upload">
			<div class="uploadTip" v-show="uploadTip">
				<div class="upload1">
					+
					<input id="file1" type="file" @change="uploadPic1($event)" style="width:1.4rem;">
				</div>
				<div class="tip1">点击上传图片</div>
			</div>
			<img style="width:100%;" :src="pic" v-show="!uploadTip" @click="uploadFile()">
		</div>
		<div class="story">
			<div style="height:0.17rem;"></div>
			<ul class="type">
				<li :class="{select:select==1,noSelect:select==2}" @click="text(1)">ta的故事</li>
				<li :class="{select1:select==2,noSelect:select==1}" @click="text(2)">参考格式</li>
			</ul>
			<div style="height:0.256rem;"></div>
			<div class="title3">
				<span>作品名</span>
				<input type="text" v-model="title">
			</div>
			<div class="text2">
				<textarea id="text1" placeholder="多行输入" v-html="wenzi">
					{{wenzi}}
				</textarea>
			</div>
		</div>
		<ul class="operating">
			<li @click="getTip()">
				<i class="icon iconfont icon-2"></i>
				<span>活动须知</span>
			</li>
			<li @click="submit()">
				提交审核
			</li>
		</ul>
		<div class="bg" v-show="tip || confirm" @click="close()"></div>
		<div class="tip" v-show="tip">
			<div class="tip1">
				<i class="icon iconfont icon-guanbi1" @click="close()"></i>
				<div class="title1">
					活动须知
				</div>
				<div class="desc3" v-html="info.instructions">
					{{info.instructions}}
				</div>
			</div>
		</div>
		<div class="submitTip" v-show="confirm">
			<i class="icon iconfont icon-guanbi1" @click="close()"></i>
			<div class="title2">图片版权许可协议</div>
			<ul class="ul1" v-html="info.pic_protocol">
				{{info.pic_protocol}}
			</ul>
			<div class="studyed">
				<i class="icon iconfont icon-check"></i>
				<span>已阅读并接受</span>
			</div>
			<div class="confirm1" @click="send()">确认提交</div>
		</div>
	</div>
</template>
<script>
	import { Indicator,Toast } from 'mint-ui';
	export default{
		data(){
			return{
				select:1,
				tip:false,
				confirm:false,
				uploadTip:true,
				formData:'',
				pic:'',
				info:[],
				wenzi:'',
				demo:'',
				title:'',
			}
		},
		created(){
			document.title = '立即参加';
			this.global.shouquan();
			this.postData('post','/shop-v1-masks_info.html',{'masks_id':this.$route.query.masks_id}).then(res => {
				if(res.data.length == 0){
					Toast({
					  message: '未获取到数据',
					  iconClass: 'icon iconfont icon-2',
					  duration: 3000
					});
					return false;
				}
				res.data.info = res.data.info.replace(/_@/g, '<br/>').replace(/_#/g, '<br/>');
				this.info = res.data;
			});
			if(this.$route.query.id != undefined){
				this.postData('post','/shop-v1-masks_join_detail.html',{masks_user_id:this.$route.query.id,}).then(res => {
					this.uploadTip = false;
					this.pic = res.data.pic;
					var text = res.data.content = res.data.content.replace(/_@/g, '<br/>').replace(/_#/g, '<br/>');
					text = text.replace(/<br\/>/g, "\n\r\n");
					this.wenzi = text;
					this.title = res.data.pic_name;
				})
			}
		},
		methods:{
			text(type){
				this.select = type;
				if(type == 1){
					$('#text1').val(this.demo);
					$('#text1').attr('placeholder','多行输入');
				}else{
					this.demo = $('#text1').val();
					$('#text1').val('他/她的名字叫陈小成，来自湖南怀化市，在广州工作了五年，从事外贸行业，现在最期盼就是回到家那天，跟家人一起吃个饭。希望2018年能攒个大钱，娶个老婆生个娃。');
					
				}
			},
			getTip(){
				this.tip = true;
			},
			close(){
				this.tip = false;
				this.confirm = false;
			},
			submit(){
				this.confirm = true;
			},
			uploadPic1(e){
				if(e.target.files[0] == undefined){
					return false;
				}
				Indicator.open('上传中，请稍后...');
				var self = this;
				var reader = new FileReader()
				reader.readAsDataURL(e.target.files[0]);
				reader.onload = function(){
					Indicator.close();
					self.pic = reader.result;
					self.uploadTip = false;
				}
			},
			send(){
				if(this.$route.query.id == undefined){
					if(this.uploadTip == false){
						if(this.title == ''){
							Toast({
							  message: '请输入照片名称',
							  iconClass: 'icon iconfont icon-2',
							  duration: 1000
							});
							this.confirm = false;
							return false;
						}else if($('#text1').val() == ''){
							Toast({
							  message: '请输入照片故事',
							  iconClass: 'icon iconfont icon-2',
							  duration: 1000
							});
							this.confirm = false;
							return false;
						}
						this.confirm = false;
						Indicator.open('上传中，请稍后...');
						var text = $('#text1').val();
						text = text.replace(/\n|\r\n/g, "<br/>");
						this.formData = new FormData();
						this.formData.append('pic',$('#file1')[0].files[0]);
						this.formData.append('content',text);
						this.formData.append('pic_name',this.title);
						this.formData.append('masks_id',this.$route.query.masks_id);
						this.uploadPic('post','/shop-v1-masks_join.html',this.formData).then(res => {
							Indicator.close();
							if(res.data.status == 1){
								Toast({
								  message: res.data.msg,
								  iconClass: 'icon iconfont icon-2',
								  duration: 1000
								});
								this.$router.push({path:'/successSubmit',query:{masks_id:this.$route.query.masks_id}})
							}else if(res.data.status == 0){
								Toast({
								  message: res.data.msg,
								  iconClass: 'icon iconfont icon-2',
								  duration: 1000
								});
							}
						},res => {
							Indicator.close();
							Toast({
							  message: '接口报错',
							  iconClass: 'icon iconfont icon-2',
							  duration: 1000
							});
						})
					}else{
						Toast({
						  message: '请先上传图片',
						  iconClass: 'icon iconfont icon-2',
						  duration: 1000
						});
						this.confirm = false;
					}
				}else{
					this.confirm = false;
					Indicator.open('上传中，请稍后...');
					var text = $('#text1').val();
					text = text.replace(/\n/g, '_@').replace(/\r/g, '_#').replace(/\s/g, '&nbsp;');
					this.formData = new FormData();
					if($('#file1')[0].files[0] != undefined){
						this.formData.append('pic',$('#file1')[0].files[0]);
					}
					this.formData.append('content',text);
					this.formData.append('pic_name',this.title);
					this.formData.append('masks_user_id',this.$route.query.id);
					this.uploadPic('post','/shop-v1-masks_join_edit.html',this.formData).then(res => {
						Indicator.close();
						if(res.data.status == 1){
							Toast({
							  message: res.data.msg,
							  iconClass: 'icon iconfont icon-2',
							  duration: 1000
							});
							this.$router.push({path:'/successSubmit',query:{masks_id:this.$route.query.masks_id}});
						}else if(res.data.status == 0){
							Toast({
							  message: res.data.msg,
							  iconClass: 'icon iconfont icon-2',
							  duration: 2000
							});
						}
					},res => {
						Indicator.close();
						Toast({
						  message: '接口报错',
						  iconClass: 'icon iconfont icon-2',
						  duration: 2000
						});
					})
				}
			},
			uploadFile(){
				$('#file1').click()
			}
		},
		watch:{
			title(val,oldval){
				if(val.replace(/[\u0391-\uFFE5]/g,"aa").length>20){
					Toast({
					  message: '中文不能超过10个字，英文不能超过20个字母',
					  iconClass: 'icon iconfont icon-2',
					  duration: 2000
					});
					this.title = oldval;
				}else{
					return val;
				}
			}
		}
	}
</script>
<style lang="less">
	.faceJion{
		font-size: 0.205rem;
		color: #333;
		.upload{
			// height: 4.267rem;
			width: 100%;
			background-color: #f2f2f2;
			.uploadTip{
				padding-top: 1.28rem;
				padding-bottom: 1.28rem;
			}
			.upload1{
				border:1px dashed #ff9d00;
				width: 1.348rem;
				height: 1.348rem;
				text-align: center;
				line-height: 1.348rem;
				font-size: 1rem;
				color: #ff9d00;
				margin:0 auto;
				position: relative;
				input{
					position: absolute;
					top: 0;
					left: 0;
					height: 1.348rem;
					opacity: 0;
				}
			}
			.tip1{
				text-align: center;
				color: #999;
				margin-top: 0.17rem;
			}
		}
		.story{
			height: calc(~"100vh - 4.267rem");
			width: 100%;
			background-color: #fff;
			.title3{
				width: calc(5.376rem - 0.34rem);
				height: 0.734rem;
				background-color: #f2f2f2;
				margin: 0 auto;
				padding: 0 0.17rem;
				margin-bottom: 0.356rem;
				border-radius: 0.128rem;
				span{
					color: #666;
					font-size: 0.2rem;
				}
				input{
					height: 0.734rem;
					width: 4.3rem;
					background-color: #f2f2f2;
					border:none;
					outline-style: none;
					text-align: center;
					color: #666;
				}
			}
			ul{
				width: 2.73rem;
				height: 0.4266rem;
				border: 1px solid #ef4949;
				border-radius: 0.128rem;
				margin: 0 auto;
				li{
					float: left;
					width: 50%;
					text-align: center;
					line-height: 0.4266rem;
				}
				.select{
					background-color: #ef4949;
					color: #fff;
					height: 0.4266rem;
					border-radius: 0.128rem 0 0 0.128rem;
				}
				.select1{
					background-color: #ef4949;
					color: #fff;
					height: 0.4266rem;
					border-radius: 0 0.128rem 0.128rem 0;
				}
				.noSelect{
					color: #ef4949;
					height: 0.4266rem;
					border-radius: 0 0.128rem 0.128rem 0;
				}
			}
			.text2{
				height: 2.987rem;
				width: 5.376rem;
				margin:0 auto;
			}
			#text1{
				height: calc(~"2.987rem - 0.34rem");
				width: calc(~"5.376rem - 0.34rem");
				border-radius: 0.128rem;
				background-color: #f2f2f2;
				border:none;
				resize:none;
				outline-style: none;
				padding: 0.17rem 0.17rem;
				color: #666;
			}
		}
		.operating{
			width: 100%;
			height: 0.768rem;
			overflow:auto;
			position: fixed;
			bottom: 0;
			border-top: 1px solid #eee;
			li{
				float: left;
				height: 0.768rem;
				font-size: 0.239rem;
			}
			li:nth-child(1){
				width: 2.133rem;
				background-color: #fff;
				color: #666;
				text-align: center;
				i{
					line-height: 0.768rem;
					font-size: 0.28rem;
					color: #ff9d00;
				}
			}
			li:nth-child(2){
				width: calc(~"100% - 2.133rem");
				background-color: #ef4949;
				color: #fff;
				line-height: 0.768rem;
				text-align: center;
			}
		}
		.tip{
			width: 4.266rem;
			height: 5.632rem;
			background-color: #ef4949;
			position: fixed;
		    z-index: 15;
		    top: 50%;
		    left: 50%;
			border-radius: 0.128rem;
			margin: -2.816rem 0 0 -2.133rem;
			.tip1{
				width: 4.045rem;
				height: 5.41rem;
				background-color: #ffeed5;
				border-radius: 0.128rem;
				margin-left: 0.1105rem;
				margin-top: 0.1105rem;
				position: relative;
				i{
					position: absolute;
					right: -0.55rem;
					color: #fff;
					top: -0.55rem;
					font-size: 0.45rem;
					color: #999;
				}
			}
			.title1{
				font-size: 0.256rem;
				color: #ef4949;
				text-align: center;
				margin-bottom: 0.17rem;
				padding-top: 0.17rem;
			}
			.desc3{
				width: calc(~"100% - 0.512rem");
				padding: 0 0.256rem;
				height: 4.5rem;
    			overflow: scroll;
				.desc2{
					margin-bottom: 0.13rem;
				}
			}
		}
		.bg{
			width: 100%;
			height: 100%;
			background-color: rgba(0,0,0,0.6);
			position: fixed;
			top: 0;
		}
		.submitTip{
			padding: 0 0.34rem;
			position: fixed;
			background-color: #fff;
			width: 4.693rem;
			height: 7.253rem;
			border-radius: 0.128rem;
			top: 50%;
			left: 50%;
			margin:-3.6265rem 0 0 -2.6865rem;
			.icon-guanbi1{
				position: absolute;
				right: -0.4rem;
				top: -0.4rem;
				color: #999;
			}
			.title2{
				color: #ef4949;
				font-size: 0.256rem;
				text-align: center;
				margin-top: 0.34rem;
				margin-bottom: 0.34rem;
			}
			.ul1{
				width: 100%;
				margin-bottom: 0.17rem;
				display: inline-block;
				max-height: 4.3rem;
    			overflow-y: scroll;
    			overflow-x: hidden;
    			line-height: 0.3rem;
				li{
					float: left;
					line-height: 0.3rem;
					letter-spacing: 0.006rem;
					color: #666;
				}
				li:nth-child(1){
					width: 0.25rem;
				}
				li:nth-child(2){
					width: calc(~"100% - 0.25rem");
				}
			}
			.studyed{
				color: #ef4949;
				i{
					font-size: 0.25rem;
				}
			}
			.confirm1{
				height: 0.682rem;
				width: 4.7rem;
				background-color: #ef4949;
				border-radius: 0.128rem;
				text-align: center;
				line-height: 0.682rem;
				color: #fff;
				font-size: 0.239rem;
				margin:0 auto;
				margin-top: 0.34rem;
			}
		}
	}
</style>