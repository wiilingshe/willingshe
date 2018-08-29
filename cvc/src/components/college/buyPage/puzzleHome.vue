<template>
  <div class="puzzleHome">
    <mt-popup v-model="popupVisible" position="top" :modal=false>{{info}}</mt-popup>
    <div class="puzzleHome-content">
      <div class="endTime">距离{{status}}</div>
      <div class="puzzleHome-content-time">
        <div class="puzzleHome-content-time-item">
          <div class="puzzleHome-content-time-item">
            <div class="puzzleHome-content-time-item-num">{{d}}</div>
          </div>
        </div>
        <div class="puzzleHome-content-time-hao"><img src="/static/img/college/colon.png"></div>
        <div class="puzzleHome-content-time-item">
          <div class="puzzleHome-content-time-item">
            <div class="puzzleHome-content-time-item-num">{{h}}</div>
          </div>
        </div>
        <div class="puzzleHome-content-time-hao"><img src="/static/img/college/colon.png"></div>
        <div class="puzzleHome-content-time-item">
          <div class="puzzleHome-content-time-item">
            <div class="puzzleHome-content-time-item-num">{{m}}</div>
          </div>
        </div>
        <div class="puzzleHome-content-time-hao"><img src="/static/img/college/colon.png"></div>
        <div class="puzzleHome-content-time-item">
          <div class="puzzleHome-content-time-item">
            <div class="puzzleHome-content-time-item-num">{{s}}</div>
          </div>
        </div>
      </div>
      <div class="card" @click="home()">点击查看课程表</div>
      <div class="explain">
        <div>活动说明</div>
        <div style="width: 5rem;overflow: scroll;height: 3rem;margin: 0 auto;font-size:0.26rem;color:#333;">{{list.scare_desc}}</div>
      </div>
    </div>
    <div class="collegeFooter">
      <div class="left" @click="danmai()">
        <div v-if="list.sales_on==1?true:false" style="text-decoration: line-through;color:#999;float:right;margin-right: 0.15rem;">
              {{list.term_fee}}元/年
            </div>
                <div>{{list.sales_on==1?list.sales_fee:list.term_fee}}元/年 单买</div>
      </div>
      <div class="right" @click="showCode()" v-if="status1!=1">
        {{remind==1?'取消提醒':'提醒我'}}
      </div>
      <div class="right" @click="pay()" v-if="status1==1">
        {{list.scare_fee+'元/年购买'}}
      </div>
    </div>
    <div class="puzzleCode" v-show="codeList">
      <div class="codeBg" @click="hideCode"></div>
      <div class="codeContent">
        <div class="cancel" @click="hideCode">X</div>
        <div class="title">CVC摄影</div>
        <div class="code">
          <img :src="code" alt="">
        </div>
        <div class="prompt">长按识别二维码关注公众号</div>
      </div>
    </div>

  </div>
</template>

<script>
  import { Popup,Toast } from 'mint-ui';
  export default{
    data: function () {
      return {
        codeList: 0,
        status:'',
        status1:'',
        d:'',
        h:'',
        m:'',
        s:'',
        list:[],
        code:'',
        info:[],
        popupVisible:false,
        remind:'',
      }
    },
    created(){
      this.global.shouquan();
      var self = this;
      document.title = "限时抢购报名";
      this.getData('POST','/shop-v2-college-current_term.html').then(res => {
        if(res.data.data.marketing_type != 2){
          this.$router.push({path:'/collegeHome'})
        }
        this.list = res.data.data;
        this.getData('post','/shop-v2-college-get_scare_remind.html',{term_id:res.data.data.term_id}).then(res1 => {
          self.remind = res1.data.status;
        })
        if(res.data.data.scare_starttime >= Date.parse(new Date())/1000){
          // 活动还未开始
          this.status = '开始';
          this.status1 = 0;
          var time = res.data.data.scare_starttime-Date.parse(new Date())/1000;
        }else if(res.data.data.scare_starttime <= Date.parse(new Date())/1000 <= res.data.data.scare_endtime){
          // 活动已经开始
          this.status = '结束';
          this.status1 = 1;
          var time = res.data.data.scare_endtime-Date.parse(new Date())/1000;
        }else{
          console.log('活动结束')
        }
        this.d = parseInt(time/(3600*24));
          if(this.d < 10){
            this.d = '0'+this.d;
          }
          this.h = parseInt(time%(3600*24)/3600);
          if(this.h < 10){
            this.h = '0'+this.h;
          }
          this.m = parseInt((time%3600)/60);
          if(this.m < 10){
            this.m = '0'+this.m;
          }
          this.s = parseInt((time%3600)%60);
          if(this.s < 10){
            this.s = '0'+this.s;
          }
          var daojishi = setInterval(function(){
            time = time - 1;
            self.d = parseInt(time/(3600*24));
            if(self.d < 10){
              self.d = '0'+self.d;
            }
            self.h = parseInt(time%(3600*24)/3600);
            if(self.h < 10){
              self.h = '0'+self.h;
            }
            self.m = parseInt((time%3600)/60);
            if(self.m < 10){
              self.m = '0'+self.m;
            }
            self.s = parseInt((time%3600)%60);
            if(self.s < 10){
              self.s = '0'+self.s;
            }
            if(self.h==0&&self.s==0&&self.m==0){
              clearInterval(daojishi)
            }
          },1000)
      });

    },
    methods: {
      showCode: function () {
        // this.getData('get','/shop-v1-index_basemsg.html').then(res => {
        //   this.code = res.data.kefu_qrcode;
        // })
        // this.codeList = 1;
        console.log(window.location.href)
        this.getData('post','/shop-v2-college-set_scare_remind.html',{term_id:this.list.term_id,url:window.location.href+'?root_id='+this.globalid}).then(res => {
          if(res.data.status == 0){
            // this.tip(res.data.msg)
            Toast({
              message: res.data.msg,
              iconClass: 'icon iconfont icon-tishi',
              duration: 2000
            });
          }else{
            Toast({
              message: res.data.msg,
              iconClass: 'icon iconfont icon-tishi',
              duration: 2000
            });
          }
        })
      },
      hideCode: function () {
        this.codeList = 0;
      },
      home(){
        this.$router.push({path:'/collegeHome'})
      },
      date(timestamp){
        var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        var D = date.getDate() + ' ';
        var h = date.getHours() + ':';
        var m = date.getMinutes() + ':';
        var s = date.getSeconds();
        return Y+M+D+h+m+s;
      },
      pay(){
        this.getData('post','/shop-v1-pay_order.html',{type:11,term_id:this.list.term_id,marketing_type:2,}).then(res => {
          if(res.data.status == 0){
            this.tip(res.data.msg)
          }
          this.pay1(res.data,1)
        })
      },
      danmai(){
        this.getData('post','/shop-v1-pay_order.html',{type:11,term_id:this.list.term_id,marketing_type:0}).then(res => {
          if(res.data.status == 0){
            this.tip(res.data.msg)
          }
          this.pay1(res.data,1)
        })
      },
      tip(msg){
        var self = this;
        this.info = msg;
        this.popupVisible = true;
        setTimeout(function(){
          self.popupVisible = false;
        },2000);
        return false;
      }
    },

  }
