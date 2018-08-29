<template>
	<div class="classLists">
		<div class="classbox" v-show="classbox">
			<div class="classbox-list" v-for="i in typeList" @click="searchtype(i.type_id)">{{i.type_name}}</div>
		</div>
		<div class="header" style="height:0.87rem;">
			<div class="middle">
				<!--点击弹出筛选框-->
				<p class="menu" v-if="this.$route.query.navsnum==1" @click="type()"><i class="iconfont icon-shaixuan"></i></p>
				<div class="searchInp">
					<i class="iconfont icon-search"></i>
					<input type="text" placeholder="请输入商品名称" v-model="texts"/>
					<i class="iconfont icon-quxiaochacha" style="color:#ccc" @click="clear()"></i>
				</div>
				<div class="search" @click="search()">搜索</div>
			</div>
		</div>
		<div class="theIndex">
			<div class="thisBox">
				<div class="every newest" @click="newest()">最新<span class="upDown">{{newCount == 1?'&uarr;': newCount == '' ?'':'&darr;'}}</span></div>
				<div class="every sales" @click="sales()">访问<span class="upDown">{{clickCount == 1?'&uarr;': clickCount == '' ?'':'&darr;'}}</span></div>
				<div class="every price" @click="price()">价格<span class="upDown">{{moneyCount == 1?'&uarr;': moneyCount == '' ?'':'&darr;'}}</span></div>
				<div class="layout">
					<i class="group iconfont icon-fenlei" v-show="bool" @click="L_group"></i>
					<i class="list iconfont icon-fenlei1" v-show="!bool" @click="L_group"></i>
				</div>
			</div>
		</div>
		<ul class="goodsList_two" v-infinite-scroll="loadMore" infinite-scroll-disabled="false" infinite-scroll-immediate-check="false" infinite-scroll-distance="0">
			<li class="eachGood_two" v-for="i in list" @click="detail(i)" v-if="!bool">
				<div class="goodsL">
					<div class="goods_images"><!----> 
						<div v-if="i.pic==''" class="img" :style="{background:'url('+'/static/img/pic_addfengmian.png'+') no-repeat center','background-size':'cover'}"></div>
						<div v-if="i.pic!=''" class="img" :style="{background:'url('+i.pic+') no-repeat center','background-size':'cover'}"></div>
					</div> 
					<div class="part_2">
						<div class="kuaiji goodsTexts">
							<div class="title">{{i.title}}{{i.ser_title}}</div>
							<div style="margin-top:0.6rem;" v-if="i.is_free != 1">
								<span class="i"><span style="font-size:0.24rem;margin-right:0.05rem;">&yen;</span>{{i.sales_on==1?i.sales_fee:i.total_fee}}</span>
								<span class="em" v-if="i.sales_on==1">&yen;{{i.total_fee}}</span>
							</div>
							<div style="margin-top:0.6rem;" v-if="i.is_free == 1">
								<span class="i" style="font-size: 0.24rem;">免费</span>
							</div>
						</div>
					</div>
				</div>
			</li>
			<li class="eachGood" v-for="i in list" @click="detail(i)" v-if="bool">
				<div class="goodsT">
				<div class="pic">
					<!-- <img :src="i.pic" :onerror="errorImg"> -->
					<div v-if="i.pic==''" class="img" :style="{background:'url('+'/static/img/pic_addfengmian.png'+')','background-size':'100%'}"></div>
					<div v-if="i.pic!=''" class="img" :style="{background:'url('+i.pic+')','background-size':'cover'}"></div>
				</div>
				<div class="part_2">
					<dl class="goodsTexts">
						<dt>{{i.title}}{{i.ser_title}}</dt>
						<dd class="clearfix">
							<span>&yen;<span style="font-size:0.28rem;margin-left:0.05rem;">{{i.total_fee}}</span></span>
							<span class="em" v-if='emToggle'>&yen;{{i.sales_fee}}</span><br />
						</dd>
					</dl>
				</div>
			</div>
			</li>
			<loadNo style="display: inline-block;"></loadNo>
		</ul>
	</div>
