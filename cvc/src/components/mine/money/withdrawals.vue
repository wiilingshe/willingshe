<!--提现明细页-->
<template>
  <div class="moneywithdrawals">
    <div v-show="!ifselect">
      <div class="yue">
        <div style="display:table-cell;vertical-align: middle;">
          <span class="clear" @click="record()" style="font-size:0.26rem;">明细</span>
          <img src="../../../../static/img/money.png">
          <div class="money">{{balance}}</div>
          <div class="tip1">（我的现金账户）</div>
        </div>
      </div>
      <div class="tip">提现成功后，1-7个工作日内提现会到账。</div>
      <div class="getMoney">
        <div class="getMoney_title">提现金额</div>
        <input ref="number" type="text" placeholder="输入提现金额" v-model="yue">
      </div>
      <div class="type" @click="go()">
        <div class="type_zi">
          提现方式
        </div>
        <i class="icon iconfont icon-next-page"></i>
        <div class="getway">{{typeway}}</div>
      </div>
      <div class="togetBtn" @click="submit()">
        提现
      </div>
    </div>
    <div v-show="ifselect">
      <mt-radio
        title="选择方式"
        v-model="value"
        :options="options" @change="check">
      </mt-radio>
    </div>
  </div>
</template>


<script>
  import {Toast} from 'mint-ui';
  export default {
    data(){
      return {
        typeway: '',
        nextShow: false,
        type: '',
        value: '',
        balance: '',
        ifselect: false,
        yue: '',
        options: [{
          label: '微信',
          value: '1'
        },
          {
            label: '支付宝',
            value: '2'
          },
          {
            label: '银行卡',
            value: '3'
          }],
        bindarr: [],
        account: '',

      }
    },
    created(){
      document.title = '提现';
      this.global.shouquan();
      this.noShare();
      //获取余额
      this.getData('get', 'shop-v1-user_get_balance.html').then(res => {
        if (res.status == 200) {
          this.balance = res.data.data.balance;
        }
      });
      // this.getData('get','/shop-v1-user_get_member_withdraw.html').then(res => {
      // 	this.bindarr = res.data;
      // 	if(res.data.alipay == 0 && res.data.bank == 0){
      // 		this.options=[{label: '微信',value: '1'}];
      // 	}else{
      // 		if(res.data.alipay != 0 && res.data.bank != 0){
      // 			var arr2 = eval('('+res.data.alipay+')');
      // 			var account2 ='（'+ arr2.account_number + '）';
      // 			var arr = eval('('+res.data.bank+')');
      // 			this.account ='（'+ arr.bank_account + '）';
      // 			this.options=[{label: '微信',value: '1'},{label: '支付宝'+account2,value: '2'},{label: '银行卡'+this.account,value: '3'}];
      // 		}else if(res.data.alipay == 0 && res.data.bank != 0){
      // 			var arr = eval('('+res.data.bank+')');
      // 			this.account ='（'+ arr.bank_account + '）';
      // 			this.options=[{label: '微信',value: '1'},{label: '银行卡'+this.account,value: '3'}];
      // 		}else if(res.data.alipay != 0 && res.data.bank == 0){
      // 			var arr = eval('('+res.data.alipay+')');
      // 			var account ='（'+ arr.account_number + '）';
      // 			this.options=[{label: '微信',value: '1'},{label: '支付宝'+account,value: '2'}];
      // 		}
      // 	}
      // })
      this.getData('get', '/shop-v1-user_get_member_withdraw.html').then(res => {
        this.bindarr = res.data;
        // var data = {};
        var arr1 = [];
        if (res.data.wechat_status != 0) {
          var data = {};
          data.label = '微信'
          data.value = "1";
          arr1.push(data);
        }
        if (res.data.alipay_status != 0) {
          var data = {};
          var arr = eval('(' + res.data.alipay + ')');
          var account = '（' + arr.account_number + '）';
          data.label = '支付宝' + account;
          data.value = "2";
          arr1.push(data);
        }
        if (res.data.bank_status != 0) {
          var data = {};
          var arr = eval('(' + res.data.bank + ')');
          var account = '（' + arr.bank_account + '）';
          data.label = '银行卡' + account;
          data.value = "3";
          arr1.push(data);
        }
        this.options = arr1;
      })

    },
    methods: {
      record: function () {
        this.$router.push('/mine-money-record');
      },
      go(){
        this.ifselect = true;
      },
      check(val){
        this.type = val;
        if (val == 1) {
          this.typeway = '微信'
        } else if (val == 2) {
          this.typeway = '支付宝'
        } else if (val == 3) {
          this.typeway = '银联卡'
        }
        this.ifselect = false;
      },
      submit(){
        //判断选择不能为空
        if (this.type == '') {
          Toast({
            message: '请选择提现方式',
            iconClass: 'iconfont icon-kulian'
          });
          return;
        }
        //判断提现的金额不能大于账户余额
        var withdrawals = parseFloat(this.$refs.number.value); //用户输入的余额
        var account = parseFloat(this.balance);     //用户账户余额
        if (account < withdrawals) {
          Toast({
            message: '提现金额不能大于账户余额',
            iconClass: 'iconfont icon-kulian'
          });
          return;
        }
        //提现
        this.postData('post', '/shop-v1-user_member_apply_withdraw.html', {
          'withdraw_type': this.type,
          'total_fee': this.$refs.number.value
        }).then(res => {
          if (res.status == 200) {
            if (res.data[0].status == 1) {
              Toast({
                message: '提现成功，1-7个工作日内提现会到账',
                iconClass: 'iconfont icon-check',
                duration: 3000
              });
              this.balance = account - withdrawals;
              this.type = '';
              this.yue = '';
              this.typeway = '';
            } else {
              Toast({
                message: res.data[0].msg,
                iconClass: 'iconfont icon-kulian'
              });
            }
          }
        });
      }
    },
    watch: {
      yue(val, oldval){
        if(isNaN(val)){
          this.yue = '';
          return false;
        }
        //判断提现的金额不能大于账户余额
        var withdrawals = parseFloat(this.$refs.number.value); //用户输入的余额
        var account = parseFloat(this.balance);     //用户账户余额
        if (account < withdrawals) {
          this.yue = '';
          Toast({
            message: '提现金额不能大于账户余额',
            iconClass: 'iconfont icon-kulian'
          });
          return;
        }
      }
    }
  }
