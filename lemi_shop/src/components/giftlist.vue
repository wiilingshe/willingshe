<template>
	<div class="gifilist">
		<mt-navbar v-model="selected">
		  <mt-tab-item id="1">全部</mt-tab-item>
		  <mt-tab-item id="2">已发放</mt-tab-item>
		  <mt-tab-item id="3">未发放</mt-tab-item>
		</mt-navbar>
		<mt-tab-container v-model="selected">
		  <mt-tab-container-item id="1">
		  	<ul v-infinite-scroll="loadMore" infinite-scroll-disabled="false" infinite-scroll-distance="10" infinite-scroll-immediate-check="true">
		  		<nodata v-if="noData1"></nodata>
				  <li v-for="item in arr">
				  	<table width="100%;">
				  		<tr>
				  			<td width="20%">
				  				<img :src="item.pic!=''?item.pic:moren" style="margin-left:0.2rem;">
				  			</td>
				  			<td>
				  				<div style="margin-right:0.2rem;">
					  				<div>
					  					<span>
					  						{{item.prize_title}}
					  						<span style="color:red;font-size:0.2rem;">
						  						({{item.status==1?'已发放':'未发放'}})
						  					</span>
					  					</span>
					  					<span style="float:right">{{item.code}}</span>
					  				</div>
					  				<div style="margin-top:0.2rem;float:right;color:#999">{{item.create_time}}</div>
				  				</div>
				  			</td>
				  		</tr>
				  	</table>
				  </li>
				</ul>
		  </mt-tab-container-item>
		  <mt-tab-container-item id="2">
	  		<ul v-infinite-scroll="loadMore2" infinite-scroll-disabled="false" infinite-scroll-distance="10" infinite-scroll-immediate-check="true">
			  	<nodata v-if="noData2"></nodata>
				  <li v-for="item in arr2">
				  	<table width="100%;">
				  		<tr>
				  			<td width="20%">
				  				<img :src="item.pic!=''?item.pic:moren" style="margin-left:0.2rem;">
				  			</td>
				  			<td>
				  				<div style="margin-right:0.2rem;">
					  				<div>
					  					<span>
					  						{{item.prize_title}}
					  						<span style="color:red;font-size:0.2rem;">
						  						({{item.status==1?'已发放':'未发放'}})
						  					</span>
					  					</span>
					  					<span style="float:right">{{item.code}}</span>
					  				</div>
					  				<div style="margin-top:0.2rem;float:right;color:#999">{{item.create_time}}</div>
				  				</div>
				  			</td>
				  		</tr>
				  	</table>
				  </li>
				</ul>
		  </mt-tab-container-item>
		  <mt-tab-container-item id="3">
		  	<ul v-infinite-scroll="loadMore3" infinite-scroll-disabled="false" infinite-scroll-distance="10" infinite-scroll-immediate-check="true">
				  <nodata v-if="noData3"></nodata>
				  <li v-for="item in arr3">
				  	<table width="100%;">
				  		<tr>
				  			<td width="20%">
				  				<img :src="item.pic!=''?item.pic:moren" style="margin-left:0.2rem;">
				  			</td>
				  			<td>
				  				<div style="margin-right:0.2rem;">
					  				<div>
					  					<span>
					  						{{item.prize_title}}
					  						<span style="color:red;font-size:0.2rem;">
						  						({{item.status==1?'已发放':'未发放'}})
						  					</span>
					  					</span>
					  					<span style="float:right">{{item.code}}</span>
					  				</div>
					  				<div style="margin-top:0.2rem;float:right;color:#999">{{item.create_time}}</div>
				  				</div>
				  			</td>
				  		</tr>
				  	</table>
				  </li>
				</ul>
		  </mt-tab-container-item>
		</mt-tab-container>
	</div>