</template>
<script>
	import { InfiniteScroll } from 'mint-ui';
	import loadNo from '@/components/common/loadNo';
	export default{
		data(){
			return{
				bool:false,
				newCount:'',
				clickCount:'',
				moneyCount:'',
				url:'',
				locationUrl:'',
				page:1,
				parameter:{},
				parameter2:{},
				list:[],
				texts:'',
				typeList:[],
				paramType:1,
				classbox:false,
			}
		},
		created(){
			this.global.shouquan();
			this.locationUrl = window.location.href;
			if(this.$route.query.navsnum == 1){
				this.url = '/shop-v1-video_search.html';
			}else{
				this.url = '/shop-v1-series_search.html';
			}

			if(this.locationUrl.indexOf('catId') != -1){
				this.parameter = {page:1,cat_id:this.$route.query.catId}
			}else if(this.locationUrl.indexOf('title') != -1){
				this.parameter = {page:1,title:this.$route.query.title}
			}else{
				this.parameter = {page:1}
			}

			this.getData('post',this.url,this.parameter).then(res => {
				this.list = res.data;
			})
		},
		methods:{
			searchtype(id){
				this.page = 1;
				this.paramType = 2;
				this.parameter = {page:1,type_id:id};
				this.getData('post','/shop-v1-video_search.html',this.parameter).then(res => {
					this.classbox = false;
					this.list = res.data;
				})
			},
			type(){
				if(this.classbox == false){
					this.getData('get','/shop-v1-video_type.html').then(res => {
						this.classbox = true;
						this.typeList = res.data;
					})
				}else{
					this.classbox = false;
				}
			},
			search(){
				console.log(this.texts)
				this.parameter.title = this.texts;
				this.parameter.page = 1;
				this.page = 1;
				this.getData('post',this.url,this.parameter).then(res => {
					this.list = res.data;
				})
			},
			clear(){
				this.texts = '';
			},
			loadMore(){
				if(this.paramType == 1){
					this.page++;
					this.parameter.page = this.page;
					this.getData('post',this.url,this.parameter).then(res => {
						this.list = this.list.concat(res.data);
					})
				}else{
					this.page++;
					this.parameter.page = this.page;
					this.getData('post',this.url,this.parameter).then(res => {
						this.list = this.list.concat(res.data);
					})
				}
			},
			L_group(){
				this.bool = !this.bool;
			},
			detail(item){
				if(item.ser_id != undefined){
					this.$router.push({path:'/details',query:{ser_id:item.ser_id}})
				}else{
					this.$router.push({path:'/details',query:{vid:item.vid}})
				}
			},
			newest(){
				this.list = []
				if(this.newCount == 1){
					this.newCount = 2
				}else{
					this.newCount = 1
				}
				this.page = 1;
				delete this.parameter['clickCount'];
				delete this.parameter['moneyCount'];
				this.parameter.new = this.newCount;
				this.parameter.page = 1;
				this.getData('post',this.url,this.parameter).then(res => {
					this.list = res.data;
				})
			},
			sales(){
				this.list = []
				if(this.clickCount == 1){
					this.clickCount = 2
				}else{
					this.clickCount = 1
				}
				this.page = 1;
				delete this.parameter['newCount'];
				delete this.parameter['moneyCount'];
				this.parameter.click = this.clickCount;
				this.parameter.page = 1;
				this.getData('post',this.url,this.parameter).then(res => {
					this.list = res.data;
				})
			},
			price(){
				this.list = []
				if(this.moneyCount == 1){
					this.moneyCount = 2
				}else{
					this.moneyCount = 1
				}
				this.page = 1;
				delete this.parameter['newCount'];
				delete this.parameter['clickCount'];
				this.parameter.money = this.moneyCount;
				this.parameter.page = 1;
				this.getData('post',this.url,this.parameter).then(res => {
					this.list = res.data;
				})
			}
		},
		components:{loadNo},
	}
