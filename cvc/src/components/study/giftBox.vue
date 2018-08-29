<template>
	<div class="giftBox">
		<div class="giftBox-title">
			{{titlebubian}}
		</div>
		<div class="giftBox-num">
			<div class="giftBox-num-left">赠送数量</div>
			<div class="giftBox-num-right">
				<span class="giftBox-num-right-one" @click="toReduce()">-</span>
				<input type="number" name="" v-model="liwuNum" class="giftBox-num-right-two">
				<span class="giftBox-num-right-three" @click="toAdd()">+</span>
				<span class="giftBox-num-right-four">份</span>
			</div>
		</div>
		<div class="giftBox-price">
			<div class="giftBox-price-left">合计</div>
			<div class="giftBox-price-right">￥{{liwuPrice}}</div>
		</div>
		<div class="giftBox-payBtn" @click="topayGive()">
			打包赠送
		</div>
	</div>
</template>
<script>
	import {Toast} from 'mint-ui';
	export default{
		props:['liwuPrice','total_fee','titlebubian'],
		data(){
			return{
				liwuNum:1,
			}
		},
		created(){

		},
		methods:{
			toAdd(){
		        this.liwuNum++;
		        this.liwuPrice = (this.total_fee * this.liwuNum).toFixed(2);
		      },
		      toReduce(){
		        let num = this.liwuNum;
		          if(num>1){
		            this.liwuNum--;
		            this.liwuPrice = (this.total_fee * this.liwuNum).toFixed(2);
		          }else{
		            Toast({
		              message: '赠送课程数量不能小于1',
		              duraction: 500
		            });
		          }
		      },
		      topayGive(){
		      	var self = this;
		        if (window.location.href.indexOf('vid') != -1) {
		          // this.$router.push({path: '/toPay', query: {'vid': this.$route.query.vid, 'type': '1', 'order_type': '2','number':this.liwuNum}})
		          this.getData('post','/shop-v1-pay_order.html',{vid:this.$route.query.vid,type:1,order_type:2,number:this.liwuNum}).then(res1 => {
		          	this.getData('post','/shop-v1-pay_topay.html',{order_no:res1.data.order_no,type:1,pay_type:1}).then(res => {
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
						            	self.$router.push({path:'/successPay',query:{'vid':self.$route.query.vid,'order_type':2,order_no:res1.data.order_no,member_id:res1.data.member_id,orderNo:res1.data.order_no}})
						            }else{
						            	self.$router.push({path:'/failPay',query:{'vid':self.$route.query.vid}})
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
		          	})
		          })
		        } else if (window.location.href.indexOf('ser_id') != -1) {
		          this.getData('post','/shop-v1-pay_order.html',{ser_id:this.$route.query.ser_id,type:2,order_type:2,number:this.liwuNum}).then(res1 => {
		          	this.getData('post','/shop-v1-pay_topay.html',{order_no:res1.data.order_no,type:2,pay_type:1}).then(res => {
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
						            	self.$router.push({path:'/successPay',query:{'ser_id':self.$route.query.ser_id,'order_type':2,order_no:res1.data.order_no,member_id:res1.data.member_id,orderNo:res1.data.order_no}})
						            }else{
						            	self.$router.push({path:'/failPay',query:{'ser_id':self.$route.query.ser_id}})
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
		          	})
		          })
		        }
		      },
		}
	}
</script>
<style lang="less">
	.giftBox{
		font-size: 0.24rem;
		color: #333;
		width: 100%;
		background-color: #fff;
		position: fixed;
		z-index: 2;
		bottom: 0rem;
		border-top-left-radius: 0.1rem;
		border-top-right-radius: 0.1rem;
		padding-bottom: 0.4rem;
		&-title{
			font-size: 0.38rem;
			color: #333;
			width: calc(~"100% - 0.6rem");
			margin: 0 auto;
			padding: 0.4rem 0;
			border-bottom: 1px solid #eee;
			white-space: nowrap;
    		text-overflow: ellipsis;
    		overflow: hidden;
    		font-weight: bold;
		}
		&-num{
			font-size: 0.28rem;
			display: flex;
			-webkit-display:flex;
			justify-content: space-between;
			padding: 0.4rem 0.3rem;
			border-bottom: 1px solid #eee;
			&-left{

			}
			&-right{
				display: flex;
				-webkit-display:flex;
				justify-content: flex-start;
				&-one,&-three{
					width: 0.5rem;
					height: 0.5rem;
					border:1px solid #CCCCCC;
					text-align: center;
					line-height: 0.5rem;
					color: #ccc;
					font-size: 0.36rem;
				}
				&-one{
					border-top-left-radius: 0.06rem;
					border-bottom-left-radius: 0.06rem;
				}
				&-three{
					border-top-right-radius: 0.06rem;
					border-bottom-right-radius: 0.06rem;
					color: #666;
				}
				&-two{
					width: 0.76rem;
					height: 0.5rem;
					border:0;
					border-top: 1px solid #ccc;
					border-bottom: 1px solid #ccc;
					outline-style: none;
					-webkit-appearance: none;
					text-align: center;
					color: #333;
					border-radius: 0;
				}
				&-four{
					line-height: 0.5rem;
					margin-left: 0.2rem;
				}
			}
		}
		&-price{
			font-size: 0.28rem;
			display: flex;
			-webkit-display:flex;
			justify-content: space-between;
			padding: 0.4rem 0.3rem;
			&-right{
				font-weight: bold;
			}
		}
		&-payBtn{
			width: calc(~"100% - 0.6rem");
			margin: 0 auto;
			height: 0.92rem;
			background-color: #222;
			border-radius: 1px;
			color: #fff;
			font-size: 0.3rem;
			text-align: center;
			line-height: 0.92rem;
			overflow: hidden;
			margin-top: 0.2rem;
			border-radius: 0.06rem;
		}
	}
</style>