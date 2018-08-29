<template>
	<div class="serAsk">
		<div class="type">
			<ul>
				<li :class="{choose:choosed==1}" @click="selecetType(1)">专栏问答</li>
				<li :class="{choose:choosed==2}" @click="selecetType(2)">单品问答</li>
				<li :class="{choose:choosed==3}" @click="selecetType(3)">导师问答</li>
			</ul>
		</div>
		<audio id="audio" controls="" v-show="false"></audio>
		<div v-show="choosed==1">
			<div class="title">
				<span @click="chooseList(2,-1)" :class="{active:all}">全部</span>
				<span @click="chooseList(2,1)" :class="{active:answered}">未回答</span>
				<span @click="chooseList(2,2)" :class="{active:noanswer}">已回答</span>
			</div>
			<div v-show="load" class="load">加载中...</div>
			<div v-show="load4" class="load">
				<nodata></nodata>
			</div>
			<ul style="height:calc(100vh - 1.5rem);overflow:scroll;-webkit-overflow-scrolling:touch" v-infinite-scroll="loadMore" infinite-scroll-disabled="false" infinite-scroll-distance="10" infinite-scroll-immediate-check="true">
				<li v-for="item in arr" :key="item.id" @click="toDetail(item.id,2)">
		  			<teacherList :info="item,ifdaoshi,tou,name"></teacherList>
				</li>
				<div v-show="load2" class="load">加载中...</div>
				<div v-show="load3" class="load">
          <loadNo></loadNo>
        </div>
			</ul>
		</div>
		<div v-show="choosed==2">
			<div class="title">
				<span @click="chooseList2(1,-1)" :class="{active:all2}">全部</span>
				<span @click="chooseList2(1,1)" :class="{active:answered2}">未回答</span>
				<span @click="chooseList2(1,2)" :class="{active:noanswer2}">已回答</span>
			</div>
			<div v-show="load5" class="load">加载中...</div>
			<div v-show="load6" class="load">
				<nodata></nodata>
			</div>
			<ul style="height:calc(100vh - 1.5rem);overflow:scroll;-webkit-overflow-scrolling:touch" v-infinite-scroll="loadMore2" infinite-scroll-disabled="false" infinite-scroll-distance="10" infinite-scroll-immediate-check="true">
				<li v-for="item in arr2" :key="item.id" @click="toDetail(item.id,1)">
		  			<teacherList :info="item,ifdaoshi,tou,name"></teacherList>
				</li>
				<div v-show="load7" class="load">加载中...</div>
				<div v-show="load8" class="load">
		         	<loadNo></loadNo>
		        </div>
			</ul>
		</div>
		<div v-show="choosed==3">
			<div class="title">
				<span @click="chooseList3(3,-1)" :class="{active:all3}">全部</span>
				<span @click="chooseList3(3,1)" :class="{active:answered3}">未回答</span>
				<span @click="chooseList3(3,2)" :class="{active:noanswer3}">已回答</span>
			</div>
			<div v-show="load9" class="load">加载中...</div>
			<div v-show="load10" class="load">
				<nodata></nodata>
			</div>
			<ul style="height:calc(100vh - 1.5rem);overflow:scroll;-webkit-overflow-scrolling:touch" v-infinite-scroll="loadMore3" infinite-scroll-disabled="false" infinite-scroll-distance="10" infinite-scroll-immediate-check="true">
				<li v-for="item in arr3" :key="item.id" @click="toDetail(item.id,1)">
		  			<teacherList :info="item,ifdaoshi,tou,name"></teacherList>
				</li>
				<div v-show="load11" class="load">加载中...</div>
				<div v-show="load12" class="load">
		         	<loadNo></loadNo>
		        </div>
			</ul>
		</div>
	</div>
