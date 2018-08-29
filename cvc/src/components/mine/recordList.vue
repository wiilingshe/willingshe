<template>
	<div class="recordList" v-infinite-scroll="loadMore" infinite-scroll-disabled="false" infinite-scroll-distance="0" infinite-scroll-immediate-check="false">
		<nodata v-if="nodata"></nodata>
		<div class="recordList-list" v-for="i in arr">
			<div class="recordList-list-box">
				<div class="recordList-list-box-img">
					<img :src="i.buyer_face">
				</div>
				<div class="recordList-list-box-name">{{i.buyer_name}}</div>
				<div class="recordList-list-box-info">
					<div class="recordList-list-box-info-table">
						<div class="recordList-list-box-info-table-cell">
							<div class="recordList-list-box-info-table-cell-title">
								{{i.body}}
							</div>
							<div class="recordList-list-box-info-table-cell-time">
								<span>奖学金：{{Number(i.money)}}元</span>
								<span>{{i.create_time}}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<loadNo v-if="!ifload"></loadNo>
	</div>
</template>
<script>
	import { InfiniteScroll } from 'mint-ui';
	import loadNo from '@/components/common/loadNo';
	import nodata from '@/components/common/nodata';
	export default{
		data(){
			return{
				page:1,
				arr:[],
				ifload:true,
				nodata:false,
			}
		},
		created(){
			document.title = '邀请记录';
			this.getData('post','/shop-v1-user_dist_my_invite_record.html',{page:1}).then(res => {
				if(res.data.length > 0){
					this.arr = res.data;
				}else{
					this.nodata = true;
				}
			})
		},
		methods:{
			loadMore(){
				if(this.ifload == true){
					this.page = Number(this.page) + Number(1);
					this.getData('post','/shop-v1-user_dist_my_invite_record.html',{page:this.page}).then(res => {
						if(res.data.length > 0){
							this.arr = this.arr.concat(res.data);
						}else{
							this.ifload = false;
							this.page = Number(this.page) - Number(1);
						}
					})
				}
			}
		},
		components:{loadNo,nodata}
	}
</script>
<style lang="less">
	.recordList{
		&-list{
			height: 1.76rem;
			width: 100%;
			background-color: #fff;
			&-box{
				width: calc(~"100% - 0.6rem");
				margin: 0 auto;
				height: calc(~"1.76rem - 1px");
				border-bottom: 1px solid #eee;
				overflow: hidden;
				&-img{
					width: 1.12rem;
					height: 1.12rem;
					border-radius: 50%;
					background-color: #eee;
					display: inline-block;
					margin-top: 0.27rem;
					img{
						width: 1.12rem;
						height: 1.12rem;
						border-radius: 50%;
					}
				}
				&-name{
					display: inline-block;
					font-size: 0.26rem;
					vertical-align: top;
					line-height: 1.76rem;
					margin: 0 0.1rem;
					width: 0.8rem;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
				}
				&-info{
					width: 4.3rem;
					display: inline-block;
					vertical-align: top;
					font-size: 0.26rem;
					&-table{
						display: table;
						height: 1.76rem;
						&-cell{
							display: table-cell;
							vertical-align: middle;
							&-title{
								margin-bottom: 0.08rem;
								overflow: hidden;
								white-space: nowrap;
								text-overflow: ellipsis;
								width: 4.5rem;
							}
							&-time{
								color: #666;
								span:nth-child(2){
									float: right;
									position: relative;
									top: 0.03rem;
								}
							}
						}
					}
				}
			}
		}
	}
</style>