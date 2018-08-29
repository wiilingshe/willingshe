<template>
  <div class="give_box" v-if="isShow">
    <div class="give_one" v-if="surplus>0 && cry==0">剩余<span>{{surplus}}</span>份赠礼</div>
    <div class="give_one" v-if="!surplus>0 && cry==0">礼物已派发完毕</div>
    <div class="main" v-if="cry==0">
      <div class="main_give">
        <p><i class="icon iconfont icon-liwu1"></i>赠礼</p>
      </div>
      <div class="main_title" @click="goPage">
        <img class="main_left" :src="info.pic" onerror="this.src=&quot;/static/img/pic_addfengmian.png&quot;">
        <div class="main_right">
          <p class="main_title2">{{info.title}}</p>
          <div class="main_price">
            <!--总价除以份数-->
            <span style="padding-right: 0.1rem">￥{{old_fee}}</span>
            <span class="num">x{{info.numbers}}</span>
          </div>
        </div>
      </div>
      <div class="main_time">
        <span>购买时间&nbsp:&nbsp{{info.create_time}}</span><span class="tprice">实付:￥{{info.total_fee}}</span>
      </div>
    </div>
    <div class="instructions" v-if="cry==0">
      <div class="title">礼物赠送说明</div>
      <div class="text">点击右上角 "..." ,选择发送给好友，好友点击即可领取</div>
    </div>
    <div class="give_details" v-if="cry==0">
      <div class="details">
        <span class="line">&nbsp</span><span class="title">领取详情</span><span class="line">&nbsp</span>
      </div>
      <div class="receive_null" v-if="!receive.length">
        哇喔~ 暂无好友领取过
      </div>
      <div class="receive" v-for="i in receive" v-if="receive.length">
        <img :src="i.face" onerror="this.src=&quot;/static/img/pic_addfengmian.png&quot;">
        <span>{{ i.nickname }}</span>
        <span>{{ i.receive_time}}</span>
      </div>
    </div>
    <div v-if="cry==1">
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
  import {Indicator} from 'mint-ui';
  export default {
    data(){
      return {
//				gives:false,
        receive: [],//已领取人列表数据
        info: '',  //视频/课程数据信息
        tipLoad: true,
        name: '',
        portrait: '',
        title: '',
        actualPrice: 0,
        surplus: 0,
        old_fee: 0, //总价除份数
        isShow: false,
        pic: '',
        cry: 0,
        msg: ''
      }
    },
    beforeCreate(){

    },
    created(){
      document.title = '赠送';
      Indicator.open();
      this.global.shouquan();
      this.postData('post', '/shop-v1-order_get_receive_lesson.html', {
        'order_no': this.$route.query.order_no,
        'member_id': this.$route.query.member_id,
        'type': this.$route.query.type
      }).then(res => {
        Indicator.close();
        this.isShow = true;
        if (res.data.orderData.pic) {
          this.pic = res.data.orderData.pic;
        }
        if (res.data.status == 1 || res.data.status == 2) { //赠送人进入,1已经有人领取,2则说明没人领取
          this.surplus = res.data.orderData.surplus;
          if (res.data.data) {
            this.receive = res.data.data;
          } else {
            this.receive = 0;
          }
          this.info = res.data.orderData;
          this.old_fee = Number(res.data.orderData.total_fee) / Number(res.data.orderData.numbers);
        } else if (res.data.status == 0) { //领取人进入,0还能领取，跳转到领取页面
          if (this.$route.query.type == 'video') {
            this.$router.push({
              path: '/mine-receive',
              query: {
                'order_no': this.$route.query.order_no,
                'member_id': this.$route.query.member_id,
                'type': this.$route.query.type,
                'vid': this.$route.query.vid
              }
            });
          } else {
            this.$router.push({
              path: '/mine-receive',
              query: {
                'order_no': this.$route.query.order_no,
                'member_id': this.$route.query.member_id,
                'type': this.$route.query.type,
                'ser_id': this.$route.query.ser_id
              }
            });
          }

        } else if (res.data.status == 3) { //领取人进入,3已结领取完，显示所有人领取人信息
          if (res.data.data) {
            this.receive = res.data.data;
          } else {
            this.receive = 0;
          }
          this.info = res.data.orderData;
          this.old_fee = Number(res.data.orderData.total_fee) / Number(res.data.orderData.numbers);
        } else if (res.data.status == 4) { //课程不存在
          this.cry = 1;
          this.msg = res.data.msg;
        }
      });


    },
    methods: {
      giveNext(){
//              this.gives=true;
      },
      /**
       * goPage:跳转回课程
       * by heqingqing 2018/05/22
       */
      goPage(){
        if (this.$route.query.type == 'video') {
          this.$router.push({path: '/details', query: {'vid': this.$route.query.vid}});
        } else if (this.$route.query.type = 'series') {
          this.$router.push({path: '/details', query: {'ser_id': this.$route.query.ser_id}});
        }
      }
    },
    mounted(){
      var self = this;
      //获取标题
      this.getData('get', '/shop-v1-index_basemsg.html').then(res => {
        if (res.status == 200) {
          this.title = res.data.title;
          var title = res.data.title;
          //			获取头像信息
          this.getData('get', '/shop-v1-user_base_info.html').then(res => {
            if (res.status == 200) {
              this.name = res.data.data.nickname;
              this.portrait = res.data.data.face;
              self.share(res.data.data.nickname + '赠送了一个课程给你，快去看看吧', '来自' + title + '的课程', self.pic);
            }
          });
        }
      });
    }
  }

