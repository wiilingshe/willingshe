<template>
  <div class="money">
    <div class="balance">{{list}}</div>
    <div class="Instructions">可用余额（K币）</div>
    <div class="line"></div>
    <div class="money-title">请选择你要充值的金额：</div>
    <div style="overflow: auto;">
      <div class="money-recahnge" v-for="(i,index) in arr" @click="choose(index,i.recharge_balance)" :style="{border:index==num?'1px solid #000':'1px solid #eee'}">
        <div class="money-recahnge-gift" v-if="i.largess_balance != 0">
          <img src="../../../static/img/home/my_give.png">
          <span>送{{Number(i.largess_balance)}}</span>
        </div>
        <div class="money-recahnge-table">
          <div class="money-recahnge-tablecell">
            <div class="money-recahnge-kb" :style="{color:index==num?'#222':'#999','margin-top':i.largess_balance!=0?'0.2rem':''}">{{Number(i.recharge_balance)}}{{moneyName}}</div>
            <div class="money-recahnge-price" :style="{color:index==num?'#222':'#999'}">{{Number(i.recharge_balance)}}元</div>
          </div>
        </div>
        <div class="money-recahnge-choose" v-if="index==num">
          <i class="icon iconfont icon-gou"></i>
        </div>
      </div>
    </div>
    <div class="money-rechargeBtn" @click="pay()">
      确定支付：{{rechargePrice}}元
    </div>
    <div class="money-shuoming">
      <p>充值说明</p>
      <div>1.K币可用于购买CVC课程、参加线下活动等用途；</div>
      <div>2.通过参与活动获得的K币，和充值得到的K币没有区别，均可用于平台内消费；</div>
      <div>3.充值后的K币不会过期，但无法提现或转赠他人。</div>
    </div>
  </div>
</template>
<script>
  import { Indicator } from 'mint-ui';
  export default{
    data(){
      return{
        arr:[],
        num:0,
        rechargePrice:0,
        list:'--',
      }
    },
    created(){
      document.title = '我的钱包';
      Indicator.open();
      this.getData('post','/shop-v1-user_base_info.html').then(res => {
        // this.list = res.data.data
        this.list = Number(res.data.data.recharge_balance)+Number(res.data.data.largess_balance)
      })
      this.getData('post','/shop-v1-user_recharge_mbrule.html').then(res => {
        if(res.data.length == 0){
          Indicator.close();
        }
        var t;
        for(var i=0;i<res.data.length;i++){
            for(let j=i+1;j<res.data.length;j++){
                if(Number(res.data[i].recharge_balance)>Number(res.data[j].recharge_balance)){
                    t=res.data[i];
                    res.data[i]=res.data[j];
                    res.data[j]=t;
                }
            }
        }
        this.arr = res.data;
        this.rechargePrice = Number(res.data[0].recharge_balance);
        Indicator.close();
      },res => {
        Indicator.close();
      })
    },
    methods:{
      choose(index,recharge){
        this.num = index;
        this.rechargePrice = Number(recharge);
      },
      pay(){
        var self = this;
        this.getData('post','/shop-v1-pay_order.html',{type:5,recharge_balance:this.rechargePrice}).then(res => {
          function onBridgeReady(){
           WeixinJSBridge.invoke(
               'getBrandWCPayRequest', {
                   "appId":res.data.appId,     //公众号名称，由商户传入     
                   "timeStamp":res.data.timeStamp,         //时间戳，自1970年以来的秒数     
                   "nonceStr":res.data.nonceStr, //随机串     
                   "package":res.data.package,     
                   "signType":res.data.signType,         //微信签名方式：     
                   "paySign":res.data.paySign //微信签名 
               },
               function(res){     
                   if(res.err_msg == "get_brand_wcpay_request:ok" ) {
                    self.$router.push({path:'/mine-money'});
                   }
               }
           ); 
        }
        if (typeof WeixinJSBridge == "undefined"){
           if( document.addEventListener ){
               document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
           }else if (document.attachEvent){
               document.attachEvent('WeixinJSBridgeReady', onBridgeReady); 
               document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
           }
        }else{
           onBridgeReady();
        }
        })
      }
    }
  }
</script>
<style lang="less">
  .money{
    height: 100vh;
    background-color: #fff;
    overflow: scroll;
    -webkit-overflow-scrolling:touch;
    &-shuoming{
      width: calc(~"100% - 0.6rem");
      margin: 0 auto;
      padding-bottom: 1rem;
      p{
        font-size: 0.28rem;
        margin-bottom: 0.1rem;
      }
      div{
        font-size: 0.26rem;
        color: #999;
      }
    }
    &-rechargeBtn{
      height: 0.92rem;
      width: 6.92rem;
      color: #fff;
      margin: 0 auto;
      background-color: #222;
      font-size: 0.3rem;
      text-align: center;
      line-height: 0.92rem;
      overflow: hidden;
      margin-top: 0.4rem;
      margin-bottom: 0.4rem;
      border-radius: 0.06rem;
    }
    .balance{
      font-size: 0.76rem;
      text-align: center;
      font-weight: 500;
      margin-top: 0.9rem;
    }
    .Instructions{
      font-size: 0.26rem;
      color: #999;
      text-align: center;
      margin-bottom: 0.8rem;
    }
    .line{
      width: calc(~"100% - 0.3rem");
      margin:0 auto;
      height: 1px;
      background-color: #eee;
    }
    &-title{
      font-size: 0.28rem;
      color: #333;
      margin-left: 0.3rem;
      margin-top: 0.3rem;
    }
    &-recahnge{
      width: 2.12rem;
      height: 1.32rem;
      border-radius: 0.06rem;
      display: inline-block;
      float: left;
      margin-left: 0.26rem;
      margin-top: 0.3rem;
      font-size: 0.28rem;
      color: #999;
      position: relative;
      &-kb{
        font-weight: bold;
      }
      &-gift{
        position: absolute;
        left: 0;
        top: 0;
        width: 1rem;
        img{
          width: 1rem;
        }
        span{
          position: absolute;
          top: 0;
          font-size: 0.22rem;
          color: #fff;
          margin-left: 0.13rem;
        }
      }
      &-table{
        height: 1.32rem;
        display: table;
        width: 2.12rem;
        text-align: center;
      }
      &-choose{
        width: 0;
        height: 0;
        border-bottom: 0.5rem solid #000;
        border-left: 0.5rem solid transparent;
        position: absolute;
        bottom: 0;
        right: 0;
        i{
          color: #fff;
          position: absolute;
          left: -0.3rem;
          top: 0.18rem;
          font-size: 0.3rem;
          font-weight: bold;
        }
      }
      &-tablecell{
        display: table-cell;
        vertical-align: middle;
      }
    }
  }
</style>