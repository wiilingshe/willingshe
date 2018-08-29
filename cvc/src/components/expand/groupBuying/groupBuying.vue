<template>
  <div class="groupBuying" v-if="isBuy">
    <div class="groupBuying_main" v-if="!isIn && isRecord">
      <div class="groupBuying_main-title">
        <span class="groupBuying_main-title1">
          你的小伙伴正在等你抱团
        </span>
        <span class="groupBuying_main-more" @click="toList()">
          查看更多
          <i class="iconfont icon-next-page"></i>
        </span>
      </div>
      <div class="groupBuying_main-item" v-for="(i,index) in buyArr">
        <div class="groupBuying_main-left">
          <img :src="i.face">
        </div>
        <div class="groupBuying_main-middle">
          <p class="groupBuying_main-texttop">团长 : {{i.nickname}}</p>
          <p class="groupBuying_main-textbottom">
            <span v-if="i.is_full">已成团</span>
            <span class="groupBuying_main-icon" v-if="!i.is_full">
              <i class="iconfont icon-daojishi"></i>
            </span>
            <span class="groupBuying_main-time" v-if="!i.is_full">{{i.end_time}}</span>&nbsp
            <span class="groupBuying_main-num">&nbsp{{i.collect_num}}人团&nbsp</span>
          </p>
        </div>
        <div class="groupBuying_main-right">
          <span class="groupBuying_main-btn" v-if="!i.is_full && !i.isClick" @click="alertBox(i.grp_id,index,'2')">
            来抱团
          </span>
          <span class="groupBuying_main-btn noclick" v-if="!i.is_full && i.isClick">
            来抱团
          </span>
          <img src="../../../../static/img/groupbuy/full.png" v-if="i.is_full">
        </div>
      </div>
    </div>
    <div class="groupBuying_main" v-if="!isIn && !isRecord" style="font-size: 0.3rem;text-align: center;line-height: 2rem">
      暂无拼团记录
    </div>
    <div class="groupBuying_null" v-if="0">
      还未有人开团
    </div>
    <div class="groupBuying_suces" v-if="isIn">
      <div class="groupBuying_suces-head">
        <span class="groupBuying_suces-icon">
          <i class="iconfont icon-dui"></i>
        </span>
        <span>
          拼团进行中
        </span>

      </div>
      <div class="groupBuying_message-members">
        <div class="groupBuying_message-wrap" v-for=" (i,index) in sucesArr.member_lst">
          <div class="groupBuying_message-img">
            <img :src="i.face">
            <span class="groupBuying_message-colonel" v-if="index == 0">团</span>
          </div>

        </div>
        <div class="groupBuying_message-wrap" v-for="i in sucesArr.lack_count">
          <div class="groupBuying_message-img">
            <span class="groupBuying_message-null">?</span>
          </div>
        </div>
      </div>
      <div class="groupBuying_suces-people">
        还差 <span>{{sucesArr.lack_count}}</span>人，快呼唤更多小伙伴成团吧!
      </div>
      <div class="groupBuying_suces-time">
        <div class="groupBuying_suces-linewrap">
          <span class="groupBuying_suces-line"></span>
        </div>
        <div class="groupBuying_suces-count">剩余:
          <span class="groupBuying_suces-timenum">0</span>
          天
          <span class="groupBuying_suces-timenum">00</span>
          :
          <span class="groupBuying_suces-timenum">00</span>
          :
          <span class="groupBuying_suces-timenum">00</span>
          结束</div>
        <div class="groupBuying_suces-linewrap">
          <span class="groupBuying_suces-line"></span>
        </div>

      </div>
    </div>
    <div class="groupBuying_message">
      <div class="groupBuying_message-time">
        仅剩<span class="groupBuying_message-num">{{alertObj.lack_count}}</span>个名额&nbsp,
        &nbsp<span class="groupBuying_message-count">{{alertObj.end_time}}</span>后结束
      </div>
      <div class="groupBuying_message-members" >
        <div class="groupBuying_message-wrap" v-for=" (i,index) in alertObj.member_lst">
          <div class="groupBuying_message-img">
            <img :src="i.face">
            <span class="groupBuying_message-colonel" v-if="index == 0">团</span>
          </div>
        </div>
        <div class="groupBuying_message-wrap" v-for="i in alertObj.lack_count">
          <div class="groupBuying_message-img">
            <span class="groupBuying_message-null">?</span>
          </div>
        </div>
        <!--<div class="groupBuying_message-wrap" v-for="i in nullMess">-->
          <!--<div class="groupBuying_message-img" v-show="0">-->
          <!--</div>-->
        <!--</div>-->
      </div>
    </div>
    <div class="groupBuying_pay" v-if="!isIn">
      <div class="groupBuying_pay-wrap">
        <div class="groupBuying_pay-item"
             v-for="(i,index) in payArr.grp_lst"
             :class="payArr.grp_lst.length == 2?'groupBuying_pay-m2':'groupBuying_pay-m3'"
             @click="toPay(i.pid,'1')">
          <span>￥{{i.now_total_fee}}</span> <br>
          <span v-if="index == 0 && payArr.grp_lst.length == 3">单独购买</span>
          <span v-if="index != 0 || payArr.grp_lst.length == 2">发起{{i.collect_num}}人拼团</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { MessageBox } from 'mint-ui';

  export default{
    data(){
      return {
        recId:'',
        grpId:'',
        buyArr:[],
        sucesArr:[],
        payArr:[],
        alertObj:{},
        buytimer:[],
        sucestime:null,
        openBuy:null,
        isBuy:false,
        isClick:false,
        isIn:0,
        isRecord:false,
      }
    },
    created(){
        let href = window.location.href;
        let productType = 1;

        if(href.indexOf('vid') != -1){
          this.recId = this.$route.query.vid;
          productType = 1;
        }else if(href.indexOf('ser_id') != -1){
          this.recId = this.$route.query.ser_id;
          productType = 2;
        }

      let url ='/shop-v1-collect_activity_get_grp_detail.html?rec_id='+this.recId+'&product_type='+productType;
      this.getData('get',url).then(res => {
          if(res.status == 200){
//          拼团已成功或者已失败后，显示什么界面？

//          拼团活动未发布与未参团，都是返回status:0,使用msg判断
            if(res.data.status != undefined && res.data.msg == undefined){
//                隐藏父组件按键
              this.$emit('fantherHide');
                this.isBuy = true;
                this.isIn = res.data.status;
                if(this.isIn == 1){
                  this.sucesArr = res.data;
                  this.nullMess = 5-this.sucesArr.collect_num;
//              倒计时，结束显示方式未定？
                  if(this.sucesArr.end_time != '已结束'){
                    let sCount =this.sucesArr.end_time;
                    let nData = 0;
                    if(sCount.indexOf('天') != -1){
                      nData = parseInt(sCount.split('天')[0]);
                      sCount = sCount.split('天')[1];
                    }
                    let nHour = parseInt(sCount.split(':')[0]);
                    let nMinutes = parseInt(sCount.split(':')[1]);
                    let nSecond = parseInt(sCount.split(':')[2]);
                    this.$nextTick(function () {
                      //                      初始时间
                      let $timenum = $('.groupBuying_suces-timenum');
                      $timenum.eq(0).text(nData);
                      $timenum.eq(1).text(sCount.split(':')[0]);
                      $timenum.eq(2).text(sCount.split(':')[1]);
                      $timenum.eq(3).text(sCount.split(':')[2]);
                      let that = this;
                      this.sucestime = setInterval(function () {

                        if(nSecond == 0 && (nMinutes > 0 || nHour > 0 || nData > 0)){
                          nSecond = 59;
                          if(nMinutes == 0 && (nHour > 0 || nData > 0)){
                            nMinutes = 59;
                            $timenum.eq(2).text(nMinutes);
                            if(nHour == 0 && nData > 0){
                              nHour = 23;
                              $timenum.eq(1).text(nHour);
                              nData--;
                              $timenum.eq(0).text(nData);
                            }else{
                              nHour = nHour == 0? 0: --nHour;
                              if(nHour<10){
                                $timenum.eq(1).text('0'+nHour);
                              }else{
                                $timenum.eq(1).text(nHour);
                              }
                            }
                          }else{
                            nMinutes = nMinutes == 0? 0: --nMinutes;
                            if(nMinutes<10){
                              $timenum.eq(2).text('0'+nMinutes);
                            }else{
                              $timenum.eq(2).text(nMinutes);
                            }
                          }
                        }else{
                          if(nSecond == 0){
                            clearInterval(that.sucestime);
                          }else{
                            nSecond--;
                          }
                        }
                        if(nSecond<10){
                          $timenum.eq(3).text('0'+nSecond);
                        }else{
                          $timenum.eq(3).text(nSecond);
                        }
                      },1000);
                    });
                  }else{
                    //                     已结束时间显示
                    let $timenum = $('.groupBuying_suces-timenum');
                    $timenum.eq(0).text(0);
                    $timenum.eq(1).text(0);
                    $timenum.eq(2).text(0);
                    $timenum.eq(3).text(0);
                    $('.groupBuying_suces-people').text('人数未满，开团失败');
                  }
                }else if(this.isIn == 0){
                  this.payArr = res.data;
                  this.buyArr = this.payArr.rec_grp_lst;
                  //            判断是否无人开团
                  if(this.buyArr.length != 0){
                    this.isRecord = true;
                    this.buyArr.forEach((i,index)=>{
                      if( i.is_full == 0 && i.end_time != '已结束'){
                        this.buyArr[index].isClick = false;
                        let sCount = i.end_time;
                        let nData = 0;
                        if(sCount.indexOf('天') == 1){
                          nData = parseInt(sCount.split('天')[0]);
                          sCount = sCount.split('天')[1];
                        }
                        let nHour = parseInt(sCount.split(':')[0]);
                        let nMinutes = parseInt(sCount.split(':')[1]);
                        let nSecond = parseInt(sCount.split(':')[2]);
                        let that = this;
                        let time = '';
                        this.$nextTick(function () {
                          let $groupBuyingTime = $('.groupBuying_main-time');
                          let $groupBuyingCount = $('.groupBuying_message-count');
                          this.buytimer[index] = setInterval(function () {

                            if(nSecond == 0 && (nMinutes > 0 || nHour > 0 || nData > 0)){
                              nSecond = 59;
                              if(nMinutes == 0 && (nHour > 0 || nData > 0)){
                                nMinutes = 59;
                                if(nHour == 0 && nData > 0){
                                  nHour = 23;
                                  nData--;
                                }else{
                                  nHour = nHour == 0? 0: --nHour;
                                }
                              }else{
                                nMinutes = nMinutes == 0? 0: --nMinutes;
                              }
                            }else{
                              if(nSecond == 0){
                                clearInterval(that.buytimer[index]);
                              }else{
                                nSecond--;
                              }
                            }
                            time = nData+'天 ';
                            if(nHour<10){
                              time += '0'+nHour;
                            }else{
                              time += nHour;
                            }
                            if(nMinutes<10){
                              time += ':0'+nMinutes;
                            }else{
                              time += ':'+nMinutes;
                            }
                            if(nSecond<10){
                              time += ':0'+nSecond;
                            }else{
                              time += ':'+nSecond;
                            }
                            if(nSecond == 0 && nMinutes == 0 && nHour == 0 && nData == 0){
                              $groupBuyingTime.eq(index).text('已结束');
                            }else{
                              $groupBuyingTime.eq(index).text(time);
                            }

                            if(that.openBuy != null){
                              $groupBuyingCount.text($groupBuyingTime.eq(that.openBuy).text());
                            }
                          },1000);
                        });
                      }else{
//                        已结束状态
                        this.isClick = true;
                        this.buyArr[index].isClick = true;
                      }
                    });
                  }
                }
              }
          }else{
            console.log(res.msg);
          }
      });
    },
    methods:{
      alertBox(grp,index,group_type){
        let that = this;
        this.openBuy = index;
        this.grpId = grp;
        let url = '/shop-v1-collect_activity_join_grp_detail.html?grp_id='+this.grpId;
        this.getData('get',url).then(res => {
            if(res.status == 200){
              this.alertObj = res.data;
            }
          MessageBox({
            title: '参与'+this.alertObj.member_lst[0].nickname+'的拼团?',
            message: '  ',
            confirmButtonText:'参与拼团',
            showCancelButton:true,
          }).then(action => {
            if(action == 'confirm'){
              if(window.location.href.indexOf('vid') != -1){
                this.$router.push({path:'/toPay',query:{'p_id':this.alertObj.pid,'type':'7',shipin:this.$route.query.vid,group_type:group_type}});
              }else{
                this.$router.push({path:'/toPay',query:{'p_id':this.alertObj.pid,'type':'7',course:this.$route.query.ser_id,group_type:group_type}});
              }
            }
          });
          if($('.mint-msgbox-message').length == 0){
            this.$nextTick(function () {
              $('.mint-msgbox').css({'border-radius':'0.1rem'});
              $('.mint-msgbox-title').css({'font-size':'0.32rem','font-weight':'500'});
              $('.mint-msgbox-content').css({padding:'10px 0 15px','border-bottom':'none'});
              $('.mint-msgbox-cancel').css({position:'absolute',right:'0.28rem',top:'0px',width:'0.24rem',height:'0.24rem','font-size':'0.42rem','font-weight':'100','border-right':'none',color:'#a2a2a2'}).text('x');
              $('.mint-msgbox-message').css({'line-height':1});
              $('.mint-msgbox-btns').css({padding:'0 0.2rem 0.2rem'});
              $('.mint-msgbox-confirm').css({'background-color':'#1a9eda','font-size':'0.28rem',color:'#ffffff','border-radius':'0.1rem'});

              $('.mint-msgbox-message').append($('.groupBuying_message'));
              $('.groupBuying_message').show();

            });
          }
        });
        },
      toList(){
        this.$router.push({path:'/groupList',query:{ser_id:this.$route.query.ser_id}});
      },
      toPay(Pid,group_type){
        if(window.location.href.indexOf('vid') != -1){
          this.$router.push({path:'/toPay',query:{'p_id':Pid,'type':'7','shipin':this.$route.query.vid,'group_type':group_type}});
        }else{
          this.$router.push({path:'/toPay',query:{'p_id':Pid,'type':'7','course':this.$route.query.ser_id,'group_type':group_type}});
        }
      }
    },
    beforeDestroy(){
      this.buytimer.forEach((i)=>{
        clearInterval(i);
      });
      clearInterval(this.sucestime);
    }
  }
