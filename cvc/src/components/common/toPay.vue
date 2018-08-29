<template>
	<div class="contentPay" style="background-color:#f1f2f6;width:100%;overflow-x:hidden">
		<div class="title" style="margin-top:0.2rem;" v-if="!package && this.$route.query.askId == undefined">
			<ul>
				<li>
					<img :src="pic">
				</li>
				<li>
					<div class="wenzi">
						<div class="biaoti">{{title}}</div>
						<div class="yuanjia" v-if="is_free == 1 && saleOn == 0">&yen;{{total_fee}}</div>
						<div style="text-decoration:line-through;" class="yuanjia" v-if="is_free == 1 && saleOn == 1">&yen;{{total_fee}}</div>
						<div class="cuxiao" v-if="is_free == 1 && saleOn == 1">&yen;{{sales_fee}}</div>
						<div class="yuanjia" style="width: 100%">
              &yen;{{price}}
              <span v-if="shopNum" style="width: 75%;text-align: right;display: inline-block;font-size: 0.24rem;color: #999;">x&nbsp{{shopNum}}</span>
            </div>
					</div>
				</li>
			</ul>
		</div>
		<div class="title" style="margin-top:0.2rem;" v-for="item in arr" v-if="package">
			<ul>
				<li>
					<img :src="item.pic">
				</li>
				<li>
					<div class="wenzi">
						<div class="biaoti">{{item.title}}</div>
						<div class="yuanjia">{{item.total_fee}}</div>
					</div>
				</li>
			</ul>
		</div>
    <div class="groupPay" v-if="this.$route.query.p_id" >
      <div class="payWay">请选择支付方式</div>
      <div class="payWay1" style="background-color:#fff;">
        <ul>
          <li v-if="1" style="border-top:0;"><img src="../../../static/img/wechat.png"><span>微信支付</span></li>
          <li>
						<span class="radio" style=" border: 1px solid rgb(51, 133, 255);color: rgb(51, 133, 255);">
                <i class="iconfont icon-dui1" style="font-size: 0.28rem"></i>
						</span>
          </li>
        </ul>
      </div>
    </div>
		<div class="yue" style="background-color:#fff">
			<span class="moneys" style="line-height: 0.7rem;display: inline-block;padding-left: 0.17rem;">余额:{{yue}}</span>
			<div class="ifApply"><mt-switch v-model="value"></mt-switch></div>
		</div>
		<div class="yihang" style="background-color:#fff" v-if="yuequ">
			<ul>
				<li>余额抵扣</li>
				<li>
					<input type="text" name="" v-model="realFee" style="width: 1.2rem;height: 0.4rem;text-align:center;border:1px solid #999;outline-style: none;">
				</li>
			</ul>
		</div>
		<div class="yihang" style="background-color:#fff">
			<ul>
				<li><span v-if="!package">小计</span><span v-if="package">应付金额</span></li>
				<li style="font-weight: 500;">&yen{{finFee}}<span v-if="points != ''?true:false" style="color:#666"> ({{points}}积分)</span></li>
			</ul>
		</div>
		<div class="yihang" style="background-color:#fff" v-if="package">
			<ul>
				<li><span>原价</span></li>
				<li style="font-weight: 500;">&yen{{zongjia}}</li>
			</ul>
		</div>
		<div class="yihang" style="background-color:#fff" v-if="package">
			<ul>
				<li><span>套餐优惠</span></li>
				<li style="font-weight: 500;">-{{zongjia - price}}</li>
			</ul>
		</div>
		<div v-if="this.$route.query.askId">
			<div class="payWay">请选择支付方式</div>
			<div class="payWay1" style="background-color:#fff;" v-for="item in paytype">
				<ul>
					<li v-if="item.pay_type==1" style="border-top:0;"><img src="../../../static/img/wechat.png"><span>微信支付</span></li>
					<li v-if="item.pay_type==0"><img src="../../../static/img/jifen.png"><span>积分支付<span style="color:#999;margin-left:0;font-size:0.23rem;">（{{points1}}积分）</span></span></li>
					<li>
						<span class="radio">
							<input type="radio" name="paytype" :value="item.pay_type" v-model="toggle">
						</span>
					</li>
				</ul>
			</div>
		</div>

    <div class="lessTip" v-show="lessTip">
			余额抵扣和价格相同，需付款0.01元
		</div>
		<div class="fin" style="background-color:#fff">
			<ul>
				<li><span>实付款:&yen{{finFee}}</span></li>
				<li @click="toPay()">提交订单</li>
			</ul>
		</div>
	</div>
