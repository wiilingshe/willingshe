<!--我的课程表-->
<template>
	<div class="box course" style="height:100%;">

		<!-- 这里要判断有没有数据；没有的话显示书架空，有的话显示列表，用ifList判断 -->


		<!--tab切换-->
		<div class="main">
				<mt-navbar v-model="selected">
					<mt-tab-item id="1"><span style="font-size:0.26rem;">专栏列表</span></mt-tab-item>
					<mt-tab-item id="2"><span style="font-size:0.26rem;">单品列表</span></mt-tab-item>
		        </mt-navbar>
		        <div v-if="load" class="load" style="color:#fff">加载中...</div>
				<!-- tab-container -->
				<mt-tab-container v-model="selected">
					  <mt-tab-container-item id="1">
					  	<div class="main-box" v-for="i in arr">
					  		<router-link :to="{path:'/details',query:{ser_id:i.ser_id}}">
								<div class="left">
									<img :src=i.pic alt="" :onerror="errorImg02" />
								</div>
								<div class="right">
									<div>{{ i.ser_title}}</div>
									<div>导师:{{ i.username}}</div>
									<div>课时：{{ i.sections }}</div>
								</div>
							</router-link>
						</div>
					  	<div v-if="serData">
							<div class="middle">
								<img src="../../../static/img/goods_fill.png">
								<div class="zi">书架空空如也</div>
							</div>
							<button class="bt" @click="gochoose()">去选课</button>
						</div>
					  	<div v-if="serTip" class="load">加载出错</div>

					  </mt-tab-container-item>
					  <mt-tab-container-item id="2">
					  	<div v-if="videoData">
							<div class="middle">
								<img src="../../../static/img/goods_fill.png">
								<div class="zi">书架空空如也</div>
							</div>
							<button class="bt" @click="gochoose()">去选课</button>
						</div>
					  <div v-if="videoTip" class="load">加载出错</div>
					   <div class="main-box" v-for="j in arr2">
					   	<router-link :to="{path:'/details',query:{vid:j.vid}}">
							<div class="left">
								<img :src=j.pic alt="" :onerror="errorImg02" />
							</div>
							<div class="right">
								<div>{{ j.title }}</div>
								<div>导师:{{ j.username }}</div>
								<!--<div>更新：{{ j.sections }}</div>-->
							</div>
						</router-link>
						</div>
					  </mt-tab-container-item>
				</mt-tab-container>
		</div>
		<div v-if="!load" id="footer2">
			<footer1></footer1>
		</div>

	</div>
</template>

<script>
	import footer1 from '@/components/common/footer1'
	import { Navbar, TabItem } from 'mint-ui'
	export default {
		data(){
			return{
				ifList:true,
				selected:'1',
				arr:[],
				arr2:[],
				errorImg02: 'this.src="' + require('../../../static/img/goods_fill.png') + '"',
				load:true,
				serTip:false,
				videoTip:false,
				serData:false,
				videoData:false,
			}

		},
		created(){
			document.title = '我的课程表'
			this.global.shouquan();
			this.noShare();
			if(this.selected == 1){
				this.getData('get','/shop-v1-lesson_series_lesson.html').then(res => {
					if(res.data.length == 0){
						this.serData = true;
					}else{
						this.serData = false;
					}
					if(res.status == 200){
						this.load = false;
						this.arr = res.data;
					}
				},res =>{
					this.load = false;
					this.serTip =true
				});
			}else if(this.selected == 2){
				this.getData('get','/shop-v1-lesson_video_lesson.html').then(res => {
					if(res.data.length == 0){
						this.videoData = true;
					}else{
						this.videoData = false;
					}
					if(res.status == 200){
						this.load = false;
						this.arr2 = res.data;
					}
				},res =>{
					this.load = false;
					this.videoTip =true
				});
			}
		},
		updated(){
			if(document.body.clientHeight<=$('.main').eq(0).height()+$('#footer2').height()){
				$('#footer2').removeAttr('style')
			}else{
				$('#footer2').css({'position':'absolute','bottom':'0','width':'100%'})
			}
		},
		methods:{
			gochoose(){
				this.$router.push({path:'/course'})
			},
			toggleTabs (tabText) {
                 this.currentView = tabText;
			},
		},
		components:{footer1},
		watch:{
			selected(val,oldval){
				if(val == 1){
					this.getData('get','/shop-v1-lesson_series_lesson.html').then(res => {
						if(res.data.length == 0){
							this.serData = true;
						}
						if(res.status == 200){
							this.load = false;
							this.arr = res.data;
						}
					},res =>{
						this.load = false;
						this.serTip =true
					});
				}else if(val == 2){
					this.getData('get','/shop-v1-lesson_video_lesson.html').then(res => {
						if(res.data.length == 0){
							this.videoData = true;
						}
						if(res.status == 200){
							this.load = false;
							this.arr2 = res.data;
						}
					},res =>{
						this.load = false;
						this.videoTip =true
					});
				}
			}
		}
	}
</script>

<style scoped lang="less">
	.course .mint-tab-item-label{
		font-size: 0.26rem;
	}
	.course{
		.mint-navbar{
			background-color: #fff;
			border-bottom: 1px solid #ddd;
		}
		.mint-navbar .mint-tab-item.is-selected{
			color: #5e96d0;
			border-bottom: 1px solid #5e96d0;
			margin-bottom: -1px;
		}
	}
	.load{
		font-size: 0.26rem;
		text-align: center;
		margin-top: 0.1rem;
	}
	.middle{
		height: 1.55rem;
    	width: 1.45rem;
		margin: 0 auto;
		font-size: 0.21rem;
		position: relative;
		margin-top: 2rem;
		color: #fff;
		display: block;
	}
	.middle .zi{
		text-align: center;
		position: absolute;
		bottom: 0rem;
		color: #999;
	}
	.middle img{
		height: 1.3rem;
	}
	.bt{
		width: 1.9rem;
	    height: 0.45rem;
	    border: 0px;
	    color: #fff;
	    background: #3385ff;
	    margin: 0 auto;
	    margin-top: 0.23rem;
	    display: block;
	    margin-bottom: 0.2rem;
	}
	.names{
		height: 0.5rem;
		line-height: 0.5rem;;
		font-size: 0.26rem;
		color: #fff;
		text-align: center;
		margin-top: 0.01rem;
	}

	.main{
		display: flex;
		flex-direction: column;
	}
	.main-box{
		height: 2rem;
		margin: 0 0.1rem 0.15rem 0.1rem;
		display: flex;
		flex-direction: row;
		background: #fff;
		margin-top: 0.2rem;
		color: #333;
	}
	.left{
		// height: 1.536rem;
		// width: 2.133rem;
		width: 50%;
		height: 2rem;
		box-sizing:border-box;
		padding: 0.1rem;
		display: inline-block;

	}
	.left img{
		width: 100%;
		height: 100%;

	}

	.right{
		width: 50%;
		height: 2rem;
		text-align: left;
		float: right;
		flex-direction: column;
		color: #333;

	}
	.right div{
		font-size: 0.24rem;
		/*overflow:hidden;
		text-overflow:ellipsis;
		white-space:nowrap;*/
	}

	.right div:nth-child(1){
		height: 0.7rem;
		/*line-height: 0.7rem;*/
		font-size: 0.26rem;
		margin-top: 0.2rem;
	}
	.right div:nth-child(2),.right div:nth-child(3){
		color: #767676;
	}
	/*.course .mint-tab-container-item{
		background: #f1f2f6;
	}*/
	.main-box a{
		width: 100%;
	}
</style>
