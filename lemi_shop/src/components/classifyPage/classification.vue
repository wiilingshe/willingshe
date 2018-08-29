<template>
	<div id="box" style="height:100%;">
		<div class="headerss">
			<div class="inner">
				<i class="iconfont icon-search"></i>
				<input type="text" placeholder="请输入搜索内容" v-model="vals" style="outline-style: none;" />
				<span @click="jumpFn()">搜索</span>
			</div>
		</div>
		<div style="border-top:1px solid #eee">
			<ul>
				<li>
					<ul id="navs" @click="cgColor($event)">
						<li @click="videoFn()" class="lis">
							单品
						</li>
						<li @click="kechengFn()" class="lis">
							专栏
						</li>
			            <li @click="articlesFn()" class="lis">
			              文章
			            </li>
					</ul>
				</li>
				<li>
					<div class="rightBox">
						<div class="load" v-if="load">加载中...</div>
						<div id="kecehng">
							<div v-show="kecheng" style="padding:0 0.2rem;">
								<div class="inner_kecheng clearfix" v-for="x in navArrTwo">
									<router-link :to="{path:'/classLists',query:{navsnum:1,catId:x.cat_id}}">
										<p >{{x.cat_name}}</p>
									</router-link>
									<div class="danpin" style="background:#fff;">
										<div v-for="item in x.child" class="zizi">
											<router-link :to="{path:'/classLists',query:{navsnum:1,catId:item.cat_id}}">
												<span>{{item.cat_name}}</span>
											</router-link>
										</div>
									</div>
								</div>
							</div>
							<div v-show="danpin" style="padding:0 0.2rem;">
								<div class="inner_kecheng clearfix" v-for="i in danpinArr">
									<router-link :to="{path:'/classLists?navsnum=2',query:{navsnum:2,catId:i.cat_id}}">
										<p>{{i.cat_name}}</p>
									</router-link>
									<div class="danpin" style="background:#fff;">
										<div v-for="j in i.child" class="zizi">
											<router-link :to="{path:'/classLists?navsnum=2',query:{navsnum:2,catId:j.cat_id}}">
												<span>{{j.cat_name}}</span>
											</router-link>
										</div>
									</div>
								</div>
							</div>
				              <div v-show="article" style="padding:0 0.2rem;">
				                <div class="inner_kecheng clearfix" v-for="i in articleArr">
				                  <router-link :to="{path:'/mine-course-boutiquetext',query:{catId:i.cat_id,root_id:navId}}">
				                  	<p>{{i.cat_name}}</p>
				                  </router-link>
				                  <div class="danpin" style="background:#fff;">
				                    <div v-for="j in i.child" class="zizi">
				                      <router-link :to="{path:'/mine-course-boutiquetext',query:{catId:j.cat_id,root_id:navId}}">
				                        <span>{{j.cat_name}}</span>
				                      </router-link>
				                    </div>
				                  </div>
				                </div>
				              </div>
				            </div>

						<div @click="allFn()" class="all" v-show='all' v-if="!load">查看所有</div>
						<div v-show="!load" id="footer1">
							<footer1></footer1>
						</div>
					</div>
				</li>
			</ul>
		</div>

    <component :is="rootId"></component>
	</div>
</template>

<script>
	import footer1 from '@/components/publicPage/footer1'
	import Navigator from '@/components/common/Navigator';
  import customNav from '@/components/common/custom/customNav';
  import { Tabbar, TabItem } from 'mint-ui';
	import axios from 'axios';
	import { Search } from 'mint-ui';
	var qs = require('qs');
	export default {
		data:function(){
			return{
				all:true,
				danpin:true,
				kecheng:true,
        article:false,
				navArrTwo:[],
				danpinArr:[],
        articleArr:[],
				navsNum:1,
				vals:'',
				load:true,
        rootId:'',
        customArr:[''],
			}
		},
		components:{
			Navigator,
			footer1,
      customNav
		},
		created(){
      document.title="分类"
			this.global.shouquan();
      this.postData('post','/shop-v1-index_get_root.html').then(res => {
        if(res.data.rootId && res.data.rootId != ''){
          this.rootId = this.customArr.indexOf(res.data.rootId) != -1?'Navigator':'customNav';
        }else{
          this.rootId= this.customArr.indexOf(this.$route.query.root_id) != -1 ? 'Navigator':'customNav';
        }
      });
    },
		mounted(){
			this.share('分类','',this.sharePic)
			this.postData('post','/shop-v1-video_category.html').then(res => {
				if(res.status==200){
					this.load = false;
					this.navArrTwo=res.data;
				}
			})
		},
		updated(){
			var trueHeight = $('#kecehng').height();
			var allHeight = document.body.clientHeight - $('.headerss').eq(0).height() - $('#nav').eq(0).height() - $('#footer1').height() - 42.5;
			if(allHeight>trueHeight){
				$('#footer1').css({'position':'fixed','bottom':'0.83rem','margin-left':'1rem'})
			}else{
				$('#footer1').removeAttr("style")
			}
		},
		methods:{
      allFn:function(){
        if(this.navsNum==1){
          this.$router.push({path:"/classLists",query:{navsnum:1}})
        }
        if(this.navsNum==2){
          this.$router.push({path:"/classLists",query:{navsnum:2}})
        }
        if(this.navsNum==3){
          this.$router.push({path:"/mine-course-playtime",query:{root_id:this.navId}})
        }
        this.all=false;
      },
			videoFn:function(){
				this.navArrTwo = [];
				this.all=true;
				this.danpin=false;
				this.article=false;
				this.kecheng=true;
				this.postData('post','/shop-v1-video_category.html').then(res => {
					if(res.status==200){
						this.load = false;
						this.navArrTwo=res.data;
					}
				})
				this.navsNum=1;
			},
			kechengFn:function(){
				this.danpinArr = []
				this.all=true;
				this.kecheng=false;
        		this.article=false;
				this.danpin=true;
				this.postData('post','/shop-v1-series_category.html').then(res => {
					if(res.status=200){
						this.load = false;
						this.danpinArr=res.data;
					}
				})
				this.navsNum=2;
			},
		      articlesFn:function () {
		        this.articleArr=[];
		        this.all=true;
		        this.kecheng=false;
		        this.danpin=false;
		        this.article=true;
		        this.getData('get','/shop-v1-article_cat_lst.html?type=1').then(res => {
		          if(res.status=200){
		            this.load = false;
		            this.articleArr = res.data;
		          }
		        })
		        this.navsNum=3;
		      },

			cgColor:function(event){
				if(event.target.tagName=="LI"){
					this.load = true;
					var lis = document.getElementsByClassName('lis');
					for(var i =0;i<lis.length;i++){
					    lis[i].style.color = '#333';
					    lis[i].style.backgroundColor = '#fff';
					}
					if(event.target.tagName=="LI"){
						event.target.style.color = '#5e96d0';
						event.target.style.backgroundColor = '#f1f2f6';
					}
				}
			},

			//分类点击传参跳转
			clickFn:function(){
				this.$router.push({path:'/classLists',query:{catId:1}});
			},


			jumpFn:function(){
				if(this.navsNum==1){
					this.vals = this.vals.trim();
					if(this.vals!=''){
						this.$router.push({path:"/classLists",query:{navsnum:1,title:this.vals}})
					}else{
						this.$router.push({path:"/classLists",query:{navsnum:1}});
					}


				};
				if(this.navsNum==2){
					this.vals = this.vals.trim();
					if(this.vals!=''){
						this.$router.push({path:"/classLists",query:{navsnum:2,title:this.vals}})
					}else{
						this.$router.push({path:"/classLists",query:{navsnum:2}});
					}

				}
			}
		}
	}
