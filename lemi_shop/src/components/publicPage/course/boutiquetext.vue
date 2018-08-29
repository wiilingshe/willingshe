<template>
  <div class="boutique" >
    <div class="header">
      <ul class="header_wrap">
        <li class="header_item"
            :class="catid == item.cat_id ? 'header_item-selected':''"
            v-for="item in catone"
            @click="toggleItem(item.cat_id)">
          {{item.cat_name}}
        </li>
      </ul>
    </div>

    <div class="main" v-infinite-scroll="loadMore" infinite-scroll-disabled="false" infinite-scroll-immediate-check="false" infinite-scroll-distance="20">
      <ul class="list">
        <li class="item" v-for="item in arr" @click="toArticles(item.art_id,item.article_type)">
          <div class="textwrap">
            <div class="text">{{item.title}}</div>
            <div class="details">
              <div class="left">
        <span class="comment">
        <i class="icon iconfont icon-huihua1"></i>
        {{item.comment_num}}
        </span>
                <span class="collect">
        <i class="icon iconfont icon-aixin"></i>
        {{item.collect_num}}
                  <!---->
        </span>
              </div>
              <div class="right">
                <span class="time">{{item.format_time}}</span>
                <span class="type">{{item.cat_name}}</span>
              </div>
            </div>
          </div>
          <div class="imgwrap">
            <img :src="item.pic" alt="" onerror="this.src=&quot;/static/img/1111.f2c6065.png&quot;" @load="imgload(item.art_id)">
            <div :class="'load'+ item.art_id"
                 style="position: absolute;
                          top: 0;
                          left: 0;
                          width: 2.88rem;
                          height: 2rem;
                          line-height:2rem;
                          font-size: 0.3rem;
                          text-align: center;"
            >加载中.........</div>
          </div>
        </li>
        <li class="boutique_contenttip" style="text-align: center;font-size: 0.3rem;padding-top: 0.8rem;color: #666666" v-if="!arr.length">
          —— &nbsp还没有内容&nbsp ——
        </li>
        <div class="boutique_bottomtip" v-if="!loadis && arr.length">
          <loadNo></loadNo>
        </div>
        <div class="boutique_bottom">
          <div class="articles_bottom-left" style="float: left" @click="toBack()">
          <span class="articles_bottom-back" >
            <i class="icon iconfont icon-fanhui"></i>
          </span>
          </div>
        </div>
        <div :class="logois">
          <footer1></footer1>
        </div>
        <!--<li class="shiy" v-for="i in [1,2,3,4,5,6,7,8,9,10]" style="width: 100%;height: 1rem;"></li>-->
      </ul>
    </div>

  </div>
</template>

<script>
  import { InfiniteScroll,Indicator } from 'mint-ui';
  import footer1 from '@/components/publicPage/footer1';
  import loadNo from '@/components/common/loadNo';
  export default {
    data(){
      return {
        arr:[],
        catone:[],
        catarr:[],
        catid:44,
        navid:0,
        url:'',
        page:1,
        loadis:true,
        htmltitle:[],
        checkobj:{},
        logois:''
      }
    },
    created() {
      this.global.shouquan();
      Indicator.open();
      this.getData('get','/shop-v1-article_cat_lst.html?type=1').then(res => {
        if(res.status == 200){
          // if(res.data.length == 0){
          //   Indicator.close();
            
          //   this.catid = this.catone[0].cat_id;
          //   document.title = this.catone[0].cat_name;
          //   return false;
          // }
          // this.catone = res.data;
          var item = [{cat_name:'全部',cat_id:'all',child:[]}]
          this.catone = item.concat(res.data);
//          console.log(res.data);
//            子类展示
//            this.catid = this.$route.query.catId ? this.$route.query.catId : this.catone[0].child[0].cat_id;
//            this.catone.forEach((i)=>{
//              let arr = i.child;
//              arr.forEach((j)=>{
//                if(this.catid == j.cat_id){
//                  this.catarr = i.child;
//                  return;
//                }
//                  });
//              });
//            console.log(1,this.catarr);
          this.catid = this.catone[0].cat_id;
          document.title = this.catone[0].cat_name;

          this.catid = this.$route.query.catId ? this.$route.query.catId:this.catid;
          this.navid = this.catid;
//            匹配父类id
          console.log(this.catone)
          this.catone.forEach((i)=>{
            let arr = i.child;
            arr.forEach((j)=>{
              if(this.catid == j.cat_id){
                this.navid = i.cat_id;
              }
            });
          });

//          获取分类进入时，所选中类型
          if(this.catid == 'all'){
            this.url = '/shop-v1-article_lst.html';
          }else{
            this.url = '/shop-v1-article_lst.html?cat_id='+this.catid;
          }
          this.getData('get',this.url).then(res => {
            if(res.status == 200){
              this.arr = res.data.data;
              this.logois = this.arr.length > 3 ? 'boutique_logomar':'boutique_logobom';
              if(this.arr.length < 10){
                this.loadis =false;
              }
//                子类匹配导航
              this.catid = this.navid;
            }
            Indicator.close();
          });
        }
      });
//      分享
      this.getData('get','/shop-v1-index_basemsg.html').then(res => {
        if(res.status == 200){
          this.share(res.data.title,res.data.description,res.data.logo);
        }
      });
    },
    components:{footer1,loadNo},
    methods:{
//        下拉加载
      loadMore(){
        console.log(this.loadis)
        if(this.arr.length <= 50 && this.loadis){
          this.page++;
          this.url = '/shop-v1-article_lst.html?cat_id='+this.catid+'&page='+this.page;
          this.getData('get',this.url).then(res => {
            if(res.status==200){
              if(res.data.data.length == 0){
                this.loadis =false;
              }
              this.arr = this.arr.concat(res.data.data);
            }
          });
        }
      },
//      文章列表切换
      toggleItem(id){
        if(this.catid != id){
          let rootId = this.$route.query.root_id;
          this.page = 1;
          this.loadis = true;
          this.catid = id;
          if(rootId == undefined){
            this.url = '/shop-v1-article_lst.html?cat_id='+id;
          }else{
            this.url = '/shop-v1-article_lst.html?cat_id='+id+'&root_id='+rootId;
          }
          this.getData('get',this.url).then(res => {
            if(res.status == 200){
              this.arr = res.data.data;
              if(this.arr.length < 6){
                this.loadis =false;
              }
              this.logois = this.arr.length > 3 ? 'boutique_logomar':'boutique_logobom';
              this.toggletitle();
            }
          });
        }
      },
//      跳转文章
      toArticles(id,type){
        let rootId = this.$route.query.root_id;
        switch(type){
          case 1:
            this.$router.push({path: "/mine-course-articles", query: {artid: id,root_id:rootId}})
            break;
          case 2:
            this.$router.push({path: "/mine-course-vote", query: {artid: id,root_id:rootId}})
            break;
          case 3:
            this.$router.push({path: "/mine-course-mesay", query: {artid: id,root_id:rootId}})
            break;
        }
      },
//      头部导航切换
      toggletitle(){
        this.htmltitle = this.catone.filter((i)=>{
          if(this.catid == i.cat_id){
            return i;
          }
        });
        document.title = this.htmltitle[0].cat_name;
      },
      imgload(id){
        $('.load'+ id).hide();
      },
//      返回事件
      toBack(){
        if(window.history.length > 1){
          this.$router.back();
        }else{
          this.$router.push('/');
        }
      },
    }
  }
