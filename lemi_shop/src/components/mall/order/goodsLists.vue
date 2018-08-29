<template>
	<div class="goodsLists">
		<div class="search">
			<div @click="goBack()">
				<i class="icon iconfont icon-zuola i1"></i>
			</div>
			<div style="position: relative;">
				<i class="icon iconfont icon-sousuo i2"></i>
				<input type="text" name="" placeholder="请输入商品搜索" ref="searchTitle">
			</div>
			<div class="sousuozi" @click="searchGoods()">
				搜索
			</div>
		</div>
		<div class="orderType">
			<ul class="ul1">
				<li @click="all()" :style="{color:selected==1?'#ef4949':'#333'}">
					<span>综合</span>
					<!-- <ul class="ul2">
						<li>
							<i class="icon iconfont icon-sanjiaoxing-copy-copy"></i>
						</li>
						<li>
							<i class="icon iconfont icon-sanjiaoxing-copy"></i>
						</li>
					</ul> -->
				</li>
				<li @click="newNums()" :style="{color:selected==3?'#ef4949':'#333'}">
					<span>最新</span>
				</li>
				<li @click="saleNums()" :style="{color:selected==2?'#ef4949':'#333'}">
					<span>销量</span>
				</li>
			</ul>
		</div>
		<div class="lists">
			<ul v-infinite-scroll="loadMore" infinite-scroll-disabled="false" infinite-scroll-immediate-check="false">
			  <li v-for="(item,index) in arr" @click="todetails(item.goods_id)">
			  	<!-- <img class="img1" :src="item.pic"> -->
			  	<div class="img1" :style="{'background-image':'url('+item.pic+')','background-size':'cover'}"></div>
			  	<div class="title">
			  		{{item.goods_name}}
			  	</div>
			  	<div class="price" >
			  		&yen; {{item.shop_price}}
			  	</div>
			  </li>
        <li v-if="!(arr&&arr.length)" style="width: 100%;border: none">
          <div class="commentNull" style="text-align: center;padding: 0.5rem 0;color: #999999">
            <i class="icon iconfont icon-empty" style="font-size: 1.8rem"></i>
            <p style="font-size: 0.3rem">暂无商品数据</p>
          </div>
        </li>
			</ul>

		</div>
	</div>
</template>
<script>
	import { InfiniteScroll } from 'mint-ui';
	export default{
		data(){
			return{
				page:'1',
				searchType:'1',
				orderType:'0',
				arr:[],
				parameter:{},
				ifLoad:true,
				selected:'',
        pageIs:true,
			}
		},
		created(){
		    document.title='商品列表';
			this.global.shouquan();
			if(this.$route.query.catId !=undefined){
				if(this.$route.query.name != undefined){
					this.parameter = {page:'1',searchType:'1',orderType:'0',goods_name:this.$route.query.name,cat_id:this.$route.query.catId};
				}else{
					this.parameter = {page:'1',searchType:'1',orderType:'0',cat_id:this.$route.query.catId}
				}
			}else{
				if(this.$route.query.name != undefined){
					this.parameter = {page:'1',searchType:'1',orderType:'0',goods_name:this.$route.query.name};
				}else{
					this.parameter = {page:'1',searchType:'1',orderType:'0'}
				}
			}
//			获取商品列表
      this.postData('post','/shop-g1-goods_lst.html',this.parameter).then(res => {
				this.arr = res.data;
			})
		},
    mounted(){
//		    分享
      this.postData('post','/shop-v1-index_basemsg.html').then(res => {
        this.share('商品列表',res.data.description,res.data.logo)
      })
    },
		methods:{
//        跳转商品详情
			todetails(id){
				this.$router.push({path:'goodDetails',query:{'goods_id':id,type_id:this.$route.query.type_id}})
			},
//      搜索指定商品
			searchGoods(){
				var self = this;
				this.parameter.page = 1;
				this.parameter.goods_name = this.$refs.searchTitle.value;
				this.getData();
			},
//      请求商品数据
			getData(){
				this.page = 1;
				this.postData('post','/shop-g1-goods_lst.html',this.parameter).then(res => {
					this.arr = res.data;
				})
			},
//      综合按键事件
			all(){
				var self = this;
				this.selected = 1;
				this.parameter.page = 1;
				this.parameter.orderType = 0;
				this.getData();
			},
//      最新按键事件
			newNums(){
				this.selected = 3;
				this.parameter.page = 1;
				this.parameter.orderType = 1;
				this.getData();
			},
//      销量按键事件
			saleNums(){
				this.selected = 2;
				this.parameter.page = 1;
				this.parameter.orderType = 2;
				this.getData();
			},
			loadMore(){
        if(this.pageIs){
            this.page = Number(this.page)+Number(1);
            this.parameter.page = this.page;
            this.postData('post','/shop-g1-goods_lst.html',this.parameter).then(res => {
              if(res.data.length != 0){
                this.arr = this.arr.concat(res.data);
              }else{
                this.pageIs = false;
              }
            })
          }
			},
      goBack(){
        this.$router.go(-1);
      }
		}
	}
</script>
<style lang="less">
	.goodsLists{
		font-size: 0.205rem;
		.search{
			display: flex;
			display: -webkit-flex;
			padding: 0.17rem 0;
			border-bottom: 1px solid #eee;
			background-color: #fff;
			height: 0.44rem;
			.i1{
				font-size: 0.3rem;
				line-height: 0.5rem;
				margin-left: 0.17rem;
				margin-right: 0.17rem;
			}
			.i2{
				position: absolute;
				color: #ccc;
			    font-size: 0.35rem;
			    top: 0.05rem;
			    left: 0.05rem;
			}
			input{
				height: 0.43rem;
				border-radius:0.3rem;
				outline-style: none;
				background-color:#eee;
				border: 1px solid #eee;
				text-align: center;
				width: 4.85rem;
				margin-right: 0.17rem;
				-webkit-appearance: none;
			}
			.sousuozi{
				font-size:0.222rem;
				line-height: 0.44rem;
			}
		}
		.orderType{
			height: 0.6rem;
			line-height: 0.6rem;
			font-size: 0.222rem;
			background-color: #fff;
			border-bottom: 1px solid #eee;
			.ul1>li{
				float: left;
				width: 100%/3;
				text-align: center;
				height: 0.6rem;
			}
			.ul2{
			    height: 0.6rem;
			    display: inline-table;
			    position: relative;
    			top: -0.06rem;
			    li{
			    	height: 0.1rem;
			    	i{
			    		font-size: 0.1rem;
			    	}
			    }
			}
		}
		.lists{
			background-color: #fff;
			width: 100%;
			overflow: scroll;
			ul{
				width: 100%;
				height: calc(~"100vh - 1.41rem");
				overflow: scroll;
				-webkit-overflow-scrolling:touch;
				li{
					float: left;
					width: 2.9rem;
					height: 3.41rem;
					border:1px solid #eee;
					background-color: #fff;
					margin-left: 0.17rem;
					margin-top: 0.17rem;
					.img1{
						width: 100%;
						height: 2.645rem;
					}
					.title{
						width: 2.73rem;
						text-overflow: ellipsis;
					    overflow: hidden;
					    white-space: nowrap;
					    font-weight: 500;
					    margin:0.08rem 0 0.05rem 0.085rem;
					}
					.price{
						margin-left: 0.085rem;
						color: #ef4949;
					}
				}
				li:nth-child(2n){
					float: right;
					margin-right: 0.17rem;
				}
			}
		}
	}
</style>
