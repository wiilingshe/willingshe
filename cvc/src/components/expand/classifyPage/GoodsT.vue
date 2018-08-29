<template>
	<!-- 块 -->
		<div class="goodsT">
			<div class="pic">
				<!-- <img :src="arr1.pic" :onerror="errorImg"> -->
				<div class="img" :style="{background:'url('+arr1.pic+')','background-size':'cover'}"></div>
			</div>
			<div class="part_2">
				<dl class="goodsTexts">
					<dt>{{arr1.title}}{{arr1.ser_title}}</dt>
					<dd class="clearfix">
						<span>&yen;<span style="font-size:0.28rem;margin-left:0.05rem;">{{arr1.total_fee}}</span></span>
						<span class="em" v-if='emToggle'>&yen;{{arr1.sales_fee}}</span><br />
					</dd>
				</dl>
			</div>
		</div>
</template>

<script>
  		import { Tabbar, TabItem } from 'mint-ui';
		export default {
		props:['arr1'],
        data:function() {
            return {
            	errorImg:'this.src="' + require('../../../../static/img/1111.png') + '"',
            	emToggle:false,
                comeInData:[],
                kong:0,
            }
        },
		mounted(){
			if(this.arr1.sales_on==1){
				this.emToggle=true;
				this.kong = this.arr1.sales_fee;
				this.arr1.sales_fee = this.arr1.total_fee;
				this.arr1.total_fee = this.kong;
			}else{
				this.emToggle=false;
			}
			if(this.arr1.is_free==1){
				this.arr1.total_fee = 0;
			}
		},
        methods:{

        },
    }
</script>

<style scoped>
	.goodsT .pic{
		/*height: 2.88rem;*/
	}
	.pic .img,
	.pic img{
		width: 2.7rem;
		height: 2.7rem;
		margin-left: calc(50% - 1.35rem);
		margin-top: 0.15rem;
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
	.eachGood{
		flex-basis: 50%;
		margin: 0.05rem 0;
		background-color: #fff;
		box-sizing: border-box;
		border: 0.1rem solid #e1e2e6;
		padding: 0.1rem;
		border-collapse: collapse;
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
</style>