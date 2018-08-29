<template>
	<!-- 列 -->
		<div class="goodsL">
			<div class="goods_images">
				<!-- <img :src="arr1.pic" :onerror="errorImg"> -->
				<div class="img" :style="{background:'url('+arr1.pic+')','background-size':'cover'}"></div>
			</div>
			<div class="part_2">
				<div class="kuaiji goodsTexts">
					<div class="tit">{{arr1.title}}{{arr1.ser_title}}</div>
					<div class="prices">
						<span class="i"><span style="font-size:0.24rem;margin-right:0.05rem;">&yen;</span>{{arr1.total_fee}}</span>
						<span class="em" v-show='emToggle'>&yen;{{arr1.sales_fee}}</span>
					</div>
				</div>
			</div>
		</div>
</template>

<script>
	import { Tabbar, TabItem } from 'mint-ui';
	export default {
		props:['arr1'],
		
		data() {
			return {
				errorImg:'this.src="' + require('../../../../static/img/1111.png') + '"',
				emToggle:false,
				comeInDatas:[],
				kong:0,
			}
		},
		created(){
			if(this.arr1.sales_on==1){
				this.emToggle=true;
			}else{
				emToggle:false;
			}
			if(this.arr1.is_free==1){
				this.arr1.total_fee = 0;
			}
		},
		mounted(){
			if(this.arr1.sales_on==1){
				this.emToggle=true;
				this.kong = this.arr1.sales_fee;
				this.arr1.sales_fee = this.arr1.total_fee;
				this.arr1.total_fee = this.kong;
			}
			if(this.arr1.is_free==1){
				this.arr1.total_fee = 0;
			}
		},
		methods:{
         
		},
		mounted:function(){

		}
	}
</script>

<style scoped>
	.goodsL{
		height: 2.1rem;
		font-size: 0.26rem;
	}
	.kuaiji{
		font-size: 0.27rem;
		display: table-cell;
		padding-left: 0.15rem;
		position: relative;
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
		display: table;
		height: 1.9rem;
		width: calc(100% - 3.5rem);
		padding: 0.2rem 0 0 0;
	}		
	.part_2 .tit{
		color: #333;
		font-size: .3rem;
		overflow: hidden;
		-webkit-line-clamp: 2;
		margin-left: 0.1rem;
		float: left;
		width: 3.3rem;
	}
	.part_2 .prices{
		float: left;
    position: absolute;
    bottom: 0.2rem;
    left: 0.25rem;
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
</style>