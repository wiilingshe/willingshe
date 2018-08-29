<template>
  <div id="goodsrelation">

    <transition name="move">
      <div class="relation_box" v-if="$store.state.count">
        <div class="relation_title">
          关联推荐
        </div>
        <div class="relation_content">
          <div class="relation_item" v-for="(item,index) in goodsObj">
            <div class="relation_item_pic">
              <img :src="item.pic" alt="" onerror="this.src='/static/img/pic_addfengmian.png'"/>
            </div>
            <div class="relation_item_right">
              <div class="relation_item_title">{{item.goods_name}}</div>
              <div class="relation_item_price">
                <div>￥{{item.shop_price}}</div>
                <div @click=purchase(item.goods_id) :goods_id="item.goods_id">立即购买</div>
              </div>
            </div>
          </div>

          <div class="relation_more">
            <span>没有更多了~</span>
          </div>

        </div>
        <div class="relation_btn" @click="relationBtn()">
          <i class="iconfont icon-next-page"></i>
        </div>

      </div>
    </transition>
    <div class="relation_bg" v-if="$store.state.count"></div>

  </div>
</template>
<script>
  import store from '@/vuex/store'
  export default{
    props: {
      goodsObj: Array,
      isShow: Number,
      showId: String
    },
    data(){
      return {
//        isShosGoods: 0,
      }
    },

    created(){
//      this.isShosGoods = this.isShow;
//      console.log(this.isShosGoods);
    },
    methods: {
      relationBtn(){//收起关联
//        this.isShow = 0;
//        this.isShosGoods = 0;
        this.$store.state.count = 0;
      },
      purchase(goods_id){//立即购买跳转详情页

        if (window.location.href.indexOf('vid') != -1) {
          this.$router.push({
            path: '/goodDetails',
            query: {'vid': this.$route.query.vid, 'type': '1', 'shop_id': this.showId, 'goods_id': goods_id}
          })
        } else if (window.location.href.indexOf('ser_id') != -1) {
          this.$router.push({
            path: '/goodDetails',
            query: {'ser_id': this.$route.query.ser_id, 'type': '2', 'shop_id': this.showId, 'goods_id': goods_id}
          })
        } else {
          this.$router.push({
            path: '/goodDetails',
            query: {'r_id': this.$route.query.ser_id, 'type': '3', 'shop_id': this.showId, 'goods_id': goods_id}
          })
        }

      }
    },
    store
  }
</script>
<style rel="stylesheet/scss" lang="less">

  #goodsrelation {
    .relation_bg {
      width: 100%;
      height: 100%;
      position: fixed;
      top: 0;
      right: 0;
      background-color: rgba(0, 0, 0, 0.6);
    }

    .relation_box {
      position: fixed;
      right: 0;
      top: 0;
      width: 80%;
      height: 100%;
      background-color: white;
      z-index: 2;
    }

    .relation_title {
      height: 0.8rem;
      line-height: 0.8rem;
      padding-left: 0.2rem;
      font-size: 0.3rem;
      color: #333333;
    }

    .relation_content {
      padding: 0 0.15rem;
      height: 100%;
      overflow: scroll;
      -webkit-overflow-scrolling: touch;
    }

    .relation_item {
      background-color: #f2f2f2;
      margin: 0.15rem 0;
    }

    .relation_item:after {
      display: block;
      content: '';
      clear: both;
    }

    .relation_item_pic {
      float: left;
      width: 30%;
      padding: 0.15rem;
    }

    .relation_item_right {
      float: right;
      width: 63%;
      padding: 0.15rem 0;
      height: 1.5rem;
      position: relative;
    }

    .relation_item_title {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      color: #333333;
      font-size: 0.26rem;
      /*height: 0.75rem;*/
    }

    .relation_item_price {
      height: 0.75rem;
      position: absolute;
      bottom: 0;
      width: 100%;
      line-height: 0.75rem;
      /*position: relative;*/
    }

    .relation_item_price:after {
      display: block;
      content: "";
      clear: both;
    }

    .relation_item_price > div:first-child {
      font-size: 0.26rem;
      color: #fe5875;
      float: left;
    }

    .relation_item_price > div:last-child {
      width: 1.4rem;
      height: 0.5rem;
      line-height: 0.5rem;
      text-align: center;
      background-color: #fe5875;
      font-size: 0.25rem;
      color: white;
      border-radius: 0.3rem;
      float: right;
      margin-right: 0.2rem;

    }

    .relation_item_pic > img {
      width: 1.5rem;
      height: 1.5rem;
    }

    .relation_more {
      width: 100%;
      text-align: center;
      font-size: 0.24rem;
      color: #cccccc;
      height: 1.4rem;
    }

    .relation_btn {
      position: absolute;
      width: 10%;
      height: 1.2rem;
      left: -10%;
      top: 50%;
      line-height: 1.2rem;
      border-top-left-radius: 0.15rem;
      border-bottom-left-radius: 0.15rem;
      background-color: white;
    }

    .relation_btn > .iconfont {
      font-size: 0.5rem;
      color: #cccccc;
    }

    .move-enter-active, .move-leave-active {
      transition: all 0.6s cubic-bezier(0, 0, 1, 1);
      transform: translateX(-1%);
    }

    .move-enter, .move-leave-to {
      transition: all 0.6s cubic-bezier(0, 0, 1, 1);
      transform: translateX(100%);
      -moz-transform: translateX(100%);
      -ms-transform: translateX(100%);
      -o-transform: translateX(100%);
      -webkit-transform: translateX(100%);
    }

  }

</style>
