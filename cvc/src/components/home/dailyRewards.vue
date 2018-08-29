<template>
  <div class="dailyRewards">
    <div class="allList" v-infinite-scroll="loadMore"
         infinite-scroll-disabled="false" infinite-scroll-immediate-check="false"
         infinite-scroll-distance="0">
      <div class="dailyList-top">
        <div>
          <div class="dailyList" v-for="(item,i) in data">
            <div class="dailyList-time" :i="i">
              <div class="dailyList-timeT">
                {{item.pic_time}}
              </div>
              <div class="dailyList-list" v-for="(val,key) in item.pic_list">
                <img :src="val.small_images" onerror="this.src='static/img/pic_addfengmian.png'" alt=""
                     @click="showImg(val.small_images)">
                <!-- <img :src="val.small_images" onerror="this.src='static/img/pic_addfengmian.png'" alt=""
                    v-preview="val.small_images"  :key="key" preview-title-enable="true"
     preview-nav-enable="true" style="width:100%;height:100%;"> -->
                <!-- <img :src="val.small_images" onerror="this.src='static/img/pic_addfengmian.png'" alt=""
                     @click="showImg1(val.small_images)"> -->
                <div class="dailyList-collection">
                  <img src="static/img/home/home_good_hover.png" v-if="val.is_collect == 1"
                       @click="collection(key,val.id,2,i)">
                  <img src="static/img/home/home_good.png" v-if="val.is_collect==0"
                       @click="collection(key,val.id,1,i)">
                  <span>{{val.count}}</span>
                </div>
              </div>
            </div>
            <div style="height: 0.3rem;background-color: #f1f2f6;"></div>
          </div>
        </div>

      </div>
      <loadNo v-show="showD"></loadNo>
      <footer1></footer1>
    </div>
    <div class="dailyNav" v-show="nav">
      <div class="dailyNav-home" @click="gohome()">
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACUAAAAiCAYAAADYmxC7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjYzMkYyOUMzM0QzQjExRTg5MTBGQjAyRTRCQkIxMjY4IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjYzMkYyOUM0M0QzQjExRTg5MTBGQjAyRTRCQkIxMjY4Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NjMyRjI5QzEzRDNCMTFFODkxMEZCMDJFNEJCQjEyNjgiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NjMyRjI5QzIzRDNCMTFFODkxMEZCMDJFNEJCQjEyNjgiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz77LQwRAAACpElEQVR42uzYb2hNcRzH8XO4JH8frHggLHliKda9zJ/8KbMs/xPyN1IWSUrN/Hk0f/fEE5GURYohiQgzEw3JZZTHM2nxwISatUy8v/W5dbou996de871YL96dbdz7p/POef3+/5+57jRaNTx2cbgIqagDlvwPdMPx+PxP7b18RloEp4ihkasxUOM8POlfkLNU4AhWIQy7IKd+mcYH3aodbiFTszGXW0/hhUYjieYE1ao3TiPt5iGl0n7r2IuulGvAwgsVF8cx1H1oxkKlqrZ/hLttwPYH0SogbiC7biOUnxK85kWTEcTDqAW/XIVqgD3sAynsDyLId+uA7iETeqHw/yGKsRjHbFdgq34mWUX6cJq1GjE2pkb1dNQxeobY7ERh3yUj1+oQgWKVDKKsw1Vpho0CAtxzslNO40Fqm2PUJ5pqA24iQ7VoHont+0OZuKb/U4sFqtIF2qPzkqLalCzE0x7hal4Y4OHYDVwk0NZDTqBw6rEVoNanWDbe8zSlai0yZxgAxKhEjVoG65phLQ74bSv6rNWw1aigWAFEf64gCU4iR09GPK+GkuXH7xsJox1mYN2YlzWU90a+us9720NKdNgjIOromqhSuxMPVDV9c5jbkihYvp9b6uzUEuxCkOxBpOd8NsZVfoPuB9RPar1rCTzEaqJvnU2V8vhQFokB99hy94JmpK+4Dna8hWqv5YipSkm3yPYl48bhyIFuoz5mgUWW+nRiiCvl++258bB0frc12D5Lzt6b6jeUD5a4par81+j76PnScq7DL+4Gjs9/4/MItREzz3iX89Ug16rMlgp2NG9xuek7W3anslMUKnVyQvvDjfF86kbeorSrFuhrgC6TKHumOzAy5mMG9OFsuljr+5oRwfUlzp0VaoJlPyAxPktwADE75YrjCPSggAAAABJRU5ErkJggg==">
        <span>首页</span>
      </div>
      <div class="dailyNav-send" @click="sendPic()">
        <img src="../../../static/img/home/home_Recommend.png">
        <span>我要上推荐</span>
      </div>
    </div>
    <!--大图预览开始-->
    <div class="big_images" v-if="isShow">
      <div class="big_imagesBg" @click="isShow1"></div>
      <img :src="data1" onerror="this.src='static/img/pic_addfengmian.png'" alt="" @click="isShow1"
           @load="bigLoad($event)">
    </div>
    <!--大图预览结束-->
  </div>
