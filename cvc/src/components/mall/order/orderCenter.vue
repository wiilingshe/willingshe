<template>
	<div class="orderCenter">
		<mt-navbar v-model="selected">
		  <mt-tab-item id="6">全部</mt-tab-item>
		  <mt-tab-item id="0">待付款</mt-tab-item>
		  <mt-tab-item id="1">待发货</mt-tab-item>
		  <mt-tab-item id="2">已发货</mt-tab-item>
		  <mt-tab-item id="3">已收货</mt-tab-item>
		  <mt-tab-item id="4">已完成</mt-tab-item>
		  <!-- <mt-tab-item id="4">退款</mt-tab-item>
		  <mt-tab-item id="5">关闭订单</mt-tab-item> -->
		</mt-navbar>

		<!-- tab-container -->
		<mt-tab-container v-model="selected">
		  <mt-tab-container-item id="6">
		  	<div class="lists6" v-infinite-scroll="loadMore" infinite-scroll-disabled="false" infinite-scroll-immediate-check="false">
			  	<div class="list" v-for="i in arr">
			  		<div class="time1">
			  			<span>
			  				下单时间：{{i.create_time}}
			  			</span>
			  			<span>
			  				{{i.order_status}}
			  			</span>
			  		</div>
			  		<div class="orderlist" style="border-bottom:1px solid #eee" v-for="s in i.order_item_list" @click="toDetails(i.order_no)">
						<ul class="ul1">
							<li>
								<div class="img1" :style="{'background-image':'url('+s.goods_pic+')'}"></div>
							</li>
							<li>
								<div class="name2">{{s.goods_name}}</div>
								<div class="sku1">{{s.sku_name}}</div>
								<div class="price1">
									<span>&yen;{{s.shop_price}}</span>
									<span>&yen;{{s.market_price}}</span>
									<span>x{{s.goods_num}}</span>
								</div>
							</li>
						</ul>
					</div>
					<div class="price">
						<span>合计：&yen;{{i.order_money}}</span>
						<span>共{{i.order_item_list.length}}件商品</span>
					</div>
					<div class="caozuo" v-if="i.member_operation.length != 0">
						<div style="float:right">
							<span v-for="x in i.member_operation" @click="operating(x.action,i.order_no,$event)" v-if="!(i.is_evaluate>0&& x.action == 'to_comment')">{{x.name}}</span>
						</div>
					</div>
			  	</div>
          <div class="commentNull" v-if="arr && arr.length == 0" style="text-align: center;padding: 0.5rem 0;color: #999999">
            <i class="icon iconfont icon-empty" style="font-size: 1.8rem"></i>
            <p style="font-size: 0.3rem">暂无订单</p>
          </div>
			  	<loadNo v-show="!ifLoad"></loadNo>
			  	<footer1 v-show="!ifLoad"></footer1>
		  	</div>
		  </mt-tab-container-item>
		  <mt-tab-container-item id="0">
		  	<div class="lists6" v-infinite-scroll="loadMore" infinite-scroll-disabled="false" infinite-scroll-immediate-check="false">
			  	<div class="list" v-for="i in arr">
			  		<div class="time1">
			  			<span>
			  				下单时间：{{i.create_time}}
			  			</span>
			  			<span>
			  				{{i.order_status}}
			  			</span>
			  		</div>
			  		<div class="orderlist" style="border-bottom:1px solid #eee" v-for="s in i.order_item_list" @click="toDetails(i.order_no)">
						<ul class="ul1">
							<li>
								<div class="img1" :style="{'background-image':'url('+s.goods_pic+')'}"></div>
							</li>
							<li>
								<div class="name2">{{s.goods_name}}</div>
								<div class="sku1">{{s.sku_name}}</div>
								<div class="price1">
									<span>&yen;{{s.shop_price}}</span>
									<span>&yen;{{s.market_price}}</span>
									<span>x{{s.goods_num}}</span>
								</div>
							</li>
						</ul>
					</div>
					<div class="price">
						<span>合计：&yen;{{i.order_money}}</span>
						<span>共{{i.order_item_list.length}}件商品</span>
					</div>
					<div class="caozuo" v-if="i.member_operation.length != 0">
						<div style="float:right">
							<span v-for="x in i.member_operation" @click="operating(x.action,i.order_no,$event)" v-if="!(i.is_evaluate>0&& x.action == 'to_comment')">{{x.name}}</span>
						</div>
					</div>
			  	</div>
          <div class="commentNull" v-if="arr && arr.length == 0" style="text-align: center;padding: 0.5rem 0;color: #999999">
            <i class="icon iconfont icon-empty" style="font-size: 1.8rem"></i>
            <p style="font-size: 0.3rem">暂无订单</p>
          </div>
          <loadNo v-show="!ifLoad"></loadNo>
			  	<footer1 v-show="!ifLoad"></footer1>
		  	</div>
		  </mt-tab-container-item>
		  <mt-tab-container-item id="1">
		  	<div class="lists6" v-infinite-scroll="loadMore" infinite-scroll-disabled="false" infinite-scroll-immediate-check="false">
			  	<div class="list" v-for="i in arr">
			  		<div class="time1">
			  			<span>
			  				下单时间：{{i.create_time}}
			  			</span>
			  			<span>
			  				{{i.order_status}}
			  			</span>
			  		</div>
			  		<div class="orderlist" style="border-bottom:1px solid #eee" v-for="s in i.order_item_list" @click="toDetails(i.order_no)">
						<ul class="ul1">
							<li>
								<div class="img1" :style="{'background-image':'url('+s.goods_pic+')'}"></div>
							</li>
							<li>
								<div class="name2">{{s.goods_name}}</div>
								<div class="sku1">{{s.sku_name}}</div>
								<div class="price1">
									<span>&yen;{{s.shop_price}}</span>
									<span>&yen;{{s.market_price}}</span>
									<span>x{{s.goods_num}}</span>
								</div>
							</li>
						</ul>
					</div>
					<div class="price">
						<span>合计：&yen;{{i.order_money}}</span>
						<span>共{{i.order_item_list.length}}件商品</span>
					</div>
					<div class="caozuo" v-if="i.member_operation.length != 0">
						<div style="float:right">
							<span v-for="x in i.member_operation" @click="operating(x.action,i.order_no,$event)" v-if="!(i.is_evaluate>0&& x.action == 'to_comment')">{{x.name}}</span>
						</div>
					</div>
			  	</div>
          <div class="commentNull" v-if="arr && arr.length == 0" style="text-align: center;padding: 0.5rem 0;color: #999999">
            <i class="icon iconfont icon-empty" style="font-size: 1.8rem"></i>
            <p style="font-size: 0.3rem">暂无订单</p>
          </div>
          <loadNo v-show="!ifLoad"></loadNo>
			  	<footer1 v-show="!ifLoad"></footer1>
		  	</div>
		  </mt-tab-container-item>
		  <mt-tab-container-item id="2">
		  	<div class="lists6" v-infinite-scroll="loadMore" infinite-scroll-disabled="false" infinite-scroll-immediate-check="false">
			  	<div class="list" v-for="i in arr">
			  		<div class="time1">
			  			<span>
			  				下单时间：{{i.create_time}}
			  			</span>
			  			<span>
			  				{{i.order_status}}
			  			</span>
			  		</div>
			  		<div class="orderlist" style="border-bottom:1px solid #eee" v-for="s in i.order_item_list" @click="toDetails(i.order_no)">
						<ul class="ul1">
							<li>
								<div class="img1" :style="{'background-image':'url('+s.goods_pic+')'}"></div>
							</li>
							<li>
								<div class="name2">{{s.goods_name}}</div>
								<div class="sku1">{{s.sku_name}}</div>
								<div class="price1">
									<span>&yen;{{s.shop_price}}</span>
									<span>&yen;{{s.market_price}}</span>
									<span>x{{s.goods_num}}</span>
								</div>
							</li>
						</ul>
					</div>
					<div class="price">
						<span>合计：&yen;{{i.order_money}}</span>
						<span>共{{i.order_item_list.length}}件商品</span>
					</div>
					<div class="caozuo" v-if="i.member_operation.length != 0">
						<div style="float:right">
							<span v-for="x in i.member_operation" @click="operating(x.action,i.order_no,$event)" v-if="!(i.is_evaluate>0&& x.action == 'to_comment')">{{x.name}}</span>
						</div>
					</div>
			  	</div>
          <div class="commentNull" v-if="arr && arr.length == 0" style="text-align: center;padding: 0.5rem 0;color: #999999">
            <i class="icon iconfont icon-empty" style="font-size: 1.8rem"></i>
            <p style="font-size: 0.3rem">暂无订单</p>
          </div>
          <loadNo v-show="!ifLoad"></loadNo>
			  	<footer1 v-show="!ifLoad"></footer1>
		  	</div>
		  </mt-tab-container-item>
		  <mt-tab-container-item id="3">
		  	<div class="lists6" v-infinite-scroll="loadMore" infinite-scroll-disabled="false" infinite-scroll-immediate-check="false">
			  	<div class="list" v-for="i in arr">
			  		<div class="time1">
			  			<span>
			  				下单时间：{{i.create_time}}
			  			</span>
			  			<span>
			  				{{i.order_status}}
			  			</span>
			  		</div>
			  		<div class="orderlist" style="border-bottom:1px solid #eee" v-for="s in i.order_item_list" @click="toDetails(i.order_no)">
						<ul class="ul1">
							<li>
								<div class="img1" :style="{'background-image':'url('+s.goods_pic+')'}"></div>
							</li>
							<li>
								<div class="name2">{{s.goods_name}}</div>
								<div class="sku1">{{s.sku_name}}</div>
								<div class="price1">
									<span>&yen;{{s.shop_price}}</span>
									<span>&yen;{{s.market_price}}</span>
									<span>x{{s.goods_num}}</span>
								</div>
							</li>
						</ul>
					</div>
					<div class="price">
						<span>合计：&yen;{{i.order_money}}</span>
						<span>共{{i.order_item_list.length}}件商品</span>
					</div>
					<div class="caozuo" v-if="i.member_operation.length != 0">
						<div style="float:right">
							<span v-for="x in i.member_operation" @click="operating(x.action,i.order_no,$event)" v-if="!(i.is_evaluate>0&& x.action == 'to_comment')">{{x.name}}</span>
						</div>
					</div>
			  	</div>
          <div class="commentNull" v-if="arr && arr.length == 0" style="text-align: center;padding: 0.5rem 0;color: #999999">
            <i class="icon iconfont icon-empty" style="font-size: 1.8rem"></i>
            <p style="font-size: 0.3rem">暂无订单</p>
          </div>
          <loadNo v-show="!ifLoad"></loadNo>
			  	<footer1 v-show="!ifLoad"></footer1>
		  	</div>
		  </mt-tab-container-item>
		  <mt-tab-container-item id="4">
		  	<div class="lists6" v-infinite-scroll="loadMore" infinite-scroll-disabled="false" infinite-scroll-immediate-check="false">
			  	<div class="list" v-for="i in arr">
			  		<div class="time1">
			  			<span>
			  				下单时间：{{i.create_time}}
			  			</span>
			  			<span>
			  				{{i.order_status}}
			  			</span>
			  		</div>
			  		<div class="orderlist" style="border-bottom:1px solid #eee" v-for="s in i.order_item_list" @click="toDetails(i.order_no)">
						<ul class="ul1">
							<li>
								<div class="img1" :style="{'background-image':'url('+s.goods_pic+')'}"></div>
							</li>
							<li>
								<div class="name2">{{s.goods_name}}</div>
								<div class="sku1">{{s.sku_name}}</div>
								<div class="price1">
									<span>&yen;{{s.shop_price}}</span>
									<span>&yen;{{s.market_price}}</span>
									<span>x{{s.goods_num}}</span>
								</div>
							</li>
						</ul>
					</div>
					<div class="price">
						<span>合计：&yen;{{i.order_money}}</span>
						<span>共{{i.order_item_list.length}}件商品</span>
					</div>
					<div class="caozuo" v-if="i.member_operation.length != 0">
						<div style="float:right">
							<span v-for="x in i.member_operation" @click="operating(x.action,i.order_no,$event)" v-if="!(i.is_evaluate>0&& x.action == 'to_comment')">{{x.name}}</span>
						</div>
					</div>
			  	</div>
          <div class="commentNull" v-if="arr && arr.length == 0" style="text-align: center;padding: 0.5rem 0;color: #999999">
            <i class="icon iconfont icon-empty" style="font-size: 1.8rem"></i>
            <p style="font-size: 0.3rem">暂无订单</p>
          </div>
          <loadNo v-show="!ifLoad"></loadNo>
			  	<footer1 v-show="!ifLoad"></footer1>
		  	</div>
		  </mt-tab-container-item>
		  <!-- <mt-tab-container-item id="4">
		  </mt-tab-container-item>
		  <mt-tab-container-item id="5">
		  </mt-tab-container-item> -->
		</mt-tab-container>
    <div v-if="navIs">
      <customNav v-on:child-say="listenToMyBoy"></customNav>
    </div>
    <div v-if="!navIs">
      <mallTab></mallTab>
    </div>
	</div>
