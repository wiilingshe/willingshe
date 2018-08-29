<template>
  <div class="customAdv">
    <!--样式1-->
    <div class="customAdv_wrap" v-if="advObj.css_type == 1">
        <div class="customAdv_head" @click="goRoute(advObj.jump)" v-if="advObj.showtitle == 1">
          {{advObj.title}}
        </div>
      <!--下面空注释，消除inline-block默认间距-->
        <div class="customAdv_content" style="margin: 0 0.1rem"><!--
     --><div class="customAdv_left">
          <img class="customAdv_img"
               :class="advObj.content[0].css_type == 1 ? 'advertimgone' : 'advertimgtwo'"
               :src="advObj.content[0].pic.src01"
               @error="advObj.content[0].pic.src01 = advObj.content[0].css_type == 1 ? '/static/img/onerr2.png':'/static/img/onerr1.png';">
          <div style="height: 4%;background-color: transparent" v-if="advObj.content[0].css_type == 2"></div>
          <img class="customAdv_img"
               :class="advObj.content[0].css_type == 1 ? 'advertimgone' : 'advertimgtwo'"
               :src="advObj.content[0].pic.src02"
               v-if="advObj.content[0].css_type == 2"
               @error="advObj.content[0].pic.src02 = advObj.content[0].css_type == 1 ? '/static/img/onerr2.png':'/static/img/onerr1.png';">
        </div><!--
       --><div class="customAdv_right">
          <img class="customAdv_img"
               :class="advObj.content[1].css_type == 1 ? 'advertimgone' : 'advertimgtwo'"
               :src="advObj.content[1].pic.src01"
               @error="advObj.content[1].pic.src01 = advObj.content[1].css_type == 1 ? '/static/img/onerr2.png':'/static/img/onerr1.png';">
          <div style="height: 4%;background-color: transparent" v-if="advObj.content[1].css_type == 2"></div>
          <img class="customAdv_img"
               :class="advObj.content[1].css_type == 1 ? 'advertimgone' : 'advertimgtwo'"
               :src="advObj.content[1].pic.src02"
               v-if="advObj.content[1].css_type == 2"
               @error="advObj.content[1].pic.src02 = advObj.content[1].css_type == 1 ? '/static/img/onerr2.png':'/static/img/onerr1.png';">
        </div><!--
     --></div>
      </div>
    <!--样式2-->
    <div class="customAdv_wrap" v-if="advObj.css_type == 2" >
        <div class="customAdv_head" @click="goRoute(advObj.jump)" v-if="advObj.showtitle == 1">
          {{advObj.title}}
        </div>
      <!--下面空注释，消除inline-block默认间距-->
        <div class="customAdv2_content" style="margin: 0 0.1rem">
          <div class="customAdv2_top" :class="advObj.content[0].css_type == 1 ? 'activitytopone' : 'activitytoptwo'"><!--
        --><img class="customAdv2_img"
                :class="advObj.content[0].css_type == 1 ? 'activityimgone' : 'activityimgtwo'"
                :src="advObj.content[0].pic.src01"
                @error="advObj.content[0].pic.src01 = advObj.content[0].css_type == 1 ? '/static/img/onerr1.png':'/static/img/onerr2.png';"><!--
        --><img class="customAdv2_img"
                :class="advObj.content[0].css_type == 1 ? 'activityimgone' : 'activityimgtwo'"
                :src="advObj.content[0].pic.src02"
                v-if="advObj.content[0].css_type == 2"
                @error="advObj.content[0].pic.src02 = advObj.content[0].css_type == 1 ? '/static/img/onerr1.png':'/static/img/onerr2.png';"><!--
       --></div>
          <div class="customAdv2_bottom" :class="advObj.content[1].css_type == 1 ? 'activitybottomone' : 'activitybottomtwo'"><!--
        --><img class="customAdv2_img"
                :class="advObj.content[1].css_type == 1 ? 'activityimgone' : 'activityimgtwo'"
                :src="advObj.content[1].pic.src01"
                @error="advObj.content[1].pic.src01 = advObj.content[1].css_type == 1 ? '/static/img/onerr1.png':'/static/img/onerr2.png';"><!--
        --><img class="customAdv2_img"
                :class="advObj.content[1].css_type == 1 ? 'activityimgone' : 'activityimgtwo'"
                :src="advObj.content[1].pic.src02"
                v-if="advObj.content[1].css_type == 2"
                @error="advObj.content[1].pic.src02 = advObj.content[1].css_type == 1 ? '/static/img/onerr1.png':'/static/img/onerr2.png';"><!--
       --></div>
        </div>
      </div>
    <!--图片放大预览-->
    <transition name="works">
      <div class="customAdv_big" v-if="imgShow">
          <span class="customAdv_close" @click="closeImg()">
            <i class="icon iconfont icon-guanbi"></i>
          </span>
        <mt-swipe :auto="0" :defaultIndex="defaultIndex">
          <mt-swipe-item  v-for="(item,index) in bigImg" :key="index">
            <div style="display: table;width:100%;height: 100%;">
              <div style="display: table-cell;width:100%;vertical-align: middle;height: 100%;" @click="closeImg()">
                <img  class="customAdv_bigimg" :src="item" onerror="this.src=&quot;/static/img/onerr2.png&quot;" @click="stopClick($event)">
              </div>
            </div>
          </mt-swipe-item>
        </mt-swipe>
      </div>
    </transition>
  </div>
