<template>
	<div class="scholarship">
		<div class="scholarship-sum">
			<div class="scholarship-sum-money">{{balance}}</div>
			<div class="scholarship-sum-shuoming">满{{limit.withdraw_min}}元可提现</div>
			<div class="scholarship-sum-btn" @click="myzhanghu()">转入我的账户</div>
			<span v-if="balance>=limit.withdraw_min" @click="tixain()">收益提现</span>
			<div class="scholarship-sum-record" @click="recordList()">邀请记录</div>
		</div>
		<div class="scholarship-list">
			<div class="scholarship-list-title"><i class="icon iconfont icon-sanjiaoxing-right"></i>邀请好友赚学费</div>
			<div class="scholarshipheight" v-infinite-scroll="loadMore" infinite-scroll-disabled="false" infinite-scroll-immediate-check="false" infinite-scroll-distance="0">
				<div class="scholarship-list-list" v-for="(i,index) in arr" :style="{'padding-top':index==0?'0':'0.3rem'}">
	              <div class="scholarship-list-list-img">
	                <img :src="i.pic">
	              </div>
	              <div class="scholarship-list-list-info">
	                <div class="scholarship-list-list-info-title">{{i.title}}</div>
	                <div class="scholarship-list-list-info-status">
	                  <span>预计收益：{{Number(i.dist_fee)}}元/次</span>
	                  <span class="scholarship-list-list-info-status-btn" @click='yaoqing(i.ser_id)'>马上邀请</span>
	                </div>
	              </div>
	            </div>
	            <loadNo v-if="!ifload"></loadNo>
			</div>
		</div>
	</div>
</template>
<script>
	import {InfiniteScroll,Indicator,Toast,MessageBox} from 'mint-ui';
	import loadNo from '@/components/common/loadNo';
	export default{
		data(){
			return{
				balance:0,
				arr:[],
				page:1,
				ifload:true,
				limit:[],
			}
		},
		created(){
			document.title = '我的奖学金';
			this.getData('post','/shop-v1-user_base_info.html').then(res => {
				this.balance = Number(res.data.data.balance)
			});
			this.getData('get','/shop-v1-user_get_member_withdraw.html').then(res => {
				this.limit = res.data;
				console.log(this.limit)
			},res => {
				Toast({
				  message: '网络请求超时，请刷新页面重试',
				  duration: 2000
				});
			})
			this.getData('post','/shop-v1-user_dist_series_lesson.html',{page:this.page}).then(res => {
				this.arr = res.data;
			})
		},
		methods:{
			recordList(){
				this.$router.push({path:'/recordList'})
			},
			loadMore(){
				if(this.ifload == true){
					this.page = Number(this.page) +Number(1);
					this.getData('post','/shop-v1-user_dist_series_lesson.html',{page:this.page}).then(res => {
						if(res.data.length > 0){
							this.arr = this.arr.concat(res.data);
						}else{
							this.page = Number(this.page) - Number(1);
							this.ifload = false;
						}
					})
				}
			},
			yaoqing(id){
				this.$router.push({path:'/commission',query:{'ser_id':id}})
			},
			myzhanghu(){
				var self = this;
				MessageBox.confirm('转入到我的账户将不可提现').then(action => {
				  Indicator.open();
				  this.getData('post','/shop-v1-user_cvc_switch_to_balance.html').then(res => {
				  	Indicator.close();
				  	if(res.data.status == 1){
				  		self.balance = 0;
				  		Toast({
						  message: res.data.msg,
						  duration: 2000
						});
				  	}else{
				  		Toast({
						  message: res.data.msg,
						  duration: 2000
						});
				  	}
				  },res => {
				  	Indicator.close();
				  	Toast({
					  message: '微信提现未开启，请联系客服人员',
					  duration: 2000
					});
				  })
				});
			},
			tixain(){
				var self = this;
				MessageBox.confirm('确定提现所有奖学金?').then(action => {
					Indicator.open();
					if(this.limit.wechat_is_on == 1){
						this.getData('post','/shop-v1-user_member_apply_withdraw.html',{withdraw_type:1,total_fee:self.balance}).then(res => {
							Indicator.close();
							if(res.data[0].status == 1){
								self.balance = 0;
								console.log(self.balance)
								Toast({
								  message: '提交申请成功，1~3个工作日内到账',
								  duration: 2000
								});
							}else{
								Toast({
								  message: res.data[0].msg,
								  duration: 2000
								});
							}
						},res => {
							Indicator.close();
							Toast({
							  message: '网络请求超时，请刷新页面重试',
							  duration: 2000
							});
						})
					}else{
						Toast({
						  message: '微信提现未开启，请联系客服人员',
						  duration: 2000
						});
					}
				});
			}
		},
		components:{loadNo}
	}