</script>

<style scoped>
	#box{
		color: #fff;
	}
	.headerss{
		background-color: #fff;
		position: fixed;
		top: 0rem;
		width: 100%;
		border-bottom: 1px solid #eee;
		height: 0.83rem;
		z-index: 11
	}
	.inner{
		position: relative;
		flex: 1;
		width: 100%;
		display: -webkit-flex;
		margin-left: 0.2rem;
	}
	.inner input{
		padding: 0 0.3rem 0 0.6rem;
		border-radius: 0.1rem;
		font-size: 0.27rem;
		height: 0.5rem;
		top: 0.1rem;
		left: 0;
		border: 0;
	    background: #fafafa;
	    border-radius: 0.5rem;
	    margin-top: 0.165rem;
	    width: 4.4rem;
	    border:1px solid #eee;
	    outline-style: none;
	    -webkit-appearance: none;
	    color: #333;
	}
	.headerss span{
		display: inline-block;
		font-size: 0.27rem;
		height: 0.5rem;
		padding: 0;
		color: #999;
		width: 1rem;
		line-height: 0.88rem;
		margin-left: 0.1rem;
	}
	.inner i{
		position: absolute;
		left: 0.1rem;
		font-size: 0.4rem;
		color: #ccc;
		z-index: 10;
		top: 0.18rem;
	}
	#navs{
		font-size: 0.5rem;
		position: fixed;
		height: 100%;
		background-color: #fff;
	}
	#navs li{
		width: 1.8rem;
		text-align: center;
		border-bottom: 1px solid #eee;
		background-color: #f7f7f7;
		font-size: 0.27rem;
		z-index: 100;
		height: 1rem;
    	line-height: 1rem;
	}
	#navs>li{
		color: #333;
		background: #fff;
	}
	#navs>li:nth-child(1){
		color: #5e96d0;
		background-color: #f1f2f6;
	}
	.rightBox{
		margin: 0.83rem 0 1rem 1.8rem;
		font-size: 0.5rem;
		position: relative;
		padding-bottom: 1rem;
	}
	.rightBox span{
		line-height: 0.3rem;
	}
	/*.inner_kecheng .zizi{
		display: inline-block;
		padding: 0 0.2rem;
		margin: 0.1rem;
	}*/
	/*.inner_kecheng span{
		padding: 0.05rem;
		font-size: 0.25rem;
		color: #fff;
		border-radius: 0.1rem;
		display: block;
		height: 0.3rem;
		width: 100%;
		text-align: center;
		color: #fff;
		padding: 0.1rem 0.1rem 0.05rem;
	}*/
	.danpin{
		min-height: 0.6rem;
		font-size: 0.27rem;
	}
	.inner_kecheng span{
		color: #666;
	}
	.zizi{
		display: inline-block;
	}
	.inner_kecheng .zizi a{
		line-height: 0.6rem;
		margin: 0 0.2rem;
	}
	.inner_kecheng p{
		height: 0.7rem;
	    font-size: 0.27rem;
	    line-height: 0.7rem;
	    font-weight: 500;
	    color: #000;
	}
	.all{
		width: 3rem;
		text-align: center;
		display: block;
		border-color:#fff;
		font-size: 0.27rem;
		height: 0.6rem;
		line-height: 0.6rem;
		color: #666;
		border-radius: 0.5rem;
		margin: 0 auto;
		background:#fff;
		margin-top: 0.5rem;
	}
	.load{
		font-size: 0.27rem;
		display: block;
		text-align: center;
		position: relative;
    	top: 0.1rem;
	}
</style>
