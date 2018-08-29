<template>
	<div class="stduy">
		<div class="title">
			<img :src="list.face">
			<div class="name">{{list.nickname}}</div>
			<i class="icon iconfont icon-qiandao" @click="toqiandao()"></i>
		</div>
		<mt-navbar v-model="selected">
		  <mt-tab-item id="1">已购</mt-tab-item>
		  <mt-tab-item id="2">我的收藏</mt-tab-item>
		</mt-navbar>
		<div class="selecttype" v-show="selected == 1">
			<div @click="getCourse()">课程列表</div>
			<div @click="getVideo()">视频列表</div>
		</div>
    <div class="selecttype2" v-show="selected == 2">
      <div class="selecttype2-item" @click="getArticles()">
        <p class="articlesnum">{{collectLen.aLen}}</p>
        文章
      </div>
      <div class="selecttype2-item" @click="getVote()">
        <p class="articlesnum">{{collectLen.vLen}}</p>
       研究
      </div>
      <div class="selecttype2-item" @click="getTeacher()">
        <p class="articlesnum">{{collectLen.tLen}}</p>
        关注
      </div>
    </div>
		<mt-tab-container v-model="selected">
		  <mt-tab-container-item id="1" class="tab_items" style="height:calc(100vh - 4.2rem);">
		  	<div class="playtime">
		  		<nodata v-show="nodata1"></nodata>
       			<ul>
       				<li v-for="item in arr" class="item" @click="todetail(item.ser_id,item.vid)">
       					<div>
       						<img :src="item.pic" onerror="this.src=&quot;/static/img/pic_addfengmian.png&quot;">
       					</div>
       					<div class="jieshao">
       						<div class="title1">{{item.ser_title?item.ser_title:item.title}}</div>
       						<div class="name">{{item.username}}</div>
       						<div class="shu">x1</div>
       					</div>
       				</li>
       			</ul>
       			<div :class="{footer2:arr.length<=2}">
       				<footer1></footer1>
       			</div>
   			</div>
		  </mt-tab-container-item>
		  <mt-tab-container-item id="2" class="tab_items" style="height:calc(100vh - 5rem);">
        <div class="collect" v-infinite-scroll="loadMore"
             infinite-scroll-disabled="false"
             infinite-scroll-immediate-check="false"
             infinite-scroll-distance="20">
		  	<nodata v-show="nodata2"></nodata>
          <ul v-show="collectSelected==1 || collectSelected == 2">
            <li class="collect_item" v-for="(item,index) in arr2">
              <a class="collect_item-content" @click="toArticles(item.art_id,item.article_type)">
                <div class="collect_item-textwrap">
                  <div class="collect_item-text">
                    {{item.title}}
                  </div>
                  <div class="collect_item-details">
                    <div class="collect_item-top">
                       <span class="collect_item-type" style="padding-right: 0.12rem;font-size: 0.24rem;color: #999999">
                    {{item.cat_name}}
                  </span>
                    </div>
                    <div class="collect_item-left" style="float: left">
                      <span class="collect_item-comment" style="padding-right: 0.1rem;font-size: 0.24rem;color: #999999">
                    <i class="icon iconfont icon-huihua1" style="padding-right: 0.01rem"></i>
                    {{item.comment_num}}
                  </span>
                      <span class="collect_item-collect" style="font-size: 0.24rem;color: #999999">
                    <i class="icon iconfont icon-aixin" style="padding-right: 0.01rem"></i>
                    {{item.collect_num}}
                </span>
                    </div>
                    <div class="collect_item-right" style="float: right">
                  <span class="collect_item-time" style="font-size: 0.24rem;color: #999999">
                    {{item.format_time}}
                  </span>

                    </div>
                  </div>
                </div>
                <div class="collect_item-imgwrap">
                  <img class="collect_item-img" :src="item.pic" alt="图片未加载成功" onerror="this.src=&quot;/static/img/1111.f2c6065.png&quot;" >
                </div>
              </a>
            </li>
          </ul>
          <ul v-show="collectSelected == 3">
            <div class="tutorList" v-for="i in arr2">
              <ul class="ul1">
                <li>
                  <img :src="i.face== ''?'../../../static/img/zhanwei.png':i.face" onerror="this.src=&quot;/static/img/pic_addfengmian.png&quot;">
                  <div class="attention" @click="attention(i.shop_id,i.is_follow,$event)" v-show="i.is_follow==0">+关注</div>
                  <div class="attentioned" @click="attention(i.shop_id,i.is_follow,$event)" v-show="i.is_follow==1">已关注</div>
                </li>
                <li @click="todetails(i.shop_id)">
                  <div class="all1">
                    <div class="name2">{{i.username}}</div>
                    <div class="desc1">{{i.desc==""||i.desc==null?'暂无描述':i.desc}}</div>
                  </div>
                </li>
                <li @click="togeren(i.shop_id)">
                  个人名片
                </li>
              </ul>
            </div>
          </ul>
          <div v-if="(!aloadIs)||(!vloadIs)">
            <loadNo></loadNo>
          </div>
          <div :class="{footer2:arr2.length<=1}">
    				<footer1></footer1>
    		  </div>
        </div>
		  </mt-tab-container-item>
		</mt-tab-container>

    <component :is="rootId"></component>
	</div>
