<template>
  <div class="buyPage">
    <mt-popup v-model="popupVisible" position="top" :modal=false>{{info}}</mt-popup>
    <div class="buyPage-content">
      <div class="yiheng">
        <div class="buyPage-content-img1">
          <img src="../../../static/img/college/buypage/Inviting_sucai.png">
        </div>
        <div class="buyPage-content-invite">
          <div class="buyPage-content-invite-table">
            <div class="buyPage-content-invite-table-cell">
              <div class="buyPage-content-invite-table-cell-title">邀请好友</div>
              <div class="buyPage-content-invite-table-cell-jion">加入<span style="font-size: 0.28rem;"><p
                style="position: relative;top: 0.08rem;">{{list3.name}}</p></span></div>
              <div class="buyPage-content-invite-table-cell-crouse" @click="tohome()">点击查看课程表</div>
            </div>
          </div>
        </div>
      </div>
      <div class="buyPage-content-shuoming">
        <div class="buyPage-content-shuoming-title">活动说明</div>
        <div class="buyPage-content-shuoming-content" v-html="list.union_desc"></div>
      </div>
      <div class="buyPage-content-pingtitle" v-if="my_groupslength != 0">
        <span class="buyPage-content-pingtitle-line1"></span>
        <span class="buyPage-content-pingtitle-title">我的学霸团</span>
        <span class="buyPage-content-pingtitle-line2"></span>
      </div>
      <div class="buyPage-content-list buyPage-content-list2" v-for="i in list2.my_groups">
        <div class="buyPage-content-list-img">
          <img :src="i.face">
        </div>
        <div class="buyPage-content-list-info">
          <div class="buytablecell">
            <div class="buytablecell2">
              <div class="buyPage-content-list-info-name">{{i.nickname}}</div>
              <div class="buyPage-content-list-info-num">还差{{i.lack_count}}人成团</div>
            </div>
          </div>
        </div>
        <span class="buyPage-content-list-details" @click="details(i.ctgr_id)">详情</span>
      </div>
      <div class="buyPage-content-pingtitle" v-if="group_lstlength != 0">
        <span class="buyPage-content-pingtitle-line1"></span>
        <span class="buyPage-content-pingtitle-title">全部拼团</span>
        <span class="buyPage-content-pingtitle-line2"></span>
        <span class="buyPage-content-pingtitle-more" @click="more()">查看更多</span>
      </div>
      <div class="buyPage-content-list" v-for="i in list2.group_lst">
        <div class="buyPage-content-list-img">
          <img :src="i.face">
        </div>
        <div class="buyPage-content-list-info">
          <div class="buytablecell">
            <div class="buytablecell2">
              <div class="buyPage-content-list-info-name">{{i.nickname}}</div>
              <div class="buyPage-content-list-info-num">还差{{i.lack_count}}人成团</div>
            </div>
          </div>
        </div>
        <span class="buyPage-content-list-details" @click="pay(i.ctgr_id,i.lack_count)">去参团</span>
      </div>
    </div>
    <div class="collegeFooter">
      <div class="left" @click="danmai()">
        <div v-if="list.sales_on==1?true:false"
             style="text-decoration: line-through;color:#999;float:right;margin-right: 0.15rem;">
          {{list.term_fee}}元/年
        </div>
        <div>{{list.sales_on == 1 ? list.sales_fee : list.term_fee}}元/年 单买</div>
        <!-- {{list.term_fee}}元/年 单买 -->
      </div>
      <div class="right" @click="goPuzzle()" v-if="my_groupslength == 0">
        {{list.union_num}}人拼团{{list.union_fee}}元/年
      </div>
      <div class="right" @click="sharefriend()" v-if="my_groupslength != 0">
        拼团中 邀请好友
      </div>
    </div>
    <payCoupon :isPayCoupon="isPayCoupon" :ctgr_id="ctgr_id" :group_type="group_type" :marketing_type="marketing_type"
               :couponState="couponState"
               :term_id="list.term_id" ref="child1"
               :c_money="c_money"
               :mc_id="mc_id"
               v-on:coupon1="childByValue1"></payCoupon>
    <couponsList :isCouponsList="isCouponsList" ref="child2" v-on:coupon2="childByValue2"></couponsList>
  </div>
