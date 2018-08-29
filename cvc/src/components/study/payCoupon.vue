<template>
  <div class="payCoupon" v-if="isPayCoupon">
    <div class="payCoupon-title">
      {{data.good_name}}
    </div>
    <div class="payCoupon-price">
      <span class="payCoupon-price-title">支付总额</span>
      <span class="payCoupon-price-toal"
            style="color: #222222;font-size: 0.28rem;font-weight: 900">{{data.goods_price}}</span>
    </div>
    <div class="payCoupon-payType">
      <span class="payCoupon-payType-title">选择优惠券</span>
      <span class="payCoupon-payType-selectCoupon1" @click="goCouponsList" v-if="couponState==1">已抵扣￥{{c_money}}
        <img src="/static/img/home/more@2x.png" alt="">
      </span>
      <span class="payCoupon-payType-selectCoupon2" v-if="couponState==2">没有可用优惠券
        <img src="/static/img/home/more@2x.png" alt="">
      </span>
      <span class="payCoupon-payType-selectCoupon1" v-if="couponState==3" @click="goCouponsList">不使用优惠券
        <img src="/static/img/home/more@2x.png" alt="">
      </span>
    </div>
    <div class="payCoupon-payType">
      <span class="payCoupon-payType-title" style="margin-right: 0.3rem;">微信支付</span>
      <span class="payCoupon-price-toal"
            style="color: #222222;font-size: 0.28rem;font-weight: 900">{{reversedMessage}}</span>
      <span class="payCoupon-payType-select" :class="{selected:paytype==2}">
				<i class="icon iconfont icon-gou"></i>
				<input type="radio" v-model="paytype" :value="2">
			</span>
    </div>
    <div class="payCoupon-payBtn" @click="comfirm">
      确定支付
    </div>
  </div>

</template>
<script>
  import wx from 'weixin-js-sdk'
  export default{
    props: {
      isPayCoupon: Boolean,
      c_money: [String, Number],
      mc_id: String,
      couponState: Number,
      marketing_type: [String, Number],//购买类型
      term_id: [String, Number],//关联ID
      ctgr_id: [String, Number],//如果为参团则多ctgr_id
      group_type: [String, Number] //参团type
    },
    data(){
      return {
        paytype: 2,
        data: {},
        finalPrice: "",//最后的价格
      }
    },
    created(){
    },
    mounted(){

    },
    methods: {
      /**
       * comfirm:确认支付(参团的需要传多ctgr_id)
       * by hqq 2018/08/28
       */
      comfirm: function () {
        var that = this;
        if (that.group_type == 0) {//不是参团进来的
          this.getData('post', '/shop-v1-pay_order.html', {
            type: 11,
            term_id: that.term_id,
            marketing_type: that.marketing_type,
            mc_id: that.mc_id
          }).then(res => {
            var info = res.data
            this.pay1(info, that.marketing_type);
          })
        } else {//是参团进来的
          this.getData('post', '/shop-v1-pay_order.html', {
            type: 11,
            term_id: that.term_id,
            marketing_type: that.marketing_type,
            ctgr_id: that.ctgr_id,
            mc_id: that.mc_id
          }).then(res => {
            var info = res.data
            this.pay1(info, that.group_type);
          })
        }

      },
      /**
       * goCouponsList:弹出可用优惠券的列表,关闭自己
       * by hqq 2018/08/28
       */
      goCouponsList: function () {
        let that = this;
        that.$emit('coupon1', false, true, that.data.goods_price);
      },
      /**
       * getData1:获取初始化数据
       * by hqq 2018/08/28
       * 参数：relation_id(关联ID)  marketing_type type
       */
      getData1: function (type) {
        let that = this;
//        that.marketing_type = marketing_type;
//        that.term_id = relation_id;
        that.getData('post', '/shop-v2-coupon_get_pay_info.html', {
          'relation_id': that.term_id,
          'marketing_type': type,
          'type': 11
        }).then(res => {
          if (res.data.status == 1) {
            that.data = res.data;
            //为空则没有可使用的优惠券
            if (res.data.coupon == '') {
              that.$emit('coupon1', true, false, res.data.goods_price, res.data.coupon.c_money, res.data.coupon.mc_id, 2);
            } else {
              //否则为有抵扣
              that.$emit('coupon1', true, false, res.data.goods_price, res.data.coupon.c_money, res.data.coupon.mc_id, 1);
            }
          }
        })
      },
      /**
       * accSub:js计算精确判断
       * by hqq 2018/08/29
       * return 计算好的结果
       */
      accSub(arg1, arg2){
        var r1, r2, m, n;
        try {
          r1 = arg1.toString().split(".")[1].length
        } catch (e) {
          r1 = 0
        }
        try {
          r2 = arg2.toString().split(".")[1].length
        } catch (e) {
          r2 = 0
        }
        m = Math.pow(10, Math.max(r1, r2));
        n = (r1 >= r2) ? r1 : r2;
        return ((arg2 * m - arg1 * m) / m).toFixed(n);
      }
    },
    computed: {
      /**
       * reversedMessage:计算最终支付的价格
       * by heqingqing 2018/08/28
       */
      reversedMessage: function () {
        let that = this;
        return that.accSub(that.c_money, that.data.goods_price);
      }
    }
  }
