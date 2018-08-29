<template>
  <div class="vote">
    <div class="bg" v-if="editinfo" @click="noedit()"></div>
        <div class="infoedit" v-if="editinfo">
          <div class="infoedit-title">请完善资料</div>
          <div class="infoedit-tip">所有的精彩文章都带上你的个人信息，让客户主动找你买产品！</div>
          <div class="infoedit-inp1">
            <div class="infoedit-inp1-left">
              <img  src="/static/img/xingming@2x.png">
              <input id="name1" type="text" name="name1" :value="userinfo.my_name" placeholder="填写姓名">
            </div>
            <div class="inp1-right"></div>
          </div>
          <div class="infoedit-inp1">
            <div class="infoedit-inp1-left">
              <img  src="/static/img/phone1@2x.png">
              <input id="phnoe1" type="text" name="phnoe1" :value="userinfo.my_phone" placeholder="填写电话">
            </div>
            <div class="inp1-right"></div>
          </div>
          <div class="infoedit-btn">
            <div class="infoedit-btn-left" @click="noedit()">取消</div>
            <div class="infoedit-btn-right" @click="sendedit()">提交</div>
          </div>
        </div>
       <customInfo v-on:edit1="edit1" :userinfo="userinfo" :shareObj="shareObj" v-if="ifuserinfo"></customInfo>
    <div class="vote_header">
      <img  class="vote_header-bg" :src="obj.pic"  onerror="this.src=&quot;/static/img/1111.f2c6065.png&quot;" @load="imgload(obj.art_id)">
      <div :class="'load'+ obj.art_id" style="position: absolute;top: 0;left: 0;width: 100%;height: 3rem;height: 60vw;line-height:60vw;text-align: center;">加载中.........</div>
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
    <component :is="rootId"></component>
  </div>
</template>

