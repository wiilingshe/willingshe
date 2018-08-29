<template>
  <div class="vote">
    <div class="vote_header">
      <img  class="vote_header-bg" :src="obj.pic"  onerror="this.src=&quot;/static/img/1111.f2c6065.png&quot;" @load="imgload(obj.art_id)">
      <div :class="'load'+ obj.art_id"
           style="position: absolute;
                          top: 0;
                          left: 0;
                          width: 100%;
                          height: 3rem;
                          height: 60vw;
                          line-height:60vw;
                          text-align: center;"
      >加载中.........</div>
      <div class="vote_header-title">
        {{obj.title}}
      </div>
      <div class="vote_header-content" v-html="obj.content">
        {{obj.content}}
      </div>
    </div>
    <div class="vote_content">
      <div class="vote_content-list" style="height: 3rem;text-align:center;font-size: 0.4rem;line-height: 3rem" v-if="resultshow && !endIs">
        您已投票
      </div>
      <div class="vote_content-list" style="height: 3rem;text-align:center;font-size: 0.4rem;line-height: 3rem" v-if="endIs">
        投票已结束
      </div>
      <div class="vote_content-list" v-if="!resultshow && !endIs">
        <label class="vote_item" v-for="item in optionlist">
          <img class="vote_item-img" :src="item.opt_img" alt="未成功加载" onerror="this.src=&quot;/static/img/1111.f2c6065.png&quot;" v-if="obj.voteInfo.option_type == 2">
          <div class="vote_item-middle" :class="obj.voteInfo.option_type == 1? 'vote_item-middle2':''">
            <div class="vote_item-textwrap">
              <div class="vote_item-text">
                {{item.opt_txt}}
              </div>
            </div>
          </div>
          <div class="vote_item-right">
            <label class="vote_item-checkwrap" v-if="obj.voteInfo.select_mode == 2">
              <input class="vote_item-check" type="checkbox" v-show="0" v-model="item.check">
              <span class="vote_item-style">
                  <i class="icon iconfont icon-gou"></i>
                </span>
            </label>
            <label class="vote_item-checkwrap" v-if="obj.voteInfo.select_mode == 1">
              <input class="vote_item-radio" type="radio" v-show="0" v-model="optionlist.check" :value="item.opt_id">
              <!--@click.self="onRadio"-->
              <!--:value="item.opt_id"-->
              <!--optionlist.check-->
              <span class=" vote_item-style vote_item-radiostyle">
                  <i class="icon iconfont icon-gou"></i>
                </span>
            </label>
          </div>
        </label>
        <div class="vote_content-btn" @click="postBtn()">
          投票
        </div>
      </div>
      <div class="vote_content-btn" v-if="endIs" @click="computedResults()">
        查看投票结果
      </div>
      <div class="vote_content-tip">
            <span style="float: left" @click="toBack()">
               <i class="icon iconfont icon-fanhui" style="font-size:0.38rem;color: #6a6a6a"></i>
            </span>
      </div>
      <transition name="results-move">
        <div class="vote_results" v-if="resultshow">
          <div class="vote_results-head">
            <img class="vote_results-img" :src="result.banner" onerror="this.src=&quot;/static/img/1111.f2c6065.png&quot;">
            <div class="vote_results-title">{{result.title}}</div>
          </div>
          <div class="vote_results-content">
            <p class="vote_results-name">大家的态度</p>
            <ul class="vote_results-list">
              <li class="vote_results-item" v-for="(item,index) in resultarr">
                <div class="vote_results-left">
                  <div class="vote_results-pie" :class=" item.is_selected ? 'ischecked' : ''">
                    <div class="vote_results-percent" :class="onRadius(resultpercent[index])"></div>
                  </div>
                </div>
                <div class="vote_results-right">
                  <span class="vote_results-num">{{resultpercent[index]}}%</span>
                  <p class="vote_results-text">{{item.opt_txt}}</p>
                </div>
              </li>
            </ul>
          </div>
          <!--<div class="vote_results-tip">-->
          <!--<span style="float: left" @click="toBack()">-->
          <!--<i class="icon iconfont icon-fanhui" style="font-size:0.38rem;color: #6a6a6a"></i>-->
          <!--</span>-->
          <!--</div>-->
        </div>
      </transition>
    </div>
    <div class="vote_logo">
      <footer1></footer1>
    </div>

  </div>
