<template>
  <div class="notUser" v-infinite-scroll="loadMore1" infinite-scroll-disabled="false"
       infinite-scroll-immediate-check="false" infinite-scroll-distance="0">
    <div class="notUser-item" v-for="(item,index) in list1">
      <div class="notUser-item-one">
        <p>￥{{item.c_money}}</p>
        <p v-if="item.is_limit_use==1">满￥{{item.full_money}}可用</p>
        <p v-if="item.is_limit_use==2">无门槛使用</p>
      </div>
      <div class="notUser-item-two">
        <p>{{item.c_name}}</p>
        <p>指定商品可用</p>
        <p v-if="item.is_limit_time==1">{{item.start_time}}至{{item.end_time}}</p>
        <p v-if="item.is_limit_time==2">不限时间</p>
      </div>
      <div class="notUser-item-three">
        <p @click="goUse(index)">去使用</p>
      </div>
    </div>
    <div v-if="isLoadMore1 == false"
         style="height: 1rem;line-height: 1rem;color: #ccc;font-size: 0.28rem;text-align: center">没有更多了~
    </div>
  </div>
</template>
<script>
  import {Indicator} from 'mint-ui';
  export default{
    data(){
      return {
        typeNO1: 1,
        pageNo1: 1,
        list1: [],
        isLoadMore1: true,
        isDisabled1: false

      }
    },
    created(){
      this.global.shouquan();
      var that = this;
      that.getList1(that.typeNO1, that.pageNo1);

    },
    methods: {
      /**
       * loadMore1:无限加载数据
       * by heqingqing 2018/08/24
       */
      loadMore1: function () {
        let that = this;
        if (that.isLoadMore1 == true) {
          that.getList1(that.typeNO1, that.pageNo1);
        }

      },
      /**
       * getList1:初始化获取列表数据
       * by heqingqing 2018/08/24
       * 参数:type page
       */
      getList1: function (type, page) {
        let that = this;
        Indicator.open('加载中...');
        that.getData('post', '/shop-v2-coupon_get_list.html', {'type': type, 'page': page}).then(res => {
          if (res.status == 200) {
            Indicator.close();
            if (res.data.status == 1) {
              if (res.data.data != '') {
                that.pageNo1 += 1;
                that.list1 = that.list1.concat(res.data.data);
              } else {
                that.isLoadMore1 = false;
              }
            } else {
              console.log('暂无数据');
            }
          }
        })
      },
      /**
       * goUse:使用按钮
       * by heqingqing 2018/08/24
       * 1.多种混合的优惠，点击进入首页
       * 2.若一个优惠券只使用一个专栏、学院、活动，则直接进入该商品购买页面
       */
      goUse: function (index) {
        let that = this;
        let currentItem = that.list1[index];
        //混合状态，跳到首页
        if ((currentItem.college_num > 0 && currentItem.series_num > 0 && currentItem.line_num > 0) || (currentItem.college_num > 0 && currentItem.series_num > 0) || (currentItem.series_num > 0 && currentItem.line_num > 0) || (currentItem.college_num > 0 && currentItem.line_num > 0)) {
          this.$router.push({path: '/'});//跳到首页
        } else if (currentItem.college_num > '0' && currentItem.series_num == '0' && currentItem.line_num == '0') {
          this.$router.push({path: '/collegeHome', query: {root_id: 'Aw'}});//跳到学院
        } else if (currentItem.college_num == '0' && currentItem.series_num == '1' && currentItem.line_num == '0') {
          console.log('跳到专栏')
        } else if (currentItem.college_num == '0' && currentItem.series_num == '0' && currentItem.line_num == '1') {
          this.$router.push({path: '/activity', query: {root_id: 'Aw'}});//跳到线下活动
        } else {
          console.log('状态错误');
        }
      }
    }

  }

</script>
<style lang="less">
  .notUser {
    padding: 0 0.3rem;
    height: calc(~"100vh - 1.8rem");
    overflow-y: scroll;
    &-item {
      background: url('/static/img/home/coupon_bg2@2x.png');
      width: 100%;
      height: 1.76rem;
      background-size: 100% 100%;
      margin-top: 0.3rem;
      overflow: hidden;
      &-one {
        float: left;
        width: 31%;
        p:nth-child(1) {
          color: #EF5D38;
          font-size: 0.38rem;
          text-align: center;
          margin-top: 0.5rem;
        }
        p:nth-child(2) {
          color: #666666;
          font-size: 0.24rem;
          text-align: center;
          margin-top: 0.05rem;
        }
      }
      &-two {
        float: left;
        width: 45%;
        p:nth-child(1) {
          color: #222222;
          font-size: 0.3rem;
          margin-top: 0.36rem;
          text-align: left;
        }
        p:nth-child(2) {
          color: #666666;
          font-size: 0.24rem;
          text-align: left;
          margin: 0.05rem 0;
        }
        p:nth-child(3) {
          color: #666666;
          font-size: 0.24rem;
          text-align: left;
        }
      }
      &-three {
        float: left;
        width: 24%;
        height: 100%;
        position: relative;
        p {
          width: 1.1rem;
          height: 0.5rem;
          background-color: #EF5D38;
          border-radius: 0.26rem;
          text-align: center;
          color: white;
          font-size: 0.28rem;
          line-height: 0.5rem;
          position: absolute;
          left: 50%;
          top: 50%;
          margin-top: -0.25rem;
          margin-left: -0.55rem;
        }
      }
    }
  }

</style>
