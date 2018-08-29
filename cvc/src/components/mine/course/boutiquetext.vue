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

    <div class="main" v-infinite-scroll="loadMore" infinite-scroll-disabled="false" infinite-scroll-immediate-check="false" infinite-scroll-distance="0">
      <div style="margin-top:0.2rem;">
        <ul class="list">
          <li class="item" v-for="(item,index) in arr" @click="toArticles(item.art_id,item.article_type)">
            <div style="width:100%;border-bottom:1px solid #eee;padding-top:0.28rem;padding-bottom:0.2rem;" :style="{'border-bottom':arr.length==index+1?'none':'1px solid #eee'}">
              <div class="photography-list-cover">
                <img :src="item.pic">
              </div>
              <div class="photography-list-info">
                <div class="photography-list-info-title">{{item.title}}</div>
                <div class="photography-list-info-time">
                  <div class="photography-list-info-time-time">
                    {{item.format_time}}
                  </div>
                  <div class="photography-list-info-time-watch">
                    <img src="../../../../static/img/home/home_Browsing.png"><span>{{item.click}}</span></i>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li class="boutique_contenttip" style="text-align: center;font-size: 0.3rem;padding-top: 0.8rem;color: #666666" v-if="!arr.length">
            <!-- —— &nbsp还没有内容&nbsp —— -->
            <nodata></nodata>
          </li>
          <div class="boutique_bottomtip" v-if="!loadis && arr.length">
            <loadNo></loadNo>
          </div>
          <!-- <div class="boutique_bottom">
            <div class="articles_bottom-left" style="float: left" @click="toBack()">
            <span class="articles_bottom-back" >
              <i class="icon iconfont icon-fanhui"></i>
            </span>
            </div>
          </div> -->
          <div :class="logois">
            <footer1></footer1>
          </div>
          <!--<li class="shiy" v-for="i in [1,2,3,4,5,6,7,8,9,10]" style="width: 100%;height: 1rem;"></li>-->
        </ul>
      </div>
    </div>

  </div>
</template>

<script>
  import { InfiniteScroll,Indicator } from 'mint-ui';
  import footer1 from '@/components/common/footer1';
  import loadNo from '@/components/common/loadNo';
  import nodata from '@/components/common/nodata';
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
      // document.title = '摄影文章'
      this.global.shouquan();
      Indicator.open();
      this.getData('get','/shop-v1-article_cat_lst.html?type=1').then(res => {
        if(res.status == 200){
          var item = [{cat_id: '', cat_name: "全部", pid: 0, child: []}]
          this.catone = item.concat(res.data)
          // this.catone = res.data;
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
          this.catone.forEach((i)=>{
            let arr = i.child;
            arr.forEach((j)=>{
              if(this.catid == j.cat_id){
                this.navid = i.cat_id;
              }
            });
          });

//          获取分类进入时，所选中类型
          this.url = '/shop-v1-article_lst.html?cat_id='+this.catid;
          this.getData('get',this.url).then(res => {
            if(res.status == 200){
              this.arr = res.data.data;
              this.logois = this.arr.length > 3 ? 'boutique_logomar':'boutique_logobom';
              // if(this.arr.length < 10){
              //   this.loadis =false;
              // }
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
    components:{footer1,loadNo,nodata},
    methods:{
//        下拉加载
      loadMore(){
        console.log(this.arr.length,this.loadis)
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
    // background-color: #fff;
    font-size: 0.5rem;
    overflow: hidden;
    width: 100%;
    height: 100%;
    .header{
      background-color: #fff;
      -webkit-overflow-scrolling:touch;
      overflow: scroll;
      &::-webkit-scrollbar{
        background-color:transparent;
        display: none;
      }
      // border-bottom: 0.02rem solid rgba(1,1,1,0.1);
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
        background-color: #fff;
      }
      &_item{
        display: inline-block;
        padding: 0.29rem 0.4rem;
        text-align: center;
        font-size: 0.26rem;
        color: #999;
        /*border-bottom: 0.04rem solid rgba(1,1,1,0.1);*/
        &-selected{
          margin: 0;
          color: #222;
          border-bottom: 0.04rem solid #222;
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
          // padding-bottom: 0.3rem;
          // padding-top: 0.3rem;
          // border-bottom: 1px solid #eee;
          background: #fff;
          padding-left: 0.3rem;
          padding-right: 0.3rem;
        }
        .photography-list-cover{
          width: 2.52rem;
          height: 1.52rem;
          background-color: #eee;
          display: inline-block;
          overflow: hidden;
          border-radius: 0.06rem;
          img{
            width: 2.52rem;
          }
        }
        .photography-list-info{
          display: inline-block;
          float: right;
          vertical-align: top;
          width: 4.08rem;
          height: 1.52rem;
          &-title{
            font-size: 0.3rem;
            display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
              overflow: hidden;
              height: 0.82rem;
          }
          &-time{
            font-size: 0.26rem;
            margin-top: 0.4rem;
            color: #666;
            &-time{
              display: inline-block;
            }
            &-watch{
              display: inline-block;
              float: right;
              img{
                height: 0.22rem;
                margin-top: 0.15rem;
                margin-right: 0.06rem;
              }
              i{
                font-size: 0.35rem;
                span{
                  font-size: 0.26rem;
                  display: inline-block;
                  margin-left: 0.1rem;
                  position: relative;
                    top: -0.03rem;
                }
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
      margin-bottom: 1rem;
      width: 100%;
    }
    &_logobom{
      position: fixed;
      width: 100%;
      bottom: 0rem;
    }

    .icon-aixin,.icon-huihua1{
      font-size: 0.2rem;
    }
  }


</style>
