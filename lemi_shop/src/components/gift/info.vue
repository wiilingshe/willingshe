<template>
  <div class="infoBox">
    <div class="infoBox-content" v-infinite-scroll="loadMore"
         infinite-scroll-immediate-check="false"
         infinite-scroll-disabled="loading1"
         infinite-scroll-distance="0" v-if="isShow==1">
      <div class="playtime" v-for="(item,index) in data1">
        <div class="content" @click="goGive(item.compliment_type,item.lesson_id,item.order_no,item.member_id)">
          <div class="left">
            <img :src=item.pic alt="" onerror="this.src='/static/img/pic_addfengmian.png'">
          </div>
          <div class="right">
            <div class="title">{{item.title}}</div>
            <div class="number">数量：{{item.total_num}}份</div>
          </div>
        </div>
        <div class="bottom">
          <div class="tiem">购买时间：{{item.create_time}}</div>
          <div class="price">实付：￥{{item.total_fee}}</div>
        </div>
      </div>
      <loadNo v-show="loadNo1"></loadNo>
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
  import loadNo from '@/components/common/loadNo';
  import {InfiniteScroll} from 'mint-ui';
  export default{
    data(){
      return {
        pageNo: 1,
        data1: '',
        load1: true,
        loadNo1: false,
        loading1: false,
        isShow: 1,
        msg: '暂无数据'
      }
    },
    created(){
      this.getData1();
    },
    methods: {
      /**
       * getData1:获取初始化我的赠礼的数据
       * by heqingqing 2018/05/09
       */
      getData1: function () {
        this.postData('post', '/shop-v1-user_get_compliment.html', {page: this.pageNo}).then(res => {
          if (res.status == 200) {
            if (res.data.length > 1) {
              this.data1 = res.data;
              this.isShow = 1;
            } else {
              this.isshow = 0;

            }

          }
        });
      },
      /**
       * loadMore:无限加载我的赠礼列表数据
       * by heqingqing 2018/05/09
       */
      loadMore(){
        if (this.load1) {
          this.pageNo++;
          this.postData('post', '/shop-v1-user_get_compliment.html', {page: this.pageNo}).then(res => {
            if (res.status == 200) {
              if (res.data == '') {
                this.load1 = false;
                this.loadNo1 = true;
              } else {
                this.data1 = this.data1.concat(res.data);
              }
            }
          });
        }
      },
      goGive(compliment_type, lesson_id, order_no, member_id){
        if (compliment_type == "series") { //专栏课程
          this.$router.push({
            path: '/mine-give',
            query: {'order_no': order_no, 'member_id': member_id, 'type': compliment_type, 'ser_id': lesson_id}
          });

        } else { //单品视频
          this.$router.push({
            path: '/mine-give',
            query: {'order_no': order_no, 'member_id': member_id, 'type': compliment_type, 'vid': lesson_id}
          });
        }

      }
    },
    components: {loadNo}
  }

</script>
<style lang="less">
  .infoBox {
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