</template>
<script>
  import wx from 'weixin-js-sdk'
  import {InfiniteScroll, Indicator} from 'mint-ui';
  import {Toast} from 'mint-ui';
  import loadNo from '@/components/common/loadNo';
  import footer1 from '@/components/common/footer1';
  export default{
    data: function () {
      return {
        data: [],
        data1: '',
        isShow: 0,
        defaultIndex: 0,
        pageNO: 1,
        showD: false,
        isClick: true,
        nav: true,
        appId: '',
        nonceStr: '',
        timestamp: '',
        signature: '',
        phoneHeight: document.documentElement.clientHeight,
        width: 0,
        isLoadMore: true

      }
    },
    created(){
      document.title = '每日图赏';
      Indicator.open('加载中...');
      var self = this;
      this.global.shouquan();
      this.postData('post', '/shop-v1-picture_index.html', {page_id: this.pageNO}).then(res => {
        Indicator.close();
        if (res.data.state == 1) {
          self.data = res.data.list;
        }
      });
      this.postData('post', '/shop-v1-pay_jssign.html', {url: window.location.href}).then(res => {
        if (res.data.status == 1) {
          this.appId = res.data.sign.appId;
          this.nonceStr = res.data.sign.nonceStr;
          this.timestamp = res.data.sign.timestamp;
          this.signature = res.data.sign.signature;
          wx.config({
            debug: false,
            appId: this.appId,
            timestamp: this.timestamp,
            nonceStr: this.nonceStr,
            signature: this.signature,
            jsApiList: ['previewImage']
          });
        }
      });

    },
    methods: {
      gohome(){
        this.$router.push({path: '/'});
      },
      /**
       * sendPic:上推荐提示未开放
       * by he 2018/04/11
       */
      sendPic(){
        var that = this;
        Toast({
          message: '该功能正在开发中',
          duraction: 500
        });
//        return false;
        if (that.isClick) {
          this.postData('post', '/shop-v1-picture_point_num.html').then(res => {
            if (res.data.status == 1) {
              that.isClick = false;
            }
          });
        }


      },
      /**
       * collection:请求收藏接口 1为收藏 2为取消收藏
       * 动态改变收藏显示图片跟数量
       * by he 2018/04/09
       */
      collection: function (index, id, state, i) {
        this.postData('post', '/shop-v1-picture_collect.html', {id: id, state: state}).then(res => {
          if (res.data.status == 1) {
            state == 1 ? this.data[i].pic_list[index].is_collect = 1 : this.data[i].pic_list[index].is_collect = 0;
            state == 1 ? this.data[i].pic_list[index].count += 1 : this.data[i].pic_list[index].count -= 1;
          }
        });
      },
      /**
       * showImg:显示大图
       * by he 2018/04/09
       * @param index
       */
      showImg: function (imgBig) {
        if (imgBig !== '' || imgBig !== "undefined" || imgBig !== null) {
          this.data1 = imgBig;
          this.isShow = 1;
        }
        this.nav = false;
//        var img = new Image();
//        img.src = imgBig;
//        console.log(img.width);
      },
      bigLoad(event){
        if (this.phoneHeight < event.target.height) {
          $(event.target).attr({'class': 'customFall_bigimg2'});
        } else {
          $(event.target).attr({'class': 'customFall_bigimg1'});
        }
      },
      /**
       * isShow1:点击蒙层隐藏大图
       * by he 2018/04/09
       * @constructor
       */
      isShow1: function () {
        this.isShow = 0;
        this.nav = true;
      },
      /**
       * loadMore:下拉加载数据
       * by he 2018/04/10
       */
      loadMore: function () {
        if (this.isLoadMore) {
          this.pageNO += 1
          this.postData('post', '/shop-v1-picture_index.html', {page_id: this.pageNO}).then(res => {
            if (res.data.state == 1) {
              this.data = this.data.concat(res.data.list);
            } else {
              this.isLoadMore = false;
              this.showD = true;
            }
          });
        }

      },
//      showImg1(url){
//        var newA = [];
//        newA.push(url);
//        console.log(newA);
//        wx.previewImage({
//          current: url, // 当前显示图片的http链接
//          urls: newA, // 需要预览的图片http链接列表
//          success: function (res) {
//          },
//          error: function (res) {
//
//          }
//        });
//      }
    },
    components: {loadNo, footer1}
  }
