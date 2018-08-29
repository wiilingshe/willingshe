<template>
	<div class="recharge">
		<mt-navbar v-model="selected">
		  <mt-tab-item id="1">余额充值</mt-tab-item>
		  <mt-tab-item id="2">积分充值</mt-tab-item>
		  <mt-tab-item id="3">充值明细</mt-tab-item>
		</mt-navbar>
		<mt-tab-container v-model="selected">
		  <mt-tab-container-item id="1">
			<div class="title">
				<div>当前余额<span>{{yue}}元</span></div>
			</div>
			<div class="content">
				<div class="title1">
					选择金额
				</div>
				<div class="shu" v-for="(i,index) in arr">
					<div class="zi">
						充值{{i.recharge_balance}} 送<span><span style="color:#fe5875">{{i.largess_balance}}</span>元+</span><span style="color:#fe5875">{{i.largess_points}}</span>积分
						<div class="btn">
							<i class="icon iconfont icon-dui" :class="{seleted:recharge==i.recharge_balance}"></i>
							<input type="radio" v-model="recharge" name="qian" :value="i.recharge_balance">
						</div>
					</div>
				</div>
				<div class="automon">
					自定义金额：<input class="inputmon" type="number" v-model="recharge">
				</div>
				<div class="title1">
					选择支付方式
				</div>
				<div class="dibu">
					<div class="all">总计：<span class="money">&yen{{recharge}}</span></div>
					<div class="pay" @click="torecharge()"><i class="icon iconfont icon-weixin1"></i>微信支付</div>
				</div>
			</div>
		  </mt-tab-container-item>
		  <mt-tab-container-item id="2">
		  	<div class="title">
				<div>当前积分<span>{{points}}</span></div>
			</div>
			<div class="content">
				<div class="title1">
					选择金额
				</div>
				<div class="shu" v-for="(i,index) in arr">
					<div class="zi">
						充值{{i.recharge_balance}} 送<span><span style="color:#fe5875" v-show="selected==1">{{i.largess_balance}}</span>元+</span><span style="color:#fe5875">{{i.largess_points}}</span>积分
						<div class="btn">
							<i class="icon iconfont icon-dui" :class="{seleted:recharge==i.recharge_balance}"></i>
							<input type="radio" v-model="recharge" name="qian" :value="i.recharge_balance">
						</div>
					</div>
				</div>
				<div class="automon" v-show="selected==1">
					自定义金额：<input class="inputmon" type="number" v-model="recharge">
				</div>
				<div class="title1">
					选择支付方式
				</div>
				<div class="dibu">
					<div class="all">总计：<span class="money">&yen{{recharge}}</span></div>
					<div class="pay" @click="torecharge()"><i class="icon iconfont icon-weixin1"></i>微信支付</div>
				</div>
			</div>
		  </mt-tab-container-item>
		  <mt-tab-container-item id="3">
		  	<rechargeList></rechargeList>
		  </mt-tab-container-item>
		</mt-tab-container>
		<!-- <div id="footer1">
	    	<footer1></footer1>
	    </div> -->
	</div>
