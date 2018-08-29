<!--钱包明细页-->
<template>
	<div class="box detailed">
		<mt-navbar v-model="selected">
		  <mt-tab-item id="1">全部</mt-tab-item>
		  <mt-tab-item id="2">支出</mt-tab-item>
		  <mt-tab-item id="3">收入</mt-tab-item>
		</mt-navbar>
		<mt-tab-container v-model="selected">
		  <mt-tab-container-item id="1">
		  	<div id="trueHeight1">
			  	<div class="oneList" v-for="i in recordList">
			  		<div class="oneTop">
			  			<span class="lei" v-if="i.type == 1 && i.msg == ''">分佣</span>
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
		  	<div id="trueHeight2">
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
		  	<div style="height:1rem;"></div>
		  	<div id="trueHeight3">
			  	<div class="oneList" v-for="i in incomeList">
			  		<div class="oneTop">
			  			<!-- <span class="lei">分佣</span> -->
			  			<span class="msg">{{i.msg}}</span>
			  		</div>
			  		<div class="date">
			  			<span class="time">{{i.create_time}}</span>
			  			<span class="money">+{{i.bonus}}</span>
			  		</div>
			  	</div>
			</div>
		  </mt-tab-container-item>
		</mt-tab-container>
		<nodata v-show="nodata"></nodata>
		<div id="footer1">
			<footer1></footer1>
		</div>
	</div>
	
</template>

<script>
	import { Navbar, TabItem,Indicator } from 'mint-ui';
	import nodata from '@/components/common/nodata'
	import footer1 from '@/components/common/footer1'
	export default{
		data(){
			return{
				selected:'1',
				recordList:[],
				payList:[],
				incomeList:[],
				nodata:false,
			}
		},
		created(){
			document.title = '收支明细'
			Indicator.open();
			this.global.shouquan();
			this.noShare();
			this.getData('get','/shop-v1-user_balance_log.html').then(res => {
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
		updated(){
			var trueHeight1 = $('#trueHeight1').height();
			var trueHeight2 = $('#trueHeight2').height();
			var trueHeight3 = $('#trueHeight3').height();
			var allHeight = document.body.clientHeight - $('#footer1').height();
			if(this.selected == 1){
				var trueHeight = trueHeight1;
				if(allHeight > trueHeight){
					$('#footer1').removeAttr('style')
					$('#footer1').css({'position':'absolute','bottom':'0.17rem','width':'100%'})
				}else{
					$('#footer1').removeAttr('style')
					$('#footer1').css({'width':'100%'})
				}
			}else if(this.selected == 2){
				var trueHeight = trueHeight2;
				if(allHeight > trueHeight){
					$('#footer1').removeAttr('style')
					$('#footer1').css({'position':'absolute','bottom':'0.17rem','width':'100%'})
				}else{
					$('#footer1').removeAttr('style')
					$('#footer1').css({'width':'100%'})
				}
			}else if(this.selected == 3){
				var trueHeight = trueHeight1;
				if(allHeight > trueHeight3){
					$('#footer1').removeAttr('style')
					$('#footer1').css({'position':'absolute','bottom':'0.17rem','width':'100%'})
				}else{
					$('#footer1').removeAttr('style')
					$('#footer1').css({'width':'100%'})
				}
			}
		},
		components:{footer1,nodata},
		watch:{
			selected(val){
				this.nodata = false;
				Indicator.open();
				if(val == 1){
					this.getData('get','/shop-v1-user_balance_log.html').then(res => {
						if(res.status == 200){
							if(res.data.length != 0){
								this.recordList = res.data;
							}else{
								this.nodata = true;
							}
							Indicator.close();
						}
						
					})
				}else if(val == 2){
					this.getData('get','/shop-v1-user_balance_log.html?status=1').then(res => {
						if(res.status == 200){
							if(res.data.length != 0){
								this.payList = res.data;
							}else{
								this.nodata = true;
							}
							Indicator.close();
						}
					})
				}else if(val == 3){
					this.getData('get','/shop-v1-user_balance_log.html?status=2').then(res => {
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
		height: 1rem;
	}
	.detailed .mint-navbar .mint-tab-item.is-selected{
		color: #5e96d0;
		border-bottom: 1px solid #5e96d0;
		margin-bottom: -1px;
	}
	#trueHeight1,#trueHeight2{
		margin-top: 1rem;
	}
</style>