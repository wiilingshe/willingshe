<template>
  <div class="groupList">
    <div class="groupList_head">
      正在组的团
    </div>
    <div class="groupList_list">
      <div class="groupList_list-item" v-for="(i,index) in buyArr">
        <div class="groupList_list-left">
          <img :src="i.face">
        </div>
        <div class="groupList_list-middle">
          <p class="groupList_list-texttop">团长 : {{i.nickname}}</p>
          <p class="groupList_list-textmiddle">
            <span v-if="0">已成团</span>
            还差<span style="color: #fe5875">{{i.lack_count}}</span>人成团
            <span class="groupList_list-num">&nbsp{{i.collect_num}}人团&nbsp</span>
          </p>
          <p class="groupList_list-textfoot">
            <span class="groupList_list-newprice">￥{{i.now_total_fee}}</span>&nbsp
            <span class="groupList_list-oldprice">￥{{i.total_fee}}</span>
          </p>
        </div>
        <div class="groupList_list-right">
          <p style="margin-bottom: 0.2rem" v-if="!i.is_full">
            <span class="groupList_list-icon" v-if="1">
              <i class="iconfont icon-daojishi"></i>
            </span>
            <span class="groupList_list-time" v-if="1">{{i.end_time}}</span>
          </p>
          <span class="groupList_list-btn" v-if="!i.is_full && i.ifshow" @click="alertBox(i.grp_id,index)">
            来抱团
          </span>
          <img src="../../../static/img/groupbuy/full.png" v-if="i.is_full">
        </div>
      </div>
    </div>
    <div class="groupList_message">
      <div class="groupList_message-time">
        仅剩<span class="groupList_message-num">{{alertObj.lack_count}}</span>个名额,
        <span class="groupList_message-count">{{alertObj.end_time}}</span>后结束
      </div>
      <div class="groupList_message-members">
        <div class="groupList_message-wrap" v-for=" (i,index) in alertObj.member_lst">
          <div class="groupList_message-img">
            <img :src="i.face">
            <span class="groupList_message-colonel" v-if="index == 0">团</span>
          </div>

        </div>
        <div class="groupList_message-wrap" v-for="i in alertObj.lack_count">
          <div class="groupList_message-img">
            <span class="groupList_message-null">?</span>
          </div>
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
              alertObj:{},
              buytimer:[],
              setInter:null,
              openBuy:null,
            }
        },
      created(){
        this.recId = this.$route.query.ser_id;
        let url ='/shop-v1-collect_activity_get_grp_lst_by_pid.html?rec_id='+this.recId;
        this.getData('get',url).then(res => {
          if(res.status == 200){
            this.buyArr = res.data;
            this.buyArr.forEach((i,index)=>{

              if( i.is_full == 0 && i.end_time != '已结束'){
                this.buyArr[index].ifshow = true;
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
                  let $groupTime = $('.groupList_list-time');
                  let $groupCount = $('.groupList_message-count');
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
                      $groupTime.eq(index).text('已结束');
                      $('.groupList_list-btn').hide();
                    }else{
                      $groupTime.eq(index).text(time);
                    }
                    if(that.openBuy != null){
                      $groupCount.text($groupTime.eq(that.openBuy).text());
                    }
                  },1000);
                });
              }else{
                this.buyArr[index].ifshow = false;
                // this.$nextTick(function () {
                //   $('.groupList_list-btn').hide();
                // });
              }
            });
          }
        });
      },
      methods:{
        alertBox(grp,index){
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
                this.$router.push({path:'/toPay',query:{'p_id':this.alertObj.pid,'type':'7',shipin:this.$route.query.vid}});
              }else{
                this.$router.push({path:'/toPay',query:{'p_id':this.alertObj.pid,'type':'7',course:this.$route.query.ser_id}});
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

                $('.mint-msgbox-message').append($('.groupList_message'));
                $('.groupList_message').show();

//            $('html').on('click',function () {
//              console.log($('.mint-msgbox').css('display'));
//            })
              });
            }
          });
        },
      },
      beforeDestroy(){
        this.buytimer.forEach((i)=>{
          clearInterval(i);
        });
      }
    }
</script>

<style scoped lang="less">
  .groupList{
    font-size: 0.24rem;
    &_head{
      line-height: 0.65rem;
      padding-left: 0.2rem;
      font-size: 0.26rem;
      color: #333333;
    }
    &_list{
      margin-bottom: 0.2rem;
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
          color: #000000;
        }
      }
      &-item{
        display: table;
        width: 96%;
        margin: 0.2rem 0 0;
        padding:0.3rem 2%;
        border-top: 0.02rem solid #eeeeee;
        background-color: #ffffff;
        &:first-of-type{
          margin-top: 0;
        }
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
      &-textmiddle{
        color: #999999;
      }
      &-textfoot{
        margin-top: 0.2rem;
        font-size: 0.24rem;
      }
      &-newprice{
        color: #fe5875;
      }
      &-oldprice{
        color: #cccccc;
        text-decoration:line-through;
      }
      &-num{
        margin-left: 0.3rem;
        border: 0.02rem solid #999999;
        -webkit-border-radius:0.06rem;
        -moz-border-radius:0.06rem;
        border-radius:0.06rem;
      }
      &-right{
        display: table-cell;
        text-align: center;
        vertical-align: top;
      }
      &-time{
        color: #1a9eda;
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
        &:first-child .groupList_message-img{
          border: 0.02rem solid #1a9eda;
          background-color:#1a9eda ;
        }
        &:first-child .groupList_message-img img{
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
