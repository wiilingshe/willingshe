<template>
	<div class="box Order" style="height:100%;">
		<div class="header">
		    <mt-navbar v-model="selected">
			<mt-tab-item id="1">专栏订单</mt-tab-item>
			<mt-tab-item id="2">单品订单</mt-tab-item>
			<mt-tab-item id="3">活动订单</mt-tab-item>
			<mt-tab-item id="4">套餐订单</mt-tab-item>
		</mt-navbar>
		<mt-tab-container v-model="selected">
			 <mt-tab-container-item id="1">
			 	<div class="curriculum">
				 	<div class="buttons">
				 		<span @click="curriculum(null,0)" :class="{active:0==index}">全部</span>
			 			<span @click="curriculum(1,1)" :class="{active:1==index}">未支付</span>
			 			<span @click="curriculum(2,2)" :class="{active:2==index}">已付款</span>
			 			<span @click="curriculum(3,3)" :class="{active:3==index}">已取消</span>
				 	</div>
				 	<div class="loading" v-if="tipLoad">加载中...</div>
				 	<div class="loading" v-if="tipNodata"><nodata></nodata></div>
				 	<div class="listData" v-if="!tipLoad" v-infinite-scroll="loadMore" infinite-scroll-disabled="scrolll" infinite-scroll-distance="10" infinite-scroll-immediate-check="true">
					 	<router-link :to="{path:'/mine-order-details',query: { 'details': i.order_no,'ser_id':i.id }}" v-for="(i,index) in arr" :key="index">
							<orderArr :details="i" :selected="selected"></orderArr>
						</router-link>
				 		<div class="loading" v-show="loading2"><!-- 加载中... --></div>
				 	</div>
			 	</div>
			</mt-tab-container-item>
			<mt-tab-container-item id="2">
				<div class="video">
					<div class="buttons">
						<span @click="videoSelect(null,4)" :class="{active:4==index1}">全部</span>
						<span @click="videoSelect(1,5)" :class="{active:5==index1}">未支付</span>
						<span @click="videoSelect(2,6)" :class="{active:6==index1}">已付款</span>
						<span @click="videoSelect(3,7)" :class="{active:7==index1}">已取消</span>
					</div>
					<div class="loading" v-if="tipLoad2">加载中...</div>
				 	<div class="loading" v-if="tipNodata2"><nodata></nodata></div>
				 	<div class="listData" v-if="!tipLoad2"  v-infinite-scroll="loadMore2" infinite-scroll-disabled="scrolll" infinite-scroll-distance="10" infinite-scroll-immediate-check="true">
						<router-link :to="{path:'/mine-order-video',query: { 'details': j.order_no,'vid':j.id }}" v-for="(j,index) in arr2" :key="index">
						<orderArr :details="j" :selected="selected"></orderArr>
					  </router-link>
					  <div class="loading" v-show="loading3"><!-- 加载中... --></div>
				 	</div>
				</div>
			  
			</mt-tab-container-item>
			<mt-tab-container-item id="3">
				<div class="activity">
					<div class="buttons">
						<span @click="activitySelect(null,8)" :class="{active:8==index2}">全部</span>
						<span @click="activitySelect(1,9)" :class="{active:9==index2}">未支付</span>
						<span @click="activitySelect(2,10)" :class="{active:10==index2}">已付款</span>
						<span @click="activitySelect(3,11)" :class="{active:11==index2}">已取消</span>
					</div>
					<div class="loading" v-if="tipLoad3">加载中...</div>
				 	<div class="loading" v-if="tipNodata3"><nodata></nodata></div>
				 	<div class="listData"  v-show="!tipNodata3" v-infinite-scroll="loadMore3" infinite-scroll-disabled="scrolll" infinite-scroll-distance="10" infinite-scroll-immediate-check="true">
						<router-link :to="{path:'/mine-order-activity',query: { 'details': k.order_no,'aid':k.aid }}" v-for="(k,index) in arr3" :key="index">
							<orderArr :details="k" :selected="selected"></orderArr>
						</router-link>
						<div class="loading" v-show="loading4"><!-- 加载中... --></div>
				 	</div>
				</div>
			</mt-tab-container-item>
			
			<mt-tab-container-item id="4">
			 	<div class="package">
				 	<div class="buttons">
				 		<div class="buttons_box">
				 			<span @click="Package(null,12)" :class="{active:12==index3}" style="font-size:0.22rem">全部</span>
				 			<span @click="Package(1,13)" :class="{active:13==index3}" style="font-size:0.22rem">未支付</span>
				 			<span @click="Package(2,14)" :class="{active:14==index3}" style="font-size:0.22rem">已付款</span>
				 			<span @click="Package(3,15)" :class="{active:15==index3}" style="font-size:0.22rem">已取消</span>
				 		</div>
				 	</div>
				 	<div class="loading" v-if="tipLoad4">加载中...</div>
				 	<div class="loading" v-if="tipNodata4">
				 		<nodata></nodata>
				 	</div>
				 	<div class="listData" v-if="!tipLoad4" v-infinite-scroll="loadMore4" infinite-scroll-disabled="scrolll" infinite-scroll-distance="10" infinite-scroll-immediate-check="true">
					 	<router-link :to="{path:'/mine-order-package',query: { 'details': q.order_no,'cs_id':q.cs_id }}" v-for="(q,index) in arr4" :key="index">
							<orderArr :details="q" :selected="selected"></orderArr>
						</router-link>
				 		<div class="loading" v-show="loading5"><!-- 加载中... --></div>
				 	</div>
			 	</div>
			</mt-tab-container-item>
			
	    </mt-tab-container>
		</div>
	</div>
	
