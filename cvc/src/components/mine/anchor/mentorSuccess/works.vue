<template>
	<div class="box orgworks">
		<!--tab头开始-->
		<mt-navbar v-model="selected">
		  <mt-tab-item id="1">
		  	<div style="line-height:0.1rem">
		  		<span class="iconfont icon-zhibo" style="position: relative;top: 0.02rem;"></span>
		  		<span>课程</span>
		  	</div>
		  </mt-tab-item>
		  <mt-tab-item id="2">
		  	<div style="line-height:0.1rem">
		  		<span class="iconfont icon-scene" style="position: relative;top: 0.02rem;"></span>
		  		<span>视频</span>
		  	</div>
		  </mt-tab-item>
		</mt-navbar>
		<!--tab头结束-->
		<nodata v-show="nodata1"></nodata>
		<!--tab内容开始-->
		<mt-tab-container v-model="selected">
		  <mt-tab-container-item id="1">
		  	<div class="video">
		    	<div class="video_box" v-for="j in arr2" @click="courseto(j.ser_id)">
		    		<div class="left">
		    			<img :src="j.pic" alt="" :onerror="errorImg02" />
		    		</div>
		    		<div class="right">
		    			<div>
			    			<div>{{ j.ser_title }}</div>
			    			<div>
			    				<i class="iconfont icon-8shipinicon"></i><span>{{ j.click }}</span>
			    				<i class="iconfont icon-qian"></i><span>{{j.total_fee }}</span>
			    			</div>
			    			<div>{{ j.create_time }}</div>
			    			<div>{{ videoStatus }}</div>
		    			</div>
		    		</div>
		    	</div>
		    </div>
		  </mt-tab-container-item>
		  <mt-tab-container-item id="2">
		    <div class="video">
		    	<div class="video_box" v-for="i in arr1" @click="videoto(i.vid)">
		    		<div class="left">
		    			<img :src="i.pic" alt="" :onerror="errorImg02" />
		    		</div>
		    		<div class="right">
		    			<div>
			    			<div>{{ i.title }}</div>
			    			<div>
			    				<i class="iconfont icon-8shipinicon"></i><span>{{ i.click }}</span>
			    				<i class="iconfont icon-qian"></i><span>{{ i.total_fee }}</span>
			    			</div>
			    			<div>{{ i.create_time }}</div>
			    			<div>{{i.status == 0 ?'默认':i.status == 1?'审核中':i.status == 2?'审核通过':'审核失败'}}</div>
		    			</div>
		    		</div>
		    	</div>
		    </div>
		  </mt-tab-container-item>
		</mt-tab-container>
		<!--tab内容结束-->
	</div>
	
</template>

<script>
	import { Navbar, TabItem,Indicator } from 'mint-ui';
	import nodata from '@/components/common/nodata'
	export default {
		data(){
			return{
				errorImg02:'this.src="' + require('../../../../../static/img/logo.png') + '"',
				selected:'1',
				arr1:[],
				arr2:[],
				videoStatus:'',
				nodata1:false,
			}
		},
		created(){
			Indicator.open();
			this.global.shouquan();
			this.noShare();
			document.title = '我的作品';
			this.postData('post','/shop-v1-shop_get_shop_videoseries_info.html',{"type":"series"}).then(res => {
				if(res.status == 200){
					if(res.data.length != 0){
                		this.arr2=res.data;
					}else{
						this.nodata1 = true;
					}
					Indicator.close();
                }
			})
		},
		methods:{
			courseto(id){
				this.$router.push({path:'/details',query:{ser_id:id}})
			},
			videoto(id){
				this.$router.push({path:'/details',query:{vid:id}})
			}
		},
		components:{nodata},
		watch:{
			selected(val,oldval){
				Indicator.open();
				this.nodata1 = false;
				if(val == 1){
					this.postData('post','/shop-v1-shop_get_shop_videoseries_info.html',{"type":"series"}).then(res => {
						if(res.status == 200){
		                	if(res.data.length != 0){
		                		this.arr2=res.data;
							}else{
								this.nodata1 = true;
							}
		                	Indicator.close();
		                }
					})
				}else if(val == 2){
					this.postData('post','/shop-v1-shop_get_shop_videoseries_info.html',{"type":"video"}).then(res => {
					  if(res.status == 200){
					  	if(res.data.length != 0){
	                		this.arr1=res.data;
						}else{
							this.nodata1 = true;
						}
					  	Indicator.close();
					  }
					});
				}
			}
		}
	
	}
</script>

<style scoped lang="less">
	.orgworks{
		.mint-navbar{
			height: 0.8rem;
		}
		.mint-tab-container-item{
			height: calc(100vh - 7rem);
			overflow: scroll;
			-webkit-overflow-scrolling:touch;
		}
	}
	
	
	/*课程开始*/

	.imgs img{
		
		display: block;
		margin: 0 auto;
	}
	
	.text{
		color: #CCCCCC;
		font-size: 0.26rem;
		text-align: center;
	}
	/*课程结束*/
	
	/*视频开始*/
	
	.video{
		display: flex;
		flex-direction: column;
		margin-top: 0.2rem;
		background-color: white;
	}
	
	.video_box{
		display: flex;
		flex-direction: row;
		height: 2.2rem;
	    border-bottom: 0.17rem solid #F6F6F6;
	    box-sizing:border-box;
	}
	.left{
		width:2rem;
		height: 1.8rem;
		margin-top:0.2rem;
		margin-left: 0.2rem;
		
	}
	.left img{
		width: 100%;
		height: 100%;
	}
	

	
	.right{
		flex: 1;
		display: flex;
		flex-direction: column;
		width: 3rem;
		font-size: 0.24rem;
		margin-left: 0.2rem;
		margin-right: 0.2rem;
		display: table;
		height: 2.2rem;
	}
	.right>div{
		display: table-cell;
		vertical-align: middle;
	}
	.right>div div:nth-child(1){
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		height: 0.45rem;
		width: 4rem;
	}
	.right div:nth-child(2){
		margin-bottom: 0.1rem;
		color: #666666;
	}
	.right div:nth-child(3){
		color: #666;
		font-size: 0.22rem;
	}
	
	.right div:nth-child(4){
		font-size: 0.22rem;
		color: red;
		margin-top: 0.05rem;
	}
	
	
	.icon-8shipinicon{
		font-size: 0.3rem;
		color: #26a2ff;
		margin-right: 0.08rem;
	}
	.icon-qian{
		font-size: 0.3rem;
		color: #ff4949;
		margin-left: 0.2rem;
		margin-right: 0.08rem;
	}
	/*视频结束*/
	
	.mint-navbar .mint-tab-item.is-selected{
		color: #5e96d0;
		border-bottom: 1px solid #5e96d0;
		margin-bottom: -1px;
	}

	
	
</style>