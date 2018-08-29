<template>
	<div class="orderDetails">
		<div class="status">
			<span class="left" v-if="arr.order_status == 0">
				<i class="icon iconfont icon-dengdai"></i>
				<span>等待付款</span>
			</span>
			<span class="left" v-if="arr.order_status == 1">
				<i class="icon iconfont icon-fahuo"></i>
				<span>待发货</span>
			</span>
			<span class="left" v-if="arr.order_status == 2">
				<i class="icon iconfont icon-dengdai"></i>
				<span>卖家已发货</span>
			</span>
			<span class="left" v-if="arr.order_status == 3">
				<i class="icon iconfont icon-dengdai"></i>
				<span>买家已收货</span>
			</span>
			<span class="left" v-if="arr.order_status == 4">
				<i class="icon iconfont icon-check"></i>
				<span>订单完成</span>
			</span>
			<span class="left" v-if="arr.order_status == 5">
				<i class="icon iconfont icon-jiaoyiguanbi"></i>
				<span>退款</span>
			</span>
			<span class="left" v-if="arr.order_status == 6">
				<i class="icon iconfont icon-jiaoyiguanbi"></i>
				<span>关闭订单</span>
			</span>
			<span class="right" v-if="arr.order_status == 0">需付款：&yen;{{arr.total_fee}}</span>
		</div>
		<div class="info">
			<div class="name1">
				收货人：{{arr.consignee}}
				<span class="phone">{{arr.mobile}}</span>
			</div>
			<div class="address">
				<i class="icon iconfont icon-location"></i>
				<span>{{arr.province}}{{arr.city}}{{arr.district}}{{arr.street}}</span>
			</div>
		</div>
		<div class="orderlist" style="border-bottom:1px solid #eee" v-for="i in arr.goods_lst">
			<ul class="ul1">
				<li>
					<div class="img1" :style="{'background-image':'url('+i.goods_pic+')'}" @click="details(i.goods_id)"></div>
				</li>
				<li>
					<div class="name2">{{i.goods_name}}</div>
					<div class="sku1">{{i.sku_name}}</div>
					<div class="price1">
						<span>&yen;{{i.shop_price}}</span>
						<span>&yen;{{i.market_price}}</span>
						<span>x{{i.goods_num}}</span>
					</div>
				</li>
			</ul>
		</div>
		<div class="everyPrice">
			<div class="list1" style="padding-top: 0.2rem;">
				<span>商品金额：</span>
				<span>&yen;{{arr.goods_amount}}</span>
			</div>
			<div class="list1">
				<span>运费：</span>
				<span>+ &yen;{{arr.shipping_money}}</span>
			</div>
			<div class="list1">
				<span>余额抵扣：</span>
				<span>- &yen;{{arr.balance}}</span>
			</div>
		</div>
		<div class="allPrice1">
			<div class="list2" style="border-bottom: 1px solid #eee;padding-bottom: 0.17rem;">
				<span>订单总价：</span>
				<span>&yen;{{arr.order_money}}</span>
			</div>
			<div class="list2" style="padding-top: 0.17rem;padding-bottom: 0.17rem;">
				<span>实付款：</span>
				<span style="color:#ef4949;">&yen;{{arr.total_fee}}</span>
			</div>
		</div>
    <div class="orderCode" style="margin-bottom:0;color: #000">
      <div class="list3">
        <span>买家留言: <br>&nbsp&nbsp&nbsp{{arr.buyer_memo}}</span>
      </div>
    </div>
    <div class="orderCode">
			<div class="list3">
				<span>订单编号：{{this.$route.query.order_no}}</span>
			</div>
			<div class="list3" v-if="arr.create_time">
				<span>下单时间：{{arr.create_time}}</span>
			</div>
			<div class="list3" v-if="arr.update_time">
				<span>付款时间：{{arr.update_time}}</span>
			</div>
			<!-- <div class="list3">
				<span>创建时间：{{arr.create_time}}</span>
			</div> -->
			<div class="list3" v-if="arr.consign_time">
				<span>发货时间：{{arr.consign_time}}</span>
			</div>
			<div class="list3" v-if="arr.consign_time">
				<span>成交时间：{{arr.consign_time}}</span>
			</div>
		</div>
		<!--<div class="caozuo1" v-if="arr.order_status != 1">-->
			<!--<ul>-->
				<!--<li class="btn1" style="color:#ef4949;border:1px solid #ef4949;" v-if="arr.order_status == 0" @click="pay()">付款</li>-->
				<!--<li class="btn1" v-if="arr.order_status == 0" @click="cancelOrder()">取消订单</li>-->
				<!--<li class="btn1" v-if="arr.order_status == 2 || arr.order_status == 3" @click="confirmorder()">确认收货</li>-->
				<!--<li class="btn1" style="color:#ef4949;border:1px solid #ef4949;" v-if="arr.order_status == 4">评论晒图</li>-->
				<!--<li class="btn1" v-if="arr.order_status == 4" @click="deleteorder()">删除</li>-->
				<!--<li class="btn1" v-if="arr.order_status == 2 || arr.order_status == 3 || arr.order_status == 4" @click="tologistics()">查看物流</li>-->
				<!--<li class="btn1" v-if="arr.order_status == 6" @click="deleteorder()">删除订单</li>-->
				<!--&lt;!&ndash; <li class="btn1" v-if="arr.order_status == 1" @click="remind()">提醒发货</li> &ndash;&gt;-->
			<!--</ul>-->
		<!--</div>-->
    <div class="caozuo1" v-if="caoLength != 0">
      <div style="float:right" >
        <!--v-if="!(i.is_evaluate>1&& x.action == 'to_comment')"-->
        <span v-for="x in memberArr" @click="operating(x.action,arr.order_no,$event)" v-if="!(arr.is_evaluate>0 && x.action == 'to_comment')" >{{x.name}}</span>
      </div>
    </div>
	</div>