</template>
<script>
	import {Navbar,TabItem,InfiniteScroll} from 'mint-ui';
	import teacherList from '@/components/expand/ask/teacherList'
	import nodata from '@/components/common/nodata';
  import loadNo from '@/components/common/loadNo';

	export default{
		data(){
			return{
				selected:'1',
				selected1:'1',
				list:true,
				list1:true,
				reply:false,
				choosed:1,
				arr:[],
				arr2:[],
				arr3:[],
				pageNo:'1',
				pageNo2:'1',
				pageNo3:'1',
				load:true,
				load2:false,
				load3:false,
				load4:false,
				load5:true,
				load6:false,
				load7:false,
				load8:false,
				load9:true,
				load10:false,
				load11:false,
				load12:false,
				type:'2',
				type2:'1',
				type3:'3',
				status:'-1',
				status2:'-1',
				status3:'-1',
				all:true,
				answered:false,
				noanswer:false,
				all2:true,
				answered2:false,
				noanswer2:false,
				all3:true,
				answered3:false,
				noanswer3:false,
				ifdaoshi:'0',
				tou:'',
				name:'',
				listLength:'0',
				listLength2:'0',
				listLength3:'0',
			}
		},
		created(){
			document.title = '我的提问';
			this.global.shouquan();
			this.noShare();
			this.postData('post','/shop-v1-user_base_info.html').then(res => {
				if(res.data.status == 1){
					this.name = res.data.data.nickname;
					this.tou = res.data.data.face;
				}
			})
			this.postData('post','shop-v2-ask_user.html',{source_type:this.type,page:this.pageNo,status:this.status}).then(res => {
				this.arr = res.data;
				this.listLength = res.data.length;
				if(res.data.length == 0){
					this.load = false;
					this.load4 = true;
				}else{
					this.load = false;
				}
			})
		},
		components:{teacherList,nodata,loadNo},
		methods:{
			// video(status){
			// 	this.choosed = status;
			// 	// this.list = !this.list;
			// 	// if(status == true){
			// 	// }
			// },
			// course(status){
			// 	// if(status == false){
			// 	// 	this.choosed = !this.choosed;
			// 	// 	this.list = !this.list;
			// 	// }
			// 	this.choosed = status;
			// },
			// teacher(){

			// },
			selecetType(type){
				this.choosed = type;
			},
			toDetail(id,type){
				var self = this;
				// if(type == 2){
				// 	this.$router.push({path:'/problemDetails',query:{id:id}});
				// }else{
				// 	this.$router.push({path:'/problemDetails',query:{id:id}});
				// }
				this.$router.push({path:'/problemDetails',query:{id:id}});
			},
			chooseList(type,status){
				this.type = type;
				if(status == 0){
					this.status = 2;
				}else{
					this.status = status;
				}
				this.load = true;
				this.load4 = false;
				this.load3 = false;
				this.arr = [];
				this.pageNo = '1';
				if(status == -1){
					this.all = true;
					this.answered = false;
					this.noanswer = false;
				}else if(status == 1){
					this.all = false;
					this.answered = true;
					this.noanswer = false;
				}else if(status == 2){
					this.all = false;
					this.answered = false;
					this.noanswer = true;
				}
				this.postData('post','shop-v2-ask_user.html',{source_type:type,page:this.pageNo,status:status}).then(res => {
					this.arr = res.data;
					this.listLength = res.data.length;
					if(res.data.length == 0){
						this.load = false;
						this.load4 = true;
					}else{
						this.load = false;
					}
				})
			},
			chooseList2(type,status){
				this.type2 = type;
				this.status2 = status;
				this.load5 = true;
				this.load6 = false;
				this.load8 = false;
				this.arr2 = [];
				this.pageNo2 = '1';
				if(status == -1){
					this.all2 = true;
					this.answered2 = false;
					this.noanswer2 = false;
				}else if(status == 1){
					this.all2 = false;
					this.answered2 = true;
					this.noanswer2 = false;
				}else if(status == 2){
					this.all2 = false;
					this.answered2= false;
					this.noanswer2 = true;
				}
				this.postData('post','shop-v2-ask_user.html',{source_type:type,page:this.pageNo2,status:status}).then(res => {
					this.arr2 = res.data;
					this.listLength2 = res.data.length;
					if(res.data.length == 0){
						this.load5 = false;
						this.load6 = true;
					}else{
						this.load5 = false;
					}
				})
			},
			chooseList3(type,status){
				this.type3 = type;
				this.status3 = status;
				this.load9 = true;
				this.load10 = false;
				this.load12 = false;
				this.arr3 = [];
				this.pageNo3 = '1';
				if(status == -1){
					this.all3 = true;
					this.answered3 = false;
					this.noanswer3 = false;
				}else if(status == 1){
					this.all3 = false;
					this.answered3 = true;
					this.noanswer3 = false;
				}else if(status == 2){
					this.all3 = false;
					this.answered3= false;
					this.noanswer3 = true;
				}
				this.postData('post','shop-v2-ask_user.html',{source_type:type,page:this.pageNo3,status:status}).then(res => {
					this.arr3 = res.data;
					this.listLength3 = res.data.length;
					if(res.data.length == 0){
						this.load9 = false;
						this.load10 = true;
					}else{
						this.load9 = false;
					}
				})
			},
			loadMore(){
				if(this.listLength != 0){
					this.load2 = true;
					this.pageNo = Number(this.pageNo) + Number(1);
					this.postData('post','shop-v2-ask_user.html',{source_type:this.type,page:this.pageNo,status:this.status}).then(res => {
						this.arr = this.arr.concat(res.data);
						if(res.data.length != 0){
							this.load2 = false;
						}else if(res.data.length == 0){
							this.listLength = 0;
							this.load2 = false;
							this.load3 = true;
							this.pageNo = Number(this.pageNo) - Number(1);
						}
					})
				}
			},
			loadMore2(){
				if(this.listLength2 != 0){
					this.load7 = true;
					this.pageNo2 = Number(this.pageNo2) + Number(1);
					this.postData('post','shop-v2-ask_user.html',{source_type:this.type2,page:this.pageNo2,status:this.status2}).then(res => {
						this.arr2 = this.arr2.concat(res.data);
						if(res.data.length != 0){
							this.load7 = false;
						}else if(res.data.length == 0){
							this.listLength2 = 0;
							this.load7 = false;
							this.load8 = true;
							this.pageNo2 = Number(this.pageNo2) - Number(1);
						}
					})
				}
			},
			loadMore3(){
				if(this.listLength3 != 0){
					this.load11 = true;
					this.pageNo3 = Number(this.pageNo3) + Number(1);
					this.postData('post','shop-v2-ask_user.html',{source_type:this.type3,page:this.pageNo3,status:this.status3}).then(res => {
						this.arr3 = this.arr3.concat(res.data);
						if(res.data.length != 0){
							this.load11 = false;
						}else if(res.data.length == 0){
							this.listLength3 = 0;
							this.load11 = false;
							this.load12 = true;
							this.pageNo3 = Number(this.pageNo3) - Number(1);
						}
					})
				}
			}
		},
		watch:{
			choosed(val,oldval){
				if(val == 1){
					this.pageNo = 1;
					this.postData('post','shop-v2-ask_user.html',{source_type:this.type,page:this.pageNo,status:this.status}).then(res => {
						this.arr = res.data;
						this.listLength = res.data.length;
						if(res.data.length == 0){
							this.load = false;
							this.load4 = true;
						}else{
							this.load = false;
						}
					})
				}else if(val == 2){
					this.pageNo2 = 1;
					this.postData('post','shop-v2-ask_user.html',{source_type:this.type2,page:this.pageNo2,status:this.status2}).then(res => {
						this.arr2 = res.data;
						this.listLength2 = res.data.length;
						if(res.data.length == 0){
							this.load5 = false;
							this.load8 = true;
						}else{
							this.load5 = false;
						}
					})
				}else if(val == 3){
					this.pageNo3 = 1;
					this.postData('post','shop-v2-ask_user.html',{source_type:this.type3,page:this.pageNo3,status:this.status3}).then(res => {
						this.arr3 = res.data;
						this.listLength3 = res.data.length;
						if(res.data.length == 0){
							this.load9 = false;
							this.load12 = true;
						}else{
							this.load9 = false;
						}
					})
				}
			}
		}
	}