</script>
<style lang="less">
	.classLists{
		.classbox{
			overflow-x: hidden;
			position: fixed;
			top: 0;
			z-index: 20;
			overflow: auto;
			background-color: #fff;
			padding-left: 0.3rem;
			top: 0.8rem;
		    left: 0.2rem;
		    box-shadow: 1px 1px 8px #999;
			&-list{
				width: 2.7rem;
				height: 0.77rem;
				background-color: #fff;
				font-size: 0.28rem;
				line-height: 0.77rem;
				border-bottom: 1px solid #eee;
			}
		}
		width: 100%;
		background: #f1f2f6;
		.goodsComponents{
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
		.middle{
			width: calc(~"100% - 0.2rem");
			padding-left: 0.2rem;
			display: flex;
			height: 0.83rem;
			border: 1px solid #f1f2f6;
			background: #fff;
		}
		.middle .searchInp{
			flex: 1;
			position: relative;
		}
		.middle .searchInp input{
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
		.searchInp i{
			font-size: 0.35rem;
			position: absolute;
			color: #999;
			top:0.20rem;
			z-index: 1000;
		}
		.icon-quxiaochacha{
			margin-top: 0.005rem;

		}
		.icon-search{
			left: 0.1rem;
		}
		.icon-quxiaochacha{
			right: 0.1rem;
		}
		.icon-quxiaochacha:hover{
			color: #3385ff;
		}
		.menu{
			font-size: 0.4rem;
			padding:0.16rem 0 0 0rem;
			color: #3385ff;
		}
		.menu>i{
			font-size: 0.5rem;
			margin-right: 0.1rem;

		}
		.middle>div{
			padding: 0.18rem 0.2rem 0 0;
			display: block;
		}
		.search{
			font-size: 0.3rem;
			color: #3385ff;
			display: block;
			margin-left: 0.1rem;
		}
		.theIndex{
			display: flex;
			flex-basis: 100%;
			height: 0.6rem;
		}
		.theIndex>div{
			font-size: 0.26rem;
		}
		.thisBox{
			display: flex;
			flex: 1;
			background: #fff;
			border-bottom: 1px solid #e1e2e6;
		}
		.thisBox>div{
			flex: 1;
		}
		.every{
			text-align: center;
			color: #333;
			font-size: 0.26rem;
			padding-top: 0.1rem;
		}
		.layout {
			padding: 0;
			text-align: center;
			/*flex-basis: 25%;*/
			color: #3385ff;
		}
		.layout i{
			position: relative;
			top: 0.07rem;
			font-weight: bold;
		}
		.group{
			font-size: 0.35rem;
		}
		#mengceng{
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
		#mengceng .navClassify{
			width: 40%;
			background-color: #fff;
			padding: 0rem 0 0.1rem;
			height: 100%;
			position: fixed;
			display: none;
			top: 0;
			left: -100%;
		}
		.navClassify>div:nth-child(1){
			padding: 0.3rem 0 0.3rem 0.2rem;
			border-bottom:1px solid #e1e2e6;
			font-size: 0.27rem;
			font-weight: normal;
		}
		.navClassify ul>li{
			padding: 0.3rem ;
		}
		.navClassify ul>li:nth-child(1){
			padding: 0.3rem 0 0.3rem 0.2rem;
			border-bottom:0.01rem solid #ebebeb ;
		}
		.classifyList>div{
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
			// border: 0.1rem solid #f1f2f6;
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
			height: calc(~"100vh - 1.47rem");
			overflow-x: hidden;
			-webkit-overflow-scrolling:touch;
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
			// margin-top: 0.1rem;
			border-bottom: 0;
		}
		.goodsL{
			height: 2.1rem;
			font-size: 0.26rem;
		}
		.kuaiji{
			font-size: 0.27rem;
			height: 2.1rem;
			display: table-cell;
			vertical-align: middle;
			padding-left: 0.15rem;
		}
		.eachGood_two>div{
			display: flex;
		}
		.part_1{
			flex-basis:40%;
			position:relative;
			left:0;
			top:0;
			height: 2.5rem;
		}
		.goods_images{
			height: 2.1rem;
			width: 5rem;
			overflow: hidden;
		}
		.goods_images .img,		
		.goods_images img{
			height: 1.8rem;
		    width: calc(100% - 0.15rem);
		    margin-top: 0.15rem;
		    margin-left: 0.15rem;
		    display: inline-block;
		}
							
		.part_2{
			flex-basis: 80%;
			display:table;
			width: calc(~"100% - 3.2rem");
		}		
		.part_2 .title{
			color: #333;
			font-size: 0.26rem;
			overflow: hidden;
		    text-overflow: ellipsis;
			display: -webkit-box;
		    -webkit-box-orient: vertical;
		    -webkit-line-clamp: 2;
		    width: 2.9rem;
		}
		.goodsTexts dd{
			margin: 0.2rem 0;		
		}
		.goodsTexts .i{
			color: red;
			font-size: 0.3rem;
		}					
		.goodsTexts .em{
			color: #666;
			font-size: 0.2rem;
			text-decoration: line-through;
		}
		.goodsTexts .buy{
			padding: 0.1rem;
			border: 0.01rem solid red;
			border-radius: 0.08rem;
			background-color: red;
			color: #fff;
			width: 1.2rem;
			text-align: center;
			font-size: 0.3rem;
			position: absolute;
			right:0.2rem;
			bottom: 0.2rem;
		}
		.eachGood{
			flex-basis: 50%;
			// margin: 0.05rem 0;
			background-color: #fff;
			box-sizing: border-box;
			border: 0.1rem solid #f1f2f6;
			padding: 0.1rem;
			border-collapse: collapse;
			float: left;
			.goodsT .pic{
			/*height: 2.88rem;*/
			}
			.pic .img,
			.pic img{
				// width: 2.7rem;
				height: 2.8rem;
				// margin-left: calc(50% - 1.35rem);
				// margin-top: 0.15rem;
			}
			dt{
				overflow: hidden;
			    text-overflow: ellipsis;
			    white-space: nowrap;
			    width: 2.65rem;
			}
			.goodsList{
				display: flex;
				flex-wrap: wrap;
				width: 100%;
				margin: 0 auto;
				display: flex;
				background-color: lightgray;
				text-align: left;
			}		
			.part_1{
				position: relative;
				left: 0;
				top: 0;
			}
			.goods_images{
				height: 2.95rem;
				width: 2.95rem;
				text-align: center;
			}				
			.goods_images img{
				display: block;
				width: 100%;
				height: 100%;
			}					
			.part_2{
				padding:0.05rem 0.2rem;
			}			
			.goodsTexts dt{
				color: #333;
				font-size: 0.2rem;
			}
			.goodsTexts dd{
				margin: 0.1rem 0;
				font-size: 0.3rem;
			}
			.goodsTexts dd span{
				font-size: 0.22rem;
				display: inline-block;
			}
			.goodsTexts span{
				color: red;
				font-size: 0.3rem;
			}				
			.goodsTexts	.em{
				color: #666;
				font-size: 0.2rem;
				text-decoration: line-through;
			}
			.goodsTexts .buy{
				padding: 0.1rem;
				border: 0.01rem solid red;
				border-radius: 0.08rem;
				background-color: red;
				color: #fff;
				width: 1rem;
				text-align: center;
				font-size: 0.25rem;
				float: right;
			}	
		}
	}
</style>