</template>
<script>
	import Navigator from '@/components/common/Navigator'
  import customNav from '@/components/common/custom/customNav';
  import nodata from '@/components/common/nodata'
	import footer1 from '@/components/publicPage/footer1'
  import loadNo from '@/components/common/loadNo';
  import { InfiniteScroll,Indicator } from 'mint-ui';
	export default{
		data(){
			return{
				list:[],
				selected:'1',
				arr:[],
				arr2:[],
				type:'2',
				nodata1:false,
				nodata2:false,
				points:'0',
        collectLen:{aLen:0,vLen:0,tLen:0},
        aloadIs:true,
        vloadIs:true,
        collectSelected:1,
        articlesPage:1,
        teacherPage:1,
        votePage:1,
        rootId:'',
        customArr:[''],
			}
		},
		created(){
			this.global.shouquan();
      this.postData('post','/shop-v1-index_get_root.html').then(res => {
        if(res.data.rootId && res.data.rootId != ''){
          this.rootId = this.customArr.indexOf(res.data.rootId) != -1?'Navigator':'customNav';
        }else{
          this.rootId= this.customArr.indexOf(this.$route.query.root_id) != -1 ? 'Navigator':'customNav';
        }
      });
      document.title = '学习';
		},
		mounted(){
			Indicator.open();
			this.getData('get','/shop-v1-user_base_info.html').then(res => {
				if(res.data.status == 1){
					this.list = res.data.data;
					this.points = res.data.data.points?res.data.data.points:0;
				}else{
					this.points = '获取失败'
				}
			});
			this.getData('get','/shop-v1-lesson_series_lesson.html').then(res => {
				Indicator.close();
				if(res.data.length == 0){
					this.nodata1 = true
				}else{
					this.arr = res.data;
				}
			})

		},
		updated(){
			// console.log($('.playtime').find('ul').eq(0).height())
		},
    watch: {
      selected: function (val) {
        if(val == 2){
          this.getArticles();
        }
      }
    },
		methods:{
			toqiandao(){
				console.log(this.points)
				this.$router.push({path:'mine-sign',query:{fen:this.points}})
			},
			getCourse(){
				Indicator.open();
				this.nodata1 = false
				this.getData('get','/shop-v1-lesson_series_lesson.html').then(res => {
					if(res.data.length == 0){
						this.arr = [];
						this.nodata1 = true
					}else{
						this.arr = res.data;
					}
					Indicator.close();
					$('.selecttype').find('div').eq(0).css({'color':'#2e8cda'});
					$('.selecttype').find('div').eq(1).css({'color':'#999'});
				})
			},
      togeren(id){
        this.$router.push({path:'/establishCard',query:{shop_id:id}})
      },
			getVideo(){
				this.nodata1 = false
				Indicator.open();
				this.getData('get','/shop-v1-lesson_video_lesson.html').then(res => {
					if(res.data.length == 0){
						this.arr = [];
						this.nodata1 = true
					}else{
						this.arr = res.data;
					}
					Indicator.close();
					$('.selecttype').find('div').eq(0).css({'color':'#999'});
					$('.selecttype').find('div').eq(1).css({'color':'#2e8cda'});
				})
			},
      getArticles(){
        this.collectSelected = 1;
        Indicator.open();
        this.nodata2 = false;
        this.vloadIs = true;
        this.votePage = 1;
        this.getData('get','/shop-v1-article_get_collect_lst.html?type=1').then(res => {
          Indicator.close();
          if(res.status == 200){
          	if(res.data.data.length != 0){
              this.arr2 = res.data.data;
              this.collectLen.aLen = res.data.stat.like_count;
              this.collectLen.vLen = res.data.stat.join_count;
              this.collectLen.tLen = res.data.stat.follow_count;
              if(res.data.data.length < 3){
                this.aloadIs = false;
              }
            }else{
          		this.arr2 = [];
          		this.nodata2 = true;
          	}
          }
          $('.selecttype2-item').eq(1).css({'color':'#999'});
          $('.selecttype2-item').eq(0).css({'color':'#2e8cda'});
          $('.selecttype2-item').eq(2).css({'color':'#999'});
        });
      },
      getVote(){
        this.collectSelected = 2;
        Indicator.open();
        this.nodata2 = false;
        this.aloadIs = true;
        this.articlesPage = 1;
        this.getData('get', '/shop-v1-article_get_collect_lst.html?type=2').then(res => {
          if(res.status == 200){
            if(res.data.data.length != 0){
              this.arr2 = res.data.data;
              if(res.data.data.length < 3){
                this.vloadIs = false;
              }
          	}else{
          		this.arr2 = [];
          		this.nodata2 = true;
          	}
          }
          Indicator.close();
          $('.selecttype2-item').eq(0).css({'color':'#999'});
          $('.selecttype2-item').eq(1).css({'color':'#2e8cda'});
          $('.selecttype2-item').eq(2).css({'color':'#999'});

        });
      },
      getTeacher(){
        this.collectSelected = 3;
        Indicator.open();
        this.nodata2 = false;
        this.aloadIs = true;
        this.teacherPage = 1;
        this.getData('post', '/shop-v1-user_my_follow_lst.html',{page:1,follow_type:0}).then(res => {
          if(res.status == 200){
            if(res.data.length != 0){
              this.arr2 = res.data;
              if(res.data.length < 3){
                this.vloadIs = false;
              }
            }else{
              this.arr2 = [];
              this.nodata2 = true;
            }
          }
          Indicator.close();
          $('.selecttype2-item').eq(0).css({'color':'#999'});
          $('.selecttype2-item').eq(1).css({'color':'#999'});
          $('.selecttype2-item').eq(2).css({'color':'#2e8cda'});
        });
      },
			todetail(ser_id,vid){
				if(ser_id){
					this.$router.push({path:'/details',query:{ser_id:ser_id}})
				}else{
					this.$router.push({path:'/details',query:{vid:vid}})
				}
			},
      toArticles(id,type){
        switch(type) {
          case 1:
            this.$router.push({path: "/mine-course-articles", query: {artid: id}})
            break;
          case 2:
            this.$router.push({path: "/mine-course-vote", query: {artid: id}})
            break;
          case 3:
            this.$router.push({path: "/mine-course-mesay", query: {artid: id}})
            break;
          case 4:
            this.$router.push({path: "/mine-course-articles", query: {artid: id}})
            break;
        }
      },
      loadMore(){
          if(this.collectSelected == 1){
              if(this.aloadIs){
                this.articlesPage++;
                let url = '/shop-v1-article_get_collect_lst.html?type=1&page='+ this.articlesPage;
                this.getData('get',url).then(res => {
                  if(res.status == 200){
                    if(res.data.data.length != 0){
                      this.arr2 = this.arr2.concat(res.data.data);
                    }else{
                      this.aloadIs = false;
                    }
                  }
                });
              }
          }else if(this.collectSelected == 2){
              if(this.vloadIs){
                this.votePage++;
                let url = '/shop-v1-article_get_collect_lst.html?type=2&page='+ this.votePage;
                this.getData('get',url).then(res => {
                  if(res.status == 200){
                    if(res.data.data.length != 0){
                      this.arr2 = this.arr2.concat(res.data);
                    }else{
                      this.vloadIs = false;
                    }
                  }
                });
              }
          }else if(this.collectSelected == 3){
            if(this.vloadIs){
              this.teacherPage++;
              console.log(this.teacherPage)
              let url = '/shop-v1-user_my_follow_lst.html?follow_type=0&page='+ this.teacherPage;
              this.getData('get',url).then(res => {
                if(res.status == 200){
                  if(res.data.length != 0){
                    this.arr2 = this.arr2.concat(res.data);
                  }else{
                    this.vloadIs = false;
                  }
                }
              });
            }
          }
      },
      todetails(id){
        this.$router.push({path:'/tutorHomepage',query:{id:id,status:1}})
      }
		},
		components:{Navigator,nodata,footer1,loadNo,customNav},
	}