</script>
<style lang="less">
	.scholarship{
		&-sum{
			height: 3.82rem;
			width: 100%;
			background-color: #fff;
			position: relative;
			&-money{
				font-size: 0.64rem;
				text-align: center;
				padding-top: 0.9rem;
			}
			&-shuoming{
				font-size: 0.26rem;
				text-align: center;
				color: #999;
			}
			&-record{
				width: 1.42rem;
				height: 0.46rem;
				background-color: #666;
				border-top-left-radius: 0.23rem;
				border-bottom-left-radius: 0.23rem;
				font-size: 0.26rem;
				text-align: center;
				line-height: 0.46rem;
				overflow: hidden;
				position: absolute;
			    right: 0;
			    top: 0.4rem;
			    color: #fff;
			}
			&-btn{
				font-size: 0.26rem;
				width: 2.32rem;
				height: 0.72rem;
				background-color: #222;
				border-radius: 0.03rem;
				margin: 0 auto;
				margin-top: 0.6rem;
				color: #fff;
				text-align: center;
				line-height: 0.72rem;
				overflow: hidden;
				border-radius: 0.06rem;
			}
			span{
				position: absolute;
				right: 0.3rem;
				font-size: 0.26rem;
				color: #EF4949;
				top: 2.8rem;
			}
		}
		&-list{
			background-color: #fff;
			margin-top: 0.2rem;
			.scholarshipheight{
				height: calc(~"100vh - 4.85rem");
				overflow: scroll;
				-webkit-overflow-scrolling:touch;
			}
			.icon-sanjiaoxing-right{
				font-size: 0.3rem;
				margin-right: 0.1rem;
				margin-left: 0.2rem;
				position: relative;
    			top: -0.05rem;
			}
			&-title{
				font-size: 0.38rem;
				color: #222;
				padding-top: 0.32rem;
				font-weight: 500;
				padding-bottom: 0.3rem;
				span{
					display: inline-block;
					font-size: 0.26rem;
					color: #666;
					float: right;
					line-height: 0.7rem;
					margin-right: 0.3rem;
				}
			}
			&-list{
			  padding-top: 0.3rem;
	          padding-bottom: 0.3rem;
	          border-bottom: 1px solid #eee;
	          width: calc(~"100% - 0.6rem");
	          margin: 0 auto;
	          &-img{
	            display: inline-block;
	            vertical-align: top;
	            width: 2.52rem;
	            height: 1.52rem;
	            overflow: hidden;
	            margin-right: 0.05rem;
	            border-radius: 0.06rem;
	            background-color: #eee;
	            img{
	              width: 2.52rem;
	            }
	          }
	          &-info{
	            display: inline-block;
	            vertical-align: top;
	            &-title{
	              width: 4.08rem;
	              font-size: 0.3rem;
	              display: -webkit-box;
	              -webkit-box-orient: vertical;
	              -webkit-line-clamp: 2;
	              overflow: hidden;
	              height: 0.8rem;
	            }
	            &-studyed{
	              font-size: 0.26rem;
	              color: #666;
	              margin-top: 0.12rem;
	            }
	            &-pre{
	              width: 4.12rem;
	              height: 0.06rem;
	              border-radius: 0.03rem;
	              background-color: #ccc;
	              margin-top: 0.14rem;
	              overflow: hidden;
	              &-preed{
	                height: 100%;
	                background-color: #000;
	                border-radius: 0.03rem;
	              }
	            }
	            &-status{
	              font-size: 0.26rem;
	              color: #666;
	              margin-top: 0.35rem;
	              &-btn{
	              	width: 1.32rem;
	              	height: 0.46rem;
	              	border:1px solid #222;
	              	display: inline-block;
	              	text-align: center;
	              	line-height: 0.46rem;
	              	overflow: hidden;
	              	border-radius: 0.06rem;
	              	vertical-align: middle;
	              	color: #222;
	              	float: right;
	              	margin-top: -0.1rem;
	              }
	            }
	          }
	        }
		}
	}
</style>