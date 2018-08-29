<!--钱包明细页-->
<template>
	<div class="box detailed">
		<mt-navbar v-model="selected">
		  <mt-tab-item id="1">收入</mt-tab-item>
		  <mt-tab-item id="2">退款</mt-tab-item>
		  <mt-tab-item id="3">支出</mt-tab-item>
		</mt-navbar>
		<mt-tab-container v-model="selected">
		  <mt-tab-container-item id="1">
		  	<div id="trueHeight1" v-infinite-scroll="loadMore1" infinite-scroll-disabled="false" infinite-scroll-immediate-check="false" infinite-scroll-distance="10">
			  	<div class="oneList" v-for="i in recordList">
			  		<div class="oneTop">
			  			<span class="lei" v-if="i.type == 1 && i.msg == ''">收入</span>
			  			<span class="lei" v-if="i.type == 2 && i.msg == ''">退款</span>
			  			<span class="lei" v-if="i.type == 3 && i.msg == ''">支出</span>
			  			<span class="msg" v-if="i.msg != ''">{{i.msg}}</span>
			  		</div>
			  		<div class="date">
			  			<!-- <span class="msg">{{i.msg}}</span> -->
			  			<span class="time">{{i.create_time}}</span>
			  			<span class="money" v-if="i.type == 1">+{{i.bonus}}</span>
			  			<span class="money" v-if="i.type == 2">+{{i.bonus}}</span>
			  			<span class="money" v-if="i.type == 3">-{{i.bonus}}</span>
			  		</div>
			  	</div>
		  	</div>
		  </mt-tab-container-item>
		  <mt-tab-container-item id="2">
		  	<div id="trueHeight2" v-infinite-scroll="loadMore2" infinite-scroll-disabled="false" infinite-scroll-immediate-check="false" infinite-scroll-distance="10">
			  	<div class="oneList" v-for="i in payList">
			  		<div class="oneTop">
			  			<!-- <span class="lei">支出</span> -->
			  			<!-- <span class="money">-{{i.bonus}}</span> -->
			  			<span class="msg">{{ i.msg }}</span>
			  		</div>
			  		<div class="date">
			  			<!-- <span class="msg">{{ i.msg }}</span> -->
			  			<span class="time">{{i.create_time}}</span>
			  			<span class="money">-{{i.bonus}}</span>
			  		</div>
			  	</div>
			</div>
		  </mt-tab-container-item>
		  <mt-tab-container-item id="3">
		  	<div id="trueHeight3" v-infinite-scroll="loadMore3" infinite-scroll-disabled="false" infinite-scroll-immediate-check="false" infinite-scroll-distance="10">
			  	<div class="oneList" v-for="i in incomeList">
			  		<div class="oneTop">
			  			<!-- <span class="lei">分佣</span> -->
			  			<span class="msg">{{i.msg}}</span>
			  		</div>
			  		<div class="date">
			  			<span class="time">{{i.create_time}}</span>
			  			<span class="money">-{{i.bonus}}</span>
			  		</div>
			  	</div>
			</div>
		  </mt-tab-container-item>
		</mt-tab-container>
		<nodata v-show="nodata" style="margin-top: 2rem;"></nodata>
	</div>
	
</template>

