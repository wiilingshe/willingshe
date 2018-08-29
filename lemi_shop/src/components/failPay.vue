<template>
	<div class="successPay">
		<img src="../../static/img/payFail.png">
		<div class="tip">支付失败</div>
		<div class="btn" @click="tozhaun()">完成</div>
	</div>
</template>
<script>
	export default{
		data(){
			return{

			}
		},
		created(){
			document.title = '交易详情'
		},
		methods:{
			tozhaun(){
				if(window.location.href.indexOf('vid') != -1){
					this.$router.push({path:'/details',query:{'vid':this.$route.query.vid}})
				}else if(window.location.href.indexOf('ser_id') != -1){
					this.$router.push({path:'/details',query:{'ser_id':this.$route.query.ser_id}})
				}else if(window.location.href.indexOf('a_id') != -1){
					this.$router.push({path:'/details',query:{'id':this.$route.query.a_id}})
				}else if(window.location.href.indexOf('cs_id') != -1){
					this.$router.push({path:'/activity11'})
				}else if(window.location.href.indexOf('p_id') != -1){
		          this.$router.push({path:'/details',query:{'ser_id':this.$route.query.p_id}});
		        }else if(window.location.href.indexOf('art_id') != -1){
		          this.$router.push({path:'/mine-course-articles',query:{'artid':this.$route.query.art_id}});
		        }
			}
		}
	}
</script>
<style>
	.successPay{
		font-size: 0.27rem;
	}
	.successTitle{
		height: 0.8rem;
		width: 100%;
		background-color: #3d3c41;
		text-align: center;
		color: #fff;
		line-height: 0.8rem;
	}
	.successPay img{
		height: 1.8rem;
		margin-left: calc(50% - 0.9rem);
		margin-top:1rem;
	}
  .successPay .tip{
		font-weight: 500;
		text-align: center;
		font-size: 0.55rem;
    	margin-top: 0.3rem;
	}
  .successPay .btn{
		height: 0.8rem;
	    width: 6rem;
	    background: #00c800;
	    text-align: center;
	    line-height: 0.8rem;
	    font-size: 0.4rem;
	    color: #fff;
	    margin: 0 auto;
	    margin-top: 1.5rem;
	}
</style>
