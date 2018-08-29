<template>
  <div class="articles" id="articles" v-infinite-scroll="loadMore"
       infinite-scroll-disabled="false"
       infinite-scroll-immediate-check="false"
       infinite-scroll-distance="20">
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
    <div class="articles_header">
      <img class="articles_header-bg" :src="arr.pic" onerror="this.src=&quot;/static/img/1111.f2c6065.png&quot;"
           @load="imgload(arr.art_id)">
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
      >加载中.........
      </div>
      <div class="articles_header-title">
        {{arr.title}}
      </div>
    </div>

    <div class="articles_content">

      <div class="articles_content-audiowrap" v-if="audiois">
        <iframe style="height: 1.7rem;" class="articles_content-audio" :src="aduiourl" frameborder="1" allowfullscreen="true" allowtransparency="true"></iframe>
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
                <i class="icon iconfont icon-pinglun"></i>
                &nbsp{{item.comment_num}}
                </span>
                <span class="articles_details-collect">
                <i class="icon iconfont icon-aixin"></i>
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
            <img class="articles_foot-img" :src="item.pic" alt="图片未成功加载"
                 onerror="this.src=&quot;/static/img/1111.f2c6065.png&quot;">
          </div>
        </a>
      </div>

      <!--<comment ref="appraise" :textValue="areaValue"></comment>-->
      <div class="comment" ref="comment">
        <div class="comment_content">
          <div class="comment_content-title">
            最新评论
          </div>
          <ul>
            <li class="comment_item"
                style="text-align: center;font-size: 0.3rem;color: #999999;padding-top:1rem;" v-if="commentNo">
              —— &nbsp还没有评论&nbsp ——
            </li>
            <li class="comment_item" v-for="(item,index) in commentarr">
              <div class="comment_item-top">
                <img class="comment_item-portrait" :src="item.face"/>
                <span class="comment_item-name">{{item.nickname}}</span>
                <!--<span class="comment_item-time">1小时前</span>-->
                <span class="comment_item-up" @click="toSupported(item.cmt_id)">
              <span class="comment_item-uptext" :class="'comment_num'+item.cmt_id">
                {{item.support_count}}
              </span>
              <i class="icon iconfont comment_item-icon "
                 :class="[(item.is_supported ? 'icon-dianzan':'icon-dianzan2'),('comment_icon'+item.cmt_id)]"></i>
                  <!--:class="supportis[item.cmt_id] ? 'comment_supported':''"-->
            </span>
              </div>
              <div class="comment_item-text">{{item.content}}</div>
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
        <div class="articles_content-backTop" @click="toTop()" v-if="topIs">
          <div class="articles_backTop-icon">
            <i class="icon iconfont icon-shangla"></i>
          </div>
          Top
        </div>
      </transition>

    </div>


    <div class="articles_bottom" :class="commentIs ? 'articles_bottomcol':''" style="bottom:0.96rem;">
      <div class="articles_bottom-left" v-if="!commentIs">
          <span class="articles_bottom-back" @click="toBack()">
            <i class="icon iconfont icon-fanhui"></i>
          </span>
        <div class="articles_bottom-comment" @click="toComment()">
          <div class="articles_bottom-comment-dan" v-if="!arr.enable_comment"></div>
          <span>
            <i class="icon iconfont icon-pinglun1"></i>
          </span>
          写评论
        </div>
      </div>
      <div class="articles_bottom-right" v-if="!commentIs">
        <span class="articles_bottom-huihua1" @click="scrollComment()">
          <i class="icon iconfont icon-huihua1"></i>
          {{arr.comment_num}}
        </span>
        <span class="articles_bottom-dianzantianchong" @click="toCollected()">
          <i class="icon iconfont " :class="collectedis ? 'icon-dianzantianchong': 'icon-aixin'"></i>
          {{arr.collect_num}}
        </span>
      </div>
      <div class="articles_comment" v-if="commentIs">
        <div class="articles_comment-header">
          <span style="padding: 0 0.6rem 0 0.1rem" @click="toComment()">关闭</span>
          <span class="articles_comment-title">评论</span>
          <span style="padding: 0 0.1rem 0 0.6rem" @click="getComment()">发送</span>
        </div>
        <textarea class="articles_comment-input" ref="area" placeholder="在这里留言" maxlength="140"></textarea>

      </div>
    </div>

    <!-- 需付费显示付费按钮 -->
    <div class="articles_needpay" @click="topay(arr.art_id)" v-if="ifpay">
      立即购买{{arr.total_fee ? '￥' : ''}}{{arr.total_fee}}
    </div>
    <!--<transition name="appraise-move">-->
    <!--<comment ref="appraise"></comment>-->
    <!--</transition>-->
    <!--文章邀请卡开始-->
    <div class="share" @click="inviteclick()" :style="{top:ifinfo}">
      <i class="iconfont icon-qiapianx" style="color:#fff;"></i>
      <span style="font-size: 0.2rem">{{dist_money}}</span>
    </div>
    <!--文章邀请卡结束-->

    <!--文章关联商品开始  -->
    <div class="relation" @click="relation()" v-show="is_relation" :style="{top:ifinfo2}">
      <i class="iconfont icon-gouwu"></i>
      <span>{{numData}}</span>
    </div>
    <goodsRelation :goodsObj="relationData" :isShow="isShowGoods" :showId="shop_id"></goodsRelation>
    <!--文章关联商品结束-->
    <component :is="rootId"></component>
  </div>