</template>

<script>
  import {Indicator,Toast} from 'mint-ui';
  import comment from '@/components/mine/course/comment';
  import footer1 from '@/components/common/footer1';

  export default{
    data(){
      return{
        resultshow:false,
        appraiseshow:false,
        endIs:false,
        obj:{},
        arr:{},
        arr2:[],
        arr3:[],
        optionlist:[],
        radius:[0.6,0,0.3,1],
        voteoption:[],
        checkarr:[],
        resultarr:[],
        result:{},
        resultpercent:[],
        radioobj:{},
        num:0
      }
    },
    created(){
      this.global.shouquan();
      Indicator.open();
//      this.getData('get','/shop-v1-article_vote_stat.html?art_id= &v_option_ids=1,3').then(res => {})

      this.url = '/shop-v1-article_detail.html?art_id='+this.$route.query.artid;
      this.getData('get',this.url).then(res => {

        if(res.status == 200){
//           是否已经投票
          if(res.data.is_voted){
            this.postResults(res.data.options);
          }else{
            this.obj = res.data;
            document.title = this.obj.title;
//            投票是否结束
            if(this.obj.voteInfo && this.obj.voteInfo.is_end){
              this.endIs = true;
            }else{
              this.optionlist = this.obj.voteInfo.optionList?this.obj.voteInfo.optionList:[];
              this.$nextTick(function () {
                $('.vote_item-radio').on('click',function () {
                  $('.vote_item-radio').prop("checked",false);
                  $(this).prop("checked",true);
                  $('.vote_item-radiostyle').removeClass('radchecked');
                  $(this).siblings().eq(0).addClass('radchecked');
                });
              });
            }
          }
          //      用content作为分享内容
          this.share(this.obj.title,this.obj.content,this.obj.pic);
        }
        Indicator.close();
      });
      this.getData('post','/shop-v2-history_record.html',{type:3,id:this.$route.query.artid}).then(res => {
        
      })

    },
    components:{comment,footer1},
    methods:{
//        跳转投票结果
      showResults(){
        this.resultshow = !this.resultshow;
      },
//      提交投票
      postBtn(){
        //          获取选中项
        if(this.obj.voteInfo.select_mode == 1){
          this.arr2 = this.optionlist.filter((i)=>{
            if(i.opt_id == this.optionlist.check){
              return  i;
            }
          });
        }else{
          this.arr2 = this.optionlist.filter((i)=>{
            if(i.check == true){
              return  i;
            }
          });
        }
        this.voteoption = [];
        this.arr2.forEach((i)=>{
          this.voteoption.push(i.opt_id);
        });
        this.voteoption = this.voteoption.join(',');

//        未选择不提交
//        提交投票
        if(this.voteoption.length){
          this.postData('post','/shop-v1-article_do_vote.html',{art_id:this.$route.query.artid,v_option_ids:this.voteoption}).then(res => {
            if(res.status == 200){
//                重置选项
              if(res.data.status == 1){
                Toast({
                  message: res.data.msg,
                  position: 'middle',
                  duration: 3000
                });
                this.optionlist.forEach((i)=>{
                  i.check = false;
                });
//              获取投票结果
                this.postResults(this.voteoption);

              }else{
                Toast({
                  message: res.data.msg,
                  position: 'middle',
                  duration: 3000
                });
              }

            }
          });

        }
      },
//      返回统计圆形图样式
      onRadius(percent){
        if(percent == 0 || percent == 100){
          setTimeout(function () {
            $(".results-radius-is0").parent().addClass('vote_results-pie0');
          },0);
          return 'results-radius-is' + percent;
        }else{
          let num = Math.ceil( percent / 5);
          return 'results-radius' + num;
        }
      },
      //          获取投票结果
      postResults(option){
        let url = '/shop-v1-article_vote_stat.html?art_id='+this.$route.query.artid+'&v_option_ids='+ option;
        this.getData('get',url).then(res => {
          if(res.status == 200){
//            console.log(res.data);
            this.result = res.data;
            this.resultarr = this.result.optionList;

            document.title = this.result.title;
//            分享内容 无内容
            this.share(this.result.title,'',this.result.banner);
//            console.log(this.resultarr);
            this.resultpercent.splice(0,this.resultpercent.length);
            this.resultarr.forEach((i)=>{
              let percent = Math.floor(i.v_num / this.result.totalVoteNum *100);
              this.resultpercent.push(percent);
            });
            this.showResults();
          }
        });
      },
//      计算投票结果百分比
      computedResults(){
        let totalVoteNum = 0;
        this.result.banner = this.obj.pic;
        this.result.title = this.obj.title;
        this.optionlist = this.obj.voteInfo.optionList;
        this.optionlist.forEach(i => {
          totalVoteNum += parseInt(i.v_num);
        });
        this.resultarr = this.optionlist;
        this.optionlist.forEach((i)=>{
          let percent = totalVoteNum ? Math.floor(i.v_num / totalVoteNum *100): 0;
          this.resultpercent.push(percent);
        });
        this.showResults();
      },
      toBack(){
        if(window.history.length > 1){
          this.$router.back();
        }else{
          this.$router.push('/');
        }
      },
      imgload(id){
        $('.load'+ id).hide();
      }
    }
  }

