<template>
	<div class="footer">
		<div class="footer-bg" v-if="code || tokefu" @click="close()"></div>
		<div class="footer-code" v-if="code  || tokefu">
			<img class="footer-code-close" src="../../../static/img/home/my_close.png" @click="close()">
			<div class="footer-code-title">{{infos.title}}</div>
			<img class="footer-code-code" :src="infos.wechat_qrcode" v-if="hao">
			<div class="footer-code-tip" v-if="hao">长按识别二维码关注公众号</div>
			<img class="footer-code-code" :src="infos.wechat_qrcode" v-if="hao1">
			<div class="footer-code-tip" v-if="hao1">长按识别二维码关注公众号1</div>
			<img class="footer-code-code" :src="infos.kefu_qrcode" v-if="kefu || kefu1">
			<div class="footer-code-tip" v-if="kefu || kefu1">长按识别二维码，联系我们</div>
		</div>
		<div style="margin-bottom:0.3rem;">
			<span @click="gohome()">平台首页</span>
			<span class="ge">|</span>
			<span @click="gomine()">个人中心</span>
			<span class="ge">|</span>
			<span @click="attentionus()">关注我们</span>
			<span class="ge">|</span>
			<span @click="problem()">问题反馈</span>
		</div>
		<span style="font-size:0.24rem;" @click="guanwang()">小象SaaS提供技术支持</span>
	</div>
</template>
<script>
	export default{
		props:['tokefu','kefu1','hao1'],
		data(){
			return{
				infos:[],
				code:false,
				kefu:false,
				hao:false,
			}
		},
		created(){
			if(sessionStorage.getItem('res') != null){
				var res = JSON.parse(sessionStorage.getItem('res'));
        		res.data = res;
        		this.infos = res.data;
		        if(window.location.href.indexOf('collegeHome') != -1){
		        	// document.title = res.data.college_name;
		        	console.log(1111112)
		        }
			}else{
				this.getData('post','/shop-v1-index_basemsg.html').then(res => {
			        this.infos = res.data;
			        if(window.location.href.indexOf('collegeHome') != -1){
			        	// document.title = res.data.college_name;
			        	console.log(111111)
			        }
					sessionStorage.setItem('res',JSON.stringify(res.data))
			     })
			}
		},
		methods:{
			guanwang(){
				window.location.href = 'https://www.saasxx.vip/';
			},
			gohome(){
				this.$router.push({path:'/'})
			},
			gomine(){
				this.$router.push({path:'/mine'})
			},
			attentionus(){
				this.code = true;
				this.kefu = false;
				this.hao = true;
				this.$emit('childByValue1', 'false')
			},
			problem(){
				this.code = true;
				this.kefu = true;
				this.hao = false;
				this.$emit('childByValue1', 'false')
			},
			close(){
				this.hao = false;
				this.code = false;
				this.$emit('childByValue', 'false')
			}
		}
	}
</script>
<style lang="less">
	.footer{
		color:#333;
		font-size:0.26rem;
		text-align: center;
		padding-bottom: 0.4rem;
		padding-top: 0.4rem;
		.ge{
			display: inline-block;
			margin-right:0.1rem;
			margin-left: 0.1rem; 
		}
		&-bg{
			width: 100%;
			height: 100vh;
			position: fixed;
			z-index: 888;
			background-color: rgba(0,0,0,0.6);
			top: 0;
		}
		&-code{
			position: fixed;
			z-index: 999;
			width: 5rem;
			height: 5.5rem;
			background-color: #fff;
			margin:auto;
			left:0; 
			right:0; 
			top:0; 
			bottom:0;
			background-image: url(/static/img/college/my_QRcode_bg.png);
			background-size: 100%;
			border-radius: 0.06rem;
			&-title{
				font-size: 0.38rem;
				margin-top: 0.55rem;
			}
			&-code{
				width: 3rem;
				height: 3rem;
				margin:0 auto;
				margin-top: 0.25rem;
			}
			&-tip{
				font-size: 0.3rem;
				margin-top: 0.25rem;
			}
			&-close{
				width: 0.3rem;
				position: absolute;
				top: 0.3rem;
				right: 0.3rem;
			}
		}
	}
</style>