</template>

<script>
  import {Indicator,Toast} from 'mint-ui';
  import footer1 from '@/components/publicPage/footer1';
  import loadNo from '@/components/common/loadNo';
  import goodsRelation from '@/components/common/goodsRelation/goodsRelation'
  import wx from 'weixin-js-sdk';
  import axios from 'axios';
  import qs from 'qs'
  import store from '@/vuex/store'
  import customInfo from '@/components/common/customInfo';
  import customNav from '@/components/common/custom/customNav';

  export default {
    data(){
      return {
        arr: {},
        arruser: {},
        recommendlist: [],
        artid: '',
        url: '',
        collectedis: false,
        audiois: false,
        mountedis: false,
        topIs: true,
        osTop: 0,
        areaValue: '',
        commentarr: [],
        commenturl: '',
        commentpage: 1,
        commentIs: false,
        commentNo: false,
        supportis: [],
        supaddnum: [],
        supsubnum: [],
        supportnum: [],
        isload: true,
        ifpay: false,
        is_relation: false,
        numData: '',
        relationData: [],
        isShowGoods: 0,
        shop_id: '',
        dist_money: '',
        userinfo:[],
        ifuserinfo:false,
        editinfo:false,
        ifinfo:'0.2rem',
        ifinfo2:'1rem',
        shareObj:'',
        rootId:'',
        customArr:[''],
        infourl:'',
        aduiourl:'',
      }
    },
    created(){
      var self = this;
      this.global.shouquan();
      //        判断显示导航类型
      this.postData('post','/shop-v1-index_get_root.html').then(res => {
        if(res.data.rootId && res.data.rootId != ''){
          this.rootId = this.customArr.indexOf(res.data.rootId) != -1?'Navigator':'customNav';
        }else{
          this.rootId= this.customArr.indexOf(this.$route.query.root_id) != -1 ? 'Navigator':'customNav';
        }
      });
      Indicator.open();
      this.audiois = this.$route.query.artid == 4 ? true : false;
      
      this.url = '/shop-v1-article_detail.html?art_id=' + this.$route.query.artid;
      this.getData('get', this.url).then(res => {
        var authorInfo = res.data.authorInfo;
        var authorInfoface = res.data.userInfo;
        if (res.status == 200) {
          var dist_money = parseFloat(res.data.dist_money);
          if (dist_money > 0) {
            self.dist_money = '赚￥' + dist_money;
          } else {
            self.dist_money = '我的邀请卡';
          }
          this.arr = res.data;
          this.arruser = this.arr.userInfo;
          this.audiois = this.arr.audio_path == '' ? false : true;
          this.recommendlist = this.arr.recommendList;
          this.collectedis = this.arr.is_collected;
          document.title = this.arr.title;
          if (this.mountedis) {
            setTimeout(function () {
              $('.articles_content-text img').css({'max-width': '100%'});
            }, 0);
          }
          //        图片显示

          this.share(this.arr.title, this.arr.desc, this.arr.pic);

          if (res.data.is_free == 0) {
            self.$nextTick(function () {
              self.ifpay = true;
            })
          }
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
                // self.share(sharename,self.arr.desc,face);
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
                // self.share(sharename,self.arr.desc,face);
              }else if(res.data.status == 0){
                self.ifuserinfo = false;
                // self.share(self.arr.title, self.arr.desc, self.arr.pic);
              }
            })
          })
          if(res.data.article_type == 4 && res.data.has_audio == 1){
            self.postData('post','/shop-play-index.html',{type:3,id:self.$route.query.artid}).then(res => {
              console.log(res.data.url)
              self.aduiourl = res.data.url;
            })
          }
          Indicator.close();
        }
      });