</script>
<style lang="less">
	.stduy{
    height:100vh;
		.footer2{
			position:absolute;
			width:100%;
			bottom: 0.17rem;
		}
		.playtime{
		    height:auto;
		    margin-top: 1px;
		}
		.item{
			height: 1.88rem;
			display: flex;
			display: -webkit-flex;
			margin-bottom: 0.17rem;
			background-color: #fff;
			img{
				width: 2.13rem;
				height: 1.536rem;
				margin-top: 0.172rem;
				margin-left: 0.17rem;
				margin-right: 0.17rem;
			}
			.jieshao{
				position: relative;
				.title1{
					font-size: 0.238rem;
					margin-top: 0.172rem;
					margin-right: 0.17rem;
				}
				.name{
					font-size: 0.221rem;
					color: #999;
				}
				.shu{
					font-size: 0.221rem;
					color: #999;
					position: absolute;
					bottom: 0.172rem;
				}
			}
		}
		.selecttype{
			background-color: #fff;
			height: 0.7rem;
			font-size: 0.221rem;
			color: #999;
			div{
				display: inline-block;
				line-height: 0.69rem;
				margin-left: 0.3rem;
			}
			div:nth-child(1){
				color: #2e8cda;
			}
		}
    .selecttype2{
      display: table;
      width: 90%;
      height: 0.7rem;
      padding: 0 5%;
      /*margin-bottom: 0.2rem;*/
      font-size: 0.26rem;
      color: #999;
      background-color: #fff;
      .selecttype2-item{
        display: table-cell;
        vertical-align: middle;
        padding: 0.3rem 0 0.2rem;
        text-align: center;
        .articlesnum{
          margin-bottom: 0.1rem;
          font-size: 0.48rem;
        }
        &:first-of-type{
          color: #5e96d0;
        }
      }
    }
		.title{
			height: 1.706rem;
			background-color: #fff;
			position: relative;
			border-bottom: 1px solid #ddd;
			margin-bottom: 0.17rem;
			img{
				height: 1.06rem;
				width: 1.06rem;
				border-radius: 50%;
				margin-top: 0.325rem;
				margin-left:0.35rem;
			}
			.name{
				display: inline-block;
				font-size: 0.238rem;
				color: #333;
				position: absolute;
				line-height: 1.706rem;
				margin-left: 0.17rem;
			}
			i{
				float: right;
				line-height: 1.706rem;
				margin-right:0.35rem;
				color: #2e8cda;
			}
		}
    .tab_items{
      overflow-y:auto;
      -webkit-overflow-scrolling:touch;
    }
		.mint-navbar{
			height: 0.76rem;
			border-bottom: 1px solid #eee;
		}
		.mint-navbar .mint-tab-item.is-selected{
			border-bottom: 1px solid #2e8cda;
		    color: #2e8cda;
		    margin-bottom: -1px;
		}
		.mint-tab-item-label{
			line-height: 0.1rem;
		}
    .mint-tab-container-item{
      .collect{
        height: auto;
        padding-top: 0.2rem;
        padding-bottom: 0.2rem;
        &_item{
          font-size: 0.205rem;
          background-color: #ffffff;
          a:visited,a:link{
            color: #000000;
          }

          &-content{
            display: -webkit-box;
            display: -moz-box;
            display: -ms-flexbox;
            display: -webkit-flex;
            display: flex;
            border-bottom: 0.15rem solid #f2f2f2;
          }
          &-imgwrap{
            position: relative;
          }
          &-img{
            display: block;
            /*width: 2.88rem;*/
            /*height: 2.3rem;*/
            width: 3rem;
            height: 2rem;
            height: 35vw;
            text-align: center;
          }

          &-textwrap{
            display: -webkit-box;
            display: -moz-box;
            display: -ms-flexbox;
            display: -webkit-flex;
            display: flex;

            -webkit-box-direction: normal;
            -webkit-box-orient: vertical;
            -moz-flex-direction: column;
            -webkit-flex-direction: column;
            flex-direction: column;

            flex: 1;

            padding: 0.2rem 0.2rem;
          }
          &-text{
            -webkit-box-flex: 1.0;
            -moz-flex-grow: 1;
            -webkit-flex-grow: 1;
            flex-grow: 1;

            line-height: 1.5;
            word-wrap:break-word;
            word-break: break-all;
            font-size:0.24rem;
          }
          &-details{
            font-size:0.2rem;
            font-weight: 200;
            color: #666666;
            .icon-huihua1,.icon-aixin{
              font-size: 0.2rem;
            }
          }
        }
        .tutorList{
          font-size: 0.205rem;
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
      }
    }

	}
</style>
