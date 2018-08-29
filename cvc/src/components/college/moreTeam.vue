<template>
	<div class="moreTeam">
		<mt-popup v-model="popupVisible" position="top" :modal=false>{{info}}</mt-popup>
		<div class="moreTeam-content" v-infinite-scroll="loadMore" infinite-scroll-disabled="false" infinite-scroll-immediate-check="false" infinite-scroll-distance="0">
			<div class="moreTeam-content-list" v-for="i in list">
				<div class="moreTeam-content-list-img">
					<img :src="i.face">
				</div>
				<div class="moreTeam-content-list-info">
					<div class="moreTeam-content-list-info-table">
						<div class="moreTeam-content-list-info-table-cell">
							<div class="moreTeam-content-list-info-table-cell-name">{{i.nickname}}</div>
							<div class="moreTeam-content-list-info-table-cell-num">还差{{i.lack_count}}人成团</div>
						</div>
					</div>
				</div>
				<div class="moreTeam-content-list-btn" @click="pay(i.ctgr_id)">
					去参团
				</div>
			</div>
		</div>
		<div class="moreTeam-btn" @click="back()">
			返回拼团
		</div>
	</div>
</template>
<script>
	import { InfiniteScroll,Popup } from 'mint-ui';
	export default{
		data(){
			return{
				list:[],
				page:1,
				popupVisible:false,
			}
		},
		created(){
			this.global.shouquan();
			document.title = '全部拼团';
			this.getData('post','/shop-v2-college-get_grp_lst_by_tid.html',{t_id:this.$route.query.id,page:1,size:10}).then(res => {
				this.list = res.data.group_lst;
			})
		},
		methods:{
			pay(id){
				this.getData('post','/shop-v1-pay_order.html',{type:11,term_id:this.$route.query.id,marketing_type:1,ctgr_id:id}).then(res => {
					if(res.data.status == 0){
						this.tip(res.data.msg)
					}
					this.pay1(res.data)
				})
			},
			loadMore(){
				this.page = Number(this.page)+Number(1)
				this.getData('post','/shop-v2-college-get_grp_lst_by_tid.html',{t_id:this.$route.query.id,page:this.page,size:10}).then(res => {
					this.list = this.list.concat(res.data.group_lst);
				})
			},
			back(){
				this.$router.push({path:'/buyPage'})
			},
			tip(msg){
				var self = this;
				this.info = msg;
				this.popupVisible = true;
				setTimeout(function(){
					self.popupVisible = false;
				},2000);
				return false;
			}
		}
	}
</script>
<style lang="less">
	.moreTeam{
		&-content{
			height: calc(~"100vh - 0.9rem");
			overflow: scroll;
			-webkit-overflow-scrolling:touch;
			background-color: #fff;
			&-list{
				width: calc(~"100% - 0.6rem");
				padding: 0.3rem 0;
				margin: 0 auto;
				height: 1rem;
				border-bottom: 1px solid #eee;
				&-img{
					width: 1rem;
					height: 1rem;
					border-radius: 100%;
					background-color: #eee;
					display: inline-block;
					margin-right: 0.1rem;
					img{
						width: 1rem;
						height: 1rem;
						border-radius: 100%;
					}
				}
				&-info{
					height: 0.9rem;
					vertical-align: top;
					display: inline-block;
					&-table{
						height: 0.9rem;
						display: table;
						&-cell{
							display: table-cell;
							vertical-align: middle;
							&-name{
								font-size: 0.3rem;
								color: #222;
								font-weight: bold;
							}
							&-num{
								font-size: 0.26rem;
								color: #999;
							}
						}
					}
				}
				&-btn{
					width: 1.2rem;
					height: 0.5rem;
					border-radius: 0.25rem;
					background-color: #EF4949;
					font-size: 0.28rem;
					text-align: center;
					line-height: 0.5rem;
					color: #fff;
					display: inline-block;
					vertical-align: top;
					margin-top: 0.25rem;
					float: right;
				}
			}
		}
		&-btn{
			width: 100%;
			height: 0.9rem;
			text-align: center;
			line-height: 0.9rem;
			overflow: hidden;
			color: #fff;
			font-size: 0.3rem;
			background-color: #000;
			position: absolute;
			bottom: 0;
		}
	}
</style>