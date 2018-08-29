<template>
  <div class="articles" id="articles" v-infinite-scroll="loadMore"
       infinite-scroll-disabled="false"
       infinite-scroll-immediate-check="false"
       infinite-scroll-distance="20">
    <div class="articles_header">
      <img  class="articles_header-bg" :src="arr.pic" onerror="this.src=&quot;/static/img/1111.f2c6065.png&quot;" @load="imgload(arr.art_id)">
      <div :class="'load'+ arr.art_id"
           style="position: absolute;
                          top: 0;
                          left: 0;
                          width: 100%;
                          height: 4rem;
                          height: 65vw;
                          line-height:65vw;
                          font-size: 0.3rem;
                          text-align: center;"
      >加载中.........</div>
      <div class="articles_header-title">
        {{arr.title}}
      </div>
    </div>

    <div class="articles_content">

      <div class="articles_content-audiowrap" v-if="audiois">
        <!--<iframe class="articles_content-audio" src="" frameborder="1" allowfullscreen="true" allowtransparency="true"></iframe>-->
      </div>

      <div class="articles_content-text" v-html="arr.content">
        {{arr.content}}
      </div>

      <!-- 提示需要付款 -->
      <div class="paytip" v-if="ifpay">
        <i class="icon iconfont icon-qian" style="color:red;"></i>
        <div style="margin-top:0.1rem;">本内容需要付费后才能阅读全文~</div>
      </div>

      <div class="articles_foot" v-for="item in recommendlist">
        <a class="articles_foot-wrap" @click="toArticles(item.art_id,item.article_type)">
          <div class="articles_foot-textwrap">
            <div class="articles_foot-title"><span>{{item.title}}</span></div>
            <div class="articles_details">
              <div class="articles_details-left">
                <span class="articles_details-comment">
                <!-- <i class="icon iconfont icon-pinglun"></i> -->
                <img src="../../../../static/img/home/home_comment.png">
                &nbsp{{item.comment_num}}
                </span>
                <span class="articles_details-collect">
                <!-- <i class="icon iconfont icon-aixin"></i> -->
                <img src="../../../../static/img/home/home_Collection.png">
                &nbsp{{item.collect_num}}
                </span>
              </div>
              <!--<div class="articles_details-right">-->
              <!--<span class="articles_details-time">{{2}}小时前</span>-->
              <!--<span class="articles_details-type">设计</span>-->
              <!--</div>-->
            </div>
          </div>
          <div class="articles_foot-imgwrap">
            <img class="articles_foot-img" :src="item.pic" alt="图片未成功加载" onerror="this.src=&quot;/static/img/1111.f2c6065.png&quot;">
          </div>
        </a>
      </div>

      <!--<comment ref="appraise" :textValue="areaValue"></comment>-->
      <div class="comment" ref="comment">
        <div class="comment_content">
          <!-- <div class="comment_content-title">
            最新评论
          </div> -->
          <div class="course-title"><i class="icon iconfont icon-sanjiaoxing-right"></i>最新评论</div>
          <ul>
            <li class="comment_item"
                style="text-align: center;font-size: 0.3rem;color: #999999;padding-bottom:1rem;" v-if="commentNo">
              —— &nbsp还没有评论&nbsp ——
            </li>
            <li class="comment_item" v-for="(item,index) in commentarr">
              <!-- <div class="comment_item-top">
                <img class="comment_item-portrait" :src="item.face"/>
                <span class="comment_item-name">{{item.nickname}}</span>
                <span class="comment_item-up" @click="toSupported(item.cmt_id)">
                  <span class="comment_item-uptext" :class="'comment_num'+item.cmt_id">
                    {{item.support_count}}
                  </span>
                  <i class="icon iconfont comment_item-icon " :class="[(item.is_supported ? 'icon-dianzan':'icon-dianzan2'),('comment_icon'+item.cmt_id)]"></i>
                </span>
              </div>
              <div class="comment_item-text">{{item.content}}</div> -->
              <div class="comment_item-img">
                <img :src="item.face"/>
              </div>
              <div class="comment_item-info">
                  <div class="comment_item-info-name">
                    {{item.nickname}}
                    <div class="comment_item-info-name-num">
                      <span class="comment_item-uptext" :class="[('comment_num'+item.cmt_id)]" :style="{color:item.is_supported?'#fe5875':'#777'}">
                        {{item.support_count}}
                      </span>
                      <!-- <i @click="toSupported(item.cmt_id,$event)" class="icon iconfont comment_item-icon " :class="[(item.is_supported ? 'icon-dianzan':'icon-dianzan2'),('comment_icon'+item.cmt_id)]"></i> -->

                      <!-- 没点赞 -->
                      <img @click="toSupported(item.cmt_id,$event)" class="comment_item-info-name-num-img comment_item-info-name-num-img1" src="../../../../static/img/home/home_Thumb.png" :style="{display:item.is_supported==1?'none':'inline-block'}">
                      <!-- 已点赞 -->
                      <img @click="toSupported(item.cmt_id,$event)" class="comment_item-info-name-num-img comment_item-info-name-num-img2" src="../../../../static/img/home/home_Thumb_hover.png" :style="{display:item.is_supported==0?'none':'inline-block'}">
                    </div>
                  </div>
                  <div class="comment_item-info-text">{{item.content}}</div>
              </div>
            </li>
          </ul>
          <div class="comment_bottomtip" v-if="!isload&&!commentNo">
            <loadNo></loadNo>
          </div>
        </div>
      </div>

      <div class="articles_content-logo">
        <footer1></footer1>
      </div>
      <transition name="backTop-move">
        <div class="articles_content-backTop" @click="toTop()" v-if="topIs" v-show="false">
          <div class="articles_backTop-icon">
            <i class="icon iconfont icon-shangla"></i>
          </div>
          Top
        </div>
      </transition>

    </div>


    <div class="articles_bottom" :class="commentIs ? 'articles_bottomcol':''">
      <div class="articles_bottom-left" v-if="!commentIs">
          <!-- <span class="articles_bottom-back" @click="toBack()">
            <i class="icon iconfont icon-fanhui"></i>
          </span> -->
        <div class="articles_bottom-comment" @click="toComment()" >
          <!-- v-if="arr.enable_comment" -->
          <div class="articles_bottom-comment-dan" v-if="!arr.enable_comment"></div>
          <span style="display:inline-block;font-size:0.26rem;color:#ccc;line-height:0.6rem;">写下你的评论</span>
        </div>
      </div>
      <div class="articles_bottom-right" v-if="!commentIs" >
        <span class="articles_bottom-huihua1" @click="scrollComment()">
          <!-- <i class="icon iconfont icon-huihua1"></i> -->
          <img src="../../../../static/img/home/home_comment.png" style="height:0.4rem;">
          <span style="position:relative;font-size:0.24rem;top:-0.12rem;">{{arr.comment_num}}</span>
        </span>
        <span class="articles_bottom-dianzantianchong" @click="toCollected()">
          <!-- <i class="icon iconfont " :class="collectedis ? 'icon-dianzantianchong': 'icon-aixin'"></i> -->
          <img src="../../../../static/img/home/home_Collection.png" style="height:0.4rem;" :style="{display:collectedis==1?'none':'inline-block'}">
          <img src="../../../../static/img/home/home_Collection_hover.png" style="height:0.4rem;" :style="{display:collectedis==0?'none':'inline-block'}">
          <span style="position:relative;font-size:0.24rem;top:-0.12rem;" :style="{color:collectedis==1?'#ef4949':'#777'}">{{arr.collect_num}}</span>
        </span>
      </div>
      <div class="articles_comment" v-if="commentIs">
        <div class="articles_comment-header">
          <span style="padding: 0 0.6rem 0 0.1rem" @click="toComment()">关闭</span>
          <span class="articles_comment-title">评论</span>
          <span style="padding: 0 0.1rem 0 0.6rem" @click="getComment()">发送</span>
        </div>
        <textarea class="articles_comment-input"  ref="area" placeholder="在这里留言" maxlength="140"></textarea>

      </div>
    </div>

    <!-- 需付费显示付费按钮 -->
    <div class="articles_needpay" @click="topay(arr.art_id)" v-if="ifpay">
      立即购买{{arr.total_fee?'￥':''}}{{arr.total_fee}}
    </div>
    <!--<transition name="appraise-move">-->
      <!--<comment ref="appraise"></comment>-->
    <!--</transition>-->

  </div>
