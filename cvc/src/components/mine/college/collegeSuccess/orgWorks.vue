<template>
	<div class="box">
		<!--tab头开始-->
		<mt-navbar v-model="selected">
		  <mt-tab-item id="1">
		  	<div>
		  		<span class="iconfont icon-zhibo"></span>
		  		<span>课程</span>
		  	</div>
		  </mt-tab-item>
		  <mt-tab-item id="2">
		  	<div>
		  		<span class="iconfont icon-scene"></span>
		  		<span>视频</span>
		  	</div>
		  </mt-tab-item>
		</mt-navbar>
		<!--tab头结束-->
		
		<!--tab内容开始-->
		<mt-tab-container v-model="selected">
		  <mt-tab-container-item id="1">
		    <div class="video">
		    	<div class="video_box" v-for="j in arr2">
		    		<div class="left">
		    			<img :src="j.pic" alt="" :onerror="errorImg02" />
		    		</div>
		    		<div class="right">
		    			<div>{{ j.title }}</div>
		    			<div>
		    				<i class="iconfont icon-8shipinicon"></i><span>{{ j.click }}</span>
		    				<i class="iconfont icon-qian"></i><span>{{ j.total_fee }}</span>
		    			</div>
		    			<div>{{ j.create_time }}</div>
		    			<div></div>
		    		</div>
		    	</div>
		    </div>
		  </mt-tab-container-item>
		  <mt-tab-container-item id="2">
		      <div class="video">
		    	<div class="video_box" v-for="i in arr1">
		    		<div class="left">
		    			<img :src="i.pic" alt="" :onerror="errorImg02" />
		    		</div>
		    		<div class="right">
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
		  </mt-tab-container-item>
		</mt-tab-container>
		<!--tab内容结束-->
	</div>
</template>

<script>
	
	export default {
		
		data(){
			return{
				selected:'1',
				errorImg02:'this.src="' + require('../../../../../static/img/logo.png') + '"',
				arr1:[],
				arr2:[]
			
			}
		},
		created(){
			this.global.shouquan();
			document.title = '学院作品';
			this.postData('post','/shop-v1-shop_get_org_videoseries_info.html',{"type":"video"}).then(res => {
				console.log(res);
				if(res.status == 200){
					this.arr1=res.data;
				}

			});
			this.postData('post','/shop-v1-shop_get_org_videoseries_info.html',{"type":"video"}).then(res => {
				
				if(res.status == 200){
					this.arr2=res.data;
				}
			   
			});
			
		},
		methods:{
			
			
		},
		mounted(){
			this.share('学院作品','我的个人中心',this.sharePic);
		}
		
	}
	
</script>

<style scoped>
	
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
	}
	
	.video_box{
		display: flex;
		display: -webkit-flex;
		flex-direction: row;
		-webkit-flex-direction: row;
		height: 2.2rem;
	    border-bottom: 0.1rem solid #F6F6F6;
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
		display: -webkit-flex;
		flex-direction: column;
		-webkit-flex-direction: column;
		width: 3rem;
		height: 1.8rem;
		font-size: 0.24rem;
		margin-left: 0.2rem;
		margin-right: 0.2rem;
		margin-top:0.2rem;
	}
	.right div:nth-child(1){
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	    margin-bottom: 0.2rem;
	}
	.right div:nth-child(2){
		margin-bottom: 0.1rem;
		color: #666666;
	}
	.right div:nth-child(3){
		color: #CCCCCC;
		font-size: 0.22rem;
	}
	
	.right div:nth-child(4){
		font-size: 0.22rem;
		color: red;
		margin-top: 0.05rem;
	}
	
	
	.icon-8shipinicon{
		font-size: 0.3rem;
		color: #CCCCCC;
		margin-right: 0.08rem;
	}
	.icon-qian{
		font-size: 0.3rem;
		color: #CCCCCC;
		margin-left: 0.2rem;
		margin-right: 0.08rem;
	}
	/*视频结束*/
	
</style>