</script>

<style scoped lang="less">
  .moneywithdrawals {
    font-size: 0.221rem;
    width: 100%;
    .yue {
      height: 3.41rem;
      width: 100%;
      background-color: #fff;
      text-align: center;
      display: table;
      position: relative;
      .clear {
        position: absolute;
        top: 0.17rem;
        right: 0.17rem;
        color: #999;
      }
      img {
        width: 1.3rem;
      }
      .money {
        color: #f44336;
        font-size: 0.5rem;
      }
      .tip1 {
        color: #999;
      }
    }
    .tip {
      color: #999;
      margin: 0.17rem 0 0.17rem 0.17rem;
    }
    .getMoney {
      height: 0.76rem;
      background-color: #fff;
      &_title {
        line-height: 0.76rem;
        margin-left: 0.17rem;
        color: #333;
        display: inline-block;
      }
      input {
        float: right;
        margin-right: 0.17rem;
        color: #999;
        height: 0.76rem;
        font-size: 0.26rem;
        text-align: right;
        border: 0px;
      }
      ::-webkit-input-placeholder { /* WebKit browsers */
        color: #ccc;
      }
      :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
        color: #ccc;
      }
      ::-moz-placeholder { /* Mozilla Firefox 19+ */
        color: #ccc;
      }
      :-ms-input-placeholder { /* Internet Explorer 10+ */
        color: #ccc;
      }
    }
    .type {
      height: 0.76rem;
      background-color: #fff;
      margin-top: 0.17rem;
      color: #333;
      .type_zi {
        margin-left: 0.17rem;
        line-height: 0.76rem;
        display: inline-block;
      }
      i {
        float: right;
        line-height: 0.76rem;
        margin-right: 0.1rem;
        color: #ddd;
      }
      .getway {
        display: inline-block;
        float: right;
        line-height: 0.76rem;
        color: #999;
      }
    }
    .togetBtn {
      margin: 0 auto;
      width: 6rem;
      height: 0.76rem;
      text-align: center;
      background-color: #fe5875;
      line-height: 0.76rem;
      color: #fff;
      margin-top: 0.9rem;
      font-size: 0.238rem;
      border-radius: 0.1rem;
    }
  }
</style>