</script>

<style scoped lang="less">
  .vote{
    overflow: hidden;
    font-family: "Microsoft YaHei";
    font-size: 0.24rem;
    background-color:#ffffff;

    &_header{
      border-bottom: 0.2rem solid #f2f2f2;

      &-load{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 4rem;
        height: 75vw;
        text-align: center;
      }
      &-bg{
        display: block;
        width: 100%;
        height: 3rem;
        height: 60vw;
      }
      &-title{
        padding: 0.2rem 0.2rem;
        font-size: 0.28rem;
        color: #333333;
        font-weight: 700;
      }
      &-content{
        /*margin-top:0.2rem;*/
        padding: 0 0.2rem 0.3rem;
        font-size: 0.24rem;
        color: #666666;
      }
    }
    &_content{
      padding: 0.3rem 0.2rem 0;

      &-list{
        .vote_item{
          display: flex;
          margin-bottom: 0.2rem;
          background-color: #eeeeee;

          &:last-of-type{
            margin-bottom: 0.5rem;
          }
          &-img{
            display: block;
            width: 1.5rem;
            height:1.5rem;
          }
          &-middle{
            display: table;
            width:3.44rem;
            height:1.5rem;
            padding: 0 0.2rem;
            font-size: 0.26rem;
          }
          &-middle2{
            width: 4.94rem;
          }
          &-textwrap{
            display: table-cell;
            vertical-align: middle;
          }
          &-right{
            display: table;
            width: 0.48rem;
            height: 1.5rem;
            padding-right: 0.2rem;
          }
          &-checkwrap{
            display: table-cell;
            vertical-align: middle;
            text-align: left;
          }
          &-radio{

          }
          &-check{
            &:checked+.vote_item-style{
              background-color: #5e96d0;
              /*border:0.02rem solid #5e96d0;*/
            }
          }
          &-style,&-radiostyle{
            display: inline-block;
            width: 0.44rem;
            height: 0.44rem;
            text-align: center;
            border:0.02rem solid #d3d3d3;
            border-radius: 50%;
            background-color: #ffffff;
          }
          .radchecked{
            background-color: #5e96d0;
          }
          .icon-gou{
            font-size: 0.38rem;
            color: #ffffff;
          }
        }
      }

      &-btn{
        position: relative;
        height: 0.8rem;
        margin-bottom: 1.3rem;
        line-height: 0.8rem;
        font-size: 0.32rem;
        font-weight: 200;
        color: #ffffff;
        text-align: center;
        -webkit-border-radius:1rem;
        -moz-border-radius:1rem;
        border-radius:1rem;
        background-color: #5e96d0;
      }
      &-tip{
        position: fixed;
        bottom: 0;
        left: 0;
        z-index:60;
        width: 90%;
        padding:0.2rem 5% 0.12rem;
        border-top:0.02rem solid #dddddd;
        background-color: #ffffff;
      }
    }
    &_results{
      -webkit-overflow-scrolling:touch;
      overflow: scroll;
      position: fixed;
      left: 0;
      top:0;
      width: 100%;
      height: 100%;
      z-index: 50;
      background-color: #ffffff;
      &-head{
        position: relative;
      }
      &-img{
        display: block;
        width: 100%;
        height: 4rem;
      }
      &-title{
        position: absolute;
        left: 0.2rem;
        bottom: 0.3rem;
        font-size: 0.24rem;
        color: #f0fff4;
      }

      &-content{
        padding: 0.3rem 0.3rem 0.7rem;
      }
      &-name{
        font-weight: 700;
        margin-bottom: 0.4rem;
      }
      &-item{
        margin-bottom: 0.3rem;
      }
      &-left{
        display: inline-block;
        vertical-align: top;
        margin-right: 0.2rem;

        /*饼状图样式*/
        .loop1(@n) when (@n > 0){
          .loop1((@n - 1));
          .results-radius@{n}{
            background-color: #999999;
            transform: rotate(-180deg + 18deg * @n);
          }
        }
        .loop1(10);

        .loop2(@n) when (@n > 10){
          .loop2((@n - 1));
          .results-radius@{n}{
            background-color: #666666;
            transform: rotate(-180deg + 18deg * (@n - 10));
          }
        }
        .loop2(20);

        .results-radius-is0{
          transform: rotate(-180deg);
          background-color: #999999;
        }

        .results-radius-is100{
          background-color: #666666;
        }

      }
      &-pie{
        width: 0.7rem;
        height: 0.7rem;
        border-radius: 50%;
        background-color: #999999;
        overflow: hidden;
        &:before{
          content: '';
          display: block;
          width: 50%;
          height: 100%;
          margin-left: 50%;
          background-color: #666666;
          transform-origin:left;
          transform: rotate(0deg);
          overflow: hidden;
        }
      }
      &-pie0{
        &:before{
          display: none;
        }
      }
      .ischecked{
        background-color: #ffe9a5;
        &.vote_results-pie:before{
          background-color: #ffc71f;
        }
        .vote_results-percent{
          background-color: #ffe9a5;
        }

        .loop2(@n) when (@n > 10){
          .loop2((@n - 1));
          .results-radius@{n}{
            background-color: #ffc71f;
            transform: rotate(-180deg + 18deg * (@n - 10));
          }
        }
        .loop2(20);
        .results-radius-is100{
          background-color: #ffc71f;
        }
      }

      &-percent{
        display: block;
        width: 0.35rem;
        height: 0.7rem;
        margin-top: -0.7rem;
        transform-origin:right;
        transform: rotate(0deg);
        overflow: hidden;
      }

      &-right{
        display: inline-block;
        width:4.8rem;
      }
      &-num{
        display: block;
        margin-bottom: 0.06rem;
        font-size: 0.24rem;
        font-weight: 700;
      }
      &-text{
        font-size: 0.26rem;
        word-wrap:break-word;
      }

      &-tip{
        position: fixed;
        bottom: 0;
        /*影响动画*/
        /*left: 0;*/
        width: 90%;
        padding:0.2rem 5% 0.12rem;
        border-top:0.02rem solid #dddddd;
        background-color: #ffffff;
      }

    }

    &_logo{
      margin-top: 0.5rem;
      margin-bottom: 0.7rem;
      width: 100%;
    }
    .results-move-enter-active,.results-move-leave-active{
      transition:all 0.6s ease-in;
    }
    .results-move-enter,.results-move-leave-active{
      left: 100%;
    }
    /*评论*/
    .appraise-move-enter-active,.appraise-move-leave-active{
      transition:all 0.5s ease-in;
    }
    .appraise-move-enter,.appraise-move-leave-active{
      left: 100%;
    }




  }

</style>
