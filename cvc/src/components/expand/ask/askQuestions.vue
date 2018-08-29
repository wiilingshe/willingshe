<template>
	<div class="askQuestions">
  		<textarea class="askText" placeholder="字数限制在5-50字之间" v-model="textBox"></textarea>
  		<div class="uploadPic">
  			<i class="iconfont icon-shangchuantupian" v-show="uploadicon" @click="ifall()"></i>
  			<img :src="uploadPic0">
  			<img :src="uploadPic1">
  			<input type="file" accept="image/*" name="upload" id="file" @change="uploadPicto()">
  			<input type="file" accept="image/*" name="upload" id="file2" @change="uploadPicto2()">
  		</div>
  		<ul class="tiwen">
  			<!-- <li>
  				<span style="background-color: #5e96d0;">+关注</span>
  			</li> -->
  			<li>
	  			<span style="background-color: #fe5875;" @click="payAsk()">&yen;{{tiwenqian | zhengshu}}提问</span>
	  		</li>
  		</ul>
  		<div class="questatus">
  			<span>{{questatus}}</span>
  			<input type="checkbox" name="public" v-model="picked">
  			<span class="gou">
  				<span class="xuan" v-show="ifxuan"><i class="iconfont icon-gou"></i></span>
  			</span>
  		</div>
  		<div class="questatus" style="border-bottom:0" @click="shouluo()">
  			<span>提问须知</span>
  			<i class="iconfont icon-shangla"></i>
  		</div>
  		<div class="queTip" id="queTip">
  			<div>1、提问后导师超过48小时未回答，将按支付路径全额退款。</div>
			<div>2、所有免费听的问答都不产生偷偷听收入。</div>
			<div>3、所有收入扣除10%为收益，自动进入账号钱包。</div>
			<div>4、提问成功后在个人中心-我的提问可查看提问问题。</div>
  		</div>
	</div>
</template>
<script>
	import {Tabbar,TabItem,Toast,Navbar,InfiniteScroll,Popup,Indicator,MessageBox } from 'mint-ui';
	export default{
		data(){
			return{
				questatus:'公开提问',
				ifxuan:true,
				picked:true,
				tiwenqian:'',
				textBox:'',
				uploadPic0:'',
				uploadPic1:'',
				uploadicon:true,
				gongkaiqian:'',
				tiwenqian:'',
				yinsiqian:'',
			}
		},
		created(){
			this.global.shouquan();
			this.postData('post','/shop-v2-ask_get_fee.html',{fee_type:1,is_public:1}).then(res => {
				this.gongkaiqian = res.data.total_fee;
				this.tiwenqian = res.data.total_fee;
			})
		},
		methods:{
			ifall(){
				if(this.uploadPic0 != '' && this.uploadPic1 != ''){
					Toast({
						message:'最多只能上传两张图片',
						duraction:500
					})
					return false;
				}else{
					if(this.uploadPic0 == ''){
						return $('#file').click();
					}else{
						return $('#file2').click();
					}
				}
			},
			uploadPicto(){
				var self = this;
				var reader = new FileReader();
				reader.readAsDataURL($('#file')[0].files[0]);
				reader.onload = function(){
					self.uploadPic0 = reader.result;
				}
			},
			uploadPicto2(){
				var self = this;
				var reader = new FileReader();
				reader.readAsDataURL($('#file2')[0].files[0]);
				reader.onload = function(){
					self.uploadPic1 = reader.result;
				}
			},
			shouluo(){
				if($('#queTip').height() == 0){
					$('#queTip').animate({height:'1.7rem'})
					$('.questatus').eq(1).find('i').removeClass('icon-xiala').attr('class','iconfont icon-shangla')
				}else{
					$('#queTip').animate({height:'0rem'});
					$('.questatus').eq(1).find('i').removeClass('icon-shangla').attr('class','iconfont icon-xiala')
				}
			},
			payAsk(){
				if(this.textBox.length < 5){
					Toast({
						message:'提问内容最少要5字以上',
						duraction:500
					})
					return false;
				}
				Indicator.open('正在提交，请稍后...');
				var self = this;
				if(this.picked == false){
					var picked = 0;
				}else{
					var picked = 1;
				}
				var formdata = new FormData();
				formdata.append('pic1',$('#file')[0].files[0]);
				formdata.append('pic2',$('#file2')[0].files[0]);
				formdata.append('source_type','3');
				formdata.append('question',this.textBox);
				formdata.append('is_public',picked);
				formdata.append('source_id',this.$route.query.id);
				this.uploadPic('post','/shop-v2-ask_question.html',formdata).then(res => {
					if(res.status == 200){
						if(res.data.status == 1){
							Indicator.close();
							self.$router.push({path:'toPay',query:{type:2,askId:res.data.id,order_type:1,is_public:picked}})
						}else if(res.data.status == 0){
							Indicator.close();
							Toast({
								message:res.data.msg,
								duraction:500
							})
						}
					}
				})
			},
		},
		watch:{
			textBox(val,oldval){
				if(val.length > 50){
					Toast({
						message:'字数不能超过50个',
						duraction:500
					});
					this.textBox = oldval;
				}
			},
			picked(val,oldval){
				if(val == true){
					this.ifxuan = true;
					this.questatus = '公开提问';
					this.tiwenqian = this.gongkaiqian;
				}else{
					this.ifxuan = false;
					this.questatus = '私密提问'
					if(this.yinsiqian == ''){
						this.postData('post','/shop-v2-ask_get_fee.html',{fee_type:1,is_public:0}).then(res => {
							this.yinsiqian = res.data.total_fee;
							this.tiwenqian = res.data.total_fee;
						})
					}else{
						this.tiwenqian = this.yinsiqian;
					}
				}
			},
		},
		filters:{
			zhengshu(val){
				val = Math.round(val);
				return val;
			}
		}
	}
