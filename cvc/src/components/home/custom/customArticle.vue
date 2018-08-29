<template>
  <div class="customArticle">
    <!--除样式3以外的样式-->
    <div class="customArticle_wrap" :class="'articlesWrap' + articleObj.css_type" v-if="articleObj.css_type != 3">
      <div class="customArticle_item" :class="'articlesItem' + articleObj.css_type" v-for="j in articleObj.art_list" @click="goRoute(j.link)">
        <img :src="j.pic" class="customArticle_img" onerror="this.src=&quot;/static/img/onerr2.png&quot;" v-if ="articleObj.css_type == 4||articleObj.css_type == 5">

        <div class="customArticle_img" :style="{'background-image':'url('+j.pic+')'}" v-if="articleObj.css_type == 2"></div>

        <img :src="articleObj.content[0].pic" class="customArticle_img" onerror="this.src=&quot;/static/img/onerr2.png&quot;" v-if ="articleObj.css_type == 1&& articleObj.content[0] != undefined">
        <div class="customArticle_content">
          <div class="customArticle_title">{{j.title}}</div>
        </div>
      </div>
    </div>
    <!--样式3-->
    <div class="customArticle_wrap" :class="'articlesWrap' + articleObj.css_type" v-if="articleObj.css_type == 3">
      <div class="customArticle_item" :class="'articlesItem' + articleObj.css_type" v-for="j in articleObj.art_list" @click="goRoute(j.link)">
        <div class="customArticle_content">
          <div class="customArticle_title"> {{j.title}}</div>
        </div>
        <div class="customArticle_img" :style="{'background-image':'url('+j.pic+')'}">
          <!--<img :src="j.pic" class="" onerror="this.src=&quot;/static/img/onerr2.png&quot;">-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { Toast } from 'mint-ui';
  export default{
    data(){
      return {}
    },
    props:{
      articleObj:Object
    },
    created(){
    },
    methods:{
      goRoute(herf){
        if(herf != ""){
          let reg= /^((https|http|ftp|rtsp|mms)?:\/\/)[^\s]+/;
          if(reg.test(herf)){
            window.location.href = herf;
          }else{
            Toast({
              message: herf,
              position: 'middle',
              duration: 1500
            });
          }
        }
      },
    }
  }
</script>

<style scoped lang="less">
  .customArticle{
    padding: 0.2rem 4%;
    /*公共样式*/
    &_wrap{
      position: relative;
      overflow: hidden;
    }
    &_item{
      position: relative;
      overflow: hidden;
      margin-top: 0.1rem;
    }
    &_img{
      display: block;
      width: 120%;
    }
    &_content{
      width: 100%;
      padding-bottom:0.1rem;
      padding-top: 0.3rem;
    }
    &_title{
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      padding-left: 0.2rem;
      padding-right: 0.2rem;
      overflow-wrap:break-word;
      word-wrap:break-word;
      word-break:break-all;
    }

    /*5种样式*/
    .articlesWrap1,.articlesWrap2,.articlesWrap3{
      width: 100%;
    }
    .articlesWrap4,.articlesWrap5{
      display: -webkit-flex;
      display: flex;
      flex-wrap:wrap;
    }
    .articlesItem1,.articlesItem2,.articlesItem3{
      box-sizing: border-box;
      display: table;
      width: 100%;
      .customArticle_content{
        display: table-cell;
        vertical-align: middle;
        width: 70%;
      }
      .customArticle_img{
        display: table-cell;
        width: 100%;
        height: 1rem;
      }
    }
    .articlesItem1{
      height: 0.5rem;
      .customArticle_content{
        width: 100%;
        height: 100%;
        padding: 0;
      }
      .customArticle_img{
        width: 0.5rem;
        height: 0.5rem;
      }
    }
    .articlesItem4{
      flex: 0 0 48%;
      height: 45vw;
      &:nth-of-type(Odd){
        margin-right: 4%;
      }
      .customArticle_content{
        position: absolute;
        left: 0;
        bottom:0;
        color: #ffffff;
        background: -moz-linear-gradient(top, transparent 0%, #333 100%);
        background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,transparent), color-stop(100%,#333));
        background: -webkit-linear-gradient(top, transparent 0%,#333 100%);
        background: -o-linear-gradient(top, transparent 0%,#333 100%);
        background: -ms-linear-gradient(top, transparent 0%,#333 100%);
        background: linear-gradient(to bottom, transparent 0%,#333 100%);
      }
    }
    .articlesItem5{
      flex: 0 0 100%;
      height: 55vw;
      .customArticle_content{
        position: absolute;
        left: 0;
        bottom:0;
        color: #ffffff;
        background: -moz-linear-gradient(top, transparent 0%, #333 100%);
        background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,transparent), color-stop(100%,#333));
        background: -webkit-linear-gradient(top, transparent 0%,#333 100%);
        background: -o-linear-gradient(top, transparent 0%,#333 100%);
        background: -ms-linear-gradient(top, transparent 0%,#333 100%);
        background: linear-gradient(to bottom, transparent 0%,#333 100%);
      }
    }
    .articlesItem2,.articlesItem3{
      height: 2.3rem;
      padding: 0.1rem;
      background-color: #ffffff;
      .customArticle_content{
        width: 55%;
        padding-top: 0;
        padding-bottom: 0;
        font-size: 0.26rem;
        font-weight: 700;
        color: #000000;
      }
      .customArticle_img{
        display: table-cell;
        width: 45%;
        height: 100%;
        background-size: auto 100%;
        background-position:center;
      }
    }

    /*取消*/
    &_detail{
      padding: 0.1rem 0 0 0.2rem;

      .icon-huihua1{
        font-size: 0.28rem;
        color: #15c2ff;
      }
      .icon-aixin{
        font-size: 0.28rem;
        color: #a71d5d;
      }
    }
  }
</style>
