<template>
	<div class="lookrecord" style="background-color: #fff;" v-infinite-scroll="loadMore"
  infinite-scroll-disabled="false" infinite-scroll-immediate-check="false"
  infinite-scroll-distance="0">
  		<nodata v-if="nodata"></nodata>
		<div class="lookrecord-list" v-for="i in list" @click="datails(i.id,i.article_type)">
			<div class="lookrecord-list-cover">
				<img :src="i.pic">
			</div>
			<div class="lookrecord-list-info">
				<div class="lookrecord-list-info-title">{{i.title}}</div>
				<div class="lookrecord-list-info-time">
					<div class="lookrecord-list-info-time-time">
						{{i.update_time}}
					</div>
					<div class="lookrecord-list-info-time-watch">
						<img src="../../../static/img/home/home_Browsing.png"><span>{{i.click}}</span></i>
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
				list:[],
				page:1,
				url:'',
				ifload:true,
				data:{},
				nodata:false,
			}
		},
		created(){
			document.title = '浏览记录';
			this.getData('post','/shop-v2-history_lst.html',{page:1,type:3}).then(res => {
				if(res.data.length > 0){
					this.list = res.data;
				}else{
					this.nodata = true;
				}
			})

		},
		methods:{
			loadMore(){
				if(this.ifload == true){
					this.page = Number(this.page) + Number(1)
					this.getData('post','/shop-v2-history_lst.html',{page:this.page,type:3}).then(res => {
						if(res.data.length > 0){
							this.list = this.list.concat(res.data);
						}else{
							this.ifload = false;
						}
					})
				}
			},
			datails(id,type){
				switch(type){
					case 1:
						this.$router.push({path:'/mine-course-articles',query:{artid:id}});
					break;
					case 2:
						this.$router.push({path:'/mine-course-vote',query:{artid:id}});
					break;
					case 3:
						this.$router.push({path:'/mine-course-mesay',query:{artid:id}});
					break;
				}
			}
		},
		components:{loadNo,nodata}
	}
</script>
<style lang="less">
	.lookrecord{
		height: 100vh;
		overflow: scroll;
		-webkit-overflow-scrolling:touch;
		&-list{
			width: calc(~"100% - 0.6rem");
			margin: 0 auto;
			border-bottom:1px solid #eee;
			padding-top: 0.3rem;
			padding-bottom: 0.3rem;
			&-cover{
				width: 2.52rem;
				height: 1.52rem;
				background-color: #eee;
				display: inline-block;
				overflow: hidden;
				img{
					width: 2.52rem;
				}
			}
			&-info{
				display: inline-block;
				float: right;
				vertical-align: top;
				width: 4.08rem;
				height: 1.52rem;
				&-title{
					font-size: 0.3rem;
					display: -webkit-box;
				    -webkit-box-orient: vertical;
				    -webkit-line-clamp: 2;
				    overflow: hidden;
				    height: 0.8rem;
				}
				&-time{
					font-size: 0.26rem;
					margin-top: 0.4rem;
					color: #666;
					&-time{
						display: inline-block;
					}
					&-watch{
						display: inline-block;
						float: right;
						img{
			                height: 0.22rem;
			                margin-top: 0.15rem;
			                margin-right: 0.06rem;
			              }
						i{
							font-size: 0.35rem;
							span{
								font-size: 0.26rem;
								display: inline-block;
								margin-left: 0.1rem;
								position: relative;
								top: -0.03rem;
							}
						}
					}
				}
			}
		}
	}
</style>