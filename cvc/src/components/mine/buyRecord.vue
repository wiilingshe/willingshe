<template>
	<div class="buyRecord">
		<div class="buyRecord-title">
			<div class="buyRecord-title-list" @click="kecheng()" :style="{color:type==1?'#222':'#888'}">课程
				<span class="line" v-if="type==1"></span>
			</div>
			<div class="buyRecord-title-list" @click="pingtuan()" :style="{color:type==2?'#222':'#888'}">拼团
				<span class="line" v-if="type==2"></span>
			</div>
			<div class="buyRecord-title-list" @click="recharge()" :style="{color:type==3?'#222':'#888'}">充值
				<span class="line" v-if="type==3"></span>
			</div>
		</div>
		<div class="buyRecord-box"  v-infinite-scroll="loadMore" infinite-scroll-disabled="false" infinite-scroll-immediate-check="false" infinite-scroll-distance="0" v-show="type==1">
			<nodata v-if="nodata1"></nodata>
			<div class="buyRecord-box-list" v-for="(i,index) in arr1">
				<div class="buyRecord-box-list-box" :style="{'border-bottom':arr1.length==index+1?'none':'1px solid #eee'}">
					<div class="buyRecord-box-list-box-left">
						<div class="table1">
							<div class="tablecell1">
								<div class="buyRecord-box-list-box-left-title">
									{{i.body}}
								</div>
								<div class="buyRecord-box-list-box-left-time">
									{{i.update_time}}
								</div>
							</div>
						</div>
					</div>
					<div class="buyRecord-box-list-box-right">
						-{{i.fee}}元
					</div>
				</div>
			</div>
			<loadNo v-if="!ifload1"></loadNo>
		</div>
		<div class="buyRecord-box"  v-infinite-scroll="loadMore" infinite-scroll-disabled="false" infinite-scroll-immediate-check="false" infinite-scroll-distance="0" v-show="type==2">
			<nodata v-if="nodata2"></nodata>
			<div class="buyRecord-box-list" v-for="i in arr2">
				<div class="buyRecord-box-list-box" :style="{'border-bottom':arr2.length==index+1?'none':'1px solid #eee'}">
					<div class="buyRecord-box-list-box-left">
						<div class="table1">
							<div class="tablecell1">
								<div class="buyRecord-box-list-box-left-title">
									{{i.body}}
								</div>
								<div class="buyRecord-box-list-box-left-time">
									{{i.update_time}}
								</div>
							</div>
						</div>
					</div>
					<div class="buyRecord-box-list-box-right">
						-{{i.fee}}元
					</div>
				</div>
			</div>
			<loadNo v-if="!ifload2"></loadNo>
		</div>
		<div class="buyRecord-box"  v-infinite-scroll="loadMore" infinite-scroll-disabled="false" infinite-scroll-immediate-check="false" infinite-scroll-distance="0" v-show="type==3">
			<nodata v-if="nodata3"></nodata>
			<div class="buyRecord-box-list" v-for="(i,index) in arr3">
				<div class="buyRecord-box-list-box" :style="{'border-bottom':arr3.length==index+1?'none':'1px solid #eee'}">
					<div class="buyRecord-box-list-box-left">
						<div class="table1">
							<div class="tablecell1">
								<div class="buyRecord-box-list-box-left-title">
									{{i.body}}
								</div>
								<div class="buyRecord-box-list-box-left-time">
									{{i.update_time}}
								</div>
							</div>
						</div>
					</div>
					<div class="buyRecord-box-list-box-right">
						+{{i.fee}}元
					</div>
				</div>
			</div>
			<loadNo v-if="!ifload3"></loadNo>
		</div>
	</div>
