<template>
  <div class="mesay" v-infinite-scroll="loadMore"
       infinite-scroll-disabled="false"
       infinite-scroll-immediate-check="false">
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
    <div class="mesay_header">
      <div class="mesay_parting">
        <span class="mesay_parting-num">{{obj.comment_num}}</span>
        人已参与
        <span class="mesay_parting-triangle"></span>
      </div>
      <div class="mesay_header-barrage">
          <div ref="barr" class="mesay_barrage" v-for="(item,index) in barragearr" >
            <transition name="barrage-move"
                        @before-enter="beforeEnter"
                        @enter="Enter"
                        @after-enter="afterEnter"
                        @after-leave="afterleave">
              <div class="mesay_barrage-item" v-if="showarr[index].barr" style="transform:translatex(100%)">
                <div class="mesay_barrage-com">
                  <img class="mesay_barrage-img" :src="item.face" >
                  {{item.content}}
                </div>
              </div>
            </transition>
          </div>

      </div>
      <div class="">
        <img class="mesay_header-img" :src="obj.pic" alt="" onerror="this.src=&quot;/static/img/1111.f2c6065.png&quot;" @load="imgload(obj.art_id)">
        <div :class="'load'+ obj.art_id"
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
      </div>
      <div class="mesay_header-title">
        {{obj.title}}
      </div>
      <div class="mesay_header-headtext" v-html="obj.content">
        {{obj.content}}
      </div>
    </div>
    <div class="mesay_main">
      <div class="mesay_main-falls">
        <div class="falls_left">
          <div class="falls_say" @click="showopinion()">
          <div class="falls_head">
            <img class="falls_head-icon" :src="user.face" />
            <span class="falls_head-name">{{user.nickname}}</span>
          </div>
          <div class="falls_content">
            <i class="icon iconfont icon-pinglun1" style="margin-right: 0.1rem"></i>
            说点什么
          </div>
        </div>
        </div>
        <div class="falls_right">
        </div>
        <div class="falls_message"  :class="[color(index),('fall'+index)]"  v-for="(item,index) in commentarr" v-if="item.is_can_del != 2">
          <div class="falls_head">
            <img class="falls_head-icon" :src="item.face" />
            <span class="falls_head-name">{{item.nickname}}</span>
          </div>
          <div class="falls_content" style="font-size: 0.28rem">{{item.content}}</div>
          <div class="falls_foot">
            <div class="falls_foot-good">
              <i class=" icon iconfont "
                 style="margin-right: 0.1rem"
                 :class="[(item.is_supported ? 'icon-dianzan1':'icon-dianzan3'),('falls_icon'+item.cmt_id)]"
                 @click="toSupported(item.cmt_id)"
              ></i>
              <span class="falls_num" :class="'falls_num'+item.cmt_id">
                {{ item.support_count }}</span>&nbsp赞
            </div>
            <div class="falls_foot-up" v-if="item.is_can_del == 1" @click="delFalls(item.cmt_id,item)">
              <i class="icon iconfont icon-iconfonticonfontdelete"></i>
            </div>
          </div>
        </div>
      </div>

      <div class="mesay_main-bottomtip" v-if="!loadis">
        <loadNo></loadNo>
      </div>
      <div class="mesay_main-logo">
        <footer1 style="opacity: 0;"></footer1>
      </div>

      <div class="mesay_bottom">
        <div class="mesay_bottom-left" style="float: left" @click="toBack()">
          <span class="mesay_bottom-back" >
            <i class="icon iconfont icon-fanhui"></i>
          </span>
        </div>

        <div class="mesay_bottom-right" style="float: right">
          <span class="mesay_bottom-oponion" @click="showopinion()">
          <i class="icon iconfont icon-pinglun2"></i>
          </span>
        </div>
      </div>
      <transition name="opinion-move">
        <div class="mesay_opinion" v-if="opinionshow">
          <div class="mesay_opinion-title">
          <span class="mesay_opinion-back" style="float: left" @click="showopinion()">
            <i class="icon iconfont icon-fanhui"></i>
          </span>
            评论
            <span class="mesay_opinion-send" style="float: right;color:#333333;font-size: 0.3rem" @click="getComment()">发送</span>
          </div>
          <div class="mesay_opinion-content">
            <textarea  autofocus ref="area" class="mesay_opinion-input"  placeholder="我有意见..." maxlength="140" @keyup="areaNum()" @focus="focusText()" @blur="blurText()"></textarea>
          </div>
          <div class="mesay_opinion-foot">
            <span class="mesay_opinion-num" style="float: right">还可输入{{opinionnum}}字</span>
          </div>
        </div>
      </transition>
    </div>
    <component :is="rootId"></component>
  </div>
