<template>
	<div class="tutorList">
		<audio id="audio" v-show="false"></audio>
		<mt-navbar v-model="selected">
		  <mt-tab-item id="1">问题</mt-tab-item>
		  <mt-tab-item id="2">导师</mt-tab-item>
		</mt-navbar>
		<mt-tab-container v-model="selected">
		  <mt-tab-container-item id="1">
		  	<div v-show="data1">
			  	<nodata v-if="arr.length == 0"></nodata>
			  	<ul v-infinite-scroll="loadMore" infinite-scroll-disabled="false" infinite-scroll-immediate-check="false" class="ul3">
				  	<div class="pList" v-for="i in arr" @click="reply(i.id)">
					  	<div class="name1">
					  		<img class="img1" :src="i.face">
					  		<span style="margin-left: 0.11rem;">{{i.nickname}}</span>
					  		<span style="margin-left: 0.2rem;width: 4.4rem;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">问题来自：{{i.source_name}}</span>
					  	</div>
					  	<div class="problem1">
					  		{{i.question}}
					  	</div>
					  	<div class="yuyin1">
					  		<img src="../../../static/img/audioBg.png">
					  		<svg t="1509953101934" class="icon" style="position: absolute;color: #fff;left: 0.2rem;top:0.15rem;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2969" xmlns:xlink="http://www.w3.org/1999/xlink" width="0.4rem" height="0.4rem">
								<path d="M243.90439 513.708336m-115.375401 0a115.375402 115.375402 0 1 0 230.750803 0 115.375402 115.375402 0 1 0-230.750803 0Z" p-id="2970" fill="#ffffff"></path>
								<path v-show="playing2" d="M742.851803 949.902074c204.798938-254.072682 203.298946-623.702766-3.387983-876.241456-15.39292-18.807902-31.011839-35.879814-47.030756-51.738732-30.093844-29.793846-78.857591-29.00585-108.674436 1.065995-30.581841 30.84384-29.424847 80.99158 2.362988 110.591426 3.386982 3.153984 5.615971 5.269973 6.139968 5.81097 200.876958 207.371925 202.41995 536.758217 2.840985 745.955132-0.481998 0.505997-2.554987 2.505987-5.72397 5.506971-31.547836 29.875845-32.294833 80.034585-1.441993 110.627427 30.061844 29.806845 78.815591 30.185843 108.646437 0.147999 15.769918-15.880918 31.135839-32.950829 46.26876-51.725732z" p-id="2971" fill="#ffffff"></path>
								<path v-show="playing" d="M559.939751 733.196198c-13.657929 19.437899-28.634852 37.113808-44.591768 53.023725-29.387848 29.300848-77.296599 28.509852-106.766447-0.709996l-1.434992-1.422993c-31.764835-31.495837-30.189843-82.84857 2.879985-112.437417 6.804965-6.088968 11.64394-10.720944 12.957933-12.333936 71.27963-87.533546 68.601644-214.704887-7.084964-299.235448-0.594997-0.663997-2.837985-2.712986-6.239967-5.664971-33.670825-29.211849-35.896814-80.846581-4.510977-112.500416 29.815845-30.070844 78.822591-31.441837 108.949435-1.682992 15.48692 15.297921 30.067844 32.249833 43.444775 50.855737 93.686514 130.322324 94.672509 310.784388 2.396987 442.108707z" p-id="2972" fill="#ffffff"></path>
							</svg>
					  		<span>{{total_fee | zhenshu}}元偷偷听</span>
					  	</div>
					  	<div class="amount1">听过：{{i.eavesdrop_nums}}</div>
				  	</div>
			  		<loadNo v-show="loadNo1"></loadNo>
			  		<footer1 v-show="loadNo1"></footer1>
			  	</ul>
		  	</div>
		  </mt-tab-container-item>
		  <mt-tab-container-item id="2">
		  	<div v-show="data2">
			  	<nodata v-if="teacherLists.length == 0"></nodata>
			  	<ul v-infinite-scroll="loadMore2" infinite-scroll-disabled="false" infinite-scroll-immediate-check="false" class="ul4">
				  	<div class="tutorList1" v-for="i in teacherLists">
				  		<ul class="ul1">
				  			<li>
				  				<img :src="i.face== ''?'../../../static/img/zhanwei.png':i.face">
				  				<div class="attention" @click="attention(i.shop_id,i.is_follow,$event)" v-show="i.is_follow==0">+关注</div>
				  				<div class="attentioned" @click="attention(i.shop_id,i.is_follow,$event)" v-show="i.is_follow==1">已关注</div>
				  			</li>
				  			<li @click="teacherDetails(i.shop_id,$event)">
				  				<div class="all1">
				  					<div class="name2">{{i.username}}</div>
				  					<div class="desc1">{{i.desc==""?'暂无描述':i.desc}}</div>
				  				</div>
				  			</li>
				  			<li @click="togeren(i.shop_id)">
				  				个人名片
				  			</li>
				  		</ul>
				  	</div>
				  	<loadNo v-show="loadNo2"></loadNo>
				  	<footer1 v-show="loadNo2"></footer1>
			  	</ul>
		  	</div>
		  </mt-tab-container-item>
		</mt-tab-container>
	</div>