</script>
<style scoped lang="less">
  .dailyRewards {
    font-size: 0.24rem;
    color: #333;
    .allList {
      height: calc(~"100vh - 0.92rem - 1px");
      overflow: scroll;
      -webkit-overflow-scrolling: touch;
      .dailyList-top {
        background-color: #fff;
        /*margin-bottom: 0.3rem;*/
        .dailyList {
          overflow: hidden;
          background-color: #fff;
          /*padding-bottom: 0.22rem;*/
          &-time {
            /*padding-top: 0.42rem;*/
            /*padding-bottom: 0.26rem;*/
            padding-bottom: 0.22rem;
            width: calc(~"100% - 0.6rem");
            margin: 0 auto;
            font-size: 0.34rem;
            font-weight: 500;
            .dailyList-timeT {
              font-size: 0.34rem;
              color: #333333;
              padding-top: 0.2rem;
              padding-bottom: 0.2rem;

            }
          }
          &-list {
            width: 6.92rem;
            /*height: 4.02rem;*/
            position: relative;
            margin-bottom: 0.3rem;
            img {
              width: 6.92rem;
              /*height: 4.02rem;*/
              border-radius: 0.06rem;
            }
            .dailyList-collection {
              position: absolute;
              right: 0rem;
              bottom: 0rem;
              img {
                width: 0.38rem;
                // height: 0.34rem;
                padding: 0.2rem 0.1rem 0.2rem 0.2rem;
              }
              span {
                display: inline-block;
                padding-right: 0.28rem;
                position: relative;
                bottom: 0.28rem;
                font-size: 0.24rem;
                color: white;
                text-shadow: 0 0.04rem 0.12rem rgba(0, 0, 0, 0.6);
              }
            }

          }
        }

      }
    }
    .dailyNav {
      height: 0.92rem;
      width: 100%;
      background-color: #fff;
      border-top: 1px solid #eee;
      position: fixed;
      z-index: 1;
      bottom: 0;
      &-home, &-send {
        display: inline-block;
        vertical-align: top;
        height: 0.32rem;
        margin-top: 0.31rem;
        img {
          height: 0.35rem;
          margin-right: 0.05rem;
        }
        span {
          display: inline-block;
          vertical-align: top;
          line-height: 0.35rem;
          font-size: 0.28rem;
        }
      }
      &-home {
        margin-left: 0.3rem;
      }
      &-send {
        float: right;
        margin-right: 0.3rem;
      }
    }
    .big_images {
      display: flex;
      flex-direction: row;
      justify-content: center;
      display: -webkit-flex;
      -webkit-flex-direction: row;
      -webkit-justify-content: center;
      width: 100%;
      .big_imagesBg {
        width: 100vh;
        height: 100vh;
        position: fixed;
        top: 0;
        bottom: 0;
        background-color: #000;
        z-index: 99;
      }
      img {

      }
      .customFall_bigimg1 {
        width: 100%;
        z-index: 3;
        position: fixed;
        /*top: 50%;*/
        left: 0;
        /*margin-top: -50vh;*/
        z-index: 100;
        margin-top: -70vh
      }
      .customFall_bigimg2 {
        display: inline-block;
        max-height: 100vh;
        margin-top: -50vh;
        width: auto;
        margin-top: -93vh;
        z-index: 99999;
        position: relative;
      }

    }
  }
</style>
