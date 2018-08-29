<template>
  <div class="customAdv">
    <div class="customAdv_wrap" v-if="advObj.css_type == 1">
      <div class="customAdv_head" @click="goRoute(advObj.jump)" v-if="advObj.showtitle == 1">
        {{advObj.title}}
      </div>
      <!--下面空注释，消除inline-block默认间距-->
      <div class="customAdv_content" style="margin: 0 0.05rem"><!--
     -->
        <div class="customAdv_left">
          <img class="customAdv_img"
               :class="advObj.content[0].css_type == 1 ? 'advertimgone' : 'advertimgtwo'"
               :src="advObj.content[0].pic.src01"
               @click="goRoute(advObj.content[0].pic.link01)"
               @error="advObj.content[0].pic.src01 = advObj.content[0].css_type == 1 ? '/static/img/pic_addfengmian.png':'/static/img/onerr1.png';">
          <div style="height: 4%;background-color: transparent" v-if="advObj.content[0].css_type == 2"></div>
          <img class="customAdv_img"
               :class="advObj.content[0].css_type == 1 ? 'advertimgone' : 'advertimgtwo'"
               :src="advObj.content[0].pic.src02"
               v-if="advObj.content[0].css_type == 2"
               @click="goRoute(advObj.content[0].pic.link02)"
               @error="advObj.content[0].pic.src02 = advObj.content[0].css_type == 1 ? '/static/img/pic_addfengmian.png':'/static/img/onerr1.png';">
        </div><!--
       -->
        <div class="customAdv_right">
          <img class="customAdv_img"
               :class="advObj.content[1].css_type == 1 ? 'advertimgone' : 'advertimgtwo'"
               :src="advObj.content[1].pic.src01"
               @click="goRoute(advObj.content[1].pic.link01)"
               @error="advObj.content[1].pic.src01 = advObj.content[1].css_type == 1 ? '/static/img/pic_addfengmian.png':'/static/img/onerr1.png';">
          <div style="height: 4%;background-color: transparent" v-if="advObj.content[1].css_type == 2"></div>
          <img class="customAdv_img"
               :class="advObj.content[1].css_type == 1 ? 'advertimgone' : 'advertimgtwo'"
               :src="advObj.content[1].pic.src02"
               v-if="advObj.content[1].css_type == 2"
               @click="goRoute(advObj.content[1].pic.link02)"
               @error="advObj.content[1].pic.src02 = advObj.content[1].css_type == 1 ? '/static/img/pic_addfengmian.png':'/static/img/onerr1.png';">
        </div><!--
     --></div>
    </div>

    <div class="customAdv_wrap" v-if="advObj.css_type == 2">
      <div class="customAdv_head" @click="goRoute(advObj.jump)" v-if="advObj.showtitle == 1">
        {{advObj.title}}
      </div>
      <!--下面空注释，消除inline-block默认间距-->
      <div class="customAdv2_content" style="margin: 0 0.05rem">
        <div class="customAdv2_top" :class="advObj.content[0].css_type == 1 ? 'activitytopone' : 'activitytoptwo'"><!--
        --><img class="customAdv2_img"
                :class="advObj.content[0].css_type == 1 ? 'activityimgone' : 'activityimgtwo'"
                :src="advObj.content[0].pic.src01"
                @click="goRoute(advObj.content[0].pic.link01)"
                @error="advObj.content[0].pic.src01 = advObj.content[0].css_type == 1 ? '/static/img/onerr1.png':'/static/img/pic_addfengmian.png';"><!--
        --><img class="customAdv2_img"
                :class="advObj.content[0].css_type == 1 ? 'activityimgone' : 'activityimgtwo'"
                :src="advObj.content[0].pic.src02"
                v-if="advObj.content[0].css_type == 2"
                @click="goRoute(advObj.content[0].pic.link02)"
                @error="advObj.content[0].pic.src02 = advObj.content[0].css_type == 1 ? '/static/img/onerr1.png':'/static/img/pic_addfengmian.png';"><!--
       --></div>
        <div class="customAdv2_bottom"
             :class="advObj.content[1].css_type == 1 ? 'activitybottomone' : 'activitybottomtwo'"><!--
        --><img class="customAdv2_img"
                :class="advObj.content[1].css_type == 1 ? 'activityimgone' : 'activityimgtwo'"
                :src="advObj.content[1].pic.src01"
                @click="goRoute(advObj.content[1].pic.link01)"
                @error="advObj.content[1].pic.src01 = advObj.content[1].css_type == 1 ? '/static/img/onerr1.png':'/static/img/pic_addfengmian.png';"><!--
        --><img class="customAdv2_img"
                :class="advObj.content[1].css_type == 1 ? 'activityimgone' : 'activityimgtwo'"
                :src="advObj.content[1].pic.src02"
                v-if="advObj.content[1].css_type == 2"
                @click="goRoute(advObj.content[1].pic.link02)"
                @error="advObj.content[1].pic.src02 = advObj.content[1].css_type == 1 ? '/static/img/onerr1.png':'/static/img/pic_addfengmian.png';"><!--
       --></div>
      </div>
    </div>

  </div>
</template>

<script>
  import {Toast} from 'mint-ui';
  export default{
    data(){
      return {}
    },
    props: {
      advObj: Object
    },
    created(){
    },
    methods: {
      goRoute(herf){
        if (herf != "") {
          let reg = /^((https|http|ftp|rtsp|mms)?:\/\/)[^\s]+/;
          if (reg.test(herf)) {
            window.location.href = herf;
          } else {
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
  .customAdv {
    &_wrap {
      background-color: #ffffff;
    }
    &_head {
      padding: 0.12rem 0.1rem;
      /*line-height: 0.6rem;*/
      font-size: 0.35rem;
      font-weight: bold;
    }
    .icon-dayuhao1 {
      font-size: 0.3rem;
      color: #51b2e5;
    }
    &_content {
      height: 3.1rem;
    }
    &_left {
      display: inline-block;

      /*width: 49.5%;*/
      /*heqingqing201806/23修改*/
      width: 48.5%;
      height: 100%;
      margin-right: 1%;
    }
    &_right {
      display: inline-block;
      width: 49.5%;
      /*heqingqing201806/23修改*/
      width: 48.5%;

      height: 100%;
    }
    &_img {
      display: block;
      width: 100%;
    }
    .advertimgone {
      height: 100%;
    }
    .advertimgtwo {
      height: 48%;
    }

    /*活动并入图文部分*/
    .customAdv2 {
      &_top {
        width: 100%;
        margin-bottom: 1%;
      }
      &_bottom {
        width: 100%;
      }
      &_img {
        display: inline-block;
        height: 100%;
      }
    }
    .icon-dayuhao1 {
      font-size: 0.3rem;
      color: #51b2e5;
    }
    /*暂时调整*/
    .activitytopone {
      /*height: 3.1rem;*/
      /*height: 29vw;*/
      height: 46vw;
    }
    .activitytoptwo {
      height: 2rem;
    }
    /*暂时调整*/
    .activitybottomone {
      /*height: 3.1rem;*/
      /*height: 29vw;*/
      height: 46vw;

    }
    .activitybottomtwo {
      height: 2rem;
    }
    .activityimgone {
      width: 100%;
    }
    .activityimgtwo {
      width: 49.5%;
    }
    .activityimgtwo:first-child {
      margin-right: 1%;
    }

  }
</style>