</template>
<script>
	import axios from 'axios';
	import { Switch,Toast,Indicator } from 'mint-ui';
	export default{
		data(){
			return{
				value:false,
				payWay:'',
				select:true,
				select2:false,
				selected:{
					border:'1px solid #3385ff',
					color:"#3385ff",
				},
				title:'',
				pic:"",
				total_fee:'',
				sales_fee:'',
				yue:0,
				finFee:'',
				realFee:'',
				lessTip:false,
				yuequ:false,
				saleOn:'',
				is_free:'',
				price:'',
				paytype:[],
				toggle:'1',
				arr:[],
				package:false,
				zongjia:'',
				points:'',
				points1:'',
        realVal:0,
        groupId:'',
        shopNum:1,
			}
		},
		created(){
			console.log(this.$route.query.askId1)
			if(window.location.href.indexOf('askId') != -1){
				document.title = '问答付费'
			}else{
				document.title = '提交订单'
			}
			this.global.shouquan();
			this.noShare();
			if(window.location.href.indexOf('askId') != -1){
				this.postData('post','/shop-v2-ask_get_fee.html',{fee_type:this.$route.query.order_type,is_public:this.$route.query.is_public}).then(res => {
					// this.pic = res.data.pic;
					// this.title = res.data.title;
					this.price = res.data.total_fee;
					this.finFee = res.data.total_fee;
					this.points = res.data.points;
				});
				if(this.$route.query.order_type == 1){
					// 提问
					this.postData('post','/shop-v2-ask_pay_type.html',{order_type:this.$route.query.order_type}).then(res => {
						this.paytype = res.data;
					})
				}else{
					// 偷听
					this.postData('post','/shop-v2-ask_pay_type.html',{order_type:this.$route.query.order_type}).then(res => {
						this.paytype = res.data;
					})
					this.postData('post','/shop-v1-user_base_info.html').then(res => {
						this.points1 = res.data.data.points;
					})
				}
			}else if(window.location.href.indexOf('cs_id') != -1){
				this.package = true;
				console.log(this.package)
				this.postData('post','/shop-v1-pay_pay_msg.html',{type:this.$route.query.type,cs_id:this.$route.query.cs_id}).then(res => {
					this.pic = res.data.pic;
					this.arr = res.data.lst;
					this.price = res.data.total_fee;
					this.finFee = res.data.total_fee;
					this.zongjia = res.data.price;
				})
			}else if(window.location.href.indexOf('p_id') != -1){
				//	拼团活动
		        this.postData('post','/shop-v1-pay_pay_msg.html',{type:this.$route.query.type,p_id:this.$route.query.p_id}).then(res => {
		          this.pic = res.data.proInfo.pic;
		          this.title = res.data.proInfo.title;
		          this.price = res.data.total_fee;
		          this.finFee = res.data.total_fee;
		          this.zongjia = res.data.total_fee;
		          this.groupId = res.data.proInfo.id;
		        });
			}else if(window.location.href.indexOf('art_id') != -1){
				// 文章付费
				this.postData('post','/shop-v1-pay_pay_msg.html',{type:this.$route.query.type,art_id:this.$route.query.art_id}).then(res => {
					this.pic = res.data.pic;
					this.title = res.data.title;
					this.price = res.data.total_fee;
					this.finFee = res.data.total_fee;
					this.total_fee = res.data.total_fee;
					this.sales_fee = res.data.total_fee;
					this.saleOn = 0;
					this.is_free = 0;
		        });
			}else{
			    if((window.location.href.indexOf('ser_id') != -1||window.location.href.indexOf('vid') != -1) && this.$route.query.order_type == 2){
					//			       获取课程数量
		            this.shopNum = this.$route.query.number?this.$route.query.number:1;
		        }

		        this.postData('post','/shop-v1-pay_pay_msg.html',{type:this.$route.query.type,vid:this.$route.query.vid,ser_id:this.$route.query.ser_id,a_id:this.$route.query.a_id}).then(res => {
		          if(res.data != null){
		            this.title = res.data.ser_title?res.data.ser_title:res.data.title;
		            this.pic = res.data.pic?res.data.pic:res.data.active_img;
		            this.total_fee = res.data.total_fee;
		            this.sales_fee = res.data.sales_fee;
		            this.saleOn = res.data.sales_on;
		            this.is_free = res.data.is_free;
		            if(this.$route.query.a_id != undefined){
		              this.price = res.data.price
		            }else{
		            	this.price = res.data.total_fee
		            }
		            if(this.sales_fee == undefined){
		              if(this.$route.query.a_id != undefined){
		                this.finFee = this.price
		              }else{

		                this.finFee = this.total_fee *this.shopNum;
		              }
		            }else{
		              this.finFee = this.sales_fee;
		            }
		          }
		        });
      		}
			this.getData('get','/shop-v1-user_get_balance.html').then(res => {
				if(res.data.status == 1){
		          this.yue = parseFloat(res.data.data.balance) + parseFloat(res.data.data.largess_balance) + parseFloat(res.data.data.recharge_balance);
		          this.yue = this.yue.toFixed(2);
				}
			})
		},
		methods:{
			wechat(){
				this.select = !this.select;
				this.select2 = false;
			},
			alipay(){
				this.select2 = !this.select2;
				this.select = false;
			},
			toPay(){
				var self = this;
				function ifpay(type,order_no,member_id){
					// 付款成功
					if(type == 'ser_id'){
						self.$router.push({path:'/successPay',query:{'ser_id':self.$route.query.ser_id,'order_type':self.$route.query.order_type,orderNo:order_no,member_id:member_id}})
					}else if(type == 'vid'){
						self.$router.push({path:'/successPay',query:{'vid':self.$route.query.vid,'order_type':self.$route.query.order_type,orderNo:order_no,member_id:member_id}})
					}else if(type == 'a_id'){
						self.$router.push({path:'/successPay',query:{a_id:self.$route.query.a_id}})
					}else if(type == 'cs_id'){
						Toast({
							message:'购买成功',
							duraction:500
						})
						self.$router.push({path:'/mine-course'})
					}else if(type == 'art_id'){

					}
				}
				Indicator.open({
				  text: '提交中',
				  spinnerType: 'fading-circle'
				});
				if(window.location.href.indexOf('vid') != -1 && window.location.href.indexOf('askId') == -1){
					this.postData('post','/shop-v1-pay_order.html',{vid:this.$route.query.vid,type:'1',balance:this.realFee,order_type:this.$route.query.order_type,number:this.shopNum}).then(res => {
						if(res.data.status == 1){
							Indicator.close();
							if(res.data.is_need_pay == 0){
								ifpay('vid',res.data.order_no,res.data.member_id);
							}else if(res.data.is_need_pay == 1){
								this.$router.push({path:'/payWay',query:{orderNo:res.data.order_no,type:this.$route.query.type,'vid':this.$route.query.vid,'member_id':res.data.member_id,'order_type':this.$route.query.order_type
								}})
							}
						}else if(res.data.status == 0){
							Indicator.close();
							Toast({
								message:res.data.msg,
								duraction:500
							})
						}
					})
				}else if(window.location.href.indexOf('ser_id') != -1  && window.location.href.indexOf('askId') == -1){
					this.postData('post','/shop-v1-pay_order.html',{ser_id:this.$route.query.ser_id,type:'2',balance:this.realFee,order_type:this.$route.query.order_type,number:this.shopNum}).then(res => {
						if(res.data.status == 1){
							Indicator.close();
							if(res.data.is_need_pay == 0){
								ifpay('ser_id',res.data.order_no,res.data.member_id);
							}else if(res.data.is_need_pay == 1){
								this.$router.push({path:'/payWay',query:{orderNo:res.data.order_no,type:this.$route.query.type,'ser_id':this.$route.query.ser_id,'member_id':res.data.member_id,'order_type':this.$route.query.order_type
								}});
							}
						}else if(res.data.status == 0){
							Indicator.close();
							Toast({
								message:res.data.msg,
								duraction:500
							})
						}
					})
				}else if(window.location.href.indexOf('a_id') != -1){
					this.postData('post','/shop-v1-pay_order.html',{a_id:this.$route.query.a_id,type:'3',balance:this.realFee,order_type:this.$route.query.order_type}).then(res => {
						if(res.data.status == 1){
							Indicator.close();
							if(res.data.is_need_pay == 0){
								ifpay('a_id');
							}else if(res.data.is_need_pay == 1){
								this.$router.push({path:'/payWay',query:{orderNo:res.data.order_no,type:this.$route.query.type,'a_id':this.$route.query.a_id,'member_id':res.data.member_id,'order_type':this.$route.query.order_type
								}})
							}
						}else if(res.data.status == 0){
							Indicator.close();
							Toast({
								message:res.data.msg,
								duraction:500
							})
						}
					})
				}else if(window.location.href.indexOf('askId') != -1){
					if(this.$route.query.type == 2){
						var type = 4
					}else if(this.$route.query.type == 1){
						var type = 4
					}
					this.postData('post','/shop-v2-ask_order.html',{id:this.$route.query.askId,type:this.$route.query.type,balance:this.realFee,other_type:this.$route.query.order_type,pay_type:this.toggle}).then(res => {
						if(res.data.status == 1){
							Indicator.close();
							if(this.toggle == 0){
								// if(window.location.href.indexOf('ser_id') != -1){
								// 	self.$router.push({path:'/successPay',query:{'ser_id':self.$route.query.ser_id}})
								// }else if(window.location.href.indexOf('vid') != -1){
								// 	self.$router.push({path:'/successPay',query:{'vid':self.$route.query.vid}})
								// }else{
								// 	Toast({
								// 		message:'支付成功',
								// 		duraction:500
								// 	})
								// 	self.$router.push({path:'/reply2',query:{type:this.$route.query.type,id:this.$route.query.askId,ser_id:this.$route.query.ser_id,status:this.$route.query.status}})
								// }
								Toast({
									message:'支付成功',
									iconClass: 'icon icon-dui1',
									duraction:500
								})
								self.$router.push({path:'/reply2',query:{type:this.$route.query.type,id:this.$route.query.askId,ser_id:this.$route.query.ser_id,status:this.$route.query.status}})
							}else if(this.toggle == 1){
								if(res.data.is_need_pay == 1){
									if(window.location.href.indexOf('ser_id') != -1){
										this.$router.push({path:'/payWay',query:{orderNo:res.data.order_no,type:type,pay_type:this.toggle,'ser_id':self.$route.query.ser_id,'askId':self.$route.query.askId}});
									}else if(window.location.href.indexOf('vid') != -1){
										this.$router.push({path:'/payWay',query:{orderNo:res.data.order_no,type:type,pay_type:this.toggle,'vid':self.$route.query.vid,'askId':self.$route.query.askId}});
									}else{
										this.$router.push({path:'/payWay',query:{orderNo:res.data.order_no,type:type,pay_type:this.toggle,'askId':self.$route.query.askId}});
									}
								}else if(res.data.is_need_pay == 0){
									// Toast({
				     //        			message:'支付成功，可以在个人中心-我的问题，查看提问的问题',
				     //        			duraction:'3000'
				     //        		})
				            		if(window.location.href.indexOf('vid') != -1){
				            			this.$router.push({path:'/successPay',query:{'vid':this.$route.query.vid,askId:this.$route.query.askId}})
				            		}else{
				            			this.$router.push({path:'/successPay',query:{'ser_id':this.$route.query.ser_id,askId:this.$route.query.askId}})
				            		}
				            		// this.$router.push({path:'/problemDetails',query:{'id':this.$route.query.askId}})
								}
							}
						}else if(res.data.status == 0){
							Indicator.close();
							Toast({
								message:res.data.msg,
								duraction:500
							})
						}
					})
				}else if(window.location.href.indexOf('cs_id') != -1){
					this.postData('post','/shop-v1-pay_order.html',{cs_id:this.$route.query.cs_id,type:'3',balance:this.realFee,type:this.$route.query.type}).then(res => {
						if(res.data.status == 1){
							Indicator.close();
							if(res.data.is_need_pay == 0){
								ifpay('cs_id');
							}else if(res.data.is_need_pay == 1){
								this.$router.push({path:'/payWay',query:{type:this.$route.query.type,'cs_id':this.$route.query.cs_id,orderNo:res.data.order_no}});
							}
						}else if(res.data.status == 0){
							Indicator.close();
							Toast({
								message:res.data.msg,
								duraction:500
							})
						}
					})
				}else if(window.location.href.indexOf('p_id') != -1){
				  //拼团支付
		          this.postData('post','/shop-v1-pay_order.html',{p_id:this.$route.query.p_id,type:'7',balance:this.realVal,group_type:this.$route.query.group_type}).then(res => {
		            if(res.data.status != 0){
		              if(res.data.is_need_pay != 0){
		              	console.log(111)
		                Indicator.close();
		                var self = this;
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
		                        // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
		                        if(window.location.href.indexOf('shipin') != -1){
						          self.$router.push({path:'/successPay',query:{p_id:self.groupId,'shipin':this.$route.query.shipin}});
						        }else{
						          self.$router.push({path:'/successPay',query:{p_id:self.groupId,'course':this.$route.query.course}});
						        }
		                      }else{
		                        if(window.location.href.indexOf('shipin') != -1){
						          self.$router.push({path:'/failPay',query:{p_id:self.groupId,'shipin':this.$route.query.shipin}});
						        }else{
						          self.$router.push({path:'/failPay',query:{p_id:self.groupId,'course':this.$route.query.course}});
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
		              }else{
		              	console.log(222)
		                  this.$nextTick(function () {
		                    Indicator.close();
		                    // this.$router.push({path:'/successPay',query:{p_id:this.groupId}});
		                    if(window.location.href.indexOf('shipin') != -1){
					          this.$router.push({path:'/successPay',query:{p_id:this.groupId,'shipin':this.$route.query.shipin}});
					        }else{
					          this.$router.push({path:'/successPay',query:{p_id:this.groupId,'course':this.$route.query.course}});
					        }
		                  });
		              }

		            }else{
		              Indicator.close();
		              Toast({
		                message:res.data.msg,
		                duraction:500
		              })
		            }
		          })

        		}else if(window.location.href.indexOf('art_id') != -1){
        			// 文章付款
        			var art_id = self.$route.query.art_id;
        			this.postData('post','/shop-v1-pay_order.html',{art_id:this.$route.query.art_id,type:10,balance:this.realVal}).then(res => {
			            if(res.data.status != 0){
			            	// 需要付款
			              if(res.data.is_need_pay != 0){
			                Indicator.close();
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
							       function(res2){     
							           if(res2.err_msg == "get_brand_wcpay_request:ok" ) {
							           		self.$router.push({path:'/successPay',query:{'art_id':self.$route.query.art_id}});
							           	
							           }else{
							           		self.$router.push({path:'/failPay',query:{'art_id':art_id}})
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
			              }else{
			              	// 余额抵扣不需付款
			                  this.$nextTick(function () {
			                    Indicator.close();
			                    this.$router.push({path:'/successPay',query:{art_id:this.$route.query.art_id}});
			                  });
			              }

			            }else{
			              Indicator.close();
			              Toast({
			                message:res.data.msg,
			                duraction:500
			              })
			            }
			         })
        		}
			}
		},
		watch:{
			value(val,oldVal){
        if(this.sales_fee == undefined || this.sales_fee == ''){
					if(this.$route.query.p_id != undefined ||this.$route.query.a_id != undefined || this.$route.query.askId != undefined || this.$route.query.cs_id != undefined){
						var money = this.price
					}else{
						var money = this.total_fee*this.shopNum;
					}
				}else{
					var money = this.sales_fee;
				}
				if(val == true){
					this.yuequ = true;
					this.realFee = '';
					this.finFee = money
				}else if(val == false){
					this.yuequ = false;
					this.realFee = '';
					this.finFee = money
				}
			},
			realFee(val,oldVal){
				if(this.sales_fee == undefined || this.sales_fee == ''){
					if(this.$route.query.p_id != undefined || this.$route.query.a_id != undefined || this.$route.query.askId != undefined || this.$route.query.cs_id != undefined){
						var money = this.price
					}else{
						var money = this.total_fee*this.shopNum;
					}
				}else{
					var money = this.sales_fee;
				}
				if(val != ''){
					this.lessTip = false
					if(isNaN(val) == false){
						if(parseFloat(val) <= parseFloat(this.yue)){
							if(parseFloat(val) <= parseFloat(money) && parseFloat(val) >= 0){
								if(val.indexOf('.') != -1){
									var a= val.indexOf('.')
									if(val.substr(a).length-1 > 2){
										Toast({
											message:'小数点后数字最多两位',
											duraction:'500'
										});
										this.realFee = '';
										this.finFee = money
									}else{
										this.finFee = Number(money - val).toFixed(2);
									}
								}else{
									this.finFee = Number(money - val).toFixed(2);
								}
							}else{
								Toast({
									message:'余额抵扣不能超过原价',
									duraction:'500'
								});
								this.realFee = '';
								this.finFee = money
							}
						}else{
						}
					}else{
						this.realFee = '';
						Toast({
							message:'请输入数字',
							duraction:'500'
						});
						this.finFee = money
					}
					if(parseFloat(val)>parseFloat(this.yue) || Number(val)>Number(this.yue)){
						Toast({
							message:'不能超过余额',
							duraction:'500'
						});
						this.realFee = '';
						this.finFee = money
					}
					// if(this.finFee == 0 && window.location.href.indexOf('p_id') == -1 && window.location.href.indexOf('ser_id') == -1 && window.location.href.indexOf('vid') == -1 && window.location.href.indexOf('a_id') == -1){
					// 	this.finFee = 0.01;
					// 	this.lessTip = true;
					// }
				}else{
					this.finFee = money;
				}
		        this.realVal = val;
		      },
		      finFee(val,oldVal){
		      	var val = parseFloat(val).toFixed(2)
		      	return val;
		      }
		},
	}
</script>
<style>
	.contentPay .lessTip{
		height: 0.5rem;
	    width: 100%;
	    background: #f7c83b;
	    position: fixed;
	    bottom: 0.8rem;
	    color: #fff;
	    text-align: center;
	    line-height: 0.5rem;
	}
	.contentPay .payTitle{
		height:0.8rem;width:100%;text-align:center;line-height:0.8rem;background-color:#fff;margin-bottom:0.2rem;border-bottom:1px solid #e1e1e1
	}
	.contentPay .yihang{
		width: 100%;
		height: 0.7rem;
		background-color: #fff;
		line-height: 0.7rem;
		border-top: 1px solid #e1e1e1;
	}
	.contentPay .yihang ul li:nth-child(1){
		padding-left: 0.17rem;
	}
	.contentPay .yihang ul li:nth-child(2){
		padding-right: 0.17rem;
		float: right;
	}
	.contentPay .yihang ul li{
		float: left;
	}
	.contentPay .fin{
		height: 0.8rem;
		width: 100%;
		background-color: #fff;
		line-height: 0.8rem;
		position: fixed;
		bottom: 0px;
	}
	.contentPay .fin ul li{
		float: left;
	}
	.contentPay .fin ul li:nth-child(1){
		/*padding-left: 0.17rem;*/
		width: 4.4rem;
		line-height: 0.8rem;
		font-weight: 500;
	}
	.contentPay .fin ul li:nth-child(1) span{
		display: inline-block;
		margin-left: 0.17rem;
	}
	.contentPay .fin ul li:nth-child(2){
		width: calc(100% - 4.4rem);
		height: 0.8rem;
		background-color: #222;
		color: #fff;
		text-align: center;
	}
	.contentPay{
		background-color: #f1f2f6;
		height: 100%;
		font-size: 0.27rem;
		-webkit-overflow-scrolling:touch；
	}
	.contentPay .title{
		background-color: #fff;
		height: 1.96rem;
		width: 100%;
	}
	.contentPay .title ul li{
		float: left;
	}
	.contentPay .title ul li:nth-child(1){
		height: 1.96rem;
		width: 1.7rem;
	}
	.contentPay .title ul li:nth-child(1) img{
		width: 1.36rem;
		height: 1.36rem;
		margin-top: 0.3rem;
		margin-left: 0.17rem;
	}
	.contentPay .title ul li:nth-child(2){
		width: calc(100% - 1.7rem);
		display: table;
		height: 1.96rem;
	}
	.contentPay .title ul li .wenzi{
		display: table-cell;
    	vertical-align: middle;
    	line-height: 0.38rem;
	}
	.contentPay .biaoti{
		overflow: hidden;
	    text-overflow: ellipsis;
	    width: 4.6rem;
	    color: #333;
	    display: -webkit-box;
	    -webkit-box-orient: vertical;
	    -webkit-line-clamp: 2;
	    overflow: hidden;
	}
	.contentPay .yuanjia,.cuxiao{
		color: #ef3230;
		display: inline-block;
		margin-left: 0.1rem;
	}
	.contentPay .ifApply{
		display: inline-block;
		float: right;
		padding-right: 0.07rem;
	}
	.contentPay .yue .moneys{
		line-height: 0.7rem;
		display: inline-block;
		padding-left: 0.17rem;
	}
	.contentPay .yue{
		height: 0.7rem;
		width: 100%;
		background-color: #fff;
		margin-top: 0.2rem;
	}
	.contentPay .mint-switch{
		transform: scale(0.8);
		margin-top: 0.05rem;
	}
	.contentPay .payWay{
		background-color: #fff;
		padding-left: 0.17rem;
		height: 0.55rem;
		line-height: 0.55rem;
		margin-top: 0.2rem;
	}
	.contentPay .payWay1{
		height: 0.8rem;
		background-color: #fff;
		border-top: 1px solid #e1e1e1;
	}
	.contentPay .payWay1 ul li{
		float: left;
	}
	.contentPay .payWay1 ul li:nth-child(1){
		padding-left: 0.17rem;
		line-height: 0.8rem;
	}
	.contentPay .payWay1 ul li:nth-child(1) img{
		height: 0.4rem;
		position: relative;
    	top: 0.1rem;
	}
	.contentPay .payWay1 ul li:nth-child(1) span{
		display: inline-block;
		margin-left: 0.2rem;
	}
	.contentPay .payWay1 ul li:nth-child(2){
		float: right;
	}
	.contentPay .payWay1 ul li:nth-child(2) .radio{
		width: 0.4rem;
	    height: 0.4rem;
	    background-color: #fff;
	    display: inline-block;
	    border-radius: 0.4rem;
	    margin-top: 0.2rem;
	    margin-right: 0.17rem;
	    text-align: center;
	    line-height: 0.4rem;
	    color: #fff;
	}
</style>
