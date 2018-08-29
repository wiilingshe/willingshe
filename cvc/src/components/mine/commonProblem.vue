<template>
	<div class="commonProblem" v-infinite-scroll="loadMore"
  infinite-scroll-disabled="false" infinite-scroll-immediate-check="false"
  infinite-scroll-distance="0">
  		<nodata v-if="nodata"></nodata>
		<div class="commonProblem-list" v-for="i in list">
			<ul class="commonProblem-list-question">
				<li class="commonProblem-list-question-left">Q：</li>
				<li class="commonProblem-list-question-right">{{i.title}}</li>
			</ul>
			<ul class="commonProblem-list-answer">
				<li class="commonProblem-list-answer-left">A：</li>
				<li class="commonProblem-list-answer-right" v-html="i.content">{{i.content}}</li>
			</ul>
		</div>
		<loadNo v-if="!ifload" style="background-color:#f1f2f6;"></loadNo>
		<footer1 v-if="!ifload" style="background-color:#f1f2f6;"></footer1>
	</div>
</template>
<script>
	import nodata from '@/components/common/nodata';
	import loadNo from '@/components/common/loadNo';
	import footer1 from '@/components/common/footer1';
	export default{
		data(){
			return{
				list:[],
				page:1,
				ifload:true,
				nodata:false,
			}
		},
		created(){
			document.title = '常见问题';
			this.getData('post','/shop-v2-help_get_all_lst.html',{page:1,pageSize:10}).then(res => {
				if(res.data.length == 0){
					this.nodata = true;
				}else{
					this.list = res.data;
					// this.list = this.list.concat(res.data)
				}
			})
		},
		methods:{
			loadMore(){
				if(this.ifload == true){
					this.page = Number(this.page) + Number(1);
					this.getData('post','/shop-v2-help_get_all_lst.html',{page:this.page,pageSize:10}).then(res => {
						if(res.data.length == 0){
							this.ifload = false;
						}else{
							this.list = this.list.concat(res.data);
						}
					})
				}
			}
		},
		components:{nodata,loadNo,footer1}
	}
</script>
<style lang="less">
	.commonProblem{
		background-color: #fff;
		overflow: scroll;
		width: 100%;
		font-size: 0.28rem;
		height: 100vh;
		-webkit-overflow-scrolling:touch;
		&-list{
			width: calc(~"100% - 0.6rem");
			margin:0 auto;
			border-bottom: 1px solid #eee;
			&-question,&-answer{
				li{
					float: left;
				}
				&-left{
				}
				&-right{
					width: 6.4rem;
					overflow: hidden;
				}
			}
			&-question{
				overflow: auto;
				margin-bottom: 0.2rem;
				margin-top: 0.3rem;
			}
			&-answer{
				color: #999;
				overflow: auto;
				padding-bottom: 0.3rem;
			}
		}
	}
</style>