</template>
<script>
	import { InfiniteScroll,Navbar,TabItem,Toast,Indicator } from 'mint-ui';
	import loadNo from '@/components/common/loadNo';
	import footer1 from '@/components/publicPage/footer1';
	import nodata from '@/components/common/nodata';
	export default{
		data(){
			return{
				selected:'1',
				playing2:true,
				playing:true,
				pageNo:1,
				pageNo2:1,
				arr:[],
				total_fee:'',
				ifload:true,
				ifload2:true,
				teacherLists:[],
				loadNo1:false,
				loadNo2:false,
				data1:false,
				data2:false,
			}
		},
		created(){
			document.title = '付费问答';
			this.global.shouquan();
			this.postData('post','/shop-v2-ask_get_fee.html',{is_public:1,fee_type:2}).then(res => {
				if(res.data.status == 1){
					this.total_fee = res.data.total_fee
				}
			})
			this.postData('post','/shop-v2-ask_lst.html',{source_type:0,page:1,status:2}).then(res => {
				this.data1 = true;
				this.arr = res.data;
			},res => {
				this.data1 = true;
			})

		},
		methods:{
			play(){
				var self = this;
				var IntervalName;
				if($('#audio').attr('src') == undefined || $('#audio').attr('src') == ''){
					play()
					return false;
				}else{
					$('#audio').attr('src','')
					return false
				}
				function play(){
					IntervalName = setInterval(function(){
						if(self.playing == true && self.playing2 == true){
							self.playing = false;
							self.playing2 = false;
						}else if(self.playing == false && self.playing2 == false){
							self.playing = true;
							self.playing2 = false;
						}else if(self.playing == true && self.playing2 == false){
							self.playing = true;
							self.playing2 = true;
						}
						if($('#audio').attr('src') == undefined || $('#audio').attr('src') == ''){
							window.clearInterval(IntervalName);
						    self.playing = true;
							self.playing2 = true;
						}
					},400)
				}
			},
			teacherDetails(id,e){
				if($(e.target).closest('ul').find('.attention').css('display') == 'none'){
					var status = 1;
				}else{
					var status = 0;
				}
				this.$router.push({path:'/tutorHomepage',query:{id:id,status:status}});
			},
			togeren(id){
		        this.$router.push({path:'/establishCard',query:{shop_id:id}})
		      },
			reply(id){
				this.$router.push({path:'/problemDetails',query:{id:id,status:2,type:2}});
			},
			loadMore(){
				if(this.ifload == true){
					this.pageNo = Number(this.pageNo)+Number(1);
					this.postData('post','/shop-v2-ask_lst.html',{source_type:0,page:this.pageNo,status:2}).then(res => {
						if(res.data.length != 0){
							this.arr = this.arr.concat(res.data);
						}else{
							this.ifload == false;
							this.pageNo = Number(this.pageNo)-Number(1);
							this.loadNo1 = true;
						}
					})
				}
			},
			loadMore2(){
				if(this.ifload2 == true){
					this.pageNo2 = Number(this.pageNo2)+Number(1);
					this.postData('post','/shop-v1-shop_teacher_lst.html',{page:this.pageNo2}).then(res => {
						if(res.data.length != 0){
							this.teacherLists = this.teacherLists.concat(res.data);
						}else{
							this.ifload2 == false;
							this.pageNo2 = Number(this.pageNo2)-Number(1);
							this.loadNo2 = true;
						}
					})
				}
			},
			attention(id,is_follow,e){
				if($(e.target).attr('class').indexOf('attentioned') == -1){
					this.postData('post','/shop-v1-user_do_follow_this.html',{shop_id:id,follow_type:1}).then(res => {
						if(res.data.status == 1){
							$(e.target).closest('li').find('.attentioned').css('display','block');
							$(e.target).closest('li').find('.attention').css('display','none');
							Toast({
							  message: res.data.msg,
							  iconClass: 'icon iconfont icon-dui',
							  duration: 1000
							});
						}else if(res.data.status == 0){
							Toast({
							  message: res.data.msg,
							  iconClass: 'icon iconfont icon-tishi',
							  duration: 1000
							});
						}
					})
				}else{
					this.postData('post','/shop-v1-user_cancel_follow_this.html',{shop_id:id,follow_type:1}).then(res => {
						if(res.data.status == 1){
							$(e.target).closest('li').find('.attention').css('display','block');
							$(e.target).closest('li').find('.attentioned').css('display','none');
							Toast({
							  message: res.data.msg,
							  iconClass: 'icon iconfont icon-dui',
							  duration: 1000
							});
						}else if(res.data.status == 0){
							Toast({
							  message: res.data.msg,
							  iconClass: 'icon iconfont icon-tishi',
							  duration: 1000
							});
						}
					})
				}
			}
		},
		components:{loadNo,footer1,nodata},
		watch:{
			selected(val,oldval){
				if(val == 2){
					if(this.teacherLists.length == 0){
						Indicator.open();
						this.postData('post','/shop-v1-shop_teacher_lst.html',{page:1}).then(res => {
							this.data2 = true;
							this.teacherLists = res.data;
							Indicator.close();
						},res => {
							this.data2 = true;
						})
					}
				}
			}
		},
		filters:{
			zhenshu(val){
				val = Math.round(val);
				return val;
			}
		}
	}
