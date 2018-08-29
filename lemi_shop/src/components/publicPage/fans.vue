<template>
	<div class="box fansall">
		<div class="header">
			<div><i class="iconfont icon-leimupinleifenleileibie"></i></div>
			<div>
				<i class="iconfont icon-sousuo"></i>
				<input type="text" class="inputs" placeholder="搜索你想要的" v-model="val"/>
			</div>
			<div><span @click="sreach()">搜索</span></div>
		</div>
		<div class="main">
			<div style="width:100%">当前总人数：<span>{{totalNmu}}</span>
			<button  @click="actionSheet()" style="float:right;margin-right:0.2rem;margin-top:0.1rem;font-size:0.26rem;width:1.1rem;">筛选</button>
			</div>
		</div>
		<div class="items">
			<div class="load" v-show="load">加载中...</div>
			<div class="load" v-show="noData1">
				<nodata></nodata>
			</div>
			<ul class="lists" v-infinite-scroll="loadMore" infinite-scroll-disabled="false" infinite-scroll-immediate-check="false">
  				<li class="items_box" v-for="item in arr" @click="fansDetails(item.member_id)">
					<div class="left">
						<img :src="item.face" alt="" />
					</div>
					<div class="rigth">
						<div>{{item.nickname?item.nickname:'暂无昵称'}}</div>
						<div>注册时间:{{item.create_time}}</div>
					</div>
  				</li>
		        <div v-show="load3" style="text-align:center;font-size:0.26rem;color:#999">
              <loadNo></loadNo>
            </div>
		        <div v-show="load2" style="text-align:center;font-size:0.26rem;margin-bottom:0.08rem;">加载中...</div>
		        <div v-show="load3" style="color: rgb(153, 153, 153); font-size: 0.26rem; text-align: center; padding-bottom: 0.2rem;">
		        	<footer1></footer1>
		        </div>
			</ul>

		</div>
		<mt-actionsheet
	        :actions= "data"
	        v-model="sheetVisible">
	    </mt-actionsheet>
	</div>
</template>

<script>
	import { Actionsheet,InfiniteScroll } from 'mint-ui';
	import footer1 from '@/components/publicPage/footer1'
	import nodata from '@/components/common/nodata'
  import loadNo from '@/components/common/loadNo';

  export default {
		data(){
			return {
				arr:[],
				totalNmu:'',
			    data: [{
			        		name: '全部',
			        		method : this.getAll
			      		},{
					       name: '有粉丝',
					       method : this.getFans
					    }, {
			        		name: '有花费',
			        		method : this.getPay
			      		}],
			    sheetVisible: false,
			    load:true,
			    load2:false,
			    load3:false,
			    noData1:false,
			    val:'',
			    type:'',
			    memberid:'',
			    pageNo:'1',
			    listLength:'0',
			}
		},
		created(){
			document.title="我的粉丝";
			this.global.shouquan();
			this.noShare();
			if(this.$route.query.member_id){
				this.memberid = this.$route.query.member_id;
			}
			this.getData('post','shop-v1-user_get_my_fans_list.html',{page:this.pageNo,member_id:this.$route.query.member_id}).then(res => {
				if(res.status == 200){
					if(res.data.status == 1){
						this.load = false;
						this.arr = res.data.data.list;
						this.listLength = res.data.data.list.length;
						this.totalNmu = res.data.data.total_num;
						if(res.data.data.list.length == 0){
							this.nodata1 = true;
						}
					}
				}
			})
		},
		methods:{
			loadMore() {
				if(this.listLength != 0){
					this.load3 = false;
					this.load2 = true;
					this.pageNo = Number(this.pageNo) + Number(1);
					if(this.type == ''){
						var data = {
							page:this.pageNo,
							member_id:this.$route.query.member_id
						}
					}else if(this.type == 'getFans'){
						var data = {
							page:this.pageNo,
							has_fan:1,
							member_id:this.$route.query.member_id
						}
					}else if(this.type == 'getPay'){
						var data = {
							page:this.pageNo,
							has_spend:1,
							member_id:this.$route.query.member_id
						}
					}else if(this.type == 'sreach'){
						var data = {
							page:this.pageNo,
							keyword:this.val,
							member_id:this.$route.query.member_id
						}
					}
					this.postData('post','shop-v1-user_get_my_fans_list.html',data).then(res => {
						if(res.data.status == 1){
							this.listLength = res.data.data.list.length;
							if(res.data.data.list.length === 0){
								this.pageNo = Number(this.pageNo) - Number(1);
								this.load2 = false;
								if(this.arr.length <= 6){
									this.load3 = false;
								}else{
									this.load3 = true;
								}
							}else{
								this.arr = this.arr.concat(res.data.data.list);
								this.load2 = false;
							}
						}
					})
				}
			},
			fansDetails:function(id){
				this.$router.push({path:'/mine-fans-fansDetails',query:{member_id:id}});
			},
			actionSheet: function(){
		    	this.sheetVisible = true;
		    },
		    getFans: function(){
		      this.load3 = false;
		      this.type = 'getFans';
		      this.load = true;
		      this.noData1 = false;
		      this.arr = []
		      this.postData('post','shop-v1-user_get_my_fans_list.html',{page:1,has_fan:1,member_id:this.$route.query.member_id}).then(res => {
		      	if(res.status == 200){
					if(res.data.status == 1){
				      	this.load = false;
				      	this.arr = res.data.data.list;
				      	this.listLength = res.data.data.list.length;
				      	this.totalNmu = res.data.data.total_num;
				      	if(res.data.data.list.length == 0 ){
				      		this.noData1 = true;
				      	}
					}
				}
		      })
		    },
		    getPay: function(){
		      this.load3 = false;
		      this.type = 'getPay';
		      this.load = true;
		      this.noData1 = false;
		      this.arr = []
		      this.postData('post','shop-v1-user_get_my_fans_list.html',{page:1,has_spend:1,member_id:this.$route.query.member_id}).then(res => {
		      	if(res.status == 200){
					if(res.data.status == 1){
				      	this.load = false;
				      	this.arr = res.data.data.list;
				      	this.totalNmu = res.data.data.total_num;
				      	if(res.data.data.list.length == 0 ){
				      		this.noData1 = true;
				      	}
					}
				}
		      })
		    },
		    getAll(){
		      this.load3 = false;
		      this.type = 'getAll';
		      this.load = true;
		      this.noData1 = false;
		      this.arr = []
		      this.postData('post','shop-v1-user_get_my_fans_list.html',{page:1,member_id:this.$route.query.member_id}).then(res => {
		      	if(res.status == 200){
					if(res.data.status == 1){
				      	this.load = false;
				      	this.arr = res.data.data.list;
				      	this.totalNmu = res.data.data.total_num;
				      	if(res.data.data.list.length == 0 ){
				      		this.noData1 = true;
				      	}
					}
				}
		      })
		    },
		    sreach(){
		    	this.type = 'sreach';
		    	this.load3 = false;
		    	this.load = true;
			    this.noData1 = false;
			    this.arr = []
		    	this.postData('post','shop-v1-user_get_my_fans_list.html',{page:1,keyword:this.val,member_id:this.$route.query.member_id}).then(res => {
		    		if(res.status == 200){
		    			if(res.data.status == 1){
		    				this.load = false;
					      	this.arr = res.data.data.list;
					      	this.totalNmu = res.data.data.total_num;
					      	if(res.data.data.list.length == 0 ){
					      		this.noData1 = true;
					      	}
		    			}
		    		}
		    	})
		    }
		},
		components:{footer1,nodata,loadNo},
	}