//   评论加载
      this.commenturl = '/shop-v1-article_get_comment_lst.html?art_id=' + this.$route.query.artid + ';page=' + this.commentpage;
      this.getData('get', this.commenturl).then(res => {
        if (res.status == 200) {
          if (res.data.length) {
            this.commentNo = false;
            this.commentarr = res.data;
            this.likeComment(0);
            if (res.data.length < 10) {
              this.isload = false;
            }
          } else {
            this.commentNo = true;
          }
        }
        //          console.log(this.commentarr);
      });

      //是否显示关联商品入口
      if (this.$route.query.artid) {
        this.postData('post', '/shop-v1-video_relation_num.html', {
          'r_id': this.$route.query.artid,
          'type': 3
        }).then(res => {
          if (res.status == 200) {
            this.numData = res.data.num;
            if (res.data.is_relation == 1) {
              this.is_relation = true;
            } else {
              this.is_relation = false;

            }
          }
        })
      }
      
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
    mounted(){
      var self = this;
//      判断是否加载
      if (this.arr.title != undefined) {
        setTimeout(function () {
          $('.articles_content-text img').css({'width': '100%'});
        }, 0);
      } else {
        this.mountedis = true;
      }
//    屏幕滚动触发
      window.addEventListener('scroll', this.scrollTop);

    },
    components: {loadNo, footer1, goodsRelation,customInfo,customNav},
    methods: {
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
      // 点击付款
      topay(id){
        this.$router.push({path: '/toPay', query: {'art_id': id, 'type': 10}})
      },
//      文章推荐点击跳转
      toArticles(id, type){
        switch (type) {
          case 1:
            this.$route.query.artid = id;
            this.url = '/shop-v1-article_detail.html?art_id=' + id;
            this.getData('get', this.url).then(res => {
              if (res.status == 200) {
                this.arr = res.data;
                this.arruser = this.arr.userInfo;
//                  console.log(this.arr);
                this.recommendlist = this.arr.recommendList;
                this.collectedis = this.arr.is_collected;
//                  console.log(this.recommendlist[0]);
                document.title = this.arr.title;
                setTimeout(function () {
                  $('.articles_content-text img').css({'width': '100%'});
                }, 0);
                this.share(this.arr.title, this.arr.desc, this.arr.pic);
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
        this.postData('post', '/shop-v1-article_collect.html', {art_id: this.$route.query.artid}).then(res => {
//          console.log(res.data);
//          this.getData('get',this.url).then(res => {
//            this.arr = res.data;
//            this.collectedis = this.arr.is_collected;
//            console.log(this.arr);
//          });

          this.collectedis = !this.collectedis;
          this.collectedis ? this.arr.collect_num++ : this.arr.collect_num--;
        });
      },
//     返回
      toBack(){
        if (window.history.length > 1) {
          this.$router.back();
        } else {
          this.$router.push('/');
        }
      },
//     滚动至评论块
      scrollComment(){
        if (this.commentarr.length < 5) {
          this.toScroll(this.$refs.comment.offsetTop - 300);
        } else {
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

        var timer = setInterval(function () {
          let osTop = document.documentElement.scrollTop || document.body.scrollTop;
          let speed = footTop > firstTop ? Math.floor((osTop - footTop) / 4) : Math.ceil((osTop - footTop) / 4);
          document.documentElement.scrollTop = document.body.scrollTop = osTop - speed;
          if (footTop > firstTop) {
            if (osTop >= footTop) {
              clearInterval(timer);
            }
          } else {
            if (osTop <= footTop) {
              clearInterval(timer);
            }
          }

        }, 30);
      },
//     判断当前滚动距离
      scrollTop(){
        this.osTop = document.documentElement.scrollTop || document.body.scrollTop;
        this.topIs = this.osTop > 500 ? true : false;
      },
      imgload(id){
        $('.load' + id).hide();
      },
      loadMore(){
        if (this.isload) {
          this.commentpage++;
          this.commenturl = '/shop-v1-article_get_comment_lst.html?art_id=' + this.$route.query.artid + '&page=' + this.commentpage;
          this.getData('get', this.commenturl).then(res => {
            if (res.status == 200) {
//                console.log(res.data);
              if (res.data.length) {
                this.commentarr = this.commentarr.concat(res.data);
                let firstLen = this.commentarr.length - res.data.length;
                this.likeComment(firstLen);
              } else {
                this.isload = false;
              }
//                console.log(this.commentarr);
            }
          });
        }
      },
//     评论框显示
      toComment(){
        if (this.arr.enable_comment == 1) {
          this.commentIs = !this.commentIs;
        }
      },
//     提交评论
      getComment(){
        let context = this.$refs.area.value;
        if (context.length) {
          this.postData('post', '/shop-v1-article_do_comment.html', {
            art_id: this.$route.query.artid,
            content: context
          }).then(res => {
            if (res.data.status == 1) {
              this.isload = true;
              this.commentpage = 1;
              this.commenturl = '/shop-v1-article_get_comment_lst.html?art_id=' + this.$route.query.artid + '&page=' + this.commentpage;
              this.getData('get', this.commenturl).then(res => {
                if (res.status == 200) {
                  this.arr.comment_num++;
                  this.commentNo = false;
                  this.commentarr = res.data;
                  this.likeComment(0);
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
      toSupported(id){
        let supId = id;
//        console.log('supportis',this.supportis[supId]);
        this.postData('post', '/shop-v1-article_sup_comment.html', {c_id: supId}).then(res => {

          if (res.status == 200) {
//              console.log(res.data);
            if (res.data.status == 2) {
              $(".comment_icon" + supId).removeClass("icon-dianzan");
              $(".comment_icon" + supId).addClass("icon-dianzan2");
              this.supportis[supId] = 0;
            } else {
              $(".comment_icon" + supId).addClass("icon-dianzan");
              $(".comment_icon" + supId).removeClass("icon-dianzan2");
              this.supportis[supId] = 1;
            }
//              console.log('supportis',this.supportis[supId]);
//              console.log(supId,this.supaddnum[supId],this.supsubnum[supId]);
            if (this.supportis[supId]) {
              $(".comment_num" + supId).html(this.supaddnum[supId]);
            } else {
              $(".comment_num" + supId).html(this.supsubnum[supId]);
            }
          }
        });
      },
//     评论点赞
      likeComment(firstlen){
        let fLen = firstlen;

        for (let i = fLen, len = this.commentarr.length; i < len; i++) {
          let id = this.commentarr[i].cmt_id;
          this.supportis[id] = this.commentarr[i].is_supported;
          if (this.commentarr[i].is_supported) {
            this.supaddnum[id] = this.commentarr[i].support_count;
            this.supsubnum[id] = this.commentarr[i].support_count - 1;
          } else {
            this.supaddnum[id] = this.commentarr[i].support_count + 1;
            this.supsubnum[id] = this.commentarr[i].support_count;
          }
        }
      },
      //关联商品
      relation(){//关联
        this.isShowGoods = 1;
        this.$store.state.count = 1;
        this.postData('post', '/shop-v1-video_relation_goods.html', {
          'r_id': this.$route.query.artid,
          'type': 3
        }).then(res => {
          if (res.status == 200) {
            if (res.data.status == 1) {
              this.relationData.length = 0;
              for (var i = 0; i < res.data.list.length; i++) {
                this.relationData.push(res.data.list[i])
              }
              this.shop_id = res.data.shop_id;
            }
          }
        });


      },
      /**
       * inviteclick:跳转到邀请卡
       * by he 2018/04/13
       */
      inviteclick(){
        if (window.location.href.indexOf('artid') != -1) {
          var new_id = this.$route.query.artid;
          this.$router.push({
            path: '/commission',
            query: {'artid': new_id}
          });
        }
      }
    },
    store
  }
</script>

<style scoped lang="less">

  .articles {
    overflow: hidden;
    padding-bottom: 0.9rem;
    font-size: 0.24rem;
    /*background-color:#ffffff;*/
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
    .paytip {
      width: 100%;
      height: auto;
      background-color: #fff;
      text-align: center;
      color: #999;
      padding-bottom: 0.5rem;
    }
    .articles_needpay {
      height: 0.8rem;
      width: 100%;
      position: fixed;
      z-index: 1;
      background-color: #fe5875;
      bottom: 0.96rem;
      color: #fff;
      font-size: 0.24rem;
      text-align: center;
      line-height: 0.8rem;
      overflow: hidden;
    }

    &_header {
      /*font-size: 0.24rem;*/
      /*border-bottom: 0.08rem solid #F7F7F7;*/
      background-color: #ffffff;

      &-bg {
        display: block;
        width: 100%;
        /*min-height:4rem;*/
        /*min-height:40vh;*/
      }

      &-title {
        /*line-height: 1.5;*/
        /*margin-bottom: 0.4rem;*/
        padding: 0.2rem 0.2rem 0;
        font-size: 0.38rem;
        color: #333333;
        font-weight: 500;
      }

      &-author {
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
      &-icon {
        width: 0.5rem;
        height: 0.5rem;
        vertical-align: middle;
        border-radius: 50%;
      }
      &-name {
        padding-left: 0.2rem;
        color: #666666;
      }
      /*&-time{*/
      /*color: #999999;*/
      /*}*/
    }

    &_content {
      &-text {
        padding: 0.5rem 0.2rem;
        font-size: 0.30rem;
        color: #333333;
        word-wrap: break-word;
        // border-bottom: 0.02rem solid #dddddd;
        background-color: #ffffff;

      }
      .articles_foot {
        &-wrap {
          display: -webkit-box;
          display: -moz-box;
          display: -ms-flexbox;
          display: -webkit-flex;
          display: flex;
          border-top: 0.1rem solid #f2f2f2;
          background-color: #ffffff;
        }

        &-img {
          display: block;
          width: 2.9rem;
          height: 2rem;
        }

        &-textwrap {
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

          padding: 0.2rem 0.1rem 0.2rem 0.2rem;
        }
        &-title {
          -webkit-box-flex: 1.0;
          -moz-flex-grow: 1;
          -webkit-flex-grow: 1;
          flex-grow: 1;

          /*line-height: 1.7;*/
          font-size: 0.26rem;
          color: #333333;
        }
        .articles_details {
          font-size: 0.2rem;
          font-weight: 200;
          color: #666666;

          &-left {
            float: left;
            font-size: 0.24rem;
            color: #999999;
          }
          &-comment {
            padding-right: 0.3rem;
          }

          .icon-pinglun {
            font-size: 0.3rem;
          }
          .icon-aixin {
            font-size: 0.3rem;
            color: #999999;
          }
          /*&-right{*/
          /*float: right;*/
          /*}*/
          /*&-time{*/
          /*padding-right: 0.1rem;*/
          /*}*/
        }
      }
      &-logo {
        margin-top: 0.5rem;
        width: 100%;
      }
      &-backTop {
        position: fixed;
        right: 0.4rem;
        bottom: 2rem;
        /*width: 0.8rem;*/
        /*height: 1.1rem;*/
        padding: 0.1rem 0.1rem;
        font-size: 0.24rem;
        font-weight: bold;
        text-align: center;
        border-radius: 0.1rem;
        background-color: #dedede;
        opacity: 0.5;
      }
    }

    .comment {
      margin-top: 0.1rem;
      border-top: 0.02rem solid #dddddd;
      background-color: #ffffff;
      &_content {
        /*width: calc(100vw - 0.2rem);*/
        /*min-height: 100vh;*/
        padding: 0.2rem 0 3rem 0.2rem;
        &-title {
          padding-bottom: 0.2rem;
          font-size: 0.26rem;
          color: #999999;
        }
      }
      &_item {
        margin-bottom: 0.2rem;
        &-portrait {
          width: 0.6rem;
          height: 0.6rem;
          vertical-align: middle;
          margin-right: 0.2rem;
          border: 0;
          -webkit-border-radius: 50%;
          -moz-border-radius: 50%;
          border-radius: 50%;
        }
        &-name {
          color: #333333;
          font-size: 0.28rem;
          margin-right: 0.2rem;
          max-width: 2rem;
          white-space: nowrap;
          text-overflow: ellipsis;
          -o-text-overflow: ellipsis;
          overflow: hidden;
        }
        &-time {
          color: #999999;
          font-size: 0.24rem;
        }
        &-up {
          float: right;
          margin-right: 0.2rem;
          font-size: 0.24rem;
          color: #999999;

          .comment_item-icon {
            margin-left: 0.1rem;
          }
          .icon-dianzan {
            color: #fe5875;
          }

        }
        &-text {
          margin-left: 0.85rem;
          padding: 0.1rem 0 0.4rem 0;
          font-size: 0.26rem;
          color: #333333;
          border-bottom: 0.02rem solid #eeeeee;
        }

        &-revert {
          margin-left: 0.85rem;
          margin-top: 0.2rem;
        }
      }
      &_tip {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 90%;
        z-index: 300;
        padding: 0.2rem 5% 0.1rem;
        border-top: 0.02rem solid #dddddd;
        background-color: #ffffff;
        text-align: center;

        .icon-fanhui, .icon-pinglun2 {
          font-size: 0.38rem;
          color: #666666;
        }
      }
    }

    .articles_bottomcol {
      background-color: #f1f2f6;
    }
    &_bottom {
      display: -webkit-flex;
      display: flex;
      position: fixed;
      bottom: 0;
      left: 0;
      width: 90%;
      padding: 0.2rem 5% 0.12rem;
      font-size: 0.24rem;
      color: #707070;
      border-top: 0.02rem solid #dddddd;
      background-color: #ffffff;
      &-left {
        display: -webkit-flex;
        display: flex;
        -webkit-flex: 1.0;
        flex: 1;
      }
      &-comment {
        -webkit-flex: 1.0;
        flex: 1;
        margin: 0 0.5rem;
        padding: 0 0.15rem;
        border: 0.02rem solid #999999;
        border-radius: 0.8rem;
        position: relative;
        &-dan {
          position: absolute;
          top: -0.2rem;
          left: -0.2rem;
          width: 3.4rem;
          height: 1rem;
          background: #fff;
        }
        .icon-pinglun1 {
          font-size: 0.24rem;
        }
      }
      .articles_comment {
        flex: 1;
        &-header {
          display: -webkit-flex;
          display: flex;
          padding-bottom: 0.2rem;
        }
        &-title {
          flex: 1;
          text-align: center;
          font-weight: bold;
          color: #000000;
        }
        &-input {
          width: 100%;
          height: 3rem;
          height: 25vh;
          background-color: #ffffff;
          border: none;
          resize: none;
          &:focus {
            outline: none;
          }
        }
      }

      .icon-fanhui {
        font-size: 0.36rem;
        color: #707070;
      }
      .icon-huihua1 {
        font-size: 0.36rem;
        color: #707070;
      }

      .icon-dianzantianchong, .icon-aixin {
        font-size: 0.36rem;
      }
      .icon-dianzantianchong {
        color: #fe5875;
      }

      &-huihua1, &-dianzantianchong {
        margin-right: 0.2rem;
      }

    }

    .backTop-move-enter-active, .backTop-move-leave-active {
      transition: all 1s ease-in;
    }
    .backTop-move-enter, .backTop-move-leave-active {
      opacity: 0;
    }

    /*关联开始*/
    .relation {
      width: 0.8rem;
      /*height: 0.9rem;*/
      background-color: #fe5875;
      color: white;
      position: absolute;
      right: 0;
      top: 1rem;
      border-top-left-radius: 3rem;
      border-bottom-left-radius: 3rem;
      /*padding: 0.06rem 0;*/
      padding-top: 0.06rem;
      padding-bottom: 0.06rem;
      padding-left: 0.1rem;

    }
    /*邀请卡开始*/
    .share {
      width: 1.6rem;
      height: 0.45rem;
      background-color: #5e96d0;
      position: absolute;
      top: 0.2rem;
      right: 0;
      color: #fff;
      border-radius: 0.45rem 0rem 0rem 0.45rem;
      i {
        font-size: 0.3rem;
        position: relative;
        top: 0.04rem;
        left: 0.06rem;
      }
      span {
        position: relative;
        top: 0.03rem;
      }
    }
    /*邀请卡结束*/

    .relation > .iconfont {
      font-size: 0.3rem;
    }

    .relation > span {
      font-size: 0.22rem;
      margin-top: -0.5rem;
    }

    /*关联结束*/

  }


</style>
