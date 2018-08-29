<template>
  <div id="box1">
    <div class="header">
      <div class="middle" @click="tolei()">
        <div class="tablecell">
          <div class="ii" style="background-color:#fe5875">
            <i class="icon iconfont icon-fenlei2" style="color:#fff"></i>
          </div>
          <div class="name">分类</div>
        </div>
      </div>
      <div class="middle" @click="toremen()">
        <div class="tablecell">
          <div class="ii" style="background-color:#4be2ba">
            <i class="icon iconfont icon-kecheng-" style="color:#fff"></i>
          </div>
          <div class="name">报班课程</div>
        </div>
      </div>
      <div class="middle" @click="tokejian()">
        <div class="tablecell">
          <div class="ii" style="background-color:#37ace8">
            <i class="icon iconfont icon-naozhong1" style="color:#fff"></i>
          </div>
          <div class="name">课间</div>
        </div>
      </div>
      <div class="middle" @click="tozhibo()">
        <div class="tablecell">
          <div class="ii" style="background-color:#ffbd48">
            <i class="icon iconfont icon-zhibo" style="color:#fff"></i>
          </div>
          <div class="name">付费问答</div>
        </div>
      </div>
    </div>
    <mt-tab-container v-model="selected" v-if="this.homeshow">
      <mt-tab-container-item id="1">
        <div>
          <div style="height:3.413rem;">
            <mt-swipe :auto="4000">
              <!-- <mt-swipe-item>
                <img class="lunboPic" src="/static/img/lunbo/666874455009937185.jpg">
              </mt-swipe-item> -->
              <mt-swipe-item>
                <img class="lunboPic" src="../../../../../static/img/lunbo/college.jpg">
              </mt-swipe-item>
              <!-- <mt-swipe-item>
                <router-link :to="{path:'/details',query:{'ser_id':'A1Y'}}">
                <img class="lunboPic" src="../../../../../static/img/lunbo/college.jpg">
                </router-link>
              </mt-swipe-item> -->
              <!-- <mt-swipe-item>
              <router-link :to="{path:'/details2',query:{'id':'Bg'}}">
              <img class="lunboPic" src="../../../../../static/img/lunbo/pic37.jpg">
              </router-link>
              </mt-swipe-item> -->
              <!--<mt-swipe-item>-->
              <!--<router-link :to="{path:'/details',query:{'ser_id':'Cg'}}">-->
              <!--<img class="lunboPic" src="../../../../../static/img/lunbo/pic29.jpg">-->
              <!--</router-link>-->
              <!--</mt-swipe-item>-->
              <!--<mt-swipe-item>-->
              <!--<router-link :to="{path:'/details',query:{'ser_id':'Bw'}}">-->
              <!--<img class="lunboPic" src="../../../../../static/img/lunbo/pic38.jpg">-->
              <!--</router-link>-->
              <!--</mt-swipe-item>-->
              <!--<mt-swipe-item>-->
              <!--<router-link :to="{path:'/details2',query:{'id':'AA'}}">-->
              <!--<img class="lunboPic" src="../../../../../static/img/lunbo/pic34.jpg">-->
              <!--</router-link>-->
              <!--</mt-swipe-item>-->
              <!--<mt-swipe-item>-->
              <!--<router-link :to="{path:'/newBen'}">-->
              <!--<img class="lunboPic" src="../../../../../static/img/new/new.jpg">-->
              <!--</router-link>-->
              <!--</mt-swipe-item>-->
              <!-- <mt-swipe-item>
                            <router-link :to="{path:'/details',query:{'ser_id':'Bw'}}">
                                <img class="lunboPic" src="../../../static/img/lunbo/pic.jpg">
                            </router-link>
                        </mt-swipe-item> -->
              <!--<mt-swipe-item>-->
              <!--<router-link :to="{path:'/details',query:{'ser_id':'Bg'}}">-->
              <!--<img class="lunboPic" src="../../../../../static/img/lunbo/pic2.jpg">-->
              <!--</router-link>-->
              <!--</mt-swipe-item>-->
              <!--<mt-swipe-item>-->
              <!--<router-link :to="{path:'/details',query:{'ser_id':'AA'}}">-->
              <!--<img class="lunboPic" src="../../../../../static/img/lunbo/pic3.jpg">-->
              <!--</router-link>-->
              <!--</mt-swipe-item>-->
            </mt-swipe>
          </div>
          <div class="wenzahng" :style="{color:skin}">
            <div class="tou">
              <span>干货新闻&nbsp;|&nbsp;免费</span>
              <span @click="wenzhang()">更多<i class="icon iconfont icon-gengduo"
                                             style="margin-left: 0.05rem;"></i></span>
              <div v-for="(item,index) in lists" v-if="index < 3">
                <div class="yi" v-if="index==0">
                  <a @click="toArticles(item.art_id,item.article_type)">
                    <img :src="item.pic">
                    <div class="xinxi">
                      <div class="title">{{item.title}}</div>
                    </div>
                  </a>
                </div>
                <div class="qita" v-if="index !=0">
                  <a @click="toArticles(item.art_id,item.article_type)">
                    <span style="color:#333"><i class="icon iconfont icon-xinwen" :style="{color:skin}"></i>{{item.title}}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div class="titleone">
            <div class="title" :style="{color:skin,'border-left':skin1}">
              推荐
            </div>
          </div>
          <!-- <div class="recommend" v-for="(item,index) in arr4">
            <router-link :to="{path:'/details',query:{'ser_id':item.vid}}">
              <img :src="item.imgUrl">
            </router-link>
          </div> -->
          <!-- <div class="recommend" v-for="(item,index) in arr3">
                      <router-link :to="{path:'/topay',query:{'type':'41','cs_id':item.cs_id}}">
                          <img :src="item.imgUrl">
                      </router-link>
                  </div> -->
          <div class="recommend" v-for="(item,index) in arr">
            <router-link :to="{path:'/details',query:{'ser_id':item.vid}}">
              <img :src="item.imgUrl">
            </router-link>
          </div>
          <!--<div class="titleone">-->
          <!--<div class="title" :style="{color:skin,'border-left':skin1}">-->
          <!--即将上线-->
          <!--</div>-->
          <!--</div>-->
          <!--<div class="recommend" v-for="(item,index) in arr2">-->
          <!--<a>-->
          <!--<img :src="item.imgUrl">-->
          <!--</a>-->
          <!--</div>-->
        </div>
        <div style="margin-bottom:1rem;" v-show="dibu">
          <footer1></footer1>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <div style="min-height:calc(100vh - 0.75rem);overflow:scroll; -webkit-overflow-scrolling:touch;">
          <!-- <activity></activity> -->
        </div>
      </mt-tab-container-item>
    </mt-tab-container>
    <Navigator></Navigator>
  </div>