</template>

<script>
  import {Indicator} from 'mint-ui';
  import footer1 from '@/components/common/footer1';
  import loadNo from '@/components/common/loadNo';
  import wx from 'weixin-js-sdk';
  import axios from 'axios';
  import qs from 'qs'

  export default {
      data(){
        return {
          arr:{},
          arruser:{},
          recommendlist:[],
          artid:'',
          url:'',
          collectedis:false,
          audiois:false,
          mountedis:false,
          topIs:true,
          osTop:0,
          areaValue:'',
          commentarr:[],
          commenturl:'',
          commentpage:1,
          commentIs:false,
          commentNo:false,
          supportis:[],
          supaddnum:[],
          supsubnum:[],
          supportnum:[],
          isload:true,
          ifpay:false,
        }
      },
    created(){
      var self = this;
      this.global.shouquan();
      Indicator.open();
      this.audiois = this.$route.query.artid == 4 ? true:false;
      this.url = '/shop-v1-article_detail.html?art_id='+this.$route.query.artid;
      this.getData('get',this.url).then(res => {
          if(res.status == 200){
            this.arr = res.data;
            this.arruser = this.arr.userInfo;
            this.audiois = this.arr.audio_path == '' ? false:true;
            //            console.log(this.arr);
            //            console.log(this.arr.content);
                        this.recommendlist = this.arr.recommendList;
                        this.collectedis = this.arr.is_collected;
            //            console.log(this.arr.is_collected);
            document.title = this.arr.title;
            if(this.mountedis){
              setTimeout(function () {
                $('.articles_content-text img').css({'max-width':'100%'});
              },0);
            }
            //        图片显示

            this.share(this.arr.title,this.arr.desc,this.arr.pic);

            if(res.data.is_free == 0){
              self.$nextTick(function(){
                self.ifpay = true;
              })
            }
            Indicator.close();
          }
      });
      //   评论加载
      this.commenturl = '/shop-v1-article_get_comment_lst.html?art_id='+this.$route.query.artid+';page='+this.commentpage;
      this.getData('get',this.commenturl).then(res => {
        if(res.status == 200){
          if(res.data.length){
            this.commentNo = false;
            this.commentarr = res.data;
            this.likeComment(0);
            if(res.data.length < 10){
              this.isload = false;
            }
          }else{
            this.commentNo = true;
          }
        }
      });
      this.getData('post','/shop-v2-history_record.html',{type:3,id:self.$route.query.artid}).then(res => {
        
      })
      

    },

    mounted(){
      var self = this;
      // axios.post('/shop-v1-pay_jssign.html',qs.stringify({url:window.location.href})).then(function(res){
      //   axios.post('shop-v1-index_get_root.html').then(function(res1){
      //     if(window.location.href.indexOf('root_id=') == -1){
      //       if(window.location.href.indexOf('?') != -1){
      //         res.data.sign.url = res.data.sign.url + '&root_id=' + res1.data.rootId
      //       }else{
      //         res.data.sign.url = res.data.sign.url + '?root_id=' + res1.data.rootId
      //       }
      //     }
      //     console.log(res.data.sign.url)
      //     wx.config({
      //       debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      //       appId: res.data.sign.appId, // 必填，公众号的唯一标识
      //       timestamp: res.data.sign.timestamp, // 必填，生成签名的时间戳
      //       nonceStr: res.data.sign.nonceStr, // 必填，生成签名的随机串
      //       signature: res.data.sign.signature,// 必填，签名
      //       jsApiList: ['onMenuShareAppMessage','onMenuShareTimeline','onMenuShareQQ','onMenuShareWeibo','onMenuShareQZone'] // 必填，需要使用的JS接口列表
      //     });
      //     wx.ready(function(){
      //       wx.onMenuShareAppMessage({
      //           title: self.arr.title,
      //           desc: self.arr.desc,
      //           link: res.data.sign.url,
      //           imgUrl: self.arr.pic
      //       });
      //       wx.onMenuShareTimeline({
      //         title: self.arr.title,
      //         link: res.data.sign.url,
      //         imgUrl: self.arr.pic
      //       });
      //     });
      //   })
      // })
  //      判断是否加载
      if(this.arr.title != undefined){
        setTimeout(function () {
          $('.articles_content-text img').css({'width':'100%'});
        },0);
      }else{
        this.mountedis = true;
      }
  //    屏幕滚动触发
      window.addEventListener('scroll', this.scrollTop);

    },
    components:{loadNo,footer1},
    methods:{
      // 点击付款
      topay(id){
        this.$router.push({path:'/toPay',query:{'art_id':id,'type':10}})
      },
  //      文章推荐点击跳转
      toArticles(id,type){
        switch(type) {
          case 1:
            this.$route.query.artid = id;
            this.url = '/shop-v1-article_detail.html?art_id='+id;
            this.getData('get',this.url).then(res => {
                if(res.status == 200){
                  this.arr = res.data;
                  this.arruser = this.arr.userInfo;
  //                  console.log(this.arr);
                  this.recommendlist = this.arr.recommendList;
                  this.collectedis = this.arr.is_collected;
  //                  console.log(this.recommendlist[0]);
                  document.title = this.arr.title;
                  setTimeout(function () {
                    $('.articles_content-text img').css({'width':'100%'});
                  },0);
                  this.share(this.arr.title,this.arr.desc,this.arr.pic);
                  $(window).scrollTop(0);
                }

            });
            break;
          case 2:
            this.$router.push({path: "/mine-course-vote", query: {artid: id}})
            break;
          case 3:
            this.$router.push({path: "/mine-course-mesay", query: {artid: id}})
            break;
        }
      },
  //     文章收藏
      toCollected(){
        this.postData('post','/shop-v1-article_collect.html',{art_id:this.$route.query.artid}).then(res => {
  //          console.log(res.data);
  //          this.getData('get',this.url).then(res => {
  //            this.arr = res.data;
  //            this.collectedis = this.arr.is_collected;
  //            console.log(this.arr);
  //          });

          this.collectedis = !this.collectedis;
          this.collectedis ? this.arr.collect_num++:this.arr.collect_num--;
        });
      },
  //     返回
      toBack(){
        if(window.history.length > 1){
          this.$router.back();
        }else{
          this.$router.push('/');
        }
      },
  //     滚动至评论块
      scrollComment(){
        if(this.commentarr.length < 5){
          this.toScroll(this.$refs.comment.offsetTop-300);
        }else{
          this.toScroll(this.$refs.comment.offsetTop);
        }
      },
  //     返回文章顶部
      toTop(){
        this.toScroll(0);
        this.topIs = false;
      },
  //     滚动函数
      toScroll(offset){
        clearInterval(timer);
        let footTop = offset;
        let firstTop = document.documentElement.scrollTop || document.body.scrollTop;

        var timer = setInterval(function(){
          let osTop = document.documentElement.scrollTop || document.body.scrollTop;
          let speed =footTop > firstTop?Math.floor( (osTop-footTop) / 4): Math.ceil( (osTop-footTop) / 4);
          document.documentElement.scrollTop = document.body.scrollTop = osTop - speed;
          if(footTop > firstTop){
            if(osTop >= footTop){
              clearInterval(timer);
            }
          }else{
            if(osTop <= footTop){
              clearInterval(timer);
            }
          }

        },30);
      },
  //     判断当前滚动距离
      scrollTop(){
        this.osTop = document.documentElement.scrollTop || document.body.scrollTop;
        this.topIs = this.osTop > 500 ? true : false;
      },
      imgload(id){
        $('.load'+ id).hide();
      },
      loadMore(){
        if(this.isload){
          this.commentpage++;
          this.commenturl = '/shop-v1-article_get_comment_lst.html?art_id='+this.$route.query.artid+'&page='+this.commentpage;
          this.getData('get',this.commenturl).then(res => {
            if(res.status == 200){
  //                console.log(res.data);
              if(res.data.length){
                this.commentarr = this.commentarr.concat(res.data);
                let firstLen = this.commentarr.length - res.data.length;
                this.likeComment(firstLen);
              }else{
                this.isload = false;
              }
  //                console.log(this.commentarr);
            }
          });
        }
      },
  //     评论框显示
      toComment(){
        if(this.arr.enable_comment != 0){
          this.commentIs = !this.commentIs;
        }
      },
  //     提交评论
      getComment(){
        let context = this.$refs.area.value;
        if(context.length){
          this.postData('post','/shop-v1-article_do_comment.html',{art_id:this.$route.query.artid,content:context}).then(res => {
            if(res.data.status==1){
              this.isload = true;
              this.commentpage = 1;
              this.commenturl = '/shop-v1-article_get_comment_lst.html?art_id='+this.$route.query.artid+'&page='+this.commentpage;
              this.getData('get',this.commenturl).then(res => {
                if(res.status == 200){
                    this.arr.comment_num++;
                    this.commentarr = res.data;
                    this.likeComment(0);
                    this.commentNo = false;
                    Toast({
                      message:'评论成功',
                      duration: 5000
                    });
                }
              });
            }else{
              Toast({
                message: res.data.msg,
                duration: 5000
              });
            }
          })
        }

        this.$nextTick(function () {
          this.commentIs = !this.commentIs;
        });
      },
  //     点赞
      toSupported(id,event){
        let supId = id;
        console.log()
  //        console.log('supportis',this.supportis[supId]);
        this.postData('post','/shop-v1-article_sup_comment.html',{c_id:supId}).then(res => {

          if(res.status ==200){
  //              console.log(res.data);
            if(res.data.status == 2){
              $(event.target).closest('.comment_item-info-name-num').eq(0).find('span').css('color','#777')
              $(".comment_icon"+supId).removeClass("icon-dianzan");
              $(".comment_icon"+supId).addClass("icon-dianzan2");
              $('.comment_item-uptext')
              this.supportis[supId] = 0;
              $(event.target).closest('.comment_item-info-name-num').eq(0).find('.comment_item-info-name-num-img2').eq(0).css({display:'none'})
              $(event.target).closest('.comment_item-info-name-num').eq(0).find('.comment_item-info-name-num-img1').eq(0).css({display:'inline-block'})
            }else{
              $(event.target).closest('.comment_item-info-name-num').eq(0).find('span').css('color','#fe5875')
              $(".comment_icon"+supId).addClass("icon-dianzan");
              $(".comment_icon"+supId).removeClass("icon-dianzan2");
              this.supportis[supId] = 1;
              console.log(1)
              $(event.target).closest('.comment_item-info-name-num').eq(0).find('.comment_item-info-name-num-img1').eq(0).css({display:'none'})
              $(event.target).closest('.comment_item-info-name-num').eq(0).find('.comment_item-info-name-num-img2').eq(0).css({display:'inline-block'})
            }
  //              console.log('supportis',this.supportis[supId]);
  //              console.log(supId,this.supaddnum[supId],this.supsubnum[supId]);
            if(this.supportis[supId]){
              $(".comment_num" + supId).html(this.supaddnum[supId]);
            }else{
              $(".comment_num" + supId).html(this.supsubnum[supId]);
            }
          }
        });
      },
  //     评论点赞
      likeComment(firstlen){
        let fLen = firstlen;

        for(let i = fLen,len = this.commentarr.length;i<len;i++){
          let id = this.commentarr[i].cmt_id;
          this.supportis[id] = this.commentarr[i].is_supported;
          if(this.commentarr[i].is_supported){
            this.supaddnum[id] = this.commentarr[i].support_count;
            this.supsubnum[id] = this.commentarr[i].support_count - 1;
          }else{
            this.supaddnum[id] = this.commentarr[i].support_count + 1;
            this.supsubnum[id] = this.commentarr[i].support_count;
          }
        }
      }
    }
  }