</template>
<script>
	import { InfiniteScroll } from 'mint-ui';
	import loadNo from '@/components/common/loadNo';
	import nodata from '@/components/common/nodata';
	export default{
		data(){
			return{
				type:1,
				arr1:[],
				arr2:[],
				arr3:[],
				page1:1,
				page2:1,
				page3:1,
				ifload1:true,
				ifload2:true,
				ifload3:true,
				nodata1:false,
				nodata2:false,
				nodata3:false,
			}
		},
		created(){
			document.title = '购买记录';
			this.getData('post','/shop-v2-order_get_buy_record.html',{page:1,type:1}).then(res => {
				if(res.data.length > 0){
					this.arr1 = res.data;
				}else{
					this.nodata1 = true;
				}
			});
			this.getData('post','/shop-v2-order_get_buy_record.html',{page:1,type:2}).then(res => {
				if(res.data.length > 0){
					this.arr2 = res.data;
				}else{
					this.nodata2 = true;
				}
			});
			this.getData('post','/shop-v2-order_get_buy_record.html',{page:1,type:3}).then(res => {
				if(res.data.length > 0){
					this.arr3 = res.data;
				}else{
					this.nodata3 = true;
				}
			});
		},
		methods:{
			kecheng(){
				this.type = 1;
			},
			pingtuan(){
				this.type = 2;
			},
			recharge(){
				this.type = 3;
			},
			loadMore(){
				if(this.type == 1){
					if(this.ifload1 == true){
						this.page1 = Number(this.page1)+Number(1);
						this.getData('post','/shop-v2-order_get_buy_record.html',{page:this.page1,type:1}).then(res => {
							if(res.data.length > 0){
								this.arr1 = this.arr1.concat(res.data);
							}else{
								this.ifload1 = false
							}
						})
					}
				}else if(this.type == 2){
					if(this.ifload2 == true){
						this.page2 = Number(this.page2)+Number(1);
						this.getData('post','/shop-v2-order_get_buy_record.html',{page:this.page2,type:2}).then(res => {
							if(res.data.length > 0){
								this.arr2 = this.arr2.concat(res.data);
							}else{
								this.ifload2 = false
							}
						})
					}
				}else if(this.type == 3){
					if(this.ifload3 == true){
						this.page3 = Number(this.page3)+Number(1);
						this.getData('post','/shop-v2-order_get_buy_record.html',{page:this.page3,type:3}).then(res => {
							if(res.data.length > 0){
								this.arr3 = this.arr3.concat(res.data);
							}else{
								this.ifload3 = false
							}
						})
					}
				}
			}
		},
		watch:{
			type(val,oldval){
				if(val == 1){
					this.type = 1;
				}else if(val == 2){
					this.type = 2;
				}else if(val == 3){
					this.type = 3;
				}
			}
		},
		components:{loadNo,nodata}
	}
</script>
<style lang="less">
	.buyRecord{
		width: 100%;
		height: 0.92rem;
		font-size: 0.28rem;
		&-title{
			width: 100%;
			height: 0.92rem;
			background-color: #fff;
			overflow: hidden;
			white-space: nowrap;
			overflow: hidden;
			margin-bottom: 0.2rem;
			&-list{
				display: inline-block;
				vertical-align: top;
				width: 100%/3;
				height: 0.92rem;
				text-align: center;
				line-height: 0.92rem;
				position: relative;
				span{
					width: 0.52rem;
					height: 0.04rem;
					background-color: #222;
					position: absolute;
					bottom: 0;
					left: calc(~"50% - 0.26rem");
				}
			}
		}
		&-box{
			overflow: auto;
			width: 100%;
			height: calc(~"100vh - 1.03rem");
			overflow: scroll;
			-webkit-overflow-scrolling:touch;
			&-list{
				height: 1.56rem;
				width: 100%;
				background-color: #fff;
				color: #333;
				&-box{
					height: calc(~"1.56rem - 1px");
					width: calc(~"100% - 0.6rem");
					border-bottom: 1px solid #eee;
					margin: 0 auto;
					&-left{
						width: 5rem;
						display: inline-block;
						.table1{
							height: 1.56rem;
							display: table;
						}
						.tablecell1{
							display: table-cell;
							vertical-align: middle;
						}
						&-title{
							width: 5rem;
							overflow: hidden;
							white-space: nowrap;
							text-overflow: ellipsis;
							font-size: 0.3rem;
							margin-bottom: 0.1rem;
						}
						&-time{
							color: #666;
							font-size: 0.26rem;
						}
					}
					&-right{
						display: inline-block;
						vertical-align: top;
						line-height: 1.56rem;
						color: #999;
						float: right;
					}
				}
			}
		}
	}
</style>