</template>

<script>
  import {InfiniteScroll,Indicator,Toast} from 'mint-ui';
  import footer1 from '@/components/publicPage/footer1';
  import loadNo from '@/components/common/loadNo';
  import customInfo from '@/components/common/customInfo';
  import customNav from '@/components/common/custom/customNav';
  export default{
    data(){
        return {
          showarr:[{barr:false},{barr:false},{barr:false},{barr:false},{barr:false}],
          shownum:[0,1,2,3,4],
          screenWidth:0,
          colorArr:['blue','orangn','red','green','cyanine'],
          obj:{},
          user:{},
          mountedis:false,
          opinionshow:false,
          opinionnum:140,
          articleurl:'',
          commenturl:'',
          commentpage:1,
          commentarr:[],
          commentarr2:[],
          loadis:true,
          supportis:[],
          supaddnum:[],
          supsubnum:[],
          barragearr:[],
          barrageindex:5,
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
      this.articleurl = '/shop-v1-article_detail.html?art_id='+this.$route.query.artid;
      this.getData('get',this.articleurl).then(res => {
        var authorInfo = res.data.authorInfo;
        var authorInfoface = res.data.userInfo;
          if(res.status == 200){
            this.obj = res.data;
//            console.log(1,this.obj);
            this.user = res.data.userInfo;
            document.title = this.obj.title;

            //      用content
            this.$nextTick(function () {
              let content = $('.mesay_header-headtext').text();
              console.log(content);
              self.postData('post','/shop-v1-index_basemsg.html').then(res => {
              var name = res.data.title
              var logo = res.data.logo
              if(self.$route.query.member_id == undefined){
                var data = {}
              }else{
                var data = {mid:self.$route.query.member_id}
              }
              self.share(self.obj.title,content,self.obj.pic);
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
                  // self.share(sharename,content,face);
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
                  // self.share(sharename,content,face);
                }else if(res.data.status == 0){
                  self.ifuserinfo = false;
                  // self.share(self.obj.title,content,self.obj.pic);
                }
              })
            })
              // self.postData('post','/shop-v2-st_msg.html',data).then(res => {
              //   if(res.data.status == 1){
              //     self.userinfo = res.data;
              //     self.ifuserinfo = true;
              //     self.ifinfo = '1.2rem';
              //     self.ifinfo2 = '2.2rem';
              //     if(res.data.face==''){
              //       var face = authorInfoface.face
              //     }else{
              //       var face = res.data.face
              //     }
              //     var sharename ='【'+res.data.name+'】-【'+authorInfo.username+'】' 
              //     var sharephone = '联系电话：'+res.data.phone
              //     self.share(sharename,sharephone,face);
              //   }else if(res.data.status == 2){
              //     self.ifuserinfo = true;
              //     self.userinfo = res.data;
              //     self.ifinfo = '1.2rem';
              //     self.ifinfo2 = '2.2rem';
              //     if(res.data.face==''){
              //       var face = authorInfoface.face
              //     }else{
              //       var face = res.data.face
              //     }
              //     var sharename ='【'+res.data.name+'】-【'+authorInfo.username+'】' 
              //     var sharephone = '联系电话：'+res.data.phone
              //     self.share(sharename,sharephone,face);
              //   }else if(res.data.status == 0){
              //     self.ifuserinfo = false;
              //     self.share(self.obj.title,content,self.obj.pic);
              //   }
              // })
            });
          }
      });
      //      获取评论列表
      this.commenturl = '/shop-v1-article_get_comment_lst.html?art_id='+this.$route.query.artid+'&page='+this.commentpage;
      this.getData('get',this.commenturl).then(res => {
        if(res.status == 200){
          this.commentarr = res.data;
//          console.log(2,res.data);
          //   填充弹幕数组
          if(this.commentarr.length >= 5){
            for(let i = 0;i<5;i++){
              this.barragearr.push(this.commentarr[i]);
            }
          }

          //    判断，并启动弹幕
          let that = this;
          if(this.commentarr.length >= 5 && this.mountedis){
            setTimeout(that.showbarr,2000);
          }

          //     初始化点赞
          this.likeComment(0);

          //      瀑布流
          for(let i = 0;i <= this.commentarr.length;i++){
            setTimeout(function () {
              that.toFall(i);
            },0);
          }

        }
        Indicator.close();
      });
      if(self.$route.query.member_id == undefined){
        var data = {}
      }else{
        var data = {mid:self.$route.query.member_id}
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
      //        判断，并启动弹幕
      let that = this;
      if(this.commentarr.length >= 5){
        setTimeout(that.showbarr,2000);
      }else{
        this.mountedis = true;
      }

//      瀑布流
//      console.log(this.commentarr.length);
//      for(let i = 0;i <= this.commentarr.length;i++){
//        this.toFall(i);
//        setTimeout(function (i) {},0);
//      }
    },
    components:{footer1,loadNo,customInfo,customNav},
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
//        瀑布流
      toFall(i){
//          console.log($('.falls_left').height(),$('.falls_right').height());
          if($('.falls_left').height() > $('.falls_right').height()){
            $('.falls_right').append($('.fall'+i));
          }else{
            $('.falls_left').append($('.fall'+i));
          }
        },
