<template>
  <div class="exchange">
    <div class="exchange-bg" @click="closeExchange"></div>
    <div class="exchange-comtent">
      <div class="exchange-comtent-title">
        <div>兑换优惠券</div>
        <div @click="closeExchange">X</div>
      </div>
      <div class="exchange-comtent-input">
        <input type="text" v-model="c_code" placeholder="请输入优惠码"/>
      </div>
      <div class="exchange-comtent-btn" @click="goCode">
        立即兑换
      </div>
    </div>
  </div>
</template>
<script>
  import {Indicator, Toast} from 'mint-ui';
  export default{
    data(){
      return {
        c_code: '',
      }
    },
    created(){

    },
    methods: {
      /**
       * closeExchange:关闭优惠卷弹窗
       * by heqingqing 2018/08/21
       */
      closeExchange: function () {
        let that = this;
        that.$emit('childByValue', 0);
      },
      /**
       * goCode:兑换优惠卷
       * by heqingqing 2018/08/24
       * 参数:c_code（优惠码）
       */
      goCode: function () {
        let that = this;
        that.getData('post', '/shop-v2-coupon_exchange.html', {'c_code': that.c_code}).then(res => {
          if (res.status == 200) {
            Toast({
              message: res.data.msg
            });
            if (res.data.status == '1') {
              setTimeout(function () {
                that.$emit('childByValue', 0, 1);
              }, 1000);
            } else {
              setTimeout(function () {
                that.$emit('childByValue', 0, 0);
              }, 1000);
            }

          }
        })
      }
    }
  }

</script>
<style lang="less">
  .exchange {
    &-bg {
      width: 100vh;
      height: 100vh;
      background-color: rgba(0, 0, 0, 0.7);
      position: fixed;
      left: 0;
      top: 0;
      z-index: 200;
    }
    &-comtent {
      width: 6rem;
      height: 3.8rem;
      background-color: #F5F5F5;
      position: fixed;
      top: 50%;
      left: 50%;
      margin-top: -1.9rem;
      margin-left: -3rem;
      border-radius: 0.06rem;
      z-index: 201;
      box-sizing: border-box;
      &-title {
        position: relative;
        padding: 0.4rem 0;
        div:nth-child(1) {
          font-size: 0.38rem;
          color: #222222;
          width: 100%;
          text-align: center;
        }
        div:nth-child(2) {
          position: absolute;
          right: 0.3rem;
          font-size: 0.38rem;
          color: #CCCCCC;
          top: 0.42rem;
        }

      }
      &-input {
        input {
          border: none;
          width: 5.4rem;
          height: 0.9rem;
          margin-left: 0.3rem;
          color: #CCCCCC;
          padding: 0 0.2rem;
          box-sizing: border-box;
        }
        ::-webkit-input-placeholder {
          color: #CCCCCC;
        }

      }
      &-btn {
        width: 5.4rem;
        height: 0.9rem;
        margin-left: 0.3rem;
        background-color: #222222;
        border-radius: 0.06rem;
        font-size: 0.3rem;
        line-height: 0.9rem;
        text-align: center;
        color: white;
        margin-top: 0.35rem;
      }
    }
  }

</style>