<script>
  import {Indicator,Toast} from 'mint-ui';
  import comment from '@/components/publicPage/course/comment';
  import footer1 from '@/components/publicPage/footer1';
  import customInfo from '@/components/common/customInfo';
  import customNav from '@/components/common/custom/customNav';
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
        num:0,
        userinfo:[],
        ifuserinfo:false,
        editinfo:false,
        ifinfo:'0.2rem',
        ifinfo2:'1rem',
        shareObj:'',
        rootId:'',
        customArr:[''],
        infourl:'',
      }
    },
    created(){
      var self = this;
      this.global.shouquan();
      Indicator.open();
      this.postData('post','/shop-v1-index_get_root.html').then(res => {
        if(res.data.rootId && res.data.rootId != ''){
          this.rootId = this.customArr.indexOf(res.data.rootId) != -1?'Navigator':'customNav';
        }else{
          this.rootId= this.customArr.indexOf(this.$route.query.root_id) != -1 ? 'Navigator':'customNav';
        }
      });
//      this.getData('get','/shop-v1-article_vote_stat.html?art_id= &v_option_ids=1,3').then(res => {})

      this.url = '/shop-v1-article_detail.html?art_id='+this.$route.query.artid;
      this.getData('get',this.url).then(res => {
        
        if(res.status == 200){
//           是否已经投票
          if(res.data.is_voted){
            this.postResults(res.data.options);

          }else{
            var authorInfo = res.data.authorInfo;
            var authorInfoface = res.data.userInfo;
            console.log(authorInfo)
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
          self.share(self.obj.title,self.obj.content,self.obj.pic);
          self.postData('post','/shop-v1-index_basemsg.html').then(res => {
              var name = res.data.title
              var logo = res.data.logo
              if(self.$route.query.member_id == undefined){
                var data = {}
              }else{
                var data = {mid:self.$route.query.member_id}
              }
              self.postData('post','/shop-v2-st_msg.html',data).then(res => {
                if(res.data.status == 1){
                  self.userinfo = res.data;
                  self.ifuserinfo = true;
                  self.ifinfo = '1.2rem';
                  self.ifinfo2 = '2.2rem';
                  if(res.data.face==''){
                    var face = logo
                  }else{
                    var face = res.data.face
                  }
                  var sharename ='【'+res.data.name+'】-【'+name+'】' 
                  var sharephone = '联系电话：'+res.data.phone
                  console.log(sharename,sharephone,face)
                  // self.share(sharename,self.obj.content,face);
                }else if(res.data.status == 2){
                  self.ifuserinfo = true;
                  self.userinfo = res.data;
                  self.ifinfo = '1.2rem';
                  self.ifinfo2 = '2.2rem';
                  if(res.data.face==''){
                    var face = logo
                  }else{
                    var face = res.data.face
                  }
                  var sharename ='【'+res.data.name+'】-【'+name+'】' 
                  var sharephone = '联系电话：'+res.data.phone
                  console.log(sharename,sharephone,face)
                  // self.share(sharename,self.obj.content,face);
                }else if(res.data.status == 0){
                  self.ifuserinfo = false;
                  // self.share(self.obj.title,self.obj.content,self.obj.pic);
                }
              })
            })
        }
        Indicator.close();
      });
      
      var Url = window.location.search;
      var str = Url;
      str = str.substring(1,str.length);
      var arr = str.split("&");
      var obj = new Object();
      var urlsearch = '?';
      for(var i = 0; i < arr.length; i++) {
        var tmp_arr = arr[i].split("=");
        obj[decodeURIComponent(tmp_arr[0])] = decodeURIComponent(tmp_arr[1]);
        if(decodeURIComponent(tmp_arr[0]) != 'member_id'){
          if(urlsearch == '?'){
            urlsearch = urlsearch+decodeURIComponent(tmp_arr[0])+'='+decodeURIComponent(tmp_arr[1]);
          }else{
            urlsearch = urlsearch+'&'+decodeURIComponent(tmp_arr[0])+'='+decodeURIComponent(tmp_arr[1]);
          }
        }
      }
      this.infourl = urlsearch;
      console.log(this.infourl)

    },
    components:{comment,footer1,customInfo,customNav},
    methods:{
      edit1(){
        this.editinfo = true
      },
      noedit(){
        this.editinfo = false
      },
      sendedit(){
        var self = this;
        // console.log($('input[name=name1').val(),$('input[name=phnoe1').val())
        this.postData('post','/shop-v2-st_handle.html',{name:$('#name1').val(),phone:$('#phnoe1').val()}).then(res => {
          if(res.data.status){
            Toast(res.data.msg);
            setTimeout(function(){
              window.location.href = window.location.pathname + self.infourl
            },1000)
          }else{
            Toast(res.data.msg);
          }
        })
      },
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

        }else{
          Toast({
            message: '请勾选选项',
            position: 'middle',
            duration: 3000
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
    font-size: 0.24rem;
    background-color:#ffffff;
    .bg{
      width: 100%;
      height: 100vh;
      position: fixed;
      z-index: 1;
      background: rgba(0, 0, 0, 0.6);
    }
    .infoedit{
      width: 9rem;
      height: 9rem;
      background: #fff;
      position: fixed;
      margin: auto;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      width: 4.1rem;
      height: 4.2rem;
      z-index: 2;
      border-radius: 0.05rem;
      &-title{
        font-size: 0.29rem;
        font-weight: bold;
        text-align: center;
        margin-top: 0.32rem;
      }
      &-tip{
        font-size: 0.24rem;
        text-align: center;
        margin:0 0.36rem;
        margin-top: 0.2rem;
        margin-bottom: 0.2rem;
      }
      &-inp1{
        margin:0 0.36rem;
        margin-bottom: 0.25rem;
        border-bottom: 1px solid #999;
        &-left{
          input{
            border: 0px;
            width: 2.8rem;
            outline-style: none;
            margin-bottom: 0.15rem;
            padding-top: 0.15rem;
            font-size: 0.23rem;
          }
          img{
            width: 0.255rem;
            height: 0.255rem;
            margin-right: 0.1rem;
            position: relative;
            top: 0.03rem;
          }
        }
      }
      &-btn{
        display: flex;
        font-size: 0.24rem;
        justify-content: space-between;
        margin: 0 0.36rem;
        margin-top: 0.3rem;
        &-left,&-right{
          width: 50%;
          text-align: center;
        }
        &-left{
          border-right: 1px solid #eee;
        }
        &-right{
          color:#5A8EC4;
        }
      }
    }
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
        bottom: 0.96rem;
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