//      点赞评论
      toSupported(id){
        let supId = id;
        this.postData('post','/shop-v1-article_sup_comment.html',{c_id:supId}).then(res => {
          if(res.status == 200){
            if(res.data.status == 2){
              $(".falls_icon"+supId).removeClass("icon-dianzan1");
              $(".falls_icon"+supId).addClass("icon-dianzan3");
              this.supportis[supId] = 0;
            }else{
              $(".falls_icon"+supId).addClass("icon-dianzan1");
              $(".falls_icon"+supId).removeClass("icon-dianzan3");

              this.supportis[supId] = 1;
            }
//            console.log('supportis',this.supportis[supId]);
//            console.log(supId,this.supaddnum[supId],this.supsubnum[supId]);
            if(this.supportis[supId]){
              $(".falls_num" + supId).html(this.supaddnum[supId]);
            }else{
              $(".falls_num" + supId).html(this.supsubnum[supId]);
            }
          }
        });
      },
//      评论字数计算
      areaNum(){
        this.opinionnum = 140 - this.$refs.area.value.length;
      },
//      评论显示隐藏
      showopinion(){
          this.opinionshow = !this.opinionshow;
      },
//      =========弹幕部分=============
//      弹幕开启
      showbarr(){
        for(let i = 0,len = this.showarr.length;i<len;i++){
          this.showarr[i].barr = true;
        }
      },
      //      弹幕运动开始前
      beforeEnter(el){

        if(this.shownum.length > 0){
          el.index = this.shownum.shift();
        }
        this.screenWidth = document.body.clientWidth;

      },
      //      弹幕运动开始时
      Enter(el){
//          设置弹幕运行位置
        let child = -el.getElementsByTagName('div')[0].offsetWidth * 2 - this.screenWidth + 'px';
        el.style.transform = `translatex(${child})`;

        },
      //      弹幕运动结束时
      afterEnter(el){

        this.shownum.push(el.index);
        this.showarr[el.index].barr = false;
      },
      //      弹幕运动结束后
      afterleave(el){

        this.showarr[el.index].barr = true;
        this.barragearr.shift();
//      弹幕循环
        if(this.barrageindex < this.commentarr.length ){
          this.barragearr.push(this.commentarr[this.barrageindex]);
          this.barrageindex++;
        }else{
          this.barrageindex = 0;
          this.barragearr.push(this.commentarr[this.barrageindex]);
        }
      },