</script>
<style lang="less">
	.serAsk{
		font-size: 0.26rem;
	}
	.serAsk ul{
		color: #999;
	}
	.serAsk .choose{
		color: #5e96d0;
		border-bottom: 1px solid #5e96d0;
	}
	.serAsk .load{
		text-align: center;
	}
	.serAsk .active{
		color: #5e96d0;
	}
	.serAsk .type{
		background-color: #fff;
		width: 100%;
		height: 0.8rem;
		line-height: 0.8rem;
		border-bottom: 1px solid #ddd;
		font-size: 0.25rem;
	}
	.serAsk .title{
		height: 0.682rem;
		color: #999;
		background-color: #fff;
		font-size: 0.222rem;
	}
	.serAsk .title span{
		background-color: #fff;
		display: inline-block;
		padding: 0.05rem 0.2rem;
		border-radius: 0.3rem;
		margin-top: 0.13rem;
		margin-left: 0.3rem;
	}
	.serAsk .type ul li{
		float: left;
		width: 100%/3;
		text-align: center;
	}
	.serAsk .askEd{
		font-size: 0.26rem;
		/*min-height: 3rem;*/
		min-height: auto;
		background-color: #fff;
		width: calc(100% - 0.8rem);
		padding: 0.3rem 0.4rem;
	}
	.serAsk .askEd2{
		font-size: 0.26rem;
		background-color: #fff;
		width: calc(100% - 0.8rem);
		padding: 0.3rem 0.4rem;
		margin-bottom: 0.2rem;
	}
	.serAsk .wenti{
		font-size: 0.28rem;
	    color: #000;
	    margin-top: 0.1rem;
	}
	.serAsk .wenti2{
		font-size: 0.28rem;
	    color: #000;
	    margin-top: 0.1rem;
	    overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
	}
	.serAsk .voice{
		height: 0.7rem;
    	width: 4rem;
	    /*background-color: #fe5875;*/
	    display: inline-block;
	    border-radius: 0.8rem;
	    margin-top: 0.2rem;
	    /*text-align: center;*/
	    position: relative;
	}
	.serAsk .listlenCount{
		position: absolute;
	    right: 0;
	    line-height: 1.2rem;
	    color: #666;
	}
	.serAsk .voice i{
		position: absolute;
	    color: #fff;
	    line-height: 0.8rem;
	    left: 0.2rem;
	}
	.serAsk .voice span{
		line-height: 0.7rem;
	    color: #fff;
	    font-size: 0.26rem;
	    display: inline-block;
	}
	.serAsk .xinxi{
		height: 0.6rem;
		color: #666;
	}
	.serAsk .xinxi img{
		height: 0.6rem;
		width: 0.6rem;
		border-radius: 0.6rem;
		margin-right: 0.2rem;
	}
	.serAsk .xinxi ul li{
		float: left;
	}
	.serAsk .xinxi .name{
		line-height: 0.6rem;
	}
	.serAsk .serAsk .type{

	}
</style>
