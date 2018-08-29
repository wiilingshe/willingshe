<template>
  <div class="receive_box">
    <div class="receive_main" v-if="0 && cry==0">
      <div class="receive_header">
        <div><img :src="data.face" class="receive_img" alt=""/></div>
        <div>{{ data.nickname }}赠送了你一个课程</div>
        <div class="receive_leftY"></div>
        <div class="receive_rightY"></div>
      </div>
      <div class="receive_cover">
        <img :src="data.pic" class="receive_coverImg"/>
      </div>
      <div class="receive_info">
        <div class="receive_title"><h3>{{ data.title }}</h3></div>
        <div class="receive_lecturer" style="font-size: 0.22rem;">讲师：{{ data.username }}</div>
        <div class="receive_time">
          <span style="font-size: 0.22rem;">时间：{{ data.create_time }}</span>
          <span style="font-size: 0.22rem;"><s>￥{{ data.total_fee }}</s>(已付款)</span>
        </div>
      </div>
      <div class="receive_footer">
        <div class="receive_btn" @click="lingqu()">领取赠礼</div>
      </div>
    </div>
    <div class="receive_wrap" v-if="1 && cry==0">
      <div class="give_one" v-if="isReceive">
        礼物已成功领取
        <p style=" font-size: 0.24rem;color: #999999;margin-top: 0.2rem">请进入【我的】- 【赠礼】中查看~</p>
      </div>
      <div class="give_one" v-if="!isReceive && 0">礼物已被领取完毕</div>
      <div class="main">
        <div class="main_give">
          <p><i class="icon iconfont icon-liwu1"></i>赠礼</p>
        </div>
        <div class="main_title">
          <img class="main_left" :src="data.pic" onerror="this.src=&quot;/static/img/1.jpg&quot;">
          <div class="main_right">
            <p class="main_title2">{{ data.title}}</p>
            <div class="main_price">
              <!--<span style="padding-right: 0.1rem">￥{{data.old_fee}}</span>-->
              <span style="padding-right: 0.1rem">￥{{data.total_fee}}</span>
              <!--<span class="old_price">￥{{data.total_fee_old}}</span>-->
              <span class="price_img" v-if="isReceive">
                <img src="../../../static/img/giving.png">
              </span>

            </div>
          </div>
        </div>
      </div>
      <div class="btn" v-if="!isReceive" @click="lingqu()">
        <span>领取赠礼</span>
      </div>
      <div class="btn" v-if="isReceive" @click="goPage()">
        <span>开始学习</span>
      </div>
      <div class="instructions" v-if="!isReceive && 0">
        <div class="text">Tips: 除了好友的馈赠，您也可自掏腰包，奖励一下辛苦的自己哟。</div>
      </div>
      <div class="give_details" v-if="!isReceive && 0">
        <div class="details">
          <span class="line">&nbsp</span><span class="title">领取详情</span><span class="line">&nbsp</span>
        </div>
        <div class="receive" v-for="i in receive" v-show="receives">
          <img :src="i.pic" onerror="this.src=&quot;/static/img/1.jpg&quot;">
          <span>{{ i.nickname }}</span>
          <span>{{ i.receive_time}}</span>
        </div>
      </div>
    </div>
    <div v-if="cry==1">
      <div style="width: 100%;text-align: center;box-sizing: border-box;padding-top: 1rem">
        <i class="icon iconfont icon-wushuju" style="font-size: 2rem;color: #cccccc"></i>
      </div>
      <div style="width: 100%;text-align: center;color: #cccccc">
        {{msg}}
      </div>
    </div>
  </div>
</template>

<script>
  import {Toast} from 'mint-ui'
  export default {
    data(){
      return {
        data: '',
        isReceive: false,
        receives: false,
        receive: [],
        cry: 0,
        msg: ''

      }
    },
    created(){
      document.title = '领取';
      this.global.shouquan();
      this.postData('post', '/shop-v1-order_get_receive_lesson_detail.html', {
        'order_no': this.$route.query.order_no,
        'member_id': this.$route.query.member_id,
        'type': this.$route.query.type,
        'ser_id': this.$route.query.ser_id
      }).then(res => {
        if (res.status == 200) {
          if (res.data.status == 0) {
            this.cry = 1;
            this.msg = res.data.msg;
          } else {
            this.data = res.data.data;
            if (res.data.data.is_receive == 1) {
              this.isReceive = true;
            }
          }

        }
      })
    },
    methods: {
// 点击领取
      lingqu(){
//          this.isReceive = true;
        if (this.$route.query.type == 'video') {
          this.postData('post', '/shop-v1-order_add_receive_lesson.html', {
            'order_no': this.$route.query.order_no,
            'member_id': this.$route.query.member_id,
            'type': this.$route.query.type,
            'id': this.$route.query.vid
          }).then(res => {
            if (res.status == 200) {
              if (res.data.status == 1) {
                this.isReceive = true;
                Toast({
                  message: '恭喜您领取成功',
                  duration: 1000
                });
              } else if (res.data.status == 0) {
                Toast({
                  message: res.data.msg,
                  duration: 1000
                });
              }
            }
          });
        } else {
          this.postData('post', '/shop-v1-order_add_receive_lesson.html', {
            'order_no': this.$route.query.order_no,
            'member_id': this.$route.query.member_id,
            'type': this.$route.query.type,
            'id': this.$route.query.ser_id
          }).then(res => {
            if (res.status == 200) {
              if (res.data.status == 1) {
                this.isReceive = true;
                Toast({
                  message: '恭喜您领取成功',
                  duration: 1000
                });
              } else if (res.data.status == 0) {
                Toast({
                  message: res.data.msg,
                  duration: 1000
                });
              }
            }
          });
        }
      },
//        跳转回课程
      goPage(){
        if (this.$route.query.type == 'video') {
          this.$router.push({path: '/details', query: {'vid': this.$route.query.vid}});
        } else if (this.$route.query.type = 'series') {
          this.$router.push({path: '/details', query: {'ser_id': this.$route.query.ser_id}});
        }
      }
    },
    mounted(){
      this.noShare();
    }
  }
