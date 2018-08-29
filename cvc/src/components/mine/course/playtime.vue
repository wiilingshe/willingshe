<template>
  <div class="playtime" v-infinite-scroll="loadMore"
       infinite-scroll-disabled="false"
       infinite-scroll-immediate-check="false"
       infinite-scroll-distance="20"
       >
       <nodata v-if="this.arr.length == 0"></nodata>
       <div  v-if="this.arr.length != 0">
        <ul class="playtime_list" >
            <li class="playtime_firstitem">
              <a class="playtime_firstitem-content" @click="toArticles(firstitem.art_id,firstitem.article_type)" >
                <div class="playtime_firstitem-imgwrap">
                  <img class="playtime_firstitem-img" :src="firstitem.pic" @load="imgload(firstitem.art_id)" onerror="this.src=&quot;/static/img/1111.f2c6065.png&quot;"  >
                  <div :class="'load'+ firstitem.art_id"
                       style="position: absolute;
                              top: 0;
                              left: 0;
                              width: 100%;
                              height: 2.5rem;
                              height: 55vw;
                              line-height:55vw;
                              text-align: center;"
                  >加载中.........</div>
                </div>
                <div class="playtime_firstitem-textwrap">
                  <div class="playtime_firstitem-text">
                    <span class="playtime_firstitem-bakcol">{{firstitem.title}}</span>
                  </div>
                  <div class="playtime_firstitem-details">
                    <div class="playtime_firstitem-left" style="float: left">
                      <span class="playtime_firstitem-time" style="padding-right: 0.1rem">
                        {{firstitem.format_time}}
                      </span>
                      <!--<span class="playtime_firstitem-type">{{firstitem.cat_name}}</span>-->
                    </div>
                    <div class="playtime_firstitem-right" style="float: right">
                      <span class="playtime_firstitem-comment" style="padding-right: 0.3rem">
                        <i class="icon iconfont icon-huihua1" style="padding-right: 0.1rem"></i>
                        {{firstitem.comment_num}}
                    </span>
                      <span class="playtime_firstitem-collect">
                        <i class="icon iconfont icon-aixin" style="padding-right: 0.1rem"></i>
                        {{firstitem.collect_num}}
                      </span>
                    </div>
                  </div>
                </div>
              </a>
              <div class="playtime_firstitem-selecttext">
                <a @click="toBoutique()">
                  <span style="font-size: 0.24rem;color: #666666;margin-right: 0.1rem">精选文章</span>
                  <i class="icon iconfont icon-tiaozhuan"></i>
                </a>
              </div>
            </li>

            <li class="playtime_item" v-for="(item,index) in arr">
              <a class="playtime_item-content" @click="toArticles(item.art_id,item.article_type)">
                <div class="playtime_item-textwrap">
                  <div class="playtime_item-text">
                    {{item.title}}
                  </div>
                  <div class="playtime_item-details">
                    <div class="playtime_item-top">
                      <span class="playtime_item-type" style="padding-right: 0.12rem;font-size: 0.24rem;color: #999999">
                        {{item.cat_name}}
                      </span>
                    </div>
                    <div class="playtime_item-left" style="float: left">

                      <span class="playtime_item-comment" style="padding-right: 0.1rem;font-size: 0.24rem;color: #999999">
                        <i class="icon iconfont icon-huihua1" style="padding-right: 0.01rem"></i>
                        {{item.comment_num}}
                      </span>
                      <span class="playtime_item-collect" style="font-size: 0.24rem;color: #999999">
                        <i class="icon iconfont icon-aixin" style="padding-right: 0.01rem"></i>
                        {{item.collect_num}}
                    </span>
                    </div>
                    <div class="playtime_item-right" style="float: right">
                      <span class="playtime_item-time" style="font-size: 0.24rem;color: #999999">
                        {{item.format_time}}
                      </span>

                    </div>
                  </div>
                </div>
                <div class="playtime_item-imgwrap">
                  <img class="playtime_item-img" :src="item.pic" alt="图片未加载成功" onerror="this.src=&quot;/static/img/1111.f2c6065.png&quot;" @load="imgload(item.art_id)">
                  <div :class="'load'+item.art_id"
                       style="position: absolute;
                              top: 0;
                              left: 0;
                              width: 100%;
                              height: 2rem;
                              height: 35vw;
                              line-height:35vw;
                              text-align: center;
                              z-index:50;"
                  >加载中.........</div>
                </div>
              </a>
            </li>
          </ul>

        <div class="playtime_bottomtip" v-if="!loadis" >
          <loadNo></loadNo>
        </div>

        <div :class="logois">
          <footer1></footer1>
        </div>

        <component :is="rootId"></component>
       </div>

  </div>
</template>