</script>

<style lang="less">
  .puzzleHome {
    width: 100%;
    height: 100%;
    position: fixed;
    background: url('/static/img/puzzle/ticket_bg.png');
    background-repeat: no-repeat;
    background-size: 100%;
    &-content{
      height: calc(~"100vh - 0.92rem");
      overflow: scroll;
      -webkit-overflow-scrolling:touch;
      &-time{
        display: flex;
        -webkit-display:flex;
        justify-content: center;
        margin-top: 0.4rem;
        &-item{
          height: 0.8rem;
          width: 1.12rem;
          background-image: url(/static/img/college/Countdown.png);
          background-size: 50%;
          &-num{
            color: #fff;
            font-size: 0.7rem;
            margin-left: 0.1rem;
            letter-spacing: 0.16rem;
          }
        }
        &-hao{
          img{
            width: 0.07rem;
            margin: 0.25rem 0.1rem;
          }
        }
      }
    }
    .endTime {
      text-align: center;
      color: #2D3C50;
      font-size: 0.4rem;
      font-weight: 900;
      padding-top: 2.6rem;
    }
    .card {
      width: 2.82rem;
      height: 0.72rem;
      background: #EF4949;
      border-radius: 0.36rem;
      color: white;
      font-size: 0.28rem;
      line-height: 0.72rem;
      text-align: center;
      margin: 0.5rem auto 0;
      box-shadow: 0px 1px 2px #EF4949;
    }
    .explain {
      background: url("/static/img/college/buypage/Inviting_camera.png");
      width: 6.18rem;
      height: 4.48rem;
      background-size: 100% 100%;
      margin: 0.6rem auto 0.5rem;
      div {
        text-align: center;
        font-size: 0.32rem;
        color: #000000;
        padding-top: 0.26rem;
        padding-right: 0.2rem;
      }
      ul {
        padding-left: 0.92rem;
        padding-right: 0.42rem;
        /*padding-top: 0.2rem;*/
        li {
          font-size: 0.26rem;
          color: #333333;
          list-style: disc;
          line-height: 0.38rem;
          margin-top: 0.2rem;
        }
      }

    }
    .collegeFooter {
      width: 100%;
      height: 0.92rem;
      position: fixed;
      bottom: 0rem;
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
    .puzzleCode {
      .codeBg {
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.6);
        position: fixed;
        top: 0;
        left: 0;
      }
      .codeContent {
        width: 5.02rem;
        height: 5.52rem;
        background-color: white;
        position: fixed;
        top: 50%;
        left: 50%;
        margin-top: -2.76rem;
        margin-left: -2.51rem;
        .cancel {
          padding-top: 0.1rem;
          padding-right: 0.32rem;
          font-size: 0.36rem;
          color: #cccccc;
          text-align: right;
          position: relative;
          top: 0.1rem;
        }
        .title {
          font-size: 0.38rem;
          color: #333333;
          text-align: center;
          font-weight: 900;
        }
        .code {
          width: 3.16rem;
          height: 3.16rem;
          margin: 0.26rem auto;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .prompt {
          font-size: 0.3rem;
          color: #333333;
          text-align: center;
        }
      }
    }
  }

</style>