</template>

<script>
	import { Navbar,TabItem,InfiniteScroll,Toast } from 'mint-ui';
	import nodata from '@/components/common/nodata';
	import orderArr from '@/components/mine/order/orderArr.vue'
	export default {
		data(){
			return{
				selected:'1',//默认选中
				arr:[],
				arr2:[],
				arr3:[],
				arr4:[],
				index:1,
				index1:5,
				index2:9,
				index3:13,
				page:1,
				loading: false,
		        allLoaded: false,
		        wrapperHeight: 0,
		        tipLoad:true,
		        tipNodata:false,
		        tipLoad2:true,
		        tipLoad3:true,
		        tipLoad4:true,
		        tipNodata2:false,
		        tipNodata3:false,
		        tipNodata4:false,
		        scrolll:false,
		        loading2:false,
		        loading3:false,
		        loading4:false,
		        loading5:false,
		        pageNo1:1,
		        pageNo2:1,
		        pageNo3:1,
		        pageNo4:1,
		        status1:1,
		        status2:1,
		        status3:1,
		        status4:1

		        
				
			}
		},
		components:{orderArr,nodata},
		created(){
			document.title = '我的订单'
			this.global.shouquan();
			this.noShare();
			var url = '/shop-v1-order_lst.html?page='+this.pageNo1+'&status=1&type=series'
			this.getData('get',url).then(res => {
				if(res.status == 200){
					this.tipLoad = false;
					if(res.data.length != 0){
						this.arr = res.data;
					}else if(res.data.length == 0){
						this.tipNodata = true;
						this.arr = res.data;
					}
				}
			});
			this.getData('get','/shop-v1-order_change_member_lineactive_order_status').then(res => {

			})
		},
		mounted(){
		},
		methods:{
			
			toggleTabs (tabText) {
                 this.currentView = tabText;
			},
			details(){
				this.$router.push('/mine-order-details');
			},
			// 获取课程
			curriculum(status,num){
				this.index=num;
				this.status1 = status;
				this.tipLoad = true;
				this.tipNodata = false;
				this.pageNo1 = 1;
				if(status == null){
					this.getData('get','/shop-v1-order_lst.html?page=1&type=series').then(res => {
						if(res.status == 200){
							this.tipLoad = false;
							if(res.data.length != 0){
								this.arr = res.data
							}else if(res.data.length == 0){
								this.tipNodata = true;
								this.arr = res.data
							}
						}
					});
				}else{
					var url = '/shop-v1-order_lst.html?page=1&type=series&status=' + status
					this.getData('get',url).then(res => {
						if(res.status == 200){
							this.tipLoad = false;
							if(res.data.length != 0){
								this.arr = res.data
							}else if(res.data.length == 0){
								this.tipNodata = true;
								this.arr = res.data
							}
						}
					});
				}
			},
			// 获取视频
			videoSelect(status,num){ 
				this.index1=num;
				this.status2 = status;
				this.tipLoad2 = true;
				this.tipNodata2 = false;
				this.pageNo2 = 1;
				if(status == null){
					this.getData('get','/shop-v1-order_lst.html?page=1&type=video').then(res => {
						if(res.status == 200){
							this.tipLoad2 = false;
							if(res.data.length != 0){
								this.arr2 = res.data
							}else if(res.data.length == 0){
								this.tipNodata2 = true;
								this.arr2 = res.data
							}
						}
					});
				}else{
					var url = '/shop-v1-order_lst.html?page=1&type=video&status=' + status
					this.getData('get',url).then(res => {
						if(res.status == 200){
							this.tipLoad2 = false;
							if(res.data.length != 0){
								this.arr2 = res.data
							}else if(res.data.length == 0){
								this.tipNodata2 = true;
								this.arr2 = res.data
							}
						}
					});
				}
					
			},
			//获取活动
			activitySelect(status,num){
				this.index2=num;
				this.status3 = status;
				this.tipLoad3 = true;
				this.tipNodata3 = false;
				this.pageNo3 = 1;
				if(status == null){
					this.getData('get','/shop-v1-order_lst?page=1&type=active').then(res => {
						if(res.status == 200){
							this.tipLoad3 = false;
							if(res.data.data.length != 0){
								this.arr3 = res.data.data;
							}else if(res.data.data.length == 0){
								this.tipNodata3 = true;
								this.arr3 = res.data.data;
							}
						}
					});
				}else{
					var url = '/shop-v1-order_lst?page=1&type=active&status=' + status
					this.getData('get',url).then(res => {
						if(res.status == 200){
							this.tipLoad3 = false;
							if(res.data.data.length != 0){
								this.arr3 = res.data.data;
							}else if(res.data.data.length == 0){
								this.tipNodata3 = true;
								this.arr3 = res.data.data;
							}
						}
					});
				}
				
				
			},
            //获取套餐
			Package(status,num){
				this.index3=num;
				this.status4=status;
				this.tipLoad4 = true;
				this.tipNodata4 = false;
				this.pageNo4 = 1;
				if(status == null){
					this.getData('get','/shop-v1-order_lst.html?page=1&type=comboset').then(res => {
						if(res.status == 200){
							this.tipLoad4 = false;
							if(res.data.length != 0){
								this.arr4 = res.data;
							}else if(res.data.length == 0){
								this.tipNodata4 = true;
								this.arr4 = res.data
							}
						}
					});
				}else{
					var url = '/shop-v1-order_lst.html?page=1&type=comboset&status=' + status
					this.getData('get',url).then(res => {
						if(res.status == 200){
							this.tipLoad4 = false;
							if(res.data.length != 0){
								this.arr4 = res.data
							}else if(res.data.length == 0){
								this.tipNodata4 = true;
								this.arr4 = res.data
							}
						}
					});
				}
				
			},
			loadMore(){
				this.loading2 = true;
				this.pageNo1 = this.pageNo1 +1;
				if(this.status1 == null){
					var url = '/shop-v1-order_lst.html?type=series&page='+ this.pageNo1;
				}else{
					var url = '/shop-v1-order_lst.html?type=series&page='+ this.pageNo1 +'&status=' + this.status1;
				}
				this.getData('get',url).then(res => {
					if(res.status == 200){
						this.loading2 = false;
						if(res.data.length != 0){
							this.arr = this.arr.concat(res.data)
						}else if(res.data.length == 0){
							this.pageNo1 = this.pageNo1 - 1;
							Toast({
								message:'最后一页了',
								duraction:'500'
							})
						}
					}
				});
			},
			loadMore2(){
				this.loading3 = true;
				this.pageNo2 = this.pageNo2 +1;
				if(this.status2 == null){
					var url = '/shop-v1-order_lst.html?type=video&page='+ this.pageNo2;
				}else{
					var url = '/shop-v1-order_lst.html?type=video&page='+ this.pageNo2 +'&status=' + this.status2;
				}
				this.getData('get',url).then(res => {
					if(res.status == 200){
						this.loading3 = false;
						if(res.data.length != 0){
							this.arr2 = this.arr2.concat(res.data)
						}else if(res.data.length == 0){
							this.pageNo2 = this.pageNo2 - 1;
							Toast({
								message:'最后一页了',
								duraction:'500'
							})
						}
					}
				});
			},
			loadMore3(){
			    this.loading4= true;
				this.pageNo3 = this.pageNo3 +1;
				if(this.status3 == null){
					var url = '/shop-v1-order_lst?type=active&page='+ this.pageNo3;
				}else{
					var url = '/shop-v1-order_lst?type=active&page='+ this.pageNo3 +'&status=' + this.status3;
				}
				this.getData('get',url).then(res => {
					if(res.status == 200){
						this.loading4 = false;
						if(res.data.data.length != 0){
							this.arr3 = this.arr3.concat(res.data.data)
						}else if(res.data.data.length == 0){
							this.pageNo3 = this.pageNo3 - 1;
							Toast({
								message:'最后一页了',
								duraction:'500'
							})
						}
					}
				});
			},
			loadMore4(){
				this.loading5= true;
				this.pageNo4 = this.pageNo4 +1;
				if(this.status4 == null){
					var url = "/shop-v1-order_lst.html?type=comboset&page="+this.pageNo4
                    this.getData('get',url).then(res => {
                   	    if(res.status == 200){
							this.loading5 = false;
							if(res.data.length != 0){
								this.arr4 = this.arr4.concat(res.data);
							}else if(res.data.length == 0){
								this.pageNo4 = this.pageNo4 - 1;
								
								Toast({
									message:'最后一页了',
									duraction:'500'
								})
							}
					    }
                    })
				}else{
					var url = "/shop-v1-order_lst.html?type=comboset&page="+this.pageNo4+'&status='+this.status4
                    this.getData('get',url).then(res => {
                   	    if(res.status == 200){
							this.loading5 = false;
							if(res.data.length != 0){
								this.arr4 = this.arr4.concat(res.data);
							}else if(res.data.length == 0){
								this.pageNo4 = this.pageNo4 - 1;
								Toast({
									message:'最后一页了',
									duraction:'500'
								})
							}
					    }
                    })
                     
				}
				
			}
		},
		watch:{
			selected(val,oldval){
				if(val == 1){
					this.pageNo1 = 1
					var url = '/shop-v1-order_lst.html?page='+this.pageNo1+'&status=1&type=series'
					this.getData('get',url).then(res => {
						if(res.status == 200){
							this.tipLoad = false;
							if(res.data.length != 0){
								this.arr = res.data;
							}else if(res.data.length == 0){
								this.tipNodata = true;
								this.arr = res.data;
							}
						}
					});
				}else if(val == 2){
					this.pageNo2 = 1
					var url2 = '/shop-v1-order_lst.html?page='+this.pageNo2+'&status=1&type=video'
					this.getData('get',url2).then(res => {
						if(res.status == 200){
							this.tipLoad2 = false;
							if(res.data.length != 0){
								this.arr2 = res.data
							}else if(res.data.length == 0){
								this.tipNodata2 = true;
								this.arr2 = res.data
							}
						}
					});
				}else if(val == 3){
					this.pageNo3 = 1
					var url3 = '/shop-v1-order_lst.html?page='+this.pageNo2+'&status=1&type=active'
					this.getData('get',url3).then(res => {
						if(res.status == 200){
							this.tipLoad3 = false;
							if(res.data.data.length != 0){
								console.log(2)
								this.arr3 = res.data.data
							}else if(res.data.data.length == 0){
								console.log(1)
								this.tipNodata3 = true;
								this.arr3 = res.data.data
							}
						}
					});
				}else if(val == 4){
					this.pageNo4 = 1
					var url4 = '/shop-v1-order_lst.html?page='+this.pageNo2+'&status=1&type=comboset'
					this.getData('get',url4).then(res => {
						if(res.status == 200){
							this.tipLoad4 = false;
							if(res.data.length != 0){
								this.arr4 = res.data
							}else if(res.data.length == 0){
								this.tipNodata4 = true;
								this.arr4 = res.data
							}
						}
					});
				}
			}
		}
	}
