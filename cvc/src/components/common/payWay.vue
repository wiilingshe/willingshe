<template>
	<div class="payWayall" style="background-color: #f1f2f6;">
		<div class="payTitle">支付订单</div>
		<div class="payWay">请选择支付方式</div>
		<div class="payWay1" style="background-color:#fff;border: 0px;" ref="wechat" v-if="payWay.indexOf('1') != -1">
			<ul>
				<li><img src="../../../static/img/wechat.png"><span>微信支付</span></li>
				<li>
					<span class="radio" :style="select?selected:''" @click="wechat()">
						<i class="iconfont icon-dui1" :style="select?'':selected2"></i>
					</span>
				</li>
			</ul>
		</div>
		<div class="payWay1" style="background-color:#fff" ref="alipay" v-if="payWay.indexOf('2') != -1">
			<ul>
				<li><img src="../../../static/img/alipay.png"><span>支付宝支付</span></li>
				<li>
					<span class="radio" :style="select2?selected:''" @click="alipay()">&#10003</span>
				</li>
			</ul>
		</div>
		<div class="endTime">
			剩余支付时间：{{time2}}
		</div>
		<div class="btnPay" @click="btnPay()" style="background: #3385ff;">确定支付</div>
	</div>
</template>
<script>
	import {Toast} from 'mint-ui'
	import wx from 'weixin-js-sdk'
	export default{
		data(){
			return{
				payWay:'',
				select:true,
				select2:false,
				selected:{
					border:'1px solid #3385ff',
					color:"#3385ff",
				},
				selected2:{
					color:"#e1e2e6"
				},
				payType:1,
				testData:{
					"appId":"wx2421b1c4370ec43b",     //微信内置浏览器需要该参数，JS-SDK调用支付不需要
		            "timeStamp":"1395712654",         //时间戳，自1970年以来的秒数     
		            "nonceStr":"e61463f8efa94090b1f366cccfbbb444", //随机串     
		            "package":"prepay_id=u802345jgfjsdfgsdg888",     
		            "signType":"MD5",         //微信签名方式：     
		            "paySign":"70EA570631E4BB79628FBCA90534C63FF7FADD89" //微信签名 
				},
				time:1800,
				time2:'30:00',
			}
		},
		created(){
			var self = this;
			document.title="支付订单"
			this.global.shouquan();
			this.noShare();
			this.postData('post','/shop-v1-pay_pay_type.html').then(res => {
				if(res.data != null){
					for(let i in res.data){
						this.payWay = this.payWay.concat(res.data[i].pay_type)
					}
				}
			})
			setInterval(function(){
				self.time = self.time - 1;
				self.time2 = Math.floor(self.time/60)+":"+(self.time%60/100).toFixed(2).slice(-2)
			},1000)
		},
		methods:{
			wechat(){
				this.select = !this.select;
				this.select2 = false;
				if(this.select == true){
					this.payType = 1
				}else{
					this.payType = ''
				}
			},
			alipay(){
				this.select2 = !this.select2;
				this.select = false;
			},
			btnPay(){
				// history.pushState(null,null,'/');
				var self = this;
				this.postData('post','/shop-v1-pay_topay.html',{'order_no':this.$route.query.orderNo,'type':this.$route.query.type,'pay_type':this.payType}).then(res => {
					if(res.data.status == 0){
						Toast({
							message:res.data.msg,
							duraction:'1000'
						})
					}else{
						function onBridgeReady(){
						    WeixinJSBridge.invoke(
						        'getBrandWCPayRequest', {
						            "appId":res.data.appId,     //公众号名称，由商户传入     
						            "timeStamp":res.data.timeStamp,         //时间戳，自1970年以来的秒数     
						            "nonceStr":res.data.nonceStr, //随机串     
						            "package":res.data.package,     
						            "signType":res.data.signType,         //微信签名方式：     
						            "paySign":res.data.paySign //微信签名 
						        },
						        function(res){   
						            if(res.err_msg == "get_brand_wcpay_request:ok" ) {
						            	// alert(window.location.href.indexOf('art_id') != -1)
						            	// self.$router.push({path:'/successPay',query:{'art_id':self.$route.query.art_id}});
						            	// 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
						            	if(window.location.href.indexOf('a_id') != -1){
						            		self.$router.push({path:'/successPay',query:{a_id:self.$route.query.a_id}})
						            	}else if(window.location.href.indexOf('askId') != -1){
						            		Toast({
						            			message:'支付成功，可以在个人中心-我的问题，查看提问的问题',
						            			duraction:'3000'
						            		});
						            		self.$router.push({path:'/problemDetails',query:{'id':self.$route.query.askId}})
						            		// if(window.location.href.indexOf('vid') != -1){
						            		// 	self.$router.push({path:'/successPay',query:{'vid':self.$route.query.vid,askId:this.$route.query.askId}})
						            		// }else{
						            		// 	self.$router.push({path:'/successPay',query:{'ser_id':self.$route.query.ser_id,askId:this.$route.query.askId}})
						            		// }
						            	}else if(window.location.href.indexOf('vid') != -1){
						            		self.$router.push({path:'/successPay',query:{'vid':self.$route.query.vid,'order_type':self.$route.query.order_type,order_no:self.$route.query.orderNo,member_id:self.$route.query.member_id,orderNo:self.$route.query.orderNo}})
						            	}else if(window.location.href.indexOf('ser_id') != -1){
						            		self.$router.push({path:'/successPay',query:{'ser_id':self.$route.query.ser_id,'order_type':self.$route.query.order_type,order_no:self.$route.query.orderNo,member_id:self.$route.query.member_id,orderNo:self.$route.query.orderNo}})
						            	}else if(window.location.href.indexOf('cs_id') != -1){
						            		self.$router.push({path:'/mine-course'})
						            	}else if(window.location.href.indexOf('art_id') != -1){
						            		self.$router.push({path:'/successPay',query:{'art_id':self.$route.query.art_id}});
						            	}
						            }else{
						            	if(window.location.href.indexOf('vid') != -1){
						            		self.$router.push({path:'/failPay',query:{'vid':self.$route.query.vid}})
						            	}else if(window.location.href.indexOf('ser_id') != -1){
						            		self.$router.push({path:'/failPay',query:{'ser_id':self.$route.query.ser_id}})
						            	}else if(window.location.href.indexOf('askId') != -1){
						            		self.$router.push({path:'/failPay',query:{'vid':self.$route.query.vid}})
						            	}else if(window.location.href.indexOf('cs_id') != -1){
						            		self.$router.push({path:'/failPay',query:{'cs_id':self.$route.query.cs_id}})
						            	}else if(window.location.href.indexOf('art_id') != -1){
						            		self.$router.push({path:'/failPay',query:{'art_id':self.$route.query.art_id}})
						            	}
						            }  
						        }
						    ); 
						}
						if (typeof WeixinJSBridge == "undefined"){
						    if( document.addEventListener ){
						        document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
						    }else if (document.attachEvent){
						        document.attachEvent('WeixinJSBridgeReady', onBridgeReady); 
						        document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
						    }
						}else{
						    onBridgeReady();
						}
					}
				},res => {
					console.log(res)
					console.log(window.location.href.indexOf('ser_id'))
				})
			}
		}
	}