</template>
<script>
	import mallTab from '@/components/mall/mallTab';
	import loadNo from '@/components/common/loadNo';
	import { Navbar, TabItem,Toast,Indicator,MessageBox } from 'mint-ui';
	import footer1 from '@/components/common/footer1';
  import customNav from '@/components/home/custom/customNav';

  export default{
		data(){
			return{
				selected:'6',
				parmas:{},
				arr:[],
				status:0,
				pageNo:1,
				page_size:10,
				ifLoad:true,
        navIs:true
			}
		},
		created(){
			this.global.shouquan();
      this.noShare();
			this.parmas = {page:this.pageNo,page_size:this.page_size}
			this.postData('post','/shop-g1-order_order_lst.html',this.parmas).then(res => {
				this.arr = res.data;
			})
      document.title = "订单中心";
		},
		methods:{
			loadMore(){
				if(this.ifLoad == true){
					this.pageNo = Number(this.pageNo) + Number(1);
					this.parmas.page = this.pageNo;
					this.postData('post','/shop-g1-order_order_lst.html',this.parmas).then(res => {
						if(res.data.length != 0){
							this.arr = this.arr.concat(res.data);
						}else if(res.data.length == 0){
							this.pageNo = Number(this.pageNo) - Number(1);
							this.ifLoad = false;
						}
					})
				}
			},
//      订单详情
			toDetails(order_no){
				this.$router.push({path:'/mallOrderDetails',query:{order_no:order_no}});
			},
//      支付，确认等操作函数
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
            message: '确定取消该订单?',
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
            message: '确定删除该订单?',
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
//      判断自定义导航是否有数据
      listenToMyBoy(is){
        if(is != undefined){
          this.navIs = is;
        } else {
          this.$nextTick(function () {
            $('.customNav_bottomnav').css({position:'fixed',bottom:0});
          });
        }
      }
		},
		components:{mallTab, loadNo ,footer1,customNav},
		watch:{
//		    订单状态切换
			selected(val,oldval){
				this.ifLoad = true;
				if(val == 6){
					this.parmas = {page:this.pageNo,page_size:this.page_size}
				}else{
					this.parmas = {status:val,page:this.pageNo,page_size:this.page_size}
				}
				// this.parmas.status = val;
				this.pageNo = 1;
				this.parmas.page = this.pageNo;
				this.postData('post','/shop-g1-order_order_lst.html',this.parmas).then(res => {
					this.arr = res.data;
				})
			}
		}
	}