</script>

<style scoped lang="less">
  .receive_box {
    font-size: 0.26rem;
    height: 100%;
    /*padding-top: 0.4rem;*/
    /*background: black;*/
    /*color: white;*/

    background-color: #f5f5f5;

    .receive_wrap {
      padding-top: 0.4rem;
      .give_one {
        line-height: 1;
        padding-bottom: 0.5rem;
        font-size: 0.38rem;
        color: #fe5875;
        text-align: center;
      }
      .main {
        width: 86%;
        margin: 0 auto;
        overflow: hidden;
        font-size: 0.26rem;
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
          max-width: 60%;
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
          height: 1.68rem;
          flex-direction: column;
          justify-content: space-between;
          flex: 1;
          padding-right: 0.2rem;
          color: #333333;
        }
        &_price {
          display: flex;

          .price_img {
            flex: 1;
            text-align: right;
            img {
              height: 1rem;
            }
          }
          span {
            align-self: flex-end;
            line-height: 1;
          }
        }
        &_time {
          line-height: 0.7rem;
          padding: 0 0.1rem;
          display: flex;
          .tprice {
            flex: 1;
            text-align: right;
          }
          span:first-of-type {
            color: #999999;
          }
        }
      }
      .btn {
        width: 85%;
        line-height: 0.8rem;
        margin: 0.3rem auto 0;
        text-align: center;
        color: #ffffff;
        border-radius: 0.1rem;
        background-color: #fe5875;
      }
      .instructions {
        width: 85%;
        margin: 0.3rem auto 0.6rem;
        text-align: left;
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
  }

  .receive_box .receive_main {
    width: 90%;
    height: 90%;
    background: #1b242b;
    margin: 0 auto;
    border-radius: 0.1rem;
  }

  .receive_box .receive_header {
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
    -webkit-flex-direction: row;
    height: 1.2rem;
    border-bottom: 1px dashed #CCCCCC;
    position: relative;
  }

  .receive_box .receive_leftY {
    width: 0.3rem;
    height: 0.3rem;
    border-radius: 50%;
    background: black;
    position: absolute;
    bottom: 0;
    left: 0;
    margin-bottom: -0.15rem;
    margin-left: -0.15rem;
  }

  .receive_box .receive_rightY {
    width: 0.3rem;
    height: 0.3rem;
    border-radius: 50%;
    background: black;
    position: absolute;
    bottom: 0;
    right: 0;
    margin-bottom: -0.15rem;
    margin-right: -0.15rem;
  }

  .receive_box .receive_header div:nth-child(1) {
    margin: 0.2rem;
  }

  .receive_box .receive_header div:nth-child(2) {
    line-height: 1.2rem;
  }

  .receive_box .receive_cover {
    height: 4rem;
    padding: 0.2rem;
  }

  .receive_box .receive_coverImg {
    width: 100%;
    height: 100%;
  }

  .receive_box .receive_img {
    width: 0.8rem;
    height: 0.8rem;
  }

  .receive_box .receive_info {
    padding: 0 0.2rem;
  }

  .receive_box .receive_title {
    padding: 0.2rem 0;

  }

  .receive_box .receive_title > h3 {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .receive_box .receive_time {
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
    -webkit-flex-direction: row;
    justify-content: space-between;
    -webkit-justify-content: space-between;
  }

  .receive_box .receive_time span:nth-child(2) {
    color: red;
  }

  .receive_box .receive_footer {
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding: 0.2rem 0;
  }

  .receive_box .receive_btn {
    width: 2rem;
    height: 0.8rem;
    background: #00BFFF;
    text-align: center;
    line-height: 0.8rem;
    border-radius: 0.05rem;
  }


</style>
