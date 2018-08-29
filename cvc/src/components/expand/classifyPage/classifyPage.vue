<template>
	<div id="DetailsPage" style="height:100%;">
		<div class="toubu">
			<div class="header" style="height:auto">
				<div class="middle">
					<!--点击弹出筛选框-->
					<p class="menu" @click="blockFn()"><i class="iconfont icon-shaixuan"></i></p>
					<div class="searchInp">
						<i class="iconfont icon-search"></i>
						<input type="text" placeholder="请输入商品名称" v-model="texts"/>
						<i class="iconfont icon-quxiaochacha" @click="clearFn()" style="color:#ccc"></i>
					</div>
					<div class="search" @click="searchFn()">搜索</div>
				</div>
			</div>
			<div class="theIndex">
				<div @click="cgColor($event)" class="thisBox">
					<div class="every newest" @click="newest()">最新<span class="upDown">{{newCount == 1?'&uarr;': newCount == '' ?'':'&darr;'}}</span></div>
					<div class="every sales" @click="sales()">访问<span class="upDown">{{clickCount == 1?'&uarr;': clickCount == '' ?'':'&darr;'}}</span></div>
					<div class="every price" @click="price()">价格<span class="upDown">{{moneyCount == 1?'&uarr;': moneyCount == '' ?'':'&darr;'}}</span></div>
					<div class="layout">
						<i class="group iconfont icon-fenlei" v-show="bool" @click="L_group"></i>
						<i class="list iconfont icon-fenlei1" v-show="!bool" @click="L_group"></i>
					</div>
				</div>
			</div>
		</div>
		<!--商品排列的样式-->
		<div class="goodsComponents" style="padding-top:1.5rem;" ref="goodsComponents">
			<div class="load" v-show="load" style="color:transparent">加载中...</div>
			<div class="load" v-show="nodata" style="color:#999">
				<nodata></nodata>
			</div>
			<div v-if="this.$route.query.navsnum == 2">
				<ul class="goodsList" v-show="bool">
					<li class="eachGood" v-for="(v,k) in arr" @click="jumpFn(v.ser_id)">
						<GoodsT :arr1="v"></GoodsT>
					</li>
				</ul>
				<ul class="goodsList_two" v-show="!bool">
					<li class="eachGood_two" v-for="(item,k) in arr" @click="jumpFn(item.ser_id)">
						<GoodsL :arr1="item"></GoodsL>
					</li>
				</ul>
			</div>
			<div v-if="this.$route.query.navsnum == 1">
				<ul class="goodsList" v-show="bool">
					<li class="eachGood" v-for="(v,k) in arr" @click="jumpFn(v.vid)">
						<GoodsT :arr1="v"></GoodsT>
					</li>
				</ul>
				<ul class="goodsList_two" v-show="!bool">
					<li class="eachGood_two" v-for="(item,k) in arr" @click="jumpFn(item.vid)">
						<GoodsL :arr1="item"></GoodsL>
					</li>
				</ul>
			</div>
			<div class="load" v-show="!load3">加载中...</div>
			<div class="load" v-show="load3">
				<div style="color:#999;margin-top:0.1rem;">
          <loadNo></loadNo>
        </div>
				<div style="color:#999;margin-top:0.1rem;margin-bottom:0.2rem;">
					<div>小象SaaS提供技术支持</div>
					<div>www.saasxx.vip</div>
				</div>
			</div>
		</div>
		<!--隐藏筛选框-->
		<div id="mengceng" @click="noneFn()">
			<div class="navClassify" @click="navClassifyFn()">
				<!-- <div>商品分类</div> -->
				<ul class="uls">
					<li @click="wholeFn()" class="lists">全部商品</li>
					<li v-for="(i,k) in arrClassify" class="lists" @click="listBlock($event,i.type_id,k)">
						<div class="classifyList">
							{{i.type_name}}
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import GoodsL from "../../expand/classifyPage/GoodsL";
	import GoodsT from "../../expand/classifyPage/GoodsT";
	import nodata from '@/components/common/nodata';
  import loadNo from '@/components/common/loadNo';
  import { Tabbar, TabItem } from 'mint-ui';
	import axios from 'axios';
	var qs = require('qs');
	export default {
		props:['navsNum'],
		data:function() {
			return {
                texts:"",
				bool:false,
				arrClassify:[],
				isShow:false,
				comeInData:[],
				cgCol:"",
				navArrTwo:[],
				arr:[],
				filterArr:[],
				num:0,
				abc:1,
				load:true,
				scroll:'',
				load2:false,
				load3:false,
				pageNo:'1',
				pageNo2:'1',
				pageNo3:'1',
				pageNo4:'1',
				newCount:'',
				clickCount:'',
				moneyCount:'',
				nodata:false,
			}
		},
		created(){
			this.global.shouquan();
			if(this.$route.query.title != undefined){
				this.texts = this.$route.query.title;
			}
		},
		mounted(){
			var self = this;
			if(this.$route.query.navsnum == 1){
				var url = '/shop-v1-video_search.html'
			}else{
				var url = '/shop-v1-series_search.html'
			}
			if(this.$route.query.navsnum == 1){
				this.postData('post','/shop-v1-video_type.html').then(res => {
					this.arrClassify = res.data;
				})
			}
			if(this.$route.query.title != undefined){
				if(this.$route.query.catId != undefined){
					this.postData('post',url,{page:1,title:this.$route.query.title,cat_id:this.$route.query.catId}).then(res => {
						if(res.status==200){
							this.load = false;
							this.arr=res.data;
						}
					})
				}else{
					this.postData('post',url,{page:1,title:this.$route.query.title}).then(res => {
						if(res.status==200){
							this.load = false;
							this.arr=res.data;
						}
					})
				}
			}else{
				if(this.$route.query.catId != undefined){
					this.postData('post',url,{page:1,cat_id:this.$route.query.catId}).then(res => {
						if(res.status==200){
							this.load = false;
							this.arr=res.data;
							if(res.data.length < 6){
								this.load3 = true;
							}
						}
					})
				}else{
					this.postData('post',url,{page:1}).then(res => {
						if(res.status==200){
							this.load = false;
							this.arr=res.data;
							if(res.data.length == 0){
								this.load3 = true;
							}
						}
					})
				}
			}
			window.addEventListener('scroll',function(){
				// 判断是不是到底部
				self.scroll = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
	    		if(self.scroll == document.body.scrollHeight - document.body.clientHeight){
	    			if(self.$route.query.navsnum == 1){
	    				var url = '/shop-v1-video_search.html'
	    			}else if(self.$route.query.navsnum == 2){
	    				var url = '/shop-v1-series_search.html'
	    			}
					if(self.load2 == false && self.load3 == false){
						self.load2 = true;
						// console.log(self.load2,1)
						if(self.$route.query.catId != undefined){
							if(self.$route.query.title != undefined){
								self.pageNo = Number(self.pageNo) + Number(1);
								self.postData('post',url,{page:self.pageNo,cat_id:self.$route.query.catId,title:self.$route.query.title}).then(res => {
									if(res.status==200){
										self.load2 = false;
										console.log(res.data.length)
										if(res.data.length == 0){
											self.load3 = true;
											self.pageNo = Number(self.pageNo) - Number(1);
										}else{
											self.arr=self.arr.concat(res.data);
										}
									}
								})
							}else{
								self.pageNo2 = Number(self.pageNo2) + Number(1);
								self.postData('post',url,{page:self.pageNo2,cat_id:self.$route.query.catId}).then(res => {
									if(res.status==200){
										self.load2 = false;
										console.log(res.data.length)
										if(res.data.length == 0){
											self.load3 = true;
											self.pageNo2 = Number(self.pageNo2) - Number(1);
										}else{
											self.arr=self.arr.concat(res.data);
										}
									}
								})
							}
						}else{
							if(self.$route.query.title != undefined){
								self.pageNo3 = Number(self.pageNo3) + Number(1);
								self.postData('post',url,{page:self.pageNo3,title:self.$route.query.title}).then(res => {
									if(res.status==200){
										self.load2 = false;
										console.log(res.data.length)
										if(res.data.length == 0){
											self.load3 = true;
											self.pageNo3 = Number(self.pageNo3) - Number(1);
										}else{
											self.arr=self.arr.concat(res.data);
										}
									}
								})
							}else{
								self.pageNo4 = Number(self.pageNo4) + Number(1);
								self.postData('post',url,{page:self.pageNo4}).then(res => {
									if(res.status==200){
										self.load2 = false;
										console.log(res.data.length)
										if(res.data.length == 0){
											self.load3 = true;
											self.pageNo4 = Number(self.pageNo4) - Number(1);
										}else{
											self.arr=self.arr.concat(res.data);
										}
									}
								})
							}
						}
					}
	    		}

			})
		},
		components:{
			Navigator,
			GoodsL,
      GoodsT,
      nodata,
      loadNo
		},
		methods:{
			L_group:function(){
				this.bool = !this.bool;
			},

			//清除input搜索框的value值
			clearFn:function(){
				this.texts="";
			},

			//点击搜索按钮
			searchFn:function(){
				this.arr = [];
				this.load = true;
				this.load2=false;
				this.load3=true;
				this.nodata=false;
				if(this.$route.query.navsnum == 1){
					var url = '/shop-v1-video_search.html'
				}else{
					var url = '/shop-v1-series_search.html'
				}
				if(this.$route.query.catId != undefined){
					this.postData('post',url,{page:1,cat_id:this.$route.query.catId,title:this.texts}).then(res => {
						if(res.status==200){
							this.load = false;
							this.arr=res.data;
							if(res.data.length == 0){
								this.nodata=true;
							}
						}
					})
				}else{
					this.postData('post',url,{page:1,title:this.texts}).then(res => {
						if(res.status==200){
							this.load = false;
							this.arr=res.data;
							if(res.data.length == 0){
								this.nodata=true;
							}
						}
					})
				}
			},

			//事件委托    theIndex点击后的颜色改变
            cgColor:function(event){
				var every = document.getElementsByClassName('every');
				for(var i = 0;i<every.length;i++){
				    every[i].style.color = '#666';
				}
				event.target.style.color = '#3385ff';
			},

			//最新
			newest:function(){
				this.load = true;
				this.load2 = false;
				this.load3 = false;
				this.nodata=false;
				this.arr = [];
				var self = this;
				function count(a){
					if(a.length < 6){
						self.load3 = true;
					}
				}
				if(this.$route.query.navsnum == 1){
					var url = '/shop-v1-video_search.html'
				}else{
					var url = '/shop-v1-series_search.html'
				}
				if(this.newCount == 1){
					this.newCount = 2
				}else{
					this.newCount = 1
				}
				if(this.$route.query.title != undefined){
					if(this.$route.query.catId != undefined){
						this.postData('post',url,{page:1,title:this.$route.query.title,cat_id:this.$route.query.catId,time:this.newCount}).then(res => {
							if(res.status==200){
								this.load = false;
								this.arr=res.data;
								count(this.arr)
							}
						})
					}else{
						this.postData('post',url,{page:1,title:this.$route.query.title,time:this.newCount}).then(res => {
							if(res.status==200){
								this.load = false;
								this.arr=res.data;
								count(this.arr)
							}
						})
					}
				}else{
					if(this.$route.query.catId != undefined){
						this.postData('post',url,{page:1,cat_id:this.$route.query.catId,time:this.newCount}).then(res => {
							if(res.status==200){
								this.load = false;
								this.arr=res.data;
								count(this.arr)
							}
						})
					}else{
						this.postData('post',url,{page:1,time:this.newCount}).then(res => {
							if(res.status==200){
								this.load = false;
								this.arr=res.data;
								count(this.arr)
							}
						})
					}
				}
			},

			//销量
			sales:function(){
				this.load = true;
				this.load2 = false;
				this.load3 = false;
				this.nodata=false;
				this.arr = [];
				if(this.$route.query.navsnum == 1){
					var url = '/shop-v1-video_search.html'
				}else{
					var url = '/shop-v1-series_search.html'
				}
				if(this.clickCount == 1){
					this.clickCount = 2
				}else{
					this.clickCount = 1
				}
				if(this.$route.query.title != undefined){
					if(this.$route.query.catId != undefined){
						this.postData('post',url,{page:1,title:this.$route.query.title,cat_id:this.$route.query.catId,click:this.clickCount}).then(res => {
							if(res.status==200){
								this.load = false;
								this.arr=res.data;
							}
						})
					}else{
						this.postData('post',url,{page:1,title:this.$route.query.title,click:this.clickCount}).then(res => {
							if(res.status==200){
								this.load = false;
								this.arr=res.data;
							}
						})
					}
				}else{
					if(this.$route.query.catId != undefined){
						this.postData('post',url,{page:1,cat_id:this.$route.query.catId,click:this.clickCount}).then(res => {
							if(res.status==200){
								this.load = false;
								this.arr=res.data;
							}
						})
					}else{
						this.postData('post',url,{page:1,click:this.clickCount}).then(res => {
							if(res.status==200){
								this.load = false;
								this.arr=res.data;
							}
						})
					}
				}
			},

			//价钱
			price:function(){
				this.load = true;
				this.load2 = false;
				this.load3 = false;
				this.nodata=false;
				this.arr = [];
				var self = this;
				function count(a){
					if(a.length < 6){
						self.load3 = true;
					}
				}
				if(this.$route.query.navsnum == 1){
					var url = '/shop-v1-video_search.html'
				}else{
					var url = '/shop-v1-series_search.html'
				}
				if(this.moneyCount == 1){
					this.moneyCount = 2
				}else{
					this.moneyCount = 1
				}
				if(this.$route.query.title != undefined){
					if(this.$route.query.catId != undefined){
						this.postData('post',url,{page:1,title:this.$route.query.title,cat_id:this.$route.query.catId,money:this.moneyCount}).then(res => {
							if(res.status==200){
								this.load = false;
								this.arr=res.data;
							}
						})
					}else{
						this.postData('post',url,{page:1,title:this.$route.query.title,money:this.moneyCount}).then(res => {
							if(res.status==200){
								this.load = false;
								this.arr=res.data;
							}
						})
					}
				}else{
					if(this.$route.query.catId != undefined){
						this.postData('post',url,{page:1,cat_id:this.$route.query.catId,money:this.moneyCount}).then(res => {
							if(res.status==200){
								this.load = false;
								this.arr=res.data;
							}
						})
					}else{
						this.postData('post',url,{page:1,money:this.moneyCount}).then(res => {
							if(res.status==200){
								this.load = false;
								this.arr=res.data;
							}
						})
					}
				}
			},
			//点击li跳转到详情页面
			jumpFn:function(id){
				console.log(id)
				if(this.$route.query.navsnum==1){
					this.$router.push({path:'/details',query:{vid:id}});
				}
				if(this.$route.query.navsnum==2){
					this.$router.push({path:'/details',query:{ser_id:id}});
				}
			},
			//点击显示筛选框
			blockFn:function(){
				var showNav = document.getElementById("mengceng");
				var navClassify = document.querySelector(".navClassify");
				showNav.style.display="block";
				navClassify.style.display="block";
				var speed = 0;
				var a =100;
				var timer= setInterval(function(){
					speed++;
					var b = -a+speed;
					navClassify.style.left=b+"%";
					if(b>=0){
						clearInterval(timer)
					}
				},5)
			},
			//点击隐藏筛选框
			noneFn:function(){
				var showNav = document.getElementById("mengceng");
				var navClassify = document.querySelector(".navClassify");
				navClassify.style.left=-100+"%";
				showNav.style.display="none";
			},
			//筛选框阻止冒泡
			navClassifyFn:function(e){
				var navClassify = document.querySelector(".navClassify");
				var e = e||window.event;
				e.cancelBubble=true;
			},
			//点击全部商品
			wholeFn:function(){
				this.noneFn();
				this.num=-1;
				this.newest();
			},
			//筛选框内的点击事件
			listBlock:function($event,index,i){
				for(let x = 0;x < document.getElementsByClassName('lists').length;x++){
					document.getElementsByClassName('lists')[x].style.color = '#333';
				}
				document.getElementsByClassName('lists')[i+1].style.color = '#3385ff';
				var self = this;
				var data = {
					page:'1',
					type_id:index
				}
				this.postData('post','/shop-v1-video_search.html',data).then(res => {
					this.arr=res.data;
					self.load = false;
					self.load3 = true;
					self.noneFn();
				})
			}
		},
	}
