<template>
  <div class="received">
    <div class="received-content" v-infinite-scroll="loadMore2"
         infinite-scroll-immediate-check="false"
         infinite-scroll-disabled="loading2"
         infinite-scroll-distance="0" v-if="isShow==1">
      <div class="playtime" v-for="(item,index) in data2">
        <div class="content" @click="goDetails(item.compliment_type,item.lesson_id)">
          <div class="left">
            <img :src=item.pic alt="" onerror="this.src='/static/img/pic_addfengmian.png'">
          </div>
          <div class="right">
            <div class="title">购买时间：{{item.title}}</div>
            <div class="number2">
              <span class="present">￥{{item.total_fee}}</span>
            </div>
          </div>
        </div>
        <div class="bottom">
          <div class="tiem2">领取时间：{{item.receive_time}}</div>
        </div>
      </div>
      <loadNo v-show="loadNo2"></loadNo>
    </div>
    <div v-if="isShow==0">
      <div style="width: 100%;text-align: center;box-sizing: border-box;padding-top: 1rem">
        <i class="icon iconfont icon-wushuju" style="font-size: 2rem;color: #cccccc"></i>
      </div>
      <div style="width: 100%;text-align: center;color: #cccccc;font-size: 0.3rem">
        {{msg}}
      </div>
    </div>
  </div>
</template>
<script>
  import wx from 'weixin-js-sdk'
  import loadNo from '@/components/common/loadNo';
  import {InfiniteScroll} from 'mint-ui';
  export default{
    data(){
      return {
        data2: '',
        load2: true,
        pageNo2: 1,
        loadNo2: false,
        loading2: true,
        isShow: 0,
        msg: '暂无数据'
      }
    },
    created(){
//      this.getData2();

    },
    methods: {
      /**
       * getData2:获取初始化收到的赠礼的数据
       * by heqingqing 2018/05/09
       */
      getData2: function () {
        this.postData('post', '/shop-v1-user_get_receive.html', {page: this.pageNo2}).then(res => {
          if (res.status == 200) {
            if (res.data.length > 1) {
              this.data2 = res.data;
              this.isShow = 1;
            } else {
              this.isshow = 0;

            }
          }
        });
      },
      /**
       * loadMore2:无限加载收到赠礼的数据
       * by heqingqing 2018/05/09
       */
      loadMore2(){
        if (this.load2) {
          this.pageNo2++;
          this.postData('post', '/shop-v1-user_get_receive.html', {page: this.pageNo2}).then(res => {
            if (res.status == 200) {
              if (res.data == '') {
                this.load2 = false;
                this.loadNo2 = true;
              } else {
                this.data2 = this.data2.concat(res.data);
              }
            }
          });
        }
      },
      /**
       * goDetails:跳转详情页
       * by heqingqing 2018/05/14
       */
      goDetails(type, id){
        if (type == 'video') {//单品视频
          this.$router.push({path: '/details', query: {vid: id}});
        } else {//专栏课程
          this.$router.push({path: '/details', query: {ser_id: id}});
        }


      },
      ceshi(url){
        wx.previewImage({
          current: url, // 当前显示图片的http链接
          urls: [url], // 需要预览的图片http链接列表
          success: function (res) {
            console.log('1');
            console.log(res);
          },
          error: function (res) {
            console.log('2');
            console.log(res);
          }
        });

      }

    },
    components: {loadNo}
  }

</script>
<style lang="less">
  .received {
    &-content {
      height: calc(~"100vh - 0.92rem");
      overflow: scroll;
      -webkit-overflow-scrolling: touch;
    }
    .playtime {
      padding: 0 0.2rem;
      box-sizing: border-box;
      background-color: white;
      margin-top: 0.2rem;
      margin-bottom: 0.2rem;
      .content {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        display: -webkit-flex;
        -webkit-flex-direction: row;
        -webkit-justify-content: space-between;
        border-bottom: 1px solid #eee;
        .left {
          height: 2.08rem;
          img {
            width: 1.68rem;
            height: 1.68rem;
            padding: 0.2rem 0;
          }
        }
        .right {
          height: 2.08rem;
          position: relative;
          width: 100%;
          .title {
            font-size: 0.28rem;
            color: #333;
            padding-left: 0.2rem;
            padding-top: 0.4rem;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
          .number {
            width: 100%;
            font-size: 0.24rem;
            color: #999;
            text-align: right;
            position: absolute;
            bottom: 0.2rem;
          }
          .number2 {
            width: 100%;
            position: absolute;
            padding-left: 0.2rem;
            bottom: 0.1rem;
            .present {
              font-size: 0.26rem;
              color: #ef4949;
              display: inline-block;
            }
            .original {
              font-size: 0.26rem;
              color: #ccc;
              display: inline-block;
            }
          }

        }
      }
      .bottom {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        display: -webkit-flex;
        -webkit-flex-direction: row;
        -webkit-justify-content: space-between;
        padding: 0.2rem 0;
        .tiem {
          flex: 6;
          font-size: 0.24rem;
          color: #999;
        }
        .price {
          flex: 4;
          font-size: 0.26rem;
          color: #ef4949;
          text-align: right;
        }
        .tiem2 {
          font-size: 0.24rem;
          color: #999;
          text-align: right;
          flex: 1;
        }
      }
    }
  }
</style>