</template>
<script>
	import { InfiniteScroll,Toast,Navbar, TabItem,Indicator } from 'mint-ui'
	import nodata from '@/components/common/nodata'
	export default{
		data(){
			return{
				pageNo:'1',
				pageNo2:'1',
				pageNo3:'1',
				status:'-1',
				status2:'1',
				status3:'0',
				arr:[],
				arr2:[],
				arr3:[],
				selected:'1',
				moren:'http://vrjishu1.oss-cn-shenzhen.aliyuncs.com/logo.jpg',
				prelength:'',
				prelength2:'',
				prelength3:'',
				noData1:false,
				noData2:false,
				noData3:false,
			}
		},
		created(){
			this.global.shouquan();
			this.noShare();
			document.title = '奖品列表';
			this.postData('post','/shop-v1-draw_get_user_draw_prize.html',{page:this.pageNo,status:this.status}).then(res => {
				console.log(res);
				if(res.data.length!=0){
					this.arr = res.data
				}else{
					this.noData1 = true;
				}
			})
			// this.postData('post','/shop-v1-draw_get_user_draw_prize.html',{page:this.pageNo2,status:this.status2}).then(res => {
			// 	this.arr2 = res.data
			// })
			// this.postData('post','/shop-v1-draw_get_user_draw_prize.html',{page:this.pageNo3,status:this.status3}).then(res => {
			// 	this.arr3 = res.data
			// })
		},
		methods:{
			loadMore(){
				if(this.prelength != 0 || this.prelength == ''){
					Indicator.open();
				}
				this.pageNo = Number(this.pageNo) + Number(1);
				this.postData('post','/shop-v1-draw_get_user_draw_prize.html',{page:this.pageNo,status:this.status}).then(res => {
					Indicator.close();
					if(res.data.length != 0){
						this.prelength = res.data.length;
						this.arr = this.arr.concat(res.data)
					}else{
						this.prelength = res.data.length;
						this.pageNo = Number(this.pageNo) - Number(1);
						Toast({
							message:'最后一页了',
							duraction:200
						})
					}
				})
			},
			loadMore2(){
				if(this.prelength2 != 0 || this.prelength2 == ''){
					Indicator.open();
				}
				this.pageNo2 = Number(this.pageNo2) + Number(1);
				this.postData('post','/shop-v1-draw_get_user_draw_prize.html',{page:this.pageNo2,status:this.status2}).then(res => {
					Indicator.close();
					if(res.data.length != 0){
						this.prelength2 = res.data.length;
						this.arr2 = this.arr2.concat(res.data)
					}else{
						this.prelength2 = res.data.length;
						this.pageNo2 = Number(this.pageNo2) - Number(1);
						Toast({
							message:'最后一页了',
							duraction:200
						})
					}
				},res => {
					console.log('错误')
				})
			},
			loadMore3(){
				if(this.prelength3 != 0 || this.prelength3 == ''){
					Indicator.open();
				}
				this.pageNo3 = Number(this.pageNo3) + Number(1);
				this.postData('post','/shop-v1-draw_get_user_draw_prize.html',{page:this.pageNo3,status:this.status3}).then(res => {
					Indicator.close();
					if(res.data.length != 0){
						this.arr3 = this.arr3.concat(res.data);
						this.prelength3 = res.data.length;
					}else{
						this.prelength3 = res.data.length;
						this.pageNo3 = Number(this.pageNo3) - Number(1);
						Toast({
							message:'最后一页了',
							duraction:200
						})
					}
				})
			}
		},
		watch:{
			selected(val,oldval){
				if(val == 1 && this.arr.length == 0){
					this.postData('post','/shop-v1-draw_get_user_draw_prize.html',{page:this.pageNo,status:this.status}).then(res => {
						if(res.data.length!=0){
							this.arr = res.data
						}else{
							this.noData1 = true;
						}
					})
				}else if(val == 2 && this.arr2.length == 0){
					this.postData('post','/shop-v1-draw_get_user_draw_prize.html',{page:this.pageNo2,status:this.status2}).then(res => {
						if(res.data.length!=0){
							this.arr2 = res.data
						}else{
							this.noData2 = true;
						}
					})
				}else if(val == 3 && this.arr3.length == 0){
					this.postData('post','/shop-v1-draw_get_user_draw_prize.html',{page:this.pageNo3,status:this.status3}).then(res => {
						if(res.data.length!=0){
							this.arr3 = res.data
						}else{
							this.noData3 = true;
						}
					})
				}
			}
		},
		components:{nodata}
	}
</script>
<style lang="less">
	.gifilist{
		font-size: 0.26rem;
		height: 100%;
		overflow: hidden;
		.mint-navbar{
			height: 0.8rem;
			position: fixed;
			top: 0;
			z-index: 1;
			width: 100%;
		}
		.mint-navbar .mint-tab-item.is-selected{
			border-bottom: 2px solid #ff9421;
		    color: #ff9421;
		    margin-bottom: -2px;
		    font-size: 0.26rem;
		}
		.mint-tab-item-label{
			// line-height: 0.1rem;
			font-size: 0.26rem;
		}
		img{
			width: 1rem;
			height: 1rem;
		}
		ul{
			height: calc(100vh - 0.8rem);
			overflow: scroll;
			-webkit-overflow-scrolling:touch;
			margin-top: 0.9rem;
		}
		li{
			background-color: #fff;
			border-top: 1px solid #f1f2f6;
			height: 1.1rem;
			padding-top: 0.05rem;
		}
		li:last-child{
			margin-bottom: 0.9rem;
		}
		.load{
			text-align: center;
		}
	}
	.gifilist .mint-navbar .mint-tab-item.is-selected{
		    border-bottom: 1px solid #5e96d0;
		    color: #5e96d0;
		    margin-bottom: -1px;
	}
</style>