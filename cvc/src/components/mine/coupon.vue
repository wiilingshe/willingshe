<template>
  <div class="coupin">
    <div class="coupin-null"></div>
    <div class="coupin-tab">
      <div :class="state==1?'select':null" @click="goState(1)">未使用
        <span class="line" v-show="state==1"></span>
      </div>
      <div :class="state==2?'select':null" @click="goState(2)">已使用
        <span class="line" v-show="state==2"></span>
      </div>
      <div :class="state==3?'select':null" @click="goState(3)">已过期
        <span class="line" v-show="state==3"></span>
      </div>
    </div>
    <div class="coupin-content">
      <notUser v-show="state==1"></notUser>
      <alreadyUsed v-show="state==2" ref="child2"></alreadyUsed>
      <overdue v-show="state==3" ref="child3"></overdue>
    </div>
    <div class="coupin-null"></div>
    <div class="coupin-bottom" @click="exchange">
      兑换优惠券
    </div>
    <!--优惠卷弹窗-->
    <exchange v-show="isExchange==1" v-on:childByValue="childByValue1"></exchange>
  </div>
</template>
<script>
  import notUser from '@/components/common/coupin/notUser';
  import alreadyUsed from '@/components/common/coupin/alreadyUsed';
  import overdue from '@/components/common/coupin/overdue';
  import exchange from '@/components/common/coupin/exchange';
  export default{
    data(){
      return {
        state: 1,
        isExchange: 0,//是否弹出优惠卷弹窗，默认不弹
      }
    },
    created(){


    },
    methods: {
      /**
       * goState:tab切换
       * by heqingqing 2018/08/21
       */
      goState: function (e) {
        let that = this;
        that.state = e;
        if (e == '2') {
          //调用子组件方法，参数：type、page;
          this.$refs.child2.getList2(2, 1);
        } else if (e == '3') {
          this.$refs.child3.getList3(3, 1);
        }
      },
      /**
       * exchange:兑换按钮,弹出兑换窗口
       * by heqingqing 2018/08/21
       */
      exchange: function () {
        let that = this;
        that.isExchange = 1;
      },
      /**
       * childByValue:获取子组件传过来的值,关闭优惠卷的弹窗
       * by heqingqing 2018/08/21
       */
      childByValue1: function (val, val2) {
        let that = this;
        that.isExchange = val;
        if (val2 == '1') {
          window.location.href = '';
        }
      }
    },
    components: {notUser, alreadyUsed, overdue, exchange},
  }
</script>
<style lang="less">
  .coupin {
    &-null {
      height: 0.9rem;
    }
    &-tab {
      width: 100%;
      overflow: hidden;
      background: #fff;
      position: fixed;
      top: 0;
      z-index: 99;
      .select {
        color: #222222;
      }
      div {
        font-size: 0.3rem;
        color: #888888;
        float: left;
        width: 33.33%;
        height: 0.9rem;
        text-align: center;
        line-height: 0.9rem;
        position: relative;
        .line {
          width: 0.6rem;
          height: 0.04rem;
          background-color: #222222;
          position: absolute;
          bottom: 0;
          left: calc(~"50% - 0.3rem");
          border-radius: 4rem;
        }
      }
    }
    &-bottom {
      width: 100%;
      height: 0.9rem;
      line-height: 0.9rem;
      color: white;
      background: #222222;
      text-align: center;
      font-size: 0.3rem;
      position: fixed;
      bottom: 0;
    }
  }

</style>
