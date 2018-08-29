<template>

  <div class="payBox" v-if="ifpay">
    <div class="payBox-title">
      {{title}}
    </div>
    <div class="payBox-price">
      <span class="payBox-price-title">支付总额</span>
      <span v-if="!ifsale" class="payBox-price-price1">{{Number(price)}}{{moneyName}}</span>
      <span v-if="ifsale" class="payBox-price-price1">{{Number(salePrice)}}{{moneyName}}</span>
      <span v-if="ifsale" class="payBox-price-sale">{{Number(price)}}{{moneyName}}</span>
    </div>
    <div class="payBox-payType" v-for="i in paytypeList">
      <span class="payBox-payType-title">{{i.pay_name}}</span>
      <span class="payBox-payType-select" :class="{selected:paytype==i.pay_type}">
				<i class="icon iconfont icon-gou"></i>
				<input type="radio" v-model="paytype" :value="i.pay_type">
			</span>
    </div>
    <div class="payBox-payType" style="border-bottom:0;">
      <span class="payBox-payType-title">余额支付</span>
      <span class="payBox-payType-price">{{userBalance}}{{moneyName}}</span>
      <span class="payBox-payType-role"
            v-if="giftBalance != '' && giftBalance != null && giftBalance != undefined && giftBalance != 0">充值最高送{{giftBalance}}</span>
      <span class="payBox-payType-select" :class="{selected:paytype=='balance'}">
				<i class="icon iconfont icon-gou"></i>
				<input type="radio" v-model="paytype" value="balance">
			</span>
    </div>
    <div class="payBox-payBtn" @click="comfirm()" v-if="ifgou && !ifgou2">
      确定支付
    </div>
    <div class="payBox-payBtn" @click="recharge()" v-if="!ifgou && !ifgou2" style="background-color: #999;">
      余额不足，立即充值
    </div>
    <div class="payBox-payBtn" @click="comfirm()" v-if="ifgou2">
      确定支付
    </div>
  </div>

</template>
<script>
  import {Toast, Indicator} from 'mint-ui';
  export default{
    props: ['title', 'ifpay', 'ifsale', 'salePrice', 'price', 'ifgetinfo'],
    data(){
      return {
        paytype: '',
        giftBalance: '',
        paytypeList: [],
        userBalance: 0,
        ifDeduction: false,
        balance: 0,
        ifgou: true,
        ifgou2: false,
        // dikou:0,
      }
    },
    created(){
    },
    mounted(){

    },
    methods: {
      recharge(){
        this.$router.push({path: '/mine-money'})
      },
      comfirm(){
        var self = this;
        var data;
        //如果使用余额支付，判断余额够不够抵扣
        if (window.location.search.indexOf('ser_id') != -1) {
          data = {type: 2, ser_id: this.$route.query.ser_id, order_type: 1};
        } else {
          data = {type: 1, vid: this.$route.query.vid, order_type: 1}
        }
        if (self.paytype == 'balance') {
          console.log(self.ifDeduction == true)
          if (self.ifDeduction == true) {
            if (self.ifsale == true) {
              data.balance = self.salePrice;
            } else {
              data.balance = self.price;
            }
          } else {
            Toast({
              message: '余额不足，立即充值',
              iconClass: 'icon iconfont icon-tishi',
              duration: 2000
            });
            return false;
          }
        }
        Indicator.open();
        this.getData('post', '/shop-v1-pay_order.html', data).then(res => {
          switch (res.data.is_need_pay) {
            case 0:
              Indicator.close();
              if (window.location.href.indexOf('ser_id') != -1) {
                self.$router.push({path: '/successPay', query: {ser_id: this.$route.query.ser_id,}})
              } else {
                self.$router.push({path: '/successPay', query: {vid: this.$route.query.vid,}})
              }
              break;
            case 1:
              let info;
              if (window.location.search.indexOf('ser_id') != -1) {
                info = {type: 2, pay_type: self.paytype, order_no: res.data.order_no}
              } else {
                info = {type: 1, pay_type: self.paytype, order_no: res.data.order_no}
              }
              self.getData('post', '/shop-v1-pay_topay.html', info).then(res1 => {
                Indicator.close();
                function onBridgeReady() {
                  WeixinJSBridge.invoke(
                    'getBrandWCPayRequest', {
                      "appId": res1.data.appId,     //公众号名称，由商户传入
                      "timeStamp": res1.data.timeStamp,         //时间戳，自1970年以来的秒数
                      "nonceStr": res1.data.nonceStr, //随机串
                      "package": res1.data.package,
                      "signType": res1.data.signType,         //微信签名方式：
                      "paySign": res1.data.paySign //微信签名
                    },
                    function (res) {
                      if (res.err_msg == "get_brand_wcpay_request:ok") {

                        if (window.location.href.indexOf('ser_id') != -1) {
                          self.$router.push({path: '/successPay', query: {ser_id: self.$route.query.ser_id,}})
                        } else {
                          self.$router.push({path: '/successPay', query: {vid: self.$route.query.vid,}})
                        }
                      }
                    }
                  );
                }

                if (typeof WeixinJSBridge == "undefined") {
                  if (document.addEventListener) {
                    document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
                  } else if (document.attachEvent) {
                    document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
                    document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
                  }
                } else {
                  onBridgeReady();
                }
              }, res => {

              })
              break;
          }
          // self.getData('post','/shop-v1-pay_topay.html',{type:data.type,pay_type:})
        }, then => {
          Indicator.close();
        });
      }
    },
    watch: {
      ifgetinfo(val, oldval){
        if (val == true) {
          var self = this;
          this.getData('get', '/shop-v1-user_recharge_mbrule.html').then(res => {
            self.giftBalance = Number(res.data[0].largess_balance)
            for (let i = 1; i < res.data.length; i++) {
              if (self.giftBalance < Number(res.data[i].largess_balance)) {
                self.giftBalance = Number(res.data[i].largess_balance)
              }
            }
          });
          this.getData('get', '/shop-v1-pay_pay_type.html').then(res => {
            self.paytypeList = res.data
          });
          this.getData('post', '/shop-v1-user_base_info.html').then(res => {
            self.userBalance = Number(res.data.data.balance) + Number(res.data.data.recharge_balance) + Number(res.data.data.largess_balance);
            self.paytype = 'balance'
            //判断余额是否可以抵扣
            switch (self.ifsale) {
              case false:
                if (self.userBalance > Number(self.price)) {
                  self.ifDeduction = true;
                  // self.paytype = 'balance'
                  self.ifgou = true;
                } else {
                  // self.paytype = '1'
                  self.ifgou = false;
                }
                break;
              case true:
                if (self.userBalance > Number(self.salePrice)) {
                  self.ifDeduction = true;
                  // self.paytype = 'balance'
                  self.ifgou = true;
                } else {
                  // self.paytype = '1'
                  self.ifgou = false;
                }
                break;
            }
          }, res => {

          })
        }
      },
      paytype(val, oldval){
        if (val == 'balance') {
          this.ifgou2 = false;
        } else {
          this.ifgou2 = true;
        }
      }
    }
  }
</script>
<style scoped lang="less">
  .payBox {
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
