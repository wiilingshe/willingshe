<template>
  <div class="customFall">
    <div class="customFall_content">
      <div class="item" v-for="i in fullObj.content">
        <img :src="i" alt="" class="customFall_img" onerror="this.src=&quot;/static/img/pic_addfengmian.png&quot;">
      </div>
      <!--<div class="customFall_left"></div>-->
      <!--<div class="customFall_right"></div>-->
    </div>
    <!--<div class="customFall_item" v-for="i in fullObj.content">-->
    <!--<img :src="i" alt="" class="customFall_img" onerror="this.src=&quot;/static/img/pic_addfengmian.png&quot;"-->
    <!--@load="imgLoad()" @click="">-->
    <!--</div>-->
    <!--大图预览-->
    <transition name="works">
      <div class="customFall_big" v-if="imgShow">
          <span class="customFall_close" @click="closeImg()">
            <i class="icon iconfont icon-guanbi"></i>
          </span>
        <mt-swipe :auto="0" :defaultIndex="defaultIndex">
          <mt-swipe-item v-for="(item,index) in bigImg" :key="index">
            <div style="display: table;width:100%;height: 100%;">
              <div style="display: table-cell;width:100%;vertical-align: middle;height: 100%;text-align: center"
                   @click="closeImg()">
                <img class="customFall_bigimg" :src="item.src"
                     onerror="this.src=&quot;/static/img/pic_addfengmian.png&quot;"
                     @click="stopClick($event)" @load="bigLoad($event)">
              </div>
            </div>
          </mt-swipe-item>
        </mt-swipe>
      </div>
    </transition>
  </div>

</template>

<script>
  export default{
    data(){
      return {
        imgLen: 0,
        imgShow: false,
        bigImg: [],
        defaultIndex: 0,
        phoneHeight: document.documentElement.clientHeight,
      }
    },
    props: {
      fullObj: Object
    },
    created(){
      this.imgLen = this.fullObj.content.length;
      this.customClass = '.custom' + this.fullObj.sorting
    },
    mounted(){
      let that = this;
//      大图加载
      this.$nextTick(function () {
        let imgArr = $(this.customClass + ' .customFall_img');
        imgArr.each((i) => {
          this.bigImg.push({src: imgArr.eq(i).attr('src'), maxh: 1});
        });
//        绑定点击事件，默认显示点击图片
        imgArr.on('click', function () {
          that.defaultIndex = imgArr.index($(this));
          that.imgShow = true;
        });
      });
    },
    methods: {
      //  遍历所有图片
      imgLoad(){
        this.imgLen--;
        if (this.imgLen == 0) {
          this.appendFall();
        }
      },
      //  瀑布流添加
//      appendFall(){
//        let that = this;
//        let fallLeft = $(this.customClass + ' .customFall_left');
//        let fallRight = $(this.customClass + ' .customFall_right');
//        $(this.customClass + ' .customFall_item').each(function () {
//          if (fallLeft.height() <= fallRight.height()) {
//            $(that.customClass + ' .customFall_left').append($(this));
//          } else {
//            $(that.customClass + ' .customFall_right').append($(this));
//          }
//        });
//      },
      closeImg(){
        this.imgShow = false;
        $('.customAdv_big').hide();
      },
      //  阻止冒泡事件
      stopClick(even){
        even.stopPropagation();
      },
      //  大图加载
      bigLoad(event){
        if (this.phoneHeight < event.target.height) {
          $(event.target).attr({'class': 'customFall_bigimg2'});
        }
      },

    }
  }
</script>
<style scoped lang="less">
  .customFall {

    &_content {
      overflow: hidden;
      -webkit-column-count: 2;
      column-count: 2;
      -webkit-column-gap: 0.5rem;
      column-gap: 0.5em;
      .item {
        padding-bottom: 0.05rem;
        /*margin-bottom: 0.1rem;*/
        img {
          width: 100%;
        }
      }
    }
    &_left {
      display: inline-block;
      width: 49.5%;
      margin-right: 1%;
      overflow: hidden;
      vertical-align: top;
    }
    &_right {
      display: inline-block;
      width: 49.5%;
      vertical-align: top;
    }
    &_item {
      /*opacity: 0;*/
      box-sizing: border-box;
      width: 100%;
      margin-bottom: 2%;
      padding: 1%;
      /*border: 0.02rem solid #dddddd;*/
    }
    &_img {

      width: 100%;
    }

    /*放大图片*/
    &_big {
      position: fixed;
      left: 0;
      top: 0;
      width: 100vw;
      height: 100vh;
      z-index: 99;
      background-color: rgba(51, 51, 51, 0.94);
      .mint-swipe-indicator {
        box-sizing: border-box;
        background-color: #000000;
        opacity: 0.6;
      }
      .mint-swipe-indicator.is-active {
        background-color: #ffffff;
        border: 0.03rem solid #000;
        opacity: 1;
      }
    }
    &_close {
      position: absolute;
      top: 0.3rem;
      right: 0.2rem;
      z-index: 5;
      color: #ffffff;
    }
    &_bigimg {
      display: inline-block;
      width: 100%;
    }
    &_bigimg2 {
      display: inline-block;
      max-width: 100%;
      max-height: 100vh;
    }
    .icon-guanbi {
      color: #ffffff;
    }

    .works-enter-active, .works-leave-active {
      transition: all 0.5s;
    }
    .works-enter, .works-leave-active {
      opacity: 0;
    }

  }
</style>