</template>
<script>
  import {Popup, Indicator} from 'mint-ui';
  import payCoupon from '@/components/study/payCoupon';
  import couponsList from '@/components/study/couponsList';
  export default{
    data(){
      return {
        list: [],
        list2: [],
        list3: [],
        info: [],
        popupVisible: false,
        my_groupslength: '',
        group_lstlength: '',
        isPayCoupon: false,
        isCouponsList: false,
        price: 0,//默认0，由子组件传过来
        goods_price: '',
        c_money: 0,//抵扣的钱
        mc_id: '',//优惠券ID
        couponState: 1,//优惠券的页面显示三种判断之一，1.抵扣，2.没有可用优惠卷，3.不使用优惠卷
        marketing_type: 0,//营销类型 0.普通 1.拼团 2.抢购
        ctgr_id: '',//参团的ID
        group_type: 0,//参团类型（在之前判断上判断）
      }
    },
    created(){
      Indicator.open();
      this.global.shouquan();
      var self = this;
      this.getData('post', '/shop-v1-user_base_info.html').then(res => {
        Indicator.close();
        if (res.data.data.terms.length > 0) {
          if (window.location.href.indexOf('beforebuy') != -1) {
            self.$router.push({path: '/successEnter'})
          } else {
            self.$router.push({path: '/collegeHome'})
          }
        } else {
          self.getData('post', '/shop-v2-college-config.html').then(res => {
            document.title = res.data.data.name;
            self.list3 = res.data.data;
            self.getData('post', '/shop-v2-college-current_term.html').then(res1 => {
              self.list = res1.data.data;
              console.log(self.list);
              var txts = res1.data.data.union_desc;
              txts = txts.replace(/[\n\r]/g, '<br>')
              self.list.union_desc = txts
              var name = res1.data.data.union_fee + '元组团加入摄客学院';
              var desc = '每个摄影人都应该加入' + res.data.data.name;
              self.share(name, desc, 'https://www.saasxx.vip/base/img/college_pic.png');
              self.getData('post', '/shop-v2-college-get_grp_lst_by_tid.html', {
                t_id: self.list.term_id,
                page: 1,
                size: 20
              }).then(res2 => {
                self.list2 = res2.data;
                self.my_groupslength = res2.data.my_groups.length;
                self.group_lstlength = res2.data.group_lst.length;
              });
            });
          })
        }
      })
    },
    methods: {
      sharefriend(){
        this.$router.push({
          path: '/teamworkDetails',
          query: {ctgr_id: this.list2.my_groups[0].ctgr_id, term: this.list.term_id, share: 0}
        })
      },
      details(id){
        this.$router.push({path: '/teamworkDetails', query: {ctgr_id: id, term: this.list.term_id, share: 0}})
      },
      more(){
        this.$router.push({path: '/moreTeam', query: {id: this.list.term_id}})
      },
      tohome(){
        this.$router.push({path: '/collegeHome'})
      },
      /**
       * goPuzzle:弹出支付组件，相对应的参数也传给子组件，原有的注释
       * by hqq 2018/08/28
       */
      goPuzzle: function () {//参团marketing_type为1 拼团
        let that = this;
        that.isPayCoupon = true;
        that.marketing_type = 1;
        this.$refs.child1.getData1(1);
      },
      /**
       * childByValue1:监听子组件(支付弹窗)回来的值,改变对应的数值
       * by heqingqing 2018/08/28
       */
      childByValue1: function (val1, val2, goods_price, c_money, mc_id, state) {
        let that = this;
        if (state == 2) {  //没有可使用的优惠券
          that.couponState = 2;
        } else if (state == 1) { //直接显示抵扣
          that.c_money = c_money;
          that.mc_id = mc_id;
          that.isPayCoupon = val1;
          that.isCouponsList = val2;
          that.goods_price = goods_price;
        } else { //选择优惠券触发的
          that.isPayCoupon = val1;
          that.isCouponsList = val2;
          that.goods_price = goods_price;
          this.$refs.child2.getData2(that.list.term_id, goods_price, 11, 1);
        }


      },
      /**
       * childByValue2:监听子组件(可用优惠券列表)回来的值,改变对应的数值
       * by heqingqing 2018/08/28
       */
      childByValue2: function (mc_id, c_money, val1, val2, state) {
        let that = this;
        that.mc_id = mc_id;
        that.c_money = c_money;
        that.isPayCoupon = val1;
        that.isCouponsList = val2;
        that.couponState = state;
      },
      //原有的直接支付注释hqq
//      goPuzzle(){
//        var self = this;
//        this.getData('post', '/shop-v1-pay_order.html', {
//          type: 11,
//          term_id: this.list.term_id,
//          marketing_type: 1
//        }).then(res => {
//          if (res.data.status == 0) {
//            this.tip(res.data.msg)
//          }
//          // this.pay1(res.data,2)
//          var info = res.data
//          if (info.is_need_pay == 1) {
//            // import wx from 'weixin-js-sdk'
//            function onBridgeReady() {
//              WeixinJSBridge.invoke(
//                'getBrandWCPayRequest', {
//                  "appId": info.payData.appId,     //公众号名称，由商户传入
//                  "timeStamp": info.payData.timeStamp,         //时间戳，自1970年以来的秒数
//                  "nonceStr": info.payData.nonceStr, //随机串
//                  "package": info.payData.package,
//                  "signType": info.payData.signType,         //微信签名方式：
//                  "paySign": info.payData.paySign //微信签名
//                },
//                function (res) {
//                  if (res.err_msg == "get_brand_wcpay_request:ok") {
//                    // 开团成功
//                    self.getData('post', '/shop-v2-college-get_grp_lst_by_tid.html', {
//                      t_id: self.list.term_id,
//                      page: 1,
//                      size: 20
//                    }).then(res2 => {
//                      self.$router.push({
//                        path: '/teamworkDetails',
//                        query: {ctgr_id: res2.data.my_groups[0].ctgr_id, term: self.list.term_id, share: 0}
//                      })
//                    });
//                  }
//                }
//              );
//            }
//
//            if (typeof WeixinJSBridge == "undefined") {
//              if (document.addEventListener) {
//                document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
//              } else if (document.attachEvent) {
//                document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
//                document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
//              }
//            } else {
//              onBridgeReady();
//            }
//          }
//        })
//      },
      danmai(){//单买marketing_type为0 普通
        let that = this;
        that.isPayCoupon = true;
        that.marketing_type = 0;
        this.$refs.child1.getData1(0);
        //注释原有的直接请求接口
//        this.getData('post', '/shop-v1-pay_order.html', {
//          type: 11,
//          term_id: this.list.term_id,
//          marketing_type: 0
//        }).then(res => {
//          if (res.data.status == 0) {
//            this.tip(res.data.msg)
//          }
//          this.pay1(res.data, 1)
//        })
      },
      pay(id, num){ //参团的传多ctgr_id marketing_type为1 参团
        let that = this;
        that.isPayCoupon = true;
        that.marketing_type = 0;
        that.ctgr_id = id;
        this.$refs.child1.getData1(1);
        if (num == 1) {
          that.group_type = 1;
        } else {
          that.group_type = 2;
        }
//        if (num == 1) {

//          this.getData('post', '/shop-v1-pay_order.html', {
//            type: 11,
//            term_id: this.list.term_id,
//            marketing_type: 1,
//            ctgr_id: id
//          }).then(res => {
//            if (res.data.status == 0) {
//              this.tip(res.data.msg)
//            }
//            this.pay1(res.data, 1)
//          })
//        } else {
//          this.getData('post', '/shop-v1-pay_order.html', {
//            type: 11,
//            term_id: this.list.term_id,
//            marketing_type: 1,
//            ctgr_id: id
//          }).then(res => {
//            if (res.data.status == 0) {
//              this.tip(res.data.msg)
//            }
//            this.pay1(res.data, 2)
//          })
//        }
      },
      tip(msg){
        var self = this;
        this.info = msg;
        this.popupVisible = true;
        setTimeout(function () {
          self.popupVisible = false;
        }, 2000);
        return false;
      }
    },
    components: {payCoupon, couponsList}
  }