//      ======================
//     评论下拉记载
      loadMore(){

        if(this.commentarr.length <= 60 && this.loadis){
          this.commentpage++;
          this.commenturl = '/shop-v1-article_get_comment_lst.html?art_id='+this.$route.query.artid+'&page='+this.commentpage;
          this.getData('get',this.commenturl).then(res => {

            if(res.status==200){

              if(res.data.length < 10){
                this.loadis =false;
              }
              this.commentarr = this.commentarr.concat(res.data);
//              console.log(this.commentarr);
              //            瀑布流
              let firstLen = this.commentarr.length - res.data.length;
              let that = this;
              for(let i = firstLen;i <= this.commentarr.length;i++){
                setTimeout(function () {
                  that.toFall(i);
                },0);
              }
              this.likeComment(firstLen);

            }
          });
        }
      },
//      评论颜色循环
      color(index){
        return this.colorArr[index % 5];
      },
//      提交评论
      getComment(){
        let context = this.$refs.area.value;
        this.postData('post','/shop-v1-article_do_comment.html',{art_id:this.$route.query.artid,content:context}).then(res => {
            if(res.status==200){
                if(res.data.status == 0){
                  Toast({
                    message: res.data.msg,
                    position: 'middle',
                    duration: 2000
                  });
                }else if(res.data.status == 1){
                  this.$nextTick(function () {
                    this.$router.go(0);
                  });
                }

            }
//          console.log(res.data);
        })
      },
//      评论点赞数量计算
      likeComment(firstlen){
          let fLen = firstlen;

        for(let i = fLen,len = this.commentarr.length;i<len;i++){

          let id = this.commentarr[i].cmt_id;
          this.supportis[this.commentarr[i].cmt_id] = this.commentarr[i].is_supported;
          if(this.commentarr[i].is_supported){
            this.supaddnum[id] = this.commentarr[i].support_count;
            this.supsubnum[id] = this.commentarr[i].support_count - 1;
          }else{
            this.supaddnum[id] = this.commentarr[i].support_count + 1;
            this.supsubnum[id] = this.commentarr[i].support_count;
          }
        }
      },
//      返回
      toBack(){
        if(window.history.length > 1){
          this.$router.back();
        }else{
          this.$router.push('/');
        }
      },
      imgload(id){
        $('.load'+ id).hide();
      },
//      评论框获得焦点事件，兼容IOS系统
      focusText(){
        $('.mesay_opinion').css({position:'absolute'});
        $('.mesay').css({height:'100vh'});
      },
      blurText(){
        $('.mesay_opinion').css({position:'fixed'});
        $('.mesay').css({height:'auto'});
      },
//      评论删除
      delFalls(id,item){
        this.postData('post','/shop-v1-article_del_comment.html',{c_id:id}).then(res => {
          if(res.status==200){
              if(res.data.status == 1){
                Toast({
                  message: '评论删除成功',
                  position: 'middle',
                  duration: 1000
                });
                item.is_can_del = 2;
              }else{
                Toast({
                  message: res.data.msg,
                  position: 'middle',
                  duration: 1000
                });
              }
          }
        })
      }
    }
  }
</script>