</script>

<style scoped lang="less">

  .articles{
    // font-family: "Microsoft YaHei";
    overflow: hidden;
    padding-bottom: 0.9rem;
    font-size: 0.24rem;
    /*background-color:#ffffff;*/
    .paytip{
      width: 100%;
      height: auto;
      background-color: #fff;
      text-align: center;
      color: #999;
      padding-bottom: 0.5rem;
    }
    .articles_needpay{
      height: 0.8rem;
      width: 100%;
      position: fixed;
      z-index: 1;
      background-color: #fe5875;
      bottom: 0;
      color: #fff;
      font-size: 0.24rem;
      text-align: center;
      line-height: 0.8rem;
      overflow: hidden;
    }

    &_header{
      /*font-size: 0.24rem;*/
      /*border-bottom: 0.08rem solid #F7F7F7;*/
      background-color:#ffffff;

      &-bg{
        display: block;
        width: 100%;
        /*min-height:4rem;*/
        /*min-height:40vh;*/
      }

      &-title{
        /*line-height: 1.5;*/
        /*margin-bottom: 0.4rem;*/
        padding: 0.2rem 0.2rem 0;
        font-size: 0.38rem;
        color: #333333;
        font-weight: 500;
      }

      &-author{
        display: -webkit-box;
        display: -moz-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;

        -webkit-box-pack: justify;
        -moz-justify-content: space-between;
        -webkit-justify-content: space-between;
        justify-content: space-between;

        padding: 0 0.2rem;
        font-size: 0.26rem;
      }
      &-icon{
        width: 0.5rem;
        height:0.5rem;
        vertical-align: middle;
        border-radius: 50%;
      }
      &-name{
        padding-left: 0.2rem;
        color: #666666;
      }
      /*&-time{*/
        /*color: #999999;*/
      /*}*/
    }

    &_content{
      .icon-sanjiaoxing-right{
        font-size: 0.3rem;
        margin-right: 0.1rem;
        margin-left: -0.1rem;

      }
      .course-title{
        font-size: 0.38rem;
        color: #222;
        padding-top: 0.4rem;
        font-weight: 500;
        span{
          display: inline-block;
          font-size: 0.26rem;
          color: #666;
          float: right;
          line-height: 0.5rem;
          margin-right: 0.3rem;
        }
      }
      &-text{
        padding: 0.5rem 0.2rem;
        font-size: 0.30rem;
        color: #333333;
        word-wrap:break-word;
        // border-bottom: 0.02rem solid #dddddd;
        background-color:#ffffff;

      }
      .articles_foot{
        &-wrap{
          display: -webkit-box;
          display: -moz-box;
          display: -ms-flexbox;
          display: -webkit-flex;
          display: flex;
          border-top: 0.2rem solid #f2f2f2;
          background-color: #ffffff;
        }

        &-img{
            display: block;
            width: 2.9rem;
            height: 2rem;
        }

        &-textwrap{
          display: -webkit-box;
          display: -moz-box;
          display: -ms-flexbox;
          display: -webkit-flex;
          display: flex;

          flex: 1;
          -webkit-box-direction: normal;
          -webkit-box-orient: vertical;
          -moz-flex-direction: column;
          -webkit-flex-direction: column;
          flex-direction: column;

          padding: 0.2rem 0.1rem 0.2rem 0.3rem;
        }
        &-title{
          -webkit-box-flex: 1.0;
          -moz-flex-grow: 1;
          -webkit-flex-grow: 1;
          flex-grow: 1;

          /*line-height: 1.7;*/
          font-size: 0.26rem;
          color: #333333;
        }
        .articles_details{
          font-size:0.2rem;
          font-weight: 200;
          color: #666666;

          &-left{
            float: left;
            font-size: 0.24rem;
            color: #999999;
          }
          &-comment,&-collect{
            padding-right: 0.3rem;
            img{
              height: 0.3rem;
              position: relative;
              top: 0.05rem;
            }
          }

          .icon-pinglun{
            font-size: 0.3rem;
          }
          .icon-aixin{
            font-size: 0.3rem;
            color:#999999;
          }
          /*&-right{*/
            /*float: right;*/
          /*}*/
          /*&-time{*/
            /*padding-right: 0.1rem;*/
          /*}*/
        }
      }
      &-logo{
        width: 100%;
      }
      &-backTop{
        position: fixed;
        right: 0.4rem;
        bottom: 1rem;
        padding: 0.1rem 0.1rem;
        font-size: 0.24rem;
        font-weight: bold;
        text-align: center;
        border-radius: 0.1rem;
        background-color: #dedede;
        opacity: 0.5;
      }
    }

    .comment{
      margin-top: 0.2rem;
      background-color: #ffffff;
      &_content{
        padding:0rem 0.3rem 0rem 0.3rem;
        &-title{
          padding-bottom: 0.2rem;
          font-size: 0.26rem;
          color: #999999;
        }
      }
      &_item:last-child{
        .comment_item-info-text{
          border-bottom: 0;
        }
      }
      &_item{
        margin-top: 0.4rem;
        overflow: auto;
        &-img{
          display: inline-block;
          vertical-align: top;
          img{
            width: 0.8rem;
            height: 0.8rem;
            border-radius: 50%;
          }
        }
        &-info{
          width: calc(~"100% - 1.02rem");
          display: inline-block;
          float: right;
          vertical-align: top;
          .icon-dianzan{
            color:  #fe5875;
          }
          &-text{
            margin-top: 0.15rem;
            font-size: 0.26rem;
            padding-bottom: 0.38rem;
            color: #666;
            border-bottom:1px solid #eee;
          }
          &-name{
            font-size: 0.28rem;
            &-num{
              float: right;
              display: inline-block;
              vertical-align: top;
              position: relative;

              // top: -0.08rem;
              &-img{
                height: 0.3rem;
                width: 0.3rem;
              }
            }
          }
        }
        &-portrait{
          width: 0.8rem;
          height:0.8rem;
          vertical-align: middle;
          margin-right: 0.2rem;
          border:0;
          -webkit-border-radius:50%;
          -moz-border-radius:50%;
          border-radius:50%;
        }
        &-name{
          color: #333333;
          font-size: 0.28rem;
          margin-right: 0.2rem;
          max-width: 2rem;
          white-space:nowrap;
          text-overflow:ellipsis;
          -o-text-overflow:ellipsis;
          overflow:hidden;
          display: inline-block;
          vertical-align: top;
        }
        &-time{
          color: #999999;
          font-size: 0.24rem;
        }
        &-up{
          float: right;
          margin-right: 0.2rem;
          font-size: 0.24rem;
          color: #999999;

          .comment_item-icon{
            margin-left: 0.1rem;
          }
          .icon-dianzan{
            color:  #fe5875;
          }

        }
        &-text{
          margin-left:0.85rem;
          padding:0.1rem 0 0.4rem 0;
          font-size: 0.26rem;
          color: #333333;
          border-bottom: 0.02rem solid #eeeeee;
        }

        &-revert{
          margin-left:0.85rem;
          margin-top: 0.2rem;
        }
      }
      &_tip{
        position: fixed;
        bottom: 0;
        left: 0;
        width: 90%;
        z-index: 300;
        padding:0.2rem 5% 0.1rem;
        border-top:0.02rem solid #dddddd;
        background-color: #ffffff;
        text-align: center;

        .icon-fanhui,.icon-pinglun2{
          font-size: 0.38rem;
          color: #666666;
        }
      }
    }

    .articles_bottomcol{
      background-color: #f1f2f6;
    }
    &_bottom{
      display: -webkit-flex;
      display: flex;
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      font-size: 0.24rem;
      color: #707070;
      border-top:1px solid #dddddd;
      background-color: #ffffff;
      // height: 0.9rem;
      &-left{
        // display: -webkit-flex;
        // display: flex;
        // -webkit-flex: 1.0;
        // flex:1;
      }
      &-comment{
        // -webkit-flex: 1.0;
        // flex: 1;
        margin: 0 0.3rem;
        width: 3.90rem;
        padding: 0 0.15rem;
        border: 1px solid #ccc;
        height: 0.6rem;
        margin-top: 0.15rem;
        border-radius: 3px;
        margin-bottom: 0.15rem;
        position: relative;
        &-dan{
          position: absolute;
          top: -0.15rem;
          left: -0.2rem;
          width: 5rem;
          height: 1rem;
          background: #fff;
        }
        .icon-pinglun1{
          font-size: 0.24rem;
        }
      }
      .articles_comment{
        flex: 1;
        &-header{
          display: -webkit-flex;
          display: flex;
          padding-bottom: 0.2rem;
          padding-top: 0.2rem;
        }
        &-title{
          flex: 1;
          text-align: center;
          font-weight: bold;
          color: #000000;
        }
        &-input{
          width: 100%;
          height: 3rem;
          height: 25vh;
          background-color: #ffffff;
          border: none;
          resize : none;
          &:focus{
            outline: none;
          }
        }
      }


      .icon-fanhui{
        font-size: 0.4rem;
        color: #666;
        margin-top: 0.26rem;
        display: inline-block;

      }
      .icon-huihua1{
        font-size: 0.4rem;
        color: #666;
        margin-top: 0.26rem;
        display: inline-block;
        margin-left: 0.2rem;
      }

      .icon-dianzantianchong,.icon-aixin{
        font-size: 0.36rem;
      }
      .icon-dianzantianchong{
        color: #fe5875;
      }

      &-huihua1,&-dianzantianchong{
        margin-right: 0.2rem;
        margin-left: 0.35rem;
        img{
          margin-top: calc(~"0.29rem")
        }
      }

    }

    .backTop-move-enter-active,.backTop-move-leave-active{
      transition:all 1s ease-in;
    }
    .backTop-move-enter,.backTop-move-leave-active{
      opacity: 0;
    }

  }


</style>