</script>
<style lang="less">
  .buyPage {
    &-content {
      height: calc(~"100vh - 0.92rem");
      overflow: scroll;
      -webkit-overflow-scrolling: touch;
      background-image: url('../../../static/img/college/buypage/Inviting_bg.png');
      background-size: 100%;
      .yiheng {
        overflow: hidden;
        white-space: nowrap;
      }
      &-pingtitle {
        width: 100%;
        height: 0.6rem;
        text-align: center;
        margin-top: 0.3rem;
        position: relative;
        &-title {
          margin-left: 0.2rem;
          margin-right: 0.2rem;
          font-size: 0.34rem;
          font-weight: bold;
        }
        &-line1, &-line2 {
          width: 0.8rem;
          height: 0.02rem;
          background-color: #666666;
          display: inline-block;
          position: relative;
          vertical-align: middle;
        }
        &-line1:after, &-line2:after {
          content: "";
          background-color: #666;
          width: 0.08rem;
          height: 0.08rem;
          display: inline-block;
          position: absolute;
          border-radius: 100%;
          top: -0.03rem;
        }
        &-line1:after {
          right: -0.04rem;
        }
        &-line2:after {
          left: -0.04rem;
        }
        &-more {
          color: #333;
          font-size: 0.26rem;
          position: absolute;
          right: 0.3rem;
          top: 0.16rem;
        }
      }
      &-list {
        width: calc(~"100% - 0.6rem");
        margin: 0 auto;
        height: 1rem;
        padding: 0.3rem 0;
        border-bottom: 1px solid #ECF8FF;
        &-img {
          width: 1rem;
          height: 1rem;
          background-color: #eee;
          border-radius: 100%;
          display: inline-block;
          margin-right: 0.1rem;
          img {
            width: 1rem;
            height: 1rem;
            border-radius: 100%;
          }
        }
        &-info {
          height: 1rem;
          display: inline-block;
          .buytablecell {
            display: table;
            height: 1rem;
            .buytablecell2 {
              display: table-cell;
              vertical-align: middle;
            }
          }
          &-name {
            font-size: 0.3rem;
            color: #222;
            margin-bottom: 0.02rem;
          }
          &-num {
            font-size: 0.26rem;
            color: #888;
          }
        }
        &-details {
          width: 1.2rem;
          height: 0.52rem;
          background-color: #EF4949;
          border-radius: 0.26rem;
          text-align: center;
          line-height: 0.52rem;
          color: #fff;
          font-size: 0.28rem;
          display: inline-block;
          vertical-align: top;
          float: right;
          margin-top: 0.24rem;
        }
      }
      &-list:last-child {
        border-bottom: none;
      }
      &-shuoming {
        width: 6.18rem;
        height: 4.42rem;
        margin: 0 auto;
        background-repeat: no-repeat;
        background-image: url('../../../static/img/college/buypage/Inviting_camera.png');
        background-size: 100%;
        &-title {
          width: 100%;
          text-align: center;
          font-size: 0.32rem;
          color: #000;
          height: 1rem;
          line-height: 1.2rem;
        }
        &-content {
          font-size: 0.26rem;
          color: #333;
          width: 5rem;
          margin: 0 auto;
          height: 2.8rem;
          overflow: scroll;
          -webkit-overflow-scrolling: touch;
        }
      }
      &-img1 {
        width: 4.3rem;
        height: 3.6rem;
        overflow: hidden;
        display: inline-block;
        vertical-align: top;
        img {
          width: 4.3rem;
        }
      }
      &-invite {
        display: inline-block;
        vertical-align: top;
        width: calc(~"100% - 4.3rem");
        height: 3.6rem;
        &-table {
          height: 3.6rem;
          display: table;
          &-cell {
            display: table-cell;
            vertical-align: middle;
            &-title {
              font-size: 0.74rem;
              font-weight: bold;
              color: #2D3C50;
              margin-bottom: 0.08rem;
            }
            &-jion {
              font-size: 0.4rem;
              color: #2D3C50;
              span {
                background-image: url('../../../static/img/college/buypage/Inviting_kuang.png');
                height: 0.55rem;
                width: 1.9rem;
                background-size: 100%;
                display: inline-block;
                text-align: center;
                margin-left: 0.1rem;
                margin-bottom: 0.18rem;
              }
            }
            &-crouse {
              width: 2.8rem;
              height: 0.72rem;
              background-color: #EF4949;
              border-radius: 0.36rem;
              font-size: 0.28rem;
              text-align: center;
              line-height: 0.72rem;
              overflow: hidden;
              color: #fff;
              box-shadow: 0px 1px 3px #EF4949;
            }
          }
        }
      }
    }
    .collegeFooter {
      width: 100%;
      height: 0.92rem;
      position: absolute;
      bottom: 0;
      .left {
        width: 55%;
        height: 100%;
        background-color: white;
        float: left;
        text-align: center;
        color: #333333;
        font-size: 0.26rem;
        line-height: 0.92rem;
      }
      .right {
        width: 45%;
        height: 100%;
        float: right;
        background-color: #EF4949;
        text-align: center;
        color: white;
        font-size: 0.26rem;
        line-height: 0.92rem;

      }
    }
  }
</style>