</script>

<style scoped lang="less">
	.listData{
		height: calc(100vh - 15.5rem);
		overflow: auto;
		-webkit-overflow-scrolling:touch;
	}
	.loading{
		font-size: 0.26rem;
		text-align: center;
		color: #999;
		margin-top: 0.2rem;
	}
	.box{
		display: flex;
		flex-direction: column;
	}
	.buttons_box{
		span{
			color: #999;
			font-size: 0.24rem;
		}
	}
    .Order button{
		// height: 0.4rem;
		font-size: 0.24rem;
		outline-style: none;
		border: none;
		color: #999;
		background-color: #fff;
	}
	.Order .active,.active1{
		color: #5e97d0;
	}
	/*课程订单结束*/
	.video{
		display: flex;
		flex-direction: column;
	}
	// .buttons{
	// 	height: 0.8rem;
	// 	background-color: #fff;
	// 	color: #999;
	// 	border-bottom: 1px solid #eee;
	// 	span{
	// 		font-size: 0.24rem;
	// 		line-height: 0.8rem;
 //    		margin-left: 0.2rem;
	// 	}
	// 	span:nth-child(1){
	// 		margin-left: 0.2rem;
	// 	}
	// }
	.buttons{
		font-size: 0.22rem;
		background-color: #fff;
		color: #999;
		height: 0.76rem;
		line-height: 0.76rem;
		border-bottom: 1px solid #eee;
		span{
			margin-left: 0.2rem;
		}
	}
	.Order .mint-navbar{
		height: 0.9rem;
		border-bottom: 1px solid #ddd;
		background-color: #fff;
		color: #fff;
	}
	.Order .mint-navbar .mint-tab-item.is-selected{
		border-bottom: 1px solid #5e96d0;
	    color: #5e96d0;
	    margin-bottom: -1px;
	}
	.mint-tab-container{
		margin: 0 !important;
	}
</style>