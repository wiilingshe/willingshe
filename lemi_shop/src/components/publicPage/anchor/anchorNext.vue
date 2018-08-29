<template>
	<div class="box anchorNext" style="background:#fff;">
		<div v-show="nextShow">
			<div class="header">
				<div class="header_left">
					<i class="iconfont icon-shouji"></i>
					<p>第一步</p>
					<i class="iconfont icon-shuangyuanduihao"></i>
				</div>
				<div class="header_right">
					<i class="iconfont icon-v3"></i>
					<p>第二步</p>
					<i class="iconfont icon-yuandian"></i>
				</div>
				
			</div>
			<div class="line">
					<div></div>
					<div></div>
					<div></div>
			</div>
			<div class="text">
				<p>以下信息为必填项，请务必如实填写</p>
			</div>
			<div class="null"></div>
			<div class="mechanism">
				<ul>
					<li>机构学院</li>
					<li @click="chooseOne()">{{moren}}<i class="iconfont icon-dayuhao1" style="font-size: 0.26rem;"></i></li>
					<input type="text" ref="input1" style="display:none">
				</ul>
			</div>
			<div class="null"></div>
			<div class="photo_left">
				证件照
			</div>
			<div class="photo">
				<div class="photo_right">
					<form >
						<input type="file" id="file" name="" />
						<label for="file">
							<img src="../../../../static/img/pic_addfengmian.png" class="imgs" />
						</label>
					</form>
					<p>上传身份证正面照</p>
				</div>
			</div>
			<div class="centext">
				<label for="radio" v-show="a"><i class="iconfont icon-check"></i></label>
				<label for="radio" v-show="b"><i class="iconfont icon-check" style="color: #3385FF;"></i></label>
				<input type="radio"  id="radio" @click="label()"/>
				<span class="ccc">我已阅读并同意</span><span>相关协议</span>
			</div>
			
			<div id="login" style="text-align:center;margin-top: -0.2rem;">
				<button @click="submit()">提交申请</button>
			</div>
		</div>
		<div v-show="!nextShow">
			<ul v-for="item in mechanism">
				<li class="itemClass" @click="choose(item.username,item.shop_id)">{{item.username}}</li>
			</ul>
		</div>
	</div>
</template>

<script>
	
	import { Picker,Toast } from 'mint-ui';
	
	export default {
		data(){
			return{
				a:true,
				b:false,
				nextShow:true,
				mechanism:[],
				moren:'请选择加入的学院',
				shopId:'',
			}
			
		},
		created(){
			document.title = '申请';
			this.global.shouquan();
			this.getData('get','/shop-v1-shop_get_org.html').then(res => {
				if(res.status == 200){
					this.mechanism = res.data
				}
			})
		},
		methods:{
			label:function(){
				this.a=!this.a;
				this.b=!this.b;
			},
           submit:function(){
           	var data = {
           		add_type:'1',
			    user:this.$route.query.account,
			    username:'',
			    pass:this.$route.query.password,
			    pass1:this.$route.query.password,
			    desc:'',
			    true_name:'',
			    phone:this.$route.query.number,
			    email:'',
			    id_card:'',
			    pic_positive:'',
			    pic_back:'',
			    pic_business:'',
			    address:'',
			    shop_id:this.$refs.input1.value

           	}
           	this.postData('POST','/shop-v1-shop_add.html',data).then(res => {
           		if(res.status == 200){
           			if(res.data.status == 1){
      //      				Toast({
						//   message: res.data.msg,
						//   duration: 1000
						// });
						setTimeout(() => {
							this.$router.push('/mine-anchor-submit');
						},1500)
           			}else if(res.data.status == 0){
           				Toast({
						  message: res.data.msg,
						  duration: 1000
						});
           			}
           			
           		}
           	})
           },
           choose(val,id){
           		this.moren = val;
           		this.$refs.input1.value = id
           		this.nextShow = true;
           },
           chooseOne(){
           	this.nextShow = false;
           }
        },
        mounted(){
			this.share('申请页','我的个人中心',this.sharePic);
		}
	}
	