</script>

<style scoped>
	.fansall .lists{
		height: calc(100vh - 1.9rem);
    	overflow: scroll;
    	-webkit-overflow-scrolling : touch;
	}
	.box{
		height:100%;
	}
	.fansall .header{
		display: flex;
		display:-webkit-flex;
		flex-direction: row;
		background-color: #fcfcfc;
	}

	.fansall .header div:nth-child(2){
		width: 100%;
		position: relative;
		display: flex;
		display:-webkit-flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        padding-left: 0.2rem;
	}

	.fansall .inputs{
		border: 1px solid #e1e2e6;
		font-size: 0.22rem;
		width: 100%;
		height: 0.48rem;
		padding-left: 0.55rem;
		color: #333;
		/*border-radius: 0.08rem;*/
		outline: none;
		-webkit-appearance: none;

	}

	.fansall .icon-sousuo:before{
		font-size: 0.26rem;
		color: #999;
	}

	.fansall .header div:last-child{
		width: 20%;
		height: 1rem;
		display: flex;
		display:-webkit-flex;
		align-self: center;
		align-items: center;
		box-sizing: border-box;
		padding: 0.2rem;


	}
	.fansall .header div span{
		display: block;
		width: 2rem;
		height: 0.48rem;
		background-color: #49adf0;
		font-size: 0.26rem;
		color: white;
		line-height:0.48rem;
		text-align: center;
		/*border-radius: 0.08rem;*/

	}

	.fansall .iconfont{
		font-size: 0.32rem;
		position: absolute;
		top:0.30rem;
		left: 0.32rem;
		color: #99999;
	}

	.fansall .main{
		display: flex;
		display:-webkit-flex;
		background: #fcfcfc;
		margin-top: 0.2rem;
		color: #333;
		height: 0.65rem;
		border-bottom: 1px solid #e1e2e6;
	}
	.fansall .main div{
		font-size: 0.26rem;
		line-height: 0.65rem;
		margin-left: 0.2rem;

	}
	.fansall .main button{
		width: 1rem;
		height: 0.45rem;
		background: #49adf0;
		border:0;
		color: #fff;
	}

	.fansall .items_box{
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		/*margin: 0 0.2rem;*/
		height: 1.4rem;
		border-bottom: 1px solid #f1f2f6;
		background: #fff;
	}

	.fansall .left img{
		width: 1rem;
		height: 1rem;
		border-radius: 50%;
		margin-top: 0.2rem;
		margin-left: 0.2rem;
		border: 1px solid #e1e2e6;
	}

	.fansall .rigth div:nth-child(1){
		font-size: 0.24rem;
		margin: 0.3rem 0 0 0.2rem;
		color: #333;
	}

	.fansall .rigth div:nth-child(2){
		font-size: 0.22rem;
		color: #999;
		margin: 0.1rem 0 0 0.2rem;
	}
	.fansall .main select{
		float: right;
	}
	.fansall .load{
		text-align: center;
		color: #333;
		font-size: 0.26rem;
	}
</style>