</template>
<script>
	import footer1 from '@/components/common/footer1'
	import rechargeList from '@/components/mine/rechargeList'
	import { Toast,Navbar, TabItem,Indicator} from 'mint-ui';
	export default{
		data(){
			return{
				recharge:'0',
				arr:[],
				yue:'--',
				write:'',
				selected:'1',
				points:'--',
			}
		},
		created(){
			this.global.shouquan();
			this.noShare();
		},
		mounted(){
			Indicator.open()
			this.getData('get','/shop-v1-user_get_balance.html').then(res => {
				if(res.data.status == 1){
					this.yue = Number(res.data.data.balance) + Number(res.data.data.largess_balance) + Number(res.data.data.recharge_balance);
					this.yue = this.yue.toFixed(2);
				}else{
					Toast({
					  message: '获取信息出错',
					  duration: 1000
					});
				}
				Indicator.close()
			})
			this.getData('get','/shop-v1-user_recharge_mbrule.html').then(res => {
				this.arr = res.data;
				this.recharge = res.data[0].recharge_balance;
			})
		},
		methods:{
			torecharge(){
				var self = this;
				if(this.selected == 1){
					var data = {type:'5',recharge_balance:this.recharge}
				}else if(this.selected == 2){
					var data = {type:'6',recharge_balance:this.recharge}
				}
				this.postData('post','/shop-v1-pay_order.html',data).then(res => {
					if(res.data.status == 0){
						Toast({
						  message: res.data.msg,
						  duration: 1000
						});
					}
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
					        	// 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。 
					            if(res.err_msg == "get_brand_wcpay_request:ok" ) {
					            	self.$router.push({path:'/mine-money'})
					            }     
					        }
					    ); 
					 }
					//以下方法是上述配置好后，自动调用支付
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
			}
		},
		watch:{
			selected(val,oldval){
				var self = this;
				if(val == 2){
					Indicator.open()
					this.getData('get','/shop-v1-user_base_info.html').then(res => {
						if(res.data.status == 1){
							Indicator.close()
							self.points = res.data.data.points
						}
					});
					this.getData('get','/shop-v1-user_recharge_mprule.html').then(res => {
						this.arr = res.data;
						this.recharge = res.data[0].recharge_balance;
					})
				}else if(val == 1){
					Indicator.open()
					this.getData('get','/shop-v1-user_recharge_mbrule.html').then(res => {
						if(res.data.length != 0){
							this.arr = res.data;
							Indicator.close();
							this.recharge = res.data[0].recharge_balance;
						}
					})
				}
			}
		},
		components:{footer1,rechargeList},
	}
</script>
<style lang="less">
	.recharge{
		height: 100%;
		.automon{
			font-size:0.221rem;
			height:0.76rem;
			line-height:0.76rem;
			background-color:#fff;
			padding-left:0.17rem;
			border-top: 1px solid #eee;
			.inputmon{
				width:1.2rem;
				height:0.5rem;
				border-radius: 0;
				border: 1px solid #ddd;
				-webkit-appearance: none;
				text-align: center;
				font-size: 0.25rem;
				color: #333;
				float: right;
				margin-right: 0.17rem;
				margin-top: 0.1rem;
				// background-color: #f1f2f6;
			}
		}
		.title{
			height: 1.11rem;
			background-color: #fff;
			width: 100%;
			border-bottom: 1px solid #ddd;
			div{
				font-size: 0.221rem;
				color: #333;
				line-height: 1.11rem;
				margin-left: 0.17rem;
				span{
					font-size: 0.29rem;
					color: #fe5875;
					margin-left: 0.17rem;
				}
			}
		}
		.content{
			.title1{
				font-size: 0.221rem;
				color: #999;
				margin: 0.17rem 0 0.17rem 0.17rem;
			}
			.shu{
				height: 0.76rem;
				background-color: #fff;
				border-top: 1px solid #eee;
				.zi{
					font-size: 0.221rem;
					line-height: 0.76rem;
					margin-left: 0.17rem;
					.btn{
						display: inline-block;
						float: right;
						position: relative;
						i{
							position: absolute;
							right: 0.17rem;
						}
						.seleted{
							color: #fe5875;
						}
						input{
							position: absolute;
							right: 0.25rem;
							top: 0.3rem;
							opacity: 0;
						}
					}
				}
			}
		}
		.dibu{
			background-color: #fff;
			border-top: 1px solid #eee;
			border-bottom: 1px solid #eee;
			.all{
				font-size: 0.221rem;
				margin-left: 0.17rem;
				margin-top: 0.256rem;
				margin-bottom: 0.17rem;
				.money{
					font-size: 0.29rem;
					color: #fe5875;
				}
			}
			.pay{
				font-size: 0.221rem;
				width: 6.06rem;
				height: 0.6rem;
				background-color: #21b101;
				border-radius: 0.1rem;
				color: #fff;
				text-align: center;
				margin: 0 auto;
				line-height: 0.6rem;
				margin-bottom: 0.25rem;
				i{
					font-size: 0.26rem;
					margin-right: 2px;
				}
			}
		}
		.footer{
			position: absolute;
			bottom: 0;
			width: 100%;
		}
		.mint-tab-container{
			margin-top: 1px;
		}
		.mint-navbar .mint-tab-item.is-selected{
			border-bottom: 1px solid #5e96d0;
		    color: #5e96d0;
		    margin-bottom: -1px;
		}
	}
</style>