</script>
<style lang="less">
	.orderCenter{
		font-size: 0.205rem;
		color: #333;
		.lists6{
			height: calc(~"100vh - 0.682rem - 53px");
			overflow: auto;
			-webkit-overflow-scrolling:touch;
			.list{
				margin-top: 0.17rem;
				.time1{
					background-color: #fff;
					padding: 0.17rem 0;
					span:nth-child(1){
						margin-left: 0.17rem;
					}
					span:nth-child(2){
						color: #ef4949;
						float: right;
						margin-right: 0.17rem;
					}
				}
				.orderlist{
					width: 100%;
					height: 1.792rem;
					background-color: #f9f9f9;
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
				.price{
					padding: 0.17rem 0.17rem;
					width: calc(~"100% - 0.34rem");
					background-color: #fff;
					overflow:auto;
					span{
						float: right;
					}
					span:nth-child(1){
						margin-left: 0.17rem;
					}
				}
				.caozuo{
					background-color: #fff;
					padding: 0.25rem 0.17rem;
					width: calc(~"100% - 0.34rem");
					border-top: 1px solid #eee;
					overflow:auto;
					span{
						height: 0.384rem;
						width: 1.143rem;
						border-radius: 0.192rem;
						border: 1px solid #999;
						padding: 0.06rem 0.15rem;
						margin-left: 0.17rem;
					}
				}
			}
		}
		.mint-navbar{
			height: 0.682rem;
			.mint-tab-item-label{
				font-size: 0.222rem;
				line-height: 0;
			}
		}
		.mint-navbar .mint-tab-item.is-selected{
			border-bottom: 2px solid #ef4949;
		    color: #ef4949;
		    margin-bottom: -2px;
		}
	}
</style>
