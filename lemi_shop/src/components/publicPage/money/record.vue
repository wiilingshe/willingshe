<!--提现记录页面-->
<template>
  <div class="record_box">
    <div class="record_header" if="isShow==1">
      <div>时间</div>
      <div>类型</div>
      <div>交易金额</div>
      <div>状态</div>
    </div>
    <div class="record_main" v-if="isShow==1">
      <div class="main_box" v-for="item in arr">
        <div>{{item.create_time}}</div>
        <div>{{item.withdraw_name}}
          <!-- <span>处理中</span> -->
        </div>
        <div>{{item.total_fee}}</div>
        <div v-if="item.status == 3">被拒绝</div>
        <div v-if="item.status == 2">交易成功</div>
        <div class="red" v-if="item.status == 1">正在处理</div>
      </div>
    </div>
    <div v-if="isShow==0">
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
  export default{
    data(){
      return {
        arr: [],
        isShow: 1,
        msg: '暂无记录'
      }
    },
    created(){
      document.title = '提现记录';
      this.global.shouquan();
      this.getData('get', '/shop-v1-user_get_withdraw_balance.html').then(res => {
        if (res.data.length == 0) { //没有数据
          this.isShow = 0
        } else { //有数据
          this.arr = res.data;
          this.isShow = 1

        }

      })
    }
  }
</script>

<style scoped>

  .record_box {
    display: flex;
    flex-direction: column;
    /*background: #f1f2f6;
        height: 100%;
        color: #333;*/
  }

  .record_header {
    margin-bottom: 0.2rem;
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
    -webkit-flex-direction: row;
    justify-content: space-between;
    -webkit-justify-content: space-between;
    font-size: 0.27rem;
    border-bottom: 1px solid #e1e2e6;
    background: #FCFCFC;
    height: 1rem;
    line-height: 1rem;
  }

  .record_header > div {
    /*height: 0.8rem;
        line-height: 0.65rem;*/
    text-align: center;
    flex-basis: 25%;
    -webkit-flex-basis: 25%;

  }

  .record_main {
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    -webkit-flex-direction: column;
    background: #fff;

  }

  .main_box {
    height: 0.8rem;
    line-height: 0.8rem;
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
    -webkit-flex-direction: row;
    justify-content: space-between;
    -webkit-justify-content: space-between;
    font-size: 0.27rem;
    border-top: 1px solid #e1e2e6;
  }

  .main_box:nth-child(1) {
    border-top: 0;
  }

  .main_box > div {
    text-align: center;
    flex-basis: 25%;
    font-size: 0.21rem;
  }

  .main_box > div:nth-child(2) {
    position: relative;
  }

  .main_box span {
    background: orange;
    color: white;
    position: absolute;
    display: block;
    width: 0.8rem;
    height: 0.4rem;
    line-height: 0.4rem;
    top: 0.1rem;
    right: -0.3rem;
    border-radius: 0.05rem;
    font-size: 0.23rem;

  }

  .red {
    color: orange;
  }
</style>