</script>

<style scoped lang="less">
.groupBuying{
  font-size: 0.24rem;
  &_main{
    margin-bottom: 0.2rem;
    background-color: #ffffff;
    &-title{
      display: -webkit-flex;
      display: flex;
      padding: 0.2rem;
      font-size: 0.24rem;
      color: #333333;

    }
    &-title1{
      -webkit-flex: 1;
      flex: 1;
      font-size: 0.26rem;
      color: #333333;
    }
    &-more{
      font-size: 0.24rem;
      color: #999999;
      .icon-next-page{
        font-size: 0.24rem;
        color: #999999;
      }
    }
    &-item{
      display: table;
      width: 96%;
      margin: 0 2%;
      padding:0.3rem 0;
      border-top: 0.02rem solid #eeeeee;

      img{
        width: 1.2rem;
        height: 1.2rem;
        -webkit-border-radius:50%;
        -moz-border-radius:50%;
        border-radius:50%;
      }
      .icon-daojishi{
        font-size: 0.24rem;
        color: #2797d7;
      }
    }
    &-left{
      display: table-cell;
      width: 1.2rem;
      vertical-align: middle;
      padding-right: 0.2rem;
    }
    &-middle{
      display: table-cell;
      vertical-align: middle;
      font-size: 0.24rem;
    }
    &-texttop{
      padding-bottom: 0.12rem;
      color: #333333;
    }
    &-textbottom{
      color: #999999;
    }
    &-num{
      border: 0.02rem solid #999999;
      -webkit-border-radius:0.06rem;
      -moz-border-radius:0.06rem;
      border-radius:0.06rem;
    }

    &-right{
      display: table-cell;
      width: 1.2rem;
      vertical-align: middle;
    }
    &-btn{
      padding: 0.04rem 0.19rem;
      font-size: 0.24rem;
      color: #fe5875;
      border: 0.02rem solid #fe5875;
      -webkit-border-radius:0.06rem;
      -moz-border-radius:0.06rem;
      border-radius:0.06rem;
    }
    .noclick{
      color: #6e6e6d;
      border: 0.02rem solid #6e6e6d;
    }
  }
  &_null{
    text-align: center;
    line-height: 2rem;
  }
  &_suces{
    text-align: center;

    &-head{
      padding: 0.2rem 0 0.3rem;
      text-align: center;
      font-size: 0.26rem;
      color: #666666;
    }
    &-icon{
      padding-right: 0.1rem;
    }
    .icon-dui{
      font-size: 0.34rem;
      color: #1a91da;
    }
    &-people{
      margin-top: 0.3rem;
      font-size: 0.24rem;
      color: #333333;
      span{
        color: #fe5875;
      }

    }
    &-time{
      display: -webkit-flex;
      display: flex;
      margin:0.25rem 0 0.35rem;
    }
    &-linewrap{
      -webkit-flex: 1;
      flex: 1;
    }
    &-line{
     display: inline-block;
      width: 100%;
      height: 0.02rem;
      vertical-align: middle;
      background-color: #dddddd;

    }
    &-count{
      padding: 0 0.1rem;
      font-size: 0.24rem;
    }
    &-timenum{
      padding: 0 0.04rem;
      background-color:#dddddd;
      -webkit-border-radius:0.1rem;
      -moz-border-radius:0.1rem;
      border-radius:0.1rem;
    }

  }
  &_pay{
    position: fixed;
    bottom:0;
    height: 0.9rem;
    width: 100%;
    z-index: 1000;
    &-wrap{
      display: table;
      width: 100%;
      height: 100%;
      text-align: center;
      color: #ffffff;
    }
    &-item{
      display: table-cell;
      vertical-align: middle;

    }
    &-m3{
      width: 30%;
      background-color: #ff9f9a;
      &:nth-of-type(2){
        background-color: #ff756d;
      }
      &:last-of-type{
        width: 40%;
        background-color: #e02e24;
      }
    }
    &-m2{
      width: 50%;
      background-color: #ff756d;
      &:nth-of-type(2){
        background-color: #e02e24;
      }
    }


  }
  &_message{
    display: none;
    &-time{
      margin-bottom: 0.2rem;
      font-size: 0.24rem;
      color: #666666;
    }
    &-num{
      color: #fe5875;
    }
    &-wrap{
      flex: 1;
      &:first-child .groupBuying_message-img{
        border: 0.02rem solid #1a9eda;
        background-color:#1a9eda ;
      }
      &:first-child .groupBuying_message-img img{
        border:0.02rem solid #1a9eda;
      }
      img{
        display: block;
        width:0.88rem;
        height:0.88rem;
        -webkit-border-radius:50%;
        -moz-border-radius:50%;
        border-radius:50%;
      }

    }
    &-img{
      position: relative;
      width: 0.89rem;
      height: 0.89rem;
      margin:auto;
      text-align: center;
      background-color: #dddddd;
      -webkit-border-radius:50%;
      -moz-border-radius:50%;
      border-radius:50%;
      /*overflow: hidden;*/
    }
    &-null{
      line-height: 0.9rem;
      text-align: center;
      font-size: 0.32rem;
      color: #ffffff;

    }
    &-colonel{
      display: block;
      position: absolute;
      right:-0.1rem;
      top: -0.1rem;
      width: 0.35rem;
      height: 0.35rem;
      line-height: 0.35rem;
      text-align: center;
      font-size: 0.22rem;
      color: #ffffff;
      background-color: #1a9eda;
      border: 0.04rem solid #eeeeee;
      -webkit-border-radius:50%;
      -moz-border-radius:50%;
      border-radius:50%;
    }
    &-members{
      position: relative;
      display: -webkit-flex;
      display: flex;
      padding: 0 0.2rem;
    }
  }
}
</style>