</script>
<style lang="less">
  .payCoupon {
    font-size: 0.24rem;
    color: #333;
    width: 100%;
    background-color: #fff;
    position: fixed;
    z-index: 1;
    bottom: 0;
    border-top-left-radius: 0.1rem;
    border-top-right-radius: 0.1rem;
    padding-bottom: 0.3rem;
    background-color: #fcfcfc;
    &-title {
      font-size: 0.38rem;
      color: #333;
      width: calc(~"100% - 0.6rem");
      margin: 0 auto;
      padding: 0.4rem 0;
      border-bottom: 1px solid #eee;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      font-weight: bold;
    }
    &-price {
      font-size: 0.28rem;
      width: calc(~"100% - 0.6rem");
      margin: 0 auto;
      padding: 0.4rem 0;
      border-bottom: 1px solid #eee;
      &-title {
        color: #222;
        margin-right: 0.3rem;
      }
      &-price1 {
        font-weight: bold;
        margin-right: 0.3rem;
      }
      &-sale {
        color: #666;
        text-decoration: line-through;
      }
    }
    &-payType {
      width: calc(~"100% - 0.6rem");
      margin: 0 auto;
      font-size: 0.28rem;
      padding: 0.4rem 0;
      border-bottom: 1px solid #eee;
      &-title {

      }
      &-selectCoupon1 {
        float: right;
        color: #EF4949;
        font-size: 0.28rem;
        img {
          width: 0.14rem;
          height: 0.24rem;
        }
      }
      &-selectCoupon2 {
        float: right;
        color: #999999;
        font-size: 0.28rem;
        img {
          width: 0.14rem;
          height: 0.24rem;
        }
      }
      &-price {
        font-weight: bold;
        margin-left: 0.3rem;
      }
      &-role {
        font-size: 0.24rem;
        color: #EF4949;
        border: 1px solid #EF4949;
        padding: 0.04rem 0.1rem;
        margin-left: 0.3rem;
        border-radius: 0.06rem;
      }
      &-select {
        display: inline-block;
        vertical-align: top;
        float: right;
        width: 0.4rem;
        height: 0.4rem;
        border: 1px solid #222;
        border-radius: 50%;
        position: relative;
        input {
          position: absolute;
          top: -0.05rem;
          width: 0.5rem;
          height: 0.5rem;
          left: -0.05rem;
          opacity: 0;
        }
        i {
          color: #fff;
          height: 0.3rem;
          width: 0.3rem;
          margin-left: 0.05rem;
          margin-top: 0.05rem;
          display: inline-block;
          font-size: 0.32rem;
        }
        @media screen and (min-width: 414px) {
          i {
            margin-top: 0.03rem;
          }
        }
      }
      .selected {
        background-color: #222;
      }
    }
    &-payBtn {
      width: calc(~"100% - 0.6rem");
      margin: 0 auto;
      height: 0.92rem;
      background-color: #222;
      border-radius: 1px;
      color: #fff;
      font-size: 0.3rem;
      text-align: center;
      line-height: 0.92rem;
      overflow: hidden;
      margin-top: 0.05rem;
      border-radius: 0.06rem;
    }
  }
</style>
