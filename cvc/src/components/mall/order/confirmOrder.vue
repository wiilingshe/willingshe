<template>
	<div class="confirmOrder">
		<div class="getInfo" v-show="getInfo" @click="changeAddress()">
			<i class="icon iconfont icon-add"></i>
			<span>请填写收货地址</span>
		</div>
		<div class="info" v-show="info" @click="changeAddress()">
			<i class="icon iconfont icon-next-page"></i>
			<div class="name1">
				收货人：{{consignee}}
				<span class="phone">{{mobile}}</span>
			</div>
			<div class="address">
				<i class="icon iconfont icon-location"></i>
				<span>{{address}}</span>
			</div>
		</div>
		<div class="orderlist" v-if="ifcart == false">
			<ul class="ul1">
				<li>
					<div class="img1" :style="{'background-image':'url('+pic+')'}"></div>
				</li>
				<li>
					<div class="name2">{{name}}</div>
					<div class="sku1">{{sku}}</div>
          <!--<div class="sku1">{{sku | douhao}}</div>-->
          <div class="price1">
						<span>&yen;{{price}}</span>
						<span>x{{num}}</span>
					</div>
				</li>
			</ul>
		</div>
		<div class="orderlist" v-if="ifcart == true" v-for="i in arr" style="border-bottom:1px solid #eee">
			<ul class="ul1">
				<li>
					<div class="img1" :style="{'background-image':'url('+i.goods_pic+')'}"></div>
				</li>
				<li>
					<div class="name2">{{i.goods_name}}</div>
					<div class="sku1">{{i.sku_name}}</div>
					<div class="price1">
						<span>&yen;{{i.shop_price}}</span>
						<span>x{{i.goods_num}}</span>
					</div>
				</li>
			</ul>
		</div>
		<div class="msg">
			<div>
				<span>买家留言：</span>
				<textarea type="text" name="" ref="area" placeholder="140个字以内" v-model="msg" maxlength="150" @keyup="areaNum()"></textarea>
			</div>
		</div>
		<div style="padding:0.17rem 0.17rem;color:#999;">请选择支付方式</div>
		<div class="wechat" v-for="i in payLists">
			<span><i class="icon iconfont icon-pay-wechat"></i>{{i.pay_name}}</span>
			<div class="radio1">
				<span class="limian" :data-id="i.pay_type"></span>
				<input type="checkbox" v-model="ifwechatPay" style="opacity:0">
			</div>
		</div>
		<div class="yue">
			<span>余额：{{yue}}</span>
			<span><mt-switch v-model="value1"></mt-switch></span>
		</div>
		<div class="yue1">
			<span style="line-height:0.682rem;">余额抵扣</span>
			<input style="width: 1rem;text-align:center" type="number" name="" v-model="dikou">
		</div>
		<div class="price">
			<span>商品金额</span>
			<span>&yen;{{resultPrice}}</span>
		</div>
		<div class="yunfei">
			<span>运费</span>
			<span>+ &yen;{{yunfei}}</span>
		</div>
		<div class="dikou">
			<span>余额抵扣</span>
			<span>- &yen;{{dikou}}</span>
		</div>
		<div style="height:0.768rem;"></div>
		<div class="pay">
			<ul>
				<li>
					<span>合计：</span>
					<span>&yen;{{lastPrice}}</span>
				</li>
				<li class="payclass" @click="pay()">
					立即支付
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
	import { Switch,Toast,Indicator } from 'mint-ui';
	import wx from 'weixin-js-sdk';
	export default{
		data(){
			return{
				selectList:'',
				value1:true,
				name:'--',
				sku:'--',
				price:'--',
        resultPrice:'',
				num:'0',
				pic:'',
				yunfei:'0',
				yue:'--',
				deduction:0,
				lastPrice:'--',
				dikou:0,
				msg:'',
				ifwechatPay:true,
				getInfo:true,
				info:true,
				ifcart:false,
				arr:[],
				consignee:'',
				mobile:'',
				address:'',
				payLists:[],
//        opinionnum:140,
			}
		},
		created(){
			var self = this;
			document.title = '确认订单';
			this.global.shouquan();
      this.noShare();
//      获取缓存数据
			this.selectList = window.localStorage.getItem('select');
//      console.log(this.selectList);
      this.selectList = JSON.parse(this.selectList);
      if(this.selectList.consignee_address.address_id == ''){
				this.getInfo = true;
				this.info = false;
			}else{
				this.getInfo = false;
				this.info = true;
				this.consignee = this.selectList.consignee_address.consignee;
				this.mobile = this.selectList.consignee_address.mobile;
				this.address = this.selectList.consignee_address.province+this.selectList.consignee_address.city+this.selectList.consignee_address.district+this.selectList.consignee_address.street;
			}
			if(this.selectList.goods_lst[0].goods_id == this.$route.query.goods_id){
				this.ifcart = false;
				this.name = this.selectList.goods_lst[0].goods_name;
				this.sku = this.selectList.goods_lst[0].sku_name;
				this.price = this.selectList.goods_lst[0].shop_price;
				this.num = this.selectList.goods_lst[0].goods_num;
//商品总价
				this.resultPrice = this.price * this.num;
        this.resultPrice = this.resultPrice.toFixed(2);
				this.pic = this.selectList.goods_lst[0].goods_pic;
				this.yunfei = this.selectList.yunfei;
				if(isNaN(this.yunfei)){
					this.yunfei = 0;
				}
			}else{
//			    购物车多商品状态
				this.ifcart = true;
				this.arr = this.selectList.goods_lst;
        this.resultPrice = this.selectList.goods_total_amount;
        this.resultPrice = this.resultPrice.replace(/,/g, "");
				this.yunfei = this.selectList.shipping_amount;
				$.ajax({
					type:'get',
					url:'../../../static/xml/ChinaArea.xml',
					dataType: 'xml',
					success:function(xml){
						for(let i=0;i<$(xml).find('province').length;i++){
							if(self.selectList.consignee_address.province == $(xml).find('province').eq(i).attr('provinceID')){
								self.selectList.consignee_address.province = $(xml).find('province').eq(i).attr('province');
								var a = $(xml).find('province').eq(i).find('City');
								for(let y=0;y<a.length;y++){
									if(self.selectList.consignee_address.city == a.eq(y).attr('CityID')){
										self.selectList.consignee_address.city = a.eq(y).attr('City');
										var piecearea = a.eq(y).find('Piecearea');
										for(let q=0;q<piecearea.length;q++){
											if(self.selectList.consignee_address.district == piecearea.eq(q).attr('PieceareaID')){
												self.selectList.consignee_address.district = piecearea.eq(q).attr('Piecearea');
											}
										}
									}
								}
							}
						}
						self.address = self.selectList.consignee_address.province+self.selectList.consignee_address.city+self.selectList.consignee_address.district+self.selectList.consignee_address.street;
					}
				})
			}
			this.postData('post','/shop-g1-pay_pay_type.html').then(res => {
				this.payLists = res.data;
			});
			this.getData('get','/shop-v1-user_get_balance.html').then(res => {
				if(res.data.status == 1){
					this.yue = parseFloat(res.data.data.balance)+parseFloat(res.data.data.largess_balance)+parseFloat(res.data.data.recharge_balance);
					this.yue = this.yue.toFixed(2);
          // this.yue = '--';
					// 余额抵扣
          var allPrice = Number(this.resultPrice) + Number(this.yunfei);
          if(!isNaN(this.yue)){
						if(this.yue > 0){
							if(parseFloat(this.yue) > parseFloat(allPrice)){
								this.dikou = allPrice;
								this.lastPrice = 0;
							}else{
								this.dikou = this.yue;
								this.lastPrice = Number(allPrice) - Number(this.dikou);
							}
						}else{
							this.dikou = this.yue;
						}
					}else{
						this.lastPrice = Number(allPrice);
					}
				}else if(res.data.status == 0){
					Toast({
					  message: res.data.msg,
					  iconClass: 'icon iconfont icon-guanbi1',
					  duration: 1000
					});
				}else{
					Toast({
					  message: '获取余额出错',
					  iconClass: 'icon iconfont icon-guanbi1',
					  duration: 1000
					});
				}
			});
		},
		mounted(){
		},
		methods:{
//		    支付
			pay(){
				Indicator.open();
				var self = this;
				this.selectList.balance = this.dikou;
				this.selectList.msg = this.msg;
				this.selectList.payType = $('.limian').eq(0).attr('data-id');
				this.payType = $('.limian').eq(0).attr('data-id');
				// if(this.$route.query.goods_id != null || this.$route.query.goods_id != undefined){
				// 	this.selectList.is_cart = 1;
				// }else{
				// 	this.selectList.is_cart = 0;
				// }
        let goodIds = '';
        if(this.selectList.goods_lst[0].goods_id == this.$route.query.goods_id){
          goodIds = this.$route.query.goods_id;
        }else{
          this.arr.forEach((i,index)=>{
            if(index == 0){
              goodIds += i.goods_id;
            }else{
              goodIds = goodIds +','+i.goods_id;
            }
          });
        }


        if(this.$refs.area.value.length >140){
            this.$nextTick(function () {
              Indicator.close();
            });
          Toast({
            message: '留言字数超出140字',
            iconClass: 'icon iconfont icon-tishi',
            duration: 2000
          });
        }else{
          this.postData('post','/shop-g1-order_validate_goods_status.html',{goods_ids:goodIds}).then(res=> {
            if(res.status == 200){
              if(res.data.status == 1){
                this.postData('post','/shop-g1-pay_order.html',this.selectList).then(res => {
                  Indicator.close();
                  if(res.data.status == 1){
                    if(res.data.is_need_pay == 0){
                      Toast({
                        message: '购买成功',
                        iconClass: 'icon iconfont icon-check',
                        duration: 1000
                      });
                      self.$router.push({path:'/orderCenter'});
                    }else if(res.data.is_need_pay == 1){
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
              }else{
                Toast({
                  message: res.data.msg,
                  iconClass: 'icon iconfont icon-tishi',
                  duration: 3000
                });
              }
            }
            Indicator.close();
          });
        }
			},
//      修改地址
			changeAddress(){
				this.$router.push({path:'/chooseAddress',query:{'goods_id':this.$route.query.goods_id}})
			},
//      限制留言字数
      areaNum(){
			    let num = 0;
			    num = this.$refs.area.value.length;
			    if(num > 140){
            Toast({
              message: '请输入140个字数内的留言，当前'+num+'字',
              iconClass: 'icon iconfont icon-tishi',
              duration: 1000
            });
          }
      }
		},
		watch:{
//		    余额抵扣计算
			dikou(val,oldval){

        var allPrice = Number(this.resultPrice) + Number(this.yunfei);
				if(!isNaN(this.yue)){
					if(parseFloat(val) > parseFloat(this.yue)){
						this.dikou = 0;
						Toast({
						  message: '输入金额不能大于余额',
						  iconClass: 'icon iconfont icon-guanbi1',
						  duration: 1000
						});
					}else if(parseFloat(val) < parseInt(0)){
						this.dikou = 0;
						Toast({
						  message: '不能输入负数',
						  iconClass: 'icon iconfont icon-guanbi1',
						  duration: 1000
						});
					}else if(parseFloat(val) > parseFloat(allPrice)){
						this.dikou = 0;
						Toast({
						  message: '不能大于合计',
						  iconClass: 'icon iconfont icon-guanbi1',
						  duration: 1000
						});
					}
					this.lastPrice = Number(allPrice) - Number(this.dikou);
					this.lastPrice = this.lastPrice.toFixed(2);
				}else{
					this.dikou = 0;
				}
			},
//      是否可以支付
			ifwechatPay(val,oldval){
				if(val == false){
					$('.limian').eq(0).removeClass('limian');
					$('.payclass').eq(0).css('background-color','#999');
				}else if(true){
					$('.radio1').eq(0).find('span').addClass('limian');
					$('.payclass').eq(0).css('background-color','#ef4949');
				}
			},
//      是否使用余额
			value1(val,oldval){
				if(val == true){
					this.dikou = 0;
				}else{
					this.dikou = 0;
				}
			},
			douhao(val,oldval){
				val = val.replace(/_/, ",");
				return val;
			}
		}
	}
</script>
<style lang="less">
	.confirmOrder{
		font-size: 0.205rem;
		width: 100%;
		font-size: 0.222rem;
		color: #333;
		.getInfo{
			width: 100%;
			height: 0.95rem;
			background-color: #fff;
			margin-bottom: 0.17rem;
			color: #666;
			font-size: 0.222rem;
			span{
				line-height: 0.95rem;
			}
			i{
				position: relative;
    			top: 0.05rem;
    			margin-left: 0.17rem;
			}
		}
		.info{
			width: 100%;
			background-color: #fff;
			height: auto;
			padding-top: 0.25rem;
			position: relative;
			margin-bottom: 0.17rem;
			.icon-next-page{
				position: absolute;
				right: 0.17rem;
				font-size: 0.3rem;
				top: 0.5rem;
				color: #999;
			}
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
							color: #999;
							float: right;
						}
					}
				}
			}
		}
		.msg{
			background-color: #fff;
			padding: 0.25rem 0.17rem;
			width: calc(~"100% - 0.34rem");
			margin-top: 0.17rem;
			span{
				display: inline-block;
    			vertical-align: top;
			}
			textarea{
				border: 0;
				outline-style: none;
				width: 4.8rem;
				height: 1.2rem;
				-webkit-appearance: none;
        resize : none;
        border: none;
        overflow-wrap:break-word;
        word-wrap:break-word;
        word-break:break-all;
			}
		}
		.wechat{
			background-color: #fff;
			padding: 0.17rem 0.17rem;
			width: calc(~"100% - 0.34rem");
			margin-bottom: 0.17rem;
			i{
				font-size: 0.25rem;
				color: #24af41;
				margin-right: 0.08rem;
			}
			.radio1{
				width: 0.3rem;
				height: 0.3rem;
				border-radius: 50%;
				border:1px solid #eee;
				display: inline-block;
				float: right;
				position: relative;
				.limian{
					width: 0.2rem;
					height: 0.2rem;
					border-radius: 50%;
					background-color: #24af41;
					display: inline-block;
					margin-left: 0.05rem;
					margin-top: 0.05rem;
				}
				input{
					// display: none;
					position: absolute;
					top: 0;
				}
			}
		}
		.yue{
			background-color: #fff;
			height: 0.682rem;
			width: calc(~"100% - 0.34rem");
			padding: 0 0.17rem;
			border-bottom: 1px solid #eee;
			span:nth-child(1){
				line-height: 0.682rem;
				font-size: 0.222rem;
			}
			span:nth-child(2){
				display: inline-block;
			    vertical-align: top;
			    float: right;
			    margin-top: 0.04rem;
			}
			.mint-switch-input:checked + .mint-switch-core{
				border-color: #24af41;
    			background-color: #24af41;
			}
			.mint-switch{
				transform: scale(0.8);
			}
		}
		.yue1{
			background-color: #fff;
			height: 0.682rem;
			width: calc(~"100% - 0.34rem");
			padding: 0 0.17rem;
			margin-bottom: 0.17rem;
			input{
				float: right;
				margin-top: 0.17rem;
				outline-style: none;
				-webkit-appearance: none;
				border:1px solid #ddd;
			}
		}
		.price,.yunfei,.dikou{
			height: 0.682rem;
			width: calc(~"100% - 0.34rem");
			background-color: #fff;
			padding-left: 0.17rem;
			padding-right: 0.17rem;
			line-height: 0.682rem;
			span:nth-child(2){
				float: right;
				color: #ef4949;
			}
		}
		.pay{
			height: 0.768rem;
			width: 100%;
			background-color: #fff;
			border-top: 1px solid #eee;
			position: fixed;
			bottom: 0;
			ul{
				width: 100%;
				li{
					float: left;
				}
				li:nth-child(1){
					width: calc(~"100% - 2.133rem");
					line-height: 0.768rem;
					font-size: 0.239rem;
					span:nth-child(1){
						margin-left: 0.17rem;
					}
					span:nth-child(2){
						color: #ef4949;
					}
				}
				li:nth-child(2){
					width: 2.133rem;
					text-align: center;
					line-height: 0.768rem;
					background-color: #ef4949;
					color: #fff;
					font-size: 0.256rem;
				}
			}
		}
	}
</style>
