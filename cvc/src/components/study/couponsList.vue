<template>
  <div class="couponsList" v-if="isCouponsList">
    <div class="couponsList-title">可用优惠券</div>
    <div class="couponsList-content" v-infinite-scroll="loadMore" infinite-scroll-disabled="false"
         infinite-scroll-immediate-check="false" infinite-scroll-distance="0">
      <div class="couponsList-content-item" v-for="(item,index) in list" @click="goPayCoupon(item.mc_id,item.c_money)">
        <div class="couponsList-content-item-left">
          <p>￥{{item.c_money}}</p>
          <p v-if="item.is_limit_use==1">满￥{{item.full_money}}可用</p>
          <p v-if="item.is_limit_use==2">无门槛使用</p>
        </div>
        <div class="couponsList-content-item-right">
          <p>{{item.c_name}}</p>
          <p>指定商品可用</p>
          <p v-if="item.is_limit_time==1">{{item.start_time}}至{{item.end_time}}</p>
          <p v-if="item.is_limit_time==2">不限时间</p>
        </div>
      </div>
    </div>
    <div class="couponsList-btn" @click="goPayCoupon('0','0')">
      不使用优惠券
    </div>
  </div>
</template>
<script>
  import {Indicator} from 'mint-ui';
  export default{
    props: {
      isCouponsList: Boolean
    },
    data(){
      return {
        list: [],
      }
    },
    created(){

    },
    methods: {
      /**
       * loadMore:无限加载数据
       * by heqingqing 2018/08/28
       */
      loadMore: function () {
        let that = this;
      },
      /**
       * getData2:初始化加载数据
       * by heqingqing 2018/08/28
       * 参数：relation_id，price，type，page
       */
      getData2: function (relation_id, price, type, page) {
        let that = this;
        that.getData('post', '/shop-v2-coupon_get_pay_coupon_list.html', {
          'relation_id': relation_id,
          'price': price,
          'type': type,
          'page': page
        }).then(res => {
          if (res.data.status == 1) {
            that.list = res.data.list;
          }
        })
      },
      /**
       * goPayCoupon:选择优惠券，弹出支付层
       * by heqingqing 2018/08/28
       * 参数：传回mc_id,c_money
       */
      goPayCoupon: function (mc_id, c_money) {
        if (mc_id == 0) {
          this.$emit('coupon2', mc_id, c_money, true, false, 3);
        } else {
          this.$emit('coupon2', mc_id, c_money, true, false, 1);
        }

      }

    }

  }


</script>
<style lang="less">
  .couponsList {
    width: 100%;
    height: 7.1rem;
    background-color: #F5F5F5;
    position: fixed;
    bottom: 0;
    border-top-left-radius: 0.1rem;
    border-top-right-radius: 0.1rem;
    &-title {
      color: #333333;
      font-size: 0.38rem;
      height: 1.16rem;
      line-height: 1.16rem;
      padding-left: 0.32rem;
      font-weight: 900;
    }
    &-content {
      height: 4.72rem;
      overflow-y: scroll;
      &-item {
        width: 6.9rem;
        height: 1.76rem;
        background: url('/static/img/home/coupon_bg1@2x.png');
        background-size: 100% 100%;
        margin: 0 auto 0.3rem;
        overflow: hidden;
        &-left {
          width: 34%;
          height: 100%;
          text-align: center;
          float: left;
          p:nth-child(1) {
            color: #EF5D38;
            font-size: 0.38rem;
            margin-top: 0.5rem;
          }
          p:nth-child(2) {
            color: #666666;
            font-size: 0.24rem;
          }
        }
        &-right {
          width: 66%;
          height: 100%;
          text-align: center;
          float: right;
          p:nth-child(1) {
            font-size: 0.3rem;
            color: #222222;
            margin-top: 0.36rem;
          }
          p:nth-child(2) {
            font-size: 0.24rem;
            color: #666666;
            margin-top: 0.1rem;
          }
          p:nth-child(3) {
            font-size: 0.24rem;
            color: #666666;
          }
        }
      }
    }
    &-btn {
      width: 6.9rem;
      height: 0.9rem;
      line-height: 0.9rem;
      text-align: center;
      color: white;
      background-color: #222222;
      font-size: 0.3rem;
      margin: 0.15rem auto;
    }
  }
</style>