</script>

<style>
	#DetailsPage .goodsComponents{
		background: #f1f2f6;
	}
	.upDown{
		position: relative;
		top: -0.025rem;
	}
	.load{
		font-size: 0.221rem;
		text-align: center;
		color: #999;
	}
	.toubu{
		height: 1.5rem;
	    position: fixed;
	    width: 100%;
	    z-index: 1;
	}
	#DetailsPage{
		width: 100%;
		background: #f1f2f6;
	}
	#DetailsPage .middle{
		width: 100%;
		display: flex;
		height: 0.83rem;
		border: 1px solid #f1f2f6;
		background: #fff;
	}
	#DetailsPage .middle .searchInp{
		flex: 1;
		position: relative;
	}
	#DetailsPage .middle .searchInp input{
		border:0;
		background: #f1f2f6;
		width: 100%;
		padding: 0.1rem 0.7rem 0.1rem 0.7rem;
		font-size: 0.26rem;
		border-radius: 0.3rem;
		outline-style: none;
		box-sizing: border-box;
		position: absolute;
		left: 0;
		top: 0.15rem;
	}
	#DetailsPage .searchInp i{
		font-size: 0.35rem;
		position: absolute;
		color: #999;
		top:0.20rem;
		z-index: 1000;
	}
	#DetailsPage .icon-quxiaochacha{
		margin-top: 0.005rem;

	}
	#DetailsPage .icon-search{
		left: 0.1rem;
	}
	#DetailsPage .icon-quxiaochacha{
		right: 0.1rem;
	}
	#DetailsPage .icon-quxiaochacha:hover{
		color: #3385ff;
	}
	#DetailsPage .menu{
		font-size: 0.4rem;
		padding:0.16rem 0 0 0.2rem;
		color: #3385ff;
	}
	#DetailsPage .menu>i{
		font-size: 0.5rem;
		margin-right: 0.1rem;

	}
	#DetailsPage .middle>div{
		padding: 0.18rem 0.2rem 0 0;
		display: block;
	}
	#DetailsPage .search{
		font-size: 0.3rem;
		color: #3385ff;
		display: block;
		margin-left: 0.1rem;
	}
	#DetailsPage .theIndex{
		display: flex;
		flex-basis: 100%;
		height: 0.6rem;
	}
	#DetailsPage .theIndex>div{
		font-size: 0.26rem;
	}
	.thisBox{
		display: flex;
		flex: 1;
		background: #fff;
		border-bottom: 1px solid #e1e2e6;
	}
	#DetailsPage .thisBox>div{
		flex: 1;
	}
	#DetailsPage .every{
		text-align: center;
		color: #333;
		font-size: 0.26rem;
		padding-top: 0.1rem;
	}
	#DetailsPage .layout {
		padding: 0;
		text-align: center;
		/*flex-basis: 25%;*/
		color: #3385ff;
	}
	#DetailsPage .layout i{
		position: relative;
		top: 0.07rem;
		font-weight: bold;
	}
	#DetailsPage .group{
		font-size: 0.35rem;
	}
	#DetailsPage #mengceng{
		font-size: 0.3rem;
		background-color: rgba(0,0,0,0.6);
		display: none;
		position: fixed;
		top: 0;
		width: 100%;
		height: 100%;
		z-index: 10000;
		font-weight: bolder;
		text-align: center;
	}
	#DetailsPage #mengceng .navClassify{
		width: 40%;
		background-color: #fff;
		padding: 0rem 0 0.1rem;
		height: 100%;
		position: fixed;
		display: none;
		top: 0;
		left: -100%;
	}
	#DetailsPage .navClassify>div:nth-child(1){
		padding: 0.3rem 0 0.3rem 0.2rem;
		border-bottom:1px solid #e1e2e6;
		font-size: 0.27rem;
		font-weight: normal;
	}
	#DetailsPage .navClassify ul>li{
		padding: 0.3rem ;
	}
	#DetailsPage .navClassify ul>li:nth-child(1){
		padding: 0.3rem 0 0.3rem 0.2rem;
		border-bottom:0.01rem solid #ebebeb ;
	}
	#DetailsPage .classifyList>div{
		border-top: 0.01rem solid #ebebeb;
		margin-top:0.1rem;
	}
	#mengceng .navClassify li{
		position: relative;
		border-bottom: 1px solid #e1e2e6;
		font-size: 0.27rem;
		font-weight: normal;
	}
	#mengceng li>div{
		border-top:0.01rem solid #fff ;
	}
	#mengceng .navClassify li i{
		position: absolute;
		right: 0.1rem;
		top: 0.3rem;
		font-size: 0.4rem;
	}
	.goodsList{
		display: flex;
		flex-wrap: wrap;
		width: 100%;
		margin: 0 auto;
		display: flex;
		text-align: left;
		min-height: calc(100vh - 3.2rem);
	}
	.eachGood{
		width: 50%;
		background-color: #fff;
		box-sizing: border-box;
		border: 0.1rem solid #f1f2f6;
		/*padding: 0.1rem;*/
		border-collapse: collapse;
		position: relative;
		height: 4rem;
	}
	.goodsList_two{
		flex-wrap: wrap;
		width: 100%;
		margin: 0 auto;
		text-align: left;
		min-height: calc(100vh - 3.2rem);
	}
	.eachGood_two{
		background-color:#fff;
		flex-basis:100%;
		background-color:#fff;
		position: relative;
		height: 2.1rem;
		padding-right: 0.1rem;
		border-top: 1px solid #f1f2f6;
	}
	.eachGood_two:nth-child(1){
		margin-top: 0.1rem;
		border-bottom: 0;
	}
</style>