</script>

<style scoped>
	.box{
		display: flex;
		flex-direction: column;
		position: relative;
	}
	
	.header{
		display: flex;
		display: -webkit-flex;
		flex-direction:row;
		/*justify-content: space-around;*/
		
		
	}
	.header_left{
		width: 50%;
		text-align: center;
		
	}
	
	.header_right{
		width: 50%;
		text-align: center;
		
	}
	.header_left i:first-child,.header_right i:first-child{
		font-size: 0.8rem;
		color: #3385ff;
	}
	
	.header_left p,.header_right p{
		font-size: 0.24rem;
	}
	
	.header_left i:last-child,.header_right i:last-child{
		font-size: 0.5rem;
		color: #3385ff;
		/*padding: -2rem 0;*/
		margin-right: 0.2rem;
		
		
	}
	.mechanism{
		height: 0.83rem;
		background: #fff;
		font-size: 0.23rem;
		line-height: 0.83rem;
	}
	.mechanism ul li{
		float: left;
		margin-left: 0.3rem;
	}
	.mechanism ul li:nth-child(2){
		float: right;
		margin-right:0.3rem;
	}
	.icon-dayuhao1:before{
		color: #eee;
		margin-left: 0.1rem;
	}
	.line{
		display: flex;
		flex-direction: row;
		position: relative;
		
	}
	
	.line div:nth-child(1){
		height: 0.06rem;
		width: 20%;
		background: #3385FF;
		position: absolute;
		/*top:2.2rem;*/
	}
	
	.line div:nth-child(1){
		height: 0.06rem;
		width: 20%;
		background: #3385FF;
		position: absolute;
		top:-0.45rem;
	}
	
	.line div:nth-child(2){
		height: 0.06rem;
		width: 41%;
		background: #3385FF;
		position: absolute;
		top:-0.45rem;
		left: 50%;
		margin-left: -20.5%;
	}
	
	.line div:nth-child(3){
		height: 0.06rem;
		width: 20%;
		background: #3385FF;
		position: absolute;
		top:-0.45rem;
		right: 0;
	}
	
	.text{
		height: 0.5rem;
		line-height: 0.5rem;
		color: #888888;
		margin-left: 0.2rem;
		font-size: 0.24rem;
		text-align: left;
	}
	.text p{
		text-align: center;
	}
	.null{
		height: 0.2rem;
		background: #f6f6f6;
	}
	.photo{
		height: 2rem;
		display: flex;
		flex-direction: row;
		
	}
	
	.photo_left{
		font-size: 0.24rem;
		margin-left: 0.3rem;
    	margin-top: 0.35rem;
	}
	
	#file{
		display: none;
	}
	
	.imgs{
		width: 2rem;
		height: 2rem;
		margin-left: 0.2rem;
	}
	.photo_right{

		margin: 0 auto;
	}
	.photo_right p{
		font-size: 0.29rem;
		color: #555555;
	}
	
	.centext{
		height: 0.5rem;
		font-size: 0.22rem;
		margin-top: 0.7rem;
		text-align: center;
	}
	
	.ccc{
		color: #CCCCCC;
	}
	
	#radio{
		display: none;
	}
	
	.centext .icon-check:first-child{
		color: #CCCCCC;
		font-size: 0.24rem;
	}
	.anchorNext button{
		width: 4rem;
		height: 0.8rem;
		font-size: 0.26rem;
		outline-style: none;
		border: none;
		border-radius: 0.4rem;
		background-color: #3385ff;
		color: white;
	}
	#remember{
		width: 100%;
		height: 100%;
		line-height: 1rem;
	}
	#remember ul li{
		font-size: 0.24rem;
	}
	.icon-shuangyuanduihao:before{
		position: relative;
		left: 0.13rem;
	}
	.icon-yuandian:before{
		position: relative;
		left: 0.16rem;
	}
	.itemClass{
		font-size: 0.35rem;
	    height: 0.83rem;
	    line-height: 0.83rem;
	    text-align: center;
	    border-bottom: 1px solid #eee;
	}
</style>