</template>

<script>
  import {Navbar, TabItem, Toast} from 'mint-ui';
  import footer1 from '@/components/publicPage/footer1'
  import Navigator from '@/components/common/Navigator';
  import wx from 'weixin-js-sdk'
  export default {
    data(){
      return {
        arr: [{
          imgUrl: '../../../../../static/img/lunbo/pic40.jpg',
          url: '/details',
          vid: 'A1Y'
        },{
          imgUrl: '../../../../../static/img/lunbo/pic28.png',
          url: '/details',
          vid: 'Cg'
        },{
          imgUrl: '../../../../../static/img/lunbo/pic6.png',
          url: '/details',
          vid: 'Bg'
        }, {
          imgUrl: '../../../../../static/img/lunbo/pic8.png',
          url: '/details',
          vid: 'AA'
        }, {
          imgUrl: '../../../../../static/img/lunbo/pic35.jpg',
          url: '/details2',
          vid: 'Bw'
        }],
        arr2: [{
          imgUrl: '../../../../../static/img/lunbo/pic10.png',
          url: '/details',
          vid: 'Aw'
        }],
        // arr3:[
        // {
        // 	imgUrl:'../../../static/img/lunbo/pic32.jpg',
        // 	url:'/topay',
        // 	cs_id:'Bg'
        // },{
        // 	imgUrl:'../../../static/img/lunbo/pic31.jpg',
        // 	url:'/topay',
        // 	cs_id:'Bw'
        // },{
        // 	imgUrl:'../../../static/img/lunbo/pic30.jpg',
        // 	url:'/topay',
        // 	cs_id:'BA'
        // }],
        arr4: [{
          imgUrl: '../../../../../static/img/lunbo/pic28.png',
          url: '/details',
          vid: 'Cg'
        }],
        lists: [],
        selected: '1',
        homeshow: true,
        dibu: false,
        skin: '#5e96d0',
        skin1: '0.1rem solid #5e96d0',
      }
    },
    created(){
//			var self = this;
//			this.global.shouquan();
//      this.navId = this.$route.query.root_id;
      this.postData('post', '/shop-v1-index_basemsg.html').then(res => {
        document.title = res.data.title;
        this.share(res.data.title, res.data.description, res.data.logo)
      })
//      隐藏首页
//      this.postData('post','/shop-v1-index_get_root.html').then(res => {
//        this.homeshow= res.data.rootId !== "Aw";
//      })
    },
    mounted(){
      // console.log(document.documentElement.scrollTop)
      this.getData('GET', '/shop-v1-article_lst.html', {is_best: '1'}).then(res => {
        this.lists = res.data.data
      })
      window.addEventListener('scroll', this.menu)
    },
    components: {Navigator, footer1},
    methods: {
      tolei(){
        this.$router.push({path: '/classification'})
      },
      toremen(){
        this.$router.push({path: '/activity'})
      },
      tokejian(){
        this.$router.push({path: '/mine-course-playtime'})
      },
      wenzhang(){
        this.$router.push({path: '/mine-course-playtime'})
      },
      tozhibo(){
        Toast({
          message: '开发中',
          iconClass: 'icon iconfont icon-2',
          duration: 1500
        });
        // this.$router.push({path:'/tutorList'});
      },
      menu(){
        if (document.documentElement.scrollHeight <= document.documentElement.clientHeight + document.body.scrollTop + 50) {
          this.dibu = true;
        }
      },
      toArticles(id, type){
        switch (type) {
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
      }
    },
  }
</script>

<style lang="less">
  #box1 {
    height: 100%;
    .header {
      height: 1.3rem;
      width: 100%;
      background-color: #fff;
      display: flex;
      display: -webkit-flex;
      font-size: 0.26rem;
      color: #666;
      .middle {
        display: table;
        height: 100%;
        width: 100%/4;
        .tablecell {
          display: table-cell;
          vertical-align: middle;
          .ii {
            width: 0.7rem;
            height: 0.7rem;
            margin: 0 auto;
            border-radius: 50%;
            i {
              font-size: 0.45rem;
              position: relative;
              top: 0.1rem;
              left: 0.125rem;
            }
          }
          .name {
            text-align: center;
            margin-top: 0.05rem;
            font-size: 0.205rem;
          }
        }
      }
    }
    .wenzahng {
      height: 4.15rem;
      width: 6rem;
      margin: 0 auto;
      background-color: #fff;
      margin-top: 0.2rem;
      border-radius: 0.2rem;
      font-size: 0.28rem;
      font-weight: bold;
      box-shadow: 0px 0px 6px #ccc;
      .tou {
        padding-top: 0.2rem;
        margin-left: 0.2rem;
        span:nth-child(2) {
          float: right;
          color: #999;
          font-size: 0.25rem;
          i {
            font-size: 0.25rem;
            margin-right: 0.2rem;
          }
        }
        .yi {
          margin-top: 0.4rem;
          img {
            height: 1.5rem;
            width: 2.05rem;
          }
          .xinxi {
            display: inline-block;
            font-weight: normal;
            color: #333;
            position: relative;
            top: -0.45rem;
            margin-left: 0.2rem;
            .title {
              width: 3.2rem;
              text-overflow: -o-ellipsis-lastline;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
            }
          }
        }
        .qita {
          font-weight: normal;
          color: #333;
          padding-top: 0.25rem;
          width: 5.5rem;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          i {
            font-size: 0.3rem;
            margin-right: 0.1rem;
            font-weight: 500;
          }
        }
      }
    }
  }

  #box1 .mint-swipe {
    height: 3.413rem;
  }

  #box1 .mint-navbar {
    background-color: #fff;
    color: #fff;
    overflow: hidden;
    height: 0.8rem;
  }

  #box1 .mint-navbar .mint-tab-item.is-selected {
    color: #5e96d0;
    border-bottom: 1px solid #5e96d0;
    margin-bottom: 0px;
  }

  #box1 .mint-navbar {
    // position: fixed;
    top: 0;
    z-index: 2;
    width: 100%;
  }

  #box1 .mint-tab-item-label {
    font-size: 0.27rem;
    position: relative;
    top: -0.05rem;
  }

  .lunboPic {
    // height: 8rem;
    width: 100%;
  }

  .titleone .title {
    font-size: 0.3rem;
    border-left: 0.1rem solid #5e96d0;
    padding-left: 0.1rem;
    font-weight: 500;
  }

  .recommend {
    height: 2.58rem;
    // padding: 0 0.2rem;
    padding-bottom: 0.2rem;
    background-color: #fff;
  }

  .recommend img {
    width: 100%;
    height: 2.58rem;
  }

  #box1 .mint-swipe-indicators {
    top: 2.2rem;
  }

  .titleone {
    padding: 0.1rem 0.2rem;
    background-color: #fff;
    margin-top: 0.2rem;
  }

  /*导航*/
  .nav {
    font-size: 0.26rem;
  }
</style>