</script>
<style lang="less">
.payWayall{
	font-size: 0.27rem;
	height: 100%;
	.payTitle{
		height: 0.8rem;
	    width: 100%;
	    text-align: center;
	    line-height: 0.8rem;
	    background-color: #fff;
	    margin-bottom: 0.2rem;
	    border-bottom: 1px solid #e1e1e1;
	}
	.payWay{
		background-color: #fff;
		padding-left: 0.17rem;
		height: 0.55rem;
		line-height: 0.55rem;
		margin-top: 0.2rem;
		border-bottom: 1px solid #e1e1e1;
	}
	.payWay1{
		height: 0.8rem;
		background-color: #fff;
		border-top: 1px solid #e1e1e1;
	}
	.payWay1 ul li{
		float: left;
	}
	.payWay1 ul li:nth-child(1){
		padding-left: 0.17rem;
		line-height: 0.8rem;
	}
	.payWay1 ul li:nth-child(1) img{
		height: 0.4rem;
		position: relative;
    	top: 0.1rem;
	}
	.payWay1 ul li:nth-child(1) span{
		display: inline-block;
		margin-left: 0.2rem;
	}
	.payWay1 ul li:nth-child(2){
		float: right;
	}
	.payWay1 .radio i{
		font-size: 0.28rem;
	}
	 .payWay1 ul li:nth-child(2) .radio{
		width: 0.4rem;
	    height: 0.4rem;
	    background-color: #fff;
	    border:1px solid #e1e1e1;
	    display: inline-block;
	    border-radius: 0.4rem;
	    margin-top: 0.2rem;
	    margin-right: 0.17rem;
	    text-align: center;
	    line-height: 0.4rem;
	    color: #fff;
	}
	.btnPay{
		height: 0.8rem;
	    background: #3385ff;
	    color: #fff;
	    width: 100%;
	    text-align: center;
	    line-height: 0.8rem;
	    font-size: 0.3rem;
	    position: fixed;
	    bottom: 0px;
	}
	 .endTime{
		text-align: center;
		font-size: 0.26rem;
	    color: #666;
	    margin-top: 0.3rem;
	}
}
</style>