</template>

<script>
  import { Toast } from 'mint-ui';
    export default{
      data(){
            return {
              imgShow:false,
              bigImg:[],
              defaultIndex:0,
            }
      },
      props:{
        advObj:Object
      },
      created(){

      },
      mounted(){
          let that = this;
//        点击图片放大
          this.$nextTick(function () {
//              类型判断
            if(this.advObj.css_type == 1){
//                添加大图
              $('.customAdv_img').each((i)=>{
                this.bigImg.push($('.customAdv_img').eq(i).attr('src'));
              })
//              初始显然点击图片
              $('.customAdv_img').on('click',function () {
                that.defaultIndex = $('.customAdv_img').index($(this));
                that.imgShow = true;
              });
            }else{
              //                添加大图
              $('.customAdv2_img').each((i)=>{
                this.bigImg.push($('.customAdv2_img').eq(i).attr('src'));
              });
              //              初始显然点击图片
              $('.customAdv2_img').on('click',function () {
                that.defaultIndex = $('.customAdv2_img').index($(this));
                that.imgShow = true;
              });
            }
          })
      },
      methods:{
        closeImg(){
          this.imgShow = false;
          $('.customAdv_big').hide();
        },
        stopClick(even){
//            阻止冒泡
          even.stopPropagation();
        },
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
  .customAdv{
    &_wrap{
      background-color: #ffffff;
    }
    &_head{
      padding: 0.12rem 0.1rem;
      /*line-height: 0.6rem;*/
      font-size: 0.35rem;
      font-weight: bold;
    }
    .icon-dayuhao1{
      font-size: 0.3rem;
      color: #51b2e5;
    }
    &_content{
      height: 3.1rem;
    }
    &_left{
      display: inline-block;

      width: 49%;
      height: 100%;
      margin-right: 2%;
    }
    &_right{
      display: inline-block;
      width: 49%;
      height: 100%;
    }
    &_img{
      display: block;
      width: 100%;
    }
    .advertimgone{
      height: 100%;
    }
    .advertimgtwo{
      height: 48%;
    }

    /*活动并入图文部分*/
    .customAdv2{
      &_top{
        width: 100%;
        margin-bottom: 2%;
      }
      &_bottom{
        width: 100%;
      }
      &_img{
        display: inline-block;
        height: 100%;
      }
    }
    .icon-dayuhao1{
      font-size: 0.3rem;
      color: #51b2e5;
    }
    .activitytopone{
      height: 3.1rem;
    }
    .activitytoptwo{
      height: 3.1rem;
    }
    .activitybottomone{
      height: 3.1rem;
    }
    .activitybottomtwo{
      height: 3.1rem;
    }
    .activityimgone{
      width: 100%;
    }
    .activityimgtwo{
      width: 49%;
    }
    .activityimgtwo:first-child{
      margin-right:2%;
    }

    /*放大图片*/
    &_big{
      position: fixed;
      left: 0;
      top: 0;
      width: 100vw;
      height: 100vh;
      z-index: 99;
      background-color: rgba(51, 51, 51, 0.94);
      .mint-swipe-indicator{
        box-sizing: border-box;
        background-color: #000000;
        opacity: 0.6;
      }
      .mint-swipe-indicator.is-active{
        background-color: #ffffff;
        border: 0.03rem solid #000;
        opacity: 1;
      }
    }
    &_close{
      position: absolute;
      top:0.3rem;
      right: 0.2rem;
      z-index: 5;
      color: #ffffff;
    }
    &_bigimg{
      display: inline-block;
      width: 100%;
    }
    .icon-guanbi{
      color: #ffffff;
    }

    .works-enter-active,.works-leave-active{
      transition:all 0.5s;
    }
    .works-enter,.works-leave-active{
      opacity: 0;
    }

  }
</style>