</template>
<script>
	import { Switch,Toast,Indicator,MessageBox } from 'mint-ui';
	export default{
		data(){
			return{
				arr:[],
				ifwechat:true,
        caoLength:0,
        memberArr:[],
			}
		},
		created(){
			this.global.shouquan();
      this.noShare();
      document.title = '订单详情';
      this.postData('post','/shop-g1-order_order_detail.html',{order_no:this.$route.query.order_no}).then(res => {
				this.arr = res.data;
        this.memberArr = this.arr.member_operation;
        this.caoLength = this.arr.member_operation.length;
      })
		},
		methods:{
			details(id){
		        this.$router.push({path:'/goodDetails',query:{goods_id:id,type_id:this.$route.query.type_id}})
		      },
//		    支付
			pay(){
				var self = this;
				Indicator.open();
				this.postData('post','/shop-g1-pay_go.html',{order_no:this.$route.query.order_no}).then(res => {
					Indicator.close();
					if(res.data.status == 1){
						function onBridgeReady(){
						    WeixinJSBridge.invoke(
						        'getBrandWCPayRequest', {
						            "appId":res.data.payData.appId,     //公众号名称，由商户传入
						            "timeStamp":res.data.payData.timeStamp,         //时间戳，自1970年以来的秒数
						            "nonceStr":res.data.payData.nonceStr, //随机串
						            "package":res.data.payData.package,
						            "signType":res.data.payData.signType,         //微信签名方式：
						            "paySign":res.data.payData.paySign //微信签名
						        },
						        function(res){
						            if(res.err_msg == "get_brand_wcpay_request:ok" ) {
						            	Toast({
										  message: '购买成功',
										  iconClass: 'icon iconfont icon-check',
										  duration: 1000
										});
						            	self.$router.push({path:'/orderCenter'});
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
						}else if(res.data.status == 0){
							Toast({
							  message: res.data.msg,
							  iconClass: 'icon iconfont icon-tishi',
							  duration: 1000
							});
						}
				},res => {
					Indicator.close();
					Toast({
					  message: '接口报错，请刷新页面重试',
					  iconClass: 'icon iconfont icon-tishi',
					  duration: 1000
					});
				})
			},
			cancelOrder(){
				this.postData('post','/shop-g1-order_cancel_order.html',{order_no:this.$route.query.order_no}).then(res => {
					if(res.data.status == 1){
						Toast({
						  message: res.data.msg,
						  iconClass: 'icon iconfont icon-check',
						  duration: 1000
						});
						this.$router.push({path:'/orderCenter'})
					}else if(res.data.status == 0){
						Toast({
						  message: res.data.msg,
						  iconClass: 'icon iconfont icon-tishi',
						  duration: 1000
						});
					}
				})
			},
			remind(){
				Toast({
				  message: '提醒发货成功',
				  iconClass: 'icon iconfont icon-check',
				  duration: 1000
				});
			},
			deleteorder(){
				this.postData('post','/shop-g1-order_del_order.html',{order_no:this.$route.query.order_no}).then(res => {
					if(res.data.status == 1){
						Toast({
						  message: res.data.msg,
						  iconClass: 'icon iconfont icon-check',
						  duration: 1000
						});
						this.$router.push({path:'/orderCenter'})
					}else if(res.data.status == 0){
						Toast({
						  message: res.data.msg,
						  iconClass: 'icon iconfont icon-tishi',
						  duration: 1000
						});
					}
				})
			},
			confirmorder(){
				this.postData('post','/shop-g1-order_confirm_delivery.html',{order_no:this.$route.query.order_no}).then(res => {
					if(res.data.status == 1){
						Toast({
						  message: res.data.msg,
						  iconClass: 'icon iconfont icon-check',
						  duration: 1000
						});
						this.$router.replace({path:'/mallOrderDetails',query:{order_no:this.$route.query.order_no}});
					}else if(res.data.status == 0){
						Toast({
						  message: res.data.msg,
						  iconClass: 'icon iconfont icon-tishi',
						  duration: 1000
						});
					}
				})
			},
      tologistics(){
        this.$router.push({path:'/logisticsMany',query:{order_no:this.$route.query.order_no}});
      },
//      操作函数
      operating(action,order_no,e){
        var self = this;
        if(action == 'order_pay'){
          Indicator.open();
          this.postData('post','/shop-g1-pay_go.html',{order_no:order_no}).then(res => {
            Indicator.close();
            if(res.data.status == 1){
              function onBridgeReady(){
                WeixinJSBridge.invoke(
                  'getBrandWCPayRequest', {
                    "appId":res.data.payData.appId,     //公众号名称，由商户传入
                    "timeStamp":res.data.payData.timeStamp,         //时间戳，自1970年以来的秒数
                    "nonceStr":res.data.payData.nonceStr, //随机串
                    "package":res.data.payData.package,
                    "signType":res.data.payData.signType,         //微信签名方式：
                    "paySign":res.data.payData.paySign //微信签名
                  },
                  function(res){
                    if(res.err_msg == "get_brand_wcpay_request:ok" ) {
                      Toast({
                        message: '购买成功',
                        iconClass: 'icon iconfont icon-check',
                        duration: 1000
                      });
                      self.$router.push({path:'/orderCenter'});
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
            }else if(res.data.status == 0){
              Toast({
                message: res.data.msg,
                iconClass: 'icon iconfont icon-tishi',
                duration: 1000
              });
            }
          },res => {
            Indicator.close();
            Toast({
              message: '接口报错，请刷新页面重试',
              iconClass: 'icon iconfont icon-tishi',
              duration: 1000
            });
          })
        }else if(action == 'cancel_order'){
          MessageBox({
            title:'确认取消订单?',
            showCancelButton:true,
          }).then(action => {
            if(action == 'confirm'){
              this.postData('post','/shop-g1-order_cancel_order.html',{order_no:order_no}).then(res => {
                if(res.data.status == 1){
                  Toast({
                    message: res.data.msg,
                    iconClass: 'icon iconfont icon-check',
                    duration: 1000
                  });
                  $(e.target).closest('.list').remove();
                }else if(res.data.status == 0){
                  Toast({
                    message: res.data.msg,
                    iconClass: 'icon iconfont icon-tishi',
                    duration: 1000
                  });
                }
              })
            }
          });
        }else if(action == 'del_order'){
          MessageBox({
            title:'确认删除订单?',
            message: '请谨慎操作',
            showCancelButton:true,
          }).then(action => {
            if(action == 'confirm'){
              this.postData('post','/shop-g1-order_del_order.html',{order_no:order_no}).then(res => {
                if(res.data.status == 1){
                  Toast({
                    message: res.data.msg,
                    iconClass: 'icon iconfont icon-check',
                    duration: 1000
                  });
                  $(e.target).closest('.list').remove();
                }else if(res.data.status == 0){
                  Toast({
                    message: res.data.msg,
                    iconClass: 'icon iconfont icon-tishi',
                    duration: 1000
                  });
                }
              })
            }
          });

        }else if(action == 'get_order_logistics'){
          this.$router.push({path:'/logisticsMany',query:{order_no:order_no}});
        }else if(action == 'confirm_delivery'){
          this.postData('post','/shop-g1-order_confirm_delivery.html',{order_no:order_no}).then(res => {
            if(res.status == 200){
              if(res.data.status == 1){
                this.$router.push({path:'/theDeal',query:{order_no:order_no}});
              }
            }
          });
        }else if(action == 'to_comment'){
          this.$router.push({path:'/commentComplete',query:{order_no:order_no}});
        }
      },
		},
		watch:{
			ifwechat(val,oldval){
				if(val == false){
					this.ifwechat = false;
					$('.limian').css('display','none');
				}else if(val == true){
					this.ifwechat = true;
					$('.limian').css('display','block')
				}
			}
		}
	}
</script>
<style lang="less">
	.orderDetails{
		color: #000;
		font-size: 0.205rem;
		.status{
			padding: 0.25rem 0.34rem;
			width: calc(~"100% - 0.68rem");
			background-color: #ef4949;
			color: #fff;
			font-size: 0.222rem;
			i{
				font-size: 0.3rem;
				margin-right: 0.08rem;
			}
			.left{
				span{
					position: relative;
					top: -0.02rem;
				}
			}
			.right{
				float: right;
			}
		}
		.info{
			width: 100%;
			background-color: #fff;
			height: auto;
			padding-top: 0.25rem;
			position: relative;
			margin-bottom: 0.17rem;
			.name1{
				width: calc(~"100% - 1.4rem");
				padding-left: 0.7rem;
				margin-bottom: 0.17rem;
				.phone{
					float: right;
				}
			}
			.address{
				width: calc(~"100% - 0.68rem");
				padding-left: 0.34rem;
				color: #666;
				padding-bottom: 0.25rem;
				i{
					font-size: 0.25rem;
					margin-right: 0.05rem;
				}
				span{
					width: 5.1rem;
    				display: inline-block;
				}
			}
		}
		.orderlist{
			width: 100%;
			height: 1.792rem;
			background-color: #fff;
			.ul1{
				li{
					float: left;
				}
				li:nth-child(1){
					width: 1.9rem;
					.img1{
						width: 1.433rem;
						height: 1.433rem;
						background-color: #eee;
						margin-left: 0.25rem;
						margin-top: 0.17rem;
						background-size: cover;
					}
				}
				li:nth-child(2){
					width: calc(~"100% - 2.15rem");
					height: 1.792rem;
					position: relative;
					.name2{
						font-size: 0.222rem;
						margin-top: 0.17rem;
						max-height: 0.83rem;
    					overflow: hidden;
					}
					.sku1{
						margin-top: 0.06rem;
						color: #999;
					}
					.price1{
						font-size: 0.222rem;
						position: absolute;
						bottom: 0.17rem;
						width: 100%;
						span:nth-child(1){
							color: #ef4949;
						}
						span:nth-child(2){
							color: #999;text-decoration: line-through;margin-left:0.1rem;
						}
						span:nth-child(3){
							color: #999;
							float: right;
						}
					}
				}
			}
		}
		.everyPrice{
			background-color: #fff;
			color: #999;
			.list1{
				width: calc(~"100% - 0.34rem");
				padding: 0.08rem 0.17rem;
				// letter-spacing: 1px;
				span:nth-child(2){
					float: right;
				}

			}
		}
		.allPrice1{
			background-color: #fff;
			font-size: 0.222rem;
			.list2{
				width: calc(~"100% - 0.34rem");
				margin: 0 0.17rem;
				padding: 0.08rem 0;
				letter-spacing: 1px;
				span:nth-child(2){
					float: right;
				}
			}
		}
		.orderCode{
			padding: 0.17rem 0.17rem 0.2rem;
			margin-top: 0.17rem;
			width: calc(~"100% - 0.34rem");
			margin-bottom: 0.75rem;
			background-color: #fff;
			color: #999;
			.list3{
				margin-bottom: 2px;
				// letter-spacing: 1px;
			}
		}
		.caozuo1{
			width: calc(~"100% - 0.34rem");
			padding: 0.25rem 0.17rem;
			background-color: #fff;
			border-top: 1px solid #ddd;
			position: fixed;
			z-index: 11;
			bottom: 0;
      span{
        height: 0.384rem;
        width: 1.143rem;
        border-radius: 0.192rem;
        border: 1px solid #999;
        padding: 0.06rem 0.15rem;
        margin-left: 0.17rem;
        &:last-of-type{
          color: #ef4949;
          border-color: #ef4949;
        }
      }
			/*ul{*/
				/*li{*/
					/*float: right;*/
				/*}*/
				/*.btn1{*/
					/*text-align: center;*/
				    /*border-radius: 0.192rem;*/
				    /*border: 1px solid #999;*/
				    /*padding: 0.06rem 0.15rem;*/
				    /*margin-left: 0.17rem;*/
				/*}*/
			/*}*/
		}
	}
</style>