<style scoped lang="less">
  .mesay{
    position: relative;
    overflow: hidden;
    width: 100%;
    width: 100vw;
    background-color: #ffffff;
    font-size: 0.24rem;
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
      position: relative;
      border-bottom: 0.2rem solid #f2f2f2;

      .mesay_parting{
        position: absolute;
        top:0.4rem;
        right:0.2rem;
        width: 1rem;
        height: 0.7rem;
        text-align: center;
        font-size: 0.22rem;
        color: #f2f2f2;
        background-color: rgba(51,51,51,0.9);

        &-num{
          display:block;
          font-size: 0.32rem;
          font-family: Impact;
          color: #5e96d0;
        }
        &-triangle{
          display:block;
          width: 0;
          height: 0;
          margin: auto;
          border-width: 0.12rem 0.22rem 0 0;
          border-style: solid;
          border-color: rgba(51,51,51,0.9) transparent;
        }
      }
      &-barrage{
        position: absolute;
        right:0;

        .mesay_barrage{
          height: 0.5rem;
          margin-top: 0.1rem;

          &-item{
            height: 100%;
            padding: 0.2rem;
          }
          &-com{
            display: inline-block;
            padding: 0.06rem 0.12rem 0.06rem;
            font-size: 0.24rem;
            color: #f2f2f2;
            /*max-width: 10rem;*/
            white-space:nowrap;
            text-overflow:ellipsis;
            -o-text-overflow:ellipsis;
            overflow:hidden;

            -webkit-border-radius:0.8rem;
            -moz-border-radius:0.8rem;
            border-radius:0.8rem;
            background-color: rgba(118, 112, 101, 0.8);
          }
          &-img{
            display: inline-block;
            width: 0.32rem;
            height: 0.32rem;
            margin-right: 0.1rem;
            vertical-align: middle;
            -webkit-border-radius:50%;
            -moz-border-radius:50%;
            border-radius:50%;
          }

          .barrage-move-enter-active{
            transition:all 10s ease-in;
          }
          .barrage-move-leave-active{
            transition:all 0.5s ease-in;
          }
          .barrage-move-enter{
            /*开始位置*/
            /*transform: translatex(700px);*/
          }
          .barrage-move-leave-active{
            /*结束位置*/
            transform: translatex(700px);
          }
        }
      }
      &-img{
        display: block;
        width: 100%;
        height: 4rem;
        height: 75vw;
      }
      &-title{
        padding: 0.3rem 0.2rem 0;
        font-size: 0.28rem;
        font-weight: 700;
        color: #000000;
      }
      &-headtext{
        margin-top:0.2rem;
        padding: 0 0.2rem 0.3rem;
        font-size: 0.24rem;
        color: #666666;
      }
    }
    &_main{
      overflow: hidden;
      padding: 0.2rem 3% 0;
      padding-right: 2vw;
      padding-left: 2vw;
      font-size: 0.2rem;
      &-falls{
        overflow: hidden;
        position: relative;

        .falls_left,.falls_right{
          float: left;
        }
        .falls_left{
          margin-right: 3.2%;
          margin-right: 2vw;
        }
        /*1*/
        li{
          &:nth-of-type(Odd){
          }
          &:nth-of-type(even){
          }
        }
        .falls_say,.falls_message{
          width:48.4%;
          width: 47vw;

          margin-bottom: 0.24rem;
          margin-bottom: 2vw;
          padding: 0.2rem;

          display: -webkit-box;
          display: -moz-box;
          display: -ms-flexbox;
          display: -webkit-flex;
          display: flex;

          -webkit-box-direction: normal;
          -webkit-box-orient: vertical;
          -moz-flex-direction: column;
          -webkit-flex-direction: column;
          flex-direction: column;

          box-sizing: border-box;
          -moz-box-sizing:border-box;

          .falls_head{
            -webkit-box-flex: 0;
            -moz-flex: 0;
            -webkit-flex: 0;
            flex:0 0 auto;

            &-name{
              display: inline-block;
              width: 70%;
              margin-left: 0.1rem;
              font-size: 0.24rem;
              overflow: hidden;
              text-overflow:ellipsis;
              white-space: nowrap;
            }
            &-icon{
              width: 0.4rem;
              height:0.4rem;
              vertical-align: bottom;

              -webkit-border-radius:50%;
              -moz-border-radius:50%;
              border-radius:50%;
            }
          }

          .falls_content{
            -webkit-box-flex: 1.0;
            -moz-flex: 1;
            -webkit-flex: 1;
            flex:1;
            /*padding: 0.1rem 0;*/
            margin: 0.1rem 0;
            font-size:0.28rem;
          }
        }
        .falls_say{
          border: 0.02rem dashed #CCCCCC;
          .falls_head-name{
            color: #666666;
          }
          .falls_content{
            line-height: 1.5rem;
            text-align: center;
            font-size:0.28rem;
            color: #666666;
          }
          .icon-pinglun1{
            font-size: 0.26rem;
            color: #999999;
          }
        }
        .falls_message{
          color:#FFFFFF;
          .falls_content{
            display: -webkit-box;
            display: -moz-box;
            display: -ms-flexbox;
            display: -webkit-flex;
            display: flex;

            -webkit-box-align: center;
            -moz-align-items: center;
            -webkit-align-items: center;
            align-items: center;

            -webkit-box-pack: center;
            -moz-justify-content: center;
            -webkit-justify-content: center;
            justify-content: center;

            word-wrap:break-word;
            word-break: break-all;
            /*overflow : hidden;*/
            /*text-overflow: ellipsis;*/
            /*display: -webkit-box;*/
            /*-webkit-line-clamp: 3;*/
            /*-webkit-box-orient: vertical;*/
          }
          .falls_foot{
            font-size: 0.24rem;
            &-good{
              float: left;
            }
            &-up{
              float: right;
            }
          }
          .icon-iconfonticonfontdelete{
            font-size: 0.38rem;
          }
          .icon-dianzan3,.icon-dianzan1{
            font-size: 0.4rem;
          }
        }
      }
      &-logo{
        margin-top: 0.5rem;
        margin-bottom: 1rem;
        width: 100%;
      }
    }
    &_bottom{
      position: fixed;
      bottom: 0.96rem;
      left: 0;
      width: 90%;
      padding:0.2rem 5% 0.12rem;
      border-top:0.02rem solid #dddddd;
      background-color: #ffffff;

      .icon-fanhui,.icon-pinglun2,.icon-zhuanfa{
        font-size: 0.36rem;
        color: #666666;
      }

    }
    &_opinion{
      position: fixed;
      width: 100%;
      width: 100vw;
      height: 100%;
      height: 100vh;
      top:0;
      left: 0;
      z-index: 50;
      overflow: hidden;
      font-size: 0.28rem;
      background-color: #ffffff;
      opacity: 1;
      &-title{
        padding: 0.4rem 0.3rem 0.2rem;
        text-align: center;
        font-size: 0.32rem;
        font-weight: 500;
        border-bottom: 0.02rem solid rgba(161, 146, 164, 0.25);
        .icon-fanhui{
          font-size: 0.4rem;
          color: #666666;
        }
      }
      &-input{
        width: 80%;
        height: 5rem;
        padding: 0.2rem 10%;
        font-size: 0.24rem;
        border: none;
        resize : none;
        overflow-wrap:break-word;
        word-wrap:break-word;
        word-break:break-all;
        /*caret-color: #fe0f21;*/
        &:focus{
          outline: none;
        }
      }
      &-foot{
        position: fixed;
        bottom: 0;
        width: 90%;
        padding: 0 5% 0.2rem;
        overflow: hidden;
      }
    }
    .opinion-move-enter-active,.opinion-move-leave-active{
      transition:all 0.5s ease-in;
    }
    .opinion-move-enter,.opinion-move-leave-active{
      opacity: 0;
      /*left: 100%;*/
    }
    .blue{
      background-color: #38ACE9;
    }
    .orangn{
      background-color: #FEBD47;
    }
    .red{
      background-color: #FF5874;
    }
    .green{
      background-color: #4BE1BB;
    }
    .cyanine{
      background-color: #A495D0;
    }
  }
  @media screen and (min-width: 320px ){
    .mesay{
      .falls_say,.falls_message {
        min-height: 2.5rem;
        min-height: 47vw;
      }
    }
  }
  @media screen and (min-width: 400px ){
    .mesay{
      .falls_say,.falls_message {
        min-height: 2.85rem;
        min-height: 47vw;
      }
    }
  }

</style>