<script>
	import {Navbar,TabItem,Indicator,InfiniteScroll} from 'mint-ui';
	import nodata from '@/components/common/nodata'
	import footer1 from '@/components/publicPage/footer1'
	export default{
		data(){
			return{
				selected:'1',
				recordList:[],
				payList:[],
				incomeList:[],
				nodata:false,
				page1:1,
				page2:1,
				page3:1,
				ifend1:false,
				ifend2:false,
				ifend3:false,
			}
		},
		created(){
			document.title = '收支明细'
			Indicator.open();
			this.global.shouquan();
			this.noShare();
			this.getData('get','/shop-v1-user_balance_log.html?type=1&page=1').then(res => {
				if(res.status == 200){
					if(res.data.length != 0){
						this.recordList = res.data;
					}else{
						this.nodata = true;
					}
					Indicator.close();
				}
				
			})
			
			
		},
		components:{footer1,nodata},
		methods:{
			loadMore1(){
				if(this.ifend1 == false){
					this.page1++;
					this.getData('get','/shop-v1-user_balance_log.html?type=1&page='+this.page1).then(res => {
						if(res.status == 200){
							if(res.data.length != 0){
								this.recordList = this.recordList.concat(res.data);
							}else{
								this.ifend1 = true;
							}
							Indicator.close();
						}
						
					})
				}
			},
			loadMore2(){
				if(this.ifend2 == false){
					this.page2++;
					this.getData('get','/shop-v1-user_balance_log.html?type=2&page='+this.page2).then(res => {
						if(res.status == 200){
							if(res.data.length != 0){
								this.payList = this.payList.concat(res.data);
							}else{
								this.ifend2 = true;
							}
							Indicator.close();
						}
						
					})
				}
			},
			loadMore3(){
				if(this.ifend3 == false){
					this.page3++;
					this.getData('get','/shop-v1-user_balance_log.html?type=3&page='+this.page3).then(res => {
						if(res.status == 200){
							if(res.data.length != 0){
								this.incomeList = this.incomeList.concat(res.data);
							}else{
								this.ifend3 = true;
							}
							Indicator.close();
						}
						
					})
				}
			}
		},
		watch:{
			selected(val){
				if(val == 1 && this.page1 == 1 && this.recordList.length==0){
					this.nodata = false;
					Indicator.open();
					this.getData('get','/shop-v1-user_balance_log.html?type=1&page=1').then(res => {
						if(res.status == 200){
							if(res.data.length != 0){
								this.recordList = res.data;
							}else{
								this.nodata = true;
							}
							Indicator.close();
						}
						
					})
				}else if(val == 2 && this.page2 == 1 && this.payList.length==0){
					this.nodata = false;
					Indicator.open();
					this.getData('get','/shop-v1-user_balance_log.html?type=2&page=1').then(res => {
						if(res.status == 200){
							if(res.data.length != 0){
								this.payList = res.data;
							}else{
								this.nodata = true;
							}
							Indicator.close();
						}
					})
				}else if(val == 3 && this.page3 == 1 && this.incomeList.length==0){
					this.nodata = false;
					Indicator.open();
					this.getData('get','/shop-v1-user_balance_log.html?type=3&page=1').then(res => {
						if(res.status == 200){
							if(res.data.length != 0){
								this.incomeList = res.data;
							}else{
								this.nodata = true;
							}
							Indicator.close();

						}
					})	
				}
			}
		}
	}
</script>

<style scoped lang="less">
	.detailed{
		#trueHeight1,#trueHeight2,#trueHeight3{
			height: calc(~"100vh - 1rem");
			position: fixed;
			bottom: 0;
			overflow: scroll;
			-webkit-overflow-scrolling:touch;
		}
	}
	.oneList{
		height: 0.8rem;
		background: #fff;
	    padding: 0.1rem 0.2rem;
	    border-top: 1px solid #f1f2f6;
	}
	.date{
		color: #999999;
		font-size: 0.22rem;
		display: flex;
		display: -webkit-flex;
		flex-direction: row;
		-webkit-flex-direction: row;
		justify-content: space-between;
		-webkit-justify-content: space-between;
	}
	.msg{
		width: 6rem;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-size: 0.245rem;
		display: inline-block;
	}
	
	.oneList:nth-child(1){
		border-top: 0;
	}
	.oneTop,.date{
		height: 0.5rem;
	}
	.oneList .money{
		float: right;
		color: #666;
		font-size:0.26rem;
	}
	.box{
		height: 100%;
		background: #f1f2f6;
		font-size: 0.27rem;
	}
	.test{
		font-size: 0.28rem;
		color: #CCCCCC;
	}
	.bankTitle{
		height: 0.8rem;
	    width: 100%;
	    text-align: center;
	    background: #fff;
	    line-height: 0.8rem;
	    font-size: 0.3rem;
	    border-bottom: 1px solid #efeff4;
	}
	.detailed .mint-navbar{
		margin-bottom: 0.2rem;
	}
	.detailed .mint-navbar{
		position: fixed;
		top: 0;
		width: 100%;
		z-index: 1;
		height: 0.8rem;
	}
	.detailed .mint-navbar .mint-tab-item{
		padding: 0.28rem 0;
	}
	.detailed .mint-navbar .mint-tab-item.is-selected{
		color: #5e96d0;
		border-bottom: 1px solid #5e96d0;
		margin-bottom: -1px;
	}
</style>