</script>
<style lang="less">
	.askQuestions{
		font-size: 0.205rem;
		color: #333;
		.askText{
			width: calc(100% - 5.4rem);
			height: 1.96rem;
			border: 0;
			font-size: 0.26rem;
			color: #333;
			padding: 0.3rem 0.2rem;
			outline-style: none;
			letter-spacing: 1px;
		}
		.uploadPic{
			height: 0.6rem;
			width: 100%;
			background-color: #fff;
			position: relative;
    		top: -0.2rem;
			i{
				font-size: 0.4rem;
    			color: #666;
    			margin-right: 0.2rem;
    			float: right;
			}
			img{
				height: 0.4rem;
				float: right;
				margin-right: 0.2rem;
			}
			input{
				display: none;
				opacity: 0;
			}
		}
		.tiwen{
			height: 0.88rem;
			padding-top: 0.15rem;
			font-size: 0.26rem;
		}
		.tiwen li{
			float: left;
			text-align: center;
			width: 100%;
			span{
				// width: 2.94rem;
				width: 6rem;
    			height: 0.69rem;
				display: inline-block;
				line-height: 0.69rem;
				color: #fff;
				border-radius: 0.1rem;
			}
		}
		.questatus{
			height: 0.8rem;
			background-color: #fff;
			line-height: 0.8rem;
			font-size: 0.26rem;
			color: #333;
			padding-left:0.15rem;
			position: relative;
			border-bottom: 1px solid #f1f2f6;
			.gou{
				width: 0.35rem;
				height: 0.35rem;
				border-radius: 100%;
				border: 1px solid #ddd;
				display: inline-block;
				float: right;
				position: absolute;
				top: 0.2rem;
				right: 0.15rem;
			}
			.xuan{
				width:0.35rem;
				height:0.35rem;
				border-radius:100%;
				background-color:rgb(94, 150, 208);
				display:inline-block;
				position: absolute;
				i{
					position: relative;
					top: -0.2rem;
					color: #fff;
					font-size: 0.33rem;
				}
			}
			input{
				float: right;
			    display: inline-block;
			    position: absolute;
			    top: 0.28rem;
			    right: 0.2rem;
			    z-index: 1;
			    opacity: 0;
			}
			i.icon-shangla,
			i.icon-xiala{
				float: right;
				margin-right: 0.12rem;
				color: #ddd;
			}
		}
		.queTip{
			background-color: #fff;
		    height: 1.7rem;
		    overflow: hidden;
			font-size: 0.22rem;
			padding: 0rem 0.15rem;
			div{
				line-height: 0.4rem;
				color: #666;
			}
		}
	}
</style>