<script>
  import {InfiniteScroll,Indicator} from 'mint-ui';
  import footer1 from '@/components/common/footer1';
  import Navigator from '@/components/common/Navigator';
  import customNav from '@/components/home/custom/customNav';
  import loadNo from '@/components/common/loadNo';
  import nodata from '@/components/common/nodata';
  export default {
      data(){
          return {
            arr:[],
            firstitem:{},
            artid:'',
            loadis:true,
            logois:'',
            page:1,
            url:'',
            rootId:'',
            customArr:['Aw'],
          }
      },
      created() {
        Indicator.open();
        document.title = "摄影必读";
        this.global.shouquan();
//        判断显示导航类型
        this.postData('post','/shop-v1-index_get_root.html').then(res => {
          if(res.data.rootId && res.data.rootId != ''){
            this.rootId = this.customArr.indexOf(res.data.rootId) != -1?'Navigator':'customNav';
          }else{
            this.rootId= this.customArr.indexOf(this.$route.query.root_id) != -1 ? 'Navigator':'customNav';
          }
        });
//        文章数据
        this.getData('get','/shop-v1-article_lst.html?is_page_top=1').then(res => {
          if(res.status == 200){
            this.arr = res.data.data;
            this.firstitem = res.data.topArticle;
            this.logois = this.arr.length > 3 ? 'playtime_logomar':'playtime_logobom';
            Indicator.close();
          }
        });
//        分享数据
        this.getData('get','/shop-v1-index_basemsg.html').then(res => {
          if(res.status == 200){
            this.share(res.data.title,res.data.description,res.data.logo);
          }
        });

//        函数去抖
//        $(window).on('scroll',aa());
//        function aa() {
//          let bounce;
//          console.log(2);
//          return function () {
//            clearTimeout(bounce);
//            bounce = setTimeout(loga,500);
//
//            function loga() {
//              console.log(1);
//            }
//          }
//        }
//        =============

      },
      methods: {
//          下拉加载数据
        loadMore(){
          if(this.arr.length <= 40 && this.loadis){
            this.page++;
            this.url = '/shop-v1-article_lst.html?is_page_rec=1&page='+this.page;
            this.getData('get',this.url).then(res => {
              if(res.status==200){
//                console.log(res.data);
                if(res.data.data.length == 0){
                  this.loadis =false;
                }
                this.arr = this.arr.concat(res.data.data);
              }
            });
          }
        },
//        文章跳转
        toArticles(id,type){
            let rootId = this.$route.query.root_id;
//            根据不同类型文章传参
          switch(type) {
            case 1:
              this.$router.push({path: "/mine-course-articles", query: {artid: id,root_id:rootId}});
              break;
            case 2:
              this.$router.push({path: "/mine-course-vote", query: {artid: id,root_id:rootId}});
              break;
            case 3:
              this.$router.push({path: "/mine-course-mesay", query: {artid: id,root_id:rootId}});
              break;
            case 4:
              this.$router.push({path: "/mine-course-articles", query: {artid: id,root_id:rootId}});
              break;
          }
        },
//        跳转文章分类页
        toBoutique(){
          let rootId = this.$route.query.root_id;
          this.$router.push({path: "/mine-course-boutiquetext", query:{root_id:rootId}})
        },
//        图片加载中事件
        imgload(id){
            $('.load'+ id).hide();
        }
  },
    components:{footer1,Navigator,loadNo,customNav,nodata}
  }
</script>

<style scoped lang="less">
  .playtime{
    position: relative;
    width: 100%;
    width: 100vw;
    /*height: 100%;*/
    /*height: 100vh;*/
    overflow:hidden;
    /*-webkit-overflow-scrolling:touch;*/


    /*overflow: hidden;*/
    font-size: 0.26rem;
    font-weight: 700;
    color: #000000;
    background-color: #fff;


    &_firstitem{
      border-bottom: 0.2rem solid #f2f2f2;
      /*margin-bottom: 0.4rem;*/
      &-imgwrap{

      }
      &-img{
          display: block;
          width: 100%;
          min-height: 2.5rem;
          min-height: 55vw;
          text-align: center;
      }

      &-textwrap{
        padding: 0.2rem 0.2rem 0;
      }
      &-bakcol{
        font-size: 0.28rem;
        color: #333333;
        /*background: #000000;*/
      }
      &-details{
        overflow: hidden;
        padding: 0 0.06rem 0.2rem;
        margin-top: 0.2rem;
        font-size: 0.24rem;
        font-weight: 200;
        color: #999999;
        border-bottom: 0.02rem solid #dddddd;
      }

      &-selecttext{
        padding-bottom: 0.2rem;
        padding-top: 0.25rem;
        text-align: center;
        border-bottom: 0.02rem solid #dddddd;

        a:visited,a:link{
          color: #666666;
        }
      }

    }

    &_list{
      position:relative;
      /*z-index: 40;*/
    }
    &_item{

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
        /*裁剪图片*/
        height: 2rem;
        height: 33vw;
        overflow: hidden;
      }
      &-img{
        display: block;
        width: 3rem;
        min-height: 2rem;
        min-height: 33vw;
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
        word-break: break-all
      }
      &-details{
        font-size:0.2rem;
        font-weight: 200;
        color: #666666;
      }
    }
    &_logomar{
      margin-top: 0.5rem;
      margin-bottom: 0.8rem;
      width: 100%;
    }
    &_logobom{
      position: fixed;
      width: 100%;
      bottom: 0;
    }
    .public{
      z-index:100;
    }


    .icon-tiaozhuan{
      color: #5e96d0;
      font-size: 0.24rem;
    }
    .icon-aixin,.icon-huihua1{
      font-size: 0.2rem;
    }
  }

</style>