</script>
<style lang="less">
	.tutorList{
		font-size: 0.205rem;
		color: #333;
		// margin-bottom: 0.17rem;
		.ul3,.ul4{
			height: calc(~"100vh - 0.768rem");
			overflow: scroll;
			-webkit-overflow-scrolling:touch
		}
		.pList{
			background-color: #fff;
			width: calc(~"100% - 0.34rem");
			padding: 0 0.17rem 0.25rem;
			position: relative;
			margin-bottom: 0.17rem;
			.name1{
				.img1{
					width: 0.409rem;
					height: 0.409rem;
					border-radius: 50%;
					background-color: #eee;
					margin:0.17rem 0;
				}
				span{
					display: inline-block;
				    height: 0.749rem;
				    vertical-align: top;
				    line-height: 0.749rem;
				    color: #999;
				}
			}
			.problem1{
				font-size: 0.222rem;
				margin-bottom: 0.17rem;
			}
			.yuyin1{
				width: 3.41rem;
				height: 0.682rem;
				// background-color: #fe5875;
				border-radius: 0.341rem;
				position: relative;
				// text-align: center;
				span{
					color: #fff;
					font-size: 0.239rem;
					display: inline-block;
				    vertical-align: top;
				    line-height: 0.682rem;
				    position: absolute;
				    left: 1.1rem;
				}
				img{
					width:3.5rem;
					position: absolute;
				}
			}
			.amount1{
				position: absolute;
				bottom: 0.4rem;
				right: 0.17rem;
				color: #999;
			}
		}
		.tutorList1{
			margin-bottom: 0.17rem;
			.ul1{
				background-color: #fff;
				height: 1.834rem;
				li{
					float: left;
				}
				li:nth-child(1){
					width: 1.365rem;
					position: relative;
					padding-top: 0.34rem;
					img{
						width: 1.024rem;
						height: 1.024rem;
						border-radius: 50%;
						margin-left: 0.17rem;
					}
					.attention{
						width: 0.853rem;
						height: 0.384rem;
						border-radius: 0.192rem;
						border:1px solid #5e96d0;
						color: #5e96d0;
						text-align: center;
						line-height: 0.384rem;
						position: absolute;
					    bottom: -0.17rem;
					    left: 0.255rem;
					    background-color: #fff;
					}
					.attentioned{
						width: 0.853rem;
						height: 0.384rem;
						border-radius: 0.192rem;
						border:1px solid #5e96d0;
						color: #fff;
						text-align: center;
						line-height: 0.384rem;
						position: absolute;
					    bottom: -0.17rem;
					    left: 0.255rem;
					    background-color: #5e96d0;
					}
				}
				li:nth-child(2){
					width: calc(~"100% - 1.365rem - 1.109rem - 0.17rem - 0.2rem");
					padding-right: 0.2rem;
					display: table;
					.all1{
						height: 1.834rem;
						display: table-cell;
    					vertical-align: middle;
						.name2{
							font-size: 0.239rem;
							margin-bottom: 0.03rem;
						}
						.desc1{
							color: #999;
						}
					}
				}
				li:nth-child(3){
					width: 1.109rem;
					height: 0.5rem;
					border:1px solid #5e96d0;
					border-radius: 0.085rem;
					text-align: center;
					line-height: 0.5rem;
					color: #5e96d0;
					margin-top: 0.667rem;
				}
			}
		}
		.mint-navbar{
			height: 0.768rem;
			border-bottom: 1px solid #ddd;
		}
		.mint-tab-item-label{
			line-height: 0;
		}
		.mint-navbar .mint-tab-item{
			color: #666;
		}
		.mint-navbar .mint-tab-item.is-selected{
			border-bottom: 1px solid #5e96d0;
		    color: #5e96d0;
		    margin-bottom: -1px;
		}
	}
</style>