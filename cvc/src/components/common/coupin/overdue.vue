<template>
  <div class="overdue" v-infinite-scroll="loadMore3" infinite-scroll-disabled="false"
       infinite-scroll-immediate-check="false" infinite-scroll-distance="0">
    <div class="overdue-item" v-for="(item,index) in list3">
      <div class="overdue-item-one">
        <p>￥{{item.c_money}}</p>
        <p v-if="item.is_limit_use==1">满￥{{item.full_money}}可用</p>
        <p v-if="item.is_limit_use==2">无门槛使用</p>
      </div>
      <div class="overdue-item-two">
        <p>{{item.c_name}}</p>
        <p>指定商品可用</p>
        <p v-if="item.is_limit_time==1">{{item.start_time}}至{{item.end_time}}</p>
        <p v-if="item.is_limit_time==2">不限时间</p>
      </div>
      <div class="overdue-item-three">
        <img src="/static/img/home/Expired_seal@2x.png" alt="">
      </div>
    </div>
    <div v-if="isLoadMore3 == false"
         style="height: 1rem;line-height: 1rem;color: #ccc;font-size: 0.28rem;text-align: center">没有更多了~
    </div>
  </div>

</template>
<script>
  import {Indicator} from 'mint-ui';
  export default{
    data(){
      return {
        typeNO3: 3,
        pageNo3: 1,
        list3: [],
        isLoadMore3: true,
        isDisabled3: false
      }
    },
    created(){
      let that = this;
//      that.getList3(that.typeNO3, that.pageNo3);
    },
    methods: {
      /**
       * loadMore3:无限加载数据
       * by heqingqing 2018/08/24
       */
      loadMore3: function () {
        let that = this;
        if (that.isLoadMore3 == true) {
          that.getList3(that.typeNO3, that.pageNo3);
        }
      },
      /**
       * getList3:初始化获取列表数据
       * by heqingqing 2018/08/24
       * 参数:type page
       */
      getList3: function (type, page) {
        let that = this;
        Indicator.open('加载中...');
        if (type == '1') {
          that.list3 = [];
        }
        that.getData('post', '/shop-v2-coupon_get_list.html', {'type': type, 'page': page}).then(res => {
          if (res.status == 200) {
            Indicator.close();
            if (res.data.status == 1) {
              if (res.data.data != '') {
                that.pageNo3 += 1;
                that.list3 = that.list3.concat(res.data.data);
              } else {
                that.isLoadMore3 = false;
              }
            } else {
              console.log('暂无数据');
            }
          }
        })
      },
    }

  }

</script>
<style lang="less">
  .overdue {
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
        img {
          width: 1.46rem;
          position: absolute;
          right: -0.2rem;
          top: 50%;
          margin-top: -0.73rem;
        }
      }
    }
  }

</style>