</script>

<style scoped lang="less">
  .give_box {
    height: 100%;
    .give_one {
      padding: 0.5rem 0;
      font-size: 0.38rem;
      color: #fe5875;
      text-align: center;
      line-height: 1;
    }
    .main {
      width: 86%;
      margin: 0 auto;
      font-size: 0.26rem;
      overflow: hidden;
      border: 1px solid #dddddd;
      border-radius: 0.1rem;
      &_give {
        height: 0.8rem;
        background: #ffb403;
        color: #ffffff;
        line-height: 0.8rem;
        p {
          width: 100%;
          font-size: 0.3rem;
          text-align: center;
          .icon-liwu1 {
            font-size: 0.3rem;
            padding-right: 0.1rem;
          }
        }
      }
      &_title {
        display: flex;
        /*width: 100%;*/
        height: 1.68rem;
        padding: 0.3rem 0;
        border-bottom: 1px solid #CCCCCC;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        background-color: #ffffff;
      }
      &_title2 {
        max-width: 100%;
        white-space: nowrap;
        text-overflow: ellipsis;
        -o-text-overflow: ellipsis;
        overflow: hidden;
        font-size: 0.28rem;
      }
      &_left {
        flex: 0 0 1.68rem;
        width: 1.68rem;
        height: 1.68rem;
        padding: 0 0.2rem;
      }
      &_right {
        display: flex;
        flex: 0 0 50vw;
        width: 50vw;
        height: 1.68rem;
        flex-direction: column;
        justify-content: space-between;
        /*flex: 1;*/
        padding-right: 0.2rem;
        color: #333333;
        span {
          font-size: 0.26rem;
        }
      }
      &_price {
        display: flex;
        span {
          line-height: 1;
        }
        .old_price {
          color: #cccccc;
          text-decoration: line-through;
        }
        .num {
          flex: 1;
          text-align: right;
          color: #999999;
        }
      }
      &_time {
        display: flex;
        line-height: 0.7rem;
        padding: 0 0.1rem;
        background-color: #ffffff;
        .tprice {
          flex: 1;
          text-align: right;
        }
        span:first-of-type {
          color: #999999;
        }
      }

    }
    .instructions {
      margin: 0.4rem 0 0.8rem;
      text-align: center;
      .title {
        font-size: 0.26rem;
        color: #666666;
        padding-bottom: 0.2rem;
      }
      .text {
        font-size: 0.24rem;
        color: #999999;
      }
    }
    .give_details {
      height: 2rem;
      margin-top: 0.2rem;
      padding: 0 0.25rem;
      font-size: 0.28rem;
      .details {
        display: flex;
        align-items: center;
        width: 100%;
        height: 0.6rem;
        line-height: 0.6rem;
        text-align: center;

        .line {
          flex: 1;
          height: 0;
          border-bottom: 0.02rem solid #cccccc;
        }
        .title {
          font-size: 0.26rem;
          color: #999999;
          padding: 0 0.2rem;
        }
      }
      .receive_null {
        text-align: center;
        font-size: 0.24rem;
        color: #cccccc;
      }

      .receive {
        display: table;
        width: 100%;
        margin-top: 0.3rem;
        font-size: 0.24rem;
        color: #999999;
        img {
          display: table-cell;
          width: 1rem;
          height: 1rem;
          border-radius: 50%;
        }
        span {
          display: table-cell;
          vertical-align: middle;
          text-align: right;
          &:first-of-type {
            text-align: left;
          }
        }
      }
    }
  }

  /*.give_box .gives{*/
  /*width: 100%;*/
  /*height: 100%;*/
  /*background: rgba(0,0,0,0.7);*/
  /*position: fixed;*/
  /*bottom:0;*/
  /*}*/
  /*.give_box .gives img{*/
  /*width: 100%;*/
  /*}*/


</style>