</script>

<style scoped lang="less">

  .boutique{
    background-color: #fff;
    font-size: 0.5rem;
    overflow: hidden;
    width: 100%;
    height: 100%;

    .header{
      -webkit-overflow-scrolling:touch;
      overflow: scroll;

      border-bottom: 0.02rem solid rgba(1,1,1,0.1);
      scrollbar-3dlight-color:#fff; // 3d亮色阴影边框(threedlightshadow)的外观颜色
      scrollbar-highlight-color:#fff; // 滚动条3d高亮边框(threedhighlight)的外观颜色
      scrollbar-arrow-color:#fff; // 滚动条方向箭头的颜色
      scrollbar-shadow-color:#fff; // 滚动条方向箭头的颜色
      scrollbar-darkshadow-color:#fff; // 滚动条3d暗色阴影边框(threeddarkshadow)的外观颜色
      scrollbar-base-color:#fff; // 滚动条基准颜色
      scrollbar-track-color:#fff; // 滚动条拖动区域的外观颜色

      &::-webkit-scrollbar {
        display: none;/*隐藏滚轮*/
      }


      &_wrap{
        /*横向不换行*/
        display: inline;
        float: left;
        overflow: hidden;
        white-space: nowrap;
      }
      &_item{
        display: inline-block;
        padding: 0.15rem 0.4rem;
        text-align: center;
        font-size: 0.26rem;
        /*border-bottom: 0.04rem solid rgba(1,1,1,0.1);*/
        &-selected{
          margin: 0;
          color: #fe0c2c;
          border-bottom: 0.06rem solid #fe0c2c;
          /*background-color: #FF9800;*/
        }
      }

    }

    .main{
      height: 100vh;
      -webkit-overflow-scrolling:touch;
      overflow: scroll;
      .list{
        .item{
          display: -webkit-box;
          display: -moz-box;
          display: -ms-flexbox;
          display: -webkit-flex;
          display: flex;
          border-bottom: 0.08rem solid #F7F7F7;
          background-color: #fff;
        }
        .imgwrap{
          position: relative;
          height: 2rem;
          height: 33vw;
          overflow: hidden;
          img{
            display: block;
            width: 2.88rem;
            min-height: 2rem;
            min-height: 33vw;
          }
        }

        .textwrap{
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
          padding: 0.16rem 0.18rem;

          .text{
            -webkit-box-flex: 1.0;
            -moz-flex-grow: 1;
            -webkit-flex-grow: 1;
            flex-grow: 1;

            line-height: 1.7;
            font-size: 0.24rem;
          }

          .details{
            font-size:0.2rem;
            font-weight: 200;
            color: #666666;

            .left{
              float: left;
              .comment{
                padding-right: 0.1rem;
              }
            }
            .right{
              float: right;
              .time{
                padding-right: 0.1rem;
              }
            }
          }
        }


      }
    }

    &_bottom{
      position: fixed;
      bottom: 0;
      left: 0;
      width: 90%;
      padding:0.2rem 5% 0.12rem;
      font-size: 0.24rem;
      color: #707070;
      border-top:0.02rem solid #dddddd;
      background-color: #ffffff;

      .icon-fanhui{
        font-size: 0.36rem;
        color: #707070;
      }
      .icon-huihua1{
        font-size: 0.36rem;
        color: #707070;
      }

      .icon-dianzantianchong,.icon-aixin{
        font-size: 0.36rem;
      }
      .icon-dianzantianchong{
        color: #d0cf0f;
      }

      &-huihua1,&-dianzantianchong{
        margin-right: 0.2rem;
      }

    }

    &_logomar{
      margin-top: 0.5rem;
      margin-bottom: 1.5rem;
      width: 100%;
    }
    &_logobom{
      position: fixed;
      width: 100%;
      bottom: 0.7rem;
    }

    .icon-aixin,.icon-huihua1{
      font-size: 0.2rem;
    }
  }


</style>
